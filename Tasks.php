<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager;

use Piwik\Plugin;

class Tasks extends \Piwik\Plugin\Tasks
{
    /**
     * @var Plugin\Manager
     */
    private $pluginManager;

    public function __construct(Plugin\Manager $pluginManager)
    {
        $this->pluginManager = $pluginManager;
    }

    public function schedule()
    {
        $this->hourly('regenerateReleasedContainers');
    }

    public function regenerateReleasedContainers()
    {
        /** @var TagManager $tagManager */
        $tagManager = $this->pluginManager->getLoadedPlugin('TagManager');
        if ($tagManager) {
            $tagManager->regenerateReleasedContainers();
        }
    }
}
