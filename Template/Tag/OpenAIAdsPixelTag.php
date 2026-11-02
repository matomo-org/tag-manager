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
class OpenAIAdsPixelTag extends BaseTag
{
    public const EVENTS = [
        'page_viewed',
        'contents_viewed',
        'items_added',
        'checkout_started',
        'order_created',
        'lead_created',
        'registration_completed',
        'appointment_scheduled',
        'subscription_created',
        'trial_started',
    ];

    public const CUSTOM_EVENT_NAME_PATTERN = '/^[a-z0-9](?:[a-z0-9_-]{0,62}[a-z0-9])?$/';

    public function getIcon()
    {
        return 'plugins/TagManager/images/icons/openai.svg';
    }

    public function getParameters()
    {
        $events = array_combine(self::EVENTS, self::EVENTS);
        $events['custom'] = Piwik::translate('TagManager_OpenAIAdsPixelTagEventNameCustom');

        $eventName = $this->makeSetting('eventName', 'page_viewed', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($events) {
            $field->title = Piwik::translate('TagManager_OpenAIAdsPixelTagEventNameTitle');
            $field->description = Piwik::translate('TagManager_OpenAIAdsPixelTagEventNameDescription');
            $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
            $field->availableValues = $events;
            $field->validators[] = new NotEmpty();
        });

        $amount = $this->makeSetting('amount', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = Piwik::translate('TagManager_OpenAIAdsPixelTagAmountTitle');
            $field->description = Piwik::translate('TagManager_OpenAIAdsPixelTagAmountDescription');
            $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
        });

        return [
            $this->makeSetting('pixelId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManager_OpenAIAdsPixelTagPixelIdTitle');
                $field->description = Piwik::translate('TagManager_OpenAIAdsPixelTagPixelIdDescription');
                $field->uiControlAttributes = ['placeholder' => Piwik::translate('TagManager_OpenAIAdsPixelTagPixelIdPlaceholder')];
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->validators[] = new NotEmpty();
                $field->transform = function ($value) {
                    return trim($value);
                };
            }),
            $eventName,
            $this->makeSetting('customEventName', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($eventName) {
                $field->title = Piwik::translate('TagManager_OpenAIAdsPixelTagCustomEventNameTitle');
                $field->description = Piwik::translate('TagManager_OpenAIAdsPixelTagCustomEventNameDescription');
                $field->condition = 'eventName == "custom"';
                if ($eventName->getValue() === 'custom') {
                    $field->validators[] = new NotEmpty();
                    $field->validate = function ($value) {
                        $value = strtolower(trim((string) $value));
                        // A variable reference only resolves in the browser, where the JS repeats this check
                        if ($value === '' || strpos($value, '{{') !== false) {
                            return;
                        }
                        if (
                            !preg_match(self::CUSTOM_EVENT_NAME_PATTERN, $value)
                            || in_array($value, array_merge(self::EVENTS, ['custom']), true)
                        ) {
                            throw new \Exception(Piwik::translate('TagManager_OpenAIAdsPixelTagCustomEventNameInvalid'));
                        }
                    };
                }
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),
            $amount,
            $this->makeSetting('currency', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($amount) {
                $field->title = Piwik::translate('TagManager_OpenAIAdsPixelTagCurrencyTitle');
                $field->description = Piwik::translate('TagManager_OpenAIAdsPixelTagCurrencyDescription');
                $amountValue = $amount->getValue();
                if (is_string($amountValue) && trim($amountValue) !== '') {
                    $field->validators[] = new NotEmpty();
                }
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),
            $this->makeSetting('eventId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManager_OpenAIAdsPixelTagEventIdTitle');
                $field->description = Piwik::translate('TagManager_OpenAIAdsPixelTagEventIdDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),
        ];
    }

    public function getCategory()
    {
        return self::CATEGORY_ADS;
    }
}
