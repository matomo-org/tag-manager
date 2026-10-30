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
class HubSpotTrackingTag extends BaseTag
{
    public function getIcon()
    {
        return 'plugins/TagManager/images/icons/hubspot.svg';
    }

    public function getParameters()
    {
        return [
            $this->makeSetting('portalId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManager_HubSpotTrackingTagPortalIdTitle');
                $field->description = Piwik::translate('TagManager_HubSpotTrackingTagPortalIdDescription');
                $field->uiControlAttributes = ['placeholder' => Piwik::translate('TagManager_HubSpotTrackingTagPortalIdPlaceholder')];
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->validators[] = new NotEmpty();
                $field->validate = function ($value) {
                    $value = trim((string) $value);
                    // A variable reference only resolves in the browser, where the JS repeats this check
                    if ($value === '' || strpos($value, '{{') !== false) {
                        return;
                    }
                    if (!ctype_digit($value)) {
                        throw new \Exception(Piwik::translate('TagManager_HubSpotTrackingTagPortalIdInvalid'));
                    }
                };
                $field->transform = function ($value) {
                    return trim($value);
                };
            }),
            $this->makeSetting('region', 'na1', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManager_HubSpotTrackingTagRegionTitle');
                $field->description = Piwik::translate('TagManager_HubSpotTrackingTagRegionDescription');
                $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
                $field->availableValues = [
                    'na1' => Piwik::translate('TagManager_HubSpotTrackingTagRegionNa1'),
                    'eu1' => Piwik::translate('TagManager_HubSpotTrackingTagRegionEu1'),
                ];
                $field->validators[] = new NotEmpty();
            }),
            $this->makeSetting('email', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManager_HubSpotTrackingTagEmailTitle');
                $field->description = Piwik::translate('TagManager_HubSpotTrackingTagEmailDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),
            $this->makeSetting('eventName', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = Piwik::translate('TagManager_HubSpotTrackingTagEventNameTitle');
                $field->description = Piwik::translate('TagManager_HubSpotTrackingTagEventNameDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
            }),
        ];
    }

    public function getCategory()
    {
        return self::CATEGORY_OTHERS;
    }
}
