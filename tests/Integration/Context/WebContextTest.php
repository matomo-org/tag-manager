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
use Piwik\Plugins\TagManager\Template\Trigger\PageViewTrigger;
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
        TagManager::$enableAutoContainerCreation = true;
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
        $this->api->addContainerVariable(
            $this->idSite,
            $idContainer,
            $idContainerVersion,
            MatomoConfigurationVariable::ID,
            'MyVar',
            ['matomoUrl' => 'https://matomo.org{{MyVar}}', 'idSite' => $this->idSite]
        );

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
        $idVariable = $this->api->addContainerVariable(
            $this->idSite,
            $idContainer,
            $idContainerVersion,
            MatomoConfigurationVariable::ID,
            'MyVar',
            ['matomoUrl' => 'https://matomo.org', 'idSite' => $this->idSite]
        );

        try {
            $this->api->updateContainerVariable(
                $this->idSite,
                $idContainer,
                $idContainerVersion,
                $idVariable,
                'MyVar2',
                ['matomoUrl' => 'https://matomo.org{{MyVar2}}', 'idSite' => $this->idSite]
            );
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

    public function test_generate_doesNotRenderVariablesDescribedByStoredArrayParameters()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idContainerVersion = $this->getContainerDraftVersion($idContainer);
        $now = '2018-01-01 02:03:04';

        $nestedVariable = [
            'type' => 'CustomJsFunction',
            'name' => 'NestedFunction',
            'parameters' => ['jsFunction' => 'function () { return "nestedFunctionBody"; }'],
        ];

        // stored directly to cover data that was saved before input validation was in place
        $variablesDao = StaticContainer::get(VariablesDao::class);
        $variablesDao->createVariable($this->idSite, $idContainerVersion, MatomoConfigurationVariable::ID, 'MyConfig', [
            'matomoUrl' => 'https://matomo.org',
            'idSite' => $this->idSite,
            'customData' => [
                ['name' => 'pageUrl', 'value' => '{{PageUrl}}'],
                ['name' => 'nested', 'value' => $nestedVariable],
                ['name' => 'joined', 'value' => ['joinedVariable' => [$nestedVariable]]],
            ],
            'customDimensions' => $nestedVariable,
        ], null, [], $now);

        $idTrigger = $this->api->addContainerTrigger($this->idSite, $idContainer, $idContainerVersion, PageViewTrigger::ID, 'MyPageViewTrigger');
        $this->api->addContainerTag($this->idSite, $idContainer, $idContainerVersion, 'Matomo', 'MyMatomoTag', ['matomoConfig' => '{{MyConfig}}', 'trackingType' => 'pageview'], [$idTrigger]);

        $this->api->enablePreviewMode($this->idSite, $idContainer, $idContainerVersion);

        $containers = StaticContainer::get(Container::class);
        $container = $containers->getContainer($this->idSite, $idContainer);
        $js = implode("\n", StaticContainer::get(WebContext::class)->generate($container));

        $this->assertStringContainsString('MyMatomoTag', $js);
        $this->assertStringContainsString("Templates['PageUrlVariable']", $js);
        $this->assertStringNotContainsString('"type":"CustomJsFunction"', $js);
        $this->assertStringNotContainsString("Templates['CustomJsFunctionVariable", $js);
        $this->assertStringContainsString('{"name":"joined","value":[]}', $js);
    }

    public function test_addContainerVariable_dropsUnsupportedMultiTupleEntries()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idContainerVersion = $this->getContainerDraftVersion($idContainer);

        $this->api->addContainerVariable($this->idSite, $idContainer, $idContainerVersion, MatomoConfigurationVariable::ID, 'MyConfig', [
            'matomoUrl' => 'https://matomo.org',
            'idSite' => $this->idSite,
            'customData' => [
                'type' => 'CustomJsFunction',
                'parameters' => ['jsFunction' => 'function () {}'],
                ['name' => 'foo', 'value' => 'bar', 'type' => 'CustomJsFunction'],
            ],
        ]);

        $variables = $this->api->getContainerVariables($this->idSite, $idContainer, $idContainerVersion);
        $this->assertSame([['name' => 'foo', 'value' => 'bar']], $variables[0]['parameters']['customData']);
    }

    public function test_createContainerVersion_dropsUnsupportedMultiTupleEntriesAlreadyStoredInTheDraft()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idContainerVersion = $this->getContainerDraftVersion($idContainer);

        // stored directly to cover data that was saved before multi tuple values were normalized
        StaticContainer::get(VariablesDao::class)->createVariable($this->idSite, $idContainerVersion, MatomoConfigurationVariable::ID, 'MyConfig', [
            'matomoUrl' => 'https://matomo.org',
            'idSite' => $this->idSite,
            'customData' => [
                ['name' => 'foo', 'value' => 'bar'],
                ['name' => 'nested', 'value' => ['type' => 'CustomJsFunction']],
            ],
        ], null, [], '2018-01-01 02:03:04');

        $idNewVersion = $this->api->createContainerVersion($this->idSite, $idContainer, 'v1');

        $variables = $this->api->getContainerVariables($this->idSite, $idContainer, $idNewVersion);
        $this->assertSame([['name' => 'foo', 'value' => 'bar'], ['name' => 'nested']], $variables[0]['parameters']['customData']);
    }
}
