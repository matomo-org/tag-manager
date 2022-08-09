<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\Validators;

use Piwik\Container\StaticContainer;
use Piwik\Piwik;
use Piwik\Validators\BaseValidator;
use Piwik\Validators\Exception;

class Numeric extends BaseValidator
{
    private $isOptional;

    /**
     * @param bool $isOptional Indicates whether the field is optional or not. The default is false.
     */
    public function __construct($isOptional = false)
    {
        $this->isOptional = $isOptional;
    }

    public function validate($value)
    {
        // Check if the value is numeric. If the value is optional, allow an empty value.
        if (!is_numeric($value) && !(empty($value) && $this->isOptional)) {
            throw new Exception(Piwik::translate('General_ValidatorErrorNotANumber'));
        }
    }

}