<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Template\Trigger;

use Piwik\Piwik;
use Piwik\Settings\FieldConfig;
use Piwik\Validators\NotEmpty;
use Piwik\Validators\NumberRange;

class ElementVisibilityTrigger extends BaseTrigger
{
    public function getCategory()
    {
        return self::CATEGORY_USER_ENGAGEMENT;
    }

    public function getIcon()
    {
        return 'plugins/TagManager/images/icons/show.svg';
    }

    public function getParameters()
    {
        $selectionMethod = $this->makeSetting('selectionMethod', 'elementId', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = 'Selection Method';
            $field->description = 'Select the way you want to identify an element you want to select.';
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
            $this->makeSetting('fireTriggerWhen', 'oncePage', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Fire this trigger';
                $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
                $field->validators[] = new NotEmpty();
                $field->availableValues = array(
                    'oncePage' => 'Once per page',
                    'onceElement' => 'Once per element',
                    'every' => 'Every time an element appears on screen',
                );
            }),
            $this->makeSetting('minPercentVisible', 50, FieldConfig::TYPE_INT, function (FieldConfig $field) {
                $field->title = 'Minimum Percent Visible';
                $field->validators[] = new NumberRange($min = 1, $max = 100);
            }),
            $this->makeSetting('observeDomChanges', false, FieldConfig::TYPE_BOOL, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManager_SettingElementVisibilityObserveDomChangesTitle');
                $field->inlineHelp = Piwik::translate('TagManager_SettingElementVisibilityObserveDomChangesDescription', array('<br><strong>', '</strong>'));
                $field->uiControl = FieldConfig::UI_CONTROL_CHECKBOX;
            }),
        );
    }

}
