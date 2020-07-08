<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Context;

use Piwik\API\Request;
use Piwik\Common;
use Piwik\Container\StaticContainer;
use Piwik\Development;
use Piwik\Piwik;
use Piwik\Plugins\TagManager\Context\Storage\StorageInterface;
use Piwik\Plugins\TagManager\Context\WebContext\JavaScriptTagManagerLoader;
use Piwik\Plugins\TagManager\Context\BaseContext\TemplateLocator;
use Piwik\Plugins\TagManager\Model\Container;
use Piwik\Plugins\TagManager\Model\Environment;
use Piwik\Plugins\TagManager\Model\Salt;
use Piwik\Plugins\TagManager\Model\Tag;
use Piwik\Plugins\TagManager\Model\Trigger;
use Piwik\Plugins\TagManager\Model\Variable;
use Piwik\Plugins\TagManager\Template\Variable\VariablesProvider;
use Piwik\SettingsPiwik;


class WebContext extends BaseContext
{
    const ID = 'web';

    /**
     * @var JavaScriptTagManagerLoader
     */
    private $javaScriptTagManagerLoader;

    /**
     * @var TemplateLocator
     */
    private $templateLocator;

    public function __construct(VariablesProvider $variablesProvider, Variable $variableModel, Trigger $triggerModel, Tag $tagModel, Container $containerModel, StorageInterface $storage, JavaScriptTagManagerLoader $javaScriptTagManagerLoader, Salt $salt)
    {
        parent::__construct($variablesProvider, $variableModel, $triggerModel, $tagModel, $containerModel, $storage, $salt);
        $this->javaScriptTagManagerLoader = $javaScriptTagManagerLoader;
    }

    public function getId()
    {
        return self::ID;
    }

    public function getName()
    {
        return Piwik::translate('TagManager_ContextWeb');
    }

    public function getOrder()
    {
        return 5;
    }

    public function generate($container)
    {
        $filesCreated = array();
        $hasPreviewRelease = false;

        $environments = Request::processRequest('TagManager.getAvailableEnvironments');
        $generatedEnvironments = array();

        foreach ($container['releases'] as $release) {
            $generatedEnvironments[] = $release['environment'];

            if ($release['environment'] === Environment::ENVIRONMENT_PREVIEW) {
                $hasPreviewRelease = true;
                break;
            }
        }

        if (!$hasPreviewRelease) {
            // we make sure to remove the preview file in case preview mode is no longer enabled to not expose any
            // possible upcoming events, changes, etc
            $previewFileToDelete = $this->getJsTargetPath($container['idsite'], $container['idcontainer'], Environment::ENVIRONMENT_PREVIEW, $container['created_date']);
            $this->storage->delete(PIWIK_DOCUMENT_ROOT . $previewFileToDelete);
        }

        $baseJs = $this->javaScriptTagManagerLoader->getJavaScriptContent();

        foreach ($environments as $environment) {
            $environmentId = $environment['id'];
            // we make sure to have files even for containers that don't have a release yet, this way they can embed it
            // already nicely into the page and activate it later through the UI
            if (!in_array($environmentId, $generatedEnvironments, true)) {
                $isPreviewRelease = $environmentId === Environment::ENVIRONMENT_PREVIEW;
                $js = $this->addPreviewCode($baseJs, $hasPreviewRelease, $isPreviewRelease, $container);

                $path = $this->getJsTargetPath($container['idsite'], $container['idcontainer'], $environmentId, $container['created_date']);
                $filesCreated[$path] = $js;
                $this->storage->save(PIWIK_DOCUMENT_ROOT. $path, $js);
            }
        }

        foreach ($container['releases'] as $release) {
            $this->templateLocator = StaticContainer::getContainer()->make('Piwik\Plugins\TagManager\Context\BaseContext\TemplateLocator');
            $isPreviewRelease = $release['environment'] === Environment::ENVIRONMENT_PREVIEW;

            $containerJs = $this->generatePublicContainer($container, $release);

            foreach ($containerJs['tags'] as &$tag) {
                $tag['Tag'] = $this->templateLocator->loadTagTemplate($tag, self::ID);
                $tag['parameters'] = $this->addVariableTemplateToParameters($tag['parameters']);
                if (!$isPreviewRelease) {
                    $tag['name'] = md5($tag['name']);// actual name is needed for session/lifetime feature
                }
            }

            foreach ($containerJs['triggers'] as &$trigger) {
                $trigger['Trigger'] = $this->templateLocator->loadTriggerTemplate($trigger, self::ID);
                $trigger['parameters'] = $this->addVariableTemplateToParameters($trigger['parameters']);

                foreach ($trigger['conditions'] as &$condition) {
                    if (!empty($condition['actual']['type'])) {
                        $condition['actual']['Variable'] = $this->templateLocator->loadVariableTemplate($condition['actual'], self::ID);
                    }
                }
                if (!$isPreviewRelease) {
                    $trigger['name'] = $trigger['type'];
                }
            }

            foreach ($containerJs['variables'] as &$variable) {
                $variable['Variable'] = $this->templateLocator->loadVariableTemplate($variable, self::ID);
                $variable['parameters'] = $this->addVariableTemplateToParameters($variable['parameters']);

                if (!$isPreviewRelease) {
                    $variable['name'] = $variable['type'];
                }
            }

            $jsonOptions = 0;
            if (Development::isEnabled()) {
                $jsonOptions = JSON_PRETTY_PRINT;
            }

            $initContainer = '(function(){';
            $initContainer .= "\nvar Templates = {};\n";
            foreach ($this->templateLocator->getLoadedTemplates() as $methodName => $template) {
                $initContainer .= sprintf("Templates['%s'] = %s \n", $methodName, $template);
            }
            $initContainer .= 'window.MatomoTagManager.addContainer(' . json_encode($containerJs, $jsonOptions) . ', Templates);})()';

            $js = $this->addPreviewCode($baseJs, $hasPreviewRelease, $isPreviewRelease, $container);
            $js = str_replace(array('/*!! initContainerHook */', '/*!!! initContainerHook */'), $initContainer, $js);

            $path = $this->getJsTargetPath($container['idsite'], $container['idcontainer'], $release['environment'], $container['created_date']);
            $filesCreated[$path] = $js;
            $this->storage->save(PIWIK_DOCUMENT_ROOT . $path, $js);
        }

        return $filesCreated;
    }

    private function addPreviewCode($baseJs, $hasPreviewRelease, $isPreviewRelease, $container)
    {
        if ($isPreviewRelease) {
            $execPreview = $this->javaScriptTagManagerLoader->getPreviewJsContent();
            $baseJs = str_replace(array('/*!! previewModeHook */', '/*!!! previewModeHook */'), $execPreview, $baseJs);
        } elseif ($hasPreviewRelease) {
            $previewUrl = $this->getWebPathForRelease($container['idsite'], $container['idcontainer'], Environment::ENVIRONMENT_PREVIEW, $container['created_date']);
            $execPreview = $this->javaScriptTagManagerLoader->getDetectPreviewModeContent($previewUrl, $container['idsite'], $container['idcontainer']);
            $baseJs = str_replace(array('/*!! previewModeHook */', '/*!!! previewModeHook */'), $execPreview, $baseJs);
        }
        return $baseJs;
    }

    private function addVariableTemplateToParameters($parameters)
    {
        if (!empty($parameters) && is_array($parameters)) {
            foreach ($parameters as $parameterName => &$textOrVariable) {
                $parameters[$parameterName] = $this->addVariableTemplateIfNeeded($textOrVariable);
            }
        }

        return $parameters;
    }

    private function addVariableTemplateIfNeeded($part)
    {
        if (is_array($part) && !empty($part['joinedVariable'])) {
            // it is a multi variable
            foreach ($part['joinedVariable'] as $key => $partInner) {
                $part['joinedVariable'][$key] = $this->addVariableTemplateIfNeeded($partInner);
            }
        } elseif (is_array($part) && !empty($part['type'])) {
            // this is a regular variable
            $part['Variable'] = $this->templateLocator->loadVariableTemplate($part, self::ID);
            $part['parameters'] = $this->addVariableTemplateToParameters($part['parameters']);
        } elseif (is_array($part)) {
            // a regular array which each could have potentially a variable
            foreach ($part as $subkey => $subvalue) {
                $part[$subkey] = $this->addVariableTemplateIfNeeded($subvalue);
            }

        }
        return $part;
    }

    public function getJsTargetPath($idSite, $idContainer, $environment, $containerCreatedDate)
    {
        return parent::getJsTargetPath($idSite, $idContainer, $environment, $containerCreatedDate) . '.js';
    }

    private function getWebPathForRelease($idSite, $idContainer, $environment, $containerCreatedDate)
    {
        $domain = SettingsPiwik::getPiwikUrl();
        if (Common::stringEndsWith($domain, '/')) {
            $domain = Common::mb_substr($domain, 0, -1);
        }

        $path = $this->getJsTargetPath($idSite, $idContainer, $environment, $containerCreatedDate);

        $storagePath = StaticContainer::get('TagManagerContainerStorageDir') . '/';
        $webPath = StaticContainer::get('TagManagerContainerWebDir') . '/';
        $path = str_replace($storagePath, $webPath, $path);

        return $domain . $path;
    }

    public function getInstallInstructions($container, $environment)
    {
        $path = $this->getWebPathForRelease($container['idsite'], $container['idcontainer'], $environment, $container['created_date']);

        $embedCode = <<<INST
<!-- Matomo Tag Manager -->
<script type="text/javascript">
var _mtm = window._mtm = window._mtm || [];
_mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
g.type='text/javascript'; g.async=true; g.src='$path'; s.parentNode.insertBefore(g,s);
</script>
<!-- End Matomo Tag Manager -->
INST;

        return [[
            'description' => Piwik::translate('TagManager_ContextWebInstallInstructions', array('"<head>"')),
            'embedCode' => $embedCode,
            'helpUrl' => 'https://developer.matomo.org/guides/tagmanager/embedding'
        ]];
    }

}
