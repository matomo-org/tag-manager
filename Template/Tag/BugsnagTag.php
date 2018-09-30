<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Template\Tag;

use Piwik\Settings\FieldConfig;
use Piwik\Plugins\TagManager\Template\Tag\BaseTag;
use Piwik\Validators\NotEmpty;

class BugsnagTag extends BaseTag
{
    const ID = 'Bugsnag';

    public function getId()
    {
        return self::ID;
    }
    
    public function getIcon()
    {
        return 'plugins/TagManager/images/icons/bugsnag.png';
    }

    public function getParameters()
    {
        return array(
            $this->makeSetting('apiKey', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'API key';
                $field->uiControl = FieldConfig::UI_CONTROL_TEXT;
                $field->description = "You can find your API key in your project settings from your Bugsnag dashboard.";
                $field->validators[] = new NotEmpty();
            }),
            $this->makeSetting('collectUserIp', false, FieldConfig::TYPE_BOOL, function (FieldConfig $field) {
                $field->title = 'collect user IP';
                $field->uiControl = FieldConfig::UI_CONTROL_CHECKBOX;
                $field->description = "This should be disable if you don't want to track personal information about your users.";
            }),
        );
    }

    public function getCategory()
    {
        return self::CATEGORY_DEVELOPERS;
    }

}
