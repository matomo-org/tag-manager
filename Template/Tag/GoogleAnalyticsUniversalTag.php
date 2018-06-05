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

class GoogleAnalyticsUniversalTag extends BaseTag
{

    public function getCategory()
    {
        return self::CATEGORY_ANALYTICS;
    }

    public function getParameters()
    {
        return array(
            $this->makeSetting('propertyId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Property ID';
                $field->description = 'For example "UA-XXXXX-Y"';
                $field->validators[] = new NotEmpty();
                $field->validate = function ($value) {
                    if (!preg_match('/^ua-\d{4,9}-\d{1,4}$/i', strval($value))) {
                        throw new \Exception('The Property ID seems to not have a valid format');
                    }
                };
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
