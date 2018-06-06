<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration;

use Piwik\Plugins\TagManager\API;
use Piwik\Plugins\TagManager\Context\WebContext;
use Piwik\Plugins\TagManager\Model\Environment;
use Piwik\Plugins\TagManager\tests\Fixtures\TagManagerFixture;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;
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
    private $idContainerDraftVersion;

    /**
     * @var API
     */
    private $api;

    /**
     * @var TagManagerFixture
     */
    private $tagFixture;

    public function setUp()
    {
        parent::setUp();

        $this->tagFixture = new TagManagerFixture();
        $this->tagFixture->setUpWebsite();
        $this->tagFixture->setUpContainers();

        // we do not want to use idSite = 1, instead as we will sometimes also have idTag = 1... better tests this way
        $this->idSite = $this->tagFixture->idSite2;
        $this->idContainer = $this->tagFixture->idContainer1;
        $this->idContainerDraftVersion = $this->tagFixture->idContainer1DraftVersion;

        $this->api = API::getInstance();

        $this->setSuperUser();
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasSomeViewAccess
     */
    public function test_getAvailableContexts_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setAnonymousUser();
        $this->api->getAvailableContexts();
    }

    public function test_getAvailableContexts_success()
    {
        $this->setUser();
        $this->assertNotEmpty($this->api->getAvailableContexts());
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasSomeViewAccess
     */
    public function test_getAvailableEnvironments_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setAnonymousUser();
        $this->api->getAvailableEnvironments();
    }

    public function test_getAvailableEnvironments_success()
    {
        $this->setUser();
        $this->assertNotEmpty($this->api->getAvailableEnvironments());
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasSomeViewAccess
     */
    public function test_getAvailableTagFireLimits_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setAnonymousUser();
        $this->api->getAvailableTagFireLimits();
    }

    public function test_getAvailableTagFireLimits_success()
    {
        $this->setUser();
        $this->assertNotEmpty($this->api->getAvailableTagFireLimits());
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasSomeViewAccess
     */
    public function test_getAvailableComparisons_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setAnonymousUser();
        $this->api->getAvailableComparisons();
    }

    public function test_getAvailableComparisons_success()
    {
        $this->setUser();
        $this->assertNotEmpty($this->api->getAvailableComparisons());
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasSomeViewAccess
     */
    public function test_getAvailableTagTypesInContext_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setAnonymousUser();
        $this->api->getAvailableTagTypesInContext(WebContext::ID);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The context "foobar" is not supported
     */
    public function test_getAvailableTagTypesInContext_whenNotValidIdContext()
    {
        $this->setUser();
        $this->api->getAvailableTagTypesInContext('foobar');
    }

    public function test_getAvailableTagTypesInContext_success()
    {
        $this->assertNotEmpty($this->api->getAvailableTagTypesInContext(WebContext::ID));
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasSomeViewAccess
     */
    public function test_getAvailableTriggerTypesInContext_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setAnonymousUser();
        $this->api->getAvailableTriggerTypesInContext(WebContext::ID);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The context "foobar" is not supported
     */
    public function test_getAvailableTriggerTypesInContext_whenNotValidIdContext()
    {
        $this->setUser();
        $this->api->getAvailableTriggerTypesInContext('foobar');
    }

    public function test_getAvailableTriggerTypesInContext_success()
    {
        $this->assertNotEmpty($this->api->getAvailableTriggerTypesInContext(WebContext::ID));
    }
    
    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasSomeViewAccess
     */
    public function test_getAvailableVariableTypesInContext_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setAnonymousUser();
        $this->api->getAvailableVariableTypesInContext(WebContext::ID);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The context "foobar" is not supported
     */
    public function test_getAvailableVariableTypesInContext_whenNotValidIdContext()
    {
        $this->setUser();
        $this->api->getAvailableVariableTypesInContext('foobar');
    }

    public function test_getAvailableVariableTypesInContext_success()
    {
        $this->assertNotEmpty($this->api->getAvailableVariableTypesInContext(WebContext::ID));
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasViewAccess
     */
    public function test_getContainers_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setAnonymousUser();
        $this->api->getContainers($this->idSite);
    }

    public function test_getContainers_success()
    {
        $this->setUser();
        $this->assertNotEmpty($this->api->getContainers($this->idSite));
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasViewAccess
     */
    public function test_getContainerVersions_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setAnonymousUser();
        $this->api->getContainerVersions($this->idSite, $this->idContainer);
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasViewAccess
     */
    public function test_getContainerVersions_shouldFailWhenContainerNotExists()
    {
        $this->setAnonymousUser();
        $this->api->getContainerVersions($this->idSite, 9999);
    }

    public function test_getContainerVersions_success()
    {
        $this->setUser();
        $this->assertNotEmpty($this->api->getContainerVersions($this->idSite, $this->idContainer));
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasViewAccess
     */
    public function test_getContainerVersion_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setAnonymousUser();
        $this->api->getContainerVersion($this->idSite, $this->idContainer, $this->idContainerDraftVersion);
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasViewAccess
     */
    public function test_getContainerVersion_shouldFailWhenContainerVersionNotExists()
    {
        $this->setAnonymousUser();
        $this->api->getContainerVersion($this->idSite, $this->idContainer, 9999);
    }

    public function test_getContainerVersion_success()
    {
        $this->setUser();
        $this->assertNotEmpty($this->api->getContainerVersion($this->idSite, $this->idContainer, $this->idContainerDraftVersion));
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasAdminAccess
     */
    public function test_deleteContainer_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setUser();
        $this->api->deleteContainer($this->idSite, $this->idContainer);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage foobar
     */
    public function test_deleteContainer_shouldFailWhenContainerNotExists()
    {
        $this->api->deleteContainer($this->idSite, 'foobar');
    }

    public function test_deleteContainer_success()
    {
        $this->api->deleteContainer($this->idSite, $this->idContainer);
        $this->assertTrue(true);
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasAdminAccess
     */
    public function test_publishContainerVersion_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setUser();
        $this->api->publishContainerVersion($this->idSite, $this->idContainer, $this->idContainerDraftVersion, Environment::ENVIRONMENT_LIVE);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The requested container version does not exist
     */
    public function test_publishContainerVersion_shouldFailWhenContainerVersionDoesNotExist()
    {
        $this->api->publishContainerVersion($this->idSite, $this->idContainer, 99999, Environment::ENVIRONMENT_LIVE);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The environment "foobar" does not exist
     */
    public function test_publishContainerVersion_shouldFailWhenEnvironmentNameIsInvalid()
    {
        $this->api->publishContainerVersion($this->idSite, $this->idContainer, $this->idContainerDraftVersion, 'foobar');
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasAdminAccess
     */
    public function test_addContainer_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setUser();
        $this->api->addContainer($this->idSite, WebContext::ID, 'TheName');
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The context "foobar" is not supported
     */
    public function test_addContainer_shouldFailWhenContextDoesNotExist()
    {
        $this->api->addContainer($this->idSite, 'foobar', 'TheName');
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasAdminAccess
     */
    public function test_updateContainer_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setUser();
        $this->api->updateContainer($this->idSite, $this->idContainer, 'TheName');
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The requested container "9999" does not exist
     */
    public function test_updateContainer_shouldFailWhenContainerVersionDoesNotExist()
    {
        $this->api->updateContainer($this->idSite, '9999',  'TheName');
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasAdminAccess
     */
    public function test_updateContainerVersion_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setUser();
        $this->api->updateContainerVersion($this->idSite, $this->idContainer, $this->idContainerDraftVersion, 'TheName');
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The requested container version does not exist
     */
    public function test_updateContainerVersion_shouldFailWhenContainerVersionDoesNotExist()
    {
        $this->api->updateContainerVersion($this->idSite, $this->idContainer, 99999, 'TheName');
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasAdminAccess
     */
    public function test_createContainerVersion_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setUser();
        $this->api->createContainerVersion($this->idSite, $this->idContainer, 'TheName');
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage checkUserHasAdminAccess
     */
    public function test_createContainerVersion_shouldFailWhenContainerVersionDoesNotExist()
    {
        $this->setUser();
        $this->api->createContainerVersion($this->idSite, $this->idContainer, 'TheName');
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasAdminAccess
     */
    public function test_deleteContainerVersion_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setUser();
        $this->api->deleteContainerVersion($this->idSite, 'foo', $this->idContainerDraftVersion);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage foobar
     */
    public function test_deleteContainerVersion_shouldFailWhenContainerNotExists()
    {
        $this->api->deleteContainerVersion($this->idSite, 'foobar', $this->idContainerDraftVersion);
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasAdminAccess
     */
    public function test_deleteContainerVariable_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setUser();
        $this->api->deleteContainerVariable($this->idSite, $this->idContainer, $this->idContainerDraftVersion, $idVariable = 999);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The requested container version does not exist
     */
    public function test_deleteContainerVariable_shouldFailWhenVersionNotExists()
    {
        $this->api->deleteContainerVariable($this->idSite, $this->idContainer, 9999, $idVariable = 999);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The requested container "9999" does not exist
     */
    public function test_deleteContainerVariable_shouldFailWhenContainerNotExists()
    {
        $this->api->deleteContainerVariable($this->idSite, 9999, $this->idContainerDraftVersion, $idVariable = 999);
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasAdminAccess
     */
    public function test_deleteContainerTrigger_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setUser();
        $this->api->deleteContainerTrigger($this->idSite, $this->idContainer, $this->idContainerDraftVersion, $idTrigger = 999);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The requested container version does not exist
     */
    public function test_deleteContainerTrigger_shouldFailWhenVersionNotExists()
    {
        $this->api->deleteContainerTrigger($this->idSite, $this->idContainer, 9999, $idTrigger = 999);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The requested container "9999" does not exist
     */
    public function test_deleteContainerTrigger_shouldFailWhenContainerNotExists()
    {
        $this->api->deleteContainerTrigger($this->idSite, 9999, $this->idContainerDraftVersion, $idTrigger = 999);
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasAdminAccess
     */
    public function test_deleteContainerTag_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setUser();
        $this->api->deleteContainerTag($this->idSite, $this->idContainer, $this->idContainerDraftVersion, $idTag = 999);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The requested container version does not exist
     */
    public function test_deleteContainerTag_shouldFailWhenVersionNotExists()
    {
        $this->api->deleteContainerTag($this->idSite, $this->idContainer, 9999, $idTag = 999);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The requested container "9999" does not exist
     */
    public function test_deleteContainerTag_shouldFailWhenContainerNotExists()
    {
        $this->api->deleteContainerTag($this->idSite, 9999, $this->idContainerDraftVersion, $idTag = 999);
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasViewAccess
     */
    public function test_getContainer_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setAnonymousUser();
        $this->api->getContainer($this->idSite, $this->idContainer);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The requested container "99999" does not exist
     */
    public function test_getContainer_shouldFailWhenContainerNotExists()
    {
        $this->api->getContainer($this->idSite, 99999);
    }

    public function test_getContainer_success()
    {
        $this->setUser();
        $this->assertNotEmpty($this->api->getContainer($this->idSite, $this->idContainer));
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasAdminAccess
     */
    public function test_enablePreviewMode_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setUser();
        $this->api->enablePreviewMode($this->idSite, $this->idContainer);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The requested container "99999" does not exist.
     */
    public function test_enablePreviewMode_shouldFailWhenContainernotExists()
    {
        $this->api->enablePreviewMode($this->idSite, 99999);
    }

    public function test_enablePreviewMode_success()
    {
        $this->assertNull($this->api->enablePreviewMode($this->idSite, $this->idContainer));
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasAdminAccess
     */
    public function test_disablePreviewMode_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setUser();
        $this->api->disablePreviewMode($this->idSite, $this->idContainer);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The requested container "99999" does not exist
     */
    public function test_disablePreviewMode_shouldFailWhenContainernotExists()
    {
        $this->api->disablePreviewMode($this->idSite, 99999);
    }

    public function test_disablePreviewMode_success()
    {
        $this->assertNull($this->api->disablePreviewMode($this->idSite, $this->idContainer));
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasAdminAccess
     */
    public function test_createDefaultContainerForSite_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setUser();
        $this->api->createDefaultContainerForSite($this->idSite);
    }

    public function test_createDefaultContainerForSite_success()
    {
        $this->setAdminUser();
        $idContainer = $this->api->createDefaultContainerForSite($this->idSite);
        $this->assertNotEmpty($idContainer);
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasAdminAccess
     */
    public function test_addContainerVariable_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setUser();
        $this->api->addContainerVariable($this->idSite, $this->idContainer, $this->idContainerDraftVersion, 'myType', 'myName');
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasAdminAccess
     */
    public function test_updateContainerVariable_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setUser();
        $this->api->updateContainerVariable($this->idSite, $this->idContainer, $this->idContainerDraftVersion, 999, 'myName');
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasAdminAccess
     */
    public function test_addContainerTrigger_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setUser();
        $this->api->addContainerTrigger($this->idSite, $this->idContainer, $this->idContainerDraftVersion, 'myType', 'myName');
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasAdminAccess
     */
    public function test_updateContainerTrigger_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setUser();
        $this->api->updateContainerTrigger($this->idSite, $this->idContainer, $this->idContainerDraftVersion, 999, 'myName');
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasAdminAccess
     */
    public function test_addContainerTag_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setUser();
        $this->api->addContainerTag($this->idSite, $this->idContainer, $this->idContainerDraftVersion, 'myType', 'myName');
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasAdminAccess
     */
    public function test_updateContainerTag_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setUser();
        $this->api->updateContainerTag($this->idSite, $this->idContainer, $this->idContainerDraftVersion, 999, 'myName');
    }


    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasViewAccess
     */
    public function test_exportContainerVersion_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setAnonymousUser();
        $this->api->exportContainerVersion($this->idSite, $this->idContainer);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The requested container "99999" does not exist
     */
    public function test_exportContainerVersion_shouldFailWhenContainerNotExists()
    {
        $this->api->exportContainerVersion($this->idSite, 99999);
    }

    public function test_exportContainerVersion_success()
    {
        $this->setUser();
        $this->assertNotEmpty($this->api->exportContainerVersion($this->idSite, $this->idContainer));
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasAdminAccess
     */
    public function test_importContainerVersion_shouldFailWhenNotHavingViewPermissions()
    {
        $export = $this->getValidImportJson();
        $this->setUser();
        $this->api->importContainerVersion($export, $this->idSite, $this->idContainer);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The requested container "99999" does not exist.
     */
    public function test_importContainerVersion_shouldFailWhenContainerNotExists()
    {
        $export = $this->getValidImportJson();
        $this->api->importContainerVersion($export, $this->idSite, 99999);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage Invalid format for exportedContainerVersion. Value needs to be a valid JSON
     */
    public function test_importContainerVersion_shouldFailWhenJsonIsInvalid()
    {
        $this->api->importContainerVersion('{"fo:2"L_"', $this->idSite, $this->idContainer);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage Invalid format for exportedContainerVersion. Value needs to be a valid JSON
     */
    public function test_importContainerVersion_whenImportIsNotAnArray()
    {
        $this->api->importContainerVersion('""', $this->idSite, $this->idContainer);
    }

    private function getValidImportJson()
    {
        return json_encode($this->api->exportContainerVersion($this->idSite, $this->idContainer));
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasViewAccess
     */
    public function test_getContainerInstallInstructions_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setAnonymousUser();
        $this->api->getContainerInstallInstructions($this->idSite, $this->idContainer, Environment::ENVIRONMENT_LIVE);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The requested container "foo01bar" does not exist
     */
    public function test_getContainerInstallInstructions_containerNotExists()
    {
        $this->setUser();
        $this->api->getContainerInstallInstructions($this->idSite, 'foo01bar', Environment::ENVIRONMENT_LIVE);
    }

    public function test_getContainerInstallInstructions_success()
    {
        $this->setUser();
        $this->assertNotEmpty(
            $this->api->getContainerInstallInstructions($this->idSite, $this->idContainer, Environment::ENVIRONMENT_LIVE)
        );
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasViewAccess
     */
    public function test_getContainerEmbedCode_shouldFailWhenNotHavingViewPermissions()
    {
        $this->setAnonymousUser();
        $this->api->getContainerEmbedCode($this->idSite, $this->idContainer, Environment::ENVIRONMENT_LIVE);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The requested container "foo01bar" does not exist
     */
    public function test_getContainerEmbedCode_containerNotExists()
    {
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

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasViewAccess
     */
    public function test_getContainerTags_whenNotHavingAccess()
    {
        $this->setAnonymousUser();
        $this->api->getContainerTags($this->idSite, $this->idContainer, $this->idContainerDraftVersion);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The requested container "9999" does not exist
     */
    public function test_getContainerTags_ContainerNotExists()
    {
        $this->setUser();
        $this->api->getContainerTags($this->idSite, 9999, $this->idContainerDraftVersion);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The requested container version does not exist
     */
    public function test_getContainerTags_idContainerVersionNotExists()
    {
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

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasViewAccess
     */
    public function test_getContainerTriggers_whenNotHavingAccess()
    {
        $this->setAnonymousUser();
        $this->api->getContainerTriggers($this->idSite, $this->idContainer, $this->idContainerDraftVersion);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The requested container "9999" does not exist
     */
    public function test_getContainerTriggers_ContainerNotExists()
    {
        $this->setUser();
        $this->api->getContainerTriggers($this->idSite, 9999, $this->idContainerDraftVersion);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The requested container version does not exist
     */
    public function test_getContainerTriggers_idContainerVersionNotExists()
    {
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

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasViewAccess
     */
    public function test_getContainerTriggerReferences_UserHasNoAccess()
    {
        $this->setAnonymousUser();
        $this->api->getContainerTriggerReferences($this->idSite, $this->idContainer, $this->idContainerDraftVersion, 999);
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasViewAccess
     */
    public function test_getContainerVariableReferences_UserHasNoAccess()
    {
        $this->setAnonymousUser();
        $this->api->getContainerVariableReferences($this->idSite, $this->idContainer, $this->idContainerDraftVersion, 999);
    }

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasViewAccess
     */
    public function test_getContainerVariables_UserHasNoAccess()
    {
        $this->setAnonymousUser();
        $this->api->getContainerVariables($this->idSite, $this->idContainer, $this->idContainerDraftVersion);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The requested container "9999" does not exist
     */
    public function test_getContainerVariables_ContainerNotExists()
    {
        $this->setUser();
        $this->api->getContainerVariables($this->idSite, 9999, $this->idContainerDraftVersion);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The requested container version does not exist
     */
    public function test_getContainerVariables_idContainerVersionNotExists()
    {
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

    /**
     * @expectedException \Piwik\NoAccessException
     * @expectedExceptionMessage checkUserHasViewAccess
     */
    public function test_getAvailableContainerVariables_UserHasNoAccess()
    {
        $this->setAnonymousUser();
        $this->api->getAvailableContainerVariables($this->idSite, $this->idContainer, $this->idContainerDraftVersion);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The requested container "9999" does not exist
     */
    public function test_getAvailableContainerVariables_ContainerNotExists()
    {
        $this->setUser();
        $this->api->getAvailableContainerVariables($this->idSite, 9999, $this->idContainerDraftVersion);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The requested container version does not exist
     */
    public function test_getAvailableContainerVariables_idContainerVersionNotExists()
    {
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
            'Piwik\Access' => new FakeAccess()
        );
    }
}
