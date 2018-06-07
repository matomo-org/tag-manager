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

class AdwordsConversionTag extends BaseTag
{
    const ID = 'AdwordsConversion';

    public function getId()
    {
        return self::ID;
    }

    public function getName()
    {
        // By default, the name will be automatically fetched from the TagManager_AdwordsConversionTagName translation key.
        // you can either adjust/create/remove this translation key, or return a different value here directly.
        return 'AdWords Conversion';
    }

    public function getDescription()
    {
        // By default, the description will be automatically fetched from the TagManager_AdwordsConversionTagDescription
        // translation key. you can either adjust/create/remove this translation key, or return a different value
        // here directly.
        return 'Google AdWords conversion tracking.';
    }

    public function getHelp()
    {
        // By default, the help will be automatically fetched from the TagManager_AdwordsConversionTagHelp translation key.
        // you can either adjust/create/remove this translation key, or return a different value here directly.
        return parent::getHelp();
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
        return 'plugins/TagManager/images/icons/code.svg';
    }

    public function getParameters()
    {
        return array(
            $this->makeSetting('conversionID', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Conversion ID';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->validators[] = new NotEmpty();
            }),
            $this->makeSetting('conversionLabel', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Conversion label';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->validators[] = new NotEmpty();
            }),
            $this->makeSetting('conversionValue', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Conversion value';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
            }),
            $this->makeSetting('conversionOrder', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Conversion order number';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
            }),
            $this->makeSetting('conversionCurrency', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Conversion currency code';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
            }),
        );
    }

    public function getCategory()
    {
        return self::CATEGORY_REMARKETING;
    }

}
