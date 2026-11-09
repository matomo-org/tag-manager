<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Unit\Validators;

use Piwik\Plugins\TagManager\tests\Framework\TestCase\UnitTestCase;
use Piwik\Plugins\TagManager\Validators\MultiTupleValue;
use Piwik\Validators\Exception;

/**
 * @group TagManager
 * @group MultiTupleValueValidator
 * @group Plugins
 */
class MultiTupleValueTest extends UnitTestCase
{
    /**
     * @dataProvider getValidValues
     */
    public function test_validate_acceptsValidValues($value)
    {
        self::expectNotToPerformAssertions();

        $this->makeValidator()->validate($value);
    }

    public static function getValidValues(): iterable
    {
        yield 'empty array' => [[]];
        yield 'empty string' => [''];
        yield 'not an array is left to the field' => ['foo'];
        yield 'rows with declared keys' => [[['name' => 'foo', 'value' => '{{PageUrl}}'], ['name' => 'bar', 'value' => 5]]];
        yield 'row with only one key' => [[['name' => 'foo']]];
        yield 'row with null value' => [[['name' => 'foo', 'value' => null]]];
    }

    /**
     * @dataProvider getInvalidValues
     */
    public function test_validate_rejectsInvalidValues($value)
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage('contains an unsupported key or value.');

        $this->makeValidator()->validate($value);
    }

    public static function getInvalidValues(): iterable
    {
        yield 'row is not an array' => [['type' => 'CustomJsFunction']];
        yield 'row with undeclared key' => [[['name' => 'foo', 'type' => 'CustomJsFunction']]];
        yield 'row with nested array value' => [[['name' => 'foo', 'value' => ['type' => 'CustomJsFunction']]]];
    }

    private function makeValidator(): MultiTupleValue
    {
        return new MultiTupleValue([
            'field1' => ['key' => 'name'],
            'field2' => ['key' => 'value'],
        ]);
    }
}
