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
            }),
            $this->makeSetting('shareaholicInPageApp', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Shareaholic In-Page App';
                $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
                $field->availableValues = array(
                    '' => 'None',
                    'share_buttons' => 'Share Buttons',
                    'follow_buttons' => 'Follow Buttons',
                    'recommendations' => 'Related Content',
                    'total_share_count'=> 'Total Share Counter' //TODO: Also supports data-link and data-services
                );

                $field->description = 'Here you can optionally add an In-Page App to your website.';
            }),

            $this->makeSetting('shareaholicAppId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'In-Page App ID';
                $field->description = 'If you want to add an In-Page App enter the App ID here. It is about eight digits long. The App ID is not required for the Total Share Counter.';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
            }),
            $this->makeSetting('shareaholicParentSelector', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'In-Page App Parent Selector';
                $field->description = 'Enter a CSS selector to the element where the In-Page App should be added.';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
            })
        );
    }
}
