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
use Piwik\Validators\CharacterLength;
use Piwik\Validators\NotEmpty;
use Piwik\Validators\NumberRange;

class LivezillaDynamicTag extends BaseTag
{
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
        return 'plugins/TagManager/images/icons/livezilla_icon.png';
    }
	
	public function getCategory()
    {
        return self::CATEGORY_SOCIAL;
    }

    public function getParameters() {
        return array(
            $this->makeSetting('LivezillaDynamicID', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Livezilla ID';
                $field->description = 'Insert the Livezilla ID from your Dynamic Code section.';
                $field->validators[] = new NotEmpty();
                $field->validators[] = new CharacterLength(32);
            }),
			$this->makeSetting('LivezillaDynamicDomain', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Livezilla Domain';
                $field->description = 'Enter your Domain without http:// or https://';
                $field->validators[] = new NotEmpty();
                $field->validators[] = new CharacterLength(4, 60);
            }),
			$this->makeSetting('LivezillaDynamicDefer', 'true', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Livezilla Script "defer"?';
                $field->description = 'In most cases it should be the Standard. (true)
				Available options are: true or false'; // Howto linebreak?
				$field->validators[] = new NotEmpty();
                $field->validators[] = new CharacterLength(4, 5);
            }),
			$this->makeSetting('LivezillaDynamicCookieLawName', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'EU-Cookie Law Name';
                $field->description = 'Insert your Cookie Name. --> Please only fill it out, when you know what you doing here. If you insert wrong details here, this Tag will not work as expected. If you insert your correct Cookie settings, your website visitors will see this Tag only, when he has accepted Cookies on your Website.';
                $field->validators[] = new NotEmpty();
                $field->validators[] = new CharacterLength(2, 60);
            }),
			$this->makeSetting('LivezillaDynamicCookieLawValue', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'EU-Cookie Law Value';
                $field->description = 'Insert the Cookie Value of your Cookie Name above. --> Please only fill it out, when you know what you doing here. If you insert wrong details here, this Tag will not work as expected. If you insert your correct Cookie settings, your website visitors will see this Tag only, when he has accepted Cookies on your Website.';
                $field->validators[] = new NotEmpty();
                $field->validators[] = new CharacterLength(2, 60);
            }),
        );
    }
}