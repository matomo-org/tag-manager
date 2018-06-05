<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Template\Variable;

use Piwik\Settings\FieldConfig;
use Piwik\Validators\CharacterLength;
use Piwik\Validators\NotEmpty;

class CookieVariable extends BaseVariable
{
    public function getCategory()
    {
        return self::CATEGORY_PAGE_VARIABLES;
    }

    public function getParameters()
    {
        return array(
            $this->makeSetting('cookieName', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'Cookie Name';
                $field->validators[] = new NotEmpty();
                $field->validators[] = new CharacterLength(1, 500);
            }),
            $this->makeSetting('urlDecode', false, FieldConfig::TYPE_BOOL, function (FieldConfig $field) {
                $field->title = 'URI-decode Cookie';
                $field->inlineHelp = 'If enabled, the value will be decoded';
            }),

        );
    }

}
