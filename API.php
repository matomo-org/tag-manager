<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager;

use Piwik\API\Request;
use Piwik\Common;
use Piwik\Container\StaticContainer;
use Piwik\Date;
use Piwik\Piwik;
use Piwik\Plugins\TagManager\Access\Capability\PublishLiveContainer;
use Piwik\Plugins\TagManager\API\Export;
use Piwik\Plugins\TagManager\API\Import;
use Piwik\Plugins\TagManager\API\PreviewCookie;
use Piwik\Plugins\TagManager\API\TemplateMetadata;
use Piwik\Plugins\TagManager\Context\WebContext;
use Piwik\Plugins\TagManager\Dao\BaseDao;
use Piwik\Plugins\TagManager\Dao\ContainersDao;
use Piwik\Plugins\TagManager\Dao\VariablesDao;
use Piwik\Plugins\TagManager\Exception\EntityRecursionException;
use Piwik\Plugins\TagManager\Input\AccessValidator;
use Piwik\Plugins\TagManager\Model\Comparison;
use Piwik\Plugins\TagManager\Model\Container;
use Piwik\Plugins\TagManager\Model\Environment;
use Piwik\Plugins\TagManager\Model\Tag;
use Piwik\Plugins\TagManager\Model\Trigger;
use Piwik\Plugins\TagManager\Model\Variable;
use Piwik\Plugins\TagManager\Context\ContextProvider;
use Piwik\Plugins\TagManager\Template\Tag\MatomoTag;
use Piwik\Plugins\TagManager\Template\Tag\TagsProvider;
use Piwik\Plugins\TagManager\Template\Trigger\PageViewTrigger;
use Piwik\Plugins\TagManager\Template\Trigger\TriggersProvider;
use Piwik\Plugins\TagManager\Template\Variable\MatomoConfigurationVariable;
use Piwik\Plugins\TagManager\Template\Variable\VariablesProvider;
use Exception;
use Piwik\UrlHelper;
use Piwik\Validators\BaseValidator;
use Piwik\Validators\CharacterLength;
use Piwik\Validators\NotEmpty;

/**
 * Exposes the Tag Manager API for managing containers, versions, tags, triggers, and variables.
 *
 * The endpoints also provide installation metadata, publishing workflows, preview controls, and import/export
 * operations. A container may have several versions, and the current editable version is exposed as the "draft"
 * version by {@link TagManager.getContainer}.
 *
 * @method static \Piwik\Plugins\TagManager\API getInstance()
 */
class API extends \Piwik\Plugin\API
{
    /**
     * @var Tag
     */
    private $tags;

    /**
     * @var Trigger
     */
    private $triggers;

    /**
     * @var Variable
     */
    private $variables;

    /**
     * @var Container
     */
    private $containers;

    /**
     * @var TagsProvider
     */
    private $tagsProvider;

    /**
     * @var TriggersProvider
     */
    private $triggersProvider;

    /**
     * @var VariablesProvider
     */
    private $variablesProvider;

    /**
     * @var ContextProvider
     */
    private $contextProvider;

    /**
     * @var Environment
     */
    private $environment;

    /**
     * @var Comparison
     */
    private $comparisons;

    /**
     * @var AccessValidator
     */
    private $accessValidator;

    /**
     * @var Export
     */
    private $export;

    /**
     * @var Import
     */
    private $import;

    /**
     * @var VariablesDao
     */
    private $variablesDao;

    private $enableGeneratePreview = true;

    public function __construct(
        Tag $tags,
        Trigger $triggers,
        Variable $variables,
        Container $containers,
        TagsProvider $tagsProvider,
        TriggersProvider $triggersProvider,
        VariablesProvider $variablesProvider,
        ContextProvider $contextProvider,
        AccessValidator $validator,
        Environment $environment,
        Comparison $comparisons,
        Export $export,
        Import $import,
        VariablesDao $variablesDao
    ) {
        //Started updating xdebug.max_nesting_level as infinite loop is detected due to variable is doing a self referencing when xdebug is active and max_nesting_level is set to lower value
        if (extension_loaded('xdebug')) {
            $xdebugMaxNestingLevel = ini_get('xdebug.max_nesting_level');
            if ($xdebugMaxNestingLevel && is_numeric($xdebugMaxNestingLevel) && $xdebugMaxNestingLevel < 2500) {
                ini_set('xdebug.max_nesting_level', 2500);
            }
        }
        $this->tags = $tags;
        $this->triggers = $triggers;
        $this->variables = $variables;
        $this->containers = $containers;
        $this->tagsProvider = $tagsProvider;
        $this->triggersProvider = $triggersProvider;
        $this->variablesProvider = $variablesProvider;
        $this->contextProvider = $contextProvider;
        $this->environment = $environment;
        $this->accessValidator = $validator;
        $this->export = $export;
        $this->import = $import;
        $this->comparisons = $comparisons;
        $this->variablesDao = $variablesDao;
    }

    /**
     * Returns the contexts that currently expose at least one tag type.
     *
     * @return array<int, array<string, mixed>> The available context definitions, such as "web", "android", or
     *                                          "ios".
     */
    public function getAvailableContexts()
    {
        Piwik::checkUserHasSomeViewAccess();
        $this->checkUserHasTagManagerAccess();

        $contexts = $this->contextProvider->getAllContexts();

        $return = array();
        foreach ($contexts as $context) {
            $tags = $this->getAvailableTagTypesInContext($context->getId());
            if (!empty($tags)) {
                $return[] = $context->toArray();
            }
        }

        return $return;
    }

    /**
     * Returns the environments that can receive container releases.
     *
     * @return array<int, array<string, mixed>> The configured environments, such as "live", "dev", and "staging".
     */
    public function getAvailableEnvironments()
    {
        Piwik::checkUserHasSomeViewAccess();
        $this->checkUserHasTagManagerAccess();

        return $this->environment->getEnvironments();
    }

    /**
     * Returns the environments the current user can publish to for a site.
     *
     * @param int $idSite The numeric ID of the website to query.
     * @return array<int, array<string, mixed>> The publishable environments for the site, excluding "live" when the
     *                                          user lacks that capability.
     */
    public function getAvailableEnvironmentsWithPublishCapability($idSite)
    {
        Piwik::checkUserHasSomeViewAccess();
        $this->checkUserHasTagManagerAccess($idSite);

        $environments = $this->environment->getEnvironments();

        $hasCapability = $this->accessValidator->hasPublishLiveEnvironmentCapability($idSite);

        return array_filter($environments, function ($environment) use ($idSite, $hasCapability) {
            if ($environment['id'] === 'live' && !$hasCapability) {
                return false;
            }
            return true;
        });
    }

    /**
     * Returns the supported fire limit options for tags.
     *
     * @return array<int, array<string, mixed>> The available fire limit IDs and translated labels.
     */
    public function getAvailableTagFireLimits()
    {
        Piwik::checkUserHasSomeViewAccess();
        $this->checkUserHasTagManagerAccess();

        return $this->tags->getFireLimits();
    }

    /**
     * Returns the comparison operators available for trigger conditions and variable lookup tables.
     *
     * @return array<int, array<string, mixed>> The supported comparison definitions.
     */
    public function getAvailableComparisons()
    {
        Piwik::checkUserHasSomeViewAccess();
        $this->checkUserHasTagManagerAccess();

        return $this->comparisons->getSupportedComparisons();
    }

    /**
     * Returns the tag templates that support the requested context.
     *
     * @param string $idContext The context ID to query, for example "web", "android", or "ios".
     * @return array<int, array<string, mixed>> The tag template metadata available in the context.
     */
    public function getAvailableTagTypesInContext($idContext)
    {
        Piwik::checkUserHasSomeViewAccess();
        $this->checkUserHasTagManagerAccess();

        $this->contextProvider->checkIsValidContext($idContext);

        $tags = $this->tagsProvider->getAllTags();

        $tagsInContext = [];
        foreach ($tags as $tag) {
            // GA3 tag deprecated
            if ($tag->getId() === 'GoogleAnalyticsUniversal') {
                continue;
            }
            if (in_array($idContext, $tag->getSupportedContexts(), true)) {
                $tagsInContext[] = $tag;
            }
        }

        $templateMetadata = new TemplateMetadata();
        return $templateMetadata->formatTemplates($tagsInContext);
    }

    /**
     * Returns the trigger templates that support the requested context.
     *
     * @param string $idContext The context ID to query, for example "web", "android", or "ios".
     * @return array<int, array<string, mixed>> The trigger template metadata available in the context.
     */
    public function getAvailableTriggerTypesInContext($idContext)
    {
        Piwik::checkUserHasSomeViewAccess();
        $this->checkUserHasTagManagerAccess();

        $this->contextProvider->checkIsValidContext($idContext);

        $triggers = $this->triggersProvider->getAllTriggers();

        $triggersInContext = [];
        foreach ($triggers as $trigger) {
            if (in_array($idContext, $trigger->getSupportedContexts(), true)) {
                $triggersInContext[] = $trigger;
            }
        }

        $templateMetadata = new TemplateMetadata();
        return $templateMetadata->formatTemplates($triggersInContext);
    }

    /**
     * Returns the manually creatable variable templates that support the requested context.
     *
     * @param string $idContext The context ID to query, for example "web", "android", or "ios".
     * @return array<int, array<string, mixed>> The variable template metadata available in the context, excluding
     *                                          preconfigured variables.
     */
    public function getAvailableVariableTypesInContext($idContext)
    {
        Piwik::checkUserHasSomeViewAccess();
        $this->checkUserHasTagManagerAccess();

        $this->contextProvider->checkIsValidContext($idContext);

        $variables = $this->variablesProvider->getAllVariables();

        $variablesInContext = [];
        foreach ($variables as $variable) {
            if (!$variable->isPreConfigured() && in_array($idContext, $variable->getSupportedContexts(), true)) {
                $variablesInContext[] = $variable;
            }
        }

        $templateMetadata = new TemplateMetadata();
        return $templateMetadata->formatTemplates($variablesInContext);
    }

    private function unsanitizeAssocArray($parameters)
    {
        if (!empty($parameters) && is_array($parameters)) {
            foreach ($parameters as $index => $value) {
                if (is_string($value)) {
                    $parameters[$index] = Common::unsanitizeInputValue($value);
                } elseif (is_array($value)) {
                    $parameters[$index] = $this->unsanitizeAssocArray($value);
                }
            }
        }
        return $parameters;
    }

    /**
     * Returns the embed code for loading a container release on a website.
     *
     * This endpoint currently supports only containers in the "web" context.
     *
     * @param int $idSite The numeric ID of the website to query.
     * @param string $idContainer The container ID, for example "6OMh6taM".
     * @param string $environment The environment ID to load, for example "live".
     * @return string The HTML and JavaScript embed snippet for the requested container release.
     */
    public function getContainerEmbedCode($idSite, $idContainer, $environment)
    {
        $this->accessValidator->checkViewPermission($idSite);
        $this->containers->checkContainerExists($idSite, $idContainer);

        $instructions = $this->containers->getContainerInstallInstructions($idSite, $idContainer, $environment);
        $instruction = array_shift($instructions);
        return $instruction['embedCode'];
    }

    /**
     * Returns installation instructions for embedding a container release.
     *
     * @param int $idSite The numeric ID of the website to query.
     * @param string $idContainer The container ID, for example "6OMh6taM".
     * @param string $environment The environment ID to load, for example "live".
     * @param string $jsFramework The JavaScript framework variant to return, for example "react".
     * @return array<int, array<string, mixed>> The install instruction steps and metadata for the requested
     *                                          container release.
     */
    public function getContainerInstallInstructions($idSite, $idContainer, $environment, $jsFramework = '')
    {
        $this->accessValidator->checkViewPermission($idSite);
        $this->containers->checkContainerExists($idSite, $idContainer);

        return $this->containers->getContainerInstallInstructions($idSite, $idContainer, $environment, $jsFramework);
    }

    /**
     * Returns all configured tags in a container version.
     *
     * @param int $idSite The numeric ID of the website to query.
     * @param string $idContainer The container ID, for example "6OMh6taM".
     * @param int $idContainerVersion The container version ID to inspect.
     * @return array<int, array<string, mixed>> The configured tags in the requested container version.
     */
    public function getContainerTags($idSite, $idContainer, $idContainerVersion)
    {
        $this->accessValidator->checkViewPermission($idSite);
        $this->containers->checkContainerVersionExists($idSite, $idContainer, $idContainerVersion);

        return $this->tags->getContainerTags($idSite, $idContainerVersion);
    }

    /**
     * Creates a default web container for a site with the standard Matomo tracking setup.
     *
     * The created draft includes a Matomo configuration variable, a page view trigger, an initial Matomo tag, and a
     * first published live release.
     *
     * @param int $idSite The numeric ID of the website to query.
     * @return string The ID of the created container.
     */
    public function createDefaultContainerForSite($idSite)
    {
        $this->accessValidator->checkWriteCapability($idSite);

        $loop = 0;
        $idContainer = null;
        while (empty($idContainer) && $loop <= 50) {
            // we try up to 51 times whether a name is available, and otherwise we give up
            $name = Piwik::translate('TagManager_DefaultContainer');
            if ($loop > 0) {
                $name .= ' ' . $loop;
            }
            try {
                $idContainer = Request::processRequest('TagManager.addContainer', array(
                    'idSite' => $idSite,
                    'context' => WebContext::ID,
                    'name' => $name,
                    'description' => Piwik::translate('TagManager_AutoGeneratedContainerDescription')
                ), $default = []);
            } catch (Exception $e) {
                if ($e->getCode() !== ContainersDao::ERROR_NAME_IN_USE || $loop === 50) {
                    throw $e;
                }
                $loop++;
            }
        }

        $draftVersion = $this->getContainerDraftVersion($idSite, $idContainer);

        $idVariable = Request::processRequest('TagManager.addContainerVariable', array(
            'idSite' => $idSite,
            'idContainer' => $idContainer,
            'idContainerVersion' => $draftVersion,
            'type' => MatomoConfigurationVariable::ID,
            'name' => Piwik::translate('TagManager_MatomoConfigurationVariableName'),
        ), $default = []);

        $idTrigger = Request::processRequest('TagManager.addContainerTrigger', array(
            'idSite' => $idSite,
            'idContainer' => $idContainer,
            'idContainerVersion' => $draftVersion,
            'type' => PageViewTrigger::ID,
            'name' => Piwik::translate('TagManager_PageViewTriggerName'),
        ), $default = []);

        $idTag = Request::processRequest('TagManager.addContainerTag', array(
            'idSite' => $idSite,
            'idContainer' => $idContainer,
            'idContainerVersion' => $draftVersion,
            'type' => MatomoTag::ID,
            'name' => Piwik::translate('TagManager_MatomoTagName'),
            'fireTriggerIds' => array($idTrigger),
            'parameters' => array(
                MatomoTag::PARAM_MATOMO_CONFIG => '{{' . Piwik::translate('TagManager_MatomoConfigurationVariableName') . '}}'
            )
        ), $default = []);

        Request::processRequest('TagManager.createContainerVersion', array(
            'idSite' => $idSite,
            'idContainer' => $idContainer,
            'name' => substr('0.1.0 - ' . Piwik::translate('TagManager_AutoGenerated'), 0, 50),
        ), $default = []);
        Request::processRequest('TagManager.publishContainerVersion', array(
            'idSite' => $idSite,
            'idContainer' => $idContainer,
            'idContainerVersion' => $draftVersion,
            'environment' => Environment::ENVIRONMENT_LIVE,
        ), $default = []);
        return $idContainer;
    }

    /**
     * Creates a tag in the requested container version.
     *
     * @param int $idSite The numeric ID of the website to query.
     * @param string $idContainer The container ID, for example "6OMh6taM".
     * @param int $idContainerVersion The container version ID to modify.
     * @param string $type The tag template ID to create, for example "Matomo".
     * @param string $name The display name for the tag.
     * @param array<string, mixed> $parameters Parameter values keyed by template parameter name.
     * @param int[] $fireTriggerIds Trigger IDs that cause the tag to fire. At least one trigger must be provided.
     * @param int[] $blockTriggerIds Trigger IDs that prevent the tag from firing after they match.
     * @param string $fireLimit Fire limit ID to apply to the tag. Use
     *                          {@link TagManager.getAvailableTagFireLimits} to list supported values.
     * @param int $fireDelay Delay in milliseconds before the tag executes after a fire trigger matches.
     * @param int $priority Execution priority for the tag. Lower values run earlier when multiple tags fire together.
     * @param string|null $startDate UTC datetime after which the tag may execute.
     * @param string|null $endDate UTC datetime after which the tag must no longer execute.
     * @param string|null $description Optional tag description.
     * @param string $status Optional initial status for the created tag.
     * @return int The ID of the created tag.
     */
    public function addContainerTag(
        $idSite,
        $idContainer,
        $idContainerVersion,
        $type,
        $name,
        $parameters = [],
        $fireTriggerIds = [],
        $blockTriggerIds = [],
        $fireLimit = 'unlimited',
        $fireDelay = 0,
        $priority = 999,
        $startDate = null,
        $endDate = null,
        $description = '',
        $status = ''
    ) {
        $name = trim($this->decodeQuotes($name));
        $this->accessValidator->checkWriteCapability($idSite);
        $this->assertUserCanEditContainerVersion($idSite, $idContainer, $idContainerVersion);

        if ($this->tagsProvider->isCustomTemplate($type) && !Piwik::isUserHasCapability($idSite, PublishLiveContainer::ID)) {
            $this->accessValidator->checkUseCustomTemplatesCapability($idSite);
        }

        $parameters = $this->unsanitizeAssocArray($parameters);

        $idTag = $this->tags->addContainerTag($idSite, $idContainerVersion, $type, $name, $parameters, $fireTriggerIds, $blockTriggerIds, $fireLimit, $fireDelay, $priority, $startDate, $endDate, $description, $status);
        $this->updateContainerPreviewRelease($idSite, $idContainer);
        return $idTag;
    }

    /**
     * Updates a tag in the requested container version.
     *
     * @param int $idSite The numeric ID of the website to query.
     * @param string $idContainer The container ID, for example "6OMh6taM".
     * @param int $idContainerVersion The container version ID to modify.
     * @param int $idTag The tag ID to update.
     * @param string $name The updated display name for the tag.
     * @param array<string, mixed> $parameters Parameter values keyed by template parameter name.
     * @param int[] $fireTriggerIds Trigger IDs that cause the tag to fire. At least one trigger must be provided.
     * @param int[] $blockTriggerIds Trigger IDs that prevent the tag from firing after they match.
     * @param string $fireLimit Fire limit ID to apply to the tag. Use
     *                          {@link TagManager.getAvailableTagFireLimits} to list supported values.
     * @param int $fireDelay Delay in milliseconds before the tag executes after a fire trigger matches.
     * @param int $priority Execution priority for the tag. Lower values run earlier when multiple tags fire together.
     * @param string|null $startDate UTC datetime after which the tag may execute.
     * @param string|null $endDate UTC datetime after which the tag must no longer execute.
     * @param string|null $description Optional tag description.
     * @return void
     */
    public function updateContainerTag(
        $idSite,
        $idContainer,
        $idContainerVersion,
        $idTag,
        $name,
        $parameters = [],
        $fireTriggerIds = [],
        $blockTriggerIds = [],
        $fireLimit = 'unlimited',
        $fireDelay = 0,
        $priority = 999,
        $startDate = null,
        $endDate = null,
        $description = ''
    ) {
        $name = trim($this->decodeQuotes($name));
        $this->accessValidator->checkWriteCapability($idSite);
        $this->assertUserCanEditContainerVersion($idSite, $idContainer, $idContainerVersion);

        $tag = $this->tags->getContainerTag($idSite, $idContainerVersion, $idTag);
        if (!empty($tag) && $this->tagsProvider->isCustomTemplate($tag['type'])) {
            $this->accessValidator->checkUseCustomTemplatesCapability($idSite);
        }

        $parameters = $this->unsanitizeAssocArray($parameters);

        $return = $this->tags->updateContainerTag($idSite, $idContainerVersion, $idTag, $name, $parameters, $fireTriggerIds, $blockTriggerIds, $fireLimit, $fireDelay, $priority, $startDate, $endDate, $description);
        $this->updateContainerPreviewRelease($idSite, $idContainer);
        return $return;
    }

    /**
     * Deletes a tag from a container version.
     *
     * @param int $idSite The numeric ID of the website to query.
     * @param string $idContainer The container ID, for example "6OMh6taM".
     * @param int $idContainerVersion The container version ID to modify.
     * @param int $idTag The tag ID to delete.
     * @return void
     */
    public function deleteContainerTag($idSite, $idContainer, $idContainerVersion, $idTag)
    {
        $this->accessValidator->checkWriteCapability($idSite);
        $this->assertUserCanEditContainerVersion($idSite, $idContainer, $idContainerVersion);

        $tag = $this->getContainerTag($idSite, $idContainer, $idContainerVersion, $idTag);
        if ($tag) {
            if ($this->tagsProvider->isCustomTemplate($tag['type'])) {
                $this->accessValidator->checkUseCustomTemplatesCapability($idSite);
            }
            $this->tags->deleteContainerTag($idSite, $idContainerVersion, $idTag);
            $this->updateContainerPreviewRelease($idSite, $idContainer);
            Piwik::postEvent('TagManager.deleteContainerTag.end', array(array(
                'idSite' => $idSite,
                'idContainer' => $idContainer,
                'idContainerVersion' => $idContainerVersion,
                'idTag' => $idTag
            )));
        }
    }

    /**
     * Pauses a tag in a container version.
     *
     * @param int $idSite The numeric ID of the website to query.
     * @param string $idContainer The container ID, for example "6OMh6taM".
     * @param int $idContainerVersion The container version ID to modify.
     * @param int $idTag The tag ID to pause.
     * @return bool Returns `true` when the tag was found and paused, or `false` when no matching tag exists.
     */
    public function pauseContainerTag($idSite, $idContainer, $idContainerVersion, $idTag)
    {
        $this->accessValidator->checkWriteCapability($idSite);
        $this->assertUserCanEditContainerVersion($idSite, $idContainer, $idContainerVersion);

        $tag = $this->getContainerTag($idSite, $idContainer, $idContainerVersion, $idTag);
        if ($tag) {
            if ($this->tagsProvider->isCustomTemplate($tag['type'])) {
                $this->accessValidator->checkUseCustomTemplatesCapability($idSite);
            }
            $this->tags->pauseContainerTag($idSite, $idContainerVersion, $idTag);
            $this->updateContainerPreviewRelease($idSite, $idContainer);
            Piwik::postEvent('TagManager.pauseContainerTag.end', array(array(
                'idSite' => $idSite,
                'idContainer' => $idContainer,
                'idContainerVersion' => $idContainerVersion,
                'idTag' => $idTag
            )));

            return true;
        }

        return false;
    }

    /**
     * Resumes a paused tag in a container version.
     *
     * @param int $idSite The numeric ID of the website to query.
     * @param string $idContainer The container ID, for example "6OMh6taM".
     * @param int $idContainerVersion The container version ID to modify.
     * @param int $idTag The tag ID to resume.
     * @return bool Returns `true` when the tag was found and resumed, or `false` when no matching tag exists.
     */
    public function resumeContainerTag($idSite, $idContainer, $idContainerVersion, $idTag)
    {
        $this->accessValidator->checkWriteCapability($idSite);
        $this->assertUserCanEditContainerVersion($idSite, $idContainer, $idContainerVersion);

        $tag = $this->getContainerTag($idSite, $idContainer, $idContainerVersion, $idTag);
        if ($tag) {
            if ($this->tagsProvider->isCustomTemplate($tag['type'])) {
                $this->accessValidator->checkUseCustomTemplatesCapability($idSite);
            }
            $this->tags->resumeContainerTag($idSite, $idContainerVersion, $idTag);
            $this->updateContainerPreviewRelease($idSite, $idContainer);
            Piwik::postEvent('TagManager.resumeContainerTag.end', array(array(
                'idSite' => $idSite,
                'idContainer' => $idContainer,
                'idContainerVersion' => $idContainerVersion,
                'idTag' => $idTag
            )));

            return true;
        }

        return false;
    }

    /**
     * Returns the configuration for a specific tag.
     *
     * @param int $idSite The numeric ID of the website to query.
     * @param string $idContainer The container ID, for example "6OMh6taM".
     * @param int $idContainerVersion The container version ID to inspect.
     * @param int $idTag The tag ID to fetch.
     * @return array<string, mixed>|false The tag configuration, or `false` when the tag does not exist in the
     *                                    version.
     */
    public function getContainerTag($idSite, $idContainer, $idContainerVersion, $idTag)
    {
        $this->accessValidator->checkViewPermission($idSite);
        $this->containers->checkContainerVersionExists($idSite, $idContainer, $idContainerVersion);

        return $this->tags->getContainerTag($idSite, $idContainerVersion, $idTag);
    }

    /**
     * Returns the places where a trigger is referenced in a container version.
     *
     * A trigger must no longer be referenced before it can be deleted.
     *
     * @param int $idSite The numeric ID of the website to query.
     * @param string $idContainer The container ID, for example "6OMh6taM".
     * @param int $idContainerVersion The container version ID to inspect.
     * @param int $idTrigger The trigger ID to inspect.
     * @return array<int, array<string, mixed>> The tag references that currently use the trigger.
     */
    public function getContainerTriggerReferences($idSite, $idContainer, $idContainerVersion, $idTrigger)
    {
        $this->accessValidator->checkViewPermission($idSite);
        $this->containers->checkContainerVersionExists($idSite, $idContainer, $idContainerVersion);

        $references = $this->triggers->getTriggerReferences($idSite, $idContainerVersion, $idTrigger);

        return $references;
    }

    /**
     * Returns all configured triggers in a container version.
     *
     * @param int $idSite The numeric ID of the website to query.
     * @param string $idContainer The container ID, for example "6OMh6taM".
     * @param int $idContainerVersion The container version ID to inspect.
     * @return array<int, array<string, mixed>> The configured triggers in the requested container version.
     */
    public function getContainerTriggers($idSite, $idContainer, $idContainerVersion)
    {
        $this->accessValidator->checkViewPermission($idSite);
        $this->containers->checkContainerVersionExists($idSite, $idContainer, $idContainerVersion);

        return $this->triggers->getContainerTriggers($idSite, $idContainerVersion);
    }

    /**
     * Creates a trigger in the requested container version.
     *
     * @param int $idSite The numeric ID of the website to query.
     * @param string $idContainer The container ID, for example "6OMh6taM".
     * @param int $idContainerVersion The container version ID to modify.
     * @param string $type The trigger template ID to create, for example "AllElements".
     * @param string $name The display name for the trigger.
     * @param array<string, mixed> $parameters Parameter values keyed by template parameter name.
     * @param array<int, array<string, mixed>> $conditions Trigger conditions that determine when the trigger matches.
     *                                                     Use {@link TagManager.getAvailableComparisons} to list
     *                                                     supported comparison operators.
     * @param string|null $description Optional trigger description.
     * @return int The ID of the created trigger.
     */
    public function addContainerTrigger($idSite, $idContainer, $idContainerVersion, $type, $name, $parameters = [], $conditions = [], $description = '')
    {
        $name = trim($this->decodeQuotes($name));
        $this->accessValidator->checkWriteCapability($idSite);
        $this->assertUserCanEditContainerVersion($idSite, $idContainer, $idContainerVersion);

        if ($this->triggersProvider->isCustomTemplate($type) && !Piwik::isUserHasCapability($idSite, PublishLiveContainer::ID)) {
            $this->accessValidator->checkUseCustomTemplatesCapability($idSite);
        }

        $parameters = $this->unsanitizeAssocArray($parameters);
        $conditions = $this->unsanitizeAssocArray($conditions);

        $idTrigger = $this->triggers->addContainerTrigger($idSite, $idContainerVersion, $type, $name, $parameters, $conditions, $description);
        $this->updateContainerPreviewRelease($idSite, $idContainer);
        return $idTrigger;
    }

    /**
     * Updates a trigger in the requested container version.
     *
     * @param int $idSite The numeric ID of the website to query.
     * @param string $idContainer The container ID, for example "6OMh6taM".
     * @param int $idContainerVersion The container version ID to modify.
     * @param int $idTrigger The trigger ID to update.
     * @param string $name The updated display name for the trigger.
     * @param array<string, mixed> $parameters Parameter values keyed by template parameter name.
     * @param array<int, array<string, mixed>> $conditions Trigger conditions that determine when the trigger matches.
     *                                                     Use {@link TagManager.getAvailableComparisons} to list
     *                                                     supported comparison operators.
     * @param string|null $description Optional trigger description.
     * @return void
     */
    public function updateContainerTrigger($idSite, $idContainer, $idContainerVersion, $idTrigger, $name, $parameters = [], $conditions = [], $description = '')
    {
        $name = trim($this->decodeQuotes($name));
        $this->accessValidator->checkWriteCapability($idSite);
        $this->assertUserCanEditContainerVersion($idSite, $idContainer, $idContainerVersion);

        $trigger = $this->triggers->getContainerTrigger($idSite, $idContainerVersion, $idTrigger);
        if (!empty($trigger) && $this->triggersProvider->isCustomTemplate($trigger['type'])) {
            $this->accessValidator->checkUseCustomTemplatesCapability($idSite);
        }

        $parameters = $this->unsanitizeAssocArray($parameters);
        $conditions = $this->unsanitizeAssocArray($conditions);

        $return = $this->triggers->updateContainerTrigger($idSite, $idContainerVersion, $idTrigger, $name, $parameters, $conditions, $description);
        $this->updateContainerPreviewRelease($idSite, $idContainer);
        return $return;
    }

    /**
     * Deletes a trigger from a container version.
     *
     * @param int $idSite The numeric ID of the website to query.
     * @param string $idContainer The container ID, for example "6OMh6taM".
     * @param int $idContainerVersion The container version ID to modify.
     * @param int $idTrigger The trigger ID to delete.
     * @return void
     */
    public function deleteContainerTrigger($idSite, $idContainer, $idContainerVersion, $idTrigger)
    {
        $this->accessValidator->checkWriteCapability($idSite);
        $this->assertUserCanEditContainerVersion($idSite, $idContainer, $idContainerVersion);

        $trigger = $this->getContainerTrigger($idSite, $idContainer, $idContainerVersion, $idTrigger);
        if ($trigger) {
            if ($this->triggersProvider->isCustomTemplate($trigger['type'])) {
                $this->accessValidator->checkUseCustomTemplatesCapability($idSite);
            }
            $this->triggers->deleteContainerTrigger($idSite, $idContainerVersion, $idTrigger);
            $this->updateContainerPreviewRelease($idSite, $idContainer);
            Piwik::postEvent('TagManager.deleteContainerTrigger.end', array(array(
                'idSite' => $idSite,
                'idContainer' => $idContainer,
                'idContainerVersion' => $idContainerVersion,
                'idTrigger' => $idTrigger
            )));
        }
    }

    /**
     * Returns the configuration for a specific trigger.
     *
     * @param int $idSite The numeric ID of the website to query.
     * @param string $idContainer The container ID, for example "6OMh6taM".
     * @param int $idContainerVersion The container version ID to inspect.
     * @param int $idTrigger The trigger ID to fetch.
     * @return array<string, mixed>|false The trigger configuration, or `false` when the trigger does not exist in the
     *                                    version.
     */
    public function getContainerTrigger($idSite, $idContainer, $idContainerVersion, $idTrigger)
    {
        $this->accessValidator->checkViewPermission($idSite);
        $this->containers->checkContainerVersionExists($idSite, $idContainer, $idContainerVersion);

        return $this->triggers->getContainerTrigger($idSite, $idContainerVersion, $idTrigger);
    }

    /**
     * Returns the places where a variable is referenced in a container version.
     *
     * A variable must no longer be referenced before it can be deleted.
     *
     * @param int $idSite The numeric ID of the website to query.
     * @param string $idContainer The container ID, for example "6OMh6taM".
     * @param int $idContainerVersion The container version ID to inspect.
     * @param int $idVariable The variable ID to inspect.
     * @return array<int, array<string, mixed>> The tag, trigger, and variable references that currently use the
     *                                          variable.
     */
    public function getContainerVariableReferences($idSite, $idContainer, $idContainerVersion, $idVariable)
    {
        $this->accessValidator->checkViewPermission($idSite);
        $this->containers->checkContainerVersionExists($idSite, $idContainer, $idContainerVersion);

        $references = $this->variables->getContainerVariableReferences($idSite, $idContainerVersion, $idVariable);

        return $references;
    }

    /**
     * Returns the manually configured variables in a container version.
     *
     * This endpoint excludes preconfigured variables. Use {@link TagManager.getAvailableContainerVariables} to fetch
     * both manual and preconfigured variables together.
     *
     * @param int $idSite The numeric ID of the website to query.
     * @param string $idContainer The container ID, for example "6OMh6taM".
     * @param int $idContainerVersion The container version ID to inspect.
     * @return array<int, array<string, mixed>> The manually configured variables in the requested container version.
     */
    public function getContainerVariables($idSite, $idContainer, $idContainerVersion)
    {
        $this->accessValidator->checkViewPermission($idSite);
        $this->containers->checkContainerVersionExists($idSite, $idContainer, $idContainerVersion);

        return $this->variables->getContainerVariables($idSite, $idContainerVersion);
    }

    /**
     * Returns the manual and preconfigured variables available in a container version.
     *
     * Use {@link TagManager.getContainerVariables} to fetch only variables created by users.
     *
     * @param int $idSite The numeric ID of the website to query.
     * @param string $idContainer The container ID, for example "6OMh6taM".
     * @param int $idContainerVersion The container version ID to inspect.
     * @return array<int, array<string, mixed>> The formatted variable metadata available in the container version.
     */
    public function getAvailableContainerVariables($idSite, $idContainer, $idContainerVersion)
    {
        $this->accessValidator->checkViewPermission($idSite);
        $this->containers->checkContainerVersionExists($idSite, $idContainer, $idContainerVersion);

        $variables = $this->getContainerVariables($idSite, $idContainer, $idContainerVersion);

        $containerVars = [];
        foreach ($variables as $index => $variable) {
            $containerVars[] = [
                'id' => $variable['name'],
                'idvariable' => $variable['idvariable'],
                'type' => $variable['type'],
                'name' => $variable['name'],
                'category' => 'Custom',
                'description' => '',
                'order' => $index,
                'is_pre_configured' => false];
        }
        foreach ($this->variablesProvider->getPreConfiguredVariables() as $variable) {
            $containerVars[] = [
                'id' => $variable->getId(),
                'idvariable' => '',
                'type' => $variable->getId(),
                'name' => $variable->getName(),
                'category' => Piwik::translate($variable->getCategory()),
                'description' => $variable->getDescription(),
                'order' => $variable->getOrder(),
                'is_pre_configured' => true
            ];
        }

        $metadata = new TemplateMetadata();
        return $metadata->formatTemplates($containerVars);
    }

    /**
     * Creates a variable in the requested container version.
     *
     * @param int $idSite The numeric ID of the website to query.
     * @param string $idContainer The container ID, for example "6OMh6taM".
     * @param int $idContainerVersion The container version ID to modify.
     * @param string $type The variable template ID to create.
     * @param string $name The display name for the variable.
     * @param array<string, mixed> $parameters Parameter values keyed by template parameter name.
     * @param bool|float|int|string|null $defaultValue Optional fallback value returned when the variable resolves to
     *                                                 no value.
     * @param array<int, array<string, mixed>> $lookupTable Lookup rules for variable value translation. Use
     *                                                      {@link TagManager.getAvailableComparisons} to list
     *                                                      supported comparison operators.
     * @param string|null $description Optional variable description.
     * @return int The ID of the created variable.
     */
    public function addContainerVariable($idSite, $idContainer, $idContainerVersion, $type, $name, $parameters = [], $defaultValue = false, $lookupTable = [], $description = '')
    {
        $name = trim($this->decodeQuotes($name));
        $this->accessValidator->checkWriteCapability($idSite);
        $this->assertUserCanEditContainerVersion($idSite, $idContainer, $idContainerVersion);

        if ($this->variablesProvider->isCustomTemplate($type) && !Piwik::isUserHasCapability($idSite, PublishLiveContainer::ID)) {
            $this->accessValidator->checkUseCustomTemplatesCapability($idSite);
        }

        $parameters = $this->unsanitizeAssocArray($parameters);
        $lookupTable = $this->unsanitizeAssocArray($lookupTable);
        $name = urldecode($name);

        $idVariable = $this->variables->addContainerVariable($idSite, $idContainerVersion, $type, $name, $parameters, $defaultValue, $lookupTable, $description);

        try {
            $this->updateContainerPreviewRelease($idSite, $idContainer);
        } catch (EntityRecursionException $e) {
            // we need to delete the previously added variable.... we first have to add the  variable to be able to
            // detect recursion and simulate container generation... if it fails we delete it again
            $this->forceDeleteVariable($idSite, $idContainerVersion, $idVariable);
            $this->updateContainerPreviewRelease($idSite, $idContainer);
            throw $e;
        }

        return $idVariable;
    }

    private function forceDeleteVariable($idSite, $idContainerVersion, $idVariable)
    {
        // we cannot use model here because it would trigger an error when a variable references itself
        // that the variable cannot be deleted because it's still in use by another variable
        $now = Date::now()->getDatetime();
        $this->variablesDao->deleteContainerVariable($idSite, $idContainerVersion, $idVariable, $now);
    }

    /**
     * Updates a variable in the requested container version.
     *
     * @param int $idSite The numeric ID of the website to query.
     * @param string $idContainer The container ID, for example "6OMh6taM".
     * @param int $idContainerVersion The container version ID to modify.
     * @param int $idVariable The variable ID to update.
     * @param string $name The updated display name for the variable.
     * @param array<string, mixed> $parameters Parameter values keyed by template parameter name.
     * @param bool|float|int|string|null $defaultValue Optional fallback value returned when the variable resolves to
     *                                                 no value.
     * @param array<int, array<string, mixed>> $lookupTable Lookup rules for variable value translation. Use
     *                                                      {@link TagManager.getAvailableComparisons} to list
     *                                                      supported comparison operators.
     * @param string|null $description Optional variable description.
     * @return void
     */
    public function updateContainerVariable($idSite, $idContainer, $idContainerVersion, $idVariable, $name, $parameters = [], $defaultValue = null, $lookupTable = [], $description = '')
    {
        $name = trim($this->decodeQuotes($name));
        $this->accessValidator->checkWriteCapability($idSite);
        $this->assertUserCanEditContainerVersion($idSite, $idContainer, $idContainerVersion);

        $variable = $this->variables->getContainerVariable($idSite, $idContainerVersion, $idVariable);
        if (!empty($variable) && $this->variablesProvider->isCustomTemplate($variable['type'])) {
            $this->accessValidator->checkUseCustomTemplatesCapability($idSite);
        }

        $parameters = $this->unsanitizeAssocArray($parameters);
        $lookupTable = $this->unsanitizeAssocArray($lookupTable);
        $name = urldecode($name);

        $return = $this->variables->updateContainerVariable($idSite, $idContainerVersion, $idVariable, $name, $parameters, $defaultValue, $lookupTable, $description);

        try {
            $this->updateContainerPreviewRelease($idSite, $idContainer);
        } catch (EntityRecursionException $e) {
            // we need to restore the original value.... we first have to save update the original variable
            // in order to be able to check for recursion by simulating the container... if it fails we restore original value
            $this->variables->updateContainerVariable(
                $variable['idsite'],
                $variable['idcontainerversion'],
                $variable['idvariable'],
                $variable['name'],
                $variable['parameters'],
                $variable['default_value'],
                $variable['lookup_table'],
                $variable['description']
            );
            $this->updateContainerPreviewRelease($idSite, $idContainer);
            throw $e;
        }
        return $return;
    }

    /**
     * Deletes a variable from a container version.
     *
     * @param int $idSite The numeric ID of the website to query.
     * @param string $idContainer The container ID, for example "6OMh6taM".
     * @param int $idContainerVersion The container version ID to modify.
     * @param int $idVariable The variable ID to delete.
     * @return void
     */
    public function deleteContainerVariable($idSite, $idContainer, $idContainerVersion, $idVariable)
    {
        $this->accessValidator->checkWriteCapability($idSite);
        $this->assertUserCanEditContainerVersion($idSite, $idContainer, $idContainerVersion);

        $variable = $this->getContainerVariable($idSite, $idContainer, $idContainerVersion, $idVariable);
        if ($variable) {
            if ($this->variablesProvider->isCustomTemplate($variable['type'])) {
                $this->accessValidator->checkUseCustomTemplatesCapability($idSite);
            }
            $this->variables->deleteContainerVariable($idSite, $idContainerVersion, $idVariable);
            $this->updateContainerPreviewRelease($idSite, $idContainer);
            Piwik::postEvent('TagManager.deleteContainerVariable.end', array(array(
                'idSite' => $idSite,
                'idContainer' => $idContainer,
                'idContainerVersion' => $idContainerVersion,
                'idVariable' => $idVariable
            )));
        }
    }

    /**
     * Returns the configuration for a specific variable.
     *
     * @param int $idSite The numeric ID of the website to query.
     * @param string $idContainer The container ID, for example "6OMh6taM".
     * @param int $idContainerVersion The container version ID to inspect.
     * @param int $idVariable The variable ID to fetch.
     * @return array<string, mixed>|false The variable configuration, or `false` when the variable does not exist in
     *                                    the version.
     */
    public function getContainerVariable($idSite, $idContainer, $idContainerVersion, $idVariable)
    {
        $this->accessValidator->checkViewPermission($idSite);
        $this->containers->checkContainerVersionExists($idSite, $idContainer, $idContainerVersion);

        return $this->variables->getContainerVariable($idSite, $idContainerVersion, $idVariable);
    }

    /**
     * Get a list of all available containers within a site.
     * @param int $idSite
     * @return array
     */
    public function getContainers($idSite)
    {
        $this->accessValidator->checkViewPermission($idSite);
        return $this->containers->getContainers($idSite);
    }

    /**
     * Create a new container within the given site.
     *
     * @param int $idSite The ID of the site this container should belong to
     * @param string $context  The ID of a context, for example "web". To get a list of available contexts call
     *                      {@link TagManager.getAvailableContexts}
     * @param string $name   The name this container should have.
     * @param string $description Optionally a description for this container
     * @param int $ignoreGtmDataLayer Optionally indicate that we should ignore GTM dataLayer values
     * @param int $isTagFireLimitAllowedInPreviewMode Optionally indicate that we should respect fire tag limits when in preview mode
     * @param int $activelySyncGtmDataLayer Optionally indicate that we should actively sync new events from the GTM dataLayer to MTM
     * @return string The ID of the created container.
     */
    public function addContainer($idSite, $context, $name, $description = '', $ignoreGtmDataLayer = 0, $isTagFireLimitAllowedInPreviewMode = 0, $activelySyncGtmDataLayer = 0)
    {
        $name = $this->decodeQuotes($name);
        $this->accessValidator->checkWriteCapability($idSite);
        return $this->containers->addContainer($idSite, $context, $name, $description, $ignoreGtmDataLayer, $isTagFireLimitAllowedInPreviewMode, $activelySyncGtmDataLayer);
    }

    /**
     * Updates the name and description of the given container.
     *
     * @param int $idSite The ID of the site this container belongs to.
     * @param string $idContainer  The ID of the container you want to update, for example "6OMh6taM".
     * @param string $name   The name this container should have.
     * @param string $description Optionally a description for this container.
     * @param int $ignoreGtmDataLayer Optionally indicate that we should ignore GTM dataLayer values
     * @param int $isTagFireLimitAllowedInPreviewMode Optionally indicate that we should respect fire tag limits when in preview mode
     * @param int $activelySyncGtmDataLayer Optionally indicate that we should actively sync new events from the GTM dataLayer to MTM
     * @return string The ID of the created container.
     */
    public function updateContainer($idSite, $idContainer, $name, $description = '', $ignoreGtmDataLayer = 0, $isTagFireLimitAllowedInPreviewMode = 0, $activelySyncGtmDataLayer = 0)
    {
        $name = $this->decodeQuotes($name);
        $this->accessValidator->checkWriteCapability($idSite);
        $this->containers->checkContainerExists($idSite, $idContainer);

        $this->containers->updateContainer($idSite, $idContainer, $name, $description, $ignoreGtmDataLayer, $isTagFireLimitAllowedInPreviewMode, $activelySyncGtmDataLayer);
        $this->updateContainerPreviewRelease($idSite, $idContainer);

        return $idContainer;
    }

    /**
     * Creates a new version from either the current draft version or the given container version.
     *
     * @param int $idSite The id of the site the given container belongs to
     * @param string $idContainer  The id of a container, for example "6OMh6taM"
     * @param string $name   The name this version should have
     * @param string $description Optionally the description this version should have
     * @param int|null $idContainerVersion By default, a new version based on the current draft version will be created.
     *                                     You can also create a new version from a previously created version.
     * @return int  The ID of the created version.
     */
    public function createContainerVersion($idSite, $idContainer, $name, $description = '', $idContainerVersion = null)
    {
        $name = $this->decodeQuotes($name);
        $this->accessValidator->checkWriteCapability($idSite);
        if (!Piwik::isUserHasCapability($idSite, PublishLiveContainer::ID) && !Piwik::isUserHasCapability($idSite, PublishLiveContainer::ID)) {
            $this->accessValidator->checkUseCustomTemplatesCapability($idSite);
        }
        $this->containers->checkContainerExists($idSite, $idContainer);
        BaseValidator::check(Piwik::translate('TagManager_VersionName'), $name, [new NotEmpty(), new CharacterLength(1, 50)]);

        if (empty($idContainerVersion)) {
            $idContainerVersion = $this->getContainerDraftVersion($idSite, $idContainer);
        } else {
            $this->assertUserCanEditContainerVersion($idSite, $idContainer, $idContainerVersion);
        }

        $this->enableGeneratePreview = false;
        $container = $this->containers->createContainerVersion($idSite, $idContainer, $idContainerVersion, $name, $description);
        // not needed to create a preview release as no actual change to container was made. Make it faster as the createContainerVersion
        // uses "import" logic which would create a new preview release or check for recursions on every created tag/trigger/...
        $this->enableGeneratePreview = true;
        return $container;
    }

    /**
     * Updates a container version.
     *
     * @param int $idSite The id of the site the given container belongs to
     * @param string $idContainer  The id of a container, for example "6OMh6taM"
     * @param int $idContainerVersion The id of the version you want to update
     * @param string $name   The new name this version should have
     * @param string $description Optionally the new description this version should have
     */
    public function updateContainerVersion($idSite, $idContainer, $idContainerVersion, $name, $description = '')
    {
        $name = $this->decodeQuotes($name);
        $this->accessValidator->checkWriteCapability($idSite);
        if (!Piwik::isUserHasCapability($idSite, PublishLiveContainer::ID) && !Piwik::isUserHasCapability($idSite, PublishLiveContainer::ID)) {
            $this->accessValidator->checkUseCustomTemplatesCapability($idSite);
        }
        BaseValidator::check(Piwik::translate('TagManager_VersionName'), $name, [new NotEmpty(), new CharacterLength(1, 50)]);
        $this->assertUserCanEditContainerVersion($idSite, $idContainer, $idContainerVersion);

        return $this->containers->updateContainerVersion($idSite, $idContainer, $idContainerVersion, $name, $description);
    }

    /**
     * Get a list of all versions that exist for the given container.
     * @param int $idSite The id of the site the given container belongs to
     * @param string $idContainer  The id of a container, for example "6OMh6taM"
     * @return array
     */
    public function getContainerVersions($idSite, $idContainer)
    {
        $this->accessValidator->checkViewPermission($idSite);
        $this->containers->checkContainerExists($idSite, $idContainer);

        return $this->containers->getContainerVersions($idSite, $idContainer);
    }

    /**
     * Get details about a specific container version.
     *
     * @param int $idSite The id of the site the given container belongs to
     * @param string $idContainer  The id of a container, for example "6OMh6taM"
     * @param int $idContainerVersion The ID of the container version, a container may have multiple versions and
     *                                the list of variable will be different per container. Therefore you need to provide
     *                                the ID of the version you are referring to.
     * @return array
     */
    public function getContainerVersion($idSite, $idContainer, $idContainerVersion)
    {
        $this->accessValidator->checkViewPermission($idSite);
        $this->containers->checkContainerVersionExists($idSite, $idContainer, $idContainerVersion);

        return $this->containers->getContainerVersion($idSite, $idContainer, $idContainerVersion);
    }

    /**
     * Delete a specific container version.
     *
     * @param int $idSite The id of the site the given container belongs to
     * @param string $idContainer  The id of a container, for example "6OMh6taM"
     * @param int $idContainerVersion The ID of the container version, a container may have multiple versions and
     *                                the list of variable will be different per container. Therefore you need to provide
     *                                the ID of the version you are referring to.
     */
    public function deleteContainerVersion($idSite, $idContainer, $idContainerVersion)
    {
        $this->accessValidator->checkWriteCapability($idSite);
        $this->assertUserCanEditContainerVersion($idSite, $idContainer, $idContainerVersion);
        $this->accessValidator->checkUseCustomTemplatesCapability($idSite);

        if ($this->getContainerVersion($idSite, $idContainer, $idContainerVersion)) {
            $this->containers->deleteContainerVersion($idSite, $idContainer, $idContainerVersion);
            Piwik::postEvent('TagManager.deleteContainerVersion.end', array(array(
                'idSite' => $idSite,
                'idContainer' => $idContainer,
                'idContainerVersion' => $idContainerVersion,
            )));
        }
    }

    /**
     * Publish (release) a container version to the given environment.
     *
     * @param int $idSite The id of the site the given container belongs to
     * @param string $idContainer  The id of a container, for example "6OMh6taM"
     * @param int $idContainerVersion The ID of the container version, a container may have multiple versions and
     *                                the list of variable will be different per container. Therefore you need to provide
     *                                the ID of the version you are referring to.
     * @param string $environment The ID of the environment to which you want to publish this version to
     * @return array
     */
    public function publishContainerVersion($idSite, $idContainer, $idContainerVersion, $environment)
    {
        $this->accessValidator->checkWriteCapability($idSite);
        if ($environment === Environment::ENVIRONMENT_LIVE) {
            $this->accessValidator->checkPublishLiveEnvironmentCapability($idSite);
        } elseif (!Piwik::isUserHasCapability($idSite, PublishLiveContainer::ID)) {
            $this->accessValidator->checkUseCustomTemplatesCapability($idSite);
        }
        $this->containers->checkContainerVersionExists($idSite, $idContainer, $idContainerVersion);
        $this->environment->checkIsValidEnvironment($environment);

        $releaseLogin = Piwik::getCurrentUserLogin();

        return $this->containers->publishVersion($idSite, $idContainer, $idContainerVersion, $environment, $releaseLogin);
    }

    /**
     * Deletes a container including all versions, releases, etc.
     *
     * @param int $idSite The id of the site the given container belongs to
     * @param string $idContainer  The id of a container, for example "6OMh6taM"
     */
    public function deleteContainer($idSite, $idContainer)
    {
        $this->accessValidator->checkWriteCapability($idSite);
        $this->containers->checkContainerExists($idSite, $idContainer);

        $this->containers->deleteContainer($idSite, $idContainer);
        Piwik::postEvent('TagManager.deleteContainer.end', array(array(
            'idSite' => $idSite,
            'idContainer' => $idContainer,
        )));
    }

    /**
     * Get details about a specific container including existing versions, releases, the ID of the draft version, etc.
     *
     * @param int $idSite The id of the site the given container belongs to
     * @param string $idContainer  The id of a container, for example "6OMh6taM"
     * @return array
     */
    public function getContainer($idSite, $idContainer)
    {
        $this->accessValidator->checkViewPermission($idSite);
        $this->containers->checkContainerExists($idSite, $idContainer);

        return $this->containers->getContainer($idSite, $idContainer);
    }

    /**
     * Enables the preview/debug mode for the given container. The preview mode will be enabled for all environments a
     * container has releases for. To enable the preview mode for a specific version instead of the current draft,
     * ensure to set a container version.
     *
     * @param int $idSite The id of the site the given container belongs to
     * @param string $idContainer  The id of a container, for example "6OMh6taM"
     * @param int $idContainerVersion The ID of the container version, a container may have multiple versions and
     *                                the list of variable will be different per container. Therefore you need to provide
     *                                the ID of the version you are referring to. If no value is provided, the preview
     *                                mode will be enabled for the current "draft" version.
     */
    public function enablePreviewMode($idSite, $idContainer, $idContainerVersion = null)
    {
        $this->accessValidator->checkWriteCapability($idSite);
        $this->containers->checkContainerExists($idSite, $idContainer);

        if (empty($idContainerVersion)) {
            $idContainerVersion = $this->getContainerDraftVersion($idSite, $idContainer);
        }
        if (empty($idContainerVersion)) {
            throw new Exception(Piwik::translate('TagManager_ErrorContainerVersionDoesNotExist'));
        }

        $this->containers->checkContainerVersionExists($idSite, $idContainer, $idContainerVersion);

        $releaseLogin = Piwik::getCurrentUserLogin();
        $this->containers->enablePreviewMode($idSite, $idContainer, $idContainerVersion, $releaseLogin);

        $cookie = new PreviewCookie();
        $cookie->enable($idSite, $idContainer);
    }

    /**
     * Disables the preview/debug mode for the given container.
     *
     * @param int $idSite The id of the site the given container belongs to
     * @param string $idContainer  The id of a container, for example "6OMh6taM"
     * @param int $idContainerVersion The ID of the container version, a container may have multiple versions and
     *                                 the list of variable will be different per container. Therefore you need to provide
     *                                 the ID of the version you are referring to. If no value is provided, the preview
     *                                 mode will be enabled for the current "draft" version.
     */
    public function disablePreviewMode($idSite, $idContainer, $idContainerVersion = null)
    {
        $this->accessValidator->checkWriteCapability($idSite);
        $this->containers->checkContainerExists($idSite, $idContainer);

        if (empty($idContainerVersion)) {
            $idContainerVersion = $this->getContainerDraftVersion($idSite, $idContainer);
        }
        if (empty($idContainerVersion)) {
            throw new Exception(Piwik::translate('TagManager_ErrorContainerVersionDoesNotExist'));
        }

        $this->containers->checkContainerVersionExists($idSite, $idContainer, $idContainerVersion);

        $this->containers->disablePreviewMode($idSite, $idContainer);

        $cookie = new PreviewCookie();
        $cookie->disable($idSite, $idContainer);
        $cookie->disableDebugSiteUrl();
    }

    /**
     * Updates the debug siteurl cookie
     *
     * @param int $idSite The id of the site the given container belongs to
     * @param string $url  The url to enable debug
     */
    public function changeDebugUrl($idSite, $url)
    {
        $this->accessValidator->checkWriteCapability($idSite);
        if (
            !filter_var($url, FILTER_VALIDATE_URL)
            || stripos($url, 'http') !== 0
            || !UrlHelper::isLookLikeSafeUrl($url)
            || !UrlHelper::isLookLikeUrl($url)
        ) {
            throw new Exception(Piwik::translate('TagManager_InvalidDebugUrl'));
        }

        $previewCookie = new PreviewCookie();
        $previewCookie->enableDebugSiteUrl($url);
    }

    /**
     * Exports a container version including all details such as the configured tags, triggers, and variables within
     * this version. You can use this export to import it into a different container version for example. By default,
     * the current draft will be exported unless you specify a specific container version.
     *
     * @param int $idSite The id of the site the given container belongs to
     * @param string $idContainer  The id of a container, for example "6OMh6taM"
     * @param int $idContainerVersion The ID of the container version, a container may have multiple versions and
     *                                the list of variable will be different per container. Therefore you need to provide
     *                                the ID of the version you are referring to. If no version is provided, the current
     *                                "draft" version will be used.
     * @return array
     */
    public function exportContainerVersion($idSite, $idContainer, $idContainerVersion = null)
    {
        $this->accessValidator->checkViewPermission($idSite);
        $this->containers->checkContainerExists($idSite, $idContainer);

        if (empty($idContainerVersion)) {
            $idContainerVersion = $this->getContainerDraftVersion($idSite, $idContainer);
        }
        if (empty($idContainerVersion)) {
            throw new Exception(Piwik::translate('TagManager_ErrorContainerVersionDoesNotExist'));
        }

        $this->containers->checkContainerVersionExists($idSite, $idContainer, $idContainerVersion);

        return $this->export->exportContainerVersion($idSite, $idContainer, $idContainerVersion);
    }

    /**
     * Import all tags, triggers, and variables from the given import. Please note that this will delete / remove
     * the all current tags, triggers, and variables from the current draft version and then import all tags, triggers,
     * and variables from a previously exported container version. To not lose the current draft configuration,
     * specify a backup name so nothing gets lost in case you ever want to revert.
     *
     * @param string $exportedContainerVersion A JSON formatted string containing a previously exported container version.
     * @param int $idSite The id of the site the given container belongs to
     * @param string $idContainer  The id of a container, for example "6OMh6taM"
     * @param string $backupName   If specified, a backup of the current draft will be created under this version name.
     * @param bool $_isDraftRestoreCall A boolean parameter to specify, if its a backup restore call to avoid nesting exception if backup version has errors
     * @return void
     */
    public function importContainerVersion($exportedContainerVersion, $idSite, $idContainer, $backupName = '', bool $_isDraftRestoreCall = false)
    {
        $this->accessValidator->checkWriteCapability($idSite);
        if (!Piwik::isUserHasCapability($idSite, PublishLiveContainer::ID)) {
            $this->accessValidator->checkUseCustomTemplatesCapability($idSite);
        }
        $this->containers->checkContainerExists($idSite, $idContainer);

        $idContainerVersion = $this->getContainerDraftVersion($idSite, $idContainer);
        if (empty($idContainerVersion)) {
            throw new Exception(Piwik::translate('TagManager_ErrorContainerVersionDoesNotExist'));
        }

        if (!$_isDraftRestoreCall) {
            $draft = $this->exportContainerVersion($idSite, $idContainer);
            $exportedContainerVersion = Common::unsanitizeInputValue($exportedContainerVersion);
        }
        $exportedContainerVersion = @json_decode($exportedContainerVersion, true);

        if (empty($exportedContainerVersion) || !is_array($exportedContainerVersion)) {
            throw new Exception(Piwik::translate('TagManager_ErrorInvalidContainerImportFormat'));
        }

        // we validate before actually creating a backup version
        $this->import->checkImportContainerIsPossible($exportedContainerVersion, $idSite, $idContainer);

        if (!empty($backupName)) {
            $backupVersionId = $this->createContainerVersion($idSite, $idContainer, $backupName);
        }

        $this->containers->checkContainerVersionExists($idSite, $idContainer, $idContainerVersion);
        $this->enableGeneratePreview = false;
        try {
            $this->import->importContainerVersion($exportedContainerVersion, $idSite, $idContainer, $idContainerVersion);
        } catch (Exception $e) {
            if (!$_isDraftRestoreCall && !empty($draft)) {
                if (!empty($backupVersionId)) {
                    // Delete the backup container if created
                    $this->deleteContainerVersion($idSite, $idContainer, $backupVersionId);
                }
                // rollback to old working draft
                $this->importContainerVersion(json_encode($draft, JSON_HEX_APOS), $idSite, $idContainer, '', true);
            }
            throw $e;
        }
        $this->enableGeneratePreview = true;
        $this->updateContainerPreviewRelease($idSite, $idContainer);
    }

    private function updateContainerPreviewRelease($idSite, $idContainer)
    {
        if (!$this->enableGeneratePreview) {
            return;
        }
        if ($this->containers->hasPreviewRelease($idSite, $idContainer)) {
            $this->containers->generateContainer($idSite, $idContainer);
        } else {
            // we simulate generate the container to possibly detect if a variable references itself. as there might not be
            // any release and because we only want to simulate the current version we create a "fake" preview release
            $simulatorContext = StaticContainer::get(SimulatorContext::class);
            $container = $this->getContainer($idSite, $idContainer);
            $container['releases'] = [[
                'idcontainerrelease' => '',
                'idcontainer' => $container['idcontainer'],
                'idcontainerversion' => $this->getContainerDraftVersion($idSite, $idContainer),
                'environment' => Environment::ENVIRONMENT_PREVIEW,
                'release_login' => Piwik::getCurrentUserLogin(),
                'status' => BaseDao::STATUS_ACTIVE,
            ]];
            $simulatorContext->generate($container);
        }
    }

    private function getContainerDraftVersion($idSite, $idContainer)
    {
        $containerVersion = $this->containers->getContainer($idSite, $idContainer);
        if (!empty($containerVersion['draft']['idcontainerversion'])) {
            return $containerVersion['draft']['idcontainerversion'];
        }
    }

    private function assertUserCanEditContainerVersion($idSite, $idContainer, $idContainerVersion): void
    {
        $this->containers->checkContainerVersionExists($idSite, $idContainer, $idContainerVersion);
        $this->accessValidator->checkWriteCapabilityForContainerVersion($idSite, $idContainer, $idContainerVersion);
    }

    private function decodeQuotes($value)
    {
        return htmlspecialchars_decode($value, ENT_QUOTES);
    }

    /**
     * Check whether the current user has MTM access. If the site ID isn't provided, try looking it up on the request
     *
     * @param $idSite
     * @return void
     * @throws \Piwik\NoAccessException
     */
    private function checkUserHasTagManagerAccess($idSite = null)
    {
        if (empty($idSite)) {
            $idSite = \Piwik\Request::fromRequest()->getIntegerParameter('idSite', 0);
        }
        $this->accessValidator->checkUserHasTagManagerAccess($idSite);
    }
}
