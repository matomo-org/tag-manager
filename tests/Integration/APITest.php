<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration;

use Piwik\Plugins\TagManager\Access\Capability\PublishLiveContainer;
use Piwik\Plugins\TagManager\Access\Capability\UseCustomTemplates;
use Piwik\Plugins\TagManager\API;
use Piwik\Plugins\TagManager\Context\WebContext;
use Piwik\Plugins\TagManager\Dao\TagsDao;
use Piwik\Plugins\TagManager\Model\Environment;
use Piwik\Plugins\TagManager\Template\Tag\CustomHtmlTag;
use Piwik\Plugins\TagManager\Template\Trigger\WindowLoadedTrigger;
use Piwik\Plugins\TagManager\Template\Variable\CustomJsFunctionVariable;
use Piwik\Plugins\TagManager\tests\Fixtures\TagManagerFixture;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;
use Piwik\Plugins\TagManager\tests\Framework\Mock\FakeAccessTagManager;
use Piwik\Tests\Framework\Mock\FakeAccess;

/**
 * @group TagManager
 * @group APITest
 * @group API
 * @group Plugins
 */
class APITest extends IntegrationTestCase
{
    /**
     * @var int
     */
    private $idSite;

    private $idContainer;
    private $idContainerQuotes;
    private $idContainerDraftVersion;

    /**
     * @var API
     */
    private $api;

    /**
     * @var TagManagerFixture
     */
    private $tagFixture;

    public function test_getAvailableContexts_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasSomeViewAccess');

        $this->setAnonymousUser();
        $this->api->getAvailableContexts();
    }

    public function test_getAvailableContexts_success()
    {
        $this->setUser();
        $this->assertNotEmpty($this->api->getAvailableContexts());
    }

    public function test_getAvailableEnvironments_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasSomeViewAccess');

        $this->setAnonymousUser();
        $this->api->getAvailableEnvironments();
    }

    public function test_getAvailableEnvironments_success()
    {
        $this->setUser();
        $this->assertNotEmpty($this->api->getAvailableEnvironments());
    }

    public function test_getAvailableTagFireLimits_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasSomeViewAccess');

        $this->setAnonymousUser();
        $this->api->getAvailableTagFireLimits();
    }

    public function test_getAvailableTagFireLimits_success()
    {
        $this->setUser();
        $this->assertNotEmpty($this->api->getAvailableTagFireLimits());
    }

    public function test_getAvailableComparisons_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasSomeViewAccess');

        $this->setAnonymousUser();
        $this->api->getAvailableComparisons();
    }

    public function test_getAvailableComparisons_success()
    {
        $this->setUser();
        $this->assertNotEmpty($this->api->getAvailableComparisons());
    }

    public function test_getAvailableTagTypesInContext_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasSomeViewAccess');

        $this->setAnonymousUser();
        $this->api->getAvailableTagTypesInContext(WebContext::ID);
    }

    public function test_getAvailableTagTypesInContext_whenNotValidIdContext()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The context "foobar" is not supported');

        $this->setUser();
        $this->api->getAvailableTagTypesInContext('foobar');
    }

    public function test_getAvailableTagTypesInContext_success()
    {
        $this->assertNotEmpty($this->api->getAvailableTagTypesInContext(WebContext::ID));
    }

    public function test_getAvailableTriggerTypesInContext_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasSomeViewAccess');

        $this->setAnonymousUser();
        $this->api->getAvailableTriggerTypesInContext(WebContext::ID);
    }

    public function test_getAvailableTriggerTypesInContext_whenNotValidIdContext()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The context "foobar" is not supported');

        $this->setUser();
        $this->api->getAvailableTriggerTypesInContext('foobar');
    }

    public function test_getAvailableTriggerTypesInContext_success()
    {
        $this->assertNotEmpty($this->api->getAvailableTriggerTypesInContext(WebContext::ID));
    }

    public function test_getAvailableVariableTypesInContext_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasSomeViewAccess');

        $this->setAnonymousUser();
        $this->api->getAvailableVariableTypesInContext(WebContext::ID);
    }

    public function test_getAvailableVariableTypesInContext_whenNotValidIdContext()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The context "foobar" is not supported');

        $this->setUser();
        $this->api->getAvailableVariableTypesInContext('foobar');
    }

    public function test_getAvailableVariableTypesInContext_success()
    {
        $this->assertNotEmpty($this->api->getAvailableVariableTypesInContext(WebContext::ID));
    }

    public function test_getContainers_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasViewAccess');

        $this->setAnonymousUser();
        $this->api->getContainers($this->idSite);
    }

    public function test_getContainers_success()
    {
        $this->setUser();
        $this->assertNotEmpty($this->api->getContainers($this->idSite));
    }

    public function test_getContainerVersions_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasViewAccess');

        $this->setAnonymousUser();
        $this->api->getContainerVersions($this->idSite, $this->idContainer);
    }

    public function test_getContainerVersions_shouldFailWhenContainerNotExists()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasViewAccess');

        $this->setAnonymousUser();
        $this->api->getContainerVersions($this->idSite, 9999);
    }

    public function test_getContainerVersions_success()
    {
        $this->setUser();
        $this->assertNotEmpty($this->api->getContainerVersions($this->idSite, $this->idContainer));
    }

    public function test_getContainerVersion_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasViewAccess');

        $this->setAnonymousUser();
        $this->api->getContainerVersion($this->idSite, $this->idContainer, $this->idContainerDraftVersion);
    }

    public function test_getContainerVersion_shouldFailWhenContainerVersionNotExists()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasViewAccess');

        $this->setAnonymousUser();
        $this->api->getContainerVersion($this->idSite, $this->idContainer, 9999);
    }

    public function test_getContainerVersion_success()
    {
        $this->setUser();
        $this->assertNotEmpty($this->api->getContainerVersion($this->idSite, $this->idContainer, $this->idContainerDraftVersion));
    }

    public function test_deleteContainer_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_write Fake exception');

        $this->setUser();
        $this->api->deleteContainer($this->idSite, $this->idContainer);
    }

    public function test_deleteContainer_shouldFailWhenContainerNotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('foobar');

        $this->api->deleteContainer($this->idSite, 'foobar');
    }

    public function test_deleteContainer_success()
    {
        // This test case actually doesn't have any assertions, but the fixture already performs some when it is set up.
        // self::expectNotToPerformAssertions();

        $this->api->deleteContainer($this->idSite, $this->idContainer);
    }

    public function test_publishContainerVersion_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_write Fake exception');

        $this->setUser();
        $this->api->publishContainerVersion($this->idSite, $this->idContainer, $this->idContainerDraftVersion, Environment::ENVIRONMENT_LIVE);
    }

    public function test_publishContainerVersion_shouldFailWhenHavingOnlyAdminAccess()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_use_custom_templates Fake exception');

        $this->setAdminUser();
        $this->api->publishContainerVersion($this->idSite, $this->idContainer, $this->idContainerDraftVersion, Environment::ENVIRONMENT_PREVIEW);
    }

    public function test_publishContainerVersion_shouldFailWhenContainerVersionDoesNotExist()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container version does not exist');

        $this->api->publishContainerVersion($this->idSite, $this->idContainer, 99999, Environment::ENVIRONMENT_LIVE);
    }

    public function test_publishContainerVersion_shouldFailWhenEnvironmentNameIsInvalid()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The environment "foobar" does not exist');

        $this->api->publishContainerVersion($this->idSite, $this->idContainer, $this->idContainerDraftVersion, 'foobar');
    }

    public function test_publishContainerVersion_shouldFailWhenNotHavingPublishLiveCapability()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_publish_live_container Fake exception');

        $this->setWriteUser();
        $this->api->publishContainerVersion($this->idSite, $this->idContainer, $this->idContainerDraftVersion, Environment::ENVIRONMENT_LIVE);
    }

    public function test_publishContainerVersion_shouldFailForAdmin()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_use_custom_templates Fake exception');

        $this->setWriteUser();
        $this->api->publishContainerVersion($this->idSite, $this->idContainer, $this->idContainerDraftVersion, Environment::ENVIRONMENT_PREVIEW);
    }

    public function test_publishContainerVersion_shouldSucceedForPublishLiveCapability()
    {
        // This test case actually doesn't have any assertions, but the fixture already performs some when it is set up.
        // self::expectNotToPerformAssertions();

        $this->setWriteUser();
        FakeAccess::$idSitesCapabilities = array(
            UseCustomTemplates::ID => array($this->idSite),
            PublishLiveContainer::ID => array($this->idSite),
        );
        $this->api->publishContainerVersion($this->idSite, $this->idContainer, $this->idContainerDraftVersion, Environment::ENVIRONMENT_LIVE);
    }

    public function test_addContainer_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_write Fake exception');

        $this->setUser();
        $this->api->addContainer($this->idSite, WebContext::ID, 'TheName');
    }

    public function test_addContainer_shouldFailWhenContextDoesNotExist()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The context "foobar" is not supported');

        $this->api->addContainer($this->idSite, 'foobar', 'TheName');
    }

    public function test_updateContainer_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_write Fake exception');

        $this->setUser();
        $this->api->updateContainer($this->idSite, $this->idContainer, 'TheName');
    }

    public function test_updateContainer_shouldFailWhenContainerVersionDoesNotExist()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container "9999" does not exist');

        $this->api->updateContainer($this->idSite, '9999',  'TheName');
    }

    public function test_updateContainerVersion_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_write Fake exception');

        $this->setUser();
        $this->api->updateContainerVersion($this->idSite, $this->idContainer, $this->idContainerDraftVersion, 'TheName');
    }

    public function test_updateContainerVersion_shouldFailWhenContainerVersionDoesNotExist()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container version does not exist');

        $this->api->updateContainerVersion($this->idSite, $this->idContainer, 99999, 'TheName');
    }

    public function test_createContainerVersion_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_write Fake exception');

        $this->setUser();
        $this->api->createContainerVersion($this->idSite, $this->idContainer, 'TheName');
    }

    public function test_createContainerVersion_shouldFailWhenContainerVersionDoesNotExist()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_write Fake exception');

        $this->setUser();
        $this->api->createContainerVersion($this->idSite, $this->idContainer, 'TheName');
    }

    public function test_deleteContainerVersion_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_write Fake exception');

        $this->setUser();
        $this->api->deleteContainerVersion($this->idSite, 'foo', $this->idContainerDraftVersion);
    }

    public function test_deleteContainerVersion_shouldFailWhenHavingOnlyWritePermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_use_custom_templates Fake exception');

        $this->setAdminUser();
        $this->api->deleteContainerVersion($this->idSite, 'foo', $this->idContainerDraftVersion);
    }

    public function test_deleteContainerVersion_shouldFailWhenContainerNotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('foobar');

        $this->api->deleteContainerVersion($this->idSite, 'foobar', $this->idContainerDraftVersion);
    }

    public function test_deleteContainerVariable_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_write Fake exception');

        $this->setUser();
        $this->api->deleteContainerVariable($this->idSite, $this->idContainer, $this->idContainerDraftVersion, $idVariable = 999);
    }

    public function test_deleteContainerVariable_shouldFailWhenVersionNotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container version does not exist');

        $this->api->deleteContainerVariable($this->idSite, $this->idContainer, 9999, $idVariable = 999);
    }

    public function test_deleteContainerVariable_shouldFailWhenContainerNotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container "9999" does not exist');

        $this->api->deleteContainerVariable($this->idSite, 9999, $this->idContainerDraftVersion, $idVariable = 999);
    }

    public function test_deleteContainerTrigger_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_write Fake exception');

        $this->setUser();
        $this->api->deleteContainerTrigger($this->idSite, $this->idContainer, $this->idContainerDraftVersion, $idTrigger = 999);
    }

    public function test_deleteContainerTrigger_shouldFailWhenVersionNotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container version does not exist');

        $this->api->deleteContainerTrigger($this->idSite, $this->idContainer, 9999, $idTrigger = 999);
    }

    public function test_deleteContainerTrigger_shouldFailWhenContainerNotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container "9999" does not exist');

        $this->api->deleteContainerTrigger($this->idSite, 9999, $this->idContainerDraftVersion, $idTrigger = 999);
    }

    public function test_deleteContainerTag_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_write Fake exception');

        $this->setUser();
        $this->api->deleteContainerTag($this->idSite, $this->idContainer, $this->idContainerDraftVersion, $idTag = 999);
    }

    public function test_deleteContainerTag_shouldFailWhenVersionNotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container version does not exist');

        $this->api->deleteContainerTag($this->idSite, $this->idContainer, 9999, $idTag = 999);
    }

    public function test_deleteContainerTag_shouldFailWhenContainerNotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container "9999" does not exist');

        $this->api->deleteContainerTag($this->idSite, 9999, $this->idContainerDraftVersion, $idTag = 999);
    }

    public function test_pauseContainerTag_shouldFailWhenNotHavingWritePermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_write Fake exception');

        $this->setUser();
        $this->api->pauseContainerTag($this->idSite, $this->idContainer, $this->idContainerDraftVersion, $idTag = 999);
    }

    public function test_pauseContainerTag_shouldFailWhenVersionNotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container version does not exist');

        $this->api->pauseContainerTag($this->idSite, $this->idContainer, 9999, $idTag = 999);
    }

    public function test_pauseContainerTag_shouldFailWhenContainerNotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container "9999" does not exist');

        $this->api->pauseContainerTag($this->idSite, 9999, $this->idContainerDraftVersion, $idTag = 999);
    }

    public function test_pauseContainerTag_shouldFailWhenContainerExistsButTagNotExists()
    {
        $idContainer = $this->api->createDefaultContainerForSite($this->idSite);
        $container = $this->api->getContainer($this->idSite, $idContainer);

        $this->assertFalse($this->api->pauseContainerTag($this->idSite, $idContainer, $container['versions'][0]['idcontainerversion'], $idTag = 999));

    }

    public function test_pauseContainerTag_success()
    {
        $idContainer = $this->api->createDefaultContainerForSite($this->idSite);
        $container = $this->api->getContainer($this->idSite, $idContainer);
        $idContainerDraftVersion = $container['versions'][0]['idcontainerversion'];
        $idTrigger = $this->api->addContainerTrigger($this->idSite, $idContainer, $idContainerDraftVersion, WindowLoadedTrigger::ID, 'myNamePauseTagTrigger');
        $fireTrigger = array($idTrigger);
        $idTag = $this->api->addContainerTag($this->idSite, $idContainer, $idContainerDraftVersion, 'CustomImage', 'myName', array('customImageSrc' => 'foo'), $fireTrigger);

        $this->assertTrue($this->api->pauseContainerTag($this->idSite, $idContainer, $idContainerDraftVersion, $idTag));
        $tag = $this->api->getContainerTag($this->idSite, $idContainer, $idContainerDraftVersion, $idTag);
        $this->assertEquals('paused', $tag['status']);
    }

    public function test_resumeContainerTag_shouldFailWhenNotHavingWritePermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_write Fake exception');

        $this->setUser();
        $this->api->resumeContainerTag($this->idSite, $this->idContainer, $this->idContainerDraftVersion, $idTag = 999);
    }

    public function test_resumeContainerTag_shouldFailWhenVersionNotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container version does not exist');

        $this->api->resumeContainerTag($this->idSite, $this->idContainer, 9999, $idTag = 999);
    }

    public function test_resumeContainerTag_shouldFailWhenContainerNotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container "9999" does not exist');

        $this->api->resumeContainerTag($this->idSite, 9999, $this->idContainerDraftVersion, $idTag = 999);
    }

    public function test_resumeContainerTag_shouldFailWhenContainerExistsButTagNotExists()
    {
        $idContainer = $this->api->createDefaultContainerForSite($this->idSite);
        $container = $this->api->getContainer($this->idSite, $idContainer);

        $this->assertFalse($this->api->resumeContainerTag($this->idSite, $idContainer, $container['versions'][0]['idcontainerversion'], $idTag = 999));

    }

    public function test_resumeContainerTag_success()
    {
        $idContainer = $this->api->createDefaultContainerForSite($this->idSite);
        $container = $this->api->getContainer($this->idSite, $idContainer);
        $idContainerDraftVersion = $container['versions'][0]['idcontainerversion'];
        $idTrigger = $this->api->addContainerTrigger($this->idSite, $idContainer, $idContainerDraftVersion, WindowLoadedTrigger::ID, 'myNamePauseTagTrigger');
        $fireTrigger = array($idTrigger);
        $idTag = $this->api->addContainerTag($this->idSite, $idContainer, $idContainerDraftVersion, 'CustomImage', 'myName', array('customImageSrc' => 'foo'), $fireTrigger);

        $this->api->pauseContainerTag($this->idSite, $idContainer, $idContainerDraftVersion, $idTag);
        $this->assertTrue($this->api->resumeContainerTag($this->idSite, $idContainer, $idContainerDraftVersion, $idTag));
        $tag = $this->api->getContainerTag($this->idSite, $idContainer, $idContainerDraftVersion, $idTag);
        $this->assertEquals('active', $tag['status']);
    }

    public function test_addContainerTagsWithoutStatusShouldReturnActiveWhenNotSet()
    {
        $idContainer = $this->api->createDefaultContainerForSite($this->idSite);
        $container = $this->api->getContainer($this->idSite, $idContainer);
        $idContainerDraftVersion = $container['versions'][0]['idcontainerversion'];
        $idTrigger = $this->api->addContainerTrigger($this->idSite, $idContainer, $idContainerDraftVersion, WindowLoadedTrigger::ID, 'myNamePauseTagTrigger');
        $fireTrigger = array($idTrigger);
        $idTag = $this->api->addContainerTag($this->idSite, $idContainer, $idContainerDraftVersion, 'CustomImage', 'myName', array('customImageSrc' => 'foo'), $fireTrigger);
        $tag = $this->api->getContainerTag($this->idSite, $idContainer, $idContainerDraftVersion, $idTag);
        $this->assertEquals('active', $tag['status']);
    }

    public function test_addContainerTagsWithStatusShouldReturnActiveWhenInvalidStatusPassed()
    {
        $idContainer = $this->api->createDefaultContainerForSite($this->idSite);
        $container = $this->api->getContainer($this->idSite, $idContainer);
        $idContainerDraftVersion = $container['versions'][0]['idcontainerversion'];
        $idTrigger = $this->api->addContainerTrigger($this->idSite, $idContainer, $idContainerDraftVersion, WindowLoadedTrigger::ID, 'myNamePauseTagTrigger');
        $fireTrigger = array($idTrigger);
        $idTag = $this->api->addContainerTag($this->idSite, $idContainer, $idContainerDraftVersion, 'CustomImage', 'myName', array('customImageSrc' => 'foo'), $fireTrigger, $blockTriggerIds = [], $fireLimit = 'unlimited', $fireDelay = 0, $priority = 999, $startDate = null, $endDate = null, $description = '', $status = 'act');
        $tag = $this->api->getContainerTag($this->idSite, $idContainer, $idContainerDraftVersion, $idTag);
        $this->assertEquals('active', $tag['status']);
    }

    public function test_addContainerTagsWithStatusShouldReturnPausedStatusWhenPassed()
    {
        $idContainer = $this->api->createDefaultContainerForSite($this->idSite);
        $container = $this->api->getContainer($this->idSite, $idContainer);
        $idContainerDraftVersion = $container['versions'][0]['idcontainerversion'];
        $idTrigger = $this->api->addContainerTrigger($this->idSite, $idContainer, $idContainerDraftVersion, WindowLoadedTrigger::ID, 'myNamePauseTagTrigger');
        $fireTrigger = array($idTrigger);
        $idTag = $this->api->addContainerTag($this->idSite, $idContainer, $idContainerDraftVersion, 'CustomImage', 'myName', array('customImageSrc' => 'foo'), $fireTrigger, $blockTriggerIds = [], $fireLimit = 'unlimited', $fireDelay = 0, $priority = 999, $startDate = null, $endDate = null, $description = '', $status = 'paused');
        $tag = $this->api->getContainerTag($this->idSite, $idContainer, $idContainerDraftVersion, $idTag);
        $this->assertEquals('paused', $tag['status']);
    }

    public function test_getContainer_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasViewAccess');

        $this->setAnonymousUser();
        $this->api->getContainer($this->idSite, $this->idContainer);
    }

    public function test_getContainer_shouldFailWhenContainerNotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container "99999" does not exist');

        $this->api->getContainer($this->idSite, 99999);
    }

    public function test_getContainer_success()
    {
        $this->setUser();
        $this->assertNotEmpty($this->api->getContainer($this->idSite, $this->idContainer));
    }

    public function test_enablePreviewMode_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_write Fake exception');

        $this->setUser();
        $this->api->enablePreviewMode($this->idSite, $this->idContainer);
    }

    public function test_enablePreviewMode_shouldFailWhenContainernotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container "99999" does not exist');

        $this->api->enablePreviewMode($this->idSite, 99999);
    }

    public function test_enablePreviewMode_success()
    {
        $this->assertNull($this->api->enablePreviewMode($this->idSite, $this->idContainer));
    }

    public function test_disablePreviewMode_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_write Fake exception');

        $this->setUser();
        $this->api->disablePreviewMode($this->idSite, $this->idContainer);
    }

    public function test_disablePreviewMode_shouldFailWhenContainernotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container "99999" does not exist');

        $this->api->disablePreviewMode($this->idSite, 99999);
    }

    public function test_changeDebugUrl_shouldChangeDebugUrl()
    {
        $this->assertNull($this->api->changeDebugUrl($this->idSite, 'https://example.org'));
    }

    public function test_changeDebugUrl_shouldChangeDebugUrlShouldFail()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The debug URL is invalid.');
        $this->api->changeDebugUrl($this->idSite, 'example.org');
    }

    public function test_changeDebugUrl_shouldChangeDebugUrlShouldFail2()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The debug URL is invalid.');
        $this->api->changeDebugUrl($this->idSite, 'ssh://example.org');
    }

    public function test_changeDebugUrl_shouldChangeDebugUrlShouldFail3()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The debug URL is invalid.');
        $this->api->changeDebugUrl($this->idSite, 'ssh://httpexample.org');
    }


    public function test_changeDebugUrl_shouldChangeDebugUrlShouldFail4()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The debug URL is invalid.');
        $this->api->changeDebugUrl($this->idSite, 'tel:12345');
    }

    public function test_disablePreviewMode_success()
    {
        $this->assertNull($this->api->disablePreviewMode($this->idSite, $this->idContainer));
    }

    public function test_createDefaultContainerForSite_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_write Fake exception');

        $this->setUser();
        $this->api->createDefaultContainerForSite($this->idSite);
    }

    public function test_createDefaultContainerForSite_success()
    {
        $this->setSuperUser();
        $idContainer = $this->api->createDefaultContainerForSite($this->idSite);
        $this->assertNotEmpty($idContainer);
    }

    public function test_addContainerVariable_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_write Fake exception');

        $this->setUser();
        $this->api->addContainerVariable($this->idSite, $this->idContainer, $this->idContainerDraftVersion, 'myType', 'myName');
    }

    public function test_addContainerVariable_shouldFailWhenNotHavingCustomTemplatesPermissionsAndCustomTemplateIsUsed()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_use_custom_templates Fake exception');

        $this->setWriteUser();
        $this->api->addContainerVariable($this->idSite, $this->idContainer, $this->idContainerDraftVersion, CustomJsFunctionVariable::ID, 'myName');
    }

    public function test_updateContainerVariable_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_write Fake exception');

        $this->setUser();
        $this->api->updateContainerVariable($this->idSite, $this->idContainer, $this->idContainerDraftVersion, 999, 'myName');
    }

    public function test_addContainerTrigger_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_write Fake exception');

        $this->setUser();
        $this->api->addContainerTrigger($this->idSite, $this->idContainer, $this->idContainerDraftVersion, 'myType', 'myName');
    }

    public function test_updateContainerTrigger_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_write Fake exception');

        $this->setUser();
        $this->api->updateContainerTrigger($this->idSite, $this->idContainer, $this->idContainerDraftVersion, 999, 'myName');
    }

    public function test_addContainerTag_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_write Fake exception');

        $this->setUser();
        $this->api->addContainerTag($this->idSite, $this->idContainer, $this->idContainerDraftVersion, 'myType', 'myName');
    }

    public function test_addContainerTag_shouldFailWhenNotHavingCustomTemplatesPermissionsAndCustomTemplateIsUsed()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_use_custom_templates Fake exception');

        $this->setWriteUser();
        $this->api->addContainerTag($this->idSite, $this->idContainer, $this->idContainerDraftVersion, CustomHtmlTag::ID, 'myName');
    }

    public function test_updateContainerTag_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_write Fake exception');

        $this->setUser();
        $this->api->updateContainerTag($this->idSite, $this->idContainer, $this->idContainerDraftVersion, 999, 'myName');
    }


    public function test_exportContainerVersion_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasViewAccess');

        $this->setAnonymousUser();
        $this->api->exportContainerVersion($this->idSite, $this->idContainer);
    }

    public function test_exportContainerVersion_shouldFailWhenContainerNotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container "99999" does not exist');

        $this->api->exportContainerVersion($this->idSite, 99999);
    }

    public function test_exportContainerVersion_success()
    {
        $this->setUser();
        $this->assertNotEmpty($this->api->exportContainerVersion($this->idSite, $this->idContainer));
    }

    public function test_exportContainerQuoteVersion_success()
    {
        $this->setUser();
        $container = $this->api->exportContainerVersion($this->idSite, $this->idContainerQuotes);
        $this->assertNotEmpty($container);

        $tags = $container['tags'];
        $pausedCount = 0;
        $invalidCount = 0;
        $activeCount = 0;
        foreach ($tags as $tag) {
            if ($tag['status'] === TagsDao::STATUS_ACTIVE) {
                $activeCount++;
            } elseif ($tag['status'] === TagsDao::STATUS_PAUSED) {
                $pausedCount++;
            } else {
                $invalidCount++;
            }
        }

        $this->assertSame(0, $invalidCount);
        $this->assertSame(1, $activeCount);
        $this->assertSame(2, $pausedCount);
    }

    public function test_importContainerVersion_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_write Fake exception');

        $export = $this->getValidImportJson();
        $this->setUser();
        $this->api->importContainerVersion($export, $this->idSite, $this->idContainer);
    }

    public function test_importContainerVersion_shouldFailWhenContainerNotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container "99999" does not exist');

        $export = $this->getValidImportJson();
        $this->api->importContainerVersion($export, $this->idSite, 99999);
    }

    public function test_importContainerVersion_shouldFailWhenJsonIsInvalid()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid format for exportedContainerVersion. Value needs to be a valid JSON');

        $this->api->importContainerVersion('{"fo:2"L_"', $this->idSite, $this->idContainer);
    }

    public function test_importContainerVersion_whenImportIsNotAnArray()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Invalid format for exportedContainerVersion. Value needs to be a valid JSON');

        $this->api->importContainerVersion('""', $this->idSite, $this->idContainer);
    }

    private function getValidImportJson()
    {
        return json_encode($this->api->exportContainerVersion($this->idSite, $this->idContainer));
    }

    public function test_getContainerInstallInstructions_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasViewAccess');

        $this->setAnonymousUser();
        $this->api->getContainerInstallInstructions($this->idSite, $this->idContainer, Environment::ENVIRONMENT_LIVE);
    }

    public function test_getContainerInstallInstructionsReact_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasViewAccess');

        $this->setAnonymousUser();
        $this->api->getContainerInstallInstructions($this->idSite, $this->idContainer, Environment::ENVIRONMENT_LIVE, 'react');
    }

    public function test_getContainerInstallInstructions_containerNotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container "foo01bar" does not exist');

        $this->setUser();
        $this->api->getContainerInstallInstructions($this->idSite, 'foo01bar', Environment::ENVIRONMENT_LIVE);
    }

    public function test_getContainerInstallInstructionsReact_containerNotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container "foo01bar" does not exist');

        $this->setUser();
        $this->api->getContainerInstallInstructions($this->idSite, 'foo01bar', Environment::ENVIRONMENT_LIVE, 'react');
    }

    public function test_getContainerInstallInstructions_success()
    {
        $this->setUser();
        $this->assertNotEmpty(
            $this->api->getContainerInstallInstructions($this->idSite, $this->idContainer, Environment::ENVIRONMENT_LIVE)
        );

        $this->assertNotEmpty(
            $this->api->getContainerInstallInstructions($this->idSite, $this->idContainer, Environment::ENVIRONMENT_LIVE, 'react')
        );
    }

    public function test_getContainerEmbedCode_shouldFailWhenNotHavingViewPermissions()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasViewAccess');

        $this->setAnonymousUser();
        $this->api->getContainerEmbedCode($this->idSite, $this->idContainer, Environment::ENVIRONMENT_LIVE);
    }

    public function test_getContainerEmbedCode_containerNotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container "foo01bar" does not exist');

        $this->setUser();
        $this->api->getContainerEmbedCode($this->idSite, 'foo01bar', Environment::ENVIRONMENT_LIVE);
    }

    public function test_getContainerEmbedCode_success()
    {
        $this->setUser();
        $this->assertNotEmpty(
            $this->api->getContainerEmbedCode($this->idSite, $this->idContainer, Environment::ENVIRONMENT_LIVE)
        );
    }

    public function test_getContainerTags_whenNotHavingAccess()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasViewAccess');

        $this->setAnonymousUser();
        $this->api->getContainerTags($this->idSite, $this->idContainer, $this->idContainerDraftVersion);
    }

    public function test_getContainerTags_ContainerNotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container "9999" does not exist');

        $this->setUser();
        $this->api->getContainerTags($this->idSite, 9999, $this->idContainerDraftVersion);
    }

    public function test_getContainerTags_idContainerVersionNotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container version does not exist');

        $this->setUser();
        $this->api->getContainerTags($this->idSite, $this->idContainer, 99999);
    }

    public function test_getContainerTags_success()
    {
        $this->setUser();
        $this->assertNotEmpty(
            $this->api->getContainerTags($this->idSite, $this->idContainer, $this->idContainerDraftVersion)
        );
    }

    public function test_getContainerTriggers_whenNotHavingAccess()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasViewAccess');

        $this->setAnonymousUser();
        $this->api->getContainerTriggers($this->idSite, $this->idContainer, $this->idContainerDraftVersion);
    }

    public function test_getContainerTriggers_ContainerNotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container "9999" does not exist');

        $this->setUser();
        $this->api->getContainerTriggers($this->idSite, 9999, $this->idContainerDraftVersion);
    }

    public function test_getContainerTriggers_idContainerVersionNotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container version does not exist');

        $this->setUser();
        $this->api->getContainerTriggers($this->idSite, $this->idContainer, 99999);
    }

    public function test_getContainerTriggers_success()
    {
        $this->setUser();
        $this->assertNotEmpty(
            $this->api->getContainerTriggers($this->idSite, $this->idContainer, $this->idContainerDraftVersion)
        );
    }

    public function test_getContainerTriggerReferences_UserHasNoAccess()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasViewAccess');

        $this->setAnonymousUser();
        $this->api->getContainerTriggerReferences($this->idSite, $this->idContainer, $this->idContainerDraftVersion, 999);
    }

    public function test_getContainerVariableReferences_UserHasNoAccess()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasViewAccess');

        $this->setAnonymousUser();
        $this->api->getContainerVariableReferences($this->idSite, $this->idContainer, $this->idContainerDraftVersion, 999);
    }

    public function test_getContainerVariables_UserHasNoAccess()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasViewAccess');

        $this->setAnonymousUser();
        $this->api->getContainerVariables($this->idSite, $this->idContainer, $this->idContainerDraftVersion);
    }

    public function test_getContainerVariables_ContainerNotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container "9999" does not exist');

        $this->setUser();
        $this->api->getContainerVariables($this->idSite, 9999, $this->idContainerDraftVersion);
    }

    public function test_getContainerVariables_idContainerVersionNotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container version does not exist');

        $this->setUser();
        $this->api->getContainerVariables($this->idSite, $this->idContainer, 99999);
    }

    public function test_getContainerVariables_success()
    {
        $this->setUser();
        $this->assertNotEmpty(
            $this->api->getContainerVariables($this->idSite, $this->idContainer, $this->idContainerDraftVersion)
        );
    }

    public function test_getAvailableContainerVariables_UserHasNoAccess()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasViewAccess');

        $this->setAnonymousUser();
        $this->api->getAvailableContainerVariables($this->idSite, $this->idContainer, $this->idContainerDraftVersion);
    }

    public function test_getAvailableContainerVariables_ContainerNotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container "9999" does not exist');

        $this->setUser();
        $this->api->getAvailableContainerVariables($this->idSite, 9999, $this->idContainerDraftVersion);
    }

    public function test_getAvailableContainerVariables_idContainerVersionNotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The requested container version does not exist');

        $this->setUser();
        $this->api->getAvailableContainerVariables($this->idSite, $this->idContainer, 99999);
    }

    public function test_getAvailableContainerVariables_success()
    {
        $this->setUser();
        $this->assertNotEmpty(
            $this->api->getAvailableContainerVariables($this->idSite, $this->idContainer, $this->idContainerDraftVersion)
        );
    }

    public function setUp(): void
    {
        parent::setUp();

        $this->tagFixture = new TagManagerFixture();
        $this->tagFixture->setUpWebsite();
        $this->tagFixture->setUpContainers();

        // we do not want to use idSite = 1, instead as we will sometimes also have idTag = 1... better tests this way
        $this->idSite = $this->tagFixture->idSite2;
        $this->idContainer = $this->tagFixture->idContainer1;
        $this->idContainerQuotes = $this->tagFixture->idContainerQuotes;
        $this->idContainerDraftVersion = $this->tagFixture->idContainer1DraftVersion;

        $this->api = API::getInstance();

        $this->setSuperUser();
    }

    public function test_addContainerTrigger_successRegularTemplateWithWriteUser($name = 'myName')
    {
        $this->setWriteUser();
        $id = $this->api->addContainerTrigger($this->idSite, $this->idContainer, $this->idContainerDraftVersion, WindowLoadedTrigger::ID, $name);
        $this->assertNotEmpty($id);
        return $id;
    }

    public function test_addContainerVariable_successRegularTemplateWithWriteUser()
    {
        $this->setWriteUser();
        $id = $this->api->addContainerVariable($this->idSite, $this->idContainer, $this->idContainerDraftVersion, 'Url', 'myName');
        $this->assertNotEmpty($id);
        return $id;
    }

    public function test_updateContainerVariable_successRegularTemplateWithWriteUser()
    {
        $id = $this->test_addContainerVariable_successRegularTemplateWithWriteUser();

        $this->api->updateContainerVariable($this->idSite, $this->idContainer, $this->idContainerDraftVersion, $id, 'myName2', array('urlPart' => 'href'));
    }

    public function test_updateContainerVariable_failMissingCustomTemplatePermission()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_use_custom_templates Fake exception');
        $this->setWriteUser();
        $this->api->addContainerVariable($this->idSite, $this->idContainer, $this->idContainerDraftVersion, CustomJsFunctionVariable::ID, 'myName');
    }

    public function test_updateContainerVariable_successWithCustomTemplatePermission()
    {
        // This test case actually doesn't have any assertions, but the fixture already performs some when it is set up.
        // self::expectNotToPerformAssertions();

        $this->setAdminUser();
        FakeAccess::$idSitesCapabilities = array(UseCustomTemplates::ID => array($this->idSite));
        $id = $this->api->addContainerVariable($this->idSite, $this->idContainer, $this->idContainerDraftVersion, CustomJsFunctionVariable::ID, 'myName');

        $this->setWriteUser();
        FakeAccess::$idSitesCapabilities = array(UseCustomTemplates::ID => array($this->idSite));

        $this->api->updateContainerVariable($this->idSite, $this->idContainer, $this->idContainerDraftVersion, $id, 'myName2');
    }

    public function test_addContainerTag_successRegularTemplateWithWriteUser()
    {
        $idTrigger = $this->test_addContainerTrigger_successRegularTemplateWithWriteUser();
        $this->setWriteUser();
        $fireTrigger = array($idTrigger);
        $id = $this->api->addContainerTag($this->idSite, $this->idContainer, $this->idContainerDraftVersion, 'CustomImage', 'myName', array('customImageSrc' => 'foo'), $fireTrigger);
        $this->assertNotEmpty($id);
        return $id;
    }

    public function test_updateContainerTag_successRegularTemplateWithWriteUser()
    {
        $id = $this->test_addContainerTag_successRegularTemplateWithWriteUser();

        $this->setWriteUser();

        $idTrigger = $this->test_addContainerTrigger_successRegularTemplateWithWriteUser($name = 'foobar');
        $fireTrigger = array($idTrigger);
        $this->api->updateContainerTag($this->idSite, $this->idContainer, $this->idContainerDraftVersion, $id, 'myName2', array('customImageSrc' => 'foo'), $fireTrigger);
    }

    public function test_updateContainerTag_failMissingCustomTemplatePermission()
    {
        $this->expectException(\Piwik\NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_use_custom_templates Fake exception');
        $idTrigger = $this->test_addContainerTrigger_successRegularTemplateWithWriteUser($name = 'foobar');
        $this->setAdminUser();

        $fireTrigger = array($idTrigger);

        $this->api->addContainerTag($this->idSite, $this->idContainer, $this->idContainerDraftVersion, CustomHtmlTag::ID, 'myName', array('customHtml' => 'foo'), $fireTrigger);
    }

    public function test_updateContainerTag_successWithCustomTemplatePermission()
    {
        $this->setWriteUser();
        FakeAccess::$idSitesCapabilities = array(UseCustomTemplates::ID => array($this->idSite));
        $idTrigger = $this->test_addContainerTrigger_successRegularTemplateWithWriteUser();

        $fireTrigger = array($idTrigger);
        FakeAccess::$idSitesCapabilities = array(UseCustomTemplates::ID => array($this->idSite));
        $id = $this->api->addContainerTag($this->idSite, $this->idContainer, $this->idContainerDraftVersion, CustomHtmlTag::ID, 'myName', array('customHtml' => 'foo'), $fireTrigger);

        $this->api->updateContainerTag($this->idSite, $this->idContainer, $this->idContainerDraftVersion, $id, 'myName2', array('customHtml' => 'foo'), $fireTrigger);
    }

    protected function setSuperUser()
    {
        FakeAccess::clearAccess(true);
    }

    protected function setAnonymousUser()
    {
        FakeAccess::clearAccess();
        FakeAccess::$identity = 'anonymous';
    }

    protected function setUser()
    {
        FakeAccess::clearAccess(false);
        FakeAccess::$identity = 'testUser';
        FakeAccess::$idSitesView = array(1,3, $this->idSite);
        FakeAccess::$idSitesAdmin = array();
    }

    protected function setWriteUser()
    {
        FakeAccess::clearAccess(false);
        FakeAccess::$identity = 'testUser';
        FakeAccess::$idSitesView = array();
        FakeAccess::$idSitesWrite = array(1,3, $this->idSite);
        FakeAccess::$idSitesAdmin = array();
    }

    protected function setAdminUser()
    {
        FakeAccess::clearAccess(false);
        FakeAccess::$identity = 'testUser';
        FakeAccess::$idSitesView = array();
        FakeAccess::$idSitesAdmin = array(1,3, $this->idSite);
    }

    public function provideContainerConfig()
    {
        return array(
            'Piwik\Access' => new FakeAccessTagManager()
        );
    }
}
