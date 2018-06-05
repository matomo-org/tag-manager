<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration\Validators;

use Piwik\Container\StaticContainer;
use Piwik\Plugins\TagManager\Model\Variable;
use Piwik\Plugins\TagManager\Template\Variable\PreConfigured\ErrorUrlVariable;
use Piwik\Plugins\TagManager\Template\Variable\ReferrerUrlVariable;
use Piwik\Plugins\TagManager\Template\Variable\VariablesProvider;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;
use Piwik\Plugins\TagManager\Validators\TriggerConditions;
use Piwik\Tests\Framework\Fixture;

/**
 * @group TagManager
 * @group TriggerConditionsTest
 * @group TriggerConditions
 * @group Plugins
 */
class TriggerConditionsTest extends IntegrationTestCase
{
    /**
     * @var int
     */
    private $idSite;

    /**
     * @var VariablesProvider
     */
    private $variablesProvider;

    /**
     * @var Variable
     */
    private $variable;

    public function setUp()
    {
        parent::setUp();

        $this->idSite = Fixture::createWebsite('2014-03-04 05:06:07');

        $this->variable = StaticContainer::get('Piwik\Plugins\TagManager\Model\Variable');
        $this->variablesProvider = StaticContainer::get('Piwik\Plugins\TagManager\Template\Variable\VariablesProvider');

        $idVariable1 = $this->variable->addContainerVariable($this->idSite, 5, ReferrerUrlVariable::ID, 'MyVar1', array(), false, array());
        $idVariable2 = $this->variable->addContainerVariable($this->idSite, 6, ReferrerUrlVariable::ID, 'MyVar2', array(), false, array());
        $idVariable3 = $this->variable->addContainerVariable($this->idSite, 5, ReferrerUrlVariable::ID, 'MyVar3', array(), false, array());
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage "Conditions" has to be an array.
     */
    public function test_validate_notAnArray()
    {
        $this->validateTriggerIds($this->idSite, $containerVersion = 5, 'foo');
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Each "Condition" within "Conditions" has to be an array
     */
    public function test_validate_innerIsnotAnArray()
    {
        $this->validateTriggerIds($this->idSite, $containerVersion = 5, ['foo']);
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Missing value for array key "actual" in "Conditions" at position "0".
     */
    public function test_validate_missingKeys()
    {
        $this->validateTriggerIds($this->idSite, $containerVersion = 5, [[]]);
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Missing value for array key "comparison" in "Conditions" at position "0"
     */
    public function test_validate_missingKeyComparison()
    {
        $this->validateTriggerIds($this->idSite, $containerVersion = 5, [['actual' => 'myVar1']]);
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Missing value for array key "expected" in "Conditions" at position "0"
     */
    public function test_validate_missingKeyExpected()
    {
        $this->validateTriggerIds($this->idSite, $containerVersion = 5, [['actual' => 'myVar1', 'comparison' => 'equals']]);
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage The comparison "foobar" is not supported
     */
    public function test_validate_invalidComparison()
    {
        $this->validateTriggerIds($this->idSite, $containerVersion = 5, [['actual' => 'myVar1', 'comparison' => 'foobar', 'expected' => 'foo']]);
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage The variable "foobarbaz" in the condition at position "0" cannot be found
     */
    public function test_validate_invalidVariable()
    {
        $this->validateTriggerIds($this->idSite, $containerVersion = 5, [['actual' => 'foobarbaz', 'comparison' => 'equals', 'expected' => 'foo']]);
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Missing value for array key "comparison" in "Conditions" at position "1".
     */
    public function test_validate_missingComparisonAtIndex1()
    {
        $this->validateTriggerIds($this->idSite, $containerVersion = 5, [
            ['actual' => 'myVar1', 'comparison' => 'equals', 'expected' => 'foo'],
            ['actual' => 'myVar1', 'expected' => 'foo'],
        ]);
    }

    public function test_valid_preconfiguredVariable()
    {
        $this->validateTriggerIds($this->idSite, $containerVersion = 5, array(
            ['actual' => ErrorUrlVariable::ID, 'comparison' => 'equals', 'expected' => 'foo'],
        ));
    }

    public function test_valid_customVariable()
    {
        $this->validateTriggerIds($this->idSite, $containerVersion = 5, array(
            ['actual' => 'myVar1', 'comparison' => 'equals', 'expected' => 'foo'],
        ));
    }

    public function test_valid_mixed()
    {
        $this->validateTriggerIds($this->idSite, $containerVersion = 5, array(
            ['actual' => 'myVar1', 'comparison' => 'equals', 'expected' => 'foo'],
            ['actual' => ErrorUrlVariable::ID, 'comparison' => 'equals', 'expected' => 'foobar'],
        ));
    }

    public function test_valid_empty()
    {
        $this->validateTriggerIds($this->idSite, $containerVersion = 5, array());
    }

    private function validateTriggerIds($idSite, $idContainerVersion, $value)
    {
        $validator = new TriggerConditions($idSite, $idContainerVersion);
        $validator->validate($value);
    }


}
