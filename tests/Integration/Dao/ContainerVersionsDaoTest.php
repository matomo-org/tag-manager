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
use Piwik\Plugins\TagManager\Dao\ContainerVersionsDao;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * @group TagManager
 * @group ContainerVersionsDao
 * @group ContainerVersionsDaoTest
 * @group Plugins
 */
class ContainerVersionsDaoTest extends IntegrationTestCase
{

    /**
     * @var ContainerVersionsDao
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

        $this->dao = new ContainerVersionsDao();
        $this->tableName = Common::prefixTable('tagmanager_container_version');
    }

    public function test_shouldInstallTable()
    {
        $columns = DbHelper::getTableColumns($this->tableName);
        $columns = array_keys($columns);
        $columnsToCheck = array('idcontainerversion', 'idcontainer', 'idsite', 'status', 'revision', 'name', 'description', 'created_date', 'updated_date', 'deleted_date');

        $this->assertEquals($columnsToCheck, $columns);
    }

    public function test_shouldBeAbleToUninstallVersionTable()
    {
        $this->expectException(\Zend_Db_Statement_Exception::class);
        $this->expectExceptionMessage('tagmanager_container_version');

        $this->dao->uninstall();

        try {
            DbHelper::getTableColumns($this->tableName);
            $this->fail('Did not uninstall tagmanager_container_version table');
        } catch (\Zend_Db_Statement_Exception $e) {
            $this->dao->install();
            throw $e;
        }

        $this->dao->install();
    }

    public function test_createDraftVersion()
    {
        $idSite = 2;
        $idContainer = 'abcdef';
        $createdDate = $this->now;

        $idVersion = $this->dao->createDraftVersion($idSite, $idContainer, $createdDate);
        $this->assertSame(1, $idVersion);

        $version = $this->dao->getVersion($idSite, $idContainer, $idVersion);
        $this->assertEquals(array(
            'idcontainerversion' => $idVersion,
            'idcontainer' => $idContainer,
            'idsite' => $idSite,
            'status' => ContainerVersionsDao::STATUS_ACTIVE,
            'revision' => 0,
            'name' => '',
            'description' => '',
            'created_date' => $createdDate,
            'updated_date' => $createdDate,
            'deleted_date' => null,
        ), $version);
    }

    public function test_createDraftVersionTwiceFails()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('A draft version for this container already exists');

        $idSite = 2;
        $idContainer = 'abcdef';
        $createdDate = $this->now;

        $idVersion = $this->dao->createDraftVersion($idSite, $idContainer, $createdDate);
        $this->assertSame(1, $idVersion);

        $this->dao->createDraftVersion($idSite, $idContainer, $createdDate);
    }

    public function test_createVersion()
    {
        $idSite = 2;
        $idContainer = 'abcdef';
        $name = 'My Name';
        $description = 'foobar';
        $createdDate = $this->now;

        $idVersion = $this->dao->createVersion($idSite, $idContainer, $name, $description, $createdDate);
        $this->assertSame(1, $idVersion);

        $version = $this->dao->getVersion($idSite, $idContainer, $idVersion);
        $this->assertEquals(array(
            'idcontainerversion' => $idVersion,
            'idcontainer' => $idContainer,
            'idsite' => $idSite,
            'status' => ContainerVersionsDao::STATUS_ACTIVE,
            'revision' => 1,
            'name' => $name,
            'description' => $description,
            'created_date' => $createdDate,
            'updated_date' => $createdDate,
            'deleted_date' => null,
        ), $version);
    }

    public function test_createVersion_increasedIdVersion()
    {
        $idVersion = $this->createVersion($idSite = 3);
        $this->assertEquals(1, $idVersion);

        $idVersion = $this->createVersion($idSite = 3, $idContainer = 'abcdef', 'NameThree');
        $this->assertEquals(2, $idVersion);
    }

    public function test_createVersion_increasesRevision()
    {
        $idContainer = 'abcdef';
        $idVersion = $this->createVersion($idSite = 3, $idContainer, 'NameOne');
        $version = $this->dao->getVersion($idSite, $idContainer, $idVersion);
        $this->assertSame(1, $version['revision']);

        $idVersion = $this->createVersion($idSite = 3, $idContainer, 'NameTwo');
        $version = $this->dao->getVersion($idSite, $idContainer, $idVersion);
        $this->assertSame(2, $version['revision']);

        $idVersion = $this->createVersion($idSite = 3, 'abcddd', 'NameTwo');
        $version = $this->dao->getVersion($idSite, 'abcddd', $idVersion);
        $this->assertSame(1, $version['revision']);

        $idVersion = $this->createVersion($idSite = 3, $idContainer, 'NameThree');
        $version = $this->dao->getVersion($idSite, $idContainer, $idVersion);
        $this->assertSame(3, $version['revision']);

        $idVersion = $this->createVersion($idSite = 4, $idContainer, 'NameThree');
        $version = $this->dao->getVersion($idSite, $idContainer, $idVersion);
        $this->assertSame(1, $version['revision']);
    }

    public function test_createVersion_failsToInsertSameNameTwice()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('TagManager_ErrorNameDuplicate');

        $idVersion = $this->createVersion($idSite = 3);
        $this->assertEquals(1, $idVersion);

        $this->createVersion($idSite = 3);
    }

    public function test_createVersion_possibleToUseSameNameForDifferentSites()
    {
        $idVersion = $this->createVersion($idSite = 3);
        $this->assertEquals(1, $idVersion);

        $idVersion = $this->createVersion($idSite = 2);
        $this->assertEquals(2, $idVersion);
    }

    public function test_createVersion_possibleToUseSameNameForDifferentContainerVersions()
    {
        $idVersion = $this->createVersion($idSite = 3, $idContainer = 'abcdef');
        $this->assertEquals(1, $idVersion);

        $idVersion = $this->createVersion($idSite = 3, $idContainer = 'foobar');
        $this->assertEquals(2, $idVersion);
    }

    public function test_createVersion_possibleToUseSameNameAfterDeletingOtherVersion()
    {
        $idSite = 3;
        $idContainer = 'abcdef';
        $name = 'myname';
        $idVersion = $this->createVersion($idSite, $idContainer, $name);
        $this->assertEquals(1, $idVersion);

        $this->dao->deleteVersion($idSite, $idVersion, $this->now);

        $idVersion = $this->createVersion($idSite, $idContainer, $name);
        $this->assertEquals(2, $idVersion);

        $all = $this->dao->getAllVersions();
        $this->assertCount(2, $all);
        foreach ($all as $entry) {
            $this->assertSame($name, $entry['name']);
        }
    }


    public function test_updateVersion_failsToSetNameAlreadyInUseByOtherVersion()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('TagManager_ErrorNameDuplicate');

        $idSite = 3;
        $idContainer = 'abcdef';
        $name = 'myname';
        $idVersion = $this->createVersion($idSite, $idContainer, $name);
        $this->assertEquals(1, $idVersion);

        $idVersion = $this->createVersion($idSite, $idContainer, 'myname2');
        $this->assertEquals(2, $idVersion);

        $this->dao->updateContainerColumns($idSite, $idContainer, $idVersion, array(
            'name' => $name
        ));
    }

    public function test_updateVersion_succeedsToSetSameNameThatIsUsedAlreadyByThisVersion()
    {
        $idSite = 3;
        $idContainer = 'abcdef';
        $name = 'myname2';
        $idVersion = $this->createVersion($idSite, $idContainer, 'myname');
        $this->assertEquals(1, $idVersion);

        $idVersion = $this->createVersion($idSite, $idContainer, $name);
        $this->assertEquals(2, $idVersion);

        $this->dao->updateContainerColumns($idSite, $idContainer, $idVersion, array(
            'name' => $name
        ));
    }

    public function test_getNextRevisionOfContainer_noContainerVersionExists()
    {
        $this->assertSame(1, $this->dao->getNextRevisionOfContainer($idSite = 3, $idContainer = 'abcdef'));
    }

    public function test_getNextRevisionOfContainer_ContainerVersionExists()
    {
        $idContainer = 'abcdef';
        $this->createVersion($idSite = 3, $idContainer);
        $this->assertSame(2, $this->dao->getNextRevisionOfContainer($idSite = 3, $idContainer));

        $this->createVersion($idSite = 3, $idContainer, 'myname2');
        $this->assertSame(3, $this->dao->getNextRevisionOfContainer($idSite = 3, $idContainer));
    }

    public function test_updateVersionColumns_doesNotFailWhenNoColumsAreToBeUpdated()
    {
        $idVersion = $this->createVersion($idSite = 3);

        $this->dao->updateContainerColumns($idSite, $idContainerVersion = 5, $idVersion, array());

        $this->assertTrue(true);
    }

    public function test_updateVersionColumns_updatesASingleColumn()
    {
        $idVersion = $this->createVersion($idSite = 3, $idContainer = 'abcdef');

        $version = $this->dao->getVersion($idSite = 3, $idContainer, $idVersion);
        $this->assertSame('FooVersion', $version['name']);

        $this->dao->updateContainerColumns($idSite = 3, $idContainer, $idVersion, array('name' => 'foobarbaz'));

        $versions = $this->dao->getAllVersions();
        $this->assertSame($idVersion, $versions[0]['idcontainerversion']);
        $this->assertSame($idSite, $versions[0]['idsite']);
        $this->assertSame('foobarbaz', $versions[0]['name']);
    }

    public function test_updateVersionColumns_updatesSeveralFieldsAndEncodesWhereNeeded()
    {
        $idContainer = 'abcdef';
        $idVersion = $this->createVersion($idSite = 4, $idContainer);

        $columns = array(
            'name' => 'My Changed Name',
            'description' => 'changedDesc',
            'updated_date' => '2016-01-02 03:04:05'
        );
        $this->dao->updateContainerColumns($idSite = 4, $idContainer, $idVersion, $columns);

        $version = $this->dao->getVersion($idSite, $idContainer, $idVersion);
        $this->assertEquals(array(
            'idcontainerversion' => $idVersion,
            'idcontainer' => $idContainer,
            'idsite' => $idSite,
            'name' => 'My Changed Name',
            'description' => 'changedDesc',
            'revision' => '1',
            'created_date' => $this->now,
            'updated_date' => '2016-01-02 03:04:05',
            'deleted_date' => null,
            'status' => ContainerVersionsDao::STATUS_ACTIVE,
        ), $version);
    }

    public function test_getContainerVersion_shouldNotFindAnythingWhenNoVersionExists()
    {
        $this->assertFalse($this->dao->getVersion($idSite = 3, $idContainer = 'abcdef', $idVersion = 4));
    }

    public function test_getContainerVersion_shouldNotFindAnythingWhenNoVersionMatchesThisCriteria()
    {
        $idVersion = $this->createVersion($idSite = 4, $idContainer = 'abcdef');
        $this->assertFalse($this->dao->getVersion($idSite = 2, $idContainer = 'abcdef', $idVersion));
        $this->assertFalse($this->dao->getVersion($idSite = 4, $idContainer = 'abcddd', $idVersion = 66));
        $this->assertFalse($this->dao->getVersion($idSite = 4, $idContainer = 'abcdef', $idVersion = 66));
    }

    public function test_getContainerVersion_shouldReturnVersionWhenItExists_andEncodeFields()
    {
        $idVersion = $this->createVersion($idSite = 4, $idContainer = 'abcdef', 'Test name');

        $version = $this->dao->getVersion($idSite, $idContainer, $idVersion);
        $this->assertEquals(array(
            'idcontainerversion' => $idVersion,
            'idcontainer' => $idContainer,
            'idsite' => $idSite,
            'name' => 'Test name',
            'description' => 'foobar',
            'revision' => '1',
            'created_date' => $this->now,
            'updated_date' => $this->now,
            'deleted_date' => null,
            'status' => ContainerVersionsDao::STATUS_ACTIVE,
        ), $version);
    }

    public function test_getContainerVersion_shouldNotReturnDeletedVersion()
    {
        $idVersion = $this->createVersion($idSite = 4, $idContainer = 'abcdef', 'Test name');

        $version = $this->dao->getVersion($idSite, $idContainer, $idVersion);
        $this->assertSame('Test name', $version['name']);

        $this->dao->deleteVersion($idSite, $idVersion, $this->now);

        $version = $this->dao->getVersion($idSite, $idContainer, $idVersion);
        $this->assertEmpty($version);
    }

    public function test_getAllVersions_shouldReturnEmptyArray_WhenThereAreNoVersions()
    {
        $versions = $this->dao->getAllVersions();
        $this->assertSame(array(), $versions);
    }

    public function test_getAllVersions_shouldReturnAllExistingVersions_EvenDisabled()
    {
        $idVersion1 = $this->createVersion($idSite = 3, $idContainer = 'abcdef', 'First Version');
        $idVersion2 = $this->createVersion($idSite = 3, $idContainer = 'abcdef', 'MySecondVersion');
        $idVersion3 = $this->createVersion($idSite = 4, $idContainer = 'abcdef', 'My Third Version');
        $this->dao->deleteVersion($idSite = 3, $idVersion2, $this->now);

        $versions = $this->dao->getAllVersions();
        $this->assertCount(3, $versions);
        $this->assertEquals($idVersion1, $versions[0]['idcontainerversion']);
        $this->assertEquals($idVersion2, $versions[1]['idcontainerversion']);
        $this->assertEquals($idVersion3, $versions[2]['idcontainerversion']);

        $this->assertEquals('First Version', $versions[0]['name']);
        $this->assertEquals('MySecondVersion', $versions[1]['name']);
        $this->assertEquals('My Third Version', $versions[2]['name']);

        $this->assertEquals(ContainerVersionsDao::STATUS_DELETED, $versions[1]['status']);
    }

    public function test_getVersionsOfContainer()
    {
        $this->assertSame(array(), $this->dao->getVersionsOfContainer($idSite = 3, $idContainerVersion = 4));
        $this->assertSame(array(), $this->dao->getVersionsOfContainer($idSite = 3, $idContainerVersion = 5));
        $this->assertSame(array(), $this->dao->getVersionsOfContainer($idSite = 4, $idContainerVersion = 5));

        $idVersion1 = $this->createVersion($idSite = 3, $idContainer = 'abcdef', 'First Version');
        $idVersion2 = $this->createVersion($idSite = 3, $idContainer = 'abcdef', 'MySecondVersion');
        $idVersion3 = $this->createVersion($idSite = 4, $idContainer = 'abcdef', 'My Third Version');

        $versions3 = $this->dao->getVersionsOfContainer($idSite = 3, 'foobar');
        $this->assertEquals(array(), $versions3);

        $versions3 = $this->dao->getVersionsOfContainer($idSite = 3, $idContainer);
        $versions4 = $this->dao->getVersionsOfContainer($idSite = 4, $idContainer);

        $this->assertCount(2, $versions3);
        $this->assertCount(1, $versions4);

        $this->assertSame(array(), $this->dao->getVersionsOfContainer($idSite = 99, $idContainer));

        // sorts by revision desc
        $this->assertSame($idVersion2, $versions3[0]['idcontainerversion']);
        $this->assertSame(3, $versions3[0]['idsite']);

        $this->assertSame($idVersion1, $versions3[1]['idcontainerversion']);
        $this->assertSame(3, $versions3[1]['idsite']);

        $this->assertSame($idVersion3, $versions4[0]['idcontainerversion']);
        $this->assertSame(4, $versions4[0]['idsite']);

        // ignores deleted status, was before 2 versions
        $this->dao->deleteVersion($idSite = 3, $idVersion1, $this->now);
        $versions3 = $this->dao->getVersionsOfContainer($idSite = 3, $idContainer);
        $this->assertCount(1, $versions3);
    }

    public function test_deleteVersionsForSite_givenSiteHasNoVersions_shouldNotFail()
    {
        $this->dao->deleteAllVersionsForSite($idSite = 3, $this->now);
        $this->assertSame(array(), $this->dao->getVersionsOfContainer($idSite = 3, 'foobar'));
    }

    public function test_deleteVersionsForSite_shouldOnlyDeleteVersionsThatBelongToGivenSite()
    {
        $this->createVersion($idSite = 3, $idContainerVersion = 5, 'First Version');
        $this->createVersion($idSite = 3, $idContainerVersion = 5, 'MySecondVersion');
        $this->createVersion($idSite = 4, $idContainerVersion = 5, 'My Third version');

        $this->assertCount(2, $this->dao->getVersionsOfContainer($idSite = 3, $idContainerVersion = 5));
        $this->assertCount(1, $this->dao->getVersionsOfContainer($idSite = 4, $idContainerVersion = 5));

        $this->dao->deleteAllVersionsForSite($idSite = 3, $this->now);

        $this->assertSame(array(), $this->dao->getVersionsOfContainer($idSite = 3, $idContainerVersion));
        $this->assertCount(1, $this->dao->getVersionsOfContainer($idSite = 4, $idContainerVersion));

        // should not actually delete them but set a soft delete flag
        $versions = $this->dao->getAllVersions();
        $this->assertCount(3, $versions);

        // sets deleted date
        $this->assertSame($this->now, $versions[0]['deleted_date']);
        $this->assertSame(ContainerVersionsDao::STATUS_DELETED, $versions[0]['status']);
        $this->assertSame(ContainerVersionsDao::STATUS_DELETED, $versions[1]['status']);
        $this->assertSame(ContainerVersionsDao::STATUS_ACTIVE, $versions[2]['status']);
    }

    public function test_deleteContainerVersion_shouldOnlyDeleteGivenVersion()
    {
        $this->assertSame(array(), $this->dao->getAllVersions());

        $idVersion1 = $this->createVersion($idSite = 3, $idContainer = 'foobar', 'First Version');
        $idVersion2 = $this->createVersion($idSite = 3, $idContainer = 'foobar', 'MySecondVersion');
        $idVersion3 = $this->createVersion($idSite = 4, $idContainer = 'bazbar', 'My Third Version');

        $this->assertCount(3, $this->dao->getAllVersions());
        foreach ($this->dao->getAllVersions() as $version) {
            $this->assertSame(ContainerVersionsDao::STATUS_ACTIVE, $version['status']);
        }

        // should not delete anything when no version matches
        $this->dao->deleteVersion($idSite = 99, $idContainer = 'foobar', $this->now);
        $this->dao->deleteVersion($idSite = 4, $idContainer = 'foobar', $this->now);
        $this->dao->deleteVersion($idSite = 3, $idContainer = 'bazbar', $this->now);

        // verify nothing deleted
        $this->assertCount(3, $this->dao->getAllVersions());
        foreach ($this->dao->getAllVersions() as $version) {
            $this->assertSame(ContainerVersionsDao::STATUS_ACTIVE, $version['status']);
        }

        // now actually delete a version
        $this->dao->deleteVersion($idSite = 3, $idVersion2, $this->now);

        // verify deleted
        $versions = $this->dao->getAllVersions();
        $this->assertCount(3, $versions);
        $this->assertSame(ContainerVersionsDao::STATUS_ACTIVE, $versions[0]['status']);
        $this->assertSame(null, $versions[0]['deleted_date']);
        $this->assertSame(ContainerVersionsDao::STATUS_DELETED, $versions[1]['status']);
        $this->assertSame($this->now, $versions[1]['deleted_date']);
        $this->assertSame(ContainerVersionsDao::STATUS_ACTIVE, $versions[2]['status']);
        $this->assertSame(null, $versions[2]['deleted_date']);
    }

    private function createVersion($idSite = 1, $idContainer = 'abcdef', $name = 'FooVersion')
    {
        $description = 'foobar';
        $createdDate = $this->now;

        $idVersion = $this->dao->createVersion($idSite, $idContainer, $name, $description, $createdDate);

        return $idVersion;
    }


}
