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

class FacebookPixelTag extends BaseTag
{

    Public function getName()
    {
        return 'Facebook Pixel';
    }

    public function getDescription()
    {
        return 'The Facebook Pixel is a web analytics and avertising service offered by Facebook.';
    }

    public function getHelp()
    {
        return 'This tag lets you track website pageviews in your Facebook Ads account. To obtain the  Pixel ID please log in to your Facebook Ads account.';
    }

    public function getCategory()
    {
        return self::CATEGORY_ANALYTICS;
    }

    public function getIcon()
    {
        return 'plugins/TagManager/images/icons/F_icon.svg';
    }

    public function getParameters()
    {
        return array(
            $this->makeSetting('pixelId',, FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Pixel ID';
                $field->description = 'Long numerical number for Facebook Pixel Code"';
                $field->validators[] = new NumberRange($min = 0);
            }),
            $this->makeSetting('trackingType', 'pageview', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Tracking Type';
                $field->description = 'Only the tracking type "Pageview" is currently supported.';
                $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
                $field->validators[] = new NotEmpty();
                $field->availableValues = array(
                    'pageview' => 'Pageview',
                );
            })
    );
    }

}
