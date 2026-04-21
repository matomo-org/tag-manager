<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager;

use Piwik\API\Request;
use Piwik\Common;
use Piwik\Container\StaticContainer;
use Piwik\Menu\MenuTop;
use Piwik\Piwik;
use Piwik\Plugins\TagManager\Input\AccessValidator;
use Piwik\Plugins\TagManager\Model\Environment;

class Menu extends \Piwik\Plugin\Menu
{
    /**
     * @var AccessValidator
     */
    private $accessValidator;

    public function __construct(AccessValidator $accessValidator)
    {
        $this->accessValidator = $accessValidator;
    }

    public function configureTopMenu(MenuTop $menu)
    {
        // Check whether to show the MTM top menu. If not, simply return early
        $idSite = \Piwik\Request::fromRequest()->getIntegerParameter('idSite', 0);
        if (!StaticContainer::get(SystemSettings::class)->doesCurrentUserHaveTagManagerAccess($idSite)) {
            return;
        }

        list($defaultAction, $defaultParams) = self::getDefaultAction();
        if ($defaultAction) {
            $menu->addItem('TagManager_TagManager', null, $this->urlForAction($defaultAction, $defaultParams), $orderId = 30);
        }
    }

    public static function getDefaultAction()
    {
        $idSite = \Piwik\Request::fromRequest()->getIntegerParameter('idSite', 0);
        if (!$idSite || !Piwik::isUserHasViewAccess($idSite)) {
            return array(null, null);
        }

        $defaultAction = 'manageContainers';
        $defaultParams = array('idContainer' => false);

        // for better performance we go here directly on to the DAO and avoid formatting the containers as this
        // makes initial pageview slower otherwise
        $containers = StaticContainer::get('Piwik\Plugins\TagManager\Dao\ContainersDao')->getContainersForSite($idSite);

        if (count($containers) == 1) {
            $firstContainer = array_shift($containers);

            $accessValidator = StaticContainer::get('Piwik\Plugins\TagManager\Input\AccessValidator');
            if ($accessValidator->hasWriteCapability($idSite)) {
                $defaultAction = 'dashboard';
            } else {
                $defaultAction = 'manageTags';
            }
            $defaultParams = array('idContainer' => $firstContainer['idcontainer']);
        }

        return array($defaultAction, $defaultParams);
    }

    private function configureContainerSubMenu($menu, $idContainer)
    {
        try {
            $idSite = \Piwik\Request::fromRequest()->getIntegerParameter('idSite', 0);

            if (!$idSite || !Piwik::isUserHasViewAccess($idSite)) {
                return;
            }

            $container = Request::processRequest('TagManager.getContainer', ['idSite' => $idSite, 'idContainer' => $idContainer]);
        } catch (\Exception $e) {
            // the container might be deleted by now
            return;
        }

        $params = array('idContainer' => $idContainer); // not needed as it is already present in url but we make sure the id is set
        $menuCategory = strlen($container['name']) > 50 ? substr($container['name'], 0, 50) . '…' : $container['name'];


        if ($this->accessValidator->hasWriteCapability($idSite)) {
            $menu->addItem($menuCategory, 'Dashboard', $this->urlForAction('dashboard', $params), $orderId = 104);
        }

        $menu->addItem($menuCategory, 'TagManager_Tags', $this->urlForAction('manageTags', $params), $orderId = 105);
        $menu->addItem($menuCategory, 'TagManager_Triggers', $this->urlForAction('manageTriggers', $params), $orderId = 110);
        $menu->addItem($menuCategory, 'TagManager_Variables', $this->urlForAction('manageVariables', $params), $orderId = 115);

        $previewEnabled = false;

        foreach ($container['releases'] as $release) {
            if ($release['environment'] === Environment::ENVIRONMENT_PREVIEW) {
                $previewEnabled = true;
            }
        }

        if ($this->accessValidator->hasWriteCapability($idSite)) {
            $menu->addItem($menuCategory, 'TagManager_Versions', $this->urlForAction('manageVersions', $params), $orderId = 115);
            if ($previewEnabled) {
                $menu->addItem($menuCategory, 'TagManager_DisablePreview', array(), $orderId = 130, false, 'icon-bug', "tagManagerHelper.disablePreviewMode(" . json_encode($container['idcontainer']) . ")");
            } else {
                $menu->addItem($menuCategory, 'TagManager_EnablePreviewDebug', array(), $orderId = 130, false, 'icon-bug', "tagManagerHelper.enablePreviewMode(" . json_encode($container['idcontainer']) . ")");
            }

            if (
                $this->accessValidator->hasUseCustomTemplatesCapability($idSite) ||
                (
                    $this->accessValidator->hasWriteCapability($idSite) && $this->accessValidator->hasPublishLiveEnvironmentCapability($idSite)
                )
            ) {
                $menu->addItem($menuCategory, 'TagManager_Publish', array(), $orderId = 135, false, 'icon-rocket', "tagManagerHelper.editVersion(" . json_encode($container['idcontainer']) . ", 0, '')");
            }
        }

        $menu->addItem($menuCategory, 'TagManager_InstallCode', $this->urlForAction('releases', $params), $orderId = 140, false, 'icon-embed', "tagManagerHelper.showInstallCode(" . json_encode($container['idcontainer']) . ")");
    }

    public function configureTagManagerMenu(MenuTagManager $menu)
    {
        $idSite = \Piwik\Request::fromRequest()->getIntegerParameter('idSite', 0);

        if (!$idSite || !Piwik::isUserHasViewAccess($idSite)) {
            return;
        }

        $menu->registerMenuIcon('TagManager_TagManager', 'tag-manager-menu-icon');

        $manageContainers = Piwik::translate('TagManager_ManageX', Piwik::translate('TagManager_Containers'));

        $paramsNoContainerId = array('idContainer' => null);// prevents eg error after deleting a container if idContainer is still set
        $menu->addItem('TagManager_TagManager', null, $this->urlForAction('manageContainers', $paramsNoContainerId), $orderId = 99);
        $menu->addItem('TagManager_TagManager', $manageContainers, $this->urlForAction('manageContainers', $paramsNoContainerId), $orderId = 99);


        $containers = StaticContainer::get('Piwik\Plugins\TagManager\Dao\ContainersDao')->getContainersForSite($idSite);

        $action = \Piwik\Request::fromRequest()->getStringParameter('action', '');

        if (in_array($action, ['manageContainers'], true)) {
            foreach ($containers as $container) {
                if (!$action || $action === 'manageContainers') {
                    $action = $this->accessValidator->hasWriteCapability($idSite)
                        ? 'dashboard'
                        : 'manageTags';
                }

                $params = array(
                    'idContainer' => $container['idcontainer'],
                );

                $menu->addItem(
                    'TagManager_TagManager',
                    $container['name'] . ' (' . $container['idcontainer'] . ')',
                    $this->urlForAction($action, $params),
                    120
                );
            }
        }


        $idContainer = \Piwik\Request::fromRequest()->getStringParameter('idContainer', '');

        if ($idContainer) {
            $this->configureContainerSubMenu($menu, $idContainer);
        }


    }
}
