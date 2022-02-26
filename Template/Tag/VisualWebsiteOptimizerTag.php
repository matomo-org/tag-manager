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

class VisualWebsiteOptimizerTag extends BaseTag
{
    const ID = 'VisualWebsiteOptimizer';
    
    public function getId()
    {
        return self::ID;
    }

    public function getCategory()
    {
        return self::CATEGORY_ANALYTICS;
    }

    public function getIcon()
    {
        return 'plugins/TagManager/images/icons/visualwebsitepptimizer.svg';
    }

    public function getParameters()
    {
        return array(
            $this->makeSetting('accountId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Visual Website Optimizer Account ID';
                $field->uiControl = FieldConfig::UI_CONTROL_TEXT;
                $field->description = 'Your Visual Website Optimizer Account ID';
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
}
