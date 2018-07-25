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

class SentryRavenTag extends BaseTag
{
    const ID = 'SentryRaven';

    public function getId()
    {
        return self::ID;
    }

    public function getName()
    {
        // By default, the name will be automatically fetched from the TagManager_SentryRavenTagName translation key.
        // you can either adjust/create/remove this translation key, or return a different value here directly.
        return "Sentry.io Raven.js";
    }

    public function getDescription()
    {
        // By default, the description will be automatically fetched from the TagManager_SentryRavenTagDescription
        // translation key. you can either adjust/create/remove this translation key, or return a different value
        // here directly.
        return parent::getDescription();
    }

    public function getHelp()
    {
        // By default, the help will be automatically fetched from the TagManager_SentryRavenTagHelp translation key.
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
        return 'plugins/TagManager/images/icons/sentry.svg';
    }

    public function getParameters()
    {
        return array(
            $this->makeSetting('sentryDSN', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Sentry.io DSN';
                $field->uiControl = FieldConfig::UI_CONTROL_TEXT;
                $field->description = "The DSN (Data Source Name) of your sentry.io project. It should look like 'https://<key>@sentry.io/<project>'";
                $field->validators[] = new NotEmpty();
            }),
        );
    }

    public function getCategory()
    {
        return self::CATEGORY_DEVELOPERS;
    }

}
