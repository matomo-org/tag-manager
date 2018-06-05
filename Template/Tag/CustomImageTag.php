<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Template\Tag;

use Piwik\Settings\FieldConfig;
use Piwik\Validators\NotEmpty;

class CustomImageTag extends BaseTag
{
    public function getParameters()
    {
        return array(
            $this->makeSetting('customImageSrc', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Image URL';
                $field->description = 'You can define any image URL. We recommend to define a URL that starts with "//" so it will work on HTTP and HTTPS pages. If your website only supports HTTPS, it should start with "https://".';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->validators[] = new NotEmpty();
            }),
            $this->makeSetting('cacheBusterEnabled', true, FieldConfig::TYPE_BOOL, function (FieldConfig $field) {
                $field->title = 'Enable Cache Buster';
                $field->description = 'Makes sure the image will be fetched again every time it is added to the page by adding a URL parameter to the image URL with a random value, for example "?mtmcb=12345"..';
            }),
        );
    }

    public function getIcon()
    {
        return 'plugins/TagManager/images/icons/image.svg';
    }

    public function getCategory()
    {
        return self::CATEGORY_CUSTOM;
    }

}
