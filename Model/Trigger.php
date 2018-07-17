<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Model;

use Piwik\Piwik;
use Piwik\Plugins\TagManager\API\TagReference;
use Piwik\Plugins\TagManager\Dao\TriggersDao;
use Piwik\Plugins\TagManager\Input\IdSite;
use Piwik\Plugins\TagManager\Input\Name;
use Piwik\Plugins\TagManager\Validators\TriggerConditions;
use Piwik\Plugins\TagManager\Template\Trigger\TriggersProvider;
use Piwik\Validators\BaseValidator;

class Trigger extends BaseModel
{
    /**
     * @var TriggersDao
     */
    private $dao;

    /**
     * @var TriggersProvider
     */
    private $triggersProvider;

    /**
     * @var Tag
     */
    private $tag;

    public function __construct(TriggersDao $triggersDao, TriggersProvider $triggersProvider, Tag $tag)
    {
        $this->dao = $triggersDao;
        $this->triggersProvider = $triggersProvider;
        $this->tag = $tag;
    }

    private function validateValues($idSite, $name, $idContainerVersion, $conditions)
    {
        $site = new IdSite($idSite);
        $site->check();

        $name = new Name($name);
        $name->check();

        BaseValidator::check('Conditions', $conditions, [new TriggerConditions($idSite, $idContainerVersion)]);
    }

    public function addContainerTrigger($idSite, $idContainerVersion, $type, $name, $parameters, $conditions)
    {
        $this->validateValues($idSite, $name, $idContainerVersion, $conditions);
        $this->triggersProvider->checkIsValidTrigger($type);
        $parameters = $this->formatParameters($type, $parameters);
        $createdDate = $this->getCurrentDateTime();

        return $this->dao->createTrigger($idSite, $idContainerVersion, $type, $name, $parameters, $conditions, $createdDate);
    }

    public function updateContainerTrigger($idSite, $idContainerVersion, $idTrigger, $name, $parameters, $conditions)
    {
        $this->validateValues($idSite, $name, $idContainerVersion, $conditions);
        $trigger = $this->dao->getContainerTrigger($idSite, $idContainerVersion, $idTrigger);
        if (!empty($trigger)) {
            $parameters = $this->formatParameters($trigger['type'], $parameters);
            $columns = array(
                'name' => $name,
                'conditions' => $conditions,
                'parameters' => $parameters
            );
            $this->updateTriggerColumns($idSite, $idContainerVersion, $idTrigger, $columns);
        }
    }

    private function formatParameters($triggerType, $parameters)
    {
        $triggerTemplate = $this->triggersProvider->getTrigger($triggerType);
        if (empty($triggerTemplate)) {
            throw new \Exception('Invalid trigger type');
        }

        $params = $triggerTemplate->getParameters();

        // we make sure to only save parameters that are defined in the tag template
        $newParameters = [];
        foreach ($params as $param) {
            if (isset($parameters[$param->getName()])) {
                $param->setValue($parameters[$param->getName()]);
                $newParameters[$param->getName()] = $param->getValue();
            } else {
                // we need to set a value to make sure that if for example a value is required, we trigger an error
                $param->setValue($param->getDefaultValue());
            }
        }

        return $newParameters;
    }

    public function getContainerTriggers($idSite, $idContainerVersion)
    {
        $triggers = $this->dao->getContainerTriggers($idSite, $idContainerVersion);
        return $this->enrichTriggers($triggers);
    }

    public function getTriggerReferences($idSite, $idContainerVersion, $idTrigger)
    {
        $idTrigger = (int) $idTrigger;

        $references = [];
        foreach ($this->tag->getContainerTags($idSite, $idContainerVersion) as $tag) {
            if (in_array($idTrigger, $tag['block_trigger_ids'])
                || in_array($idTrigger, $tag['fire_trigger_ids'])) {
                $tagRef = new TagReference($tag['idtag'], $tag['name']);
                $references[] = $tagRef->toArray();
            }
        }
        return $references;
    }

    public function deleteContainerTrigger($idSite, $idContainerVersion, $idTrigger)
    {
        if ($this->getTriggerReferences($idSite, $idContainerVersion, $idTrigger)) {
            throw new \Exception(Piwik::translate('TagManager_ErrorTriggerNotRemovableAsInUse'));
        }
        $this->dao->deleteContainerTrigger($idSite, $idContainerVersion, $idTrigger, $this->getCurrentDateTime());
    }

    public function getContainerTrigger($idSite, $idContainerVersion, $idTrigger)
    {
        $trigger = $this->dao->getContainerTrigger($idSite, $idContainerVersion, $idTrigger);
        return $this->enrichTrigger($trigger);
    }

    private function updateTriggerColumns($idSite, $idContainerVersion, $idTrigger, $columns)
    {
        if (!isset($columns['updated_date'])) {
            $columns['updated_date'] = $this->getCurrentDateTime();
        }
        $this->dao->updateTriggerColumns($idSite, $idContainerVersion, $idTrigger, $columns);
    }

    private function enrichTriggers($triggers)
    {
        if (empty($triggers)) {
            return array();
        }

        foreach ($triggers as $index => $trigger) {
            $triggers[$index] = $this->enrichTrigger($trigger);
        }

        return $triggers;
    }

    private function enrichTrigger($trigger)
    {
        if (empty($trigger)) {
            return $trigger;
        }

        $trigger['created_date_pretty'] = $this->formatDate($trigger['created_date'], $trigger['idsite']);
        $trigger['updated_date_pretty'] = $this->formatDate($trigger['updated_date'], $trigger['idsite']);

        unset($trigger['deleted_date']);
        $trigger['typeMetadata'] = null;
        if (empty($trigger['parameters'])) {
            $trigger['parameters'] = array();
        }

        $triggerTemplate = $this->triggersProvider->getTrigger($trigger['type']);

        if (!empty($triggerTemplate)) {
            $trigger['typeMetadata'] = $triggerTemplate->toArray();
            foreach ($trigger['typeMetadata']['parameters'] as &$parameter) {
                $paramName = $parameter['name'];
                if (isset($trigger['parameters'][$paramName])) {
                    $parameter['value'] = $trigger['parameters'][$paramName];
                } else {
                    $trigger['parameters'][$paramName] = $parameter['defaultValue'];
                }
            }
        }

        return $trigger;
    }

}

