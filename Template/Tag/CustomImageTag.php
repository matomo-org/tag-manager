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

class CustomImageTag extends BaseTag
{
    public function getName()
    {
        // By default, the name will be automatically fetched from the TagManager_CustomHtmlTagName translation key.
        // you can either adjust/create/remove this translation key, or return a different value here directly.
        return parent::getName();
    }

    public function getDescription()
    {
        // By default, the description will be automatically fetched from the TagManager_CustomHtmlTagDescription
        // translation key. you can either adjust/create/remove this translation key, or return a different value
        // here directly.
        return parent::getDescription();
    }

    public function getHelp()
    {
        // By default, the help will be automatically fetched from the TagManager_CustomHtmlTagHelp translation key.
        // you can either adjust/create/remove this translation key, or return a different value here directly.
        return parent::getHelp();
    }

    public function getCategory()
    {
        return self::CATEGORY_CUSTOM;
    }

    public function getIcon()
    {
        // You may optionally specify a path to an image icon URL, for example:
        //
        // return 'plugins/TagManager/images/MyIcon.png';
        //
        // to not return default icon call:
        // return parent::getIcon();
        //
        // The image should have ideally a resolution of about 64x64 pixels.
        return 'plugins/TagManager/images/icons/image.svg';
    }

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

}
