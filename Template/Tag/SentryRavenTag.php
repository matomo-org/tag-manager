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
        return "Sentry.io Raven.js";
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
