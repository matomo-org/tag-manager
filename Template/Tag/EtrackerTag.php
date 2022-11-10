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

class EtrackerTag extends BaseTag
{
    const PARAM_ETRACKER_CONFIG = 'etrackerConfig';

    public function getIcon()
    {
        return 'plugins/TagManager/images/icons/etracker.svg';
    }

    public function getParameters()
    {
        $trackingType = $this->makeSetting('trackingType', 'pageview', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = Piwik::translate('TagManager_EtrackerTagTrackingTypeTitle');
            $field->description = Piwik::translate('TagManager_EtrackerTagTrackingTypeDescription');
            $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
            $field->validators[] = new NotEmpty();
            $field->availableValues = array(
                'pageview' => 'Pageview',
                'wrapper' => 'Wrapper',
                'event' => 'Event',
            );
        });
        return array(
            $trackingType,
            $this->makeSetting(self::PARAM_ETRACKER_CONFIG, '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = Piwik::translate('TagManager_EtrackerTagConfigTitle');
                $field->description = Piwik::translate('TagManager_EtrackerTagConfigDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_TYPE_COMPONENT;
                $field->uiControlAttributes = array('variableType' => 'EtrackerConfiguration');
                $field->condition = 'trackingType != "event"';
                if ($trackingType->getValue() === 'pageview' || $trackingType->getValue() === 'wrapper') {
                    $field->validators[] = new NotEmpty();
                }
            }),
            $this->makeSetting('etrackerWrapperPagename', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = Piwik::translate('TagManager_EtrackerTagWrapperPageNameTitle');
                $field->description = Piwik::translate('TagManager_EtrackerTagWrapperPageNameDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->condition = 'trackingType == "wrapper"';
                if ($trackingType->getValue() === 'wrapper') {
                    $field->validators[] = new NotEmpty();
                }
            }),
            $this->makeSetting('etrackerWrapperArea', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = Piwik::translate('TagManager_EtrackerTagWrapperAreaTitle');
                $field->description = Piwik::translate('TagManager_EtrackerTagWrapperAreaDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->condition = 'trackingType == "wrapper"';
            }),
            $this->makeSetting('etrackerWrapperTarget', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = Piwik::translate('TagManager_EtrackerTagWrapperTargetTitle');
                $field->description = '';
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->condition = 'trackingType == "wrapper"';
            }),
            $this->makeSetting('etrackerWrapperTval', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = Piwik::translate('TagManager_EtrackerTagWrapperTvalTitle');
                $field->description = '';
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->condition = 'trackingType == "wrapper"';
            }),
            $this->makeSetting('etrackerWrapperTonr', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = Piwik::translate('TagManager_EtrackerTagWrapperTonrTitle');
                $field->description = '';
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->condition = 'trackingType == "wrapper"';
            }),
            $this->makeSetting('etrackerWrapperTsale', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = Piwik::translate('TagManager_EtrackerTagWrapperTsaleTitle');
                $field->description = '';
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->condition = 'trackingType == "wrapper"';
            }),
            $this->makeSetting('etrackerWrapperCust', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = Piwik::translate('TagManager_EtrackerTagWrapperTcustTitle');
                $field->description = '';
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->condition = 'trackingType == "wrapper"';
            }),
            $this->makeSetting('etrackerWrapperBasket', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = Piwik::translate('TagManager_EtrackerTagWrapperTBasketTitle');
                $field->description = '';
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->condition = 'trackingType == "wrapper"';
            }),
            $this->makeSetting('etrackerEventCategory', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = Piwik::translate('TagManager_EtrackerTagEventCategoryTitle');
                $field->description = Piwik::translate('TagManager_EtrackerTagEventCategoryDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->condition = 'trackingType == "event"';
                if ($trackingType->getValue() === 'event') {
                    $field->validators[] = new NotEmpty();
                }
            }),
            $this->makeSetting('etrackerEventObject', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = Piwik::translate('TagManager_EtrackerTagEventObjectTitle');
                $field->description = Piwik::translate('TagManager_EtrackerTagEventObjectDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->condition = 'trackingType == "event"';
            }),
            $this->makeSetting('etrackerEventAction', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = Piwik::translate('TagManager_EtrackerTagEventActionTitle');
                $field->description = Piwik::translate('TagManager_EtrackerTagEventActionDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->condition = 'trackingType == "event"';
            }),
            $this->makeSetting('etrackerEventType', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = Piwik::translate('TagManager_EtrackerTagEventTypeTitle');
                $field->description = Piwik::translate('TagManager_EtrackerTagEventTypeDescription');
                $field->customFieldComponent = self::FIELD_VARIABLE_COMPONENT;
                $field->condition = 'trackingType == "event"';
            })
        );
    }
    public function getCategory()
    {
            return self::CATEGORY_ANALYTICS;
    }
}
