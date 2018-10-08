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
        return array(
            $this->makeSetting('etrackerID', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'etracker Tracking ID';
                $field->description = '';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->validators[] = new NotEmpty();
            }),
			$this->makeSetting('etrackerDNT', false, FieldConfig::TYPE_BOOL, function (FieldConfig $field) {
                $field->title = 'etracker Do-Not-Track';
                $field->description = 'Respect Do Not Track';
            })
        );
    }
    public function getCategory()
	{
		return self::CATEGORY_ANALYTICS;
	}
}
