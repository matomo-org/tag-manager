<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\Context;

use Piwik\Common;
use Piwik\Container\StaticContainer;
use Piwik\Log\LoggerInterface;
use Piwik\Piwik;
use Piwik\Plugins\TagManager\Context\Storage\StorageInterface;
use Piwik\Plugins\TagManager\Dao\TagsDao;
use Piwik\Plugins\TagManager\Exception\ContainerTooLargeException;
use Piwik\Plugins\TagManager\Exception\EntityRecursionException;
use Piwik\Plugins\TagManager\Model\Container;
use Piwik\Plugins\TagManager\Model\Environment;
use Piwik\Plugins\TagManager\Model\Salt;
use Piwik\Plugins\TagManager\Model\Tag;
use Piwik\Plugins\TagManager\Model\Trigger;
use Piwik\Plugins\TagManager\Model\Variable;
use Piwik\Plugins\TagManager\Template\Variable\VariablesProvider;
use Piwik\Settings\FieldConfig;

abstract class BaseContext
{
    /**
     * @var VariablesProvider
     */
    protected $variablesProvider;

    /**
     * @var Variable
     */
    protected $variableModel;

    /**
     * @var Trigger
     */
    protected $triggerModel;

    /**
     * @var Tag
     */
    protected $tagModel;

    /**
     * @var Container
     */
    protected $containerModel;

    /**
     * @var StorageInterface
     */
    protected $storage;

    /**
     * @var Salt
     */
    protected $salt;

    /**
     * @var array<string, array>
     */
    private $variables = array();

    /**
     * Set when a referenced variable, or a variable it references, has a type that is not available
     * @var bool
     */
    private $referencesUnavailableVariable = false;

    private $nestedVariableCals = [];

    /**
     * Roughly the bytes of configuration a container may encode to. A variable is copied in full wherever it is
     * referenced, so a few variables referencing each other many times would otherwise need gigabytes. Generating
     * a container peaks at about eight times its size in memory, so this keeps it inside a 128M memory limit.
     * Default of the TagManagerMaxContainerWeight DI entry, set by `[TagManager] max_container_size` in config.ini.php.
     */
    public const MAX_CONTAINER_WEIGHT = 5000000;

    /**
     * The limit for regenerating a release that is already stored, so a container published before
     * MAX_CONTAINER_WEIGHT existed keeps being updated unless it is far over it. Default of the
     * TagManagerMaxStoredReleaseWeight DI entry, set by `[TagManager] max_stored_release_size` in config.ini.php.
     */
    public const MAX_STORED_RELEASE_WEIGHT = 10000000;

    /**
     * Replaces the container limit while a stored release is regenerated
     * @var int|null
     */
    private $maxWeight = null;

    /**
     * Weight of each resolved variable, by name
     * @var array<string, int>
     */
    private $variableWeights = [];

    /**
     * The array each variable was resolved to, by name: a tag or trigger can have the same name and keys as a variable
     * @var array<string, array<string, mixed>>
     */
    private $resolvedVariables = [];

    /**
     * Names and references found to be unavailable, so each is only resolved once
     * @var array<string, true>
     */
    private $unavailableVariables = [];

    public function __construct(VariablesProvider $variablesProvider, Variable $variableModel, Trigger $triggerModel, Tag $tagModel, Container $containerModel, StorageInterface $storage, Salt $salt)
    {
        $this->variablesProvider = $variablesProvider;
        $this->variableModel = $variableModel;
        $this->triggerModel = $triggerModel;
        $this->tagModel = $tagModel;
        $this->containerModel = $containerModel;
        $this->storage = $storage;
        $this->salt = $salt;
    }

    abstract public function getId();
    abstract public function getName();
    abstract public function generate($container);
    abstract public function getInstallInstructions($container, $environment);
    abstract public function getInstallInstructionsReact($container, $environment);

    protected function generatePublicContainer($container, $release)
    {
        $this->nestedVariableCals = [];
        $this->variableWeights = [];
        $this->resolvedVariables = [];
        $this->unavailableVariables = [];

        $idSite = $container['idsite'];
        $idContainerVersion = $release['idcontainerversion'];
        $container['idcontainerversion'] = $idContainerVersion;

        $this->variables = [];

        $containerJs = $this->getEmptyPublicContainer($container, $release);

        foreach ($this->tagModel->getContainerTags($idSite, $idContainerVersion) as $tag) {
            if ($tag['status'] !== TagsDao::STATUS_ACTIVE) {
                continue;
            }
            if (empty($tag['typeMetadata'])) {
                // the tag type is not available, eg because the plugin providing it is no longer active
                continue;
            }
            $this->referencesUnavailableVariable = false;
            $parameters = $this->parametersToVariableJs($container, $tag);
            if ($this->referencesUnavailableVariable) {
                // the tag would otherwise run with an unresolved variable
                continue;
            }
            $containerJs['tags'][] = [
                'id' => $tag['idtag'],
                'type' => $tag['type'],
                'name' => $tag['name'],
                'parameters' => $parameters,
                'blockTriggerIds' => $tag['block_trigger_ids'],
                'fireTriggerIds' => $tag['fire_trigger_ids'],
                'fireLimit' => $tag['fire_limit'],
                'fireDelay' => $tag['fire_delay'],
                'startDate' => $tag['start_date'],
                'endDate' => $tag['end_date'],
            ];
        }

        $ignoredTriggerIds = [];
        foreach ($this->triggerModel->getContainerTriggers($idSite, $idContainerVersion) as $trigger) {
            // we are ignoring any trigger that is not actually used in any tag for performance reasons
            // (for now, we might change this later so triggers can more easily build on top of each other)
            if (empty($trigger['typeMetadata'])) {
                // the trigger type is not available, eg because the plugin providing it is no longer active
                $ignoredTriggerIds[] = $trigger['idtrigger'];
                continue;
            }
            $conditions = [];
            if (!empty($trigger['conditions'])) {
                foreach ($trigger['conditions'] as $condition) {
                    if (!empty($condition['actual'])) {
                        $actual = $this->variableToArray($container, $condition['actual']);
                        if (!$actual) {
                            // the condition variable type is not available. Ignoring only the condition would make
                            // the trigger fire more often than configured, so we ignore the whole trigger instead
                            $ignoredTriggerIds[] = $trigger['idtrigger'];
                            continue 2;
                        }
                        $conditions[] = [
                            'actual' => $actual,
                            'comparison' => $condition['comparison'],
                            'expected' => $condition['expected']
                        ];
                    }
                }
            }
            $this->referencesUnavailableVariable = false;
            $parameters = $this->parametersToVariableJs($container, $trigger);
            if ($this->referencesUnavailableVariable) {
                // the trigger would otherwise run with an unresolved variable
                $ignoredTriggerIds[] = $trigger['idtrigger'];
                continue;
            }
            $trigger = [
                'id' => $trigger['idtrigger'],
                'type' => $trigger['type'],
                'name' => $trigger['name'],
                'parameters' => $parameters,
                'conditions' => $conditions,
            ];

            $containerJs['triggers'][] = $trigger;
        }

        if (!empty($ignoredTriggerIds)) {
            // a tag must not fire without one of its block triggers, so we ignore such a tag as well
            $containerJs['tags'] = array_values(array_filter($containerJs['tags'], function ($tag) use ($ignoredTriggerIds) {
                return empty(array_intersect((array) $tag['blockTriggerIds'], $ignoredTriggerIds));
            }));
        }

        foreach ($this->variableModel->getContainerVariables($idSite, $idContainerVersion) as $variable) {
            // we are ignoring any trigger that is not actually used in any tag for performance reasons
            // (for now, we might change this later so triggers can more easily build on top of each other)
            $this->variableToArray($container, $variable);
        }

        $containerJs['variables'] = array_values($this->variables);
        $this->variables = array();

        $weight = $this->weigh($containerJs);
        if (($container['context'] ?? null) === WebContext::ID) {
            // the web context writes each custom JS function out twice, as the variable's parameter and as its template
            $weight += 2 * $this->weighMacroExpansions($containerJs['variables']);
        }
        if ($weight > ($this->maxWeight ?? self::getWeightLimit('TagManagerMaxContainerWeight', 'max_container_size'))) {
            throw new ContainerTooLargeException(Piwik::translate('TagManager_ErrorContainerTooLarge'), $weight);
        }

        return $containerJs;
    }

    /**
     * Approximates the size of $value once encoded, counting a resolved variable it contains from its cached weight
     * so this stays linear however often variables are referenced.
     *
     * @param mixed $value
     */
    private function weigh($value, bool $isVariableItself = false): int
    {
        if (is_scalar($value)) {
            return strlen((string) $value);
        }
        if (!is_array($value)) {
            return 0;
        }
        if (!$isVariableItself && isset($value['name']) && is_string($value['name'])) {
            // cheap, as the variables it references are the same arrays on both sides
            if (isset($this->resolvedVariables[$value['name']]) && $this->resolvedVariables[$value['name']] === $value) {
                return $this->variableWeights[$value['name']];
            }
        }

        $weight = 0;
        foreach ($value as $key => $item) {
            $weight += strlen((string) $key) + $this->weigh($item);
        }
        return $weight;
    }

    /**
     * The weight of replacing each {{variable}} in a custom JS function with that whole variable
     *
     * @param array<int, array<string, mixed>> $variables
     */
    private function weighMacroExpansions(array $variables): int
    {
        $weight = 0;
        $markers = null;
        $markerWeights = [];
        // random, so a custom JS function cannot contain a marker itself
        $token = "\0" . bin2hex(random_bytes(8)) . ':';
        foreach ($variables as $variable) {
            $jsFunction = $variable['parameters']['jsFunction'] ?? null;
            if (!is_string($jsFunction) || strpos($jsFunction, '{{') === false) {
                continue;
            }
            if ($markers === null) {
                $markers = [];
                foreach ($this->getMacroWeights($variables) as $key => $keyWeight) {
                    $markers[$key] = $token . count($markerWeights) . "\0";
                    $markerWeights[] = $keyWeight;
                }
            }
            // the same strtr as the web context's, so a name containing braces is matched as it would be expanded
            preg_match_all('/' . preg_quote($token, '/') . '(\d+)\x00/', strtr($jsFunction, $markers), $matches);
            foreach ($matches[1] as $index) {
                $weight += $markerWeights[(int) $index];
            }
        }
        return $weight;
    }

    /**
     * The length of what the web context puts in place of each {{macro}} in a custom JS function, by macro
     *
     * @param array<int, array<string, mixed>> $variables
     * @return array<string, int>
     */
    private function getMacroWeights(array $variables): array
    {
        $weights = [];
        $response = $this->getPreConfiguredVariablesJSCodeResponse(WebContext::ID);
        foreach ($response['keys'] as $index => $key) {
            // as in the web context, the first of two equal macros wins, and pre-configured ones come first
            $weights[$key] = $weights[$key] ?? strlen($response['values'][$index]);
        }
        foreach ($variables as $variable) {
            if (!empty($variable['parameters']) && is_string($variable['name'] ?? null)) {
                $key = '{{' . $variable['name'] . '}}';
                $weights[$key] = $weights[$key] ?? ($this->variableWeights[$variable['name']] ?? 0);
            }
        }
        return $weights;
    }

    /**
     * @param array<string, mixed> $variable
     */
    private function addResolvedVariable(array $variable): void
    {
        $this->resolvedVariables[$variable['name']] = $variable;
        $this->variableWeights[$variable['name']] = $this->weigh($variable, true);
    }

    public function getPreConfiguredVariablesJSCodeResponse($context)
    {
        $response = ['keys' => [], 'values' => []];
        $preConfiguredVariables = $this->variablesProvider->getPreConfiguredVariables();
        foreach ($preConfiguredVariables as $variable) {
            if (method_exists($variable, 'getDataLayerVariableJs')) {
                $response['keys'][] = '{{' . $variable->getId() . '}}';
                $response['values'][] = $variable->getDataLayerVariableJs();
            } elseif (method_exists($variable, 'loadTemplate')) {
                $response['keys'][] = '{{' . $variable->getId() . '}}';
                $response['values'][] = '(function(){' . $variable->loadTemplate($context, $variable, true) . '})()';
            }
        }

        return $response;
    }

    /**
     * @phpstan-impure sets $referencesUnavailableVariable
     */
    private function parametersToVariableJs($container, $entity)
    {
        if (!empty($entity['name'])) {
            $this->nestedVariableCals[] = $entity['name'];
        }

        if (count($this->nestedVariableCals) > 500) {
            // eg MatomoConfiguration variable referencing itself in a variable like matomoUrl=https://matomo.org{{MatomoConfiguration}}
            $entries = array_slice($this->nestedVariableCals, -3); // show last 3 entities in error message
            $entries = array_unique($entries);
            throw new EntityRecursionException(
                'It seems an entity references itself or a recursion is caused in some other way. It may be related due to these entites: "'
                . implode(',', $entries) . '". Please check if the entity references itself maybe or if a recursion might happen in another way.'
            );
        }

        $parameters = $entity['parameters'];
        $keyTemplateTypeSeparator = '____';

        $parameterTemplateTypes = array();
        if (!empty($entity['typeMetadata']['parameters'])) {
            foreach ($entity['typeMetadata']['parameters'] as $parameter) {
                // we replace variables only when the field type is a template

                if (Variable::hasFieldConfigVariableParameter($parameter)) {
                    $parameterTemplateTypes[] = $parameter['name'];
                }

                if (
                    !empty($parameter['uiControl']) && $parameter['uiControl'] === FieldConfig::UI_CONTROL_MULTI_TUPLE
                ) {
                    if (
                        !empty($parameter['uiControlAttributes']['field1']['key'])
                        && Variable::hasFieldConfigVariableParameter($parameter['uiControlAttributes']['field1'])
                    ) {
                        $parameterTemplateTypes[] = $parameter['name'] . $keyTemplateTypeSeparator . $parameter['uiControlAttributes']['field1']['key'];
                    }

                    if (
                        !empty($parameter['uiControlAttributes']['field2']['key'])
                        && Variable::hasFieldConfigVariableParameter($parameter['uiControlAttributes']['field2'])
                    ) {
                        $parameterTemplateTypes[] = $parameter['name'] . $keyTemplateTypeSeparator . $parameter['uiControlAttributes']['field2']['key'];
                    }
                }
            }
        }

        $vars = [];
        foreach ($parameters as $name => $value) {
            if (is_array($value)) {
                // needs to happen before resolving variables so only resolved variables can describe a variable
                $value = $this->removeVariableDescriptorKeys($value);
                if (in_array($name, $parameterTemplateTypes, true)) {
                    foreach ($value as $key => $subValue) {
                        if (is_array($subValue)) {
                            foreach ($subValue as $subKey => $subSubValue) {
                                if (in_array($name . $keyTemplateTypeSeparator . $subKey, $parameterTemplateTypes, true)) {
                                    $value[$key][$subKey] = $this->parameterToVariableJs($subSubValue, $container);
                                }
                            }
                        } else {
                            $value[$key] = $this->parameterToVariableJs($subValue, $container);
                        }
                    }
                }
                $vars[$name] = $value;
            } else {
                if (in_array($name, $parameterTemplateTypes, true)) {
                    $vars[$name] = $this->parameterToVariableJs($value, $container);
                } else {
                    $vars[$name] = $value;
                }
            }
        }

        if (!empty($entity['name'])) {
            array_pop($this->nestedVariableCals);
        }

        return $vars;
    }

    /**
     * Stored parameter values are user input and must never describe a variable themselves, otherwise they would be
     * rendered as a variable (including its template) in the container. Only parameterToVariableJs() may produce such
     * structures.
     *
     * @param array<mixed> $value
     * @return array<mixed>
     */
    private function removeVariableDescriptorKeys(array $value): array
    {
        unset($value['type'], $value['joinedVariable'], $value['Variable']);

        foreach ($value as $key => $subValue) {
            if (is_array($subValue)) {
                $value[$key] = $this->removeVariableDescriptorKeys($subValue);
            }
        }

        return $value;
    }

    private function mb_strpos($haystack, $needle, $offset)
    {
        if (function_exists('mb_strpos')) {
            return mb_strpos($haystack, $needle, $offset, 'UTF-8');
        }

        return strpos($haystack, $needle, $offset);
    }

    private function mb_strrpos($haystack, $needle, $offset)
    {
        if (function_exists('mb_strpos')) {
            return mb_strrpos($haystack, $needle, $offset, 'UTF-8');
        }

        return strrpos($haystack, $needle, $offset);
    }

    protected function parameterToVariableJs($value, $container)
    {
        if (is_scalar($value) && preg_match_all('/{{.+?}}/', $value, $matches)) {
            $multiVars = [];

            $pos = 0;

            do {
                $start = $this->mb_strpos($value, '{{', $pos);

                $end = false;
                if ($start !== false) {
                    // only if string contains a {{ we need to look to see if we find a matching end string
                    $end = $this->mb_strpos($value, '}}', $start);
                }

                if ($end !== false) {
                    // now this might seem random, but it is basically to detect if there are the brackets two times there
                    // like "foo{{notExisting{{PageUrl}}"  then we still detect "{{PageUrl}}"
                    $start = $this->mb_strrpos(Common::mb_substr($value, 0, $end), '{{', $pos);
                }

                if ($start === false || $end === false) {
                    $val = $this->substr($value, $pos);
                    if ($val !== '') {
                        $multiVars[] = $val;
                    }
                    break;
                }

                if ($start !== 0) {
                    // only if string does not start with "{{..."
                    $val = str_replace(array('\\{', '\\}'), array('{', '}'), $this->substr($value, $pos, $start - $pos)); // regular text
                    if ($val !== '') {
                        $multiVars[] = $val;
                    }
                }

                $ignoreLengthOpeningBrackets = 2;
                $variableName = Common::mb_substr($value, $start + $ignoreLengthOpeningBrackets, $end - ($start + $ignoreLengthOpeningBrackets));

                $trimmedVariableName = trim($variableName);
                if (
                    $trimmedVariableName
                    && Common::mb_substr($trimmedVariableName, 0, 1) !==  '{'
                ) {    // case when using {{{foobar}}
                    $var = $this->variableToArray($container, $trimmedVariableName);
                    if ($var) {
                        $multiVars[] = $var;
                    } else {
                        // the variable does not exist, therefore we simply add the text again
                        $multiVars[] = '{{' . $variableName . '}}';
                    }
                } else {
                    // the variable does not exist, therefore we simply add the text again
                    $multiVars[] = '{{' . $variableName . '}}';
                }

                $pos = $end + $ignoreLengthOpeningBrackets;
            } while (true);

            $allStrings = true;
            foreach ($multiVars as $var) {
                if (!is_string($var)) {
                    $allStrings = false;
                }
            }
            if ($allStrings) {
                // no variables detected... for simplicity we return one single string
                return implode('', $multiVars);
            }

            if (count($multiVars) === 1) {
                return array_shift($multiVars);
            } else {
                return array('joinedVariable' => $multiVars);
            }
        }

        // just a regular text value but does not contain a variable
        return $value;
    }

    private function substr($str, $start, $length = null)
    {
        if (function_exists('mb_substr')) {
            return mb_substr($str, $start, $length, 'UTF-8');
        }
        return substr($str, $start, $length);
    }

    /**
     * @phpstan-impure sets $referencesUnavailableVariable
     */
    protected function variableToArray($container, $variableNameOrVariable)
    {
        if (is_array($variableNameOrVariable)) {
            $variable = $variableNameOrVariable;
        } elseif (isset($this->variables[$variableNameOrVariable])) {
            return $this->variables[$variableNameOrVariable];
        } elseif (isset($this->unavailableVariables[$variableNameOrVariable])) {
            $this->referencesUnavailableVariable = true;
            return null;
        } else {
            $variable = $this->variableModel->findVariableByName($container['idsite'], $container['idcontainerversion'], $variableNameOrVariable);
        }
        if ($variable && isset($this->variables[$variable['name']])) {
            // resolved already, though the reference may differ in case from the stored name: resolving it again would
            // repeat the work for every reference and give equal but separate copies, which are slow to compare
            return $this->variables[$variable['name']];
        }
        if ($variable && (empty($variable['typeMetadata']) || isset($this->unavailableVariables[$variable['name']]))) {
            // the variable type is not available, eg because the plugin providing it is no longer active
            $this->markUnavailable($variableNameOrVariable, $variable['name']);
            return null;
        }
        if ($variable) {
            // a variable that references an unavailable variable is not available either
            $referencesUnavailableVariable = $this->referencesUnavailableVariable;
            $this->referencesUnavailableVariable = false;

            // a parameter the variable type no longer defines - an option hidden behind a feature
            // flag that has been turned off, say - is left out, as it would be when the variable is
            // next saved, so that a container released earlier stops applying it
            if (isset($variable['typeMetadata']['parameters']) && is_array($variable['parameters'] ?? null)) {
                $definedParameters = array_column($variable['typeMetadata']['parameters'], 'name');
                $variable['parameters'] = array_intersect_key($variable['parameters'], array_flip($definedParameters));
            }

            $parameters = $this->parametersToVariableJs($container, $variable);
            if ($this->referencesUnavailableVariable) {
                $this->markUnavailable($variableNameOrVariable, $variable['name']);
                return null;
            }
            $this->referencesUnavailableVariable = $referencesUnavailableVariable;

            $lookUpTable = [];
            if (!empty($variable['lookup_table']) && is_array($variable['lookup_table'])) {
                foreach ($variable['lookup_table'] as $lookup) {
                    $lookUpTable[] = ['matchValue' => $lookup['match_value'], 'outValue' => $lookup['out_value'], 'comparison' => $lookup['comparison']];
                }
            }

            $var = [
                'name' => $variable['name'],
                'type' => $variable['type'],
                'lookUpTable' => $lookUpTable,
                'defaultValue' => $variable['default_value'],
                'parameters' => $parameters
            ];
            // by setting var name key we make sure to not include same var twice
            $this->variables[$var['name']] = $var;
            $this->addResolvedVariable($var);
            return $var;
        } else {
            // try to find pre-configured variable if no user variable found
            $variable = $this->variablesProvider->getPreConfiguredVariable($variableNameOrVariable);
            if ($variable) {
                $defaultParams = [];
                foreach ($variable->getParameters() as $parameter) {
                    $defaultParams[$parameter->getName()] = $parameter->getValue();
                }
                $var = [
                    'name' => ucfirst($variable->getId()),
                    'type' => $variable->getId(),
                    'lookUpTable' => [],
                    'defaultValue' => null,
                    'parameters' => $this->parametersToVariableJs($container, array('parameters' => $defaultParams, 'typeMetadata' => array()))
                ];
                $this->variables[$var['name']] = $var;
                $this->addResolvedVariable($var);
                return $var;
            }

            if (is_string($variableNameOrVariable) && $this->variablesProvider->isDisabledInConfig($variableNameOrVariable)) {
                // a pre-configured variable disabled in the configuration is not available either
                $this->markUnavailable($variableNameOrVariable, $variableNameOrVariable);
            }
        }
    }

    /**
     * @param mixed $reference the name or array the variable was looked up by
     */
    private function markUnavailable($reference, string $name): void
    {
        $this->referencesUnavailableVariable = true;
        $this->unavailableVariables[$name] = true;
        if (is_string($reference)) {
            $this->unavailableVariables[$reference] = true;
        }
    }

    public function getOrder()
    {
        return 99;
    }

    /**
     * The preview release and any other release of the draft are generated last: they show the draft, which anyone
     * with write access can change, and must not keep the other releases from being generated when it fails.
     *
     * @param array<string, mixed> $container
     * @return array<int, array<string, mixed>>
     */
    protected function getReleasesInGenerationOrder(array $container): array
    {
        $idDraftVersion = (int) ($container['draft']['idcontainerversion'] ?? 0);
        $draftReleases = array_filter($container['releases'], function ($release) use ($idDraftVersion) {
            return $release['environment'] === Environment::ENVIRONMENT_PREVIEW
                || (int) $release['idcontainerversion'] === $idDraftVersion;
        });
        $otherReleases = array_diff_key($container['releases'], $draftReleases);

        return array_merge(array_values($otherReleases), array_values($draftReleases));
    }

    /**
     * A version published before the container limit existed may be over it, so a stored release of a version other
     * than the draft is held to TagManagerMaxStoredReleaseWeight instead, or to the container limit if that is higher.
     * Over that, the release keeps the file generated back then rather than failing every change to the container.
     * The draft, and a version that is about to be published, are held to TagManagerMaxContainerWeight.
     *
     * @param array<string, mixed> $container
     * @param array<string, mixed> $release
     * @return array<string, mixed>|null null when the release was skipped
     */
    protected function generateReleaseUnlessTooLarge(array $container, array $release): ?array
    {
        if (
            empty($release['idcontainerrelease'])
            || (int) $release['idcontainerversion'] === (int) ($container['draft']['idcontainerversion'] ?? 0)
        ) {
            return $this->generatePublicContainer($container, $release);
        }

        $this->maxWeight = max(
            self::getWeightLimit('TagManagerMaxStoredReleaseWeight', 'max_stored_release_size'),
            self::getWeightLimit('TagManagerMaxContainerWeight', 'max_container_size')
        );
        try {
            return $this->generatePublicContainer($container, $release);
        } catch (ContainerTooLargeException $e) {
            StaticContainer::get(LoggerInterface::class)->warning('Container {idContainer} of site {idSite} was not regenerated for environment {environment}: its version {idContainerVersion} is over the size limit.', [
                'idContainer' => $container['idcontainer'],
                'idSite' => $container['idsite'],
                'environment' => $release['environment'],
                'idContainerVersion' => $release['idcontainerversion'],
            ]);
            return null;
        } finally {
            $this->maxWeight = null;
        }
    }

    private static function getWeightLimit(string $entry, string $iniSetting): int
    {
        $limit = StaticContainer::get($entry);
        $limit = is_bool($limit) ? false : filter_var($limit, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
        if ($limit === false) {
            throw new \Exception("The [TagManager] {$iniSetting} config setting ({$entry}) must be a positive integer.");
        }

        return $limit;
    }

    /**
     * @param array<string, mixed> $container
     * @param array<string, mixed> $release
     * @return array<string, mixed>
     */
    protected function getEmptyPublicContainer(array $container, array $release): array
    {
        $version = $this->containerModel->getContainerVersion($container['idsite'], $container['idcontainer'], $release['idcontainerversion']);

        return [
            'id' => $container['idcontainer'],
            'isTagFireLimitAllowedInPreviewMode' => !empty($container['isTagFireLimitAllowedInPreviewMode']) ? 1 : 0,
            'idsite' => $container['idsite'],
            'versionName' => $version['name'],
            'revision' => $version['revision'],
            'environment' => $release['environment'],
            'tags' => [],
            'triggers' => [],
            'variables' => [],
        ];
    }

    /**
     * A release skipped for its size keeps the file generated before the limit, so only a lost file is replaced
     *
     * @param array<string, mixed> $container
     * @param array<string, mixed> $release
     * @param callable(): string $buildPlaceholder
     * @return string|null the saved placeholder, or null when the file exists
     */
    protected function savePlaceholderIfMissing(array $container, array $release, string $path, callable $buildPlaceholder): ?string
    {
        if (in_array(PIWIK_DOCUMENT_ROOT . $path, $this->storage->find(dirname(PIWIK_DOCUMENT_ROOT . $path), basename($path)), true)) {
            return null;
        }

        $placeholder = $buildPlaceholder();
        $this->storage->save(PIWIK_DOCUMENT_ROOT . $path, $placeholder);
        StaticContainer::get(LoggerInterface::class)->error('Container {idContainer} of site {idSite} now serves an empty container for environment {environment}: '
            . 'its file was missing and its version {idContainerVersion} is over the size limit.', [
            'idContainer' => $container['idcontainer'],
            'idSite' => $container['idsite'],
            'environment' => $release['environment'],
            'idContainerVersion' => $release['idcontainerversion'],
        ]);
        return $placeholder;
    }

    public function toArray()
    {
        return array(
            'id' => $this->getId(),
            'name' => $this->getName(),
        );
    }

    public function getJsTargetPath($idSite, $idContainer, $environment, $containerCreatedDate)
    {
        $idSite = (int) $idSite;
        $path = StaticContainer::get('TagManagerContainerStorageDir') . '/' . StaticContainer::get('TagManagerContainerFilesPrefix') . $idContainer;
        if ($environment === Environment::ENVIRONMENT_PREVIEW) {
            // we do not add a hash here with the salt as the preview may be public, and if this was public, they could
            // calculate the salt from the hash which would then allow to calculate other hashes
            $path .= '_' . $environment;
        } elseif ($environment !== Environment::ENVIRONMENT_LIVE) {
            // we need to add a random ID behind it, otherwise people would be able to guess the path to dev or staging
            // environment and see in advance what might be rolled out soon, what is being tested, etc. We make sure to
            // have two/three random factors in here not only the salt to reduce chances of being able to calculate the salt
            $path .= '_' . $environment . '_' . substr(sha1($idContainer . $idSite . $containerCreatedDate . $environment . $this->salt->getSalt()), 0, 24);
        }
        return $path;
    }

    public static function removeAllFilesOfAllContainers()
    {
        $files = self::findFiles(PIWIK_DOCUMENT_ROOT . StaticContainer::get('TagManagerContainerStorageDir'), StaticContainer::get('TagManagerContainerFilesPrefix') . '*.js');
        if (!empty($files)) {
            foreach ($files as $file) {
                self::deleteFile($file);
            }
        }
        return count($files);
    }

    public static function removeAllContainerFiles($idContainer)
    {
        if (empty($idContainer) || strlen($idContainer) <= 5) {
            return; // prevent accidental deletion of multiple container files
        }

        $files = self::findFiles(PIWIK_DOCUMENT_ROOT . StaticContainer::get('TagManagerContainerStorageDir'), sprintf('%s%s*.js', StaticContainer::get('TagManagerContainerFilesPrefix'), $idContainer));
        if (!empty($files)) {
            foreach ($files as $file) {
                self::deleteFile($file);
            }
        }
        return count($files);
    }

    private static function deleteFile($file)
    {
        $storage = StaticContainer::get('Piwik\Plugins\TagManager\Context\Storage\StorageInterface');
        $storage->delete($file);
    }

    private static function findFiles($sdir, $spattern)
    {
        $storage = StaticContainer::get('Piwik\Plugins\TagManager\Context\Storage\StorageInterface');
        return $storage->find($sdir, $spattern);
    }

    public static function removeNoLongerExistingEnvironments($availableEnvironments)
    {
        if (!is_array($availableEnvironments)) {
            return array();
        }

        $availableEnvironments[] = Environment::ENVIRONMENT_LIVE; // we make sure they are set as we never want to remove them
        $availableEnvironments[] = Environment::ENVIRONMENT_PREVIEW;

        $basePath = PIWIK_DOCUMENT_ROOT . StaticContainer::get('TagManagerContainerStorageDir');
        $files = self::findFiles($basePath, StaticContainer::get('TagManagerContainerFilesPrefix') . '*.js');
        $environmentsDeleted = array();
        if (!empty($files)) {
            foreach ($files as $file) {
                $filename = str_replace($basePath . '/' . StaticContainer::get('TagManagerContainerFilesPrefix'), '', $file);
                $filename = str_replace('.js', '', $filename);
                // <container>_<environment>_<hash>, environment may contain underscores
                // we ignore preview environment and live environment already by design but also define it specifically
                if (preg_match('/^[^_]+_(.+)_[0-9a-f]{24}$/', $filename, $matches)) {
                    $env = $matches[1];

                    try {
                        Environment::checkEnvironmentNameFormat($env);
                    } catch (\Exception $e) {
                        // for some reason not a valid environment... we make sure to not delete anything weird
                        continue;
                    }

                    if (!in_array($env, $availableEnvironments)) {
                        $environmentsDeleted[] = $env;
                        self::deleteFile($file);
                    }
                }
            }
        }
        return $environmentsDeleted;
    }
}
