<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Template\Trigger;

use Piwik\Settings\FieldConfig;

class WindowLeaveTrigger extends BaseTrigger
{
    public function getCategory()
    {
        return self::CATEGORY_USER_ENGAGEMENT;
    }

    public function getParameters()
    {
        return array(
            $this->makeSetting('triggerLimit', 1, FieldConfig::TYPE_INT, function (FieldConfig $field) {
                $field->title = 'Trigger limit';
                $field->description = 'Enter "0" to not limit how often the trigger should be triggered';
            }),
        );
    }

}
