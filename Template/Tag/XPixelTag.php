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
class XPixelTag extends BaseTag
{
    public function getIcon()
    {
        return 'plugins/TagManager/images/icons/x.svg';
    }

    public function getParameters()
    {
        return [
            $this->makeSetting('pixelId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManager_XPixelTagPixelIdTitle');
                $field->description = Piwik::translate('TagManager_XPixelTagPixelIdDescription');
                $field->uiControlAttributes = ['placeholder' => Piwik::translate('TagManager_XPixelTagPixelIdPlaceholder')];
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->validators[] = new NotEmpty();
                $field->transform = function ($value) {
                    return trim($value);
                };
            }),
            $this->makeSetting('eventId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManager_XPixelTagEventIdTitle');
                $field->description = Piwik::translate('TagManager_XPixelTagEventIdDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),
            $this->makeSetting('eventParameters', [], FieldConfig::TYPE_ARRAY, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManager_XPixelTagEventParametersTitle');
                $field->description = Piwik::translate('TagManager_XPixelTagEventParametersDescription');
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
