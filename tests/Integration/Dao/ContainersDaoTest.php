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
use Piwik\Plugins\TagManager\Context\WebContext;
use Piwik\Plugins\TagManager\Dao\ContainersDao;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * @group TagManager
 * @group ContainersDao
 * @group ContainersDaoTest
 * @group Plugins
 */
class ContainersDaoTest extends IntegrationTestCase
{
    /**
     * @var ContainersDao
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

        $this->dao = new ContainersDao();
        $this->tableName = Common::prefixTable('tagmanager_container');
    }

    public function test_shouldInstallTable()
    {
        $columns = DbHelper::getTableColumns($this->tableName);
        $columns = array_keys($columns);
        $columnsToCheck = array('idcontainer', 'idsite', 'context', 'name', 'description', 'ignoreGtmDataLayer', 'activelySyncGtmDataLayer', 'isTagFireLimitAllowedInPreviewMode', 'status', 'created_date', 'updated_date', 'deleted_date');

        $this->assertSame($columnsToCheck, $columns);
    }

    public function test_shouldBeAbleToUninstallContainerTable()
    {
        $this->expectException(\Zend_Db_Statement_Exception::class);
        $this->expectExceptionMessage('tagmanager_container');

        $this->dao->uninstall();

        try {
            DbHelper::getTableColumns($this->tableName);
            $this->fail('Did not uninstall tagmanager_container table');
        } catch (\Zend_Db_Statement_Exception $e) {
            $this->dao->install();
            throw $e;
        }

        $this->dao->install();
    }

    public function test_createContainer()
    {
        $idSite = 2;
        $idContainer = 'abcdef';
        $context = WebContext::ID;
        $name = 'My Container';
        $description = 'My description';
        $createdDate = $this->now;

        $idContainerReturned = $this->dao->createContainer($idSite, $idContainer, $context, $name, $description, $createdDate, 0, 0, 0);
        $this->assertSame($idContainer, $idContainerReturned);

        $container = $this->dao->getContainer($idSite, $idContainer);
        $this->assertEquals(array(
            'idcontainer' => $idContainer,
            'idsite' => $idSite,
            'context' => $context,
            'name' => $name,
            'description' => $description,
            'status' => ContainersDao::STATUS_ACTIVE,
            'created_date' => $createdDate,
            'updated_date' => $createdDate,
            'deleted_date' => null,
            'ignoreGtmDataLayer' => version_compare(PHP_VERSION, '8.0', '>=') ? 0 : '0',
            'activelySyncGtmDataLayer' => version_compare(PHP_VERSION, '8.0', '>=') ? 0 : '0',
            'isTagFireLimitAllowedInPreviewMode' => version_compare(PHP_VERSION, '8.0', '>=') ? 0 : '0'
        ), $container);
    }

    public function test_createContainer_failsToInsertSameNameTwice()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('TagManager_ErrorNameDuplicate');

        $idContainer = $this->createContainer($idSite = 3, 'abcdef');
        $this->assertEquals('abcdef', $idContainer);

        $this->createContainer($idSite = 3, 'abcdee');
    }

    public function test_createContainer_failsToInsertSameContainerIdTwice()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('TagManager_ErrorContainerIdDuplicate');

        $idContainer = $this->createContainer($idSite = 3, 'abcdef');
        $this->assertEquals('abcdef', $idContainer);

        $this->createContainer($idSite = 3, 'abcdef');
    }

    public function test_createContainer_notPossibleToUseSameContainerIdForDifferentSites()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('TagManager_ErrorContainerIdDuplicate');

        $idContainer = $this->createContainer($idSite = 3, 'abcdef');
        $this->assertEquals('abcdef', $idContainer);

        $idContainer = $this->createContainer($idSite = 2, 'abcdef');
    }

    public function test_createContainer_possibleToUseSameNameForDifferentSites()
    {
        $idContainer = $this->createContainer($idSite = 3, 'abcdee', 'myname');
        $this->assertEquals('abcdee', $idContainer);

        $idContainer = $this->createContainer($idSite = 2, 'abcdef', 'myname');
        $this->assertEquals('abcdef', $idContainer);
    }

    public function test_createContainer_notPossibleToUseSameNameForSameSites()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('TagManager_ErrorNameDuplicate');

        $idContainer = $this->createContainer($idSite = 3, 'abcdee', 'myname');
        $this->assertEquals('abcdee', $idContainer);

        $idContainer = $this->createContainer($idSite = 3, 'abcdef', 'myname');
    }

    public function test_createContainer_possibleToUseSameNameAfterDeletingOtherContainer()
    {
        $idSite = 3;
        $idContainer = 'abcdef';
        $name = 'myname';
        $this->createContainer($idSite, $idContainer, $name);

        $this->dao->deleteContainer($idSite, $idContainer, $this->now);

        $idContainer = $this->createContainer($idSite, 'abceee', $name);

        $all = $this->dao->getAllContainers();
        $this->assertCount(2, $all);
        foreach ($all as $entry) {
            $this->assertSame($name, $entry['name']);
        }
    }

    public function test_updateContainer_failsToSetNameAlreadyInUseByOtherContainer()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('TagManager_ErrorNameDuplicate');

        $idSite = 3;
        $idContainer = 'abceee';
        $name = 'myname';
        $this->createContainer($idSite, $idContainer, $name);

        $idContainer = $this->createContainer($idSite, 'abcdef', 'myname2');

        $this->dao->updateContainerColumns($idSite, $idContainer, array(
            'name' => $name
        ));
    }

    public function test_updateContainer_succeedsToSetSameNameThatIsUsedAlreadyByThisContainer()
    {
        self::expectNotToPerformAssertions();

        $idSite = 3;
        $idContainer = 'abcdef';
        $name = 'myname2';
        $this->createContainer($idSite, $idContainer, 'myname');

        $idContainer = $this->createContainer($idSite, 'abcddd', $name);

        $this->dao->updateContainerColumns($idSite, $idContainer, array(
            'name' => $name
        ));
    }

    public function test_updateContainerColumns_doesNotFailWhenNoColumsAreToBeUpdated()
    {
        self::expectNotToPerformAssertions();

        $idContainer = $this->createContainer($idSite = 3);

        $this->dao->updateContainerColumns($idSite, $idContainer, array());
    }

    public function test_updateContainerColumns_updatesASingleColumn()
    {
        $idContainer = $this->createContainer($idSite = 3, $idContainer = 'abcdef');

        $container = $this->dao->getContainer($idSite = 3, $idContainer);
        $this->assertSame('FooContainer', $container['name']);

        $this->dao->updateContainerColumns($idSite = 3, $idContainer, array('name' => 'foobarbaz'));

        $containers = $this->dao->getAllContainers();
        $this->assertSame($idContainer, $containers[0]['idcontainer']);
        $this->assertSame($idSite, $containers[0]['idsite']);
        $this->assertSame('foobarbaz', $containers[0]['name']);
    }

    public function test_updateContainerColumns_updatesSeveralFieldsAndEncodesWhereNeeded()
    {
        $idContainer = $this->createContainer($idSite = 4, $idContaine = 'abcdef');

        $columns = array(
            'name' => 'My Changed Name',
            'description' => 'foobar baz lorem ipsum',
            'context' => 'foobar',
            'updated_date' => '2016-01-02 03:04:05'
        );
        $this->dao->updateContainerColumns($idSite = 4, $idContainer, $columns);

        $container = $this->dao->getContainer($idSite, $idContainer);
        $this->assertEquals(array(
            'idcontainer' => $idContainer,
            'idsite' => $idSite,
            'context' => $columns['context'],
            'name' => $columns['name'],
            'description' => $columns['description'],
            'status' => ContainersDao::STATUS_ACTIVE,
            'created_date' => $this->now,
            'updated_date' => $columns['updated_date'],
            'deleted_date' => null,
            'ignoreGtmDataLayer' => version_compare(PHP_VERSION, '8.0', '>=') ? 0 : '0',
            'activelySyncGtmDataLayer' => version_compare(PHP_VERSION, '8.0', '>=') ? 0 : '0',
            'isTagFireLimitAllowedInPreviewMode' => version_compare(PHP_VERSION, '8.0', '>=') ? 0 : '0',
        ), $container);
    }

    public function test_getContainer_shouldNotFindAnythingWhenNoContainerExists()
    {
        $this->assertFalse($this->dao->getContainer($idSite = 3, $idContainer = 'Abcdef'));
    }

    public function test_getContainer_shouldNotFindAnythingWhenNoContainerMatchesThisCriteria()
    {
        $idContainer = $this->createContainer($idSite = 4, $idContainer = 'abcdef');
        $this->assertFalse($this->dao->getContainer($idSite = 2, $idContainer = 'abcdef'));
        $this->assertFalse($this->dao->getContainer($idSite = 4, $idContainer = 'foobar'));
    }

    public function test_getContainer_shouldReturnContainerWhenItExists_andEncodeFields()
    {
        $idContainer = $this->createContainer($idSite = 4, $idContainer = 'fedcba', 'Test name', 1, 1, 1);

        $container = $this->dao->getContainer($idSite, $idContainer);
        $this->assertSame(array(
            'idcontainer' => $idContainer,
            'idsite' => $idSite,
            'context' => WebContext::ID,
            'name' => 'Test name',
            'description' => 'My description',
            'ignoreGtmDataLayer' => version_compare(PHP_VERSION, '8.0', '>=') ? 1 : '1',
            'activelySyncGtmDataLayer' => version_compare(PHP_VERSION, '8.0', '>=') ? 1 : '1',
            'isTagFireLimitAllowedInPreviewMode' => version_compare(PHP_VERSION, '8.0', '>=') ? 1 : '1',
            'status' => ContainersDao::STATUS_ACTIVE,
            'created_date' => $this->now,
            'updated_date' => $this->now,
            'deleted_date' => null,
        ), $container);
    }

    public function test_getContainer_shouldNotReturnDeletedContainer()
    {
        $idContainer = $this->createContainer($idSite = 4, $idContainer = 'foobar');

        $container = $this->dao->getContainer($idSite, $idContainer);
        $this->assertSame($idContainer, $container['idcontainer']);

        $this->dao->deleteContainer($idSite, $idContainer, $this->now);

        $container = $this->dao->getContainer($idSite, $idContainer);
        $this->assertEmpty($container);
    }

    public function test_getAllContainers_shouldReturnEmptyArray_WhenThereAreNoContainers()
    {
        $containers = $this->dao->getAllContainers();
        $this->assertSame(array(), $containers);
    }

    public function test_getAllContainers_shouldReturnAllExistingContainers_EvenDisabled()
    {
        $idContainer1 = $this->createContainer($idSite = 3, $idContainer = 'abcdef', 'First Container');
        $idContainer2 = $this->createContainer($idSite = 3, $idContainer = 'abcdee', 'MySecondContainer');
        $idContainer3 = $this->createContainer($idSite = 4, $idContainer = 'abcddd', 'My Third Container');

        $this->dao->deleteContainer($idSite = 3, $idContainer2, $this->now);

        $containers = $this->dao->getAllContainers();
        $this->assertCount(3, $containers);
        $this->assertEquals($idContainer1, $containers[2]['idcontainer']);
        $this->assertEquals($idContainer2, $containers[1]['idcontainer']);
        $this->assertEquals($idContainer3, $containers[0]['idcontainer']);

        $this->assertEquals('First Container', $containers[2]['name']);
        $this->assertEquals('MySecondContainer', $containers[1]['name']);
        $this->assertEquals('My Third Container', $containers[0]['name']);

        $this->assertEquals(ContainersDao::STATUS_DELETED, $containers[1]['status']);
    }

    public function test_getActiveContainersInfo_shouldReturnEmptyArray_WhenThereAreNoContainers()
    {
        $containers = $this->dao->getActiveContainersInfo();
        $this->assertSame(array(), $containers);
    }

    public function test_getActiveContainersInfo_shouldReturnAllExistingContainersButNotDisabled()
    {
        $idContainer1 = $this->createContainer($idSite = 3, $idContainer = 'abcdef', 'First Container');
        $idContainer2 = $this->createContainer($idSite = 3, $idContainer = 'abcdee', 'MySecondContainer');
        $idContainer3 = $this->createContainer($idSite = 4, $idContainer = 'abcddd', 'My Third Container');

        $containers = $this->dao->getActiveContainersInfo();
        $this->assertCount(3, $containers);

        $this->dao->deleteContainer($idSite = 3, $idContainer2, $this->now);

        $containers = $this->dao->getActiveContainersInfo();
        $this->assertCount(2, $containers);
        $this->assertEquals($idContainer1, $containers[1]['idcontainer']);
        $this->assertEquals($idContainer3, $containers[0]['idcontainer']);

        $this->assertEquals($idContainer1, $containers[1]['idcontainer']);
        $this->assertEquals($idContainer3, $containers[0]['idcontainer']);
    }

    public function test_getNumContainersTotal_shouldReturnZero_WhenThereAreNoContainers()
    {
        $this->assertSame(0, $this->dao->getNumContainersTotal());
    }

    public function test_getNumContainersTotal_shouldReturnCountAllExistingContainersAcrossSites()
    {
        $this->createContainer($idSite = 3, $idContainer = 'abcdef', 'First Container');
        $this->assertSame(1, $this->dao->getNumContainersTotal());

        $idContainer2 = $this->createContainer($idSite = 3, $idContainer = 'abcdee', 'MySecondContainer');
        $this->assertSame(2, $this->dao->getNumContainersTotal());

        $this->createContainer($idSite = 4, $idContainer = 'abcddd', 'My Third Container');
        $this->assertSame(3, $this->dao->getNumContainersTotal());

        $this->dao->deleteContainer($idSite = 3, $idContainer2, $this->now);

        $this->assertSame(2, $this->dao->getNumContainersTotal());
    }

    public function test_getNumContainersInSite_shouldReturnZero_WhenThereAreNoContainers()
    {
        $this->assertSame(0, $this->dao->getNumContainersInSite(2));
    }

    public function test_getNumContainersInSite_shouldReturnCountAllExistingContainersAcrossSites()
    {
        $this->createContainer($idSite = 3, $idContainer = 'abcdef', 'First Container');
        $this->assertSame(1, $this->dao->getNumContainersInSite($idSite = 3));
        $this->assertSame(0, $this->dao->getNumContainersInSite($idSite = 4));

        $idContainer2 = $this->createContainer($idSite = 3, $idContainer = 'abcdee', 'MySecondContainer');
        $this->assertSame(2, $this->dao->getNumContainersInSite($idSite = 3));
        $this->assertSame(0, $this->dao->getNumContainersInSite($idSite = 4));

        $this->createContainer($idSite = 4, $idContainer = 'abcddd', 'My Third Container');
        $this->assertSame(2, $this->dao->getNumContainersInSite($idSite = 3));
        $this->assertSame(1, $this->dao->getNumContainersInSite($idSite = 4));

        $this->dao->deleteContainer($idSite = 3, $idContainer2, $this->now);

        $this->assertSame(1, $this->dao->getNumContainersInSite($idSite = 3));
        $this->assertSame(1, $this->dao->getNumContainersInSite($idSite = 4));
    }

    public function test_hasContainer_shouldReturnZero_WhenThereAreNoContainers()
    {
        $this->assertFalse($this->dao->hasContainer('foobar'));
    }

    public function test_hasContainer_shouldCheckAcrossSitesAndIncludeDeleted()
    {
        $idContainer1 = 'abcdef';
        $idContainer2 = 'abcddd';

        $this->createContainer($idSite = 3, $idContainer1, 'First Container');
        $this->assertTrue($this->dao->hasContainer($idContainer1));
        $this->assertFalse($this->dao->hasContainer($idContainer2));

        $this->createContainer($idSite = 4, $idContainer2, 'My Third Container');

        $this->assertTrue($this->dao->hasContainer($idContainer1));
        $this->assertTrue($this->dao->hasContainer($idContainer2));

        $this->dao->deleteContainer($idSite = 4, $idContainer2, $this->now);

        // make sure container 2 is deleted
        $this->assertEmpty($this->dao->getContainer($idSite = 4, $idContainer2));

        $this->assertTrue($this->dao->hasContainer($idContainer1));
        $this->assertTrue($this->dao->hasContainer($idContainer2));
    }

    public function test_getContainers()
    {
        $this->assertSame(array(), $this->dao->getContainersForSite($idSite = 3));
        $this->assertSame(array(), $this->dao->getContainersForSite($idSite = 4));

        $idContainer1 = $this->createContainer($idSite = 3, $idContainer = 'abcdef', 'First Container');
        $idContainer2 = $this->createContainer($idSite = 3, $idContainer = 'abcddd', 'MySecondContainer');
        $idContainer3 = $this->createContainer($idSite = 4, $idContainer = 'abcccc', 'My Third Container');

        $containers = $this->dao->getContainersForSite($idSite = 999);
        $this->assertEquals(array(), $containers);

        $containers3 = $this->dao->getContainersForSite($idSite = 3);
        $containers4 = $this->dao->getContainersForSite($idSite = 4);

        $this->assertCount(2, $containers3);
        $this->assertCount(1, $containers4);

        $this->assertSame($idContainer1, $containers3[0]['idcontainer']);
        $this->assertSame(3, $containers3[0]['idsite']);

        $this->assertSame($idContainer2, $containers3[1]['idcontainer']);
        $this->assertSame(3, $containers3[1]['idsite']);

        $this->assertSame($idContainer3, $containers4[0]['idcontainer']);
        $this->assertSame(4, $containers4[0]['idsite']);

        // ignores deleted status, was before 2 containers
        $this->dao->deleteContainer($idSite = 3, $idContainer1, $this->now);
        $containers3 = $this->dao->getContainersForSite($idSite = 3);
        $this->assertCount(1, $containers3);
    }

    public function test_deleteContainersForSite_givenSiteHasNoContainers_shouldNotFail()
    {
        $this->dao->deleteContainersForSite($idSite = 3, $this->now);
        $this->assertSame(array(), $this->dao->getContainersForSite($idSite = 3));
    }

    public function test_deleteContainersForSite_shouldOnlyDeleteContainersThatBelongToGivenSite()
    {
        $this->createContainer($idSite = 3, $idContainer = 'abcdef', 'First Container');
        $this->createContainer($idSite = 3, $idContainer = 'abcdee', 'MySecondContainer');
        $this->createContainer($idSite = 4, $idContainer = 'abcddd', 'My Third container');

        $this->assertCount(2, $this->dao->getContainersForSite($idSite = 3));
        $this->assertCount(1, $this->dao->getContainersForSite($idSite = 4));

        $this->dao->deleteContainersForSite($idSite = 3, $this->now);

        $this->assertSame(array(), $this->dao->getContainersForSite($idSite = 3));
        $this->assertCount(1, $this->dao->getContainersForSite($idSite = 4));

        // should not actually delete them but set a soft delete flag
        $containers = $this->dao->getAllContainers();
        $this->assertCount(3, $containers);

        // sets deleted date
        $this->assertSame($this->now, $containers[2]['deleted_date']);
        $this->assertSame(ContainersDao::STATUS_DELETED, $containers[2]['status']);
        $this->assertSame(ContainersDao::STATUS_DELETED, $containers[1]['status']);
        $this->assertSame(ContainersDao::STATUS_ACTIVE, $containers[0]['status']);
    }

    public function test_deleteContainer_shouldOnlyDeleteGivenContainer()
    {
        $this->assertSame(array(), $this->dao->getAllContainers());

        $idContainer1 = $this->createContainer($idSite = 3, $idContainer = 'abcdef', 'First Container');
        $idContainer2 = $this->createContainer($idSite = 3, $idContainer = 'abcdee', 'MySecondContainer');
        $idContainer3 = $this->createContainer($idSite = 4, $idContainer = 'abcddd', 'My Third Container');

        $this->assertCount(3, $this->dao->getAllContainers());
        foreach ($this->dao->getAllContainers() as $container) {
            $this->assertSame(ContainersDao::STATUS_ACTIVE, $container['status']);
        }

        // should not delete anything when no container matches
        $this->dao->deleteContainer($idSite = 99, $idContainer2, $this->now);
        $this->dao->deleteContainer($idSite = 4, $idContainer2, $this->now);
        $this->dao->deleteContainer($idSite = 3, 999, $this->now);

        // verify nothing deleted
        $this->assertCount(3, $this->dao->getAllContainers());
        foreach ($this->dao->getAllContainers() as $container) {
            $this->assertSame(ContainersDao::STATUS_ACTIVE, $container['status']);
        }

        // now actually delete a container
        $this->dao->deleteContainer($idSite = 3, $idContainer2, $this->now);

        // verify deleted
        $containers = $this->dao->getAllContainers();
        $this->assertCount(3, $containers);
        $this->assertSame(ContainersDao::STATUS_ACTIVE, $containers[0]['status']);
        $this->assertSame(null, $containers[0]['deleted_date']);
        $this->assertSame(ContainersDao::STATUS_DELETED, $containers[1]['status']);
        $this->assertSame($this->now, $containers[1]['deleted_date']);
        $this->assertSame(ContainersDao::STATUS_ACTIVE, $containers[2]['status']);
        $this->assertSame(null, $containers[2]['deleted_date']);
    }

    private function createContainer($idSite = 1, $idContainer = 'abcdef', $name = 'FooContainer', $ignoreGtmDataLayer = 0, $isTagFireLimitAllowedInPreviewMode = 0, $activelySyncGtmDataLayer = 0)
    {
        $context = WebContext::ID;
        $description = 'My description';
        $createdDate = $this->now;

        $idContainer = $this->dao->createContainer($idSite, $idContainer, $context, $name, $description, $createdDate, $ignoreGtmDataLayer, $isTagFireLimitAllowedInPreviewMode, $activelySyncGtmDataLayer);

        return $idContainer;
    }
}
