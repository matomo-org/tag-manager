<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration\Context;

use Piwik\Common;
use Piwik\Config;
use Piwik\Container\StaticContainer;
use Piwik\Db;
use Piwik\Piwik;
use Piwik\Plugins\TagManager\API;
use Piwik\Plugins\TagManager\Configuration;
use Piwik\Plugins\TagManager\Context\BaseContext;
use Piwik\Plugins\TagManager\Context\Storage\Memory;
use Piwik\Plugins\TagManager\Context\Storage\StorageInterface;
use Piwik\Plugins\TagManager\Context\WebContext;
use Piwik\Plugins\TagManager\Dao\ContainerReleaseDao;
use Piwik\Plugins\TagManager\Dao\TagsDao;
use Piwik\Plugins\TagManager\Dao\TriggersDao;
use Piwik\Plugins\TagManager\Dao\VariablesDao;
use Piwik\Plugins\TagManager\Exception\ContainerTooLargeException;
use Piwik\Plugins\TagManager\Exception\EntityRecursionException;
use Piwik\Plugins\TagManager\Model\Container;
use Piwik\Plugins\TagManager\Model\Environment;
use Piwik\Plugins\TagManager\TagManager;
use Piwik\Plugins\TagManager\Template\Tag\CustomHtmlTag;
use Piwik\Plugins\TagManager\Template\Trigger\PageViewTrigger;
use Piwik\Plugins\TagManager\Template\Variable\CustomJsFunctionVariable;
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
    // each nested variable is this many times larger than the one before it
    private const NESTED_REFERENCES = 40;

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

    public function test_generate_ignoresEntitiesWithUnavailableTypes()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idContainerVersion = $this->getContainerDraftVersion($idContainer);
        $now = '2018-01-01 02:03:04';

        $idTrigger = $this->api->addContainerTrigger($this->idSite, $idContainer, $idContainerVersion, PageViewTrigger::ID, 'MyPageViewTrigger');
        $this->api->addContainerTag($this->idSite, $idContainer, $idContainerVersion, 'CustomImage', 'MyImageTag', ['customImageSrc' => 'https://matomo.org/foo.png'], [$idTrigger]);

        // types that are not available, eg because the plugin providing them is no longer active
        $tagsDao = StaticContainer::get(TagsDao::class);
        $tagsDao->createTag($this->idSite, $idContainerVersion, 'NotAvailableTag', 'UnavailableTag', [], [$idTrigger], [], 'unlimited', 0, 999, null, null, $now);
        $triggersDao = StaticContainer::get(TriggersDao::class);
        $idUnavailableTrigger = $triggersDao->createTrigger($this->idSite, $idContainerVersion, 'NotAvailableTrigger', 'UnavailableTrigger', [], [], $now);
        // a tag blocked by an unavailable trigger must not fire without that block
        $tagsDao->createTag($this->idSite, $idContainerVersion, 'CustomImage', 'TagWithUnavailableBlockTrigger', ['customImageSrc' => 'https://matomo.org/bar.png'], [$idTrigger], [$idUnavailableTrigger], 'unlimited', 0, 999, null, null, $now);
        $variablesDao = StaticContainer::get(VariablesDao::class);
        $variablesDao->createVariable($this->idSite, $idContainerVersion, 'NotAvailableVariable', 'UnavailableVariable', [], null, [], $now);
        $triggersDao->createTrigger($this->idSite, $idContainerVersion, PageViewTrigger::ID, 'TriggerWithUnavailableVariable', [], [
            ['actual' => 'UnavailableVariable', 'comparison' => 'equals', 'expected' => 'foo'],
        ], $now);

        // entities referencing the unavailable variable must not run with an unresolved value
        $tagsDao->createTag($this->idSite, $idContainerVersion, 'CustomImage', 'TagWithUnavailableVariableParam', ['customImageSrc' => '{{UnavailableVariable}}'], [$idTrigger], [], 'unlimited', 0, 999, null, null, $now);
        $variablesDao->createVariable($this->idSite, $idContainerVersion, MatomoConfigurationVariable::ID, 'NestedVariable', ['matomoUrl' => '{{UnavailableVariable}}', 'idSite' => $this->idSite], null, [], $now);
        $tagsDao->createTag($this->idSite, $idContainerVersion, 'CustomImage', 'TagWithNestedVariable', ['customImageSrc' => '{{NestedVariable}}'], [$idTrigger], [], 'unlimited', 0, 999, null, null, $now);
        $triggersDao->createTrigger($this->idSite, $idContainerVersion, 'CustomEvent', 'TriggerWithUnavailableVariableParam', ['eventName' => '{{UnavailableVariable}}'], [], $now);

        // the preview release keeps the entity names in the generated container
        $this->api->enablePreviewMode($this->idSite, $idContainer, $idContainerVersion);

        $containers = StaticContainer::get(Container::class);
        $container = $containers->getContainer($this->idSite, $idContainer);
        $files = StaticContainer::get(WebContext::class)->generate($container);
        $js = implode("\n", $files);

        $this->assertStringContainsString('MyImageTag', $js);
        $this->assertStringContainsString('MyPageViewTrigger', $js);
        $this->assertStringNotContainsString('NotAvailableTag', $js);
        $this->assertStringNotContainsString('NotAvailableTrigger', $js);
        $this->assertStringNotContainsString('NotAvailableVariable', $js);
        $this->assertStringNotContainsString('UnavailableTag', $js);
        $this->assertStringNotContainsString('UnavailableTrigger', $js);
        $this->assertStringNotContainsString('UnavailableVariable', $js);
        $this->assertStringNotContainsString('TriggerWithUnavailableVariable', $js);
        $this->assertStringNotContainsString('TagWithUnavailableBlockTrigger', $js);
        $this->assertStringNotContainsString('TagWithUnavailableVariableParam', $js);
        $this->assertStringNotContainsString('NestedVariable', $js);
        $this->assertStringNotContainsString('TagWithNestedVariable', $js);
        $this->assertStringNotContainsString('TriggerWithUnavailableVariableParam', $js);
    }

    public function test_generate_ignoresEntitiesUsingADisabledPreConfiguredVariable()
    {
        Config::getInstance()->TagManager = [Configuration::KEY_DISABLED_VARIABLES => ['PageUrl']];

        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idContainerVersion = $this->getContainerDraftVersion($idContainer);
        $now = '2018-01-01 02:03:04';

        $idTrigger = $this->api->addContainerTrigger($this->idSite, $idContainer, $idContainerVersion, PageViewTrigger::ID, 'MyPageViewTrigger');
        $this->api->addContainerTag($this->idSite, $idContainer, $idContainerVersion, 'CustomImage', 'MyImageTag', ['customImageSrc' => 'https://matomo.org/foo.png'], [$idTrigger]);
        $tagsDao = StaticContainer::get(TagsDao::class);
        $tagsDao->createTag($this->idSite, $idContainerVersion, 'CustomImage', 'TagWithDisabledVariable', ['customImageSrc' => 'https://matomo.org/foo.png?u={{PageUrl}}'], [$idTrigger], [], 'unlimited', 0, 999, null, null, $now);
        $triggersDao = StaticContainer::get(TriggersDao::class);
        $triggersDao->createTrigger($this->idSite, $idContainerVersion, PageViewTrigger::ID, 'TriggerWithDisabledVariable', [], [
            ['actual' => 'PageUrl', 'comparison' => 'equals', 'expected' => 'foo'],
        ], $now);

        $this->api->enablePreviewMode($this->idSite, $idContainer, $idContainerVersion);

        $containers = StaticContainer::get(Container::class);
        $container = $containers->getContainer($this->idSite, $idContainer);
        $js = implode("\n", StaticContainer::get(WebContext::class)->generate($container));

        $this->assertStringContainsString('MyImageTag', $js);
        $this->assertStringNotContainsString('TagWithDisabledVariable', $js);
        $this->assertStringNotContainsString('TriggerWithDisabledVariable', $js);
    }

    /**
     * The consent-exemption option is only offered while the hybrid tracking feature flag is on. A
     * container released with it on stops applying it once the flag is turned off, the next time
     * the release is generated, without a new version having to be published.
     */
    public function test_generate_leavesOutAParameterTheVariableTypeNoLongerDefines()
    {
        Config::getInstance()->FeatureFlags = ['HybridTracking_feature' => 'enabled'];

        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idContainerVersion = $this->getContainerDraftVersion($idContainer);

        $this->api->addContainerVariable($this->idSite, $idContainer, $idContainerVersion, MatomoConfigurationVariable::ID, 'MyConfig', [
            'matomoUrl' => 'https://matomo.org',
            'idSite' => $this->idSite,
            'requireConsentForRestrictedData' => true,
        ]);
        $idTrigger = $this->api->addContainerTrigger($this->idSite, $idContainer, $idContainerVersion, PageViewTrigger::ID, 'MyPageViewTrigger');
        $this->api->addContainerTag($this->idSite, $idContainer, $idContainerVersion, 'Matomo', 'MyMatomoTag', ['matomoConfig' => '{{MyConfig}}', 'trackingType' => 'pageview'], [$idTrigger]);

        $this->api->enablePreviewMode($this->idSite, $idContainer, $idContainerVersion);
        $container = StaticContainer::get(Container::class)->getContainer($this->idSite, $idContainer);

        $js = implode("\n", StaticContainer::get(WebContext::class)->generate($container));
        $this->assertStringContainsString('"requireConsentForRestrictedData":true', $js, 'the option applies while the flag is on');

        Config::getInstance()->FeatureFlags = ['HybridTracking_feature' => 'disabled'];

        $js = implode("\n", StaticContainer::get(WebContext::class)->generate($container));
        $this->assertStringContainsString('MyMatomoTag', $js);
        $this->assertStringNotContainsString('"requireConsentForRestrictedData":', $js, 'the option still applies with the flag off');
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

    public function test_addContainerVariable_refusesAVariableThatMakesTheContainerTooLarge()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idContainerVersion = $this->getContainerDraftVersion($idContainer);

        $refusedLevel = $this->addNestedVariablesUntilRefused($idContainer, $idContainerVersion);

        $variables = array_column((new VariablesDao())->getAllVariables(), 'status', 'name');
        $this->assertSame('deleted', $variables['Nested' . $refusedLevel]);
        $this->assertSame('active', $variables['Nested' . ($refusedLevel - 1)]);
    }

    public function test_addContainerTag_refusesATagThatMakesTheContainerTooLarge()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idContainerVersion = $this->getContainerDraftVersion($idContainer);
        $refusedLevel = $this->addNestedVariablesUntilRefused($idContainer, $idContainerVersion);
        $idTrigger = $this->api->addContainerTrigger($this->idSite, $idContainer, $idContainerVersion, PageViewTrigger::ID, 'MyPageViewTrigger');

        try {
            $this->api->addContainerTag(
                $this->idSite,
                $idContainer,
                $idContainerVersion,
                CustomHtmlTag::ID,
                // named like a variable, which must not let it be weighed as that variable
                'Nested0',
                ['customHtml' => str_repeat('{{Nested' . ($refusedLevel - 1) . '}}', self::NESTED_REFERENCES)],
                [$idTrigger]
            );
        } catch (ContainerTooLargeException $e) {
            $tags = (new TagsDao())->getAllTags();
            $this->assertCount(1, $tags);
            $this->assertSame('deleted', $tags[0]['status']);
            return;
        }

        $this->fail('An expected exception has not been thrown');
    }

    public function test_resumeContainerTag_keepsTheTagPausedWhenResumingMakesTheContainerTooLarge()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idContainerVersion = $this->getContainerDraftVersion($idContainer);
        $refusedLevel = $this->addNestedVariablesUntilRefused($idContainer, $idContainerVersion);
        $idTrigger = $this->api->addContainerTrigger($this->idSite, $idContainer, $idContainerVersion, PageViewTrigger::ID, 'MyPageViewTrigger');
        $idTag = $this->api->addContainerTag(
            $this->idSite,
            $idContainer,
            $idContainerVersion,
            CustomHtmlTag::ID,
            'Large',
            ['customHtml' => str_repeat('{{Nested' . ($refusedLevel - 1) . '}}', self::NESTED_REFERENCES)],
            [$idTrigger],
            [],
            'unlimited',
            0,
            999,
            null,
            null,
            '',
            'paused'
        );

        try {
            $this->api->resumeContainerTag($this->idSite, $idContainer, $idContainerVersion, $idTag);
        } catch (ContainerTooLargeException $e) {
            $this->assertSame('paused', $this->api->getContainerTag($this->idSite, $idContainer, $idContainerVersion, $idTag)['status']);
            return;
        }

        $this->fail('An expected exception has not been thrown');
    }

    public function test_resumeContainerTag_leavesAnActiveTagActiveWhenTheContainerIsAlreadyTooLarge()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idContainerVersion = $this->getContainerDraftVersion($idContainer);
        $refusedLevel = $this->addNestedVariablesUntilRefused($idContainer, $idContainerVersion);
        $idTrigger = $this->api->addContainerTrigger($this->idSite, $idContainer, $idContainerVersion, PageViewTrigger::ID, 'MyPageViewTrigger');
        $idTag = $this->api->addContainerTag($this->idSite, $idContainer, $idContainerVersion, CustomHtmlTag::ID, 'Active', ['customHtml' => 'x'], [$idTrigger]);

        // stored without the API, which refuses it
        StaticContainer::get(VariablesDao::class)->createVariable(
            $this->idSite,
            $idContainerVersion,
            MatomoConfigurationVariable::ID,
            'TooLarge',
            $this->getNestedVariableParameters($refusedLevel),
            false,
            [],
            '2020-01-01 00:00:00'
        );

        try {
            $this->api->resumeContainerTag($this->idSite, $idContainer, $idContainerVersion, $idTag);
        } catch (ContainerTooLargeException $e) {
            // the container was already too large before the call
        }

        $this->assertSame('active', $this->api->getContainerTag($this->idSite, $idContainer, $idContainerVersion, $idTag)['status']);
    }

    public function test_addContainerTrigger_refusesATriggerThatMakesTheContainerTooLarge()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idContainerVersion = $this->getContainerDraftVersion($idContainer);
        $refusedLevel = $this->addNestedVariablesUntilRefused($idContainer, $idContainerVersion);

        try {
            $this->api->addContainerTrigger($this->idSite, $idContainer, $idContainerVersion, PageViewTrigger::ID, 'Large', [], $this->getLargeConditions($refusedLevel));
        } catch (ContainerTooLargeException $e) {
            $triggers = (new TriggersDao())->getAllTriggers();
            $this->assertCount(1, $triggers);
            $this->assertSame('deleted', $triggers[0]['status']);
            return;
        }

        $this->fail('An expected exception has not been thrown');
    }

    public function test_updateContainerTrigger_restoresTheTriggerWhenTheUpdateMakesTheContainerTooLarge()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idContainerVersion = $this->getContainerDraftVersion($idContainer);
        $refusedLevel = $this->addNestedVariablesUntilRefused($idContainer, $idContainerVersion);
        $idTrigger = $this->api->addContainerTrigger($this->idSite, $idContainer, $idContainerVersion, PageViewTrigger::ID, 'Small');

        try {
            $this->api->updateContainerTrigger($this->idSite, $idContainer, $idContainerVersion, $idTrigger, 'Large', [], $this->getLargeConditions($refusedLevel));
        } catch (ContainerTooLargeException $e) {
            $trigger = $this->api->getContainerTrigger($this->idSite, $idContainer, $idContainerVersion, $idTrigger);
            $this->assertSame('Small', $trigger['name']);
            $this->assertSame([], $trigger['conditions']);
            return;
        }

        $this->fail('An expected exception has not been thrown');
    }

    public function test_addContainerVariable_countsVariablesExpandedIntoACustomJsFunction()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idContainerVersion = $this->getContainerDraftVersion($idContainer);
        $refusedLevel = $this->addNestedVariablesUntilRefused($idContainer, $idContainerVersion);

        $this->expectException(ContainerTooLargeException::class);
        $this->api->addContainerVariable(
            $this->idSite,
            $idContainer,
            $idContainerVersion,
            CustomJsFunctionVariable::ID,
            'Large',
            // the extra brace would hide the macro from a parser, but the context still replaces the {{...}} inside it
            ['jsFunction' => 'function () { return ' . str_repeat('"{{{Nested' . ($refusedLevel - 1) . '}}}" + ', self::NESTED_REFERENCES) . '""; }']
        );
    }

    public function test_addContainerVariable_refusesNestedVariablesReferencedInADifferentCase()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idContainerVersion = $this->getContainerDraftVersion($idContainer);

        if (function_exists('memory_reset_peak_usage')) {
            memory_reset_peak_usage();
        }
        $memoryBefore = memory_get_usage();

        // names are looked up case-insensitively, so each reference must still be resolved only once
        $this->addNestedVariablesUntilRefused($idContainer, $idContainerVersion, 'nested');

        // resolving every reference again peaks at over 600 MB before the container is refused
        $this->assertLessThan(256 * 1024 * 1024, memory_get_peak_usage() - $memoryBefore);
    }

    public function test_addContainerVariable_countsPreConfiguredVariablesExpandedIntoACustomJsFunction()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idContainerVersion = $this->getContainerDraftVersion($idContainer);

        // the context replaces a pre-configured {{macro}} with code many times its own length
        $response = StaticContainer::get(WebContext::class)->getPreConfiguredVariablesJSCodeResponse(WebContext::ID);
        $lengths = array_map('strlen', $response['values']);
        $longest = array_search(max($lengths), $lengths);
        $references = intdiv(BaseContext::MAX_CONTAINER_WEIGHT, $lengths[$longest]) + 1;
        $this->assertLessThan(BaseContext::MAX_CONTAINER_WEIGHT / 4, $references * strlen($response['keys'][$longest]));

        $this->expectException(ContainerTooLargeException::class);
        $this->api->addContainerVariable(
            $this->idSite,
            $idContainer,
            $idContainerVersion,
            CustomJsFunctionVariable::ID,
            'Large',
            ['jsFunction' => 'function () { return ' . str_repeat($response['keys'][$longest] . ' + ', $references) . '""; }']
        );
    }

    public function test_addContainerVariable_refusesNestedVariablesAlreadyReferencedByATag()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idContainerVersion = $this->getContainerDraftVersion($idContainer);
        $idTrigger = $this->api->addContainerTrigger($this->idSite, $idContainer, $idContainerVersion, PageViewTrigger::ID, 'MyPageViewTrigger');
        $references = '';
        for ($level = 0; $level < 10; $level++) {
            $references .= '{{Nested' . $level . '}}';
        }
        // the tag resolves each variable before the container's own list does, which must not resolve it again
        $this->api->addContainerTag($this->idSite, $idContainer, $idContainerVersion, CustomHtmlTag::ID, 'References', ['customHtml' => $references], [$idTrigger]);

        $this->addNestedVariablesUntilRefused($idContainer, $idContainerVersion);
    }

    /**
     * @dataProvider getOuterVariableCopies
     */
    public function test_generate_doesNotExpandMacrosInsideAVariableAlreadyExpandedIntoACustomJsFunction(int $outerCopies)
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idContainerVersion = $this->getContainerDraftVersion($idContainer);
        $this->api->enablePreviewMode($this->idSite, $idContainer);

        // Outer expands Middle, whose own jsFunction references Inner; Middle is created first so its key is replaced first
        $references = 150;
        $this->api->addContainerVariable($this->idSite, $idContainer, $idContainerVersion, CustomJsFunctionVariable::ID, 'Middle', ['jsFunction' => 'function () { return ' . str_repeat('{{Inner}} + ', $references) . '""; }']);
        $this->api->addContainerVariable($this->idSite, $idContainer, $idContainerVersion, 'Constant', 'Inner', ['constantValue' => str_repeat('x', 500)]);
        // copies with the same function share one template, which must still be expanded only once
        for ($copy = 1; $copy <= $outerCopies; $copy++) {
            $this->api->addContainerVariable($this->idSite, $idContainer, $idContainerVersion, CustomJsFunctionVariable::ID, 'Outer' . $copy, ['jsFunction' => 'function () { return ' . str_repeat('{{Middle}} + ', $references) . '""; }']);
        }

        $container = $this->api->getContainer($this->idSite, $idContainer);
        $previewPath = StaticContainer::get(WebContext::class)->getJsTargetPath($this->idSite, $idContainer, Environment::ENVIRONMENT_PREVIEW, $container['created_date']);
        $files = StaticContainer::get(Container::class)->generateContainer($this->idSite, $idContainer);

        $this->assertLessThan(BaseContext::MAX_CONTAINER_WEIGHT, strlen($files[$previewPath]));
    }

    public function getOuterVariableCopies(): array
    {
        return [
            'one copy' => [1],
            'two copies sharing a template' => [2],
        ];
    }

    public function test_generate_resolvesAVariableReferencingAnUnavailableVariableOnlyOnce()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idContainerVersion = $this->getContainerDraftVersion($idContainer);
        $this->api->addContainerVariable($this->idSite, $idContainer, $idContainerVersion, 'Constant', 'Chain0', ['constantValue' => 'x']);
        // the variable stops being available, so every variable referencing it is left out and adds no weight
        $updated = Db::query('UPDATE ' . Common::prefixTable('tagmanager_variable') . ' SET type = ? WHERE name = ? AND idcontainerversion = ?', ['NotAvailableVariable', 'Chain0', $idContainerVersion]);
        $this->assertSame(1, $updated->rowCount());

        $start = microtime(true);
        for ($level = 1; $level <= 20; $level++) {
            $userId = '{{Chain' . ($level - 1) . '}}{{Chain' . ($level - 1) . '}}';
            $this->api->addContainerVariable($this->idSite, $idContainer, $idContainerVersion, MatomoConfigurationVariable::ID, 'Chain' . $level, ['matomoUrl' => 'https://matomo.org', 'idSite' => $this->idSite, 'userId' => $userId]);
        }

        // resolving each of the 2^20 paths through the chain takes minutes
        $this->assertLessThan(30, microtime(true) - $start);
    }

    public function test_importContainerVersion_restoresTheDraftWhenTheImportIsTooLarge()
    {
        $idSourceContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'source');
        $idSourceVersion = $this->getContainerDraftVersion($idSourceContainer);
        $refusedLevel = $this->addNestedVariablesUntilRefused($idSourceContainer, $idSourceVersion);
        // stored without the API, which refuses it
        StaticContainer::get(VariablesDao::class)->createVariable(
            $this->idSite,
            $idSourceVersion,
            MatomoConfigurationVariable::ID,
            'TooLarge',
            $this->getNestedVariableParameters($refusedLevel),
            false,
            [],
            '2020-01-01 00:00:00'
        );
        $export = json_encode($this->api->exportContainerVersion($this->idSite, $idSourceContainer));

        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $this->api->addContainerVariable($this->idSite, $idContainer, $this->getContainerDraftVersion($idContainer), MatomoConfigurationVariable::ID, 'Kept', $this->getNestedVariableParameters(0));

        try {
            $this->api->importContainerVersion($export, $this->idSite, $idContainer);
        } catch (ContainerTooLargeException $e) {
            $names = array_column($this->api->getContainerVariables($this->idSite, $idContainer, $this->getContainerDraftVersion($idContainer)), 'name');
            $this->assertSame(['Kept'], $names);
            return;
        }

        $this->fail('An expected exception has not been thrown');
    }

    public function test_updateContainerTag_restoresTheTagWhenTheUpdateMakesTheContainerTooLarge()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idContainerVersion = $this->getContainerDraftVersion($idContainer);
        $refusedLevel = $this->addNestedVariablesUntilRefused($idContainer, $idContainerVersion);
        $idTrigger = $this->api->addContainerTrigger($this->idSite, $idContainer, $idContainerVersion, PageViewTrigger::ID, 'MyPageViewTrigger');
        $idTag = $this->api->addContainerTag($this->idSite, $idContainer, $idContainerVersion, CustomHtmlTag::ID, 'Small', ['customHtml' => '<p>small</p>'], [$idTrigger]);

        try {
            $this->api->updateContainerTag(
                $this->idSite,
                $idContainer,
                $idContainerVersion,
                $idTag,
                'Large',
                ['customHtml' => str_repeat('{{Nested' . ($refusedLevel - 1) . '}}', self::NESTED_REFERENCES)],
                [$idTrigger]
            );
        } catch (ContainerTooLargeException $e) {
            $tag = $this->api->getContainerTag($this->idSite, $idContainer, $idContainerVersion, $idTag);
            $this->assertSame('Small', $tag['name']);
            $this->assertSame('<p>small</p>', $tag['parameters']['customHtml']);
            return;
        }

        $this->fail('An expected exception has not been thrown');
    }

    public function test_generate_aPreviewReleaseThatFailsLeavesTheLiveReleaseGenerated()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idDraftVersion = $this->getContainerDraftVersion($idContainer);
        $idLiveVersion = $this->api->createContainerVersion($this->idSite, $idContainer, 'v1');
        $refusedLevel = $this->addNestedVariablesUntilRefused($idContainer, $idDraftVersion);

        // stored without the API, which refuses it
        StaticContainer::get(VariablesDao::class)->createVariable(
            $this->idSite,
            $idDraftVersion,
            MatomoConfigurationVariable::ID,
            'TooLarge',
            $this->getNestedVariableParameters($refusedLevel),
            false,
            [],
            '2020-01-01 00:00:00'
        );

        // the preview release is listed first, as when preview mode was enabled before the last publish to live
        $releasesDao = StaticContainer::get(ContainerReleaseDao::class);
        $releasesDao->releaseVersion($this->idSite, $idContainer, $idDraftVersion, Environment::ENVIRONMENT_PREVIEW, 'login', '2020-01-01 00:00:00');
        $releasesDao->releaseVersion($this->idSite, $idContainer, $idLiveVersion, Environment::ENVIRONMENT_LIVE, 'login', '2020-01-02 00:00:00');

        try {
            StaticContainer::get(Container::class)->generateContainer($this->idSite, $idContainer);
        } catch (ContainerTooLargeException $e) {
            $container = $this->api->getContainer($this->idSite, $idContainer);
            $livePath = StaticContainer::get(WebContext::class)->getJsTargetPath($this->idSite, $idContainer, Environment::ENVIRONMENT_LIVE, $container['created_date']);
            $files = \Closure::bind(function () {
                return $this->content;
            }, StaticContainer::get(StorageInterface::class), Memory::class)();

            $this->assertStringContainsString('window.MatomoTagManager.addContainer(', $files[PIWIK_DOCUMENT_ROOT . $livePath]);
            return;
        }

        $this->fail('An expected exception has not been thrown');
    }

    /**
     * Adds variables Nested0, Nested1, … each referencing the one before it, until the API refuses one as too large
     *
     * @return int the level of the refused variable
     */
    private function addNestedVariablesUntilRefused(string $idContainer, int $idContainerVersion, string $referencePrefix = 'Nested'): int
    {
        for ($level = 0; $level < 10; $level++) {
            try {
                $this->api->addContainerVariable(
                    $this->idSite,
                    $idContainer,
                    $idContainerVersion,
                    MatomoConfigurationVariable::ID,
                    'Nested' . $level,
                    $this->getNestedVariableParameters($level, $referencePrefix)
                );
            } catch (ContainerTooLargeException $e) {
                $this->assertGreaterThan(0, $level);
                return $level;
            }
        }

        $this->fail('No variable was refused as too large');
    }

    /**
     * @return array<int, array<string, string>>
     */
    private function getLargeConditions(int $refusedLevel): array
    {
        $condition = ['actual' => 'Nested' . ($refusedLevel - 1), 'comparison' => 'equals', 'expected' => 'x'];
        return array_fill(0, self::NESTED_REFERENCES, $condition);
    }

    /**
     * @return array<string, mixed>
     */
    private function getNestedVariableParameters(int $level, string $referencePrefix = 'Nested'): array
    {
        $userId = $level === 0 ? str_repeat('x', 500) : str_repeat('{{' . $referencePrefix . ($level - 1) . '}}', self::NESTED_REFERENCES);
        return ['matomoUrl' => 'https://matomo.org', 'idSite' => $this->idSite, 'userId' => $userId];
    }
}
