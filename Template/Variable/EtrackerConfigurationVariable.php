<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Template\Variable;

use Piwik\Common;
use Piwik\Settings\FieldConfig;
use Piwik\Validators\NotEmpty;

class EtrackerConfigurationVariable extends BaseVariable
{
    const ID = 'EtrackerConfiguration';

    public function getId()
    {
        return self::ID;
    }

    public function getCategory()
    {
        return self::CATEGORY_OTHERS;
    }

    public function getIcon()
    {
        return 'plugins/TagManager/images/icons/etracker.svg';
    }

    public function hasAdvancedSettings()
    {
        return false;
    }

    public function getParameters()
    {
        return array(
            $this->makeSetting('etrackerID', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'etracker ID';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->description = 'The etracker ID you want to track data into. The ID is required. You may  find the ID of your website under "Administration => Setup/Tracking Code" in etracker.';
                $field->validators[] = new NotEmpty();
            }),
            $this->makeSetting('etrackerBlockCookies', true, FieldConfig::TYPE_BOOL, function (FieldConfig $field) {
                $field->title = 'Block cookies by default';
            }),
            $this->makeSetting('etrackerDNT', false, FieldConfig::TYPE_BOOL, function (FieldConfig $field) {
                $field->title = 'Respect Do Not Track in etracker';
            }),
            $this->makeSetting('et_pagename', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Variable et_pagename';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->description = 'Set variable if you want to overwrite the default value';
            }),
            $this->makeSetting('et_areas', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Variable et_areas';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->description = 'Set variable if you want to overwrite the default value';
            }),
            $this->makeSetting('et_target', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Variable et_target';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->description = 'Set variable if you want to overwrite the default value';
            }),
            $this->makeSetting('et_tval', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Variable et_tval';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->description = 'Set variable if you want to overwrite the default value';
            }),
            $this->makeSetting('et_tonr', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Variable et_tonr';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->description = 'Set variable if you want to overwrite the default value';
            }),
            $this->makeSetting('et_tsale', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Variable et_tsale';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->description = 'Set variable if you want to overwrite the default value';
            }),
            $this->makeSetting('et_basket', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Variable et_basket';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->description = 'Set variable if you want to overwrite the default value';
            }),
            $this->makeSetting('et_cust', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Variable et_cust';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->description = 'Set variable if you want to overwrite the default value';
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
        );
    }
}
