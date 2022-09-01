<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\tests\Integration\Dao;

use Piwik\Common;
use Piwik\DbHelper;
use Piwik\Plugins\TagManager\Dao\VariablesDao;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * @group TagManager
 * @group VariablesDao
 * @group VariablesDaoTest
 * @group Plugins
 */
class VariablesDaoTest extends IntegrationTestCase
{

    /**
     * @var VariablesDao
     */
    private $dao;

    /**
     * @var string
     */
    private $tableName;

    private $now = '2015-01-01 01:02:03';

    public function setUp(): void
    {
        parent::setUp();

        $this->dao = new VariablesDao();
        $this->tableName = Common::prefixTable('tagmanager_variable');
    }

    public function test_shouldInstallTable()
    {
        $columns = DbHelper::getTableColumns($this->tableName);
        $columns = array_keys($columns);
        $columnsToCheck = array('idvariable', 'idcontainerversion', 'idsite', 'created_date', 'updated_date', 'deleted_date');

        foreach ($columnsToCheck as $column) {
            $this->assertTrue(in_array($column, $columns), "$column column is missing in variable db table");
        }
    }

    public function test_shouldBeAbleToUninstallVariableTable()
    {
        $this->expectException(\Zend_Db_Statement_Exception::class);
        $this->expectExceptionMessage('tagmanager_variable');

        $this->dao->uninstall();

        try {
            DbHelper::getTableColumns($this->tableName);
            $this->fail('Did not uninstall variable table');
        } catch (\Zend_Db_Statement_Exception $e) {
            $this->dao->install();
            throw $e;
        }

        $this->dao->install();
    }

    public function test_createVariableMinimal()
    {
        $idSite = 2;
        $idContainerVersion = 3;
        $type = 'CustomFoo';
        $name = 'My Name';
        $defaultValue = null;
        $parameters = array();
        $lookupTable = array();
        $createdDate = $this->now;
        $description = '';

        $idVariable = $this->dao->createVariable($idSite, $idContainerVersion, $type, $name, $parameters, $defaultValue, $lookupTable, $createdDate);
        $this->assertSame(1, $idVariable);

        $variable = $this->dao->getContainerVariable($idSite, $idContainerVersion, $idVariable);
        $this->assertEquals(array(
            'idvariable' => 1,
            'idcontainerversion' => $idContainerVersion,
            'idsite' => $idSite,
            'name' => $name,
            'type' => $type,
            'parameters' => $parameters,
            'default_value' => $defaultValue,
            'lookup_table' => $lookupTable,
            'created_date' => $createdDate,
            'updated_date' => $createdDate,
            'deleted_date' => null,
            'status' => VariablesDao::STATUS_ACTIVE,
            'description' => $description,
        ), $variable);
    }

    public function test_createVariable_Full()
    {
        $idSite = 2;
        $idContainerVersion = 3;
        $type = 'CustomFoo';
        $name = 'My Name';
        $parameters = array('foo' => 'bar', 'mytest' => 5, 'myvalue' => true);
        $lookupTable = array(
            array('match_value' => 'PageHost', 'comparison' => 'equals', 'out_value' => 5),
            array('match_value' => 'Referrer', 'comparison' => 'contains', 'out_value' => 'matomo'),
        );
        $createdDate = $this->now;
        $defaultValue = 'foobar';
        $description = 'Test description for My Name variable';

        $idVariable = $this->dao->createVariable($idSite, $idContainerVersion, $type, $name, $parameters, $defaultValue, $lookupTable, $createdDate, $description);
        $this->assertSame(1, $idVariable);

        $variable = $this->dao->getContainerVariable($idSite, $idContainerVersion, $idVariable);
        $this->assertEquals(array(
            'idvariable' => 1,
            'idcontainerversion' => $idContainerVersion,
            'idsite' => $idSite,
            'name' => $name,
            'type' => $type,
            'parameters' => $parameters,
            'default_value' => $defaultValue,
            'lookup_table' => $lookupTable,
            'created_date' => $createdDate,
            'updated_date' => $createdDate,
            'deleted_date' => null,
            'status' => VariablesDao::STATUS_ACTIVE,
            'description' => $description,
        ), $variable);
    }

    public function test_createVariable_increasedIdVariable()
    {
        $idVariable = $this->createVariable($idSite = 3);
        $this->assertEquals(1, $idVariable);

        $idVariable = $this->createVariable($idSite = 3, $idContainerVersion = 4, 'NameThree');
        $this->assertEquals(2, $idVariable);
    }

    public function test_createVariable_failsToInsertSameNameTwice()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('TagManager_ErrorNameDuplicate');

        $idVariable = $this->createVariable($idSite = 3);
        $this->assertEquals(1, $idVariable);

        $this->createVariable($idSite = 3);
    }

    public function test_createVariable_possibleToUseSameNameForDifferentSites()
    {
        $idVariable = $this->createVariable($idSite = 3);
        $this->assertEquals(1, $idVariable);

        $idVariable = $this->createVariable($idSite = 2);
        $this->assertEquals(2, $idVariable);
    }

    public function test_createVariable_possibleToUseSameNameForDifferentContainerVersions()
    {
        $idVariable = $this->createVariable($idSite = 3, $idContainerVersion = 2);
        $this->assertEquals(1, $idVariable);

        $idVariable = $this->createVariable($idSite = 3, $idContainerVersion = 3);
        $this->assertEquals(2, $idVariable);
    }

    public function test_createVariable_possibleToUseSameNameAfterDeletingOtherVariable()
    {
        $idSite = 3;
        $idContainerVersion = 5;
        $name = 'myname';
        $idVariable = $this->createVariable($idSite, $idContainerVersion, $name);
        $this->assertEquals(1, $idVariable);

        $this->dao->deleteContainerVariable($idSite, $idContainerVersion, $idVariable, $this->now);

        $idVariable = $this->createVariable($idSite, $idContainerVersion, $name);
        $this->assertEquals(2, $idVariable);

        $all = $this->dao->getAllVariables();
        $this->assertCount(2, $all);
        foreach ($all as $entry) {
            $this->assertSame($name, $entry['name']);
        }
    }

    public function test_updateVariable_failsToSetNameAlreadyInUseByOtherVariable()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('TagManager_ErrorNameDuplicate');

        $idSite = 3;
        $idContainerVersion = 5;
        $name = 'myname';
        $idVariable = $this->createVariable($idSite, $idContainerVersion, $name);
        $this->assertEquals(1, $idVariable);

        $idVariable = $this->createVariable($idSite, $idContainerVersion, 'myname2');
        $this->assertEquals(2, $idVariable);

        $this->dao->updateVariableColumns($idSite, $idContainerVersion, $idVariable, array(
            'name' => $name
        ));
    }

    public function test_updateVariable_succeedsToSetSameNameThatIsUsedAlreadyByThisVariable()
    {
        $idSite = 3;
        $idContainerVersion = 5;
        $name = 'myname2';
        $idVariable = $this->createVariable($idSite, $idContainerVersion, 'myname');
        $this->assertEquals(1, $idVariable);

        $idVariable = $this->createVariable($idSite, $idContainerVersion, $name);
        $this->assertEquals(2, $idVariable);

        $this->dao->updateVariableColumns($idSite, $idContainerVersion, $idVariable, array(
            'name' => $name
        ));
    }

    public function test_updateVariable_keepsLookupTable()
    {
        $idSite = 3;
        $idContainerVersion = 5;
        $idVariable = $this->createVariable($idSite, $idContainerVersion, 'myname');
        $this->assertEquals(1, $idVariable);

        $variable = $this->dao->getContainerVariable($idSite, $idContainerVersion, $idVariable);
        $this->assertNotEmpty($variable['lookup_table']);

        $this->dao->updateVariableColumns($idSite, $idContainerVersion, $idVariable, array(
            'name' => 'name2'
        ));

        $variable = $this->dao->getContainerVariable($idSite, $idContainerVersion, $idVariable);
        $this->assertNotEmpty($variable['lookup_table']);
    }

    public function test_updateVariableColumns_doesNotFailWhenNoColumsAreToBeUpdated()
    {
        $idVariable = $this->createVariable($idSite = 3);

        $this->dao->updateVariableColumns($idSite, $idContainerVersion = 5, $idVariable, array());

        $this->assertTrue(true);
    }

    public function test_updateVariableColumns_updatesASingleColumn()
    {
        $idVariable = $this->createVariable($idSite = 3, $idContainerVersion = 4);

        $variable = $this->dao->getContainerVariable($idSite = 3, $idContainerVersion = 4, $idVariable);
        $this->assertSame('FooVariable', $variable['name']);

        $this->dao->updateVariableColumns($idSite = 3, $idContainerVersion = 4, $idVariable, array('name' => 'foobarbaz'));

        $variables = $this->dao->getAllVariables();
        $this->assertSame($idVariable, $variables[0]['idvariable']);
        $this->assertSame($idSite, $variables[0]['idsite']);
        $this->assertSame('foobarbaz', $variables[0]['name']);
    }

    public function test_updateVariableColumns_updatesSeveralFieldsAndEncodesWhereNeeded()
    {
        $lookupTable = array(
            array('match_value' => 'foobar', 'comparison' => 'starts_with', 'out_value' => 'https://www.'),
            array('match_value' => 'foobar', 'comparison' => 'ends_with', 'out_value' => '.org')
        );
        $parameters = array('baz' => 'foo', 'hello' => 'world');
        $description = 'Test description for My Name variable';

        $idVariable = $this->createVariable($idSite = 4, $idContainerVersion = 6);

        $columns = array(
            'name' => 'My Changed Name',
            'default_value' => 4334,
            'lookup_table' => $lookupTable,
            'parameters' => $parameters,
            'updated_date' => '2016-01-02 03:04:05',
            'description' => $description,
        );
        $this->dao->updateVariableColumns($idSite = 4, $idContainerVersion = 6, $idVariable, $columns);

        $variable = $this->dao->getContainerVariable($idSite, $idContainerVersion, $idVariable);
        $this->assertEquals(array(
            'idvariable' => $idVariable,
            'idcontainerversion' => $idContainerVersion,
            'idsite' => $idSite,
            'name' => 'My Changed Name',
            'type' => 'CustomFoo',
            'parameters' => $parameters,
            'default_value' => 4334,
            'lookup_table' => $lookupTable,
            'created_date' => $this->now,
            'updated_date' => '2016-01-02 03:04:05',
            'deleted_date' => null,
            'status' => VariablesDao::STATUS_ACTIVE,
            'description' => $description,
        ), $variable);
    }

    public function test_getContainerVariable_shouldNotFindAnythingWhenNoVariableExists()
    {
        $this->assertFalse($this->dao->getContainerVariable($idSite = 3, $idContainerVersion = 99, $idVariable = 4));
    }

    public function test_getContainerVariable_shouldNotFindAnythingWhenNoVariableMatchesThisCriteria()
    {
        $idVariable = $this->createVariable($idSite = 4, $idContainerVersion = 99);
        $this->assertFalse($this->dao->getContainerVariable($idSite = 2, $idContainerVersion = 99, $idVariable));
        $this->assertFalse($this->dao->getContainerVariable($idSite = 4, $idContainerVersion = 99, $idVariable = 66));
    }

    public function test_getContainerVariable_shouldReturnVariableWhenItExists_andEncodeFields()
    {
        $idVariable = $this->createVariable($idSite = 4, $idContainerVersion = 92, 'Test name');

        $variable = $this->dao->getContainerVariable($idSite, $idContainerVersion, $idVariable);
        $this->assertEquals(array(
            'idvariable' => $idVariable,
            'idcontainerversion' => $idContainerVersion,
            'idsite' => $idSite,
            'name' => 'Test name',
            'type' => 'CustomFoo',
            'parameters' => array(),
            'default_value' => null,
            'lookup_table' => array(
                array('match_value' => 'baz', 'comparison' => 'regex', 'out_value' => 'bar')
            ),
            'created_date' => $this->now,
            'updated_date' => $this->now,
            'deleted_date' => null,
            'status' => VariablesDao::STATUS_ACTIVE,
            'description' => '',
        ), $variable);
    }

    public function test_findVariableByName_findsVariableByName()
    {
        $idVariable = $this->createVariable($idSite = 4, $idContainerVersion = 92, 'Test name');

        $variable = $this->dao->findVariableByName($idSite, $idContainerVersion, 'Test name');
        $this->assertEquals(array(
            'idvariable' => $idVariable,
            'idcontainerversion' => $idContainerVersion,
            'idsite' => $idSite,
            'name' => 'Test name',
            'type' => 'CustomFoo',
            'parameters' => array(),
            'default_value' => null,
            'lookup_table' => array(
                array('match_value' => 'baz', 'comparison' => 'regex', 'out_value' => 'bar')
            ),
            'created_date' => $this->now,
            'updated_date' => $this->now,
            'deleted_date' => null,
            'status' => VariablesDao::STATUS_ACTIVE,
            'description' => '',
        ), $variable);
    }

    public function test_findVariableByName_findsNothingWhenVariableNotExists()
    {
        $this->createVariable($idSite = 4, $idContainerVersion = 92, 'Test name');

        $variable = $this->dao->findVariableByName($idSite, $idContainerVersion, 'foobar test');
        $this->assertFalse($variable);
    }

    public function test_getContainerVariable_shouldNotReturnDeletedVariable()
    {
        $idVariable = $this->createVariable($idSite = 4, $idContainerVersion = 7, 'Test name');

        $variable = $this->dao->getContainerVariable($idSite, $idContainerVersion, $idVariable);
        $this->assertSame('Test name', $variable['name']);

        $this->dao->deleteContainerVariable($idSite, $idContainerVersion, $idVariable, $this->now);

        $variable = $this->dao->getContainerVariable($idSite, $idContainerVersion, $idVariable);
        $this->assertEmpty($variable);
    }

    public function test_getAllVariables_shouldReturnEmptyArray_WhenThereAreNoVariables()
    {
        $variables = $this->dao->getAllVariables();
        $this->assertSame(array(), $variables);
    }

    public function test_getAllVariables_shouldReturnAllExistingVariables_EvenDisabled()
    {
        $idVariable1 = $this->createVariable($idSite = 3, $idContainerVersion = 5, 'First Variable');
        $idVariable2 = $this->createVariable($idSite = 3, $idContainerVersion = 5, 'MySecondVariable');
        $idVariable3 = $this->createVariable($idSite = 4, $idContainerVersion = 5, 'My Third Variable');
        $this->dao->deleteContainerVariable($idSite = 3, $idContainerVersion, $idVariable2, $this->now);

        $variables = $this->dao->getAllVariables();
        $this->assertCount(3, $variables);
        $this->assertEquals($idVariable1, $variables[0]['idvariable']);
        $this->assertEquals($idVariable2, $variables[1]['idvariable']);
        $this->assertEquals($idVariable3, $variables[2]['idvariable']);

        $this->assertEquals('First Variable', $variables[0]['name']);
        $this->assertEquals('MySecondVariable', $variables[1]['name']);
        $this->assertEquals('My Third Variable', $variables[2]['name']);

        $this->assertEquals(VariablesDao::STATUS_DELETED, $variables[1]['status']);
    }

    public function test_getContainerVariables()
    {
        $this->assertSame(array(), $this->dao->getContainerVariables($idSite = 3, $idContainerVersion = 4));
        $this->assertSame(array(), $this->dao->getContainerVariables($idSite = 3, $idContainerVersion = 5));
        $this->assertSame(array(), $this->dao->getContainerVariables($idSite = 4, $idContainerVersion = 5));

        $idVariable1 = $this->createVariable($idSite = 3, $idContainerVersion = 5, 'First Variable');
        $idVariable2 = $this->createVariable($idSite = 3, $idContainerVersion = 5, 'MySecondVariable');
        $idVariable3 = $this->createVariable($idSite = 4, $idContainerVersion = 5, 'My Third Variable');

        $variables3_4 = $this->dao->getContainerVariables($idSite = 3, $idContainerVersion = 4);
        $this->assertEquals(array(), $variables3_4);

        $variables3_5 = $this->dao->getContainerVariables($idSite = 3, $idContainerVersion = 5);
        $variables4_5 = $this->dao->getContainerVariables($idSite = 4, $idContainerVersion = 5);

        $this->assertCount(2, $variables3_5);
        $this->assertCount(1, $variables4_5);
        $this->assertSame(array(), $this->dao->getContainerVariables($idSite = 99, $idContainerVersion = 9));

        $this->assertSame($idVariable1, $variables3_5[0]['idvariable']);
        $this->assertSame(3, $variables3_5[0]['idsite']);

        $this->assertSame($idVariable2, $variables3_5[1]['idvariable']);
        $this->assertSame(3, $variables3_5[1]['idsite']);

        $this->assertSame($idVariable3, $variables4_5[0]['idvariable']);
        $this->assertSame(4, $variables4_5[0]['idsite']);

        // ignores deleted status, was before 2 variables
        $this->dao->deleteContainerVariable($idSite = 3, $idContainerVersion = 5, $idVariable1, $this->now);
        $variables3_5 = $this->dao->getContainerVariables($idSite = 3, $idContainerVersion);
        $this->assertCount(1, $variables3_5);
    }

    public function test_deleteVariablesForSite_givenSiteHasNoVariables_shouldNotFail()
    {
        $this->dao->deleteVariablesForSite($idSite = 3, $this->now);
        $this->assertSame(array(), $this->dao->getContainerVariables($idSite = 3, $idContainerVersion = 5));
    }

    public function test_deleteVariablesForSite_shouldOnlyDeleteVariablesThatBelongToGivenSite()
    {
        $this->createVariable($idSite = 3, $idContainerVersion = 5, 'First Variable');
        $this->createVariable($idSite = 3, $idContainerVersion = 5, 'MySecondVariable');
        $this->createVariable($idSite = 4, $idContainerVersion = 5, 'My Third variable');

        $this->assertCount(2, $this->dao->getContainerVariables($idSite = 3, $idContainerVersion = 5));
        $this->assertCount(1, $this->dao->getContainerVariables($idSite = 4, $idContainerVersion = 5));

        $this->dao->deleteVariablesForSite($idSite = 3, $this->now);

        $this->assertSame(array(), $this->dao->getContainerVariables($idSite = 3, $idContainerVersion));
        $this->assertCount(1, $this->dao->getContainerVariables($idSite = 4, $idContainerVersion));

        // should not actually delete them but set a soft delete flag
        $variables = $this->dao->getAllVariables();
        $this->assertCount(3, $variables);

        // sets deleted date
        $this->assertSame($this->now, $variables[0]['deleted_date']);
        $this->assertSame(VariablesDao::STATUS_DELETED, $variables[0]['status']);
        $this->assertSame(VariablesDao::STATUS_DELETED, $variables[1]['status']);
        $this->assertSame(VariablesDao::STATUS_ACTIVE, $variables[2]['status']);
    }

    public function test_deleteContainerVariable_shouldOnlyDeleteGivenVariable()
    {
        $this->assertSame(array(), $this->dao->getAllVariables());

        $idVariable1 = $this->createVariable($idSite = 3, $idContainerVersion = 6, 'First Variable');
        $idVariable2 = $this->createVariable($idSite = 3, $idContainerVersion = 6, 'MySecondVariable');
        $idVariable3 = $this->createVariable($idSite = 4, $idContainerVersion = 6, 'My Third Variable');

        $this->assertCount(3, $this->dao->getAllVariables());
        foreach ($this->dao->getAllVariables() as $variable) {
            $this->assertSame(VariablesDao::STATUS_ACTIVE, $variable['status']);
        }

        // should not delete anything when no variable matches
        $this->dao->deleteContainerVariable($idSite = 99, $idContainerVersion = 6, $idVariable2, $this->now);
        $this->dao->deleteContainerVariable($idSite = 4, $idContainerVersion = 6, $idVariable2, $this->now);
        $this->dao->deleteContainerVariable($idSite = 3, $idContainerVersion = 5,999, $this->now);

        // verify nothing deleted
        $this->assertCount(3, $this->dao->getAllVariables());
        foreach ($this->dao->getAllVariables() as $variable) {
            $this->assertSame(VariablesDao::STATUS_ACTIVE, $variable['status']);
        }

        // now actually delete a variable
        $this->dao->deleteContainerVariable($idSite = 3, $idContainerVersion = 6, $idVariable2, $this->now);

        // verify deleted
        $variables = $this->dao->getAllVariables();
        $this->assertCount(3, $variables);
        $this->assertSame(VariablesDao::STATUS_ACTIVE, $variables[0]['status']);
        $this->assertSame(null, $variables[0]['deleted_date']);
        $this->assertSame(VariablesDao::STATUS_DELETED, $variables[1]['status']);
        $this->assertSame($this->now, $variables[1]['deleted_date']);
        $this->assertSame(VariablesDao::STATUS_ACTIVE, $variables[2]['status']);
        $this->assertSame(null, $variables[2]['deleted_date']);
    }

    private function createVariable($idSite = 1, $idContainerVersion = 5, $name = 'FooVariable')
    {
        $type = 'CustomFoo';
        $parameters = array();
        $defaultValue = null;
        $lookupTable = array(
            array('match_value' => 'baz', 'comparison' => 'regex', 'out_value' => 'bar')
        );
        $startDate = null;
        $endDate = null;
        $createdDate = $this->now;

        $idVariable = $this->dao->createVariable($idSite, $idContainerVersion, $type, $name, $parameters, $defaultValue, $lookupTable, $createdDate);

        return $idVariable;
    }


}
