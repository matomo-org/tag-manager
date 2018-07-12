<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\Input;

use Piwik\Plugins\TagManager\Access\Capability\PublishLiveContainer;
use Piwik\Plugins\TagManager\Access\Capability\TagManagerWrite;
use Piwik\Plugins\TagManager\Access\Capability\UseCustomTemplates;
use Piwik\Piwik;
use Piwik\Plugins\TagManager\SystemSettings;
use Piwik\Site;

class AccessValidator
{
    /**
     * @var SystemSettings 
     */
    private $settings;

    public function __construct(SystemSettings $settings)
    {
        $this->settings = $settings;
    }

    public function checkViewPermission($idSite)
    {
        $this->checkSiteExists($idSite);
        Piwik::checkUserHasViewAccess($idSite);
    }

    public function checkWritePermission($idSite)
    {
        $this->checkSiteExists($idSite);
        Piwik::checkUserHasCapability($idSite, TagManagerWrite::ID);
    }

    public function checkPublishLiveEnvironmentPermission($idSite)
    {
        $this->checkSiteExists($idSite);
        Piwik::checkUserHasCapability($idSite, PublishLiveContainer::ID);
    }

    public function checkUseCustomTemplatesPermission($idSite)
    {
        $this->checkSiteExists($idSite);

        if ($this->settings->restrictCustomTemplates->getValue() === SystemSettings::CUSTOM_TEMPLATES_SUPERUSER) {
            Piwik::checkUserHasSuperUserAccess();
        } else {
            // no need to check for === disabled as it will be automatically checked because in this case we remove
            // disabled tags/triggers/...

            Piwik::checkUserHasCapability($idSite, UseCustomTemplates::ID);
        }
    }

    public function hasUseCustomTemplatesPermission($idSite)
    {
        try {
            $this->checkUseCustomTemplatesPermission($idSite);
        } catch (\Exception $e) {
            return false;
        }
        return true;
    }

    public function hasWritePermission($idSite)
    {
        try {
            $this->checkWritePermission($idSite);
        } catch (\Exception $e) {
            return false;
        }
        return true;
    }

    public function checkSiteExists($idSite)
    {
        new Site($idSite);
    }


}

