<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\Template\Tag;

use Piwik\Common;
use Piwik\Piwik;
use Piwik\Settings\FieldConfig;
use Piwik\Validators\NotEmpty;

/**
 * Ported from Tag Manager Extended by Openmost: https://github.com/openmost/TagManagerExtended
 */
class RedditTag extends BaseTag
{
    public const EVENTS = [
        'PageVisit',
        'ViewContent',
        'Search',
        'AddToCart',
        'AddToWishlist',
        'Purchase',
        'Lead',
        'SignUp',
    ];

    public const CUSTOM_EVENT_NAME_MAX_LENGTH = 64;

    public function getIcon()
    {
        return 'plugins/TagManager/images/icons/reddit.svg';
    }

    public function getParameters()
    {
        $events = array_combine(self::EVENTS, self::EVENTS);
        $events['custom'] = Piwik::translate('TagManager_RedditTagEventNameCustom');

        $eventName = $this->makeSetting('eventName', 'PageVisit', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($events) {
            $field->title = Piwik::translate('TagManager_RedditTagEventNameTitle');
            $field->description = Piwik::translate('TagManager_RedditTagEventNameDescription');
            $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
            $field->availableValues = $events;
            $field->validators[] = new NotEmpty();
        });

        return [
            $this->makeSetting('pixelId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManager_RedditTagPixelIdTitle');
                $field->description = Piwik::translate('TagManager_RedditTagPixelIdDescription');
                $field->uiControlAttributes = ['placeholder' => Piwik::translate('TagManager_RedditTagPixelIdPlaceholder')];
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->validators[] = new NotEmpty();
                $field->transform = function ($value) {
                    return trim($value);
                };
            }),
            $eventName,
            $this->makeSetting('customEventName', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($eventName) {
                $field->title = Piwik::translate('TagManager_RedditTagCustomEventNameTitle');
                $field->description = Piwik::translate('TagManager_RedditTagCustomEventNameDescription');
                $field->condition = 'eventName == "custom"';
                if ($eventName->getValue() === 'custom') {
                    $field->validators[] = new NotEmpty();
                    $field->validate = function ($value) {
                        $value = trim((string) $value);
                        // A variable reference only resolves in the browser, where the JS repeats this check
                        if ($value === '' || strpos($value, '{{') !== false) {
                            return;
                        }
                        if (Common::mb_strlen($value) > self::CUSTOM_EVENT_NAME_MAX_LENGTH) {
                            throw new \Exception(Piwik::translate('TagManager_RedditTagCustomEventNameInvalid', [self::CUSTOM_EVENT_NAME_MAX_LENGTH]));
                        }
                    };
                }
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),
            $this->makeSetting('eventParameters', [], FieldConfig::TYPE_ARRAY, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManager_RedditTagEventParametersTitle');
                $field->description = Piwik::translate('TagManager_RedditTagEventParametersDescription');
                $field->uiControl = FieldConfig::UI_CONTROL_MULTI_TUPLE;

                $field1 = new FieldConfig\MultiPair(Piwik::translate('Parameter'), 'parameter', FieldConfig::UI_CONTROL_TEXT);
                $field1->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;

                $field2 = new FieldConfig\MultiPair(Piwik::translate('Value'), 'value', FieldConfig::UI_CONTROL_TEXT);
                $field2->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;

                $field->uiControlAttributes['field1'] = $field1->toArray();
                $field->uiControlAttributes['field2'] = $field2->toArray();
            }),
        ];
    }

    public function getCategory()
    {
        return self::CATEGORY_SOCIAL;
    }
}
