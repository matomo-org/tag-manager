<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Template\Tag;

use Piwik\Settings\FieldConfig;
use Piwik\Validators\NotEmpty;
use Piwik\Validators\CharacterLength;

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
            $field->title = 'Tracking Type';
            $field->description = 'Choose which action should be executed when this tag is fired.';
            $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
            $field->validators[] = new NotEmpty();
            $field->availableValues = array(
                'pageview' => 'Pageview',
                'wrapper' => 'Wrapper',
                'event' => 'Event',
                'order' => 'Transaction',
            );
        });
        return array(
            $trackingType,
            $this->makeSetting(self::PARAM_ETRACKER_CONFIG, '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = 'etracker Configuration';
                $field->description = 'Assign a etracker configuration in order to track data into a specific site.';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE_TYPE;
                $field->uiControlAttributes = array('variableType' => 'EtrackerConfiguration');
                $field->condition = 'trackingType == "pageview" || trackingType =="wrapper"';
                if ($trackingType->getValue() === 'pageview' || $trackingType->getValue() === 'wrapper') {
                    $field->validators[] = new NotEmpty();
                }
            }),
            $this->makeSetting('etrackerWrapperPagename', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = 'etracker Wrapper pagename (et_pagename)';
                $field->description = 'The wrappers\'s pagename';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->condition = 'trackingType == "wrapper"';
                if ($trackingType->getValue() === 'wrapper') {
                    $field->validators[] = new NotEmpty();
                }
            }),
            $this->makeSetting('etrackerWrapperArea', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = 'etracker Wrapper area (et_area)';
                $field->description = 'The area should be separated by Slash';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->condition = 'trackingType == "wrapper"';
            }),
            $this->makeSetting('etrackerWrapperTarget', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = 'etracker Wrapper target (et_target)';
                $field->description = '';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->condition = 'trackingType == "wrapper"';
            }),
            $this->makeSetting('etrackerWrapperTval', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = 'etracker Wrapper total order value (et_tval)';
                $field->description = '';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->condition = 'trackingType == "wrapper"';
            }),
            $this->makeSetting('etrackerWrapperTonr', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = 'etracker Wrapper order number (et_tonr)';
                $field->description = '';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->condition = 'trackingType == "wrapper"';
            }),
            $this->makeSetting('etrackerWrapperTsale', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = 'etracker Wrapper order status (et_tsale)';
                $field->description = '';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->condition = 'trackingType == "wrapper"';
            }),
            $this->makeSetting('etrackerWrapperCust', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = 'etracker Wrapper customer status (et_cust)';
                $field->description = '';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->condition = 'trackingType == "wrapper"';
            }),
            $this->makeSetting('etrackerWrapperBasket', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = 'etracker Wrapper basket (et_basket)';
                $field->description = '';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->condition = 'trackingType == "wrapper"';
            }),
            $this->makeSetting('etrackerEventCategory', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = 'etracker Category';
                $field->description = 'The event\'s category, for example Navigation, Outbound Links, 404 Error...';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->condition = 'trackingType == "event"';
                if ($trackingType->getValue() === 'event') {
                    $field->validators[] = new NotEmpty();
                }
            }),
            $this->makeSetting('etrackerEventObject', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = 'etracker Object';
                $field->description = 'The event\'s object Name, for example a particular navigation element, a clicked element, form name,...';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->condition = 'trackingType == "event"';
            }),
            $this->makeSetting('etrackerEventAction', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = 'etracker Action';
                $field->description = 'The event\'s action, for example, click, open, close, play, pause...';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->condition = 'trackingType == "event"';
            }),
            $this->makeSetting('etrackerEventType', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = 'etracker Type';
                $field->description = 'The event\'s type Name, for example an value of a send form...';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->condition = 'trackingType == "event"';
            }),
            $this->makeSetting('etrackerTransactionType', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = 'etracker Order Status';
                $field->description = 'Order / Lead / Partial Cancellation / Cancellation';
                $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
                $field->availableValues = array(
                 'sale' => 'Sale',
                 'lead' => 'Lead',
                 'cancellation' => 'Cancellation',
                 'partial_cancellation' => 'Partial Cancellation',
                );
                $field->condition = 'trackingType == "order"';
                if ($trackingType->getValue() === 'order') {
                    $field->validators[] = new NotEmpty();
                }
            }),
            $this->makeSetting('etrackerTransactionID', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = 'etracker Order number';
                $field->description = 'Order ID, transaction id or similar - max 50 chars';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->condition = 'trackingType == "order"';
                if ($trackingType->getValue() === 'order') {
                    $field->validators[] = new NotEmpty();
                }
            }),
            $this->makeSetting('etrackerTransactionValue', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = 'Order Value';
                $field->description = 'Order Value';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->condition = 'trackingType == "order"';
                if ($trackingType->getValue() === 'order') {
                    $field->validators[] = new NotEmpty();
                }
            }),
            $this->makeSetting('etrackerTransactionCurrency', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = 'Currency';
                $field->description = 'Currency of the order according to ISO 4217 e.g.: EUR or USD';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->condition = 'trackingType == "order"';
                if ($trackingType->getValue() === 'order') {
                    $field->validators[] = new CharacterLength($min = 3, $max = 3);
                }
            }),
            $this->makeSetting('etrackerTransactionBasket', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = 'Basket';
                $field->description = 'dataLayer object of products which are sold';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->condition = 'trackingType == "order"';
                if ($trackingType->getValue() === 'order') {
                    $field->validators[] = new NotEmpty();
                }
            }),
            $this->makeSetting('etrackerTransactionCustomerGroup', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = 'CustomerGroup';
                $field->description = 'optional, e.g. new customer, existing customer, big buyer, VIP';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->condition = 'trackingType == "order"';
            }),
            $this->makeSetting('etrackerTransactionCustomerGroup', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = 'CustomerGroup';
                $field->description = 'optional, e.g. new customer, existing customer, big buyer, VIP';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->condition = 'trackingType == "order"';
            }),
            $this->makeSetting('etrackerTransactionDeliveryConditions', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = 'Delivery Conditions';
                $field->description = 'optional, e.g. Delivery to the kerb, Setup on site, Delivery to the pick-up station/parcel shop/branch';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->condition = 'trackingType == "order"';
            }),
            $this->makeSetting('etrackerTransactionPaymentConditions', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                $field->title = 'Payment Conditions';
                $field->description = 'optional, e.g. Special payment targets, Cash discount, Payment in instalments';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->condition = 'trackingType == "order"';
            }),
        );
    }
    public function getCategory()
    {
            return self::CATEGORY_ANALYTICS;
    }
}
