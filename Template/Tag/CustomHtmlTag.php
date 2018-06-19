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

class CustomHtmlTag extends BaseTag
{
    const ID = 'CustomHtml';

    public function getId()
    {
        return self::ID;
    }

    public function getName()
    {
        // By default, the name will be automatically fetched from the TagManager_CustomHtmlTagName translation key.
        // you can either adjust/create/remove this translation key, or return a different value here directly.
        return parent::getName();
    }

    public function getDescription()
    {
        // By default, the description will be automatically fetched from the TagManager_CustomHtmlTagDescription
        // translation key. you can either adjust/create/remove this translation key, or return a different value
        // here directly.
        return parent::getDescription();
    }

    public function getHelp()
    {
        // By default, the help will be automatically fetched from the TagManager_CustomHtmlTagHelp translation key.
        // you can either adjust/create/remove this translation key, or return a different value here directly.
        return parent::getHelp();
    }

    public function getIcon()
    {
        // You may optionally specify a path to an image icon URL, for example:
        //
        // return 'plugins/TagManager/images/MyIcon.png';
        //
        // to not return default icon call:
        // return parent::getIcon();
        //
        // The image should have ideally a resolution of about 64x64 pixels.
        return 'plugins/TagManager/images/icons/code.svg';
    }

    public function getParameters()
    {
        return array(
            $this->makeSetting('customHtml', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Custom HTML';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_TEXTAREA_VARIABLE;
                $field->uiControl = FieldConfig::UI_CONTROL_TEXTAREA;
                $field->description = 'This tag is ideal when you need to add for example custom styles or custom JavaScript or when you are looking for a specific tag which is not yet supported. With this tag you can append any HTML to the bottom of your page, add styles, or execute JavaScript. Note: You can replace content within the HTML with variables by putting a variable name in curly brackets like this {{PageUrl}}.';
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
