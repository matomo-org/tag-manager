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

class JavaScriptVariable extends BaseVariable
{
    public function getCategory()
    {
        return self::CATEGORY_PAGE_VARIABLES;
    }

    public function getParameters()
    {
        return array(
            $this->makeSetting('variableName', '', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'JavaScript Variable Name';
                $field->description = 'The name of any variable that is available within the global scope. In case you want to access the value of a nested object, you can access the value of an object by separating each property by a dot, for example "document.referrer".';
                $field->validators[] = new NotEmpty();
                $field->validators[] = new CharacterLength(1, 500);
            }),
        );
    }

}
