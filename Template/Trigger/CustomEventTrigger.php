<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Template\Trigger;

use Piwik\Settings\FieldConfig;
use Piwik\Validators\CharacterLength;
use Piwik\Validators\NotEmpty;

class CustomEventTrigger extends BaseTrigger
{
    const ID = 'CustomEvent';

    public function getId()
    {
        return self::ID;
    }

    public function getCategory()
    {
        return self::CATEGORY_OTHERS;
    }

    public function getParameters()
    {
        return array(
            $this->makeSetting('eventName', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Event Name';
                $field->description = 'The name of the event that is pushed to the Data-Layer. For example you can push an event by adding this to your website: _mtm.push({"event": "my-custom-event"});';
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->validators[] = new NotEmpty();
                $field->validators[] = new CharacterLength($min = 1, $max = 300);
            }),
        );
    }

}
