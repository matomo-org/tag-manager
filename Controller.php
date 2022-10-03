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

        $dashboardHelpText = $this->renderTemplate('helpContent', [
            'subHeading' => Piwik::translate('TagManager_DashboardHelp1'),
            'paragraphs' => [
                Piwik::translate('TagManager_DashboardHelp2'),
                Piwik::translate('TagManager_DashboardHelp3'),
                Piwik::translate('TagManager_DashboardHelp4', [
                    '<a href="https://matomo.org/faq/tag-manager/container-dashboard-in-matomo-tag-manager/" rel="noreferrer noopener" target="_blank">',
                    '</a>',
                ]),
            ]
        ]);

        $tagsHelpText = $this->renderTemplate('helpContent', [
            'paragraphs' => [
                Piwik::translate('TagManager_DashboardTagsHelp1', [
                    '<a href="https://matomo.org/guide/tag-manager/tags/" rel="noreferrer noopener" target="_blank">',
                    '</a>'
                ]),
                Piwik::translate('TagManager_DashboardTagsHelp2'),
                Piwik::translate('TagManager_DashboardTagsHelp3', [
                    '<a href="https://matomo.org/faq/tag-manager/container-dashboard-in-matomo-tag-manager/" rel="noreferrer noopener" target="_blank">',
                    '</a>',
                ]),
            ]
        ]);

        $triggersHelpText = $this->renderTemplate('helpContent', [
            'paragraphs' => [
                Piwik::translate('TagManager_DashboardTriggersHelp1', [
                    '<a href="https://matomo.org/guide/tag-manager/triggers/" rel="noreferrer noopener" target="_blank">',
                    '</a>'
                ]),
                Piwik::translate('TagManager_DashboardTriggersHelp2'),
                Piwik::translate('TagManager_DashboardTriggersHelp3', [
                    '<a href="https://matomo.org/faq/tag-manager/container-dashboard-in-matomo-tag-manager/" rel="noreferrer noopener" target="_blank">',
                    '</a>',
                ]),
            ]
        ]);

        $variablesHelpText = $this->renderTemplate('helpContent', [
            'paragraphs' => [
                Piwik::translate('TagManager_DashboardVariablesHelp1', [
                    '<a href="https://matomo.org/guide/tag-manager/variables/" rel="noreferrer noopener" target="_blank">',
                    '</a>'
                ]),
                Piwik::translate('TagManager_DashboardVariablesHelp2'),
                Piwik::translate('TagManager_DashboardVariablesHelp3', [
                    '<a href="https://matomo.org/faq/tag-manager/container-dashboard-in-matomo-tag-manager/" rel="noreferrer noopener" target="_blank">',
                    '</a>',
                ]),
            ]
        ]);

        $versionsHelpText = $this->renderTemplate('helpContent', [
            'paragraphs' => [
                Piwik::translate('TagManager_DashboardVersionsHelp1', [
                    '<a href="https://matomo.org/guide/tag-manager/versions-and-publish/" rel="noreferrer noopener" target="_blank">',
                    '</a>'
                ]),
                Piwik::translate('TagManager_DashboardVersionsHelp2'),
                Piwik::translate('TagManager_DashboardVersionsHelp3', [
                    '<a href="https://matomo.org/faq/tag-manager/container-dashboard-in-matomo-tag-manager/" rel="noreferrer noopener" target="_blank">',
                    '</a>',
                ]),
            ]
        ]);

        return $this->renderManageContainerTemplate('dashboard', [
            'dashboardHelpText' => $dashboardHelpText,
            'tagsHelpText' => $tagsHelpText,
            'triggersHelpText' => $triggersHelpText,
            'variablesHelpText' => $variablesHelpText,
            'versionsHelpText' => $versionsHelpText,
        ]);
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
        $tagsHelpText = $this->renderTemplate('helpContent', [
            'subHeading' => Piwik::translate('TagManager_ManageTagsHelp1'),
            'paragraphs' => [
                Piwik::translate('TagManager_ManageTagsHelp2'),
                Piwik::translate('TagManager_ManageTagsHelp3', [
                    '<a href="https://matomo.org/guide/tag-manager/tags/" rel="noreferrer noopener" target="_blank">',
                    '</a>',
                    '<a href="https://matomo.org/guide/tag-manager/getting-started-with-tag-manager/" rel="noreferrer noopener" target="_blank">',
                    '</a>',
                    '<a href="https://matomo.org/tag-manager-training/" rel="noreferrer noopener" target="_blank">',
                    '</a>',
                ]),
            ]
        ]);

        return $this->renderManageContainerTemplate('manageTags', [ 'tagsHelpText' => $tagsHelpText ]);
    }

    public function manageTriggers()
    {
        $triggersHelpText = $this->renderTemplate('helpContent', [
            'subHeading' => Piwik::translate('TagManager_ManageTriggersHelp1'),
            'paragraphs' => [
                Piwik::translate('TagManager_ManageTriggersHelp2'),
                Piwik::translate('TagManager_ManageTriggersHelp3', [
                    '<a href="https://matomo.org/guide/tag-manager/triggers/" rel="noreferrer noopener" target="_blank">',
                    '</a>',
                    '<a href="https://matomo.org/guide/tag-manager/getting-started-with-tag-manager/" rel="noreferrer noopener" target="_blank">',
                    '</a>',
                    '<a href="https://matomo.org/tag-manager-training/" rel="noreferrer noopener" target="_blank">',
                    '</a>',
                ]),
            ]
        ]);

        return $this->renderManageContainerTemplate('manageTriggers', [
            'triggersHelpText' => $triggersHelpText
        ]);
    }

    public function manageVariables()
    {
        $variablesHelpText = $this->renderTemplate('helpContent', [
            'subHeading' => Piwik::translate('TagManager_ManageVariablesHelp1'),
            'paragraphs' => [
                Piwik::translate('TagManager_ManageVariablesHelp2'),
                Piwik::translate('TagManager_ManageVariablesHelp3', [
                    '<a href="https://matomo.org/guide/tag-manager/variables/" rel="noreferrer noopener" target="_blank">',
                    '</a>',
                    '<a href="https://matomo.org/guide/tag-manager/getting-started-with-tag-manager/" rel="noreferrer noopener" target="_blank">',
                    '</a>',
                    '<a href="https://matomo.org/tag-manager-training/" rel="noreferrer noopener" target="_blank">',
                    '</a>',
                ]),
            ]
        ]);

        return $this->renderManageContainerTemplate('manageVariables', [
            'variablesHelpText' => $variablesHelpText
        ]);
    }

    public function manageVersions()
    {
        $path = TagManager::getAbsolutePathToContainerDirectory();
        Filechecks::dieIfDirectoriesNotWritable(array($path));
        $versionsHelpText = $this->renderTemplate('helpContent', [
            'subHeading' => Piwik::translate('TagManager_ManageVersionsHelp1'),
            'paragraphs' => [
                Piwik::translate('TagManager_ManageVersionsHelp2'),
                Piwik::translate('TagManager_ManageVersionsHelp3', [
                    '<a href="https://matomo.org/guide/tag-manager/versions-and-publish/" rel="noreferrer noopener" target="_blank">',
                    '</a>',
                    '<a href="https://matomo.org/guide/tag-manager/getting-started-with-tag-manager/" rel="noreferrer noopener" target="_blank">',
                    '</a>',
                    '<a href="https://matomo.org/tag-manager-training/" rel="noreferrer noopener" target="_blank">',
                    '</a>',
                ]),
            ]
        ]);

        return $this->renderManageContainerTemplate('manageVersions', [
            'versionsHelpText' => $versionsHelpText
        ]);
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
                $debugSiteUrl = $previewCookie->getDebugSiteUrl();
                $previewUrl = '';
                if (!empty($debugSiteUrl)) {
                    $previewUrl = $debugSiteUrl . (stripos($debugSiteUrl, '?') !== False ? '&' : '?') . $mtmPreviewId;
                }

                $notificationMessage = $this->renderTemplate('previewDebugNotification.twig', array(
                        'idcontainer' => $release['idcontainer'],
                        'debugSiteUrl' => $debugSiteUrl,
                        'version' => $version,
                        'mtmPreviewId' => $mtmPreviewId,
                        'previewUrl' => $previewUrl
                    )
                );

                $notification = new Notification($notificationMessage);
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
