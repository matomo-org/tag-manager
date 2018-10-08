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
	public function getIcon()
	{
		return 'plugins/TagManager/Template/Tag/Etracker.svg';
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
		$trackingType,
            	$this->makeSetting('etrackerID', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                	$field->title = 'etracker Tracking ID';
                	$field->description = '';
                	$field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
			$field->condition = 'trackingType == "pageview"';
                	$field->validators[] = new NotEmpty();
            }),
		$this->makeSetting('etrackerDNT', false, FieldConfig::TYPE_BOOL, function (FieldConfig $field) use ($trackingType) {
                	$field->title = 'etracker Do-Not-Track';
                	$field->description = 'Respect Do Not Track';
			$field->condition = 'trackingType == "pageview"';
            }),
		$this->makeSetting('etrackerEventCategory', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) use ($trackingType) {
                	$field->title = 'etracker Category';
                	$field->description = 'The event\'s category, for example Navigation, Outbound Links, 404 Error...';
                	$field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
			$field->condition = 'trackingType == "event"';
                	$field->validators[] = new NotEmpty();
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
