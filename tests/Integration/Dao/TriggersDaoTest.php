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
use Piwik\Plugins\TagManager\Dao\TriggersDao;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * @group TagManager
 * @group TriggersDao
 * @group TriggersDaoTest
 * @group Plugins
 */
class TriggersDaoTest extends IntegrationTestCase
{
    /**
     * @var TriggersDao
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

        $this->dao = new TriggersDao();
        $this->tableName = Common::prefixTable('tagmanager_trigger');
    }

    public function test_shouldInstallTable()
    {
        $columns = DbHelper::getTableColumns($this->tableName);
        $columns = array_keys($columns);
        $columnsToCheck = array('idtrigger', 'idcontainerversion', 'idsite', 'created_date', 'updated_date', 'deleted_date');

        foreach ($columnsToCheck as $column) {
            $this->assertTrue(in_array($column, $columns), "$column column is missing in trigger db table");
        }
    }

    public function test_shouldBeAbleToUninstallTriggerTable()
    {
        $this->expectException(\Zend_Db_Statement_Exception::class);
        $this->expectExceptionMessage('tagmanager_trigger');

        $this->dao->uninstall();

        try {
            DbHelper::getTableColumns($this->tableName);
            $this->fail('Did not uninstall trigger table');
        } catch (\Zend_Db_Statement_Exception $e) {
            $this->dao->install();
            throw $e;
        }

        $this->dao->install();
    }

    public function test_createTriggerMinimal()
    {
        $idSite = 2;
        $idContainerVersion = 3;
        $type = 'CustomFoo';
        $name = 'My Name';
        $parameters = array();
        $conditions = array();
        $createdDate = $this->now;
        $description = '';

        $idTrigger = $this->dao->createTrigger($idSite, $idContainerVersion, $type, $name, $parameters, $conditions, $createdDate);
        $this->assertSame(1, $idTrigger);

        $trigger = $this->dao->getContainerTrigger($idSite, $idContainerVersion, $idTrigger);
        $this->assertEquals(array(
            'idtrigger' => 1,
            'idcontainerversion' => $idContainerVersion,
            'idsite' => $idSite,
            'name' => $name,
            'type' => $type,
            'parameters' => $parameters,
            'conditions' => $conditions,
            'created_date' => $createdDate,
            'updated_date' => $createdDate,
            'deleted_date' => null,
            'status' => TriggersDao::STATUS_ACTIVE,
            'description' => $description,
        ), $trigger);
    }

    public function test_createTrigger_Full()
    {
        $idSite = 2;
        $idContainerVersion = 3;
        $type = 'CustomFoo';
        $name = 'My Name';
        $parameters = array('foo' => 'bar', 'mytest' => 5, 'myvalue' => true);
        $conditions = array(
            array('actual' => 'PageHost', 'comparison' => 'equals', 'expected' => 5),
            array('actual' => 'Referrer', 'comparison' => 'contains', 'expected' => 'matomo'),
        );
        $createdDate = $this->now;
        $description = 'Test description for My Name trigger';

        $idTrigger = $this->dao->createTrigger($idSite, $idContainerVersion, $type, $name, $parameters, $conditions, $createdDate, $description);
        $this->assertSame(1, $idTrigger);

        $trigger = $this->dao->getContainerTrigger($idSite, $idContainerVersion, $idTrigger);
        $this->assertEquals(array(
            'idtrigger' => 1,
            'idcontainerversion' => $idContainerVersion,
            'idsite' => $idSite,
            'name' => $name,
            'type' => $type,
            'parameters' => $parameters,
            'conditions' => $conditions,
            'created_date' => $createdDate,
            'updated_date' => $createdDate,
            'deleted_date' => null,
            'status' => TriggersDao::STATUS_ACTIVE,
            'description' => $description,
        ), $trigger);
    }

    public function test_createTrigger_increasedIdTrigger()
    {
        $idTrigger = $this->createTrigger($idSite = 3);
        $this->assertEquals(1, $idTrigger);

        $idTrigger = $this->createTrigger($idSite = 3, $idContainerVersion = 4, 'NameThree');
        $this->assertEquals(2, $idTrigger);
    }

    public function test_createTrigger_failsToInsertSameNameTwice()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('TagManager_ErrorNameDuplicate');

        $idTrigger = $this->createTrigger($idSite = 3);
        $this->assertEquals(1, $idTrigger);

        $this->createTrigger($idSite = 3);
    }

    public function test_createTrigger_possibleToUseSameNameForDifferentSites()
    {
        $idTrigger = $this->createTrigger($idSite = 3);
        $this->assertEquals(1, $idTrigger);

        $idTrigger = $this->createTrigger($idSite = 2);
        $this->assertEquals(2, $idTrigger);
    }

    public function test_createTrigger_possibleToUseSameNameForDifferentContainerVersions()
    {
        $idTrigger = $this->createTrigger($idSite = 3, $idContainerVersion = 2);
        $this->assertEquals(1, $idTrigger);

        $idTrigger = $this->createTrigger($idSite = 3, $idContainerVersion = 3);
        $this->assertEquals(2, $idTrigger);
    }

    public function test_createTrigger_possibleToUseSameNameAfterDeletingOtherTrigger()
    {
        $idSite = 3;
        $idContainerVersion = 5;
        $name = 'myname';
        $idTrigger = $this->createTrigger($idSite, $idContainerVersion, $name);
        $this->assertEquals(1, $idTrigger);

        $this->dao->deleteContainerTrigger($idSite, $idContainerVersion, $idTrigger, $this->now);

        $idTrigger = $this->createTrigger($idSite, $idContainerVersion, $name);
        $this->assertEquals(2, $idTrigger);

        $all = $this->dao->getAllTriggers();
        $this->assertCount(2, $all);
        foreach ($all as $entry) {
            $this->assertSame($name, $entry['name']);
        }
    }

    public function test_updateTrigger_failsToSetNameAlreadyInUseByOtherTrigger()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('TagManager_ErrorNameDuplicate');

        $idSite = 3;
        $idContainerVersion = 5;
        $name = 'myname';
        $idTrigger = $this->createTrigger($idSite, $idContainerVersion, $name);
        $this->assertEquals(1, $idTrigger);

        $idTrigger = $this->createTrigger($idSite, $idContainerVersion, 'myname2');
        $this->assertEquals(2, $idTrigger);

        $this->dao->updateTriggerColumns($idSite, $idContainerVersion, $idTrigger, array(
            'name' => $name
        ));
    }

    public function test_updateTrigger_succeedsToSetSameNameThatIsUsedAlreadyByThisTrigger()
    {
        $idSite = 3;
        $idContainerVersion = 5;
        $name = 'myname2';
        $idTrigger = $this->createTrigger($idSite, $idContainerVersion, 'myname');
        $this->assertEquals(1, $idTrigger);

        $idTrigger = $this->createTrigger($idSite, $idContainerVersion, $name);
        $this->assertEquals(2, $idTrigger);

        $this->dao->updateTriggerColumns($idSite, $idContainerVersion, $idTrigger, array(
            'name' => $name
        ));
    }

    public function test_updateTrigger_keepsConditions()
    {
        $idSite = 3;
        $idContainerVersion = 5;
        $idTrigger = $this->createTrigger($idSite, $idContainerVersion, 'myname');
        $this->assertEquals(1, $idTrigger);

        $trigger = $this->dao->getContainerTrigger($idSite, $idContainerVersion, $idTrigger);
        $this->assertNotEmpty($trigger['conditions']);

        $this->dao->updateTriggerColumns($idSite, $idContainerVersion, $idTrigger, array(
            'name' => 'name2'
        ));

        $trigger = $this->dao->getContainerTrigger($idSite, $idContainerVersion, $idTrigger);
        $this->assertNotEmpty($trigger['conditions']);
    }

    public function test_updateTriggerColumns_doesNotFailWhenNoColumsAreToBeUpdated()
    {
        self::expectNotToPerformAssertions();

        $idTrigger = $this->createTrigger($idSite = 3);

        $this->dao->updateTriggerColumns($idSite, $idContainerVersion = 5, $idTrigger, array());
    }

    public function test_updateTriggerColumns_updatesASingleColumn()
    {
        $idTrigger = $this->createTrigger($idSite = 3, $idContainerVersion = 4);

        $trigger = $this->dao->getContainerTrigger($idSite = 3, $idContainerVersion = 4, $idTrigger);
        $this->assertSame('FooTrigger', $trigger['name']);

        $this->dao->updateTriggerColumns($idSite = 3, $idContainerVersion = 4, $idTrigger, array('name' => 'foobarbaz'));

        $triggers = $this->dao->getAllTriggers();
        $this->assertSame($idTrigger, $triggers[0]['idtrigger']);
        $this->assertSame($idSite, $triggers[0]['idsite']);
        $this->assertSame('foobarbaz', $triggers[0]['name']);
    }

    public function test_updateTriggerColumns_updatesSeveralFieldsAndEncodesWhereNeeded()
    {
        $conditions = array(
            array('actual' => 'foobar', 'comparison' => 'starts_with', 'expected' => 'https://www.'),
            array('actual' => 'foobar', 'comparison' => 'ends_with', 'expected' => '.org')
        );
        $parameters = array('baz' => 'foo', 'hello' => 'world');
        $description = 'Test description for My Name trigger';

        $idTrigger = $this->createTrigger($idSite = 4, $idContainerVersion = 6);

        $columns = array(
            'name' => 'My Changed Name',
            'conditions' => $conditions,
            'parameters' => $parameters,
            'updated_date' => '2016-01-02 03:04:05',
            'description' => $description
        );
        $this->dao->updateTriggerColumns($idSite = 4, $idContainerVersion = 6, $idTrigger, $columns);

        $trigger = $this->dao->getContainerTrigger($idSite, $idContainerVersion, $idTrigger);
        $this->assertEquals(array(
            'idtrigger' => $idTrigger,
            'idcontainerversion' => $idContainerVersion,
            'idsite' => $idSite,
            'name' => 'My Changed Name',
            'type' => 'CustomFoo',
            'parameters' => $parameters,
            'conditions' => $conditions,
            'created_date' => $this->now,
            'updated_date' => '2016-01-02 03:04:05',
            'deleted_date' => null,
            'status' => TriggersDao::STATUS_ACTIVE,
            'description' => $description,
        ), $trigger);
    }

    public function test_getContainerTrigger_shouldNotFindAnythingWhenNoTriggerExists()
    {
        $this->assertFalse($this->dao->getContainerTrigger($idSite = 3, $idContainerVersion = 99, $idTrigger = 4));
    }

    public function test_getContainerTrigger_shouldNotFindAnythingWhenNoTriggerMatchesThisCriteria()
    {
        $idTrigger = $this->createTrigger($idSite = 4, $idContainerVersion = 99);
        $this->assertFalse($this->dao->getContainerTrigger($idSite = 2, $idContainerVersion = 99, $idTrigger));
        $this->assertFalse($this->dao->getContainerTrigger($idSite = 4, $idContainerVersion = 99, $idTrigger = 66));
    }

    public function test_getContainerTrigger_shouldReturnTriggerWhenItExists_andEncodeFields()
    {
        $idTrigger = $this->createTrigger($idSite = 4, $idContainerVersion = 92, 'Test name');

        $trigger = $this->dao->getContainerTrigger($idSite, $idContainerVersion, $idTrigger);
        $this->assertEquals(array(
            'idtrigger' => $idTrigger,
            'idcontainerversion' => $idContainerVersion,
            'idsite' => $idSite,
            'name' => 'Test name',
            'type' => 'CustomFoo',
            'parameters' => array(),
            'conditions' => array(
                array('actual' => 'baz', 'comparison' => 'regex', 'expected' => 'bar')
            ),
            'created_date' => $this->now,
            'updated_date' => $this->now,
            'deleted_date' => null,
            'status' => TriggersDao::STATUS_ACTIVE,
            'description' => '',
        ), $trigger);
    }

    public function test_getContainerTrigger_shouldNotReturnDeletedTrigger()
    {
        $idTrigger = $this->createTrigger($idSite = 4, $idContainerVersion = 7, 'Test name');

        $trigger = $this->dao->getContainerTrigger($idSite, $idContainerVersion, $idTrigger);
        $this->assertSame('Test name', $trigger['name']);

        $this->dao->deleteContainerTrigger($idSite, $idContainerVersion, $idTrigger, $this->now);

        $trigger = $this->dao->getContainerTrigger($idSite, $idContainerVersion, $idTrigger);
        $this->assertEmpty($trigger);
    }

    public function test_getAllTriggers_shouldReturnEmptyArray_WhenThereAreNoTriggers()
    {
        $triggers = $this->dao->getAllTriggers();
        $this->assertSame(array(), $triggers);
    }

    public function test_getAllTriggers_shouldReturnAllExistingTriggers_EvenDisabled()
    {
        $idTrigger1 = $this->createTrigger($idSite = 3, $idContainerVersion = 5, 'First Trigger');
        $idTrigger2 = $this->createTrigger($idSite = 3, $idContainerVersion = 5, 'MySecondTrigger');
        $idTrigger3 = $this->createTrigger($idSite = 4, $idContainerVersion = 5, 'My Third Trigger');
        $this->dao->deleteContainerTrigger($idSite = 3, $idContainerVersion, $idTrigger2, $this->now);

        $triggers = $this->dao->getAllTriggers();
        $this->assertCount(3, $triggers);
        $this->assertEquals($idTrigger1, $triggers[0]['idtrigger']);
        $this->assertEquals($idTrigger2, $triggers[1]['idtrigger']);
        $this->assertEquals($idTrigger3, $triggers[2]['idtrigger']);

        $this->assertEquals('First Trigger', $triggers[0]['name']);
        $this->assertEquals('MySecondTrigger', $triggers[1]['name']);
        $this->assertEquals('My Third Trigger', $triggers[2]['name']);

        $this->assertEquals(TriggersDao::STATUS_DELETED, $triggers[1]['status']);
    }

    public function test_getContainerTriggers()
    {
        $this->assertSame(array(), $this->dao->getContainerTriggers($idSite = 3, $idContainerVersion = 4));
        $this->assertSame(array(), $this->dao->getContainerTriggers($idSite = 3, $idContainerVersion = 5));
        $this->assertSame(array(), $this->dao->getContainerTriggers($idSite = 4, $idContainerVersion = 5));

        $idTrigger1 = $this->createTrigger($idSite = 3, $idContainerVersion = 5, 'First Trigger');
        $idTrigger2 = $this->createTrigger($idSite = 3, $idContainerVersion = 5, 'MySecondTrigger');
        $idTrigger3 = $this->createTrigger($idSite = 4, $idContainerVersion = 5, 'My Third Trigger');

        $triggers3_4 = $this->dao->getContainerTriggers($idSite = 3, $idContainerVersion = 4);
        $this->assertEquals(array(), $triggers3_4);

        $triggers3_5 = $this->dao->getContainerTriggers($idSite = 3, $idContainerVersion = 5);
        $triggers4_5 = $this->dao->getContainerTriggers($idSite = 4, $idContainerVersion = 5);

        $this->assertCount(2, $triggers3_5);
        $this->assertCount(1, $triggers4_5);
        $this->assertSame(array(), $this->dao->getContainerTriggers($idSite = 99, $idContainerVersion = 9));

        $this->assertSame($idTrigger1, $triggers3_5[0]['idtrigger']);
        $this->assertSame(3, $triggers3_5[0]['idsite']);

        $this->assertSame($idTrigger2, $triggers3_5[1]['idtrigger']);
        $this->assertSame(3, $triggers3_5[1]['idsite']);

        $this->assertSame($idTrigger3, $triggers4_5[0]['idtrigger']);
        $this->assertSame(4, $triggers4_5[0]['idsite']);

        // ignores deleted status, was before 2 triggers
        $this->dao->deleteContainerTrigger($idSite = 3, $idContainerVersion = 5, $idTrigger1, $this->now);
        $triggers3_5 = $this->dao->getContainerTriggers($idSite = 3, $idContainerVersion);
        $this->assertCount(1, $triggers3_5);
    }

    public function test_deleteTriggersForSite_givenSiteHasNoTriggers_shouldNotFail()
    {
        $this->dao->deleteTriggersForSite($idSite = 3, $this->now);
        $this->assertSame(array(), $this->dao->getContainerTriggers($idSite = 3, $idContainerVersion = 5));
    }

    public function test_deleteTriggersForSite_shouldOnlyDeleteTriggersThatBelongToGivenSite()
    {
        $this->createTrigger($idSite = 3, $idContainerVersion = 5, 'First Trigger');
        $this->createTrigger($idSite = 3, $idContainerVersion = 5, 'MySecondTrigger');
        $this->createTrigger($idSite = 4, $idContainerVersion = 5, 'My Third trigger');

        $this->assertCount(2, $this->dao->getContainerTriggers($idSite = 3, $idContainerVersion = 5));
        $this->assertCount(1, $this->dao->getContainerTriggers($idSite = 4, $idContainerVersion = 5));

        $this->dao->deleteTriggersForSite($idSite = 3, $this->now);

        $this->assertSame(array(), $this->dao->getContainerTriggers($idSite = 3, $idContainerVersion));
        $this->assertCount(1, $this->dao->getContainerTriggers($idSite = 4, $idContainerVersion));

        // should not actually delete them but set a soft delete flag
        $triggers = $this->dao->getAllTriggers();
        $this->assertCount(3, $triggers);

        // sets deleted date
        $this->assertSame($this->now, $triggers[0]['deleted_date']);
        $this->assertSame(TriggersDao::STATUS_DELETED, $triggers[0]['status']);
        $this->assertSame(TriggersDao::STATUS_DELETED, $triggers[1]['status']);
        $this->assertSame(TriggersDao::STATUS_ACTIVE, $triggers[2]['status']);
    }

    public function test_deleteContainerTrigger_shouldOnlyDeleteGivenTrigger()
    {
        $this->assertSame(array(), $this->dao->getAllTriggers());

        $idTrigger1 = $this->createTrigger($idSite = 3, $idContainerVersion = 6, 'First Trigger');
        $idTrigger2 = $this->createTrigger($idSite = 3, $idContainerVersion = 6, 'MySecondTrigger');
        $idTrigger3 = $this->createTrigger($idSite = 4, $idContainerVersion = 6, 'My Third Trigger');

        $this->assertCount(3, $this->dao->getAllTriggers());
        foreach ($this->dao->getAllTriggers() as $trigger) {
            $this->assertSame(TriggersDao::STATUS_ACTIVE, $trigger['status']);
        }

        // should not delete anything when no trigger matches
        $this->dao->deleteContainerTrigger($idSite = 99, $idContainerVersion = 6, $idTrigger2, $this->now);
        $this->dao->deleteContainerTrigger($idSite = 4, $idContainerVersion = 6, $idTrigger2, $this->now);
        $this->dao->deleteContainerTrigger($idSite = 3, $idContainerVersion = 5, 999, $this->now);

        // verify nothing deleted
        $this->assertCount(3, $this->dao->getAllTriggers());
        foreach ($this->dao->getAllTriggers() as $trigger) {
            $this->assertSame(TriggersDao::STATUS_ACTIVE, $trigger['status']);
        }

        // now actually delete a trigger
        $this->dao->deleteContainerTrigger($idSite = 3, $idContainerVersion = 6, $idTrigger2, $this->now);

        // verify deleted
        $triggers = $this->dao->getAllTriggers();
        $this->assertCount(3, $triggers);
        $this->assertSame(TriggersDao::STATUS_ACTIVE, $triggers[0]['status']);
        $this->assertSame(null, $triggers[0]['deleted_date']);
        $this->assertSame(TriggersDao::STATUS_DELETED, $triggers[1]['status']);
        $this->assertSame($this->now, $triggers[1]['deleted_date']);
        $this->assertSame(TriggersDao::STATUS_ACTIVE, $triggers[2]['status']);
        $this->assertSame(null, $triggers[2]['deleted_date']);
    }

    private function createTrigger($idSite = 1, $idContainerVersion = 5, $name = 'FooTrigger')
    {
        $type = 'CustomFoo';
        $parameters = array();
        $conditions = array(
            array('actual' => 'baz', 'comparison' => 'regex', 'expected' => 'bar')
        );
        $startDate = null;
        $endDate = null;
        $createdDate = $this->now;

        $idTrigger = $this->dao->createTrigger($idSite, $idContainerVersion, $type, $name, $parameters, $conditions, $createdDate);

        return $idTrigger;
    }
}
