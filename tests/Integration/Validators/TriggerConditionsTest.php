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

    public function setUp(): void
    {
        parent::setUp();

        $this->idSite = Fixture::createWebsite('2014-03-04 05:06:07');

        $this->variable = StaticContainer::get('Piwik\Plugins\TagManager\Model\Variable');
        $this->variablesProvider = StaticContainer::get('Piwik\Plugins\TagManager\Template\Variable\VariablesProvider');

        $idVariable1 = $this->variable->addContainerVariable($this->idSite, 5, ReferrerUrlVariable::ID, 'MyVar1', array(), false, array());
        $idVariable2 = $this->variable->addContainerVariable($this->idSite, 6, ReferrerUrlVariable::ID, 'MyVar2', array(), false, array());
        $idVariable3 = $this->variable->addContainerVariable($this->idSite, 5, ReferrerUrlVariable::ID, 'MyVar3', array(), false, array());
    }

    public function test_validate_notAnArray()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('"Conditions" has to be an array.');

        $this->validateTriggerIds($this->idSite, $containerVersion = 5, 'foo');
    }

    public function test_validate_innerIsnotAnArray()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Each "Condition" within "Conditions" has to be an array');

        $this->validateTriggerIds($this->idSite, $containerVersion = 5, ['foo']);
    }

    public function test_validate_missingKeys()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Missing value for array key "actual" in "Conditions" at position "0".');

        $this->validateTriggerIds($this->idSite, $containerVersion = 5, [[]]);
    }

    public function test_validate_missingKeyComparison()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Missing value for array key "comparison" in "Conditions" at position "0"');

        $this->validateTriggerIds($this->idSite, $containerVersion = 5, [['actual' => 'myVar1']]);
    }

    public function test_validate_missingKeyExpected()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Missing value for array key "expected" in "Conditions" at position "0"');

        $this->validateTriggerIds($this->idSite, $containerVersion = 5, [['actual' => 'myVar1', 'comparison' => 'equals']]);
    }

    public function test_validate_invalidComparison()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('The comparison "foobar" is not supported');

        $this->validateTriggerIds($this->idSite, $containerVersion = 5, [['actual' => 'myVar1', 'comparison' => 'foobar', 'expected' => 'foo']]);
    }

    public function test_validate_invalidVariable()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('The variable "foobarbaz" in the condition at position "0" cannot be found');

        $this->validateTriggerIds($this->idSite, $containerVersion = 5, [['actual' => 'foobarbaz', 'comparison' => 'equals', 'expected' => 'foo']]);
    }

    public function test_validate_missingComparisonAtIndex1()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Missing value for array key "comparison" in "Conditions" at position "1".');

        $this->validateTriggerIds($this->idSite, $containerVersion = 5, [
            ['actual' => 'myVar1', 'comparison' => 'equals', 'expected' => 'foo'],
            ['actual' => 'myVar1', 'expected' => 'foo'],
        ]);
    }

    public function test_valid_preconfiguredVariable()
    {
        self::expectNotToPerformAssertions();

        $this->validateTriggerIds($this->idSite, $containerVersion = 5, array(
            ['actual' => ErrorUrlVariable::ID, 'comparison' => 'equals', 'expected' => 'foo'],
        ));
    }

    public function test_valid_customVariable()
    {
        self::expectNotToPerformAssertions();

        $this->validateTriggerIds($this->idSite, $containerVersion = 5, array(
            ['actual' => 'myVar1', 'comparison' => 'equals', 'expected' => 'foo'],
        ));
    }

    public function test_valid_mixed()
    {
        self::expectNotToPerformAssertions();

        $this->validateTriggerIds($this->idSite, $containerVersion = 5, array(
            ['actual' => 'myVar1', 'comparison' => 'equals', 'expected' => 'foo'],
            ['actual' => ErrorUrlVariable::ID, 'comparison' => 'equals', 'expected' => 'foobar'],
        ));
    }

    public function test_valid_empty()
    {
        self::expectNotToPerformAssertions();

        $this->validateTriggerIds($this->idSite, $containerVersion = 5, array());
    }

    private function validateTriggerIds($idSite, $idContainerVersion, $value)
    {
        $validator = new TriggerConditions($idSite, $idContainerVersion);
        $validator->validate($value);
    }
}
