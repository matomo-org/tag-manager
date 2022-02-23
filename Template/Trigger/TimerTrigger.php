<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Template\Trigger;

use Piwik\Settings\FieldConfig;
use Piwik\Validators\NotEmpty;
use Piwik\Validators\NumberRange;

class TimerTrigger extends BaseTrigger
{
    public function getCategory()
    {
        return self::CATEGORY_OTHERS;
    }

    public function getIcon()
    {
        return 'plugins/TagManager/images/icons/timer.svg';
    }

    public function getParameters()
    {
        return array(
            $this->makeSetting('triggerInterval', 3000, FieldConfig::TYPE_INT, function (FieldConfig $field) {
                $field->title = 'Trigger interval';
                $field->validators[] = new NotEmpty();
                $field->validators[] = new NumberRange($min = 50);
            }),
            $this->makeSetting('eventName', 'mtm.Timer', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Event Name';
                $field->description = 'You can optionally change the name of this event. This can be useful if you have for example multiple timers on the page and want to perform different logic based on the name of the timer.';
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),
            $this->makeSetting('triggerLimit', 0, FieldConfig::TYPE_INT, function (FieldConfig $field) {
                $field->title = 'Trigger limit';
                $field->description = 'Enter "0" to not limit the trigger.';
                $field->validators[] = new NumberRange($min = 0, $max = 900000);
            }),
        );
    }

}
