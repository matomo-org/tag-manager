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
                'event' => 'Event',
            );
        });
        return array(
            $this->makeSetting(self::PARAM_ETRACKER_CONFIG, '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'etracker Configuration';
                $field->description = 'Assign a etracker configuration in order to track data into a specific site.';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE_TYPE;
                $field->uiControlAttributes = array('variableType' => 'EtrackerConfiguration');
                $field->validators[] = new NotEmpty();
            }),
            $trackingType,
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
            })
        );
    }
    public function getCategory()
    {
            return self::CATEGORY_ANALYTICS;
    }
}
