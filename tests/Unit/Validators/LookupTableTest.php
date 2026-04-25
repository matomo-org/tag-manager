<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Unit\Validators;

use Piwik\Plugins\TagManager\tests\Framework\TestCase\UnitTestCase;
use Piwik\Plugins\TagManager\Validators\LookupTable;

/**
 * @group TagManager
 * @group LookupTableTest
 * @group LookupTable
 * @group Plugins
 */
class LookupTableTest extends UnitTestCase
{
    public function test_valid_notAnArray()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('"Lookup Table" has to be an array.');

        $this->validateLookupTable(false);
    }

    public function test_valid_notAnArrayWithinArray()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Each "Entry" within "Lookup Table" has to be an array.');

        $this->validateLookupTable(array('test'));
    }

    public function test_valid_missingKeysInArray()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Missing value for array key "match_value" in "Lookup Table" at position "0".');

        $this->validateLookupTable(array(array()));
    }

    public function test_valid_missingComparisonKeyInArray()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Missing value for array key "comparison" in "Lookup Table" at position "0".');

        $this->validateLookupTable(array(array('match_value' => 'Foo')));
    }

    public function test_valid_missingOutvalueKeyInArray()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Missing value for array key "out_value" in "Lookup Table" at position "0".');

        $this->validateLookupTable(array(array('match_value' => 'Foo', 'comparison' => 'equals')));
    }

    public function test_valid_invalidComparisonKeyInArray()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('The comparison "foobarbaz" is not supported');

        $this->validateLookupTable(array(array('match_value' => 'Foo', 'comparison' => 'foobarbaz', 'out_value' => 'bar')));
    }

    public function test_invalidSecondEntry()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Missing value for array key "comparison" in "Lookup Table" at position "1".');

        $this->validateLookupTable(array(
            array('match_value' => 'bar', 'comparison' => 'starts_with', 'out_value' => 'baz'),
            array('match_value' => 'baz'),
        ));
    }

    public function test_valid()
    {
        self::expectNotToPerformAssertions();

        $this->validateLookupTable(array(array('match_value' => 'foo', 'comparison' => 'equals', 'out_value' => 'bar')));
        $this->validateLookupTable(array(array('match_value' => '', 'comparison' => 'equals', 'out_value' => 'bar')));
        $this->validateLookupTable(array(array('match_value' => '0', 'comparison' => 'equals', 'out_value' => 'bar')));
        $this->validateLookupTable(array(array('match_value' => 0, 'comparison' => 'equals', 'out_value' => 'bar')));
        $this->validateLookupTable(array(
            array('match_value' => 'bar', 'comparison' => 'starts_with', 'out_value' => 'baz'),
            array('match_value' => 'baz', 'comparison' => 'not_equals', 'out_value' => 'bar'),
        ));
    }

    public function test_valid_empty()
    {
        self::expectNotToPerformAssertions();

        $this->validateLookupTable(array());
    }

    private function validateLookupTable($value)
    {
        $validator = new LookupTable();
        $validator->validate($value);
    }
}
