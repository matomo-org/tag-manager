<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Model;

use Piwik\Date;
use Piwik\Piwik;
use Piwik\Plugins\TagManager\Dao\TagsDao;
use Piwik\Plugins\TagManager\Input\IdSite;
use Piwik\Plugins\TagManager\Input\Name;
use Piwik\Plugins\TagManager\Validators\TriggerIds;
use Piwik\Plugins\TagManager\Template\Tag\TagsProvider;
use Piwik\Validators\BaseValidator;
use Piwik\Validators\DateTime;
use Piwik\Validators\NotEmpty;
use Piwik\Validators\NumberRange;
use Piwik\Validators\WhitelistedValue;

class Tag extends BaseModel
{
    const FIRE_LIMIT_UNLIMITED = 'unlimited';
    const FIRE_LIMIT_ONCE_IN_LIFETIME = 'once_lifetime';
    const FIRE_LIMIT_ONCE_24_HOURS = 'once_24hours';
    const FIRE_LIMIT_ONCE_PER_PAGE = 'once_page';

    /**
     * @var TagsDao
     */
    private $dao;

    /**
     * @var TagsProvider
     */
    private $tagsProvider;

    public function __construct(TagsDao $tagsDao, TagsProvider $tagsProvider)
    {
        $this->dao = $tagsDao;
        $this->tagsProvider = $tagsProvider;
    }

    public function getFireLimits()
    {
        return [
            ['id' => self::FIRE_LIMIT_UNLIMITED, 'name' => Piwik::translate('TagManager_Unlimited')],
            ['id' => self::FIRE_LIMIT_ONCE_PER_PAGE, 'name' => Piwik::translate('TagManager_OncePage')],
            ['id' => self::FIRE_LIMIT_ONCE_24_HOURS, 'name' => Piwik::translate('TagManager_Once24Hours')],
            ['id' => self::FIRE_LIMIT_ONCE_IN_LIFETIME, 'name' => Piwik::translate('TagManager_OnceLifetime')],
        ];
    }

    public function addContainerTag($idSite, $idContainerVersion, $type, $name, $parameters, $fireTriggerIds, $blockTriggerIds, $fireLimit, $fireDelay, $priority, $startDate, $endDate, $description = '')
    {
        $this->validateValues($idSite, $name, $idContainerVersion, $fireTriggerIds, $blockTriggerIds, $fireLimit, $fireDelay, $priority, $startDate, $endDate);
        $this->tagsProvider->checkIsValidTag($type);
        $parameters = $this->formatParameters($type, $parameters);

        $createdDate = $this->getCurrentDateTime();

        return $this->dao->createTag($idSite, $idContainerVersion, $type, $name, $parameters, $fireTriggerIds, $blockTriggerIds, $fireLimit, $fireDelay, $priority, $startDate, $endDate, $createdDate, $description);
    }

    private function validateValues($idSite, $name, $idContainerVersion, $fireTriggerIds, $blockTriggerIds, $fireLimit, $fireDelay, $priority, $startDate, $endDate)
    {
        $site = new IdSite($idSite);
        $site->check();

        $name = new Name($name);
        $name->check();

        if (empty($blockTriggerIds)) {
            $blockTriggerIds = array();
        }

        $firelimits = array();
        foreach ($this->getFireLimits() as $fireLimitArr) {
            $firelimits[] = $fireLimitArr['id'];
        }

        BaseValidator::check('Fire Trigger', $fireTriggerIds, [new NotEmpty(), new TriggerIds($idSite, $idContainerVersion)]);
        BaseValidator::check('Block Trigger', $blockTriggerIds, [new TriggerIds($idSite, $idContainerVersion)]);
        BaseValidator::check('Fire limit', $fireLimit, [new WhitelistedValue($firelimits)]);
        BaseValidator::check('Fire delay', $fireDelay, [new NumberRange(0, NumberRange::MAX_MEDIUM_INT_UNSIGNED)]);
        BaseValidator::check('Priority', $priority, [new NumberRange(0, NumberRange::MAX_SMALL_INT_UNSIGNED)]);
        BaseValidator::check('Start date', $startDate, [new DateTime()]);
        BaseValidator::check('End date', $endDate, [new DateTime()]);

        if ($startDate && $endDate && Date::factory($endDate)->isEarlier(Date::factory($startDate))) {
            throw new \Exception(Piwik::translate('TagManager_ErrorEndDateBeforeStartDate'));
        }
    }

    private function formatParameters($tagType, $parameters)
    {
        $tagTemplate = $this->tagsProvider->getTag($tagType);

        if (empty($tagTemplate)) {
            throw new \Exception('Invalid tag type');
        }

        $params = $tagTemplate->getParameters();

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

    public function updateParameters($idSite, $idContainerVersion, $idTag, $parameters)
    {
        $tag = $this->dao->getContainerTag($idSite, $idContainerVersion, $idTag);
        if (!empty($tag)) {
            $parameters = $this->formatParameters($tag['type'], $parameters);
            $this->updateTagColumns($idSite, $idContainerVersion, $idTag, array(
                'parameters' => $parameters
            ));
        }
    }

    public function updateContainerTag($idSite, $idContainerVersion, $idTag, $name, $parameters, $fireTriggerIds, $blockTriggerIds, $fireLimit, $fireDelay, $priority, $startDate, $endDate, $description = '')
    {
        $this->validateValues($idSite, $name, $idContainerVersion, $fireTriggerIds, $blockTriggerIds, $fireLimit, $fireDelay, $priority, $startDate, $endDate);

        $tag = $this->dao->getContainerTag($idSite, $idContainerVersion, $idTag);
        if (!empty($tag)) {
            $parameters = $this->formatParameters($tag['type'], $parameters);
            $columns = array(
                'name' => $name,
                'description' => $description,
                'parameters' => $parameters,
                'fire_trigger_ids' => $fireTriggerIds,
                'block_trigger_ids' => $blockTriggerIds,
                'fire_limit' => $fireLimit,
                'fire_delay' => $fireDelay,
                'priority' => $priority,
                'start_date' => empty($startDate) ? null : $startDate,
                'end_date' => empty($endDate) ? null : $endDate,
            );
            $this->updateTagColumns($idSite, $idContainerVersion, $idTag, $columns);
        }
    }

    public function getContainerTags($idSite, $idContainerVersion)
    {
        $tags = $this->dao->getContainerTags($idSite, $idContainerVersion);
        return $this->enrichTags($tags);
    }

    public function deleteContainerTag($idSite, $idContainerVersion, $idTag)
    {
        $this->dao->deleteContainerTag($idSite, $idContainerVersion, $idTag, $this->getCurrentDateTime());
    }

    public function getContainerTag($idSite, $idContainerVersion, $idTag)
    {
        $tag = $this->dao->getContainerTag($idSite, $idContainerVersion, $idTag);
        return $this->enrichTag($tag);
    }

    private function updateTagColumns($idSite, $idContainerVersion, $idTag, $columns)
    {
        if (!isset($columns['updated_date'])) {
            $columns['updated_date'] = $this->getCurrentDateTime();
        }
        $this->dao->updateTagColumns($idSite, $idContainerVersion, $idTag, $columns);
    }

    private function enrichTags($tags)
    {
        if (empty($tags)) {
            return array();
        }

        foreach ($tags as $index => $tag) {
            $tags[$index] = $this->enrichTag($tag);
        }

        return $tags;
    }

    private function enrichTag($tag)
    {
        if (empty($tag)) {
            return $tag;
        }

        $tag['created_date_pretty'] = $this->formatDate($tag['created_date'], $tag['idsite']);
        $tag['updated_date_pretty'] = $this->formatDate($tag['updated_date'], $tag['idsite']);

        unset($tag['deleted_date']);

        $tag['typeMetadata'] = null;
        if (empty($tag['parameters'])) {
            $tag['parameters'] = array();
        }

        $tagType = $this->tagsProvider->getTag($tag['type']);

        if (!empty($tagType)) {
            $tag['typeMetadata'] = $tagType->toArray();
            foreach ($tag['typeMetadata']['parameters'] as &$parameter) {
                $paramName = $parameter['name'];
                if (isset($tag['parameters'][$paramName])) {
                    $parameter['value'] = $tag['parameters'][$paramName];
                } else {
                    $tag['parameters'][$paramName] = $parameter['defaultValue'];
                }
            }
        }

        return $tag;
    }

}

