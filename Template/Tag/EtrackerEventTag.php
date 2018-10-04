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

class EtrackerEventTag extends BaseTag
{
	public function getIcon()
	{
		return 'plugins/TagManager/Template/Tag/EtrackerEvent.svg';
	}
    public function isCustomTemplate()
    {
        return true;
    }
    
    public function getParameters()
    {
        return array(
            $this->makeSetting('etrackerEventCategory', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'etracker Category';
                $field->description = '';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->validators[] = new NotEmpty();
            }),
			$this->makeSetting('etrackerEventObject', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'etracker Object';
                $field->description = '';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
            }),
			$this->makeSetting('etrackerEventAction', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'etracker Action';
                $field->description = '';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
            }),
			$this->makeSetting('etrackerEventType', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'etracker Type';
                $field->description = '';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
            })
        );
    }
    public function getCategory()
	{
		return self::CATEGORY_ANALYTICS;
	}
}