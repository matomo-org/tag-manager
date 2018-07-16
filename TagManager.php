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
use Piwik\Date;
use Piwik\Exception\UnexpectedWebsiteFoundException;
use Piwik\Log;
use Piwik\Piwik;
use Piwik\Plugins\TagManager\Access\Capability\PublishLiveContainer;
use Piwik\Plugins\TagManager\Access\Capability\TagManagerWrite;
use Piwik\Plugins\TagManager\Access\Capability\UseCustomTemplates;
use Piwik\Plugins\TagManager\API\PreviewCookie;
use Piwik\Plugins\TagManager\Context\BaseContext;
use Piwik\Plugins\TagManager\Dao\ContainerReleaseDao;
use Piwik\Plugins\TagManager\Dao\ContainerVersionsDao;
use Piwik\Plugins\TagManager\Dao\TagManagerDao;
use Piwik\Plugins\TagManager\Dao\ContainersDao;
use Piwik\Plugins\TagManager\Dao\TagsDao;
use Piwik\Plugins\TagManager\Dao\TriggersDao;
use Piwik\Plugins\TagManager\Dao\VariablesDao;
use Piwik\Plugins\CoreHome\SystemSummary;
use Piwik\Plugins\TagManager\Model\Salt;
use Piwik\Site;
use Piwik\View;

class TagManager extends \Piwik\Plugin
{
    public static $enableAutoContainerCreation = true;

    public function registerEvents()
    {
        return array(
            'AssetManager.getStylesheetFiles' => 'getStylesheetFiles',
            'AssetManager.getJavaScriptFiles' => 'getJsFiles',
            'Translate.getClientSideTranslationKeys' => 'getClientSideTranslationKeys',
            'CoreUpdater.update.end' => 'regenerateReleasedContainers',
            'CronArchive.end' => 'regenerateReleasedContainers',
            'PluginManager.pluginActivated' => 'onPluginActivateOrInstall',
            'PluginManager.pluginInstalled' => 'onPluginActivateOrInstall',
            'PluginManager.pluginDeactivated' => 'onPluginActivateOrInstall',
            'PluginManager.pluginUninstalled' => 'onPluginActivateOrInstall',
            'TagManager.regenerateContainerReleases' => 'regenerateReleasedContainers',
            'Updater.componentUpdated' => 'regenerateReleasedContainers',
            'Controller.CoreHome.checkForUpdates.end' => 'regenerateReleasedContainers',
            'SitesManager.deleteSite.end' => 'onSiteDeleted',
            'SitesManager.addSite.end' => 'onSiteAdded',
            'System.addSystemSummaryItems' => 'addSystemSummaryItems',
            'Template.endTrackingCodePage' => 'addTagManagerCode',
            'Template.endTrackingHelpPage' => 'addTagManagerTrackingCodeHelp',
            'Template.endTrackingCodePageTableOfContents' => 'endTrackingCodePageTableOfContents',
            'Tracker.PageUrl.getQueryParametersToExclude' => 'getQueryParametersToExclude',
            'API.addGlossaryItems' => 'addGlossaryItems',
            'Template.bodyClass' => 'addBodyClass',
            'Access.Capability.addCapabilities' => 'addCapabilities'
        );
    }
    
    public function addBodyClass(&$out, $type)
    {
        if ($type === 'tagmanager') {
            $out .= 'tagmanager';
        }
    }

    public function addCapabilities(&$capabilities)
    {
        $capabilities[] = new TagManagerWrite();
        $capabilities[] = new PublishLiveContainer();

        $systemSettings = StaticContainer::get('Piwik\Plugins\TagManager\SystemSettings');
        $restrictCustomTemplates = $systemSettings->restrictCustomTemplates->getValue();

        if ($restrictCustomTemplates === SystemSettings::CUSTOM_TEMPLATES_ADMIN) {
            // there is no need to show it when they are completely disabled,
            // when only super users are allowed to use them
            $capabilities[] = new UseCustomTemplates();
        }
    }

    public function addGlossaryItems(&$glossaryItems)
    {
        Piwik::checkUserHasSomeViewAccess();

        $items = array('title' => Piwik::translate('TagManager_TagManager'), 'entries' => array());

        $contexts = Request::processRequest('TagManager.getAvailableContexts');
        foreach ($contexts as $context) {
            $tagsCategories = Request::processRequest('TagManager.getAvailableTagTypesInContext', array(
                'idContext' => $context['id']
            ));
            foreach ($tagsCategories as $tags) {
                foreach ($tags['types'] as $tag) {
                    if (!empty($tag['description'])) {
                        $items['entries'][] = array(
                            'name' => $tag['name'] . ' Tag',
                            'documentation' => $tag['description']
                        );
                    }
                }
            }

            $triggersCategories = Request::processRequest('TagManager.getAvailableTriggerTypesInContext', array(
                'idContext' => $context['id']
            ));
            foreach ($triggersCategories as $triggers) {
                foreach ($triggers['types'] as $trigger) {
                    if (!empty($trigger['description'])) {
                        $items['entries'][] = array(
                            'name' => $trigger['name'] . ' Trigger',
                            'documentation' => $trigger['description']
                        );
                    }
                }
            }

            $variablesCategories = Request::processRequest('TagManager.getAvailableVariableTypesInContext', array(
                'idContext' => $context['id']
            ));
            foreach ($variablesCategories as $variables) {
                foreach ($variables['types'] as $variable) {
                    if (!empty($variable['description'])) {
                        $items['entries'][] = array(
                            'name' => $variable['name'] . ' Variable',
                            'documentation' => $variable['description']
                        );
                    }
                }
            }
        }

        $variablesProvider = StaticContainer::get('Piwik\Plugins\TagManager\Template\Variable\VariablesProvider');
        foreach ($variablesProvider->getPreConfiguredVariables() as $preConfiguredVariable) {
            if ($preConfiguredVariable->getDescription()) {
                $items['entries'][] = array(
                    'name' => $preConfiguredVariable->getName() . ' Variable',
                    'documentation' => $preConfiguredVariable->getDescription(),
                    'id' => '{{' . $preConfiguredVariable->getId() .'}}'
                );
            }
        }
        usort($items['entries'], function ($a, $b) {
            return strcmp($a['name'], $b['name']);
        });

        $glossaryItems['tagmanager'] = $items;
    }

    public function onPluginActivateOrInstall($pluginName)
    {
        if ($pluginName !== 'TagManager') {
            $this->regenerateReleasedContainers();
        }
    }

    public static function getAbsolutePathToContainerDirectory()
    {
        return PIWIK_DOCUMENT_ROOT . StaticContainer::get('TagManagerContainerStorageDir');
    }

    public function getQueryParametersToExclude(&$parametersToExclude)
    {
        $parametersToExclude[] = PreviewCookie::COOKIE_NAME;
    }

    public function endTrackingCodePageTableOfContents(&$out)
    {
        $out .= '<a href="#tagmanager">' . Piwik::translate('TagManager_TagManager') . '</a>';
    }

    public function addTagManagerCode(&$out)
    {
        Piwik::checkUserHasSomeViewAccess();
        $view = new View("@TagManager/trackingCode");
        $out .= $view->render();
    }

    public function addTagManagerTrackingCodeHelp(&$out)
    {
        $idSite = Common::getRequestVar('idSite', 0, 'int');
        if (!empty($idSite) && $this->hasMeasurableTypeWebsite($idSite)) {
            $view = new View("@TagManager/trackingHelp");
            $out .= $view->render();
        }
    }

    public function addSystemSummaryItems(&$systemSummary)
    {
        $model = $this->getContainerModel();
        $numContainers = $model->getNumContainersTotal();

        $systemSummary[] = new SystemSummary\Item($key = 'tagmanagercontainer', Piwik::translate('%s containers (in tag manager)', $numContainers), $value = null, array('module' => 'TagManager', 'action' => 'manageContainers'), '', $order = 20);
    }

    private function getContainerModel()
    {
        return StaticContainer::get('Piwik\Plugins\TagManager\Model\Container');
    }

    public function regenerateReleasedContainers()
    {
        Piwik::doAsSuperUser(function () {
            // we need to run as super user because after a core update the user might not be an admin etc
            // (and admin is needed for debug action)
            $containerModel = StaticContainer::get('Piwik\Plugins\TagManager\Model\Container');
            try {
                $containers = $containerModel->getActiveContainersInfo();
                foreach ($containers as $container) {
                    try {
                        $containerModel->generateContainer($container['idsite'], $container['idcontainer']);
                    } catch (UnexpectedWebsiteFoundException $e) {
                        // website was removed, ignore
                    }
                }
            } catch (\Exception $e) {
                Log::error('There was an error while regenerating container releases: ' . $e->getMessage()  .$e->getTraceAsString());
            }
        });
    }

    /**
     * @return TagManagerDao[]
     */
    public function getAllDAOs()
    {
        return [new TagsDao(), new TriggersDao(), new VariablesDao(), new ContainersDao(), new ContainerVersionsDao(), new ContainerReleaseDao()];
    }

    public function install()
    {
        foreach ($this->getAllDAOs() as $dao) {
            $dao->install();
        }

        $config = StaticContainer::get('Piwik\Plugins\TagManager\Configuration');
        $config->install();

        $salt = new Salt();
        $salt->generateSaltIfNeeded();
    }

    public function uninstall()
    {
        foreach ($this->getAllDAOs() as $dao) {
            $dao->uninstall();
        }

        $config = StaticContainer::get('Piwik\Plugins\TagManager\Configuration');
        $config->uninstall();

        $salt = new Salt();
        $salt->removeSalt();

        BaseContext::removeAllFilesOfAllContainers();
    }

    public function getClientSideTranslationKeys(&$result)
    {
        $result[] = 'General_Id';
        $result[] = 'General_Name';
        $result[] = 'General_Description';
        $result[] = 'General_Actions';
        $result[] = 'General_LoadingData';
        $result[] = 'General_Save';
        $result[] = 'General_Show';
        $result[] = 'General_Hide';
        $result[] = 'General_Add';
        $result[] = 'General_Remove';
        $result[] = 'General_Edit';
        $result[] = 'General_Or';
        $result[] = 'General_Recommended';
        $result[] = 'General_Website';
        $result[] = 'Goals_Optional';
        $result[] = 'SitesManager_Type';
        $result[] = 'UserCountryMap_None';
        $result[] = 'CoreUpdater_UpdateTitle';
        $result[] = 'TagManager_DetectingChanges';
        $result[] = 'TagManager_NoContainersFound';
        $result[] = 'TagManager_PreConfiguredInfoTitle';
        $result[] = 'TagManager_TriggerConditionNode';
        $result[] = 'TagManager_ConfigureEnvironmentsSuperUser';
        $result[] = 'TagManager_WantToDeployThisChangeCreateVersion';
        $result[] = 'TagManager_ConfigureWhenTagDoes';
        $result[] = 'TagManager_CustomizeTracking';
        $result[] = 'TagManager_ViewContainerDashboard';
        $result[] = 'TagManager_NoMatomoConfigFoundForContainer';
        $result[] = 'TagManager_CustomizeTrackingTeaser';
        $result[] = 'TagManager_PublishLiveEnvironmentCapabilityRequired';
        $result[] = 'TagManager_CapabilityPublishLiveContainer';
        $result[] = 'TagManager_VersionAlreadyPublishedToAllEnvironments';
        $result[] = 'TagManager_ViewX';
        $result[] = 'TagManager_DeleteX';
        $result[] = 'TagManager_CreateNewX';
        $result[] = 'TagManager_EditX';
        $result[] = 'TagManager_Context';
        $result[] = 'TagManager_ContainerUsageBenefits';
        $result[] = 'TagManager_ContainerNameHelp';
        $result[] = 'TagManager_ContainerContextHelp';
        $result[] = 'TagManager_ContainerDescriptionHelp';
        $result[] = 'TagManager_TagStartDateHelp';
        $result[] = 'TagManager_TagEndDateHelp';
        $result[] = 'TagManager_CurrentTimeInLocalTimezone';
        $result[] = 'TagManager_TagUsageBenefits';
        $result[] = 'TagManager_TagNameHelp';
        $result[] = 'TagManager_NoTagsFound';
        $result[] = 'TagManager_DeleteTagConfirm';
        $result[] = 'TagManager_DeleteVersionConfirm';
        $result[] = 'TagManager_VersionUsageBenefits';
        $result[] = 'TagManager_VersionNameHelp';
        $result[] = 'TagManager_NoVersionsFound';
        $result[] = 'TagManager_NoReleasesFound';
        $result[] = 'TagManager_NoReleasesFoundForContainer';
        $result[] = 'TagManager_Revision';
        $result[] = 'TagManager_VersionRevision';
        $result[] = 'TagManager_ReleasedBy';
        $result[] = 'TagManager_ReleasedOn';
        $result[] = 'TagManager_LearnMore';
        $result[] = 'TagManager_TagFireTriggerRequirement';
        $result[] = 'TagManager_ChooseTagToContinue';
        $result[] = 'TagManager_ChooseTriggerToContinue';
        $result[] = 'TagManager_ChooseVariableToContinue';
        $result[] = 'TagManager_TriggerConditionsHelp';
        $result[] = 'TagManager_EnablingPreviewPleaseWait';
        $result[] = 'TagManager_DisablingPreviewPleaseWait';
        $result[] = 'TagManager_NameOfLatestVersion';
        $result[] = 'TagManager_Created';
        $result[] = 'TagManager_CreateVersionWithoutPublishing';
        $result[] = 'TagManager_PublishVersionToEnvironmentToViewEmbedCode';
        $result[] = 'TagManager_CreateVersionAndPublishRelease';
        $result[] = 'TagManager_VersionName';
        $result[] = 'TagManager_VersionDescription';
        $result[] = 'TagManager_Released';
        $result[] = 'TagManager_ErrorXNotProvided';
        $result[] = 'TagManager_ExportX';
        $result[] = 'TagManager_PublishVersion';
        $result[] = 'TagManager_ReleaseInfo';
        $result[] = 'TagManager_ReleaseVersionInfo';
        $result[] = 'TagManager_PublishRelease';
        $result[] = 'TagManager_ManageX';
        $result[] = 'TagManager_CreatedX';
        $result[] = 'TagManager_UpdatedX';
        $result[] = 'TagManager_UpdatingData';
        $result[] = 'TagManager_DeleteContainerConfirm';
        $result[] = 'TagManager_VersionEnvironmentHelp';
        $result[] = 'TagManager_VersionDescriptionHelp';
        $result[] = 'TagManager_Container';
        $result[] = 'TagManager_Containers';
        $result[] = 'TagManager_Type';
        $result[] = 'TagManager_Types';
        $result[] = 'TagManager_Tag';
        $result[] = 'TagManager_Tags';
        $result[] = 'TagManager_Version';
        $result[] = 'TagManager_Versions';
        $result[] = 'TagManager_Environment';
        $result[] = 'TagManager_Environments';
        $result[] = 'TagManager_Trigger';
        $result[] = 'TagManager_Triggers';
        $result[] = 'TagManager_Variable';
        $result[] = 'TagManager_Variables';
        $result[] = 'TagManager_Names';
        $result[] = 'TagManager_DiffAdded';
        $result[] = 'TagManager_DiffModified';
        $result[] = 'TagManager_DiffDeleted';
        $result[] = 'TagManager_DefaultValue';
        $result[] = 'TagManager_DefaultValueHelp';
        $result[] = 'TagManager_LookupTableTitle';
        $result[] = 'TagManager_LookupTableMatchValue';
        $result[] = 'TagManager_LookupTableOutValue';
        $result[] = 'TagManager_OrCreateAndPublishVersion';
        $result[] = 'TagManager_ConfigureWhatTagDoes';
        $result[] = 'TagManager_ConfigureThisVariable';
        $result[] = 'TagManager_ConfigureThisTrigger';
        $result[] = 'TagManager_OnlyTriggerWhen';
        $result[] = 'TagManager_FireTriggerTitle';
        $result[] = 'TagManager_FireTriggerHelp';
        $result[] = 'TagManager_BlockTriggerTitle';
        $result[] = 'TagManager_BlockTriggerHelp';
        $result[] = 'TagManager_ShowAdvancedSettings';
        $result[] = 'TagManager_HideAdvancedSettings';
        $result[] = 'TagManager_Unlimited';
        $result[] = 'TagManager_OnceLifetime';
        $result[] = 'TagManager_OncePage';
        $result[] = 'TagManager_Once24Hours';
        $result[] = 'TagManager_VersionPublishSuccess';
        $result[] = 'TagManager_FireDelay';
        $result[] = 'TagManager_FireDelayHelp';
        $result[] = 'TagManager_FireLimit';
        $result[] = 'TagManager_FireLimitHelp';
        $result[] = 'TagManager_Priority';
        $result[] = 'TagManager_PriorityHelp';
        $result[] = 'TagManager_DeleteVariableConfirm';
        $result[] = 'TagManager_NoVariablesFound';
        $result[] = 'TagManager_VariableUsageBenefits';
        $result[] = 'TagManager_VariableNameHelp';
        $result[] = 'TagManager_DeleteTriggerConfirm';
        $result[] = 'TagManager_NoTriggersFound';
        $result[] = 'TagManager_TriggerUsageBenefits';
        $result[] = 'TagManager_TriggerNameHelp';
        $result[] = 'TagManager_ContainerX';
        $result[] = 'TagManager_ConfirmImportContainerVersion';
        $result[] = 'TagManager_Filter';
        $result[] = 'TagManager_Import';
        $result[] = 'TagManager_Except';
        $result[] = 'TagManager_EnablePreviewDebug';
        $result[] = 'TagManager_StartDate';
        $result[] = 'TagManager_EndDate';
        $result[] = 'TagManager_ExportDraft';
        $result[] = 'TagManager_PreconfiguredVariables';
        $result[] = 'TagManager_TriggerCannotBeDeleted';
        $result[] = 'TagManager_TriggerBeingUsedBy';
        $result[] = 'TagManager_TriggerBeingUsedNeedsRemove';
        $result[] = 'TagManager_VariableCannotBeDeleted';
        $result[] = 'TagManager_VariableBeingUsedBy';
        $result[] = 'TagManager_VariableBeingUsedNeedsRemove';
        $result[] = 'TagManager_Change';
        $result[] = 'TagManager_ChangesSinceLastVersion';
        $result[] = 'TagManager_LastUpdated';
        $result[] = 'TagManager_CreatedDate';
        $result[] = 'TagManager_LookupTable';
        $result[] = 'TagManager_LastVersions';
        $result[] = 'TagManager_EditVersions';
        $result[] = 'TagManager_EditVersion';
        $result[] = 'TagManager_EditTags';
        $result[] = 'TagManager_EditTag';
        $result[] = 'TagManager_EditVariables';
        $result[] = 'TagManager_EditVariable';
        $result[] = 'TagManager_EditTriggers';
        $result[] = 'TagManager_EditTrigger';
        $result[] = 'TagManager_CreateNewVersion';
        $result[] = 'TagManager_CreateNewTag';
        $result[] = 'TagManager_CreateNewTrigger';
        $result[] = 'TagManager_CreateNewVariable';
        $result[] = 'TagManager_ConfigureX';
        $result[] = 'TagManager_EntityDateTypeMetaInformation';
        $result[] = 'TagManager_ContainerMetaInformation';
        $result[] = 'TagManager_ChooseContainer';
        $result[] = 'TagManager_ChooseVariable';
        $result[] = 'TagManager_ErrorInvalidContainerImportFormat';
        $result[] = 'TagManager_ErrorContainerVersionImportIncomplete';
        $result[] = 'TagManager_VersionImportSuccess';
        $result[] = 'TagManager_VersionImportInfo';
        $result[] = 'TagManager_ImportVersion';
        $result[] = 'TagManager_BackupVersionName';
        $result[] = 'TagManager_BackupVersionNameHelp';
        $result[] = 'TagManager_VersionImportContentTitle';
        $result[] = 'TagManager_VersionImportOverwriteContent';
        $result[] = 'TagManager_CustomVariables';
        $result[] = 'TagManager_PreconfiguredVariables';
        $result[] = 'TagManager_EditContainer';
        $result[] = 'TagManager_CreateNewContainer';
        $result[] = 'TagManager_CreateNewContainerNow';
        $result[] = 'TagManager_CreateNewTagNow';
        $result[] = 'TagManager_CreateNewTriggerNow';
        $result[] = 'TagManager_CreateNewVariableNow';
        $result[] = 'TagManager_CreatedOnX';
        $result[] = 'TagManager_ReleasesOverview';
        $result[] = 'TagManager_InstallCode';
        $result[] = 'TagManager_InstallCodePublishEnvironmentNote';
        $result[] = 'TagManager_GettingStartedNotice';
    }

    public function getStylesheetFiles(&$stylesheets)
    {
        $stylesheets[] = "plugins/TagManager/stylesheets/manageList.less";
        $stylesheets[] = "plugins/TagManager/stylesheets/manageEdit.less";
        $stylesheets[] = "plugins/TagManager/stylesheets/gettingStarted.less";
        $stylesheets[] = "plugins/TagManager/angularjs/manageTag/edit.directive.less";
        $stylesheets[] = "plugins/TagManager/angularjs/selectVariableType/select-variable-type.directive.less";
        $stylesheets[] = "plugins/TagManager/angularjs/form-field/field-variable-template.less";
        $stylesheets[] = "plugins/TagManager/angularjs/containerSelector/container-selector.less";
    }

    public function getJsFiles(&$jsFiles)
    {
        $jsFiles[] = "plugins/TagManager/libs/jquery-timepicker/jquery.timepicker.min.js";

        $jsFiles[] = "plugins/TagManager/javascripts/tagmanagerHelper.js";

        $jsFiles[] = "plugins/TagManager/angularjs/manageContainer/model.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageContainer/list.controller.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageContainer/list.directive.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageContainer/edit.controller.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageContainer/edit.directive.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageContainer/manage.controller.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageContainer/manage.directive.js";

        $jsFiles[] = "plugins/TagManager/angularjs/manageVersion/model.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageVersion/diff.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageVersion/list.controller.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageVersion/list.directive.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageVersion/edit.controller.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageVersion/edit.directive.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageVersion/manage.controller.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageVersion/manage.directive.js";

        $jsFiles[] = "plugins/TagManager/angularjs/manageTrigger/model.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageTrigger/list.controller.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageTrigger/list.directive.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageTrigger/edit.controller.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageTrigger/edit.directive.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageTrigger/manage.controller.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageTrigger/manage.directive.js";

        $jsFiles[] = "plugins/TagManager/angularjs/manageTag/model.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageTag/list.controller.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageTag/list.directive.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageTag/edit.controller.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageTag/edit.directive.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageTag/manage.controller.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageTag/manage.directive.js";

        $jsFiles[] = "plugins/TagManager/angularjs/manageVariable/model.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageVariable/list.controller.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageVariable/list.directive.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageVariable/edit.controller.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageVariable/edit.directive.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageVariable/manage.controller.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageVariable/manage.directive.js";

        $jsFiles[] = "plugins/TagManager/angularjs/manageInstallCode/manage-install-tag-code.controller.js";
        $jsFiles[] = "plugins/TagManager/angularjs/manageInstallCode/manage-install-tag-code.directive.js";

        $jsFiles[] = "plugins/TagManager/angularjs/containerDashboard/container-dashboard.controller.js";
        $jsFiles[] = "plugins/TagManager/angularjs/containerDashboard/container-dashboard.directive.js";

        $jsFiles[] = "plugins/TagManager/angularjs/containerSelector/container-selector.controller.js";
        $jsFiles[] = "plugins/TagManager/angularjs/containerSelector/container-selector.directive.js";

        $jsFiles[] = "plugins/TagManager/angularjs/selectVariable/select-variable.controller.js";
        $jsFiles[] = "plugins/TagManager/angularjs/selectVariable/select-variable.directive.js";

        $jsFiles[] = "plugins/TagManager/angularjs/selectVariableType/select-variable-type.controller.js";
        $jsFiles[] = "plugins/TagManager/angularjs/selectVariableType/select-variable-type.directive.js";

        $jsFiles[] = "plugins/TagManager/angularjs/importVersion/import-version.controller.js";
        $jsFiles[] = "plugins/TagManager/angularjs/importVersion/import-version.directive.js";

        $jsFiles[] = "plugins/TagManager/angularjs/tagmanagerTrackingCode/tagmanager.controller.js";
        $jsFiles[] = "plugins/TagManager/angularjs/tagmanagerTrackingCode/tagmanager.directive.js";

        $jsFiles[] = "plugins/TagManager/angularjs/debugging/debugging.controller.js";
    }

    private function hasMeasurableTypeWebsite($idSite)
    {
        try {
            $type = Site::getTypeFor($idSite);
        } catch (UnexpectedWebsiteFoundException $e) {
            return false; // no longer exists
        }

        return $type === 'website';
    }

    public function onSiteAdded($idSite)
    {
        if (self::$enableAutoContainerCreation && $this->hasMeasurableTypeWebsite($idSite)) {
            Request::processRequest('TagManager.createDefaultContainerForSite', array(
                'idSite' => $idSite,
            ));
        }
    }

    public function onSiteDeleted($idSite)
    {
        $deletedDate = Date::now()->getDatetime();

        $dao = new TagsDao();
        $dao->deleteTagsForSite($idSite, $deletedDate);

        $dao = new TriggersDao();
        $dao->deleteTriggersForSite($idSite, $deletedDate);

        $dao = new VariablesDao();
        $dao->deleteVariablesForSite($idSite, $deletedDate);

        $dao = new ContainerVersionsDao();
        $dao->deleteAllVersionsForSite($idSite, $deletedDate);

        $dao = new ContainerReleaseDao();
        $dao->deleteAllVersionsForSite($idSite, $deletedDate);

        $dao = new ContainersDao();
        foreach ($dao->getContainersForSite($idSite) as $container) {
            BaseContext::removeAllContainerFiles($container['idcontainer']);
        }
        $dao->deleteContainersForSite($idSite, $deletedDate);
    }

}
