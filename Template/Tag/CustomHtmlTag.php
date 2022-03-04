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

class CustomHtmlTag extends BaseTag
{
    const ID = 'CustomHtml';

    public function getId()
    {
        return self::ID;
    }

    public function getIcon()
    {
        return 'plugins/TagManager/images/icons/code.svg';
    }

    public function isCustomTemplate()
    {
        return true;
    }

    public function getParameters()
    {
        return array(
            $this->makeSetting('customHtml', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Custom HTML';
                $field->customFieldComponent = self::FIELD_TEXTAREA_VARIABLE_COMPONENT;
                $field->uiControl = FieldConfig::UI_CONTROL_TEXTAREA;
                $field->description = 'This tag is ideal when you need to add for example custom styles or custom JavaScript or when you are looking for a specific tag which is not yet supported. With this tag you can append any HTML to the bottom of your page, add styles, or execute JavaScript. Note: You can replace content within the HTML with variables by putting a variable name in curly brackets like this {{PageUrl}}.';
                $field->inlineHelp = '<a href="https://matomo.org/faq/tag-manager/faq_26815/">Learn more</a>';
                $field->validators[] = new NotEmpty();
            }),
            $this->makeSetting('htmlPosition', 'bodyEnd', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Position';
                $field->availableValues = array(
                    'headStart' => 'Head Start',
                    'headEnd' => 'Head End',
                    'bodyStart' => 'Body Start',
                    'bodyEnd' => 'Body End',
                );
                $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
                $field->description = 'Define the position of where the HTML should be inserted into your website.';
            }),
        );
    }

    public function getCategory()
    {
        return self::CATEGORY_CUSTOM;
    }

}
