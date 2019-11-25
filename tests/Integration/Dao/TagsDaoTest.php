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
use Piwik\Plugins\TagManager\Dao\TagsDao;
use Piwik\Plugins\TagManager\Model\Tag;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * @group TagManager
 * @group TagsDao
 * @group TagsDaoTest
 * @group Plugins
 */
class TagsDaoTest extends IntegrationTestCase
{

    /**
     * @var TagsDao
     */
    private $dao;

    /**
     * @var string
     */
    private $tableName;

    private $now = '2015-01-01 01:02:03';

    public function setUp()
    {
        parent::setUp();

        $this->dao = new TagsDao();
        $this->tableName = Common::prefixTable('tagmanager_tag');
    }

    public function test_shouldInstallTable()
    {
        $columns = DbHelper::getTableColumns($this->tableName);
        $columns = array_keys($columns);
        $columnsToCheck = array('idtag', 'idcontainerversion', 'idsite', 'created_date', 'updated_date', 'deleted_date');

        foreach ($columnsToCheck as $column) {
            $this->assertTrue(in_array($column, $columns), "$column column is missing in tag db table");
        }
    }

    /**
     * @expectedException \Zend_Db_Statement_Exception
     * @expectedExceptionMessage tagmanager_tag
     */
    public function test_shouldBeAbleToUninstallTagTable()
    {
        $this->dao->uninstall();

        try {
            DbHelper::getTableColumns($this->tableName);
            $this->fail('Did not uninstall tag table');
        } catch (\Zend_Db_Statement_Exception $e) {
            $this->dao->install();
            throw $e;
        }

        $this->dao->install();
    }

    public function test_createTagMinimal()
    {
        $idSite = 2;
        $idContainerVersion = 3;
        $type = 'CustomFoo';
        $name = 'My Name';
        $parameters = array();
        $fireTriggerIds = array();
        $blockTriggerIds = array();
        $fireLimit = Tag::FIRE_LIMIT_ONCE_IN_LIFETIME;
        $fireDelay = 0;
        $priority = 0;
        $startDate = null;
        $endDate = null;
        $createdDate = $this->now;

        $idTag = $this->dao->createTag($idSite, $idContainerVersion, $type, $name, $parameters, $fireTriggerIds, $blockTriggerIds, $fireLimit, $fireDelay, $priority, $startDate, $endDate, $createdDate);
        $this->assertSame(1, $idTag);

        $tag = $this->dao->getContainerTag($idSite, $idContainerVersion, $idTag);
        $this->assertEquals(array(
            'idtag' => 1,
            'idcontainerversion' => $idContainerVersion,
            'idsite' => $idSite,
            'name' => $name,
            'type' => $type,
            'parameters' => $parameters,
            'fire_trigger_ids' => $fireTriggerIds,
            'block_trigger_ids' => $blockTriggerIds,
            'fire_limit' => $fireLimit,
            'fire_delay' => $fireDelay,
            'priority' => $priority,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'created_date' => $createdDate,
            'updated_date' => $createdDate,
            'deleted_date' => null,
            'status' => TagsDao::STATUS_ACTIVE,
        ), $tag);
    }

    public function test_createTag_Full()
    {
        $idSite = 2;
        $idContainerVersion = 3;
        $type = 'CustomFoo';
        $name = 'My Name';
        $parameters = array('foo' => 'bar', 'mytest' => 5, 'myvalue' => true);
        $fireTriggerIds = array(7, 19, 32, 1);
        $blockTriggerIds = array(4, 59);
        $fireLimit = Tag::FIRE_LIMIT_UNLIMITED;
        $fireDelay = 94399;
        $priority = 995;
        $startDate = '2014-05-07 08:09:10';
        $endDate = '2018-05-07 08:09:10';
        $createdDate = $this->now;

        $idTag = $this->dao->createTag($idSite, $idContainerVersion, $type, $name, $parameters, $fireTriggerIds, $blockTriggerIds, $fireLimit, $fireDelay, $priority, $startDate, $endDate, $createdDate);
        $this->assertSame(1, $idTag);

        $tag = $this->dao->getContainerTag($idSite, $idContainerVersion, $idTag);
        $this->assertEquals(array(
            'idtag' => 1,
            'idcontainerversion' => $idContainerVersion,
            'idsite' => $idSite,
            'name' => $name,
            'type' => $type,
            'parameters' => $parameters,
            'fire_trigger_ids' => $fireTriggerIds,
            'block_trigger_ids' => $blockTriggerIds,
            'fire_limit' => $fireLimit,
            'fire_delay' => $fireDelay,
            'priority' => $priority,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'created_date' => $createdDate,
            'updated_date' => $createdDate,
            'deleted_date' => null,
            'status' => TagsDao::STATUS_ACTIVE,
        ), $tag);
    }

    public function test_createTag_increasedIdTag()
    {
        $idTag = $this->createTag($idSite = 3);
        $this->assertEquals(1, $idTag);

        $idTag = $this->createTag($idSite = 3, $idContainerVersion = 4, 'NameThree');
        $this->assertEquals(2, $idTag);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage TagManager_ErrorNameDuplicate
     */
    public function test_createTag_failsToInsertSameNameTwice()
    {
        $idTag = $this->createTag($idSite = 3);
        $this->assertEquals(1, $idTag);

        $this->createTag($idSite = 3);
    }

    public function test_createTag_possibleToUseSameNameForDifferentSites()
    {
        $idTag = $this->createTag($idSite = 3);
        $this->assertEquals(1, $idTag);

        $idTag = $this->createTag($idSite = 2);
        $this->assertEquals(2, $idTag);
    }

    public function test_createTag_possibleToUseSameNameForDifferentContainerVersions()
    {
        $idTag = $this->createTag($idSite = 3, $idContainerVersion = 2);
        $this->assertEquals(1, $idTag);

        $idTag = $this->createTag($idSite = 3, $idContainerVersion = 3);
        $this->assertEquals(2, $idTag);
    }

    public function test_createTag_possibleToUseSameNameAfterDeletingOtherTag()
    {
        $idSite = 3;
        $idContainerVersion = 5;
        $name = 'myname';
        $idTag = $this->createTag($idSite, $idContainerVersion, $name);
        $this->assertEquals(1, $idTag);

        $this->dao->deleteContainerTag($idSite, $idContainerVersion, $idTag, $this->now);

        $idTag = $this->createTag($idSite, $idContainerVersion, $name);
        $this->assertEquals(2, $idTag);

        $all = $this->dao->getAllTags();
        $this->assertCount(2, $all);
        foreach ($all as $entry) {
            $this->assertSame($name, $entry['name']);
        }
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage TagManager_ErrorNameDuplicate
     */
    public function test_updateTag_failsToSetNameAlreadyInUseByOtherTag()
    {
        $idSite = 3;
        $idContainerVersion = 5;
        $name = 'myname';
        $idTag = $this->createTag($idSite, $idContainerVersion, $name);
        $this->assertEquals(1, $idTag);

        $idTag = $this->createTag($idSite, $idContainerVersion, 'myname2');
        $this->assertEquals(2, $idTag);

        $this->dao->updateTagColumns($idSite, $idContainerVersion, $idTag, array(
            'name' => $name
        ));
    }

    public function test_updateTag_succeedsToSetSameNameThatIsUsedAlreadyByThisTag()
    {
        $idSite = 3;
        $idContainerVersion = 5;
        $name = 'myname2';
        $idTag = $this->createTag($idSite, $idContainerVersion, 'myname');
        $this->assertEquals(1, $idTag);

        $idTag = $this->createTag($idSite, $idContainerVersion, $name);
        $this->assertEquals(2, $idTag);

        $this->dao->updateTagColumns($idSite, $idContainerVersion, $idTag, array(
            'name' => $name
        ));
    }

    public function test_updateTag_keepsTriggersAndParameters()
    {
        $idSite = 3;
        $idContainerVersion = 5;
        $idTag = $this->createTag($idSite, $idContainerVersion, 'myname');
        $this->assertEquals(1, $idTag);

        $tag = $this->dao->getContainerTag($idSite, $idContainerVersion, $idTag);
        $this->assertNotEmpty($tag['fire_trigger_ids']);

        $this->dao->updateTagColumns($idSite, $idContainerVersion, $idTag, array(
            'name' => 'MyName3'
        ));

        $tag = $this->dao->getContainerTag($idSite, $idContainerVersion, $idTag);
        $this->assertNotEmpty($tag['fire_trigger_ids']);
    }

    public function test_updateTagColumns_doesNotFailWhenNoColumsAreToBeUpdated()
    {
        $idTag = $this->createTag($idSite = 3);

        $this->dao->updateTagColumns($idSite, $idContainerVersion = 5, $idTag, array());

        $this->assertTrue(true);
    }

    public function test_updateTagColumns_updatesASingleColumn()
    {
        $idTag = $this->createTag($idSite = 3, $idContainerVersion = 4);

        $tag = $this->dao->getContainerTag($idSite = 3, $idContainerVersion = 4, $idTag);
        $this->assertSame('FooTag', $tag['name']);

        $this->dao->updateTagColumns($idSite = 3, $idContainerVersion = 4, $idTag, array('name' => 'foobarbaz'));

        $tags = $this->dao->getAllTags();
        $this->assertSame($idTag, $tags[0]['idtag']);
        $this->assertSame($idSite, $tags[0]['idsite']);
        $this->assertSame('foobarbaz', $tags[0]['name']);
    }

    public function test_updateTagColumns_updatesSeveralFieldsAndEncodesWhereNeeded()
    {
        $fireTriggerIds = array(5,10, 21);
        $blockTriggerIds = array(19, 4);
        $parameters = array('baz' => 'foo', 'hello' => 'world');

        $idTag = $this->createTag($idSite = 4, $idContainerVersion = 6);

        $columns = array(
            'name' => 'My Changed Name',
            'fire_trigger_ids' => $fireTriggerIds,
            'block_trigger_ids' => $blockTriggerIds,
            'parameters' => $parameters,
            'updated_date' => '2016-01-02 03:04:05'
        );
        $this->dao->updateTagColumns($idSite = 4, $idContainerVersion = 6, $idTag, $columns);

        $tag = $this->dao->getContainerTag($idSite, $idContainerVersion, $idTag);
        $this->assertEquals(array(
            'idtag' => $idTag,
            'idcontainerversion' => $idContainerVersion,
            'idsite' => $idSite,
            'name' => 'My Changed Name',
            'type' => 'CustomFoo',
            'parameters' => $parameters,
            'fire_trigger_ids' => $fireTriggerIds,
            'block_trigger_ids' => $blockTriggerIds,
            'fire_limit' => Tag::FIRE_LIMIT_UNLIMITED,
            'fire_delay' => 0,
            'priority' => 100,
            'start_date' => null,
            'end_date' => null,
            'created_date' => $this->now,
            'updated_date' => '2016-01-02 03:04:05',
            'deleted_date' => null,
            'status' => TagsDao::STATUS_ACTIVE,
        ), $tag);
    }

    public function test_getContainerTag_shouldNotFindAnythingWhenNoTagExists()
    {
        $this->assertFalse($this->dao->getContainerTag($idSite = 3, $idContainerVersion = 99, $idTag = 4));
    }

    public function test_getContainerTag_shouldNotFindAnythingWhenNoTagMatchesThisCriteria()
    {
        $idTag = $this->createTag($idSite = 4, $idContainerVersion = 99);
        $this->assertFalse($this->dao->getContainerTag($idSite = 2, $idContainerVersion = 99, $idTag));
        $this->assertFalse($this->dao->getContainerTag($idSite = 4, $idContainerVersion = 99, $idTag = 66));
    }

    public function test_getContainerTag_shouldReturnTagWhenItExists_andEncodeFields()
    {
        $idTag = $this->createTag($idSite = 4, $idContainerVersion = 92, 'Test name');

        $tag = $this->dao->getContainerTag($idSite, $idContainerVersion, $idTag);
        $this->assertEquals(array(
            'idtag' => $idTag,
            'idcontainerversion' => $idContainerVersion,
            'idsite' => $idSite,
            'name' => 'Test name',
            'type' => 'CustomFoo',
            'parameters' => array(),
            'fire_trigger_ids' => array(7),
            'block_trigger_ids' => array(),
            'fire_limit' => Tag::FIRE_LIMIT_UNLIMITED,
            'fire_delay' => 0,
            'priority' => 100,
            'start_date' => null,
            'end_date' => null,
            'created_date' => $this->now,
            'updated_date' => $this->now,
            'deleted_date' => null,
            'status' => TagsDao::STATUS_ACTIVE,
        ), $tag);
    }

    public function test_getContainerTag_shouldNotReturnDeletedTag()
    {
        $idTag = $this->createTag($idSite = 4, $idContainerVersion = 7, 'Test name');

        $tag = $this->dao->getContainerTag($idSite, $idContainerVersion, $idTag);
        $this->assertSame('Test name', $tag['name']);

        $this->dao->deleteContainerTag($idSite, $idContainerVersion, $idTag, $this->now);

        $tag = $this->dao->getContainerTag($idSite, $idContainerVersion, $idTag);
        $this->assertEmpty($tag);
    }

    public function test_getAllTags_shouldReturnEmptyArray_WhenThereAreNoTags()
    {
        $tags = $this->dao->getAllTags();
        $this->assertSame(array(), $tags);
    }

    public function test_getAllTags_shouldReturnAllExistingTags_EvenDisabled()
    {
        $idTag1 = $this->createTag($idSite = 3, $idContainerVersion = 5, 'First Tag');
        $idTag2 = $this->createTag($idSite = 3, $idContainerVersion = 5, 'MySecondTag');
        $idTag3 = $this->createTag($idSite = 4, $idContainerVersion = 5, 'My Third Tag');
        $this->dao->deleteContainerTag($idSite = 3, $idContainerVersion, $idTag2, $this->now);

        $tags = $this->dao->getAllTags();
        $this->assertCount(3, $tags);
        $this->assertEquals($idTag1, $tags[0]['idtag']);
        $this->assertEquals($idTag2, $tags[1]['idtag']);
        $this->assertEquals($idTag3, $tags[2]['idtag']);

        $this->assertEquals('First Tag', $tags[0]['name']);
        $this->assertEquals('MySecondTag', $tags[1]['name']);
        $this->assertEquals('My Third Tag', $tags[2]['name']);

        $this->assertEquals(TagsDao::STATUS_DELETED, $tags[1]['status']);
    }

    public function test_getContainerTriggers()
    {
        $this->assertSame(array(), $this->dao->getContainerTags($idSite = 3, $idContainerVersion = 4));
        $this->assertSame(array(), $this->dao->getContainerTags($idSite = 3, $idContainerVersion = 5));
        $this->assertSame(array(), $this->dao->getContainerTags($idSite = 4, $idContainerVersion = 5));

        $idTag1 = $this->createTag($idSite = 3, $idContainerVersion = 5, 'First Tag');
        $idTag2 = $this->createTag($idSite = 3, $idContainerVersion = 5, 'MySecondTag');
        $idTag3 = $this->createTag($idSite = 4, $idContainerVersion = 5, 'My Third Tag');

        $tags3_4 = $this->dao->getContainerTags($idSite = 3, $idContainerVersion = 4);
        $this->assertEquals(array(), $tags3_4);

        $tags3_5 = $this->dao->getContainerTags($idSite = 3, $idContainerVersion = 5);
        $tags4_5 = $this->dao->getContainerTags($idSite = 4, $idContainerVersion = 5);

        $this->assertCount(2, $tags3_5);
        $this->assertCount(1, $tags4_5);
        $this->assertSame(array(), $this->dao->getContainerTags($idSite = 99, $idContainerVersion = 9));

        $this->assertSame($idTag1, $tags3_5[0]['idtag']);
        $this->assertSame(3, $tags3_5[0]['idsite']);

        $this->assertSame($idTag2, $tags3_5[1]['idtag']);
        $this->assertSame(3, $tags3_5[1]['idsite']);

        $this->assertSame($idTag3, $tags4_5[0]['idtag']);
        $this->assertSame(4, $tags4_5[0]['idsite']);

        // ignores deleted status, was before 2 tags
        $this->dao->deleteContainerTag($idSite = 3, $idContainerVersion = 5, $idTag1, $this->now);
        $tags3_5 = $this->dao->getContainerTags($idSite = 3, $idContainerVersion);
        $this->assertCount(1, $tags3_5);
    }

    public function test_deleteTagsForSite_givenSiteHasNoTags_shouldNotFail()
    {
        $this->dao->deleteTagsForSite($idSite = 3, $this->now);
        $this->assertSame(array(), $this->dao->getContainerTags($idSite = 3, $idContainerVersion = 5));
    }

    public function test_deleteTagsForSite_shouldOnlyDeleteTagsThatBelongToGivenSite()
    {
        $this->createTag($idSite = 3, $idContainerVersion = 5, 'First Tag');
        $this->createTag($idSite = 3, $idContainerVersion = 5, 'MySecondTag');
        $this->createTag($idSite = 4, $idContainerVersion = 5, 'My Third tag');

        $this->assertCount(2, $this->dao->getContainerTags($idSite = 3, $idContainerVersion = 5));
        $this->assertCount(1, $this->dao->getContainerTags($idSite = 4, $idContainerVersion = 5));

        $this->dao->deleteTagsForSite($idSite = 3, $this->now);

        $this->assertSame(array(), $this->dao->getContainerTags($idSite = 3, $idContainerVersion));
        $this->assertCount(1, $this->dao->getContainerTags($idSite = 4, $idContainerVersion));

        // should not actually delete them but set a soft delete flag
        $tags = $this->dao->getAllTags();
        $this->assertCount(3, $tags);

        // sets deleted date
        $this->assertSame($this->now, $tags[0]['deleted_date']);
        $this->assertSame(TagsDao::STATUS_DELETED, $tags[0]['status']);
        $this->assertSame(TagsDao::STATUS_DELETED, $tags[1]['status']);
        $this->assertSame(TagsDao::STATUS_ACTIVE, $tags[2]['status']);
    }

    public function test_deleteContainerTag_shouldOnlyDeleteGivenTag()
    {
        $this->assertSame(array(), $this->dao->getAllTags());

        $idTag1 = $this->createTag($idSite = 3, $idContainerVersion = 6, 'First Tag');
        $idTag2 = $this->createTag($idSite = 3, $idContainerVersion = 6, 'MySecondTag');
        $idTag3 = $this->createTag($idSite = 4, $idContainerVersion = 6, 'My Third Tag');

        $this->assertCount(3, $this->dao->getAllTags());
        foreach ($this->dao->getAllTags() as $tag) {
            $this->assertSame(TagsDao::STATUS_ACTIVE, $tag['status']);
        }

        // should not delete anything when no tag matches
        $this->dao->deleteContainerTag($idSite = 99, $idContainerVersion = 6, $idTag2, $this->now);
        $this->dao->deleteContainerTag($idSite = 4, $idContainerVersion = 6, $idTag2, $this->now);
        $this->dao->deleteContainerTag($idSite = 3, $idContainerVersion = 5,999, $this->now);

        // verify nothing deleted
        $this->assertCount(3, $this->dao->getAllTags());
        foreach ($this->dao->getAllTags() as $tag) {
            $this->assertSame(TagsDao::STATUS_ACTIVE, $tag['status']);
        }

        // now actually delete a tag
        $this->dao->deleteContainerTag($idSite = 3, $idContainerVersion = 6, $idTag2, $this->now);

        // verify deleted
        $tags = $this->dao->getAllTags();
        $this->assertCount(3, $tags);
        $this->assertSame(TagsDao::STATUS_ACTIVE, $tags[0]['status']);
        $this->assertSame(null, $tags[0]['deleted_date']);
        $this->assertSame(TagsDao::STATUS_DELETED, $tags[1]['status']);
        $this->assertSame($this->now, $tags[1]['deleted_date']);
        $this->assertSame(TagsDao::STATUS_ACTIVE, $tags[2]['status']);
        $this->assertSame(null, $tags[2]['deleted_date']);
    }

    private function createTag($idSite = 1, $idContainerVersion = 5, $name = 'FooTag')
    {
        $type = 'CustomFoo';
        $parameters = array();
        $fireTriggerIds = array(7);
        $blockTriggerIds = array();
        $fireLimit = Tag::FIRE_LIMIT_UNLIMITED;
        $fireDelay = 0;
        $priority = 100;
        $startDate = null;
        $endDate = null;
        $createdDate = $this->now;

        $idTag = $this->dao->createTag($idSite, $idContainerVersion, $type, $name, $parameters, $fireTriggerIds, $blockTriggerIds, $fireLimit, $fireDelay, $priority, $startDate, $endDate, $createdDate);

        return $idTag;
    }


}
