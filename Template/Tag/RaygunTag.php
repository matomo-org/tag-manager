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

class RaygunTag extends BaseTag
{
    public function getIcon() {
        return 'plugins/TagManager/images/icons/raygun.svg';
    }

    public function getParameters() {
        return array(
            $this->makeSetting('raygunApiKey', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Raygun apiKey';
                $field->uiControl = FieldConfig::UI_CONTROL_TEXT;
                $field->description = "The DSN (Data Source Name) of your sentry.io project. It should look like 'https://<key>@sentry.io/<project>'";
                $field->validators[] = new NotEmpty();
            }),
            $this->makeSetting('raygunEnablePulse', false, FieldConfig::TYPE_BOOL, function (FieldConfig $field) {
                $field->title = 'Enable Pulse (Real User Monitoring)';
                $field->uiControl = FieldConfig::UI_CONTROL_CHECKBOX;
                $field->description = "Automatically identify front end performance issues causing slow page load speeds. See what your users see in the browser and discover why users had poor quality experiences.";
            })
        );
    }

    public function getCategory() {
        return self::CATEGORY_DEVELOPERS;
    }
}
