<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration\Context;

use Piwik\Container\StaticContainer;
use Piwik\Piwik;
use Piwik\Plugins\TagManager\API;
use Piwik\Plugins\TagManager\Context\WebContext;
use Piwik\Plugins\TagManager\Dao\VariablesDao;
use Piwik\Plugins\TagManager\Exception\EntityRecursionException;
use Piwik\Plugins\TagManager\Model\Container;
use Piwik\Plugins\TagManager\TagManager;
use Piwik\Plugins\TagManager\Template\Variable\MatomoConfigurationVariable;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;
use Piwik\Tests\Framework\Fixture;

/**
 * @group TagManager
 * @group WebContext
 * @group API
 * @group WebContextTest
 * @group APITest
 * @group Plugins
 */
class WebContextTest extends IntegrationTestCase
{
    /**
     * @var int
     */
    private $idSite;

    /**
     * @var API
     */
    private $api;

    public function setUp(): void
    {
        parent::setUp();

        TagManager::$enableAutoContainerCreation = false;
        $this->idSite = Fixture::createWebsite('2014-01-01 02:03:04');
        $this->api = API::getInstance();
    }

    public function tearDown(): void
    {
        TagManager::$enableAutoContainerCreation = false;
        parent::tearDown();
    }

    private function getContainerDraftVersion($idContainer)
    {
        $containers = StaticContainer::get(Container::class);
        $containerVersion = $containers->getContainer($this->idSite, $idContainer);
        $idContainerVersion = null;
        if (!empty($containerVersion['draft']['idcontainerversion'])) {
            $idContainerVersion =  $containerVersion['draft']['idcontainerversion'];
        }
        return $idContainerVersion;
    }

    private function setupContainerWithRecursion($enablePreviewMode)
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');

        if ($enablePreviewMode) {
            $this->api->enablePreviewMode($this->idSite, $idContainer);
        }

        $idContainerVersion = $this->getContainerDraftVersion($idContainer);
        $this->api->addContainerVariable($this->idSite, $idContainer, $idContainerVersion, MatomoConfigurationVariable::ID, 'MyVar',
            ['matomoUrl' => 'https://matomo.org{{MyVar}}', 'idSite' => $this->idSite]);

        return $idContainer;
    }

    public function test_defaultContainer_flow()
    {
        $containers = $this->api->getContainers(1);
        $this->assertEmpty($this->api->getContainers(1));
        Piwik::postEvent('PluginManager.pluginActivated', ['TagManager']);
        $containers = $this->api->getContainers(1);
        $this->assertNotEmpty($this->api->getContainers(1));
    }

    public function test_detectsRecursion_whenPreviewModeEnabled()
    {
        $this->expectException(EntityRecursionException::class);
        $this->expectExceptionMessage('It seems an entity references itself or a recursion is caused in some other way. It may be related due to these entites: "MyVar"');

        $this->setupContainerWithRecursion($enablePreviewMode = true);
    }

    public function test_detectsRecursion_whenPreviewModeNotEnabled()
    {
        $this->expectException(EntityRecursionException::class);
        $this->expectExceptionMessage('It seems an entity references itself or a recursion is caused in some other way. It may be related due to these entites: "MyVar"');

        $this->setupContainerWithRecursion($enablePreviewMode = false);
    }

    public function test_detectsRecursion_addVarialbeWillDeleteTheVariable()
    {
        try {
            $this->setupContainerWithRecursion($enablePreviewMode = false);
        } catch (EntityRecursionException $e) {

            $dao = new VariablesDao();
            $var = $dao->getAllVariables();
            $this->assertEquals('deleted', $var[0]['status']);
            $this->assertEquals('MyVar', $var[0]['name']);
            $this->assertCount(1, $var);
            return;
        }

        $this->fail('An expected exception has not been thrown');
    }

    public function test_detectsRecursion_updateVariableWillRestoreOriginalValueWhenRecursionDetected()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idContainerVersion = $this->getContainerDraftVersion($idContainer);
        $idVariable = $this->api->addContainerVariable($this->idSite, $idContainer, $idContainerVersion, MatomoConfigurationVariable::ID, 'MyVar',
            ['matomoUrl' => 'https://matomo.org', 'idSite' => $this->idSite]);

        try {

            $this->api->updateContainerVariable($this->idSite, $idContainer, $idContainerVersion, $idVariable,
                'MyVar2', ['matomoUrl' => 'https://matomo.org{{MyVar2}}', 'idSite' => $this->idSite]);
        } catch (EntityRecursionException $e) {

            $dao = new VariablesDao();
            $var = $dao->getAllVariables();
            $this->assertEquals('active', $var[0]['status']);
            $this->assertEquals('MyVar', $var[0]['name']);
            $this->assertEquals('https://matomo.org', $var[0]['parameters']['matomoUrl']);
            $this->assertCount(1, $var);
            return;
        }

        $this->fail('An expected exception has not been thrown');
    }

}
