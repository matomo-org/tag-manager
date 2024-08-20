<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration\Model;

use Piwik\Container\StaticContainer;
use Piwik\Plugins\TagManager\Context\WebContext;
use Piwik\Plugins\TagManager\Dao\ContainerReleaseDao;
use Piwik\Plugins\TagManager\Dao\ContainersDao;
use Piwik\Plugins\TagManager\Dao\ContainerVersionsDao;
use Piwik\Plugins\TagManager\Input\Description;
use Piwik\Plugins\TagManager\Input\Name;
use Piwik\Plugins\TagManager\Model\Container;
use Piwik\Plugins\TagManager\Model\Environment;
use Piwik\Plugins\TagManager\Model\Tag;
use Piwik\Plugins\TagManager\TagManager;
use Piwik\Plugins\TagManager\Template\Tag\CustomHtmlTag;
use Piwik\Plugins\TagManager\Template\Trigger\CustomEventTrigger;
use Piwik\Plugins\TagManager\Template\Variable\CustomJsFunctionVariable;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;
use Piwik\Tests\Framework\Fixture;

/**
 * @group TagManager
 * @group ContainerTest
 * @group Container
 * @group Plugins
 */
class ContainerTest extends IntegrationTestCase
{
    private $now = '2018-01-01 02:03:04';

    /**
     * @var int
     */
    private $idSite;
    private $idSite2;

    private $idContainer1;
    private $idContainer1draft;

    /**
     * @var ContainersDao
     */
    private $dao;

    /**
     * @var ContainerVersionsDao
     */
    private $versionsDao;

    /**
     * @var Container
     */
    private $model;

    public function setUp(): void
    {
        parent::setUp();

        TagManager::$enableAutoContainerCreation = false;

        $this->idSite = Fixture::createWebsite('2014-03-04 05:06:07');
        $this->idSite2 = Fixture::createWebsite('2014-03-04 05:06:07');

        $this->dao = StaticContainer::get('Piwik\Plugins\TagManager\Dao\ContainersDao');
        $this->versionsDao = StaticContainer::get('Piwik\Plugins\TagManager\Dao\ContainerVersionsDao');
        $this->model = StaticContainer::get('Piwik\Plugins\TagManager\Model\Container');
        $this->model->setCurrentDateTime($this->now);

        $this->idContainer1 = $this->addContainer($this->idSite, 'Container1');
        $this->idContainer1draft = 1;
    }

    public function tearDown(): void
    {
        TagManager::$enableAutoContainerCreation = true;
        parent::tearDown();
    }

    public function test_addContainer_invalidSite()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('idSite: An unexpected website was found');

        $this->addContainer($idSite = 999);
    }

    public function test_addContainer_invalidName()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Name: The value contains');

        $this->addContainer($this->idSite, str_pad('4', Name::MAX_LENGTH + 1));
    }

    public function test_addContainer_invalidDescription()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Description: The value contains "1001" characters');

        $this->addContainer($this->idSite, 'MyName', str_pad('4', Description::MAX_LENGTH + 1));
    }

    public function test_addContainer_invalidContext()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The context "inValId" is not supported');

        $this->addContainer($this->idSite, 'MyName', '', 'inValId');
    }

    public function test_addContainer()
    {
        $idContainer = $this->addContainer($this->idSite,'My Name', 'My Description');
        $this->assertNotEmpty($idContainer);

        $container = $this->model->getContainer($this->idSite, $idContainer);

        $expected = array(
            'idcontainer' => $idContainer,
            'idsite' => $this->idSite,
            'context' => WebContext::ID,
            'name' => 'My Name',
            'description' => 'My Description',
            'ignoreGtmDataLayer' => version_compare(PHP_VERSION, '8.0', '>=') ? 0 : '0',
            'isTagFireLimitAllowedInPreviewMode' => version_compare(PHP_VERSION, '8.0', '>=') ? 0 : '0',
            'status' => ContainersDao::STATUS_ACTIVE,
            'created_date' => $this->now,
            'updated_date' => $this->now,
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Jan 1, 2018 02:03:04',
            'versions' => array(),
            'releases' => array(),
            'draft' => array (
                'idcontainerversion' => 2,
                'idcontainer' => $idContainer,
                'idsite' => $this->idSite,
                'status' => ContainersDao::STATUS_ACTIVE,
                'revision' => 0,
                'name' => '',
                'description' => '',
                'created_date' => '2018-01-01 02:03:04',
                'updated_date' => '2018-01-01 02:03:04',
                'created_date_pretty' => 'Jan 1, 2018 02:03:04',
                'updated_date_pretty' => 'Jan 1, 2018 02:03:04'
            )
        );
        $this->assertSame($expected, $container);
    }

    public function test_addContainerIgnoreGtmDdataLayer()
    {
        $idContainer = $this->addContainer($this->idSite,'My Name', 'My Description', null, 1, 1);
        $this->assertNotEmpty($idContainer);

        $container = $this->model->getContainer($this->idSite, $idContainer);

        $expected = array(
            'idcontainer' => $idContainer,
            'idsite' => $this->idSite,
            'context' => WebContext::ID,
            'name' => 'My Name',
            'description' => 'My Description',
            'ignoreGtmDataLayer' => version_compare(PHP_VERSION, '8.0', '>=') ? 1 : '1',
            'isTagFireLimitAllowedInPreviewMode' => version_compare(PHP_VERSION, '8.0', '>=') ? 1 : '1',
            'status' => ContainersDao::STATUS_ACTIVE,
            'created_date' => $this->now,
            'updated_date' => $this->now,
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Jan 1, 2018 02:03:04',
            'versions' => array(),
            'releases' => array(),
            'draft' => array (
                'idcontainerversion' => 2,
                'idcontainer' => $idContainer,
                'idsite' => $this->idSite,
                'status' => ContainersDao::STATUS_ACTIVE,
                'revision' => 0,
                'name' => '',
                'description' => '',
                'created_date' => '2018-01-01 02:03:04',
                'updated_date' => '2018-01-01 02:03:04',
                'created_date_pretty' => 'Jan 1, 2018 02:03:04',
                'updated_date_pretty' => 'Jan 1, 2018 02:03:04'
            )
        );
        $this->assertSame($expected, $container);
    }

    public function test_addContainer_generatesRandomContainerIds()
    {
        $idContainer1 = $this->addContainer($this->idSite,'My Name', 'My Description');
        $idContainer2 = $this->addContainer($this->idSite, 'foobar', 'my desc');
        $this->assertNotSame($idContainer1, $idContainer2);
        $this->assertSame(8, strlen($idContainer1));
        $this->assertSame(8, strlen($idContainer2));
        $this->assertTrue(ctype_alnum($idContainer1));
        $this->assertTrue(ctype_alnum($idContainer2));
    }

    public function test_updateContainer_invalidSite()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('idSite: An unexpected website was found');

        $this->updateContainer($idSite = 999, $this->idContainer1);
    }

    public function test_updateContainer_invalidName()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Name: The value contains');

        $this->updateContainer($this->idSite, $this->idContainer1, str_pad('4', Name::MAX_LENGTH + 1));
    }

    public function test_updateContainer_invalidDescription()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Description: The value contains "1001" characters');

        $this->updateContainer($this->idSite, $this->idContainer1, 'Bar', str_pad('4', Description::MAX_LENGTH + 1));
    }

    public function test_updateContainer_success()
    {
        $this->model->setCurrentDateTime('2018-02-01 05:06:07');
        $this->updateContainer($this->idSite, $this->idContainer1, 'MyUpdated Name', 'My Updated Description');

        $container = $this->model->getContainer($this->idSite, $this->idContainer1);

        $expected = array(
            'idcontainer' => $this->idContainer1,
            'idsite' => $this->idSite,
            'context' => WebContext::ID,
            'name' => 'MyUpdated Name',
            'description' => 'My Updated Description',
            'ignoreGtmDataLayer' => version_compare(PHP_VERSION, '8.0', '>=') ? 0 : '0',
            'isTagFireLimitAllowedInPreviewMode' => version_compare(PHP_VERSION, '8.0', '>=') ? 0 : '0',
            'status' => ContainersDao::STATUS_ACTIVE,
            'created_date' => $this->now,
            'updated_date' => '2018-02-01 05:06:07',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Feb 1, 2018 05:06:07',
            'versions' => array(),
            'releases' => array(),
            'draft' => array (
                'idcontainerversion' => 1,
                'idcontainer' => $this->idContainer1,
                'idsite' => $this->idSite,
                'status' => ContainersDao::STATUS_ACTIVE,
                'revision' => 0,
                'name' => '',
                'description' => '',
                'created_date' => '2018-01-01 02:03:04',
                'updated_date' => '2018-01-01 02:03:04',
                'created_date_pretty' => 'Jan 1, 2018 02:03:04',
                'updated_date_pretty' => 'Jan 1, 2018 02:03:04'
            )
        );
        $this->assertSame($expected, $container);
    }

    public function test_updateContainerIgnoreGtmDataLayer()
    {
        $this->model->setCurrentDateTime('2018-02-01 05:06:07');
        $this->updateContainer($this->idSite, $this->idContainer1, 'MyUpdated Name', 'My Updated Description', 1, 1);

        $container = $this->model->getContainer($this->idSite, $this->idContainer1);

        $expected = array(
            'idcontainer' => $this->idContainer1,
            'idsite' => $this->idSite,
            'context' => WebContext::ID,
            'name' => 'MyUpdated Name',
            'description' => 'My Updated Description',
            'ignoreGtmDataLayer' => version_compare(PHP_VERSION, '8.0', '>=') ? 1 : '1',
            'isTagFireLimitAllowedInPreviewMode' => version_compare(PHP_VERSION, '8.0', '>=') ? 1 : '1',
            'status' => ContainersDao::STATUS_ACTIVE,
            'created_date' => $this->now,
            'updated_date' => '2018-02-01 05:06:07',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Feb 1, 2018 05:06:07',
            'versions' => array(),
            'releases' => array(),
            'draft' => array (
                'idcontainerversion' => 1,
                'idcontainer' => $this->idContainer1,
                'idsite' => $this->idSite,
                'status' => ContainersDao::STATUS_ACTIVE,
                'revision' => 0,
                'name' => '',
                'description' => '',
                'created_date' => '2018-01-01 02:03:04',
                'updated_date' => '2018-01-01 02:03:04',
                'created_date_pretty' => 'Jan 1, 2018 02:03:04',
                'updated_date_pretty' => 'Jan 1, 2018 02:03:04'
            )
        );
        $this->assertSame($expected, $container);
    }

    public function test_checkContainerExists_noSuchContainerExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container "foo" does not exist');

        $this->model->checkContainerExists($this->idSite, 'foo');
    }

    public function test_checkContainerExists_siteDoesNotMatch()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container');

        $this->model->checkContainerExists(999, $this->idContainer1);
    }

    public function test_checkContainerExists_noExceptionWhenExists()
    {
        self::expectNotToPerformAssertions();

        $this->model->checkContainerExists($this->idSite, $this->idContainer1);
    }

    public function test_getContainer()
    {
        // no need to create new test for this
        $this->test_addContainer();
    }

    public function test_getContainer_enrichesVersionsAndReleases()
    {
        $this->createContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, 'v1', 'Desc');
        $this->addTagsAndTriggersToVersion($this->idSite, $this->idContainer1draft);
        $this->createContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, 'v2');
        $this->model->publishVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, Environment::ENVIRONMENT_LIVE, 'foologin');

        $expected = array (
            'idcontainer' => $this->idContainer1,
            'idsite' => 1,
            'context' => 'web',
            'name' => 'Container1',
            'description' => '',
            'ignoreGtmDataLayer' => version_compare(PHP_VERSION, '8.0', '>=') ? 0 : '0',
            'isTagFireLimitAllowedInPreviewMode' => version_compare(PHP_VERSION, '8.0', '>=') ? 0 : '0',
            'status' => ContainersDao::STATUS_ACTIVE,
            'created_date' => $this->now,
            'updated_date' => $this->now,
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Jan 1, 2018 02:03:04',
            'versions' =>
                array (
                    0 =>
                        array (
                            'idcontainerversion' => 3,
                            'idcontainer' => $this->idContainer1,
                            'idsite' => $this->idSite,
                            'status' => ContainerVersionsDao::STATUS_ACTIVE,
                            'revision' => 2,
                            'name' => 'v2',
                            'description' => '',
                            'created_date' => $this->now,
                            'updated_date' => $this->now,
                            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
                            'updated_date_pretty' => 'Jan 1, 2018 02:03:04',
                            'environments' => array()
                        ),
                    1 =>
                        array (
                            'idcontainerversion' => 2,
                            'idcontainer' => $this->idContainer1,
                            'idsite' => $this->idSite,
                            'status' => ContainerVersionsDao::STATUS_ACTIVE,
                            'revision' => 1,
                            'name' => 'v1',
                            'description' => 'Desc',
                            'created_date' => $this->now,
                            'updated_date' => $this->now,
                            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
                            'updated_date_pretty' => 'Jan 1, 2018 02:03:04',
                            'environments' => array()
                        ),
                ),
            'releases' =>
                array (
                    0 =>
                        array (
                            'idcontainerrelease' => 1,
                            'idcontainer' => $this->idContainer1,
                            'idcontainerversion' => 1,
                            'idsite' => $this->idSite,
                            'status' => ContainerReleaseDao::STATUS_ACTIVE,
                            'environment' => 'live',
                            'release_login' => 'foologin',
                            'release_date' => $this->now,
                            'release_date_pretty' => 'Jan 1, 2018 02:03:04',
                            'version_name' => ''
                        ),
                ),
            'draft' =>
                array (
                    'idcontainerversion' => $this->idContainer1draft,
                    'idcontainer' => $this->idContainer1,
                    'idsite' => $this->idSite,
                    'status' => ContainerVersionsDao::STATUS_ACTIVE,
                    'revision' => 0,
                    'name' => '',
                    'description' => '',
                    'created_date' => $this->now,
                    'updated_date' => $this->now,
                    'created_date_pretty' => 'Jan 1, 2018 02:03:04',
                    'updated_date_pretty' => 'Jan 1, 2018 02:03:04'
                ),
        );
        $this->assertSame($expected, $this->model->getContainer($this->idSite, $this->idContainer1));
    }

    public function test_getContainer_doesNotExist()
    {
        $this->assertFalse($this->model->getContainer(999, $this->idContainer1));
        $this->assertFalse($this->model->getContainer($this->idSite, 9999));

        // make sure when all params correct we do find the container
        $this->assertNotEmpty($this->model->getContainer($this->idSite, $this->idContainer1));
    }

    public function test_getContainer_doesNotReturnDeletedContainer()
    {
        $this->assertNotEmpty($this->model->getContainer($this->idSite, $this->idContainer1));
        $this->model->deleteContainer($this->idSite, $this->idContainer1);
        $this->assertFalse($this->model->getContainer($this->idSite, $this->idContainer1));
    }

    public function test_getContainer_noContainerMatches()
    {
        $this->assertSame(array(), $this->model->getContainers(999));

        // make sure with correct params we do get a result
        $this->assertNotEmpty($this->model->getContainers($this->idSite));
    }

    public function test_getContainers_doesNotReturnDeleted()
    {
        $this->assertCount(1, $this->model->getContainers($this->idSite));
        $this->model->deleteContainer($this->idSite, $this->idContainer1);
        $this->assertSame(array(), $this->model->getContainers($this->idSite));
    }

    public function test_getContainers_onlyReturnsContainersForThatSite()
    {
        $this->addContainer($this->idSite, 'foo');
        $this->addContainer($this->idSite, 'bar');
        $this->addContainer($this->idSite2, 'baz');
        $this->addContainer($this->idSite2, 'foobar');
        $this->addContainer($this->idSite, 'bazfoo');

        $this->assertCount(4, $this->model->getContainers($this->idSite));
        $this->assertCount(2, $this->model->getContainers($this->idSite2));
    }

    public function test_getContainers_formatsValues()
    {
        $this->addContainer($this->idSite, 'foo');
        $containers = $this->model->getContainers($this->idSite);

        $this->assertCount(2, $containers);
        foreach ($containers as $container) {
            self::assertIsArray($container['releases']);
            self::assertIsArray($container['versions']);
            $this->assertNotEmpty($container['draft']);
        }
    }




    public function test_getActiveContainersInfo_doesNotReturnDeleted()
    {
        $this->assertCount(1, $this->model->getActiveContainersInfo());
        $this->model->deleteContainer($this->idSite, $this->idContainer1);
        $this->assertSame(array(), $this->model->getActiveContainersInfo());
    }

    public function test_getActiveContainersInfo_ReturnsContainersAcrossSites()
    {
        $this->addContainer($this->idSite, 'foo');
        $this->addContainer($this->idSite, 'bar');
        $this->addContainer($this->idSite2, 'baz');
        $this->addContainer($this->idSite2, 'foobar');
        $this->addContainer($this->idSite, 'bazfoo');

        $this->assertCount(6, $this->model->getActiveContainersInfo());
    }

    public function test_getActiveContainersInfo_ReturnsMinimalInfoOnlyAndFormatsIdSite()
    {
        $this->addContainer($this->idSite, 'foo');
        $this->addContainer($this->idSite2, 'baz');

        $this->assertCount(3, $this->model->getActiveContainersInfo());

        foreach ($this->model->getActiveContainersInfo() as $info) {
            $this->assertEquals(array('idcontainer', 'idsite'), array_keys($info));
            self::assertIsInt($info['idsite']);
        }
    }

    public function test_deleteContainer()
    {
        $this->addContainer($this->idSite, 'name2');
        $idContainer3 = $this->addContainer($this->idSite, 'name3');
        $this->addContainer($this->idSite2, 'name4');
        $this->addContainer($this->idSite2, 'name5');
        $this->addContainer($this->idSite,'name6');
        $this->model->setCurrentDateTime('2019-03-04 03:03:03');

        $this->assertCount(4, $this->model->getContainers($this->idSite));
        $this->assertCount(2, $this->model->getContainers($this->idSite2));

        // deletes nothing when no match
        $this->model->deleteContainer($this->idSite, 9999);
        $this->model->deleteContainer(9999, $idContainer3);

        $this->assertCount(4, $this->model->getContainers($this->idSite));
        $this->assertCount(2, $this->model->getContainers($this->idSite2));

        $this->model->deleteContainer($this->idSite, $idContainer3);

        // removes correct one
        $this->assertCount(3, $this->model->getContainers($this->idSite));
        $this->assertCount(2, $this->model->getContainers($this->idSite2));

        // sets updated date etc
        $containers = $this->dao->getAllContainers();
        $count = 0;
        foreach ($containers as $container) {
            if ($container['idcontainer'] === $idContainer3) {
                $count++;
                $this->assertSame(ContainersDao::STATUS_DELETED, $container['status']);
                $this->assertSame('2019-03-04 03:03:03', $container['deleted_date']);
            } else {
                $this->assertNotSame(ContainersDao::STATUS_DELETED, $container['status']);
                $this->assertEmpty($container['deleted_date']);
            }
        }
        // make sure above assertion was executed
        $this->assertSame(1, $count);
    }

    public function test_createContainerVersion_invalidSite()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container');

        $this->createContainerVersion($idSite = 999, $this->idContainer1, $this->idContainer1draft);
    }

    public function test_createContainerVersion_invalidName()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Name: The value contains');

        $this->createContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, str_pad('4', Name::MAX_LENGTH + 1));
    }

    public function test_createContainerVersion_invalidDescription()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Description: The value contains');

        $this->createContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, 'name',  str_pad('4', Description::MAX_LENGTH + 1));
    }

    public function test_createContainerVersion_invalidContainer()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container');

        $this->createContainerVersion($this->idSite, 999, $this->idContainer1draft);
    }

    public function test_createContainerVersion_invalidVersion()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container version does not exist.');

        $this->createContainerVersion($this->idSite, $this->idContainer1, 9999);
    }

    public function test_createContainerVersion()
    {
        $idVersion = $this->createContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, 'My Name', 'My description');
        $this->assertSame(2, $idVersion);
        $this->assertNotEquals($idVersion, $this->idContainer1draft); // ensure it creates a new versionId

        $version = $this->model->getContainerVersion($this->idSite, $this->idContainer1, $idVersion);

        $expected = array (
            'idcontainerversion' => $idVersion,
            'idcontainer' => $this->idContainer1,
            'idsite' => $this->idSite,
            'status' => 'active',
            'revision' => 1,
            'name' => 'My Name',
            'description' => 'My description',
            'created_date' => '2018-01-01 02:03:04',
            'updated_date' => '2018-01-01 02:03:04',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Jan 1, 2018 02:03:04',
            'releases' =>
                array (
                ),
        );
        $this->assertSame($expected, $version);
    }

    private function addTagsAndTriggersToVersion($idSite, $idConversionVersion)
    {
        $idTrigger1 = $this->addContainerTrigger($idSite, $idConversionVersion, 'Mytrigger1');
        $idTrigger2 = $this->addContainerTrigger($idSite, $idConversionVersion, 'Mytrigger2');
        $idTrigger3 = $this->addContainerTrigger($idSite, $idConversionVersion, 'Mytrigger3');

        $idTag1 = $this->addContainerTag($idSite, $idConversionVersion, 'myTag1', array($idTrigger2, $idTrigger3));
        $idTag2 = $this->addContainerTag($idSite, $idConversionVersion, 'myTag2', array($idTrigger1));
    }

    public function test_createContainerVersion_keepsDraftUnchanged()
    {
        $this->addTagsAndTriggersToVersion($this->idSite, $this->idContainer1draft);

        $draftVersionBefore = $this->exportVersion($this->idSite, $this->idContainer1, $this->idContainer1draft);
        unset($draftVersionBefore['versions']);

        $idVersion = $this->createContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, 'My VName', 'My version description');

        $draftVersionAfter = $this->exportVersion($this->idSite, $this->idContainer1, $this->idContainer1draft);
        $madeVersion = $this->exportVersion($this->idSite, $this->idContainer1, $idVersion);
        unset($draftVersionAfter['versions']);

        // assert tags and triggers were copied into new version
        $this->assertSame('My VName', $madeVersion['version']['name']);
        $this->assertSame('My version description', $madeVersion['version']['description']);
        $this->assertCount(3, $madeVersion['triggers']);
        $this->assertCount(2, $madeVersion['tags']);

        // make sure draft version was not changed
        $this->assertSame($draftVersionBefore, $draftVersionAfter);
    }

    public function test_updateContainerVersion_invalidSite()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('idSite: An unexpected website was found');

        $this->updateContainerVersion($idSite = 999, $this->idContainer1, $this->idContainer1draft);
    }

    public function test_updateContainerVersion_invalidName()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Name: The value contains');

        $this->updateContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, str_pad('4', Name::MAX_LENGTH + 1));
    }

    public function test_updateContainerVersion_invalidDescription()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Description: The value contains "1001" characters');

        $this->updateContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, 'MyName', str_pad('4', Description::MAX_LENGTH + 1));
    }

    public function test_updateContainerVersion_success()
    {
        $this->model->setCurrentDateTime('2018-02-01 05:06:07');
        $this->updateContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, 'MyUpdated Name', 'My updated description');

        $version = $this->model->getContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft);

        $expected = array (
            'idcontainerversion' => 1,
            'idcontainer' => $this->idContainer1,
            'idsite' => $this->idSite,
            'status' => 'active',
            'revision' => 0,
            'name' => 'MyUpdated Name',
            'description' => 'My updated description',
            'created_date' => '2018-01-01 02:03:04',
            'updated_date' => '2018-02-01 05:06:07',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Feb 1, 2018 05:06:07',
            'releases' =>
                array (
                ),
        );
        $this->assertSame($expected, $version);
    }

    public function test_getContainerVersion()
    {
        // no need to create new test for this
        $this->test_createContainerVersion();
        $this->test_updateContainerVersion_success();
    }

    public function test_getContainerVersion_doesNotExist()
    {
        $this->assertFalse($this->model->getContainerVersion(999, $this->idContainer1, $this->idContainer1draft));
        $this->assertFalse($this->model->getContainerVersion($this->idSite, 9999, $this->idContainer1draft));
        $this->assertFalse($this->model->getContainerVersion($this->idSite, $this->idContainer1, 9999));
        // make sure when all params correct we do find the version
        $this->assertNotEmpty($this->model->getContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft));
    }

    public function test_deleteContainerVersion_notPossibleToDeleteDraft()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The "Draft" version of a container cannot be deleted');

        $this->createContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft);

        $this->assertNotEmpty($this->model->getContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft));
        $this->model->deleteContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft);
    }

    public function test_getContainerVersion_doesNotReturnDeletedVersion()
    {
        $idVersion = $this->createContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft);

        $this->assertNotEmpty($this->model->getContainerVersion($this->idSite, $this->idContainer1, $idVersion));
        $this->model->deleteContainerVersion($this->idSite, $this->idContainer1, $idVersion);
        $this->assertFalse($this->model->getContainerVersion($this->idSite, $this->idContainer1, $idVersion));
    }

    public function test_getContainerVersions_noVersionMatches()
    {
        $this->createContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft);

        $this->assertSame(array(), $this->model->getContainerVersions(999, $this->idContainer1));
        $this->assertSame(array(), $this->model->getContainerVersions($this->idSite, 999));

        // make sure with correct params we do get a result
        $this->assertNotEmpty($this->model->getContainerVersions($this->idSite, $this->idContainer1));
    }

    public function test_getContainerVersions_doesNotReturnDeleted()
    {
        $idVersion = $this->createContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft);

        $this->assertCount(1, $this->model->getContainerVersions($this->idSite, $this->idContainer1));
        $this->model->deleteContainerVersion($this->idSite, $this->idContainer1, $idVersion);
        $this->assertSame(array(), $this->model->getContainerVersions($this->idSite, $this->idContainer1));
    }

    public function test_getContainerVersions_onlyReturnsContainersForThatSiteAndContainer()
    {
        $idContainer2 = $this->addContainer($this->idSite, 'abcde91');
        $idContainer3 = $this->addContainer($this->idSite2, 'abcde92');

        $this->createContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, 'v1');
        $this->createContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, 'v2');
        $this->createContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, 'v3');
        $this->createContainerVersion($this->idSite2, $idContainer3, 3, 'v4');
        $this->createContainerVersion($this->idSite2, $idContainer3, 3, 'v5');
        $this->createContainerVersion($this->idSite, $idContainer2, 2, 'v6');

        $this->assertCount(3, $this->model->getContainerVersions($this->idSite, $this->idContainer1));
        $this->assertCount(1, $this->model->getContainerVersions($this->idSite, $idContainer2));
        $this->assertCount(2, $this->model->getContainerVersions($this->idSite2, $idContainer3));
        $this->assertCount(0, $this->model->getContainerVersions($this->idSite2, $idContainer2));
    }

    public function test_getContainerVersions_formatsValues()
    {
        $this->createContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, 'foo1');
        $this->createContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, 'foo2');

        $versions = $this->model->getContainerVersions($this->idSite, $this->idContainer1);

        $this->assertCount(2, $versions);
        foreach ($versions as $version) {
            $this->assertTrue(array_key_exists('releases', $version));
        }
    }

    public function test_deleteContainerVersion()
    {
        $idContainer2 = $this->addContainer($this->idSite, 'abcde91');
        $idContainer3 = $this->addContainer($this->idSite2, 'abcde92');

        $this->createContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, 'v1');
        $idVersion3 = $this->createContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, 'v2');
        $this->createContainerVersion($this->idSite2, $idContainer3, 3, 'v3');
        $this->createContainerVersion($this->idSite2, $idContainer3, 3, 'v4');
        $this->createContainerVersion($this->idSite, $idContainer2, 2, 'v4');

        $this->assertCount(2, $this->model->getContainerVersions($this->idSite, $this->idContainer1));
        $this->assertCount(1, $this->model->getContainerVersions($this->idSite, $idContainer2));
        $this->assertCount(2, $this->model->getContainerVersions($this->idSite2, $idContainer3));
        $this->assertCount(0, $this->model->getContainerVersions($this->idSite2, $idContainer2));

        $this->model->setCurrentDateTime('2019-03-04 03:03:03');

        // deletes nothing when no match
        $this->model->deleteContainerVersion($this->idSite, $this->idContainer1, 9999);
        $this->model->deleteContainerVersion($this->idSite, 99999, $idVersion3);
        $this->model->deleteContainerVersion(9999, $this->idContainer1, $idVersion3);

        $this->assertCount(2, $this->model->getContainerVersions($this->idSite, $this->idContainer1));
        $this->assertCount(1, $this->model->getContainerVersions($this->idSite, $idContainer2));
        $this->assertCount(2, $this->model->getContainerVersions($this->idSite2, $idContainer3));
        $this->assertCount(0, $this->model->getContainerVersions($this->idSite2, $idContainer2));

        $this->model->deleteContainerVersion($this->idSite, $this->idContainer1, $idVersion3);

        // removes correct one
        $this->assertCount(1, $this->model->getContainerVersions($this->idSite, $this->idContainer1));
        $this->assertCount(1, $this->model->getContainerVersions($this->idSite, $idContainer2));
        $this->assertCount(2, $this->model->getContainerVersions($this->idSite2, $idContainer3));
        $this->assertCount(0, $this->model->getContainerVersions($this->idSite2, $idContainer2));

        // sets updated date etc
        $versions = $this->versionsDao->getAllVersions();
        $count = 0;
        foreach ($versions as $version) {
            if ($version['idcontainerversion'] === $idVersion3) {
                $count++;
                $this->assertSame(ContainerVersionsDao::STATUS_DELETED, $version['status']);
                $this->assertSame('2019-03-04 03:03:03', $version['deleted_date']);
            } else {
                $this->assertNotSame(ContainerVersionsDao::STATUS_DELETED, $version['status']);
                $this->assertEmpty($version['deleted_date']);
            }
        }
        // make sure above assertion was executed
        $this->assertSame(1, $count);
    }

    public function test_deleteContainerVersion_failsToDeleteDraftVersion()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The "Draft" version of a container cannot be deleted');

        $this->model->deleteContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft);
    }

    public function test_publishVersion_invalidSite()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container');

        $idVersion = $this->createContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, 'v1');
        $this->publishVersion($idSite = 999, $this->idContainer1, $idVersion);
    }

    public function test_publishVersion_invalidContainer()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container');

        $idVersion = $this->createContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, 'v1');
        $this->publishVersion($this->idSite, 999, $idVersion);
    }

    public function test_publishVersion_invalidVersion()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container version does not exist.');

        $idVersion = $this->createContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, 'v1');
        $this->publishVersion($this->idSite, $this->idContainer1, 9999);
    }

    public function test_publishVersion_PossibleToPublishDraftVersion()
    {
        $container = $this->model->getContainer($this->idSite, $this->idContainer1);
        $this->assertSame(array(), $container['releases']);
        $idContainerRelease = $this->model->publishVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, 'foobar', 'mylogin');
        $this->assertSame(1, $idContainerRelease);

        $container = $this->model->getContainer($this->idSite, $this->idContainer1);

        $expected = array(
            array (
                'idcontainerrelease' => $idContainerRelease,
                'idcontainer' => $this->idContainer1,
                'idcontainerversion' => $this->idContainer1draft,
                'idsite' => $this->idSite,
                'status' => ContainerReleaseDao::STATUS_ACTIVE,
                'environment' => 'foobar',
                'release_login' => 'mylogin',
                'release_date' => $this->now,
                'release_date_pretty' => 'Jan 1, 2018 02:03:04',
                'version_name' => ''
            ),
        );
        $this->assertSame($expected, $container['releases']);
    }

    public function test_publishVersion_possibleToPublishNewVersion()
    {
        $idVersion = $this->createContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, 'v1');
        $idContainerRelease = $this->model->publishVersion($this->idSite, $this->idContainer1, $idVersion, 'foobar', 'mylogin');

        $container = $this->model->getContainer($this->idSite, $this->idContainer1);

        $expected = array(
            array (
                'idcontainerrelease' => $idContainerRelease,
                'idcontainer' => $this->idContainer1,
                'idcontainerversion' => $idVersion,
                'idsite' => $this->idSite,
                'status' => ContainerReleaseDao::STATUS_ACTIVE,
                'environment' => 'foobar',
                'release_login' => 'mylogin',
                'release_date' => $this->now,
                'release_date_pretty' => 'Jan 1, 2018 02:03:04',
                'version_name' => 'v1'
            ),
        );
        $this->assertSame($expected, $container['releases']);
    }

    public function test_checkContainerReleaseExists_noReleaseExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container release does not exist.');

        $this->model->checkContainerReleaseExists($this->idSite, $this->idContainer1, Environment::ENVIRONMENT_LIVE);
    }

    public function test_checkContainerReleaseExists_invalidContainer()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container "');

        $this->publishVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, Environment::ENVIRONMENT_LIVE);

        $this->model->checkContainerReleaseExists($this->idSite, 9999, Environment::ENVIRONMENT_LIVE);
    }

    public function test_checkContainerReleaseExists_invalidSite()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container "');

        $this->publishVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, Environment::ENVIRONMENT_LIVE);

        $this->model->checkContainerReleaseExists(999, $this->idContainer1, Environment::ENVIRONMENT_LIVE);
    }

    public function test_checkContainerReleaseExists_invalidEnvironment()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container release does not exist');

        $this->publishVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, Environment::ENVIRONMENT_LIVE);

        $this->model->checkContainerReleaseExists($this->idSite, $this->idContainer1, 'foobar');
    }

    public function test_checkContainerReleaseExists_whenReleaseExistsNoException()
    {
        self::expectNotToPerformAssertions();

        $this->publishVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, Environment::ENVIRONMENT_LIVE);

        $this->model->checkContainerReleaseExists($this->idSite, $this->idContainer1, Environment::ENVIRONMENT_LIVE);
    }

    public function test_getContainerInstallInstructions_checksEnvironmentExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The environment "foobar" does not exist');

        $this->model->getContainerInstallInstructions($this->idSite, $this->idContainer1, 'foobar');
    }

    public function test_getContainerInstallInstructions()
    {
        $this->publishVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, Environment::ENVIRONMENT_LIVE);

        $instructions = $this->model->getContainerInstallInstructions($this->idSite, $this->idContainer1, Environment::ENVIRONMENT_LIVE);
        $this->assertNotEmpty($instructions[0]['description']);
        $this->assertNotEmpty($instructions[0]['helpUrl']);
        $this->assertNotEmpty($instructions[0]['embedCode']);
        self::assertStringContainsString(StaticContainer::get('TagManagerContainerStorageDir'). '/' . StaticContainer::get('TagManagerContainerFilesPrefix') . $this->idContainer1. '.js', $instructions[0]['embedCode']);
    }

    public function test_getAllReleasedContainers_noReleases()
    {
        $releases = $this->model->getAllReleasedContainers();

        $expected = array();
        $this->assertSame($expected, $releases);
    }

    public function test_getAllReleasedContainers_oneRelease()
    {
        $this->publishVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, Environment::ENVIRONMENT_LIVE);

        $releases = $this->model->getAllReleasedContainers();

        $expected = array(
            array('idcontainer' => $this->idContainer1, 'idsite' => $this->idSite)
        );
        $this->assertSame($expected, $releases);
    }

    public function test_getAllReleasedContainers_sameContainerMultipleReleasesButAppearsOnlyOnce()
    {
        $this->publishVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, Environment::ENVIRONMENT_LIVE);
        $this->publishVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, 'foo');
        $this->publishVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, 'bar');
        $idVersion = $this->createContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, 'v1');
        $this->publishVersion($this->idSite, $this->idContainer1, $idVersion, 'barz');

        $releases = $this->model->getAllReleasedContainers();

        $expected = array(
            array('idcontainer' => $this->idContainer1, 'idsite' => $this->idSite)
        );
        $this->assertSame($expected, $releases);
    }

    public function test_getAllReleasedContainers_searchesAcrossSites()
    {
        $idContainer2 = $this->addContainer($this->idSite, 'myname2');
        $idContainer3 = $this->addContainer($this->idSite2, 'myname3');
        $container2 = $this->model->getContainer($this->idSite, $idContainer2);
        $container3 = $this->model->getContainer($this->idSite2, $idContainer3);

        $this->publishVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, Environment::ENVIRONMENT_LIVE);
        $this->publishVersion($this->idSite, $idContainer2, $container2['draft']['idcontainerversion'], 'foo');
        $this->publishVersion($this->idSite2, $idContainer3, $container3['draft']['idcontainerversion'], 'bar');

        $releases = $this->model->getAllReleasedContainers();

        $expected = array(
            array('idcontainer' => $this->idContainer1, 'idsite' => $this->idSite),
            array('idcontainer' => $idContainer2, 'idsite' => $this->idSite),
            array('idcontainer' => $idContainer3, 'idsite' => $this->idSite2),
        );
        usort($expected, function ($a, $b) {
            return strcmp($a['idcontainer'], $b['idcontainer']);
        });
        usort($releases, function ($a, $b) {
            return strcmp($a['idcontainer'], $b['idcontainer']);
        });
        $this->assertEquals($expected, $releases);
    }

    public function test_getNumContainersTotal()
    {
        $this->assertSame(1, $this->model->getNumContainersTotal());

        $this->addContainer($this->idSite, 'myname2');
        $this->assertSame(2, $this->model->getNumContainersTotal());

        // search across sites
        $this->addContainer($this->idSite2, 'myname3');
        $this->assertSame(3, $this->model->getNumContainersTotal());

        // ignores deleted
        $this->model->deleteContainer($this->idSite, $this->idContainer1);
        $this->assertSame(2, $this->model->getNumContainersTotal());
    }

    public function test_getNumContainersInSite()
    {
        $this->assertSame(1, $this->model->getNumContainersInSite($this->idSite));
        $this->assertSame(0, $this->model->getNumContainersInSite(999));

        $this->addContainer($this->idSite, 'myname2');
        $this->assertSame(2, $this->model->getNumContainersInSite($this->idSite));
        $this->assertSame(0, $this->model->getNumContainersInSite($this->idSite2));
        $this->assertSame(0, $this->model->getNumContainersInSite(999));

        // search across sites
        $this->addContainer($this->idSite2, 'myname3');
        $this->assertSame(2, $this->model->getNumContainersInSite($this->idSite));
        $this->assertSame(1, $this->model->getNumContainersInSite($this->idSite2));

        // ignores deleted
        $this->model->deleteContainer($this->idSite, $this->idContainer1);

        $this->assertSame(1, $this->model->getNumContainersInSite($this->idSite));
        $this->assertSame(1, $this->model->getNumContainersInSite($this->idSite2));
    }

    public function test_enablePreviewMode()
    {
        $container = $this->model->getContainer($this->idSite, $this->idContainer1);
        $this->assertSame(array(), $container['releases']);
        $idContainerRelease = $this->model->enablePreviewMode($this->idSite, $this->idContainer1, $this->idContainer1draft, 'login');
        $this->assertSame(1, $idContainerRelease);

        $container = $this->model->getContainer($this->idSite, $this->idContainer1);

        $expected = array(
            array (
                'idcontainerrelease' => $idContainerRelease,
                'idcontainer' => $this->idContainer1,
                'idcontainerversion' => $this->idContainer1draft,
                'idsite' => $this->idSite,
                'status' => ContainerReleaseDao::STATUS_ACTIVE,
                'environment' => Environment::ENVIRONMENT_PREVIEW,
                'release_login' => 'login',
                'release_date' => $this->now,
                'release_date_pretty' => 'Jan 1, 2018 02:03:04',
                'version_name' => ''
            ),
        );
        $this->assertSame($expected, $container['releases']);
    }

    public function test_enablePreviewMode_twiceUpdatesThePreviewRelease()
    {
        $idVersion = $this->createContainerVersion($this->idSite, $this->idContainer1, $this->idContainer1draft, 'v1');

        $container = $this->model->getContainer($this->idSite, $this->idContainer1);
        $this->assertSame(array(), $container['releases']);
        $idContainerRelease1 = $this->model->enablePreviewMode($this->idSite, $this->idContainer1, $this->idContainer1draft, 'login');
        $this->assertSame(1, $idContainerRelease1);
        $idContainerRelease2 = $this->model->enablePreviewMode($this->idSite, $this->idContainer1, $idVersion, 'login2');
        $this->assertSame(2, $idContainerRelease2);

        $container = $this->model->getContainer($this->idSite, $this->idContainer1);

        $expected = array(
            array (
                'idcontainerrelease' => $idContainerRelease2,
                'idcontainer' => $this->idContainer1,
                'idcontainerversion' => $idVersion,
                'idsite' => $this->idSite,
                'status' => ContainerReleaseDao::STATUS_ACTIVE,
                'environment' => Environment::ENVIRONMENT_PREVIEW,
                'release_login' => 'login2',
                'release_date' => $this->now,
                'release_date_pretty' => 'Jan 1, 2018 02:03:04',
                'version_name' => 'v1'
            ),
        );
        $this->assertSame($expected, $container['releases']);
    }

    public function test_disablePreviewMode()
    {
        $this->test_enablePreviewMode();

        $container = $this->model->getContainer($this->idSite, $this->idContainer1);
        $this->assertNotEmpty($container['releases']);

        $this->model->disablePreviewMode($this->idSite, 9999);
        $this->model->disablePreviewMode(9999, $this->idContainer1);

        // should not have removed anything
        $container = $this->model->getContainer($this->idSite, $this->idContainer1);
        $this->assertNotEmpty($container['releases']);

        // should have disabled matching environment
        $this->model->disablePreviewMode($this->idSite, $this->idContainer1);

        $container = $this->model->getContainer($this->idSite, $this->idContainer1);
        $this->assertSame(array(), $container['releases']);
    }

    public function test_disablePreviewMode_disablesCorrectRelease()
    {
        $this->test_enablePreviewMode();
        $idRelease = $this->releaseNewVersion($this->idSite, $this->idContainer1, $this->idContainer1draft);

        $container = $this->model->getContainer($this->idSite, $this->idContainer1);
        $this->assertCount(2, $container['releases']); // ensure both are created

        // should have disabled matching environment
        $this->model->disablePreviewMode($this->idSite, $this->idContainer1);

        $container = $this->model->getContainer($this->idSite, $this->idContainer1);
        $this->assertSame(array(
            array (
                'idcontainerrelease' => $idRelease,
                'idcontainer' => $this->idContainer1,
                'idcontainerversion' => 2,
                'idsite' => $this->idSite,
                'status' => ContainerReleaseDao::STATUS_ACTIVE,
                'environment' => 'foobar',
                'release_login' => 'mylogin',
                'release_date' => $this->now,
                'release_date_pretty' => 'Jan 1, 2018 02:03:04',
                'version_name' => 'v1'
            )
        ), $container['releases']);
    }


    public function test_hasPreviewRelease_doesNotFailWhenContainerDoesNotExist()
    {
        $this->assertFalse($this->model->hasPreviewRelease(999, $this->idContainer1));
        $this->assertFalse($this->model->hasPreviewRelease($this->idSite, 999));
    }

    public function test_hasPreviewRelease_doesNotHaveReleaseWhenNotEnabled()
    {
        $this->assertFalse($this->model->hasPreviewRelease($this->idSite, $this->idContainer1));
    }

    public function test_hasPreviewRelease_generatesReleaseWhenHasPreviewEnabled()
    {
        $this->model->enablePreviewMode($this->idSite, $this->idContainer1, $this->idContainer1draft, 'foo');

        $this->assertTrue($this->model->hasPreviewRelease($this->idSite, $this->idContainer1));
        $this->assertFalse($this->model->hasPreviewRelease($this->idSite, 999));
    }

    public function test_generateContainer_doesNotFailWhenContainerDoesNotExist()
    {
        $this->assertNull($this->model->generateContainer(999, $this->idContainer1));
        $this->assertNull($this->model->generateContainer($this->idSite, 999));
    }

    public function test_generateContainer_generatesContainerForEachEnvironmentEvenIfHasNoRelease()
    {
        $numEnvironments = 3;
        $this->assertCount($numEnvironments, $this->model->generateContainer($this->idSite, $this->idContainer1));
    }

    public function test_generateContainer_generatesContent()
    {
        $this->addContainerTrigger($this->idSite, $this->idContainer1draft);
        $this->addContainerVariable($this->idSite, $this->idContainer1draft, 'Macros Pre Configured', 'Macros Pre Configured Description');
        $this->model->enablePreviewMode($this->idSite, $this->idContainer1, $this->idContainer1draft, 'foo');
        $result = $this->model->generateContainer($this->idSite, $this->idContainer1);
        $this->assertNotEmpty($result[StaticContainer::get('TagManagerContainerStorageDir'). '/' . StaticContainer::get('TagManagerContainerFilesPrefix') . $this->idContainer1 .'.js']);
        $this->assertNotEmpty($result[StaticContainer::get('TagManagerContainerStorageDir'). '/' . StaticContainer::get('TagManagerContainerFilesPrefix') . $this->idContainer1 .'_preview.js']);
        $this->assertStringContainsString("TagManager.dataLayer.get('mtm.clickElement')", $result[StaticContainer::get('TagManagerContainerStorageDir'). '/' . StaticContainer::get('TagManagerContainerFilesPrefix') . $this->idContainer1 .'_preview.js']);
        $this->assertStringContainsString("return TagManager.dataLayer.get('mtm.clickElement').getAttribute(\"my-attribute\");", $result[StaticContainer::get('TagManagerContainerStorageDir'). '/' . StaticContainer::get('TagManagerContainerFilesPrefix') . $this->idContainer1 .'_preview.js']);
        $this->assertStringContainsString('return "not found";', $result[StaticContainer::get('TagManagerContainerStorageDir'). '/' . StaticContainer::get('TagManagerContainerFilesPrefix') . $this->idContainer1 .'_preview.js']);
        $this->assertCount(4, $result);
    }

    private function releaseNewVersion($idSite, $idContainer, $idContainerVersion, $versionName = 'v1', $environment = 'foobar')
    {
        $idVersion = $this->createContainerVersion($idSite, $idContainer, $idContainerVersion, $versionName);
        $idContainerRelease = $this->model->publishVersion($this->idSite, $this->idContainer1, $idVersion, $environment, 'mylogin');
        return $idVersion;
    }

    private function exportVersion($idSite, $idContainer, $idContainerVersion)
    {
        $export = StaticContainer::get('Piwik\Plugins\TagManager\API\Export');
        return $export->exportContainerVersion($idSite, $idContainer, $idContainerVersion);
    }

    private function createContainerVersion($idSite, $idContainer, $idContainerVersion, $name = 'v0.0.1', $description = '')
    {
        return $this->model->createContainerVersion($idSite, $idContainer, $idContainerVersion, $name, $description);
    }

    private function updateContainerVersion($idSite, $idContainer, $idContainerVersion, $name = 'v.0.0.1.updated', $description = '')
    {
        return $this->model->updateContainerVersion($idSite, $idContainer, $idContainerVersion, $name, $description);
    }

    private function addContainer($idSite, $name = 'My Name', $description = '', $context = null, $ignoreGtmDataLayer = 0, $isTagFireLimitAllowedInPreviewMode = 0)
    {
        if (!isset($context)) {
            $context = WebContext::ID;
        }

        return $this->model->addContainer($idSite, $context, $name, $description, $ignoreGtmDataLayer, $isTagFireLimitAllowedInPreviewMode);
    }

    private function updateContainer($idSite, $idContainer, $name = 'Updated Name', $description = '', $ignoreGtmDataLayer = 0, $isTagFireLimitAllowedInPreviewMode = 0)
    {
        return $this->model->updateContainer($idSite, $idContainer, $name, $description, $ignoreGtmDataLayer, $isTagFireLimitAllowedInPreviewMode);
    }

    private function publishVersion($idSite, $idContainer, $idContainerVersion, $environment = null, $login = 'mylogin')
    {
        if (!isset($environment)) {
            $environment = Environment::ENVIRONMENT_LIVE;
        }
        $this->model->publishVersion($idSite, $idContainer, $idContainerVersion,  $environment, $login);
    }

    private function addContainerTrigger($idSite, $idContainerVersion, $name = 'MyName')
    {
        $type = CustomEventTrigger::ID;
        $parameters = array('eventName' => 'foo');
        $conditions = array();

        $trigger = StaticContainer::get('Piwik\Plugins\TagManager\Model\Trigger');
        return $trigger->addContainerTrigger($idSite, $idContainerVersion, $type, $name, $parameters, $conditions);
    }

    private function addContainerTag($idSite, $idContainerVersion, $name = 'TagName', $fireTriggerIds = array(), $blockTriggerIds = array())
    {
        $type = CustomHtmlTag::ID;
        $parameters = array('customHtml' => '<p></p>');
        $tag = StaticContainer::get('Piwik\Plugins\TagManager\Model\Tag');
        return $tag->addContainerTag($idSite, $idContainerVersion, $type, $name, $parameters, $fireTriggerIds, $blockTriggerIds, $fireLimit = Tag::FIRE_LIMIT_UNLIMITED, $fireDelay = 0, $priority = 999, $startDate = null, $endDate = null);
    }

    private function addContainerVariable($idSite, $idContainerVersion, $name = 'MyName', $description = '')
    {
        $type = CustomJsFunctionVariable::ID;
        $parameters = array('jsFunction' => 'function () { if ({{ClickElement}}) { return {{ClickElement}}.getAttribute("my-attribute"); } else { return "not found"; } };');
        $conditions = array();

        $variable = StaticContainer::get('Piwik\Plugins\TagManager\Model\Variable');
        return $variable->addContainerVariable($idSite, $idContainerVersion, $type, $name, $parameters, false, [],$description );
    }
}
