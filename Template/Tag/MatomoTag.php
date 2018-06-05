<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Template\Tag;

use Piwik\Settings\FieldConfig;
use Piwik\Validators\CharacterLength;
use Piwik\Validators\NotEmpty;
use Piwik\Validators\NumberRange;

class MatomoTag extends BaseTag
{
    const ID = 'Matomo';
    const PARAM_MATOMO_CONFIG = 'matomoConfig';

    public function getId()
    {
        return self::ID;
    }

    public function getCategory()
    {
        return self::CATEGORY_ANALYTICS;
    }

    public function getIcon()
    {
        return 'plugins/TagManager/images/MatomoIcon.png';
    }

    public function getParameters()
    {
        $trackingType = $this->makeSetting('trackingType', 'pageview', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = 'Tracking Type';
            $field->description = 'Choose which action should be executed when this tag is fired.';
            $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
            $field->validators[] = new NotEmpty();
            $field->availableValues = array(
                'pageview' => 'Pageview',
                'event' => 'Event',
                'goal' => 'Goal',
            );
        });
        return array(
            $this->makeSetting(self::PARAM_MATOMO_CONFIG, '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Matomo Configuration';
                $field->description = 'Assign a Matomo configuration in order to track data into a specific site.';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE_TYPE;
                $field->uiControlAttributes = array('variableType' => 'MatomoConfiguration');
                $field->validators[] = new NotEmpty();
            }),
            $trackingType,
            $this->makeSetting('idGoal', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = 'Goal ID';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->description = 'The ID of the goal you want to track manually.';
                $field->condition = 'trackingType == "goal"';
                if ($trackingType->getValue() === 'goal') {
                    $field->validators[] = new NotEmpty();
                    $field->validators[] = new CharacterLength(1, 500);
                }
            }),
            $this->makeSetting('eventCategory', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = 'Event Category';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->description = 'The event\'s category, for example Videos, Music, Games...';
                $field->condition = 'trackingType == "event"';
                if ($trackingType->getValue() === 'event') {
                    $field->validators[] = new NotEmpty();
                    $field->validators[] = new CharacterLength(1, 500);
                }
            }),
            $this->makeSetting('eventAction', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = 'Event Action';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->description = 'The event\'s action, for example Play, Pause, Duration, Add Playlist, Downloaded, Clicked...';
                $field->condition = 'trackingType == "event"';
                if ($trackingType->getValue() === 'event') {
                    $field->validators[] = new NotEmpty();
                    $field->validators[] = new CharacterLength(1, 500);
                }
            }),
            $this->makeSetting('eventName', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Event Name';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->description = 'The event\'s object Name, for example a particular Movie name, or Song name, or File name...';
                $field->condition = 'trackingType == "event"';
                $field->validators[] = new CharacterLength(0, 500);
            }),
            $this->makeSetting('eventValue', '', FieldConfig::TYPE_FLOAT, function (FieldConfig $field) {
                $field->title = 'Event Value';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->description = 'The event\'s value, for example "50" as in user has stayed on the website for 50 seconds.';
                $field->condition = 'trackingType == "event"';
                $field->validators[] = new NumberRange();
                $field->transform = function ($value) {
                    if ($value === null || $value === false || $value === ''){
                        // we make sure in those cases we do not case the value to float automatically by Setting class because
                        // the value is optional and we do not want to have "0" in this case
                        return null;
                    }
                    return $value;
                };
                $field->validate = function (){}; // prevent executing default float validator which requires a value, value here is optional
            })
        );
    }

    public function getOrder()
    {
        return 1;
    }

}
