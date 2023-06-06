<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration;

use Piwik\Plugins\TagManager\Context\WebContext;
use Piwik\Plugins\TagManager\Dao\ContainersDao;
use Piwik\Plugins\TagManager\Dao\ContainerVersionsDao;
use Piwik\Plugins\TagManager\Dao\VariablesDao;
use Piwik\Plugins\TagManager\Template\Variable\CustomJsFunctionVariable;
use Piwik\Plugins\TagManager\Template\Variable\MatomoConfigurationVariable;
use Piwik\Plugins\TagManager\tests\Fixtures\TagManagerFixture;
use Piwik\Plugins\TagManager\UpdateHelper\NewVariableParameterMigrator;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * @group TagManager
 * @group NewVariableParameterMigrator
 * @group Updates
 * @group Plugins
 */
class NewVariableParameterMigratorTest extends IntegrationTestCase
{
    /**
     * @var NewVariableParameterMigrator
     */
    private $newVariableParameterMigrator;

    private $idSite;

    /**
     * @var VariablesDao
     */
    private $variableDao;

    private $dateString;

    public function setUp(): void
    {
        parent::setUp();

        $tagFixture = new TagManagerFixture();
        $tagFixture->setUpWebsite();

        $this->newVariableParameterMigrator = new NewVariableParameterMigrator(MatomoConfigurationVariable::ID, 'cookieDomain');
    }

    private function createVariable($idVersion, $type = MatomoConfigurationVariable::ID, $name = '', $parameters = [])
    {
        $name = $name ?: uniqid('variableName');
        $createdDate = $this->dateString;
        $defaultValue = '';
        $lookupTable = '';
        $description = 'Test variable description';
        if ($type === MatomoConfigurationVariable::ID) {
            $parameters['idSite'] = !empty($parameters['idSite']) ? $parameters['idSite'] : $this->idSite;
        }

        return $this->variableDao->createVariable($this->idSite, $idVersion, $type, $name, $parameters, $defaultValue, $lookupTable, $createdDate, $description);
    }

    public function test_migratingVariablesWithNewField()
    {
        $this->dateString = '2015-01-01 01:02:03';

        // Create some containers to test with.
        $containerDao = new ContainersDao();
        $this->idSite = 2;
        $idContainer = 'abcdef';
        $idDeletedContainer = 'deleted1';
        $context = WebContext::ID;
        $name = 'My Container';
        $description = 'My container description';
        $containerDao->createContainer($this->idSite, $idContainer, $context, $name, $description, $this->dateString);
        $containerDao->createContainer($this->idSite, $idDeletedContainer, $context, uniqid($name), $description, $this->dateString);
        $containerDao->deleteContainer($this->idSite, $idDeletedContainer, $this->dateString);

        // Create some versions to test with.
        $versionDao = new ContainerVersionsDao();
        $idDraftVersion = $versionDao->createDraftVersion($this->idSite, $idContainer, $this->dateString);
        $idVersion = $versionDao->createVersion($this->idSite, $idContainer, 'v1', '', $this->dateString);
        $idDeletedVersion = $versionDao->createVersion($this->idSite, $idContainer, 'vdeleted', '', $this->dateString);
        $idDeletedContainerVersion = $versionDao->createVersion($this->idSite, $idDeletedContainer, 'v1', '', $this->dateString);
        $versionDao->deleteVersion($this->idSite, $idDeletedVersion, $this->dateString);

        // Create some variables to test with.
        $this->variableDao = new VariablesDao();
        $idVariable = $this->createVariable($idVersion);
        $idCustomJsFunctionVariable = $this->createVariable($idVersion, CustomJsFunctionVariable::ID, 'CustomJsFunction Variable Name');
        $idVariableWithParameters = $this->createVariable($idVersion, MatomoConfigurationVariable::ID, 'Variable with parameters', [ 'idGoal' => '9' ]);
        $idDeletedVariable = $this->createVariable($idVersion);
        $this->variableDao->deleteContainerVariable($this->idSite, $idVersion, $idDeletedVariable, $this->dateString);
        $idDraftVersionVariable = $this->createVariable($idDraftVersion);
        $idDeletedVersionVariable = $this->createVariable($idDeletedVersion);
        $idDeletedContainerVariable = $this->createVariable($idDeletedContainerVersion);

        $this->newVariableParameterMigrator->migrate();

        $variable = $this->variableDao->getContainerVariable($this->idSite, $idVersion, $idVariable);
        $this->assertSame($idVariable, $variable['idvariable']);
        $this->assertIsArray($variable);
        $this->assertIsArray($variable['parameters']);
        $this->assertCount(2, $variable['parameters']);
        $this->assertArrayHasKey('cookieDomain', $variable['parameters']);
        $this->assertSame('', $variable['parameters']['cookieDomain']);
        $this->assertNotEmpty($variable['description']);

        $variable = $this->variableDao->getContainerVariable($this->idSite, $idVersion, $idCustomJsFunctionVariable);
        $this->assertSame($idCustomJsFunctionVariable, $variable['idvariable']);
        $this->assertIsArray($variable);
        $this->assertIsArray($variable['parameters']);
        $this->assertCount(0, $variable['parameters']);
        $this->assertNotEmpty($variable['description']);

        $variable = $this->variableDao->getContainerVariable($this->idSite, $idVersion, $idVariableWithParameters);
        $this->assertSame($idVariableWithParameters, $variable['idvariable']);
        $this->assertIsArray($variable);
        $this->assertIsArray($variable['parameters']);
        $this->assertCount(2, $variable['parameters']);
        $this->assertArrayHasKey('cookieDomain', $variable['parameters']);
        $this->assertSame('', $variable['parameters']['cookieDomain']);
        $this->assertNotEmpty($variable['description']);

        // Find the deleted variable since the getContainerVariable method only works for active status variables.
        $variables = $this->variableDao->getAllVariables();
        foreach ($variables as $var) {
            if ($var['idvariable'] === $idDeletedVariable) {
                $variable = $var;
                break;
            }
        }
        $this->assertSame($idDeletedVariable, $variable['idvariable']);
        $this->assertIsArray($variable);
        $this->assertIsArray($variable['parameters']);
        $this->assertCount(1, $variable['parameters']);
        $this->assertNotEmpty($variable['description']);

        $variable = $this->variableDao->getContainerVariable($this->idSite, $idDraftVersion, $idDraftVersionVariable);
        $this->assertSame($idDraftVersionVariable, $variable['idvariable']);
        $this->assertIsArray($variable);
        $this->assertIsArray($variable['parameters']);
        $this->assertCount(2, $variable['parameters']);
        $this->assertArrayHasKey('cookieDomain', $variable['parameters']);
        $this->assertSame('', $variable['parameters']['cookieDomain']);
        $this->assertNotEmpty($variable['description']);

        $variable = $this->variableDao->getContainerVariable($this->idSite, $idDeletedVersion, $idDeletedVersionVariable);
        $this->assertSame($idDeletedVersionVariable, $variable['idvariable']);
        $this->assertIsArray($variable);
        $this->assertIsArray($variable['parameters']);
        $this->assertCount(1, $variable['parameters']);
        $this->assertNotEmpty($variable['description']);

        $variable = $this->variableDao->getContainerVariable($this->idSite, $idDeletedContainerVersion, $idDeletedContainerVariable);
        $this->assertSame($idDeletedContainerVariable, $variable['idvariable']);
        $this->assertIsArray($variable);
        $this->assertIsArray($variable['parameters']);
        $this->assertCount(1, $variable['parameters']);
        $this->assertNotEmpty($variable['description']);
    }

    public function test_migratingVariablesWithNewFieldAndDefaultValue()
    {
        $this->newVariableParameterMigrator = new NewVariableParameterMigrator(MatomoConfigurationVariable::ID, 'cookieDomain', 'myNewValue');
        $this->dateString = '2015-01-01 01:02:03';

        // Create some containers to test with.
        $containerDao = new ContainersDao();
        $this->idSite = 2;
        $idContainer = 'abcdef';
        $context = WebContext::ID;
        $name = 'My Container';
        $description = 'My container description';
        $containerDao->createContainer($this->idSite, $idContainer, $context, $name, $description, $this->dateString);

        // Create some versions to test with.
        $versionDao = new ContainerVersionsDao();
        $idDraftVersion = $versionDao->createDraftVersion($this->idSite, $idContainer, $this->dateString);

        // Create some variables to test with.
        $this->variableDao = new VariablesDao();
        $idDraftVersionVariable = $this->createVariable($idDraftVersion);

        $this->newVariableParameterMigrator->migrate();

        $variable = $this->variableDao->getContainerVariable($this->idSite, $idDraftVersion, $idDraftVersionVariable);
        $this->assertSame($idDraftVersionVariable, $variable['idvariable']);
        $this->assertIsArray($variable);
        $this->assertIsArray($variable['parameters']);
        $this->assertCount(2, $variable['parameters']);
        $this->assertArrayHasKey('cookieDomain', $variable['parameters']);
        $this->assertSame('myNewValue', $variable['parameters']['cookieDomain']);
        $this->assertNotEmpty($variable['description']);
    }

    public function test_migratingVariablesWithAdditionalField()
    {
        $this->newVariableParameterMigrator = new NewVariableParameterMigrator(MatomoConfigurationVariable::ID, 'cookieDomain', 'myNewValue');
        $this->newVariableParameterMigrator->addField('cookiePath');
        $this->newVariableParameterMigrator->addField('notValidTemplateProperty');
        $this->dateString = '2015-01-01 01:02:03';

        // Create some containers to test with.
        $containerDao = new ContainersDao();
        $this->idSite = 2;
        $idContainer = 'abcdef';
        $context = WebContext::ID;
        $name = 'My Container';
        $description = 'My container description';
        $containerDao->createContainer($this->idSite, $idContainer, $context, $name, $description, $this->dateString);

        // Create some versions to test with.
        $versionDao = new ContainerVersionsDao();
        $idDraftVersion = $versionDao->createDraftVersion($this->idSite, $idContainer, $this->dateString);

        // Create some variables to test with.
        $this->variableDao = new VariablesDao();
        $idDraftVersionVariable = $this->createVariable($idDraftVersion);

        $this->newVariableParameterMigrator->migrate();

        $variable = $this->variableDao->getContainerVariable($this->idSite, $idDraftVersion, $idDraftVersionVariable);
        $this->assertSame($idDraftVersionVariable, $variable['idvariable']);
        $this->assertIsArray($variable);
        $this->assertIsArray($variable['parameters']);
        $this->assertCount(3, $variable['parameters']);
        $this->assertArrayHasKey('cookieDomain', $variable['parameters']);
        $this->assertSame('myNewValue', $variable['parameters']['cookieDomain']);
        $this->assertArrayHasKey('cookiePath', $variable['parameters']);
        $this->assertSame('', $variable['parameters']['cookiePath']);
        $this->assertArrayNotHasKey('notValidTemplateProperty', $variable['parameters']);
        $this->assertNotEmpty($variable['description']);
    }

}
