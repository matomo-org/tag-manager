<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Model;


use Piwik\Date;
use Piwik\Site;


class BaseModel
{
    private $now;

    /**
     * @ignore tests only
     * @param string $now
     */
    public function setCurrentDateTime($now)
    {
        $this->now = $now;
    }

    protected function getCurrentDateTime()
    {
        if (isset($this->now)) {
            return $this->now;
        }
        return Date::now()->getDatetime();
    }

    protected function formatDate($date, $idSite)
    {
        $timezone = Site::getTimezoneFor($idSite);
        return Date::factory($date, $timezone)->getLocalized(Date::DATETIME_FORMAT_SHORT);
    }
}

