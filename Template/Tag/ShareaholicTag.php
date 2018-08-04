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

class ShareaholicTag extends BaseTag
{
    public function getDescription()
    {
        return parent::getDescription();
    }

    public function getHelp()
    {
        return parent::getHelp();
    }

    public function getCategory()
    {
        return self::CATEGORY_SOCIAL;
    }

    public function getIcon()
    {
        return 'plugins/TagManager/images/icons/shareaholic.svg';
    }

    public function getParameters()
    {
        return array(
            $this->makeSetting('shareaholicSiteId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Shareaholic Site ID';
                $field->description = 'Create a new site in Shareaholic and paste the site ID here';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->validators[] = new NotEmpty();
            })
        );
    }

}
