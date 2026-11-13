<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\Settings;

/**
 * Normalizes the value of a multi tuple field to a list of rows that only contain the keys declared by the field
 * (field1 / field2) with scalar values.
 *
 * Anything else is dropped rather than rejected, so entities that already hold such a value can still be copied,
 * versioned and published.
 */
class MultiTupleValue
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

    /**
     * @param mixed $value
     * @return mixed
     */
    public function normalize($value)
    {
        if (!is_array($value)) {
            // the type of the value itself is validated by the field
            return $value;
        }

        $rows = [];
        foreach ($value as $row) {
            if (!is_array($row)) {
                continue;
            }

            $normalizedRow = [];
            foreach ($row as $key => $rowValue) {
                if (
                    in_array((string) $key, $this->allowedKeys, true)
                    && (is_null($rowValue) || is_scalar($rowValue))
                ) {
                    $normalizedRow[$key] = $rowValue;
                }
            }

            if (!empty($normalizedRow)) {
                $rows[] = $normalizedRow;
            }
        }

        return $rows;
    }
}
