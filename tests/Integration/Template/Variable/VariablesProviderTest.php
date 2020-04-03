<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration\Template\Variable;

use Piwik\Config;
use Piwik\Container\StaticContainer;
use Piwik\Plugins\TagManager\Configuration;
use Piwik\Plugins\TagManager\SystemSettings;
use Piwik\Plugins\TagManager\Template\Variable\CustomJsFunctionVariable;
use Piwik\Plugins\TagManager\Template\Variable\DataLayerVariable;
use Piwik\Plugins\TagManager\Template\Variable\PreConfigured\ContainerIdVariable;
use Piwik\Plugins\TagManager\Template\Variable\VariablesProvider;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;

/**
 * @group TagManager
 * @group VariablesProviderTest
 * @group VariablesProvider
 * @group Plugins
 */
class VariablesProviderTest extends IntegrationTestCase
{
    /**
     * @var VariablesProvider
     */
    private $provider;

    public function setUp(): void
    {
        parent::setUp();

        $this->provider = StaticContainer::get(VariablesProvider::class);
    }

    public function test_getAllVariables()
    {
        $variables = $this->provider->getAllVariables();
        self::assertIsArray($variables);
        $this->assertGreaterThanOrEqual(6, count($variables));
    }

    public function test_getPreConfiguredVariables()
    {
        $variables = $this->provider->getPreConfiguredVariables();
        self::assertIsArray($variables);
        $this->assertGreaterThanOrEqual(6, count($variables));
    }

    public function test_getPreConfiguredVariables_isSubsetOfAllVariables()
    {
        $variables = $this->provider->getAllVariables();
        $preconfigured = $this->provider->getPreConfiguredVariables();
        $this->assertTrue(count($variables) > count($preconfigured));

        foreach ($preconfigured as $pre) {
            $this->assertTrue(in_array($pre, $variables, true));
        }
    }

    public function test_getPreConfiguredVariable_findsVariableById()
    {
        $variable = $this->provider->getPreConfiguredVariable('ContainerId');
        $this->assertTrue($variable instanceof ContainerIdVariable);
        $this->assertSame('ContainerId', $variable->getId());
    }

    public function test_getPreConfiguredVariable_searchesCaseSensitive()
    {
        $this->assertNotEmpty($this->provider->getPreConfiguredVariable('ContainerId'));
        $this->assertNull($this->provider->getPreConfiguredVariable('containerId'));
        $this->assertNull($this->provider->getPreConfiguredVariable('Containerid'));
        $this->assertNull($this->provider->getPreConfiguredVariable('contaInerId'));
    }

    public function test_getPreConfiguredVariable_notExistingVariable()
    {
        $this->assertNull($this->provider->getPreConfiguredVariable('foobarbaz'));
    }

    public function test_getVariable_findsVariableById()
    {
        $variable = $this->provider->getVariable('DataLayer');
        $this->assertTrue($variable instanceof DataLayerVariable);
        $this->assertSame('DataLayer', $variable->getId());
    }

    public function test_getVariable_searchesCaseSensitive()
    {
        $this->assertNotEmpty($this->provider->getVariable('DataLayer'));
        $this->assertNull($this->provider->getVariable('datalayer'));
        $this->assertNull($this->provider->getVariable('Datalayer'));
        $this->assertNull($this->provider->getVariable('daTaLayEr'));
    }

    public function test_getVariable_notExistingVariable()
    {
        $this->assertNull($this->provider->getVariable('foobarbaz'));
    }

    public function test_getVariableIgnoreCase_findsVariableById()
    {
        $variable = $this->provider->getVariableIgnoreCase('DataLayer');
        $this->assertTrue($variable instanceof DataLayerVariable);
        $this->assertSame('DataLayer', $variable->getId());
    }

    public function test_getVariableIgnoreCase_searchesCaseInsensitive()
    {
        $this->assertNotEmpty($this->provider->getVariableIgnoreCase('DataLayer'));
        $this->assertNotEmpty($this->provider->getVariableIgnoreCase('datalayer'));
        $this->assertNotEmpty($this->provider->getVariableIgnoreCase('Datalayer'));
        $this->assertNotEmpty($this->provider->getVariableIgnoreCase('daTaLayEr'));
    }

    public function test_getVariableIgnoreCase_notExistingVariable()
    {
        $this->assertNull($this->provider->getVariableIgnoreCase('foobarbaz'));
    }

    public function test_checkIsValidVariable_noExceptionWhenVariableExists()
    {
        $this->provider->checkIsValidVariable('DataLayer');
        $this->assertTrue(true);
    }

    public function test_checkIsValidVariable_searchesCaseSensitive()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The variable "datalayer" is not supported');

        $this->provider->checkIsValidVariable('datalayer');
    }

    public function test_checkIsValidVariable_notExistingVariable()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The variable "foobarbaz" is not supported');

        $this->provider->checkIsValidVariable('foobarbaz');
    }

    public function test_blocksConfiguredVariables()
    {
        Config::getInstance()->TagManager = array(Configuration::KEY_DISABLED_VARIABLES => array('datALayEr'));
        $variables = $this->provider->getAllVariables();
        foreach ($variables as $variable) {
            $this->assertNotEquals('DataLayer', $variable->getId());
        }
        $this->assertNull($this->provider->getVariable('DataLayer'));
        $this->assertNull($this->provider->getVariableIgnoreCase('DataLayer'));
    }

    public function test_getAllWorksWhenCustomTemplatesDisabled()
    {
        $settings = StaticContainer::get(SystemSettings::class);
        $settings->restrictCustomTemplates->setValue(SystemSettings::CUSTOM_TEMPLATES_DISABLED);
        /** @var VariablesProvider $provider */
        $provider = StaticContainer::getContainer()->make(VariablesProvider::class, array(
            'systemSettings' => $settings
        ));
        $variables = $provider->getAllVariables();
        $this->assertNotEmpty($variables);
    }

    public function test_isCustomTemplate()
    {
        $this->assertFalse($this->provider->isCustomTemplate(null));
        $this->assertFalse($this->provider->isCustomTemplate(false));
        $this->assertFalse($this->provider->isCustomTemplate('foo'));
        $this->assertTrue($this->provider->isCustomTemplate(CustomJsFunctionVariable::ID));
    }

}
