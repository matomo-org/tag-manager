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
class TikTokTag extends BaseTag
{
    public const EVENTS = [
        'PageView',
        'ViewContent',
        'Search',
        'AddToWishlist',
        'AddToCart',
        'InitiateCheckout',
        'AddPaymentInfo',
        'Purchase',
        'CompleteRegistration',
        'Contact',
        'Download',
        'SubmitForm',
        'SubmitApplication',
        'Subscribe',
        'CustomizeProduct',
        'FindLocation',
        'Schedule',
        'StartTrial',
    ];

    // TikTok maps these to standard events, so a custom event cannot use them
    public const RESERVED_EVENTS = [
        'AddBilling',
        'Browse',
        'Checkout',
        'ClickForm',
        'ClickInDownloadPage',
        'ClickToDownload',
        'Consult',
        'ConsultByPhone',
        'CompletePayment',
        'Registration',
        'StartCheckout',
        'ViewConsultationPage',
        'ViewDownloadPage',
        'ViewForm',
    ];

    public const CUSTOM_EVENT_NAME_PATTERN = '/^[a-z][a-z0-9_-]{0,49}$/i';

    public function getIcon()
    {
        return 'plugins/TagManager/images/icons/tiktok.svg';
    }

    public function getParameters()
    {
        $events = array_combine(self::EVENTS, self::EVENTS);
        $events['custom'] = Piwik::translate('TagManager_TikTokTagEventNameCustom');

        $eventName = $this->makeSetting('eventName', 'PageView', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($events) {
            $field->title = Piwik::translate('TagManager_TikTokTagEventNameTitle');
            $field->description = Piwik::translate('TagManager_TikTokTagEventNameDescription');
            $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
            $field->availableValues = $events;
            $field->validators[] = new NotEmpty();
        });

        return [
            $this->makeSetting('pixelId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManager_TikTokTagPixelIdTitle');
                $field->description = Piwik::translate('TagManager_TikTokTagPixelIdDescription');
                $field->uiControlAttributes = ['placeholder' => Piwik::translate('TagManager_TikTokTagPixelIdPlaceholder')];
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->validators[] = new NotEmpty();
                $field->transform = function ($value) {
                    return trim($value);
                };
            }),
            $eventName,
            $this->makeSetting('customEventName', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($eventName) {
                $field->title = Piwik::translate('TagManager_TikTokTagCustomEventNameTitle');
                $field->description = Piwik::translate('TagManager_TikTokTagCustomEventNameDescription');
                $field->condition = 'eventName == "custom"';
                if ($eventName->getValue() === 'custom') {
                    $field->validators[] = new NotEmpty();
                    $field->validate = function ($value) {
                        $value = trim((string) $value);
                        // A variable reference only resolves in the browser, where the JS repeats this check
                        if ($value === '' || strpos($value, '{{') !== false) {
                            return;
                        }
                        $taken = array_map('strtolower', array_merge(self::EVENTS, self::RESERVED_EVENTS));
                        if (!preg_match(self::CUSTOM_EVENT_NAME_PATTERN, $value) || in_array(strtolower($value), $taken, true)) {
                            throw new \Exception(Piwik::translate('TagManager_TikTokTagCustomEventNameInvalid'));
                        }
                    };
                }
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),
            $this->makeSetting('eventParameters', [], FieldConfig::TYPE_ARRAY, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManager_TikTokTagEventParametersTitle');
                $field->description = Piwik::translate('TagManager_TikTokTagEventParametersDescription');
                $field->condition = 'eventName != "PageView"';
                $field->uiControl = FieldConfig::UI_CONTROL_MULTI_TUPLE;

                $field1 = new FieldConfig\MultiPair(Piwik::translate('Parameter'), 'parameter', FieldConfig::UI_CONTROL_TEXT);
                $field1->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;

                $field2 = new FieldConfig\MultiPair(Piwik::translate('Value'), 'value', FieldConfig::UI_CONTROL_TEXT);
                $field2->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;

                $field->uiControlAttributes['field1'] = $field1->toArray();
                $field->uiControlAttributes['field2'] = $field2->toArray();
            }),
            $this->makeSetting('eventId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManager_TikTokTagEventIdTitle');
                $field->description = Piwik::translate('TagManager_TikTokTagEventIdDescription');
                $field->condition = 'eventName != "PageView"';
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),
        ];
    }

    public function getCategory()
    {
        return self::CATEGORY_SOCIAL;
    }
}
