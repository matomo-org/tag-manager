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

    /**
     * @param bool $checkNamesAreUnique Only skipped when restoring a draft after a failed import, so as much of the
     *                                  draft as possible is restored even when it already contained duplicate names.
     */
    public function checkImportContainerIsPossible($exportedContainerVersion, $idSite, $idContainer, bool $checkNamesAreUnique = true)
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

        $this->checkTypesAreAvailable($exportedContainerVersion, 'TagManager_ErrorImportTypeNotAvailable');
        if ($checkNamesAreUnique) {
            $this->checkNamesAreUnique($exportedContainerVersion);
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
     * A type is not available for example when the plugin that provides it is no longer active, or when it is disabled
     * in the configuration. We list all affected entities in one message so the user knows which ones to delete.
     * Creating a version uses its own message, as the entities are already in the container, unlike in an import.
     */
    public function checkVersionTypesAreAvailable($exportedContainerVersion)
    {
        $this->checkTypesAreAvailable($exportedContainerVersion, 'TagManager_ErrorTypeNotAvailable');
    }

    private function checkTypesAreAvailable($exportedContainerVersion, $errorTranslationKey)
    {
        $unavailable = [];

        foreach ($exportedContainerVersion['tags'] as $tag) {
            if (!$this->tagsProvider->getTag($tag['type'])) {
                $unavailable[] = Piwik::translate('TagManager_ErrorTypeNotAvailableTag', $tag['name']);
            }
        }

        foreach ($exportedContainerVersion['triggers'] as $trigger) {
            if (!$this->triggersProvider->getTrigger($trigger['type'])) {
                $unavailable[] = Piwik::translate('TagManager_ErrorTypeNotAvailableTrigger', $trigger['name']);
            }
        }

        foreach ($exportedContainerVersion['variables'] as $variable) {
            if (!$this->variablesProvider->getVariable($variable['type'])) {
                $unavailable[] = Piwik::translate('TagManager_ErrorTypeNotAvailableVariable', $variable['name']);
            }
        }

        if (!empty($unavailable)) {
            throw new Exception(Piwik::translate($errorTranslationKey, implode(', ', $unavailable)));
        }
    }

    /**
     * Each tag, trigger and variable is added under its name, and adding one whose name is already used in the
     * version fails. We check this upfront, so a version does not end up with only part of its entities. A container
     * version can contain duplicate names, for example after restoring an older version, and we list them all so the
     * user knows which ones to rename or delete.
     */
    private function checkNamesAreUnique($exportedContainerVersion)
    {
        $duplicates = array_merge(
            $this->getDuplicateNames($exportedContainerVersion['tags'], 'TagManager_ErrorNamesUsedMoreThanOnceTag'),
            $this->getDuplicateNames($exportedContainerVersion['triggers'], 'TagManager_ErrorNamesUsedMoreThanOnceTrigger'),
            $this->getDuplicateNames($exportedContainerVersion['variables'], 'TagManager_ErrorNamesUsedMoreThanOnceVariable')
        );

        if (!empty($duplicates)) {
            throw new Exception(Piwik::translate('TagManager_ErrorNamesUsedMoreThanOnce', implode(', ', $duplicates)));
        }
    }

    private function getDuplicateNames(array $entities, string $itemTranslationKey): array
    {
        $countByName = array_count_values(array_map('strval', array_column($entities, 'name')));

        $duplicates = [];
        foreach ($countByName as $name => $count) {
            if ($count > 1) {
                $duplicates[] = Piwik::translate($itemTranslationKey, (string) $name);
            }
        }

        return $duplicates;
    }

    public function checkCanReplaceExistingEntities($idSite, $idContainerVersion)
    {
        $this->checkReplacingEntitiesIsPossible(
            $idSite,
            $this->tags->getContainerTags($idSite, $idContainerVersion),
            $this->triggers->getContainerTriggers($idSite, $idContainerVersion),
            $this->variables->getContainerVariables($idSite, $idContainerVersion)
        );
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

    /**
     * @param bool $checkNamesAreUnique See {@see checkImportContainerIsPossible()}
     */
    public function importContainerVersion($exportedContainerVersion, $idSite, $idContainer, $idContainerVersion, bool $checkNamesAreUnique = true)
    {
        $this->checkImportContainerIsPossible($exportedContainerVersion, $idSite, $idContainer, $checkNamesAreUnique);

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
