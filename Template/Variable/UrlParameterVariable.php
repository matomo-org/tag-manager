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

class UrlParameterVariable extends BaseVariable
{
    public function getCategory()
    {
        return self::CATEGORY_PAGE_VARIABLES;
    }

    public function getParameters()
    {
        return array(
            $this->makeSetting('parameterName', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'URL Parameter Name';
                $field->description = 'For example when your page has URL parameters such as "?lang=NZ" and you want to get the value "NZ", then you need to enter "lang".';
                $field->validators[] = new CharacterLength(1, 300);
                $field->transform = function ($value) {
                    return trim($value);
                };
            }),

        );
    }

}
