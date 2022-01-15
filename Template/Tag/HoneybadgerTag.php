<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\Template\Tag;

use Piwik\Settings\FieldConfig;
use Piwik\Plugins\TagManager\Template\Tag\BaseTag;
use Piwik\Validators\NotEmpty;

class HoneybadgerTag extends BaseTag
{
    public function getName() {
        return "Honeybadger";
    }

    public function getIcon() {
        return 'plugins/TagManager/images/icons/honeybadger.svg';
    }

    public function getParameters() {
        return array(
            $this->makeSetting('honeybadgerApiKey', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Honeybadger apiKey';
                $field->uiControl = FieldConfig::UI_CONTROL_TEXT;
                $field->description = "The apiKey of your honeybadger project";
                $field->validators[] = new NotEmpty();
            }),
            $this->makeSetting('honeybadgerEnvironment', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Environment';
                $field->uiControl = FieldConfig::UI_CONTROL_TEXT;
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->description = "The environment where the container is included (production, dev, etc.). Leave empty to default to the environment of this container.";
            }),
            $this->makeSetting('honeybadgerRevision', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Code Revision';
                $field->uiControl = FieldConfig::UI_CONTROL_TEXT;
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->description = "(optional) the version of your project";
            }),
        );
    }

    public function getCategory() {
        return self::CATEGORY_DEVELOPERS;
    }

}
