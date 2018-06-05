<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\Input;

use Piwik\Piwik;
use Piwik\Site;

class AccessValidator
{
    public function checkViewPermission($idSite)
    {
        $this->checkSiteExists($idSite);
        Piwik::checkUserHasViewAccess($idSite);
    }

    public function checkWritePermission($idSite)
    {
        $this->checkSiteExists($idSite);
        Piwik::checkUserHasAdminAccess($idSite);
    }

    public function checkSiteExists($idSite)
    {
        new Site($idSite);
    }


}

