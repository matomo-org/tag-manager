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
        if (!isset($exportedContainerVersion['tags'])
            || !isset($exportedContainerVersion['triggers'])
            || !isset($exportedContainerVersion['variables'])
            || !isset($exportedContainerVersion['context'])) {
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

    public function importContainerVersion($exportedContainerVersion, $idSite, $idContainer, $idContainerVersion)
    {
        $this->checkImportContainerIsPossible($exportedContainerVersion, $idSite, $idContainer);

        foreach ($this->tags->getContainerTags($idSite, $idContainerVersion) as $tag) {
            $this->tags->deleteContainerTag($idSite, $idContainerVersion, $tag['idtag']);
        }

        foreach ($this->triggers->getContainerTriggers($idSite, $idContainerVersion) as $trigger) {
            $this->triggers->deleteContainerTrigger($idSite, $idContainerVersion, $trigger['idtrigger']);
        }

        foreach ($this->variables->getContainerVariables($idSite, $idContainerVersion) as $variable) {
            $this->variables->deleteContainerVariable($idSite, $idContainerVersion, $variable['idvariable']);
        }

        $ecv = $exportedContainerVersion;

        foreach ($ecv['variables'] as $variable) {
            Request::processRequest('TagManager.addContainerVariable', array(
                'idSite' => $idSite,
                'idContainer' => $idContainer,
                'idContainerVersion' => $idContainerVersion,
                'type' => $variable['type'],
                'name' => $variable['name'],
                'parameters' => $variable['parameters'],
                'defaultValue' => $variable['default_value'],
                'lookupTable' => $variable['lookup_table'],
            ));
        }

        $idTriggerMapping = array();
        foreach ($ecv['triggers'] as $trigger) {
            $idTrigger = Request::processRequest('TagManager.addContainerTrigger', array(
                'idSite' => $idSite,
                'idContainer' => $idContainer,
                'idContainerVersion' => $idContainerVersion,
                'type' => $trigger['type'],
                'name' => $trigger['name'],
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
                'parameters' => $tag['parameters'],
                'fireTriggerIds' => $fireTriggerIds,
                'blockTriggerIds' => $blockTriggerIds,
                'fireLimit' => $tag['fire_limit'],
                'fireDelay' => $tag['fire_delay'],
                'priority' => $tag['priority'],
                'startDate' => $tag['start_date'],
                'endDate' => $tag['end_date'],
            ));
        }
    }


}
