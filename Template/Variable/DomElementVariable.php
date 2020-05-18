<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Template\Variable;

use Piwik\Settings\FieldConfig;
use Piwik\Validators\NotEmpty;

class DomElementVariable extends BaseVariable
{
    public function getCategory()
    {
        return self::CATEGORY_PAGE_VARIABLES;
    }

    public function getParameters()
    {
        $selectionMethod = $this->makeSetting('selectionMethod', 'elementId', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = 'Selection Method';
            $field->description = 'Select the way you want to identify the element you want to read the value from.';
            $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
            $field->validators[] = new NotEmpty();
            $field->availableValues = array(
                'cssSelector' => 'CSS Selector',
                'elementId' => 'Element ID',
            );
        });
        return array(
            $selectionMethod,
            $this->makeSetting('cssSelector', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($selectionMethod) {
                $field->title = 'CSS Selector';
                $field->description = 'A CSS selector allows you to select an element by id, className, element names, etc. If multiple elements match this selector, the first matching element will be used to get the value from. Examples for valid selectors are ".classname", "#id" or "li a".';
                $field->condition = 'selectionMethod == "cssSelector"';
                $field->validate = function ($value) use ($selectionMethod, $field) {
                    if ($selectionMethod->getValue() === 'cssSelector' && empty($value)) {
                        throw new \Exception('Please specify a value for ' . $field->title);
                    }
                };
            }),
            $this->makeSetting('elementId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($selectionMethod) {
                $field->title = 'Element ID';
                $field->description = 'The id attribute specifies a unique id for an HTML element. Insert here the value of an ID attribute of any element within your website.';
                $field->condition = 'selectionMethod == "elementId"';
                $field->validate = function ($value) use ($selectionMethod, $field) {
                    if ($selectionMethod->getValue() === 'elementId' && empty($value)) {
                        throw new \Exception('Please specify a value for ' . $field->title);
                    }
                };
            }),
            $this->makeSetting('attributeName', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Attribute Name';
                $field->inlineHelp = 'If a value is entered, the value of the attribute will be returned instead of the text content of the element.';
            }),

        );
    }

}
