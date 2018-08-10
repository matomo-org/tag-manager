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

class TawkToTag extends BaseTag
{
    public function getName() {
        return "Tawk.to";
    }

    public function getCategory() {
        return self::CATEGORY_OTHERS;
    }

    public function getIcon() {
        return 'plugins/TagManager/images/icons/tawk_to.png';
    }

    public function getParameters() {
        return array(
            $this->makeSetting('tawkToId', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'tawk.to ID';
                $field->description = 'You can get the ID by copying the widget code. It is the text between "https://embed.tawk.to/" and "/default"';
                $field->customUiControlTemplateFile = self::FIELD_TEMPLATE_VARIABLE;
                $field->validators[] = new NotEmpty();
            }),
        );
    }

}
