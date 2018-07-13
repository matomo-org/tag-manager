<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\Template\Variable;

use Piwik\Settings\FieldConfig;
use Piwik\Validators\NotEmpty;

class CustomJsFunctionVariable extends BaseVariable
{
    const ID = 'CustomJsFunction';

    public function getId()
    {
        return self::ID;
    }

    public function getCategory()
    {
        return self::CATEGORY_PAGE_VARIABLES;
    }

    public function isCustomTemplate()
    {
        return true;
    }

    public function getParameters()
    {
        return array(
            $this->makeSetting('jsFunction', 'function () { return ""; }', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
                $field->title = 'JavaScript Function';
                $field->description = 'The value should start with "function() { " and end with "return yourValue; }". You have to define a function and return a value. We highly recommend to test the pasted JavaScript function to avoid JavaScript errors on your website.';
                $field->uiControl = FieldConfig::UI_CONTROL_TEXTAREA;
                $field->validators[] = new NotEmpty();
                $field->validate = function ($value) {
                    $value = trim($value);
                    if (strpos($value, 'function') !== 0) {
                        throw new \Exception('The value needs to start with "function() { ... }"');
                    }
                    if (strpos($value, 'return ') === false) {
                        throw new \Exception('The function needs to return a value');
                    }
                };
            }),
        );
    }

    public function loadTemplate($context, $entity)
    {
        if (!empty($entity['parameters']['jsFunction'])) {
            $function = rtrim(trim($entity['parameters']['jsFunction']), ';');

            return '(function () { return function (parameters, TagManager) { this.get = ' . $function .'; } })();';
        }
    }

}
