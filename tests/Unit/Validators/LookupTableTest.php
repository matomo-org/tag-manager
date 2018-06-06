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
    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage "Lookup Table" has to be an array.
     */
    public function test_valid_notAnArray()
    {
        $this->validateLookupTable(false);
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Each "Entry" within "Lookup Table" has to be an array.
     */
    public function test_valid_notAnArrayWithinArray()
    {
        $this->validateLookupTable(array('test'));
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Missing value for array key "match_value" in "Lookup Table" at position "0".
     */
    public function test_valid_missingKeysInArray()
    {
        $this->validateLookupTable(array(array()));
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Missing value for array key "comparison" in "Lookup Table" at position "0".
     */
    public function test_valid_missingComparisonKeyInArray()
    {
        $this->validateLookupTable(array(array('match_value' => 'Foo')));
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Missing value for array key "out_value" in "Lookup Table" at position "0".
     */
    public function test_valid_missingOutvalueKeyInArray()
    {
        $this->validateLookupTable(array(array('match_value' => 'Foo', 'comparison' => 'equals')));
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage The comparison "foobarbaz" is not supported
     */
    public function test_valid_invalidComparisonKeyInArray()
    {
        $this->validateLookupTable(array(array('match_value' => 'Foo', 'comparison' => 'foobarbaz', 'out_value' => 'bar')));
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Missing value for array key "comparison" in "Lookup Table" at position "1".
     */
    public function test_invalidSecondEntry()
    {
        $this->validateLookupTable(array(
            array('match_value' => 'bar', 'comparison' => 'starts_with', 'out_value' => 'baz'),
            array('match_value' => 'baz'),
        ));
    }

    public function test_valid()
    {
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
        $this->validateLookupTable(array());
    }

    private function validateLookupTable($value)
    {
        $validator = new LookupTable();
        $validator->validate($value);
    }


}
