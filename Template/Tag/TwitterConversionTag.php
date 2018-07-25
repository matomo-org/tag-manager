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

class TwitterConversionTag extends BaseTag
{
    const ID = 'TwitterConversion';

    public function getId()
    {
        return self::ID;
    }

    public function getName()
    {
        return parent::getName();
    }

    public function getDescription()
    {
        return parent::getDescription();
    }

    public function getHelp()
    {
        return parent::getHelp();
    }

    public function getIcon()
    {
        return 'plugins/TagManager/images/icons/twitter.svg';
    }

    public function getParameters()
    {
        return array(
            $this->makeSetting('twitterConversion', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Pixel ID';
                $field->uiControl = FieldConfig::UI_CONTROL_TEXT;
                $field->description = '';
                $field->validators[] = new NotEmpty();
            }), 
        );
    }

    public function getCategory()
    {
        return self::CATEGORY_SOCIAL;
    }

}
