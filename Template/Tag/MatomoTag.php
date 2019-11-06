<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Template\Tag;

use Piwik\Container\StaticContainer;
use Piwik\Settings\FieldConfig;
use Piwik\Validators\CharacterLength;
use Piwik\Validators\NotEmpty;
use Piwik\Validators\NumberRange;

class MatomoTag extends BaseTag
{
    const ID = 'Matomo';
    const PARAM_MATOMO_CONFIG = 'matomoConfig';
    const REPLACE_TRACKER_KEY = "var replaceMeWithTracker='';";

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
            $this->makeSetting('documentTitle', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = 'Custom Title';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->description = 'Optionally, specify a custom document title which should be tracked instead of the default document title.';
                $field->condition = 'trackingType == "pageview"';
                if ($trackingType->getValue() === 'pageview') {
                    $field->validators[] = new CharacterLength(0, 500);
                }
            }),
            $this->makeSetting('customUrl', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = 'Custom URL';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->description = 'Optionally, specify a custom URL which should be tracked instead of the current location.';
                $field->condition = 'trackingType == "pageview"';
                if ($trackingType->getValue() === 'pageview') {
                    $field->validators[] = new CharacterLength(0, 500);
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
            $this->makeSetting('eventValue', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Event Value';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->description = 'The event\'s value, for example "50" as in user has stayed on the website for 50 seconds.';
                $field->condition = 'trackingType == "event"';
                $field->validators[] = new CharacterLength(0, 500);
                $field->validate = function ($value) {
                    if (empty($value)) {
                        return;
                    }
                    if (is_numeric($value)) {
                        return; // valid
                    }
                    $posBracket = strpos($value, '{{');
                    if ($posBracket === false || strpos($value, '}}', $posBracket) === false) {
                        throw new \Exception('The event value can only include numeric values and variables.');
                    }
                };
                $field->transform = function ($value) {
                    if ($value === null || $value === false || $value === ''){
                        // we make sure in those cases we do not case the value to float automatically by Setting class because
                        // the value is optional and we do not want to have "0" in this case
                        return null;
                    }
                    return $value;
                };
            }),
            $this->makeSetting('customDimensions', array(), FieldConfig::TYPE_ARRAY, function (FieldConfig $field) {
                $field->title = 'Custom Dimensions';
                $field->description = 'Optionally set one or multiple custom dimensions.';
                $field->validate = function ($value) {
                    if (empty($value)) {
                        return;
                    }
                    if (!is_array($value)) {
                        throw new \Exception('Value needs to be an array');
                    }
                };

                $field->transform = function ($value) {
                    if (empty($value) || !is_array($value)) {
                        return array();
                    }
                    $withValues = array();
                    foreach ($value as $dim) {
                        if (!empty($dim['index']) && !empty($dim['value'])) {
                            $withValues[] = $dim;
                        }
                    }

                    return $withValues;
                };

                $field->uiControl = FieldConfig::UI_CONTROL_MULTI_TUPLE;
                $field1 = new FieldConfig\MultiPair('Index', 'index', FieldConfig::UI_CONTROL_TEXT);
                $field1->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field2 = new FieldConfig\MultiPair('Value', 'value', FieldConfig::UI_CONTROL_TEXT);
                $field2->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->uiControlAttributes['field1'] = $field1->toArray();
                $field->uiControlAttributes['field2'] = $field2->toArray();
            }),
            $this->makeSetting('customVariables', array(), FieldConfig::TYPE_ARRAY, function (FieldConfig $field) {
                $field->title = 'Custom Variables';
                $field->description = 'Optionally set one or multiple custom variables. Scope "action" will set the scope based on the selected tracking type.';
                $field->validate = function ($value) {
                    if (empty($value)) {
                        return;
                    }
                    if (!is_array($value)) {
                        throw new \Exception('Value needs to be an array');
                    }
                };

                $field->transform = function ($value) {
                    if (empty($value) || !is_array($value)) {
                        return array();
                    }
                    $withValues = array();
                    foreach ($value as $var) {
                        if (!empty($var['index']) && !empty($var['name']) && !empty($var['value']) && !empty($var['scope'])) {
                            $withValues[] = $var;
                        }
                    }

                    return $withValues;
                };

                $field->uiControl = FieldConfig::UI_CONTROL_MULTI_TUPLE;
                $field1 = new FieldConfig\MultiPair('Index', 'index', FieldConfig::UI_CONTROL_TEXT);
                $field1->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field2 = new FieldConfig\MultiPair('Name', 'name', FieldConfig::UI_CONTROL_TEXT);
                $field2->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field3 = new FieldConfig\MultiPair('Value', 'value', FieldConfig::UI_CONTROL_TEXT);
                $field3->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field4 = new FieldConfig\MultiPair('Scope', 'scope', FieldConfig::UI_CONTROL_SINGLE_SELECT);
                $field4->availableValues = array(
                    'visit' => 'visit',
                    'action' => 'action',
                );
                $field->uiControlAttributes['field1'] = $field1->toArray();
                $field->uiControlAttributes['field2'] = $field2->toArray();
                $field->uiControlAttributes['field3'] = $field3->toArray();
                $field->uiControlAttributes['field4'] = $field4->toArray();
            }),
        );
    }

    public function loadTemplate($context, $entity)
    {
        $template = parent::loadTemplate($context, $entity);
        // !isset() because when bundleTracker is not defined for some reason we enable it by default
        $bundleTrackerEnabled = !isset($entity['parameters']['matomoConfig']['parameters']['bundleTracker'])
                             || !empty($entity['parameters']['matomoConfig']['parameters']['bundleTracker']);
        if ($template && $bundleTrackerEnabled) {
            $trackerUpdater = StaticContainer::get('Piwik\Plugins\CustomPiwikJs\TrackerUpdater');
            $tracker = $trackerUpdater->getUpdatedTrackerFileContent();

            if (!$tracker) {
                $tracker = @file_get_contents(PIWIK_DOCUMENT_ROOT . '/matomo.js');
            }
            if (!$tracker) {
                $tracker = @file_get_contents(PIWIK_DOCUMENT_ROOT . '/piwik.js');
            }

            return str_replace(self::REPLACE_TRACKER_KEY, $tracker, $template);
        }
        return $template;
    }

    public function getOrder()
    {
        return 1;
    }

}
