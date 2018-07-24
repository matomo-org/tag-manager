<?php
/**
 * Piwik - free/libre analytics platform
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 *
 */
namespace Piwik\Plugins\TagManager\Access\Capability;

use Piwik\Access\Capability;
use Piwik\Access\Role\Admin;
use Piwik\Piwik;

class PublishLiveContainer extends Capability
{
    const ID = 'tagmanager_publish_live_container';

    public function getId()
    {
        return self::ID;
    }

    public function getCategory()
    {
        return Piwik::translate('TagManager_TagManager');
    }

    public function getName()
    {
        return Piwik::translate('TagManager_CapabilityPublishLiveContainer');
    }

    public function getDescription()
    {
        return Piwik::translate('TagManager_CapabilityPublishLiveContainerDescription');
    }

    public function getIncludedInRoles()
    {
        return array(
            Admin::ID
        );
    }
}
