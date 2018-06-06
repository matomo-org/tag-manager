<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Unit\Model;

use Piwik\Plugins\TagManager\Model\Comparison;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\UnitTestCase;

/**
 * @group TagManager
 * @group ComparisonsTest
 * @group Comparisons
 * @group Plugins
 */
class ComparisonsTest extends UnitTestCase
{
    /**
     * @var Comparison
     */
    private $comparison;

    public function setUp()
    {
        parent::setUp();
        $this->comparison = new Comparison();
    }

    public function test_checkIsValidComparison_valid()
    {
        $this->checkIsValidComparison('equals');
        $this->checkIsValidComparison('not_equals');
        $this->checkIsValidComparison('starts_with');
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The comparison "Equals" is not supported
     */
    public function test_checkIsValidComparison_hasToMatchExact()
    {
        $this->checkIsValidComparison('Equals');
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The comparison "foobar" is not supported
     */
    public function test_checkIsValidComparison_doesNotExist()
    {
        $this->checkIsValidComparison('foobar');
    }

    public function test_getSupportedComparisons()
    {
        $comparisons = $this->comparison->getSupportedComparisons();
        $this->assertInternalType('array', $comparisons);
        $this->assertGreaterThanOrEqual(10, count($comparisons));

        // we don't test for exact match here as we test this through the API in a system test
        foreach ($comparisons as $comparison) {
            $this->assertNotEmpty($comparison['id']);
            $this->assertNotEmpty($comparison['name']);
        }
    }

    private function checkIsValidComparison($value)
    {
        $this->comparison->checkIsValidComparison($value);
    }


}
