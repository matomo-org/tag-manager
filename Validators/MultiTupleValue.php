<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\Validators;

use Piwik\Piwik;
use Piwik\Validators\BaseValidator;
use Piwik\Validators\Exception;

/**
 * Ensures the value of a multi tuple field is a list of rows that only contain the keys declared by the field
 * (field1 / field2) with scalar values.
 */
class MultiTupleValue extends BaseValidator
{
    /**
     * @var string[]
     */
    private $allowedKeys = [];

    /**
     * @param array<string, mixed> $uiControlAttributes
     */
    public function __construct(array $uiControlAttributes)
    {
        foreach (['field1', 'field2'] as $field) {
            if (isset($uiControlAttributes[$field]['key']) && is_string($uiControlAttributes[$field]['key'])) {
                $this->allowedKeys[] = $uiControlAttributes[$field]['key'];
            }
        }
    }

    public function validate($value)
    {
        if (empty($value) || !is_array($value)) {
            // the type of the value itself is validated by the field
            return;
        }

        foreach ($value as $index => $row) {
            if (!is_array($row)) {
                throw new Exception(Piwik::translate('TagManager_ErrorArrayInvalidEntry', [$index]));
            }

            foreach ($row as $key => $rowValue) {
                if (
                    !in_array((string) $key, $this->allowedKeys, true)
                    || (!is_null($rowValue) && !is_scalar($rowValue))
                ) {
                    throw new Exception(Piwik::translate('TagManager_ErrorArrayInvalidEntry', [$index]));
                }
            }
        }
    }
}
