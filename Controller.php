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
use Piwik\DataTable\Filter\SafeDecodeLabel;
use Piwik\Filechecks;
use Piwik\Menu\MenuTop;
use Piwik\Notification;
use Piwik\Piwik;
use Piwik\Plugins\TagManager\API\PreviewCookie;
use Piwik\Plugins\TagManager\Input\AccessValidator;
use Piwik\Plugins\TagManager\Model\Container;
use Piwik\Plugins\TagManager\Model\Environment;
use Piwik\Url;
use Piwik\View;
use Piwik\Notification\Manager as NotificationManager;

class Controller extends \Piwik\Plugin\Controller
{
    /**
     * @var AccessValidator
     */
    private $accessValidator;

    /**
     * @var Container
     */
    private $container;

    public function __construct(AccessValidator $accessValidator, Container $container)
    {
        parent::__construct();

        $this->accessValidator = $accessValidator;
        $this->container = $container;
    }

    public function getDefaultAction()
    {
        return 'manageContainers';
    }

    public function debug()
    {
        Piwik::checkUserHasSomeWriteAccess();
        $output = $this->renderTemplate('debug.twig');
        return $output;
    }

    public function manageContainers()
    {
        $this->accessValidator->checkViewPermission($this->idSite);

        $idContainer = Common::getRequestVar('idContainer', '', 'string');
        $container = null;
        if (!empty($idContainer)) {
            try {
                $container = Request::processRequest('TagManager.getContainer', ['idSite' => $this->idSite, 'idContainer' => $idContainer]);
            } catch (\Exception $e) {
                // we ignore this error, it is totally fine if this container doesn't exist as we only need it to pre-select the current container name
            }
        }

        return $this->renderTemplate('manageContainers', array(
            'container' => $container
        ));
    }

    public function dashboard()
    {
        $this->accessValidator->checkWriteCapability($this->idSite);

        return $this->renderManageContainerTemplate('dashboard');
    }

    public function gettingStarted()
    {
        Piwik::checkUserHasSomeViewAccess();

        $canEdit = $this->accessValidator->hasWriteCapability($this->idSite);

        return $this->renderTemplate('gettingStarted', array(
            'canEdit' => $canEdit
        ));
    }

    public function manageTags()
    {
        return $this->renderManageContainerTemplate('manageTags');
    }

    public function manageTriggers()
    {
        return $this->renderManageContainerTemplate('manageTriggers');
    }

    public function manageVariables()
    {
        return $this->renderManageContainerTemplate('manageVariables');
    }

    public function manageVersions()
    {
        $path = TagManager::getAbsolutePathToContainerDirectory();
        Filechecks::dieIfDirectoriesNotWritable(array($path));

        return $this->renderManageContainerTemplate('manageVersions');
    }

    public function releases()
    {
        return $this->renderManageContainerTemplate('releases');
    }

    private function renderManageContainerTemplate($template, $variables = array())
    {
        $this->accessValidator->checkViewPermission($this->idSite);

        $idContainer = Common::getRequestVar('idContainer', null, 'string');
        try {
            $this->container->checkContainerExists($this->idSite, $idContainer);
        } catch (\Exception $e) {
            // use case when switching within tag management from one site to another eg on page "manage tags".
            // the other container won't be found
            $notification = new Notification($e->getMessage());
            $notification->context = Notification::CONTEXT_WARNING;
            Notification\Manager::notify('TagManager_TagDoesNotExist', $notification);
            if (Piwik::getAction() !== 'manageContainers') {
                $this->redirectToIndex('TagManager', 'manageContainers', $this->idSite);
            }
            return;
        }

        if (empty($variables['container'])) {
            $variables['container'] = Request::processRequest('TagManager.getContainer', ['idSite' => $this->idSite, 'idContainer' => $idContainer]);
        }

        $variables['idcontainerversion'] = null;
        if (!empty($variables['container']['draft']['idcontainerversion'])) {
            $variables['idcontainerversion'] = $variables['container']['draft']['idcontainerversion'];
        }

        foreach ($variables['container']['releases'] as $release) {
            if ($release['environment'] === Environment::ENVIRONMENT_PREVIEW) {

                $version = '';
                if (!empty($release['version_name'])) {
                    $version = ' (' . Piwik::translate('TagManager_VersionX', $release['version_name']) . ')';
                }

                $mtmPreviewId = PreviewCookie::COOKIE_NAME . '=' .$idContainer;
                $mtmPreviewId = SafeDecodeLabel::decodeLabelSafe($mtmPreviewId);
                $previewCookie = new PreviewCookie();
                $disableLink = '<a class="title disablePreviewDebug" onclick=\'tagManagerHelper.disablePreviewMode(' . json_encode($release['idcontainer']) . ')\'>' . Piwik::translate('TagManager_DisablePreview') .'</a>';
                $urlInput = $this->renderTemplate('previewDebugUrl.twig', array(
                        'idcontainer' => json_encode($release['idcontainer']),
                        'debugSiteUrl' => $previewCookie->getDebugSiteUrl(),

                    )
                );
                $notification = new Notification(Piwik::translate('TagManager_PreviewDebugEnabledNotification', array($version, '<strong>', '</strong>', '<strong>?' . $mtmPreviewId . '</strong>', '<strong>&' . $mtmPreviewId . '</strong>', $disableLink, $urlInput)));
                $notification->context = Notification::CONTEXT_INFO;
                $notification->raw = true;
                NotificationManager::notify('previewDebugMode', $notification);
            }
        }

        return $this->renderTemplate($template, $variables);
    }

    public function exportContainerVersion()
    {
        $this->checkSitePermission();

        $jsonCallback = Common::getRequestVar('callback', false);

        if (!$jsonCallback) {
            $jsonCallback = Common::getRequestVar('jsoncallback', false);
        }

        if ($jsonCallback) {
            throw new \Exception('JSON callback not possible');
        }

        $result = Request::processRequest('TagManager.exportContainerVersion', array('format' => 'JSON', 'idSite' => $this->idSite));

        if (!empty($_SERVER['SERVER_NAME']) && Url::getCorsHostsFromConfig()) {
            // we make sure to send a custom cors header
            Common::sendHeader('Access-Control-Allow-Origin: ' . $_SERVER['SERVER_NAME']);
        }

        return $result;
    }

    protected function renderTemplate($template, array $variables = array())
    {
        if (false === strpos($template, '@') || false === strpos($template, '/')) {
            $template = '@' . $this->pluginName . '/' . $template;
        }

        $view = new View($template);
        if (empty($this->site) || empty($this->idSite)) {
            $this->setBasicVariablesView($view);
        } else {
            $this->setGeneralVariablesView($view);
        }
        $view->topMenu = MenuTop::getInstance()->getMenu();
        $view->tagManagerMenu = MenuTagManager::getInstance()->getMenu();

        list($defaultAction, $defaultParameters) = Menu::getDefaultAction();
        $view->tagAction = $defaultAction;

        foreach ($variables as $key => $value) {
            $view->$key = $value;
        }

        $notifications = $view->notifications;

        if (empty($notifications)) {
            $view->notifications = NotificationManager::getAllNotificationsToDisplay();
            NotificationManager::cancelAllNonPersistent();
        }

        return $view->render();
    }
}
