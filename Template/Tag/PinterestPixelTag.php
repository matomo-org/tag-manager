<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\Template\Tag;

use Piwik\Piwik;
use Piwik\Settings\FieldConfig;
use Piwik\Validators\NotEmpty;

/**
 * Ported from Tag Manager Extended by Openmost: https://github.com/openmost/TagManagerExtended
 */
class PinterestPixelTag extends BaseTag
{
    public const EVENTS = [
        'pagevisit',
        'viewcategory',
        'search',
        'addtocart',
        'checkout',
        'signup',
        'lead',
        'watchvideo',
    ];

    public const CUSTOM_EVENT_NAME_PATTERN = '/^[a-z0-9_-]{1,100}$/i';

    public function getIcon()
    {
        return 'plugins/TagManager/images/icons/pinterest.svg';
    }

    public function getParameters()
    {
        $events = array_combine(self::EVENTS, self::EVENTS);
        $events['custom'] = Piwik::translate('TagManager_PinterestPixelTagEventNameCustom');

        $eventName = $this->makeSetting('eventName', 'pagevisit', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($events) {
            $field->title = Piwik::translate('TagManager_PinterestPixelTagEventNameTitle');
            $field->description = Piwik::translate('TagManager_PinterestPixelTagEventNameDescription');
            $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
            $field->availableValues = $events;
            $field->validators[] = new NotEmpty();
        });

        return [
            $this->makeSetting('tagId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManager_PinterestPixelTagTagIdTitle');
                $field->description = Piwik::translate('TagManager_PinterestPixelTagTagIdDescription');
                $field->uiControlAttributes = ['placeholder' => Piwik::translate('TagManager_PinterestPixelTagTagIdPlaceholder')];
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->validators[] = new NotEmpty();
                $field->transform = function ($value) {
                    return trim($value);
                };
            }),
            $eventName,
            $this->makeSetting('customEventName', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($eventName) {
                $field->title = Piwik::translate('TagManager_PinterestPixelTagCustomEventNameTitle');
                $field->description = Piwik::translate('TagManager_PinterestPixelTagCustomEventNameDescription');
                $field->condition = 'eventName == "custom"';
                if ($eventName->getValue() === 'custom') {
                    $field->validators[] = new NotEmpty();
                    $field->validate = function ($value) {
                        $value = trim((string) $value);
                        // A variable reference only resolves in the browser, where the JS repeats this check
                        if ($value === '' || strpos($value, '{{') !== false) {
                            return;
                        }
                        if (
                            !preg_match(self::CUSTOM_EVENT_NAME_PATTERN, $value)
                            || in_array(strtolower($value), array_merge(self::EVENTS, ['custom']), true)
                        ) {
                            throw new \Exception(Piwik::translate('TagManager_PinterestPixelTagCustomEventNameInvalid'));
                        }
                    };
                }
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),
            $this->makeSetting('eventParameters', [], FieldConfig::TYPE_ARRAY, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManager_PinterestPixelTagEventParametersTitle');
                $field->description = Piwik::translate('TagManager_PinterestPixelTagEventParametersDescription');
                $field->uiControl = FieldConfig::UI_CONTROL_MULTI_TUPLE;

                $field1 = new FieldConfig\MultiPair(Piwik::translate('Parameter'), 'parameter', FieldConfig::UI_CONTROL_TEXT);
                $field1->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;

                $field2 = new FieldConfig\MultiPair(Piwik::translate('Value'), 'value', FieldConfig::UI_CONTROL_TEXT);
                $field2->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;

                $field->uiControlAttributes['field1'] = $field1->toArray();
                $field->uiControlAttributes['field2'] = $field2->toArray();
            }),
            $this->makeSetting('eventId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManager_PinterestPixelTagEventIdTitle');
                $field->description = Piwik::translate('TagManager_PinterestPixelTagEventIdDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),
        ];
    }

    public function getCategory()
    {
        return self::CATEGORY_SOCIAL;
    }
}
