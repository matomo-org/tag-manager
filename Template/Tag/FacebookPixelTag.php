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
use Piwik\Validators\NumberRange;

class FacebookPixelTag extends BaseTag
{

    const ID = 'FacebookPixel';

    public function getId()
    {
        return self::ID;
    }

    public function getName()
    {
        return 'Facebook Pixel';
    }

    public function getDescription()
    {
        return 'The Facebook Pixel is a web analytics and advertising service offered by Facebook.';
    }

    public function getHelp()
    {
        return 'This tag lets you track website pageviews in your Facebook Ads account. To obtain the Pixel ID please log in to your Facebook Ads account.';
    }

    public function getIcon()
    {
        return 'plugins/TagManager/images/icons/F_icon.svg';
    }

    public function getParameters()
    {
        return array(
            $this->makeSetting('pixelId', '', FieldConfig::TYPE_INT, function (FieldConfig $field) {
                $field->title = 'Pixel ID';
                $field->validators[] = new NumberRange();
            }),
            $this->makeSetting('trackingType', 'pageview', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Tracking Type';
                $field->description = 'Only the tracking type "Pageview" is currently supported.';
                $field->uiControl = FieldConfig::UI_CONTROL_SINGLE_SELECT;
                $field->validators[] = new NotEmpty();
                $field->availableValues = array(
                    'pageview' => 'Pageview',
                );
            }),
        );
    }

    public function getCategory()
    {
        return self::CATEGORY_SOCIAL;
    }

}