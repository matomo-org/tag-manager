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

class BingUETTag extends BaseTag
{
    public function getIcon()
    {
        return 'plugins/TagManager/images/icons/bing.svg';
    }

    public function getParameters()
    {
        return array(
            $this->makeSetting('bingAdID', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'ID';
                $field->uiControl = FieldConfig::UI_CONTROL_TEXT;
                $field->description = '';
                $field->validators[] = new NotEmpty();
                $field->validators[] = new NumberRange();
            }),
        );
    }

    public function getCategory()
    {
        return self::CATEGORY_ADS;
    }

}
