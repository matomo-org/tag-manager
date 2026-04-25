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
use Piwik\Plugins\TagManager\Dao\ContainerReleaseDao;
use Piwik\Plugins\TagManager\Dao\ContainersDao;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * @group TagManager
 * @group ContainerReleaseDao
 * @group ContainerReleaseDaoTest
 * @group Plugins
 */
class ContainerReleaseDaoTest extends IntegrationTestCase
{
    /**
     * @var ContainerReleaseDao
     */
    private $dao;

    /**
     * @var ContainersDao
     */
    private $containerDao;

    /**
     * @var string
     */
    private $tableName;

    private $now = '2015-01-01 01:02:03';

    public function setUp(): void
    {
        parent::setUp();

        $this->dao = new ContainerReleaseDao();
        $this->containerDao = new ContainersDao();
        $this->tableName = Common::prefixTable('tagmanager_container_release');
    }

    public function test_shouldInstallTable()
    {
        $columns = DbHelper::getTableColumns($this->tableName);
        $columns = array_keys($columns);
        $columnsToCheck = array('idcontainerrelease', 'idcontainer', 'idcontainerversion', 'idsite', 'status', 'environment', 'release_login', 'release_date', 'deleted_date');

        $this->assertSame($columnsToCheck, $columns);
    }

    public function test_shouldBeAbleToUninstallReleaseTable()
    {
        $this->expectException(\Zend_Db_Statement_Exception::class);
        $this->expectExceptionMessage('tagmanager_container_release');

        $this->dao->uninstall();

        try {
            DbHelper::getTableColumns($this->tableName);
            $this->fail('Did not uninstall container release table');
        } catch (\Zend_Db_Statement_Exception $e) {
            $this->dao->install();
            throw $e;
        }

        $this->dao->install();
    }

    public function test_releaseVersion()
    {
        $idSite = 2;
        $idContainer = 'A68AGI3Z';
        $idContainerVersion = 3;
        $environment = 'live';
        $releaseLogin = 'myuser';

        $idRelease = $this->dao->releaseVersion($idSite, $idContainer, $idContainerVersion, $environment, $releaseLogin, $this->now);
        $this->assertSame(1, $idRelease);

        $release = $this->dao->getReleaseForContainerVersion($idSite, $idContainer, $environment);
        $this->assertEquals(array(
            'idcontainerrelease' => 1,
            'idcontainer' => $idContainer,
            'idcontainerversion' => $idContainerVersion,
            'idsite' => $idSite,
            'environment' => $environment,
            'release_login' => $releaseLogin,
            'release_date' => $this->now,
            'deleted_date' => null,
            'status' => ContainerReleaseDao::STATUS_ACTIVE,
        ), $release);
    }

    public function test_releaseVersion_deletesPreviousReleaseWhenDuplicate()
    {
        $idSite = 2;
        $idContainer = 'A68AGI3Z';
        $idContainerVersion = 3;
        $environment = 'live';
        $releaseLogin = 'myuser';
        $context = 'web';
        $name = 'foobar';
        $description = 'baz';
        $createdDate = $this->now;

        $this->containerDao->createContainer($idSite, $idContainer, $context, $name, $description, $createdDate, 0, 0, 0);
        $idRelease = $this->dao->releaseVersion($idSite, $idContainer, $idContainerVersion, $environment, $releaseLogin, $this->now);
        $this->assertSame(1, $idRelease);

        $this->assertCount(1, $this->dao->getAllReleasedContainers());
        $this->assertCount(1, $this->dao->getAllReleases());

        $idContainerVersion++;
        $releaseDate = '2016-04-04 05:06:07';
        $idRelease = $this->dao->releaseVersion($idSite, $idContainer, $idContainerVersion, $environment, $releaseLogin, $releaseDate);
        $this->assertSame(2, $idRelease);

        $this->assertCount(1, $this->dao->getAllReleasedContainers());
        $this->assertCount(2, $this->dao->getAllReleases());

        $release = $this->dao->getAllReleases();
        $this->assertEquals(
            array(
                array(
            'idcontainerrelease' => 1,
            'idcontainer' => $idContainer,
            'idcontainerversion' => 3,
            'idsite' => $idSite,
            'environment' => $environment,
            'release_login' => $releaseLogin,
            'release_date' => $this->now,
            'deleted_date' => $releaseDate,
            'status' => ContainerReleaseDao::STATUS_DELETED,
            ),   array(
                'idcontainerrelease' => 2,
                'idcontainer' => $idContainer,
                'idcontainerversion' => 4,
                'idsite' => $idSite,
                'environment' => $environment,
                'release_login' => $releaseLogin,
                'release_date' => $releaseDate,
                'deleted_date' => null,
                'status' => ContainerReleaseDao::STATUS_ACTIVE,
            )
            ),
            $release
        );
    }

    public function test_releaseVersion_createsTwoDifferentReleasesForDifferentEnvironment()
    {
        $idSite = 2;
        $idContainer = 'A68AGI3Z';
        $idContainerVersion = 3;
        $environment = 'live';
        $releaseLogin = 'myuser';
        $context = 'web';
        $name = 'foobar';
        $description = 'baz';
        $createdDate = $this->now;

        $this->containerDao->createContainer($idSite, $idContainer, $context, $name, $description, $createdDate, 1, 1, 1);

        $idRelease = $this->dao->releaseVersion($idSite, $idContainer, $idContainerVersion, $environment, $releaseLogin, $this->now);
        $this->assertSame(1, $idRelease);

        $this->assertCount(1, $this->dao->getAllReleasedContainers());
        $this->assertCount(1, $this->dao->getAllReleases());

        $releaseDate = '2016-04-04 05:06:07';
        $environment2 = 'foobar';
        $idRelease = $this->dao->releaseVersion($idSite, $idContainer, $idContainerVersion, $environment2, $releaseLogin, $releaseDate);
        $this->assertSame(2, $idRelease);

        $this->assertCount(1, $this->dao->getAllReleasedContainers());
        $this->assertCount(2, $this->dao->getAllReleases());

        $release = $this->dao->getAllReleases();
        $this->assertEquals(
            array(
                array(
            'idcontainerrelease' => 1,
            'idcontainer' => $idContainer,
            'idcontainerversion' => $idContainerVersion,
            'idsite' => $idSite,
            'environment' => $environment,
            'release_login' => $releaseLogin,
            'release_date' => $this->now,
            'deleted_date' => null,
            'status' => ContainerReleaseDao::STATUS_ACTIVE,
            ),   array(
                'idcontainerrelease' => 2,
                'idcontainer' => $idContainer,
                'idcontainerversion' => $idContainerVersion,
                'idsite' => $idSite,
                'environment' => $environment2,
                'release_login' => $releaseLogin,
                'release_date' => $releaseDate,
                'deleted_date' => null,
                'status' => ContainerReleaseDao::STATUS_ACTIVE,
            )
            ),
            $release
        );
    }

    public function test_createRelease_increasedIdRelease()
    {
        $idRelease = $this->createRelease($idSite = 3);
        $this->assertEquals(1, $idRelease);

        $idRelease = $this->createRelease($idSite = 3, $idContainerVersion = 5, 'AbcDef');
        $this->assertEquals(2, $idRelease);
    }

    public function test_getReleaseForContainerVersion_shouldNotFindAnythingWhenNoReleaseExists()
    {
        $this->assertFalse($this->dao->getReleaseForContainerVersion($idSite = 3, $idContainer = 'AbcDef', 'live'));
    }

    public function test_getReleaseForContainerVersion_shouldNotFindAnythingWhenNoReleaseMatchesThisCriteria()
    {
        $idRelease = $this->createRelease($idSite = 4, $idContainerVersion = 99);
        $this->assertFalse($this->dao->getReleaseForContainerVersion($idSite = 2, $idContainer = 'AbcDef', 'bar'));
        $this->assertFalse($this->dao->getReleaseForContainerVersion($idSite = 4, $idContainer = 'AbcDef', 'foo'));
    }

    public function test_getReleaseForContainerVersion_shouldReturnReleaseWhenItExists_andEncodeFields()
    {
        $idRelease1 = $this->createRelease($idSite = 4, $idContainerVersion = 92, 'AbcDef', 'foobar');
        $idRelease2 = $this->createRelease($idSite = 4, $idContainerVersion = 92, 'AbcDef');
        $idRelease3 = $this->createRelease($idSite = 4, $idContainerVersion = 92, 'AbcDeg');

        $release = $this->dao->getReleaseForContainerVersion($idSite, 'AbcDef', 'live');
        $this->assertEquals(array(
            'idcontainerrelease' => 2,
            'idcontainer' => 'AbcDef',
            'idcontainerversion' => $idContainerVersion,
            'idsite' => $idSite,
            'environment' => 'live',
            'release_login' => 'myuser',
            'release_date' => $this->now,
            'deleted_date' => null,
            'status' => ContainerReleaseDao::STATUS_ACTIVE,
        ), $release);
    }

    public function test_getContainerRelease_shouldNotReturnDeletedRelease()
    {
        $idRelease1 = $this->createRelease($idSite = 4, $idContainerVersion = 92, 'AbcDef', 'foobar');

        $release = $this->dao->getReleaseForContainerVersion($idSite, 'AbcDef', 'foobar');
        $this->assertSame('foobar', $release['environment']);

        $this->dao->deleteAllVersionsForRelease($idSite, 'AbcDef', 'foobar', $this->now);

        $release = $this->dao->getReleaseForContainerVersion($idSite, 'AbcDef', 'foobar');
        $this->assertEmpty($release);
    }

    public function test_getAllReleases_shouldReturnEmptyArray_WhenThereAreNoReleases()
    {
        $releases = $this->dao->getAllReleasedContainers();
        $this->assertSame(array(), $releases);
    }

    public function test_getAllReleases_shouldReturnAllExistingReleases_EvenDisabled()
    {
        $idRelease1 = $this->createRelease($idSite = 3, $idContainerVersion = 5, 'abCdef', 'FirstRel');
        $idRelease2 = $this->createRelease($idSite = 3, $idContainerVersion = 5, 'abCdef', 'MySecond');
        $idRelease3 = $this->createRelease($idSite = 4, $idContainerVersion = 5, 'abCdef', 'MyThird');
        $this->dao->deleteAllVersionsForRelease($idSite = 3, 'abCdef', 'MySecond', $this->now);

        $releases = $this->dao->getAllReleases();
        $this->assertCount(3, $releases);
        $this->assertEquals($idRelease1, $releases[0]['idcontainerrelease']);
        $this->assertEquals($idRelease2, $releases[1]['idcontainerrelease']);
        $this->assertEquals($idRelease3, $releases[2]['idcontainerrelease']);

        $this->assertEquals('FirstRel', $releases[0]['environment']);
        $this->assertEquals('MySecond', $releases[1]['environment']);
        $this->assertEquals('MyThird', $releases[2]['environment']);

        $this->assertEquals(ContainerReleaseDao::STATUS_DELETED, $releases[1]['status']);
    }

    public function test_getReleasesForContainerVersion()
    {
        $idContainer = 'abcDef';
        $this->assertSame(array(), $this->dao->getReleasesForContainerVersion($idSite = 3, $idContainer, $idContainerVersion = 4));
        $this->assertSame(array(), $this->dao->getReleasesForContainerVersion($idSite = 3, 'abcddd', $idContainerVersion = 4));
        $this->assertSame(array(), $this->dao->getReleasesForContainerVersion($idSite = 3, $idContainer, $idContainerVersion = 5));
        $this->assertSame(array(), $this->dao->getReleasesForContainerVersion($idSite = 4, $idContainer, $idContainerVersion = 5));

        $idRelease1 = $this->createRelease($idSite = 3, $idContainerVersion = 4, $idContainer);
        $idRelease2 = $this->createRelease($idSite = 3, $idContainerVersion = 4, 'abcddd');
        $idRelease3 = $this->createRelease($idSite = 3, $idContainerVersion = 5, $idContainer);
        $idRelease4 = $this->createRelease($idSite = 3, $idContainerVersion = 5, $idContainer, 'env2');
        $idRelease5 = $this->createRelease($idSite = 4, $idContainerVersion = 5, $idContainer);

        $releases = $this->dao->getReleasesForContainerVersion($idSite = 3, $idContainer, $idContainerVersion = 6);
        $this->assertEquals(array(), $releases);

        $releases = $this->dao->getReleasesForContainerVersion($idSite = 3, 'abcddd', $idContainerVersion = 5);
        $this->assertEquals(array(), $releases);

        $releases3_5 = $this->dao->getReleasesForContainerVersion($idSite = 3, $idContainer, $idContainerVersion = 5);
        $releases4_5 = $this->dao->getReleasesForContainerVersion($idSite = 4, $idContainer, $idContainerVersion = 5);
        $releases3_4 = $this->dao->getReleasesForContainerVersion($idSite = 3, $idContainer, $idContainerVersion = 4);

        $this->assertCount(2, $releases3_5);
        $this->assertCount(1, $releases4_5);
        $this->assertCount(0, $releases3_4); // idrelease1 should have been deleted by another release

        $this->assertSame(array(), $this->dao->getReleasesForContainerVersion($idSite = 99, $idContainer, $idContainerVersion = 9));

        $this->assertSame($idRelease3, $releases3_5[0]['idcontainerrelease']);
        $this->assertSame(3, $releases3_5[0]['idsite']);

        $this->assertSame($idRelease4, $releases3_5[1]['idcontainerrelease']);
        $this->assertSame(3, $releases3_5[1]['idsite']);

        $this->assertSame($idRelease5, $releases4_5[0]['idcontainerrelease']);
        $this->assertSame(4, $releases4_5[0]['idsite']);

        // ignores deleted status, was before 2 releases
        $this->dao->deleteAllVersionsForRelease($idSite = 3, $idContainer, 'live', $this->now);
        $releases3_5 = $this->dao->getReleasesForContainerVersion($idSite = 3, $idContainer, $idContainerVersion = 5);
        $this->assertCount(1, $releases3_5);
    }

    public function test_getReleasesOfContainer()
    {
        $idContainer = 'abcDef';
        $this->assertSame(array(), $this->dao->getReleasesOfContainer($idSite = 3, $idContainer));
        $this->assertSame(array(), $this->dao->getReleasesOfContainer($idSite = 3, 'abcddd'));
        $this->assertSame(array(), $this->dao->getReleasesOfContainer($idSite = 3, $idContainer));
        $this->assertSame(array(), $this->dao->getReleasesOfContainer($idSite = 4, $idContainer));

        $idRelease1 = $this->createRelease($idSite = 3, $idContainerVersion = 4, $idContainer);
        $idRelease2 = $this->createRelease($idSite = 3, $idContainerVersion = 4, 'abcddd');
        $idRelease3 = $this->createRelease($idSite = 3, $idContainerVersion = 5, $idContainer);
        $idRelease4 = $this->createRelease($idSite = 3, $idContainerVersion = 5, $idContainer, 'env2');
        $idRelease5 = $this->createRelease($idSite = 4, $idContainerVersion = 5, $idContainer);

        $releases = $this->dao->getReleasesOfContainer($idSite = 99, $idContainer);
        $this->assertEquals(array(), $releases);

        $releases = $this->dao->getReleasesOfContainer($idSite = 3, 'foobar');
        $this->assertEquals(array(), $releases);

        $releases = $this->dao->getReleasesOfContainer($idSite = 3, 'abcddd');
        $this->assertCount(1, $releases);

        $releases3 = $this->dao->getReleasesOfContainer($idSite = 3, $idContainer);
        $releases4 = $this->dao->getReleasesOfContainer($idSite = 4, $idContainer);

        $this->assertCount(2, $releases3);
        $this->assertCount(1, $releases4);

        $this->assertSame($idRelease3, $releases3[0]['idcontainerrelease']);
        $this->assertSame(3, $releases3[0]['idsite']);

        $this->assertSame($idRelease4, $releases3[1]['idcontainerrelease']);
        $this->assertSame(3, $releases3[1]['idsite']);

        $this->assertSame($idRelease5, $releases4[0]['idcontainerrelease']);
        $this->assertSame(4, $releases4[0]['idsite']);

        // ignores deleted status, was before 2 releases
        $this->dao->deleteAllVersionsForRelease($idSite = 3, $idContainer, 'live', $this->now);
        $releases3_5 = $this->dao->getReleasesOfContainer($idSite = 3, $idContainer);
        $this->assertCount(1, $releases3_5);
    }

    public function test_deleteAllVersionsForRelease_givenSiteHasNoReleases_shouldNotFail()
    {
        self::expectNotToPerformAssertions();

        $this->dao->deleteAllVersionsForRelease($idSite = 3, 'abcdee', 'live', $this->now);
    }

    public function test_deleteAllVersionsForRelease_shouldOnlyDeleteReleasesThatBelongToGivenSite()
    {
        $idContainer = 'abcDef';
        $idRelease1 = $this->createRelease($idSite = 3, $idContainerVersion = 4, $idContainer);
        $idRelease2 = $this->createRelease($idSite = 3, $idContainerVersion = 4, 'abcddd');
        $idRelease3 = $this->createRelease($idSite = 3, $idContainerVersion = 5, $idContainer);
        $idRelease4 = $this->createRelease($idSite = 3, $idContainerVersion = 5, $idContainer, 'env2');
        $idRelease5 = $this->createRelease($idSite = 4, $idContainerVersion = 5, $idContainer);

        $releases3_5 = $this->dao->getReleasesForContainerVersion($idSite = 3, $idContainer, $idContainerVersion = 5);
        $releases4_5 = $this->dao->getReleasesForContainerVersion($idSite = 4, $idContainer, $idContainerVersion = 5);
        $releases3_4 = $this->dao->getReleasesForContainerVersion($idSite = 3, $idContainer, $idContainerVersion = 4);

        $this->assertCount(2, $releases3_5);
        $this->assertCount(1, $releases4_5);
        $this->assertCount(0, $releases3_4);

        $this->dao->deleteAllVersionsForRelease($idSite = 3, $idContainer, 'live', $this->now);

        $releases3_5 = $this->dao->getReleasesForContainerVersion($idSite = 3, $idContainer, $idContainerVersion = 5);
        $releases4_5 = $this->dao->getReleasesForContainerVersion($idSite = 4, $idContainer, $idContainerVersion = 5);
        $releases3_4 = $this->dao->getReleasesForContainerVersion($idSite = 3, $idContainer, $idContainerVersion = 4);

        $this->assertCount(1, $releases3_5);
        $this->assertCount(1, $releases4_5);
        $this->assertCount(0, $releases3_4);

        // should not actually delete them but set a soft delete flag
        $releases = $this->dao->getAllReleases();
        $this->assertCount(5, $releases);

        // sets deleted date
        $this->assertSame($this->now, $releases[0]['deleted_date']);
        $this->assertSame($this->now, $releases[2]['deleted_date']);
        $this->assertSame(ContainerReleaseDao::STATUS_DELETED, $releases[0]['status']);
        $this->assertSame(ContainerReleaseDao::STATUS_ACTIVE, $releases[1]['status']);
        $this->assertSame(ContainerReleaseDao::STATUS_DELETED, $releases[2]['status']);
        $this->assertSame(ContainerReleaseDao::STATUS_ACTIVE, $releases[3]['status']);
        $this->assertSame(ContainerReleaseDao::STATUS_ACTIVE, $releases[4]['status']);
    }

    public function test_deleteAllVersionsForSite_shouldOnlyDeleteReleasesThatBelongToGivenSite()
    {
        $idContainer = 'abcDef';
        $idRelease1 = $this->createRelease($idSite = 3, $idContainerVersion = 4, $idContainer);
        $idRelease2 = $this->createRelease($idSite = 3, $idContainerVersion = 4, 'abcddd');
        $idRelease3 = $this->createRelease($idSite = 3, $idContainerVersion = 5, $idContainer);
        $idRelease4 = $this->createRelease($idSite = 3, $idContainerVersion = 5, $idContainer, 'env2');
        $idRelease5 = $this->createRelease($idSite = 4, $idContainerVersion = 5, $idContainer);

        $releases3_5 = $this->dao->getReleasesForContainerVersion($idSite = 3, $idContainer, $idContainerVersion = 5);
        $releases4_5 = $this->dao->getReleasesForContainerVersion($idSite = 4, $idContainer, $idContainerVersion = 5);
        $releases3_4 = $this->dao->getReleasesForContainerVersion($idSite = 3, $idContainer, $idContainerVersion = 4);

        $this->assertCount(2, $releases3_5);
        $this->assertCount(1, $releases4_5);
        $this->assertCount(0, $releases3_4);

        $this->dao->deleteAllVersionsForSite($idSite = 3, $this->now);

        $releases3_5 = $this->dao->getReleasesForContainerVersion($idSite = 3, $idContainer, $idContainerVersion = 5);
        $releases4_5 = $this->dao->getReleasesForContainerVersion($idSite = 4, $idContainer, $idContainerVersion = 5);
        $releases3_4 = $this->dao->getReleasesForContainerVersion($idSite = 3, $idContainer, $idContainerVersion = 4);

        $this->assertCount(0, $releases3_5);
        $this->assertCount(1, $releases4_5);
        $this->assertCount(0, $releases3_4);

        // should not actually delete them but set a soft delete flag
        $releases = $this->dao->getAllReleases();
        $this->assertCount(5, $releases);

        // sets deleted date
        $this->assertSame($this->now, $releases[0]['deleted_date']);
        $this->assertSame(ContainerReleaseDao::STATUS_DELETED, $releases[0]['status']);
        $this->assertSame(ContainerReleaseDao::STATUS_DELETED, $releases[1]['status']);
        $this->assertSame(ContainerReleaseDao::STATUS_DELETED, $releases[2]['status']);
        $this->assertSame(ContainerReleaseDao::STATUS_DELETED, $releases[3]['status']);
        $this->assertSame(ContainerReleaseDao::STATUS_ACTIVE, $releases[4]['status']);
    }

    public function test_getAllReleasedContainers_shouldOnlyReturnActiveReleasesWithContainers()
    {
        $environment = 'live';
        $releaseLogin = 'myuser';

        $this->createRelease($idSite = 2);
        $this->createRelease($idSite = 3);
        $this->createRelease($idSite = 4);
        $this->createRelease($idSite = 4, $idContainerVersion = 6, $idContainer = 'foobar', 'foobar');
        $this->createRelease($idSite = 4, $idContainerVersion = 6, $idContainer = 'foobar', 'baz');
        $this->createRelease($idSite = 4, $idContainerVersion = 6, $idContainer = 'abcde', 'baz');

        // those two should be ignored
        $idRelease = $this->dao->releaseVersion($idSite, $idContainer, $idContainerVersion, $environment, $releaseLogin, $this->now);
        $idRelease = $this->dao->releaseVersion($idSite, $idContainer, $idContainerVersion, 'env2', $releaseLogin, $this->now);
        $this->assertEquals(array(
            array('idsite' => '2', 'idcontainer' => 'A68AGI3Z'),
            array('idsite' => '3', 'idcontainer' => 'A68AGI3Z'),
            array('idsite' => '4', 'idcontainer' => 'A68AGI3Z'),
            array('idsite' => '4', 'idcontainer' => 'abcde'),
            array('idsite' => '4', 'idcontainer' => 'foobar'),
        ), $this->dao->getAllReleasedContainers());
    }

    public function test_deleteNoLongerExistingEnvironmentReleases()
    {
        $this->createRelease($idSite = 2);
        $this->createRelease($idSite = 3);
        $this->createRelease($idSite = 4);
        $this->createRelease($idSite = 4, $idContainerVersion = 6, $idContainer = 'foobar', 'foobar');
        $this->createRelease($idSite = 4, $idContainerVersion = 6, $idContainer = 'foobar', 'baz');
        $this->createRelease($idSite = 4, $idContainerVersion = 6, $idContainer = 'abcde', 'baz');
        $this->createRelease($idSite = 4, $idContainerVersion = 6, $idContainer = 'abcde', 'preview');

        $rows = $this->dao->deleteNoLongerExistingEnvironmentReleases(array('live', 'foobar', 'preview', 'baz'), '2015-02-04 05:06:07');
        $this->assertEquals(0, $rows);

        $rows = $this->dao->deleteNoLongerExistingEnvironmentReleases(array('live', 'foobar', 'preview',), '2015-02-04 05:06:07');
        $this->assertEquals(2, $rows);

        $rows = $this->dao->deleteNoLongerExistingEnvironmentReleases(array('live', 'foobar', 'preview',), '2015-02-04 05:06:07');
        $this->assertEquals(0, $rows);

        $rows = $this->dao->deleteNoLongerExistingEnvironmentReleases(array('live', 'preview'), '2015-02-04 05:06:07');
        $this->assertEquals(1, $rows);

        // live/preview can never be removed through this method
        $rows = $this->dao->deleteNoLongerExistingEnvironmentReleases(array('live'), '2015-02-04 05:06:07');
        $this->assertEquals(0, $rows);
        $rows = $this->dao->deleteNoLongerExistingEnvironmentReleases(array('preview'), '2015-02-04 05:06:07');
        $this->assertEquals(0, $rows);
        $rows = $this->dao->deleteNoLongerExistingEnvironmentReleases(array(), '2015-02-04 05:06:07');
        $this->assertEquals(0, $rows);
    }

    private function createRelease($idSite = 1, $idContainerVersion = 5, $idContainer = 'A68AGI3Z', $environment = 'live')
    {
        $releaseLogin = 'myuser';
        try {
            $this->containerDao->createContainer($idSite, $idContainer, $context = 'web', $idContainer, '', $this->now, 0, 0, 0);
        } catch (\Exception $e) {
            // ignore if that container already exists
        }

        $idRelease = $this->dao->releaseVersion($idSite, $idContainer, $idContainerVersion, $environment, $releaseLogin, $this->now);

        return $idRelease;
    }
}
