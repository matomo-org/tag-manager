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
use Piwik\Validators\NumberRange;

class LinkedinInsightTag extends BaseTag
{
    public function getIcon()
    {
        return 'plugins/TagManager/images/icons/linkedin.svg';
    }

    public function getParameters()
    {
        return array(
            $this->makeSetting('partnerId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'LinkedIn Partner ID';
                $field->uiControl = FieldConfig::UI_CONTROL_TEXT;
                $field->description = 'You can find the partner ID by logging into your LinkedIn Campaign Manager, and clicking on "Account Assets" followed by "Insight Tag". If "Insight Tag" is not available, please set up the Insight Tag by clicking on "Conversion Tracking". There you can enter a domain and continue the set up. You will find the partner ID in the line `_linkedin_partner_id = "123456"`. In this example the ID would be "123456".';
                $field->validators[] = new NotEmpty();
                $field->validate = function ($value) {
                    $value = trim($value);
                    $numberRange =  new NumberRange();
                    $numberRange->validate($value);
                };
                $field->transform = function ($value) {
                    return trim($value);
                };
            }),
        );
    }

    public function getCategory()
    {
        return self::CATEGORY_SOCIAL;
    }

}
