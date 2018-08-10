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
use Piwik\Validators\CharacterLength;

class AdwordsConversionTag extends BaseTag
{
    public function getCategory() {
        return self::CATEGORY_REMARKETING;
    }

    public function getIcon() {
        return 'plugins/TagManager/images/icons/adwords.svg';
    }

    public function getParameters() {
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
            $this->makeSetting('conversionValue', 0, FieldConfig::TYPE_FLOAT, function (FieldConfig $field) {
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
                $field->validators[] = new CharacterLength(3, 3); // e.g. 'EUR'
            }),
            $this->makeSetting('conversionFormat', 3, FieldConfig::TYPE_INT, function (FieldConfig $field) {
                $field->title = 'Conversion Format';
                $field->availableValues = [
                    1 => "show a 1-line notification to visitors",
                    2 => "show a 2-line notification to visitors",
                    3 => "show no notification to visitors"
                ]; // from https://stackoverflow.com/a/16108587/4398037
                $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
            }),
            $this->makeSetting('conversionColor', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Conversion Color'; # e.g. 'ffffff'
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
            }),
            $this->makeSetting('conversionLanguage', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Conversion Language';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->validators[] = new CharacterLength(2, 2); // e.g. 'de'
            }),
            $this->makeSetting('tagParameters', [], FieldConfig::TYPE_ARRAY, function (FieldConfig $field) {
                $field->title = 'Tag Parameters'; # e.g. 'ffffff'
                $field->uiControl = FieldConfig::UI_CONTROL_MULTI_TUPLE;
                $field1 = new FieldConfig\MultiPair('Parameter Name', 'parameter', FieldConfig::UI_CONTROL_TEXT);
                $field2 = new FieldConfig\MultiPair('Value', 'value', FieldConfig::UI_CONTROL_TEXT);
                $field2->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->uiControlAttributes['field1'] = $field1->toArray();
                $field->uiControlAttributes['field2'] = $field2->toArray();
            }),
        );
    }

}
