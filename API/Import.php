<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\API;

use Piwik\Piwik;
use Piwik\Plugins\TagManager\Model\Container;
use Piwik\Plugins\TagManager\Model\Tag;
use Piwik\Plugins\TagManager\Model\Trigger;
use Piwik\Plugins\TagManager\Model\Variable;
use Exception;

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
     * @var Container
     */
    private $containers;

    public function __construct(Tag $tags, Trigger $triggers, Variable $variables, Container $containers)
    {
        $this->tags = $tags;
        $this->triggers = $triggers;
        $this->variables = $variables;
        $this->containers = $containers;
    }

    public function checkImportContainerIsPossible($exportedContainerVersion, $idSite, $idContainer)
    {
        $container = $this->containers->getContainer($idSite, $idContainer);

        if (!isset($exportedContainerVersion['tags'])
            || !isset($exportedContainerVersion['triggers'])
            || !isset($exportedContainerVersion['variables'])
            || !isset($exportedContainerVersion['context'])) {
            throw new Exception(Piwik::translate('TagManager_ErrorContainerVersionImportIncomplete'));
        }

        if ($container['context'] !== $exportedContainerVersion['context']) {
            $message = sprintf(Piwik::translate('TagManager_ErrorContainerVersionImportWrongContext', array($container['context'], $exportedContainerVersion['context'])));
            throw new Exception($message);
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
            $this->variables->addContainerVariable($idSite, $idContainerVersion, $variable['type'], $variable['name'], $variable['parameters'], $variable['default_value'], $variable['lookup_table']);
        }

        $idTriggerMapping = array();
        foreach ($ecv['triggers'] as $trigger) {
            $idTriggerMapping[$trigger['idtrigger']] = $this->triggers->addContainerTrigger($idSite, $idContainerVersion, $trigger['type'], $trigger['name'], $trigger['parameters'], $trigger['conditions']);
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
            $this->tags->addContainerTag($idSite, $idContainerVersion, $tag['type'], $tag['name'], $tag['parameters'], $fireTriggerIds, $blockTriggerIds, $tag['fire_limit'], $tag['fire_delay'], $tag['priority'], $tag['start_date'], $tag['end_date']);
        }
    }


}
