<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Framework\Mock;

use Piwik\NoAccessException;
use Piwik\Piwik;
use Piwik\Tests\Framework\Mock\FakeAccess;

class FakeAccessTagManager extends FakeAccess
{
    public function checkUserHasCapability($idSites, $capability)
    {
        if (in_array($capability, ['tagmanager_use_custom_templates', 'tagmanager_publish_live_container']) && ((!isset(self::$idSitesCapabilities[$capability]) || !is_array(self::$idSitesCapabilities[$capability]) || !in_array($idSites, self::$idSitesCapabilities[$capability])) && !Piwik::hasUserSuperUserAccess())) {
            throw new NoAccessException("checkUserHasCapability " . $capability . " Fake exception // string not to be tested");
        }

        parent::checkUserHasCapability($idSites, $capability);
    }
}
