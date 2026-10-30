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
class SnapchatTag extends BaseTag
{
    public const EVENTS = [
        'PAGE_VIEW',
        'VIEW_CONTENT',
        'LIST_VIEW',
        'SEARCH',
        'ADD_CART',
        'ADD_TO_WISHLIST',
        'START_CHECKOUT',
        'ADD_BILLING',
        'PURCHASE',
        'SIGN_UP',
        'SUBSCRIBE',
        'AD_CLICK',
        'COMPLETE_TUTORIAL',
        'CUSTOM_EVENT_1',
        'CUSTOM_EVENT_2',
        'CUSTOM_EVENT_3',
        'CUSTOM_EVENT_4',
        'CUSTOM_EVENT_5',
    ];

    public function getIcon()
    {
        return 'plugins/TagManager/images/icons/snapchat.svg';
    }

    public function getParameters()
    {
        return [
            $this->makeSetting('pixelId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManager_SnapchatTagPixelIdTitle');
                $field->description = Piwik::translate('TagManager_SnapchatTagPixelIdDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->validators[] = new NotEmpty();
                $field->transform = function ($value) {
                    return trim($value);
                };
            }),
            $this->makeSetting('eventName', 'PAGE_VIEW', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManager_SnapchatTagEventNameTitle');
                $field->description = Piwik::translate('TagManager_SnapchatTagEventNameDescription');
                $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
                $field->availableValues = array_combine(self::EVENTS, self::EVENTS);
                $field->validators[] = new NotEmpty();
            }),
            $this->makeSetting('userEmail', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManager_SnapchatTagUserEmailTitle');
                $field->description = Piwik::translate('TagManager_SnapchatTagUserEmailDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),
            $this->makeSetting('eventParameters', [], FieldConfig::TYPE_ARRAY, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManager_SnapchatTagEventParametersTitle');
                $field->description = Piwik::translate('TagManager_SnapchatTagEventParametersDescription');
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
