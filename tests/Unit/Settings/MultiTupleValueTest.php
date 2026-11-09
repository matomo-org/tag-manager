<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Unit\Settings;

use Piwik\Plugins\TagManager\Settings\MultiTupleValue;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\UnitTestCase;

/**
 * @group TagManager
 * @group MultiTupleValue
 * @group Plugins
 */
class MultiTupleValueTest extends UnitTestCase
{
    /**
     * @dataProvider getNormalizeTestData
     */
    public function test_normalize($value, $expected)
    {
        $multiTupleValue = new MultiTupleValue([
            'field1' => ['key' => 'name'],
            'field2' => ['key' => 'value'],
        ]);

        $this->assertSame($expected, $multiTupleValue->normalize($value));
    }

    public static function getNormalizeTestData(): iterable
    {
        yield 'empty array' => [[], []];
        yield 'not an array is left to the field' => ['foo', 'foo'];
        yield 'rows with declared keys are kept' => [
            [['name' => 'foo', 'value' => '{{PageUrl}}'], ['name' => 'bar', 'value' => 5]],
            [['name' => 'foo', 'value' => '{{PageUrl}}'], ['name' => 'bar', 'value' => 5]],
        ];
        yield 'row with only one key and null value' => [[['name' => 'foo', 'value' => null]], [['name' => 'foo', 'value' => null]]];
        yield 'rows are reindexed' => [[3 => ['name' => 'foo']], [['name' => 'foo']]];
        yield 'undeclared keys are dropped' => [
            [['name' => 'foo', 'value' => 'bar', 'type' => 'CustomJsFunction']],
            [['name' => 'foo', 'value' => 'bar']],
        ];
        yield 'non scalar values are dropped' => [
            [['name' => 'foo', 'value' => ['type' => 'CustomJsFunction']]],
            [['name' => 'foo']],
        ];
        yield 'rows that are not arrays or end up empty are dropped' => [
            ['type' => 'CustomJsFunction', 'parameters' => ['jsFunction' => 'function () {}'], ['name' => 'foo']],
            [['name' => 'foo']],
        ];
    }
}
