<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Template;

use JShrink\Minifier;
use Piwik\Common;
use Piwik\Development;
use Piwik\Piwik;
use Piwik\Plugins\CorePluginsAdmin\SettingsMetadata;
use Piwik\Plugins\TagManager\Context\WebContext;
use Piwik\Plugins\TagManager\Settings\Storage\Backend\TransientBackend;
use Piwik\Settings\Setting;
use Piwik\Settings\Storage\Storage;

/**
 * @api
 */
abstract class BaseTemplate
{
    private $pluginName = null;

    protected $templateType = '';

    const FIELD_TEMPLATE_VARIABLE = 'plugins/TagManager/angularjs/form-field/field-variable-template.html';
    const FIELD_TEMPLATE_TEXTAREA_VARIABLE = 'plugins/TagManager/angularjs/form-field/field-textarea-variable-template.html';
    const FIELD_TEMPLATE_VARIABLE_TYPE = 'plugins/TagManager/angularjs/form-field/field-variabletype-template.html';
    public static $RESERVED_SETTING_NAMES = [
        'container', 'tag', 'variable', 'trigger', 'length', 'window', 'document', 'get', 'fire', 'setUp', 'set', 'reset', 'type', 'part',
        'default_value', 'lookup_table', 'conditions', 'condition', 'fire_limit', 'fire_delay', 'priority', 'parameters',
        'start_date', 'end_date', 'type', 'name', 'status'
    ];

    private $settingsStorage;

    public function getId()
    {
        return $this->makeIdFromClassname($this->templateType);
    }

    /** @return Setting[] */
    abstract public function getParameters();
    abstract public function getCategory();
    abstract public function getSupportedContexts();

    private function getTranslationKey($part)
    {
        if (empty($this->templateType)) {
            return '';
        }

        if (!isset($this->pluginName)) {
            $classname = get_class($this);
            $parts = explode('\\', $classname);

            if (count($parts) >= 4 && $parts[1] === 'Plugins') {
                $this->pluginName = $parts[2];
            }
        }
        if (isset($this->pluginName)) {
            return $this->pluginName . '_' . $this->getId() . $this->templateType . $part;
        }

        return '';
    }

    public function getName()
    {
        $key = $this->getTranslationKey('Name');
        if ($key) {
            $translated = Piwik::translate($key);
            if ($translated === $key) {
                return $this->getId();
            }
            return $translated;
        }
        return $this->getId();
    }

    public function getDescription()
    {
        $key = $this->getTranslationKey('Description');
        if ($key) {
            $translated = Piwik::translate($key);
            if ($translated === $key) {
                return '';
            }
            return $translated;
        }
    }

    public function getHelp()
    {
        $key = $this->getTranslationKey('Help');
        if ($key) {
            $translated = Piwik::translate($key);
            if ($translated === $key) {
                return '';
            }
            return $translated;
        }
    }

    public function getOrder()
    {
        return 9999;
    }

    /**
     * Get the image icon url. We could also use data:uris to return the amount of requests to load a page like this:
     * return 'data:image/svg+xml;base64,' . base64_encode('<svg...</svg>');
     * However, we prefer the files since we can better define them in the legal notice.
     *
     * @return string
     */
    public function getIcon()
    {
        return 'plugins/TagManager/images/defaultIcon.svg';
    }

    protected function makeSetting($name, $defaultValue, $type, $fieldConfigCallback)
    {
        if (in_array(strtolower($name), self::$RESERVED_SETTING_NAMES, true)) {
            throw new \Exception(sprintf('The setting name "%s" is reserved and cannot be used', $name));
        }

        // we need to make sure to create new instance of storage all the time to prevent "leaking" using values across
        // multiple tags, or triggers, or variables
        $this->settingsStorage = new Storage(new TransientBackend($this->getId()));

        $setting = new Setting($name, $defaultValue, $type, 'TagManager');
        $setting->setStorage($this->settingsStorage);
        $setting->setConfigureCallback($fieldConfigCallback);
        $setting->setIsWritableByCurrentUser(true); // we validate access on API level.

        return $setting;
    }

    public function loadTemplate($context, $entity)
    {
        switch ($context) {
            case WebContext::ID:
                $className = get_class($this);
                $autoloader_reflector = new \ReflectionClass($className);
                $fileName = $autoloader_reflector->getFileName();

                $lenPhpExtension = 3;
                $base = substr($fileName, 0 , -1 * $lenPhpExtension);
                $file = $base . 'web.js';
                $minFile = $base . 'web.min.js';

                if (Development::isEnabled() && $this->hasTemplateFile($file)) {
                    // during dev mode we prefer the non-minified version for debugging purposes, but we still use
                    // the internal minifier to make sure we debug the same as a user would receive
                    $template = $this->loadTemplateFile($file);
                    $minified = Minifier::minify($template);
                    return $minified;
                } elseif ($this->hasTemplateFile($minFile)) {
                    // recommended when there is a lot of content in the template. For example if the tag contains the
                    // content of a Matomo JS tracker then it will be useful or also in general.
                    return $this->loadTemplateFile($minFile);
                } elseif ($this->hasTemplateFile($file)) {
                    // it does not minify so well as it doesn't rename variables, however, it does make it a bit smaller
                    // gzip should help with filesize re variables like `tagmanager` etc.
                    // the big advantage is really that JS Min files cannot be out of date or forgotton to be updated
                    $template = $this->loadTemplateFile($file);
                    $minified = Minifier::minify($template);
                    return $minified;
                }
        }
    }

    protected function makeIdFromClassname($rightTrimWord)
    {
        $className = get_class($this);
        $parts = explode('\\', $className);
        $id = end($parts);

        if ($rightTrimWord && Common::stringEndsWith($id, $rightTrimWord)) {
            $id = substr($id, 0, -strlen($rightTrimWord));
        }

        return $id;
    }

    /**
     * @ignore tests only
     * @param $file
     * @return bool
     */
    protected function hasTemplateFile($file)
    {
        return is_readable($file);
    }

    /**
     * @ignore tests only
     * @param $file
     * @return string|null
     */
    protected function loadTemplateFile($file)
    {
        if ($this->hasTemplateFile($file)) {
            return trim(file_get_contents($file));
        }
    }

    public function hasAdvancedSettings()
    {
        return true;
    }

    public function isCustomTemplate()
    {
        // set to true if the template allows a user to add js/html code to the site for example
        return false;
    }

    public function toArray()
    {
        $settingsMetadata = new SettingsMetadata();
        $params = array();
        $tagParameters = $this->getParameters();

        if (!empty($tagParameters)) {
            foreach ($tagParameters as $parameter) {
                $param = $settingsMetadata->formatSetting($parameter);
                if (!empty($param)) {
                    // we need to manually set the value as otherwise a value from an actual tag, trigger, variable,...
                    // might be set because the instance of the template is shared and therefore the storage...
                    $param['value'] = $parameter->getDefaultValue();
                    $params[] = $param;
                }
            }
        }

        return array(
            'id' => $this->getId(),
            'name' => $this->getName(),
            'description' => $this->getDescription(),
            'category' => Piwik::translate($this->getCategory()),
            'icon' => $this->getIcon(),
            'help' => $this->getHelp(),
            'order' => $this->getOrder(),
            'contexts' => $this->getSupportedContexts(),
            'hasAdvancedSettings' => $this->hasAdvancedSettings(),
            'parameters' => $params,
        );
    }


}
