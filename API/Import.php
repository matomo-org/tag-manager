<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\API;

use Piwik\API\Request;
use Piwik\Piwik;
use Piwik\Plugins\TagManager\Exception\EntityRecursionException;
use Piwik\Plugins\TagManager\Input\AccessValidator;
use Piwik\Plugins\TagManager\Model\Container;
use Piwik\Plugins\TagManager\Model\Tag;
use Piwik\Plugins\TagManager\Model\Trigger;
use Piwik\Plugins\TagManager\Model\Variable;
use Exception;
use Piwik\Plugins\TagManager\Template\Tag\TagsProvider;
use Piwik\Plugins\TagManager\Template\Trigger\TriggersProvider;
use Piwik\Plugins\TagManager\Template\Variable\VariablesProvider;

class Import
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
     * @var Container
     */
    private $containers;

    /**
     * @var AccessValidator
     */
    private $accessValidator;

    public function __construct(Tag $tags, Trigger $triggers, Variable $variables, Container $containers, AccessValidator $accessValidator, TagsProvider $tagsProvider, TriggersProvider $triggersProvider, VariablesProvider $variablesProvider)
    {
        $this->tags = $tags;
        $this->triggers = $triggers;
        $this->variables = $variables;
        $this->containers = $containers;
        $this->accessValidator = $accessValidator;
        $this->tagsProvider = $tagsProvider;
        $this->triggersProvider = $triggersProvider;
        $this->variablesProvider = $variablesProvider;
    }

    public function checkImportContainerIsPossible($exportedContainerVersion, $idSite, $idContainer)
    {
        if (
            !isset($exportedContainerVersion['tags'])
            || !isset($exportedContainerVersion['triggers'])
            || !isset($exportedContainerVersion['variables'])
            || !isset($exportedContainerVersion['context'])
        ) {
            throw new Exception(Piwik::translate('TagManager_ErrorContainerVersionImportIncomplete'));
        }

        $container = $this->containers->getContainer($idSite, $idContainer);

        if ($container['context'] !== $exportedContainerVersion['context']) {
            $message = sprintf(Piwik::translate('TagManager_ErrorContainerVersionImportWrongContext', array($container['context'], $exportedContainerVersion['context'])));
            throw new Exception($message);
        }

        foreach ($exportedContainerVersion['tags'] as $tag) {
            $this->tagsProvider->checkIsValidTag($tag['type']);

            if ($this->tagsProvider->isCustomTemplate($tag['type'])) {
                $this->accessValidator->checkUseCustomTemplatesCapability($idSite);
            }
        }

        foreach ($exportedContainerVersion['triggers'] as $trigger) {
            $this->triggersProvider->checkIsValidTrigger($trigger['type']);

            if ($this->triggersProvider->isCustomTemplate($trigger['type'])) {
                $this->accessValidator->checkUseCustomTemplatesCapability($idSite);
            }
        }

        foreach ($exportedContainerVersion['variables'] as $variable) {
            $this->variablesProvider->checkIsValidVariable($variable['type']);

            if ($this->variablesProvider->isCustomTemplate($variable['type'])) {
                $this->accessValidator->checkUseCustomTemplatesCapability($idSite);
            }
        }
    }

    /**
     * An import replaces the entire content of the given container version. Removing an existing custom template
     * entity requires the same capability as removing it through the regular delete API, otherwise a user without
     * that capability could delete a protected entity by importing a version that simply omits it.
     */
    private function checkReplacingEntitiesIsPossible($idSite, array $tags, array $triggers, array $variables)
    {
        foreach ($tags as $tag) {
            if ($this->tagsProvider->isCustomTemplate($tag['type'])) {
                $this->accessValidator->checkUseCustomTemplatesCapability($idSite);
                return;
            }
        }

        foreach ($triggers as $trigger) {
            if ($this->triggersProvider->isCustomTemplate($trigger['type'])) {
                $this->accessValidator->checkUseCustomTemplatesCapability($idSite);
                return;
            }
        }

        foreach ($variables as $variable) {
            if ($this->variablesProvider->isCustomTemplate($variable['type'])) {
                $this->accessValidator->checkUseCustomTemplatesCapability($idSite);
                return;
            }
        }
    }

    public function importContainerVersion($exportedContainerVersion, $idSite, $idContainer, $idContainerVersion)
    {
        $this->checkImportContainerIsPossible($exportedContainerVersion, $idSite, $idContainer);

        $existingTags = $this->tags->getContainerTags($idSite, $idContainerVersion);
        $existingTriggers = $this->triggers->getContainerTriggers($idSite, $idContainerVersion);
        $existingVariables = $this->variables->getContainerVariables($idSite, $idContainerVersion);

        $this->checkReplacingEntitiesIsPossible($idSite, $existingTags, $existingTriggers, $existingVariables);

        foreach ($existingTags as $tag) {
            $this->tags->deleteContainerTag($idSite, $idContainerVersion, $tag['idtag']);
        }

        foreach ($existingTriggers as $trigger) {
            $this->triggers->deleteContainerTrigger($idSite, $idContainerVersion, $trigger['idtrigger'], true);
        }

        foreach ($existingVariables as $variable) {
            $this->variables->deleteContainerVariable($idSite, $idContainerVersion, $variable['idvariable'], true);
        }

        $ecv = $exportedContainerVersion;

        foreach ($ecv['variables'] as $variable) {
            try {
                Request::processRequest('TagManager.addContainerVariable', array(
                    'idSite' => $idSite,
                    'idContainer' => $idContainer,
                    'idContainerVersion' => $idContainerVersion,
                    'type' => $variable['type'],
                    'name' => $variable['name'],
                    'description' => $variable['description'],
                    'parameters' => $variable['parameters'],
                    'defaultValue' => $variable['default_value'],
                    'lookupTable' => $variable['lookup_table'],
                ));
            } catch (EntityRecursionException $e) {
                throw new \Exception(Piwik::translate('TagManager_EntityRecursionExceptionForVariable', array($variable['name'] . '(' . $variable['type'] . ')')));
            }
        }

        $idTriggerMapping = array();
        foreach ($ecv['triggers'] as $trigger) {
            $idTrigger = Request::processRequest('TagManager.addContainerTrigger', array(
                'idSite' => $idSite,
                'idContainer' => $idContainer,
                'idContainerVersion' => $idContainerVersion,
                'type' => $trigger['type'],
                'name' => $trigger['name'],
                'description' => $trigger['description'],
                'parameters' => $trigger['parameters'],
                'conditions' => $trigger['conditions'],
            ));

            $idTriggerMapping[$trigger['idtrigger']] = $idTrigger;
        }

        foreach ($ecv['tags'] as $tag) {
            $fireTriggerIds = array();
            if (!empty($tag['fire_trigger_ids'])) {
                foreach ($tag['fire_trigger_ids'] as $triggerId) {
                    if (isset($idTriggerMapping[$triggerId])) {
                        $fireTriggerIds[] = $idTriggerMapping[$triggerId];
                    }
                }
            }
            $blockTriggerIds = array();
            if (!empty($tag['block_trigger_ids'])) {
                foreach ($tag['block_trigger_ids'] as $triggerId) {
                    if (isset($idTriggerMapping[$triggerId])) {
                        $blockTriggerIds[] = $idTriggerMapping[$triggerId];
                    }
                }
            }

            Request::processRequest('TagManager.addContainerTag', array(
                'idSite' => $idSite,
                'idContainer' => $idContainer,
                'idContainerVersion' => $idContainerVersion,
                'type' => $tag['type'],
                'name' => $tag['name'],
                'description' => $tag['description'],
                'parameters' => $tag['parameters'],
                'fireTriggerIds' => $fireTriggerIds,
                'blockTriggerIds' => $blockTriggerIds,
                'fireLimit' => $tag['fire_limit'],
                'fireDelay' => $tag['fire_delay'],
                'priority' => $tag['priority'],
                'startDate' => $tag['start_date'],
                'status' => $tag['status'] ?? '',
                'endDate' => $tag['end_date'],
            ));
        }
    }
}
