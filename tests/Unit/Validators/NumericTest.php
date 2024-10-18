<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Unit\Validators;

use Piwik\Plugins\TagManager\tests\Framework\TestCase\UnitTestCase;
use Piwik\Plugins\TagManager\Validators\Numeric;
use Piwik\Validators\Exception;

/**
 * @group TagManager
 * @group NumericValidator
 * @group NumericValidator
 * @group Plugins
 */
class NumericTest extends UnitTestCase
{
    public function test_notAString()
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage('The value is not a number.');

        $this->validateNumeric(false);
    }

    public function test_notNumeric()
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage('The value is not a number.');

        $this->validateNumeric('test');
    }

    public function test_mostlyNumeric()
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage('The value is not a number.');

        $this->validateNumeric('2,430.00');
    }

    public function test_numeric()
    {
        self::expectNotToPerformAssertions();

        $this->validateNumeric('2430.00');
    }

    public function test_emptyOptional()
    {
        self::expectNotToPerformAssertions();

        $this->validateNumeric('', true);
    }

    public function test_emptyNotOptional()
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage('The value is not a number.');

        $this->validateNumeric('');
    }

    public function test_notNumericAllowVariables()
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage('The value is not a number or variable.');

        $this->validateNumeric('test', true, true);
    }

    public function test_variableNotAllowed()
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage('The value is not a number.');

        $this->validateNumeric('{{someVariable}}');
    }

    public function test_variableAllowed()
    {
        self::expectNotToPerformAssertions();

        $this->validateNumeric('{{someVariable}}', true, true);
    }

    private function validateNumeric($value, $isOptional = null, $isVariableAllowed = null)
    {
        $validator = new Numeric($isOptional, $isVariableAllowed);
        $validator->validate($value);
    }
}
