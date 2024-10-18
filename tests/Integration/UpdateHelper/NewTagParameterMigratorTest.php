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
use Piwik\Plugins\TagManager\Dao\TagsDao;
use Piwik\Plugins\TagManager\Model\Tag;
use Piwik\Plugins\TagManager\Template\Tag\CustomHtmlTag;
use Piwik\Plugins\TagManager\Template\Tag\MatomoTag;
use Piwik\Plugins\TagManager\UpdateHelper\NewTagParameterMigrator;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * @group TagManager
 * @group NewTagParameterMigratorTest
 * @group Updates
 * @group Plugins
 */
class NewTagParameterMigratorTest extends IntegrationTestCase
{
    /**
     * @var NewTagParameterMigrator
     */
    private $newTagParameterMigrator;

    private $idSite;

    private $tagDao;

    private $dateString;

    public function setUp(): void
    {
        parent::setUp();

        $this->newTagParameterMigrator = new NewTagParameterMigrator(MatomoTag::ID, 'goalCustomRevenue');
    }

    private function createTag($idVersion, $type = MatomoTag::ID, $name = '', $parameters = [])
    {
        $fireTriggerIds = $blockTriggerIds = [];
        $fireLimit = Tag::FIRE_LIMIT_ONCE_IN_LIFETIME;
        $fireDelay = $priority = 0;
        $startDate = $endDate = null;
        $createdDate = $this->dateString;
        $name = $name ?: uniqid('tagName');
        if ($type === MatomoTag::ID) {
            $parameters[MatomoTag::PARAM_MATOMO_CONFIG] = !empty($parameters[MatomoTag::PARAM_MATOMO_CONFIG]) ? $parameters[MatomoTag::PARAM_MATOMO_CONFIG] : 'someConfig';
        }

        return $this->tagDao->createTag($this->idSite, $idVersion, $type, $name, $parameters, $fireTriggerIds, $blockTriggerIds, $fireLimit, $fireDelay, $priority, $startDate, $endDate, $createdDate, 'Test Tag Description');
    }

    public function test_migratingTagsWithNewField()
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
        $containerDao->createContainer($this->idSite, $idContainer, $context, $name, $description, $this->dateString, 0, 0, 0);
        $containerDao->createContainer($this->idSite, $idDeletedContainer, $context, uniqid($name), $description, $this->dateString, 0, 0, 0);
        $containerDao->deleteContainer($this->idSite, $idDeletedContainer, $this->dateString);

        // Create some versions to test with.
        $versionDao = new ContainerVersionsDao();
        $idDraftVersion = $versionDao->createDraftVersion($this->idSite, $idContainer, $this->dateString);
        $idVersion = $versionDao->createVersion($this->idSite, $idContainer, 'v1', '', $this->dateString);
        $idDeletedVersion = $versionDao->createVersion($this->idSite, $idContainer, 'vdeleted', '', $this->dateString);
        $idDeletedContainerVersion = $versionDao->createVersion($this->idSite, $idDeletedContainer, 'v1', '', $this->dateString);
        $versionDao->deleteVersion($this->idSite, $idDeletedVersion, $this->dateString);

        // Create some tags to test with.
        $this->tagDao = new TagsDao();
        $idTag = $this->createTag($idVersion);
        $idCustomHtmlTag = $this->createTag($idVersion, CustomHtmlTag::ID, 'CustomHtml Tag Name');
        $idTagWithParameters = $this->createTag($idVersion, MatomoTag::ID, 'Tag with parameters', [ 'idGoal' => '9' ]);
        $idDeletedTag = $this->createTag($idVersion);
        $this->tagDao->deleteContainerTag($this->idSite, $idVersion, $idDeletedTag, $this->dateString);
        $idDraftVersionTag = $this->createTag($idDraftVersion);
        $idDeletedVersionTag = $this->createTag($idDeletedVersion);
        $idDeletedContainerTag = $this->createTag($idDeletedContainerVersion);

        $this->newTagParameterMigrator->migrate();

        $tag = $this->tagDao->getContainerTag($this->idSite, $idVersion, $idTag);
        $this->assertSame($idTag, $tag['idtag']);
        $this->assertIsArray($tag);
        $this->assertIsArray($tag['parameters']);
        $this->assertCount(2, $tag['parameters']);
        $this->assertArrayHasKey('goalCustomRevenue', $tag['parameters']);
        $this->assertSame('', $tag['parameters']['goalCustomRevenue']);
        $this->assertNotEmpty($tag['description']);

        $tag = $this->tagDao->getContainerTag($this->idSite, $idVersion, $idCustomHtmlTag);
        $this->assertSame($idCustomHtmlTag, $tag['idtag']);
        $this->assertIsArray($tag);
        $this->assertIsArray($tag['parameters']);
        $this->assertCount(0, $tag['parameters']);
        $this->assertNotEmpty($tag['description']);

        $tag = $this->tagDao->getContainerTag($this->idSite, $idVersion, $idTagWithParameters);
        $this->assertSame($idTagWithParameters, $tag['idtag']);
        $this->assertIsArray($tag);
        $this->assertIsArray($tag['parameters']);
        $this->assertCount(3, $tag['parameters']);
        $this->assertArrayHasKey('goalCustomRevenue', $tag['parameters']);
        $this->assertSame('', $tag['parameters']['goalCustomRevenue']);
        $this->assertNotEmpty($tag['description']);

        $tag = $this->tagDao->getContainerTagAnyStatus($this->idSite, $idVersion, $idDeletedTag);
        $this->assertSame($idDeletedTag, $tag['idtag']);
        $this->assertIsArray($tag);
        $this->assertIsArray($tag['parameters']);
        $this->assertCount(1, $tag['parameters']);
        $this->assertNotEmpty($tag['description']);

        $tag = $this->tagDao->getContainerTag($this->idSite, $idDraftVersion, $idDraftVersionTag);
        $this->assertSame($idDraftVersionTag, $tag['idtag']);
        $this->assertIsArray($tag);
        $this->assertIsArray($tag['parameters']);
        $this->assertCount(2, $tag['parameters']);
        $this->assertArrayHasKey('goalCustomRevenue', $tag['parameters']);
        $this->assertSame('', $tag['parameters']['goalCustomRevenue']);
        $this->assertNotEmpty($tag['description']);

        $tag = $this->tagDao->getContainerTag($this->idSite, $idDeletedVersion, $idDeletedVersionTag);
        $this->assertSame($idDeletedVersionTag, $tag['idtag']);
        $this->assertIsArray($tag);
        $this->assertIsArray($tag['parameters']);
        $this->assertCount(1, $tag['parameters']);
        $this->assertNotEmpty($tag['description']);

        $tag = $this->tagDao->getContainerTag($this->idSite, $idDeletedContainerVersion, $idDeletedContainerTag);
        $this->assertSame($idDeletedContainerTag, $tag['idtag']);
        $this->assertIsArray($tag);
        $this->assertIsArray($tag['parameters']);
        $this->assertCount(1, $tag['parameters']);
        $this->assertNotEmpty($tag['description']);
    }

    public function test_migratingTagsWithNewFieldAndDefaultValue()
    {
        $this->newTagParameterMigrator = new NewTagParameterMigrator(MatomoTag::ID, 'goalCustomRevenue', 'mynewvalue');
        $this->dateString = '2015-01-01 01:02:03';

        // Create some containers to test with.
        $containerDao = new ContainersDao();
        $this->idSite = 2;
        $idContainer = 'abcdef';
        $context = WebContext::ID;
        $name = 'My Container';
        $description = 'My container description';
        $containerDao->createContainer($this->idSite, $idContainer, $context, $name, $description, $this->dateString, 0, 0, 0);

        // Create some versions to test with.
        $versionDao = new ContainerVersionsDao();
        $idDraftVersion = $versionDao->createDraftVersion($this->idSite, $idContainer, $this->dateString);

        // Create some tags to test with.
        $this->tagDao = new TagsDao();
        $idDraftVersionTag = $this->createTag($idDraftVersion);

        $this->newTagParameterMigrator->migrate();

        $tag = $this->tagDao->getContainerTag($this->idSite, $idDraftVersion, $idDraftVersionTag);
        $this->assertSame($idDraftVersionTag, $tag['idtag']);
        $this->assertIsArray($tag);
        $this->assertIsArray($tag['parameters']);
        $this->assertCount(2, $tag['parameters']);
        $this->assertArrayHasKey('goalCustomRevenue', $tag['parameters']);
        $this->assertSame('mynewvalue', $tag['parameters']['goalCustomRevenue']);
        $this->assertNotEmpty($tag['description']);
    }

    public function test_migratingTagsWithAdditionalField()
    {
        $this->newTagParameterMigrator = new NewTagParameterMigrator(MatomoTag::ID, 'goalCustomRevenue', 'mynewvalue');
        $this->newTagParameterMigrator->addField('documentTitle');
        $this->newTagParameterMigrator->addField('notValidTemplateProperty');
        $this->dateString = '2015-01-01 01:02:03';

        // Create some containers to test with.
        $containerDao = new ContainersDao();
        $this->idSite = 2;
        $idContainer = 'abcdef';
        $context = WebContext::ID;
        $name = 'My Container';
        $description = 'My container description';
        $containerDao->createContainer($this->idSite, $idContainer, $context, $name, $description, $this->dateString, 0, 0, 0);

        // Create some versions to test with.
        $versionDao = new ContainerVersionsDao();
        $idDraftVersion = $versionDao->createDraftVersion($this->idSite, $idContainer, $this->dateString);

        // Create some tags to test with.
        $this->tagDao = new TagsDao();
        $idDraftVersionTag = $this->createTag($idDraftVersion);

        $this->newTagParameterMigrator->migrate();

        $tag = $this->tagDao->getContainerTag($this->idSite, $idDraftVersion, $idDraftVersionTag);
        $this->assertSame($idDraftVersionTag, $tag['idtag']);
        $this->assertIsArray($tag);
        $this->assertIsArray($tag['parameters']);
        $this->assertCount(3, $tag['parameters']);
        $this->assertArrayHasKey('goalCustomRevenue', $tag['parameters']);
        $this->assertSame('mynewvalue', $tag['parameters']['goalCustomRevenue']);
        $this->assertArrayHasKey('documentTitle', $tag['parameters']);
        $this->assertSame('', $tag['parameters']['documentTitle']);
        $this->assertArrayNotHasKey('notValidTemplateProperty', $tag['parameters']);
        $this->assertNotEmpty($tag['description']);
    }
}
