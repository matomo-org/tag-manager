<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration\Context;

use Piwik\Common;
use Piwik\Container\StaticContainer;
use Piwik\Db;
use Piwik\DI;
use Piwik\Nonce;
use Piwik\Piwik;
use Piwik\Plugins\TagManager\API;
use Piwik\Plugins\TagManager\Context\AndroidContext;
use Piwik\Plugins\TagManager\Context\BaseContext;
use Piwik\Plugins\TagManager\Context\iOSContext;
use Piwik\Plugins\TagManager\Context\Storage\Memory;
use Piwik\Plugins\TagManager\Context\Storage\StorageInterface;
use Piwik\Plugins\TagManager\Context\WebContext;
use Piwik\Plugins\TagManager\Controller;
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
    private const NESTED_REFERENCES = 20;

    /**
     * @var int
     */
    private $idSite;

    /**
     * @var API
     */
    private $api;

    /**
     * How often a variable was looked up by name
     * @var int
     */
    public static $variableLookups = 0;

    public function setUp(): void
    {
        parent::setUp();

        TagManager::$enableAutoContainerCreation = false;
        $this->idSite = Fixture::createWebsite('2014-01-01 02:03:04');
        $this->api = API::getInstance();
        self::$variableLookups = 0;
    }

    public function tearDown(): void
    {
        $_GET = [];
        $_POST = [];
        TagManager::$enableAutoContainerCreation = true;
        parent::tearDown();
    }

    public function provideContainerConfig()
    {
        return [
            VariablesDao::class => DI::factory(function () {
                return new class extends VariablesDao {
                    public function findVariableByName($idSite, $idContainerVersion, $variableName)
                    {
                        WebContextTest::$variableLookups++;
                        return parent::findVariableByName($idSite, $idContainerVersion, $variableName);
                    }
                };
            }),
        ];
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

    public function test_detectsRecursion_addVarialbeWillNotStoreTheVariable()
    {
        try {
            $this->setupContainerWithRecursion($enablePreviewMode = false);
        } catch (EntityRecursionException $e) {
            $this->assertSame([], (new VariablesDao())->getAllVariables());
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

    public function test_addContainerVariable_refusesAVariableThatMakesTheContainerTooLarge()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idContainerVersion = $this->getContainerDraftVersion($idContainer);

        $refusedLevel = $this->addNestedVariablesUntilRefused($idContainer, $idContainerVersion);

        $variables = array_column((new VariablesDao())->getAllVariables(), 'status', 'name');
        $this->assertArrayNotHasKey('Nested' . $refusedLevel, $variables);
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
            $this->assertSame([], (new TagsDao())->getAllTags());
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
            $this->assertSame([], (new TriggersDao())->getAllTriggers());
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

    /**
     * @dataProvider getMobileContexts
     */
    public function test_addContainerVariable_ignoresMacrosThatAMobileContextDoesNotExpand(string $contextClass)
    {
        $idContainer = $this->api->addContainer($this->idSite, StaticContainer::get($contextClass)->getId(), 'test');
        $idContainerVersion = $this->getContainerDraftVersion($idContainer);
        $refusedLevel = $this->addNestedVariablesUntilRefused($idContainer, $idContainerVersion);

        $idVariable = $this->api->addContainerVariable(
            $this->idSite,
            $idContainer,
            $idContainerVersion,
            CustomJsFunctionVariable::ID,
            'Large',
            ['jsFunction' => 'function () { return ' . str_repeat('"{{{Nested' . ($refusedLevel - 1) . '}}}" + ', self::NESTED_REFERENCES) . '""; }']
        );

        $this->assertNotEmpty($idVariable);
    }

    public function getMobileContexts(): array
    {
        return [
            'android' => [AndroidContext::class],
            'ios' => [iOSContext::class],
        ];
    }

    public function test_addContainerVariable_refusesNestedVariablesReferencedInADifferentCase()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idContainerVersion = $this->getContainerDraftVersion($idContainer);

        // names are looked up case-insensitively, so each reference must still be resolved only once
        $this->addNestedVariablesUntilRefused($idContainer, $idContainerVersion, 'nested');

        // resolving every reference again would look each level up 40 times as often as the one above it
        $this->assertLessThan(1000, self::$variableLookups);
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

    /**
     * @dataProvider getContexts
     */
    public function test_generate_aPreviewReleaseThatFailsLeavesTheLiveReleaseGenerated(string $contextClass)
    {
        $context = StaticContainer::get($contextClass);
        $idContainer = $this->api->addContainer($this->idSite, $context->getId(), 'test');
        $idDraftVersion = $this->getContainerDraftVersion($idContainer);
        $idLiveVersion = $this->api->createContainerVersion($this->idSite, $idContainer, 'v1');
        $this->storeTooLargeVariable($idDraftVersion);

        // the preview release is listed first, as when preview mode was enabled before the last publish to live
        $releasesDao = StaticContainer::get(ContainerReleaseDao::class);
        $releasesDao->releaseVersion($this->idSite, $idContainer, $idDraftVersion, Environment::ENVIRONMENT_PREVIEW, 'login', '2020-01-01 00:00:00');
        $releasesDao->releaseVersion($this->idSite, $idContainer, $idLiveVersion, Environment::ENVIRONMENT_LIVE, 'login', '2020-01-02 00:00:00');

        try {
            StaticContainer::get(Container::class)->generateContainer($this->idSite, $idContainer);
        } catch (ContainerTooLargeException $e) {
            $this->assertArrayHasKey($this->getReleasePath($context, $idContainer, Environment::ENVIRONMENT_LIVE), $this->getGeneratedFiles());
            return;
        }

        $this->fail('An expected exception has not been thrown');
    }

    public function getContexts(): array
    {
        return [
            'web' => [WebContext::class],
            'android' => [AndroidContext::class],
            'ios' => [iOSContext::class],
        ];
    }

    public function test_regenerateReleasedContainers_carriesOnAfterAContainerThatFails()
    {
        $context = StaticContainer::get(WebContext::class);
        $idContainers = [];
        $idVersions = [];
        foreach (['first', 'second'] as $name) {
            $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, $name);
            $idContainers[] = $idContainer;
            $idVersions[] = $this->getContainerDraftVersion($idContainer);
            StaticContainer::get(ContainerReleaseDao::class)->releaseVersion($this->idSite, $idContainer, end($idVersions), Environment::ENVIRONMENT_LIVE, 'login', '2020-01-01 00:00:00');
        }

        // containers are regenerated in no set order, so each is made to fail in turn
        foreach ([0, 1] as $failing) {
            $tooLarge = $this->storeTooLargeVariable($idVersions[$failing]);
            $storage = StaticContainer::get(StorageInterface::class);
            foreach (array_keys($this->getGeneratedFiles()) as $path) {
                $storage->delete($path);
            }

            (new TagManager())->regenerateReleasedContainers();

            $working = 1 - $failing;
            $files = $this->getGeneratedFiles();
            $this->assertArrayHasKey($this->getReleasePath($context, $idContainers[$working], Environment::ENVIRONMENT_LIVE), $files);
            $this->assertArrayNotHasKey($this->getReleasePath($context, $idContainers[$failing], Environment::ENVIRONMENT_LIVE), $files);

            StaticContainer::get(VariablesDao::class)->deleteContainerVariable($this->idSite, $idVersions[$failing], $tooLarge, '2020-01-02 00:00:00');
        }
    }

    public function test_addContainerVariable_countsVariablesWithABraceInTheirNameExpandedIntoACustomJsFunction()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idContainerVersion = $this->getContainerDraftVersion($idContainer);
        $refusedLevel = $this->addNestedVariablesUntilRefused($idContainer, $idContainerVersion);
        $this->api->addContainerVariable($this->idSite, $idContainer, $idContainerVersion, MatomoConfigurationVariable::ID, 'Large}', $this->getNestedVariableParameters($refusedLevel - 1));

        $this->expectException(ContainerTooLargeException::class);
        $this->api->addContainerVariable(
            $this->idSite,
            $idContainer,
            $idContainerVersion,
            CustomJsFunctionVariable::ID,
            'Expanded',
            ['jsFunction' => 'function () { return ' . str_repeat('"{{Large}}}" + ', self::NESTED_REFERENCES) . '""; }']
        );
    }

    public function test_copyTag_refusesACopyThatMakesTheDestinationTooLargeAndCopiesNothing()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'source');
        $idContainerVersion = $this->getContainerDraftVersion($idContainer);
        $refusedLevel = $this->addNestedVariablesUntilRefused($idContainer, $idContainerVersion);
        $this->api->addContainerVariable($this->idSite, $idContainer, $idContainerVersion, CustomJsFunctionVariable::ID, 'Extra', ['jsFunction' => 'function () { return 1; }']);
        $idTrigger = $this->api->addContainerTrigger($this->idSite, $idContainer, $idContainerVersion, PageViewTrigger::ID, 'MyPageViewTrigger', [], [['actual' => 'Extra', 'comparison' => 'equals', 'expected' => '1']]);
        $idTag = $this->addLargestAccepted(function (int $references) use ($idContainer, $idContainerVersion, $refusedLevel, $idTrigger) {
            $customHtml = str_repeat('{{Nested' . ($refusedLevel - 1) . '}}', $references);
            return $this->api->addContainerTag($this->idSite, $idContainer, $idContainerVersion, CustomHtmlTag::ID, 'Large', ['customHtml' => $customHtml], [$idTrigger]);
        });

        $idDestinationContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'destination');
        $idDestinationVersion = $this->getContainerDraftVersion($idDestinationContainer);
        $copyTag = function () use ($idContainerVersion, $idTag, $idDestinationContainer) {
            $_GET = ['idSite' => $this->idSite];
            $_POST = [
                'nonce' => Nonce::getNonce(Controller::COPY_TAG_NONCE),
                'idDestinationSite' => $this->idSite,
                'idDestinationContainer' => $idDestinationContainer,
                'idTag' => $idTag,
                'idContainerVersion' => $idContainerVersion,
            ];
            return json_decode(StaticContainer::getContainer()->make(Controller::class)->copyTag(), true);
        };
        $this->assertTrue($copyTag()['isSuccess']);
        // copies reuse a trigger or variable of the same name, so free both names for the refused copy to bring them along
        $destinationTriggers = array_column($this->api->getContainerTriggers($this->idSite, $idDestinationContainer, $idDestinationVersion), 'idtrigger', 'name');
        $this->api->updateContainerTrigger($this->idSite, $idDestinationContainer, $idDestinationVersion, $destinationTriggers['MyPageViewTrigger'], 'Renamed');
        $destinationVariables = array_column($this->api->getContainerVariables($this->idSite, $idDestinationContainer, $idDestinationVersion), 'idvariable', 'name');
        $this->api->deleteContainerVariable($this->idSite, $idDestinationContainer, $idDestinationVersion, $destinationVariables['Extra']);
        $contents = $this->getContainerContents($idDestinationContainer, $idDestinationVersion);

        $this->assertSame(['isSuccess' => false, 'message' => Piwik::translate('TagManager_ErrorContainerTooLarge')], $copyTag());
        $this->assertSame($contents, $this->getContainerContents($idDestinationContainer, $idDestinationVersion));
    }

    public function test_copyVariable_refusesACopyWithinTheContainerThatMakesItTooLarge()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idContainerVersion = $this->getContainerDraftVersion($idContainer);
        $refusedLevel = $this->addNestedVariablesUntilRefused($idContainer, $idContainerVersion);
        $idVariable = $this->addLargestAccepted(function (int $references) use ($idContainer, $idContainerVersion, $refusedLevel) {
            $parameters = ['matomoUrl' => 'https://matomo.org', 'idSite' => $this->idSite, 'userId' => str_repeat('{{Nested' . ($refusedLevel - 1) . '}}', $references)];
            return $this->api->addContainerVariable($this->idSite, $idContainer, $idContainerVersion, MatomoConfigurationVariable::ID, 'Large', $parameters);
        });
        $contents = $this->getContainerContents($idContainer, $idContainerVersion);

        $_GET = ['idSite' => $this->idSite];
        $_POST = [
            'nonce' => Nonce::getNonce(Controller::COPY_VARIABLE_NONCE),
            'idDestinationSite' => $this->idSite,
            'idDestinationContainer' => '',
            'idVariable' => $idVariable,
            'idContainerVersion' => $idContainerVersion,
        ];
        $response = json_decode(StaticContainer::getContainer()->make(Controller::class)->copyVariable(), true);

        $this->assertSame(['isSuccess' => false, 'message' => Piwik::translate('TagManager_ErrorContainerTooLarge')], $response);
        $this->assertSame($contents, $this->getContainerContents($idContainer, $idContainerVersion));
    }

    public function test_copyTrigger_refusesACopyWithinTheContainerThatMakesItTooLarge()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idContainerVersion = $this->getContainerDraftVersion($idContainer);
        $refusedLevel = $this->addNestedVariablesUntilRefused($idContainer, $idContainerVersion);
        $idTrigger = $this->addLargestAccepted(function (int $references) use ($idContainer, $idContainerVersion, $refusedLevel) {
            $conditions = array_fill(0, $references, ['actual' => 'Nested' . ($refusedLevel - 1), 'comparison' => 'equals', 'expected' => '1']);
            return $this->api->addContainerTrigger($this->idSite, $idContainer, $idContainerVersion, PageViewTrigger::ID, 'Large', [], $conditions);
        });
        $contents = $this->getContainerContents($idContainer, $idContainerVersion);

        $_GET = ['idSite' => $this->idSite];
        $_POST = [
            'nonce' => Nonce::getNonce(Controller::COPY_TRIGGER_NONCE),
            'idDestinationSite' => $this->idSite,
            'idDestinationContainer' => '',
            'idTrigger' => $idTrigger,
            'idContainerVersion' => $idContainerVersion,
        ];
        $response = json_decode(StaticContainer::getContainer()->make(Controller::class)->copyTrigger(), true);

        $this->assertSame(['isSuccess' => false, 'message' => Piwik::translate('TagManager_ErrorContainerTooLarge')], $response);
        $this->assertSame($contents, $this->getContainerContents($idContainer, $idContainerVersion));
    }

    public function test_addContainerVariable_refusesATooLargeDraftWhileThePreviewShowsAnOlderVersion()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idDraftVersion = $this->getContainerDraftVersion($idContainer);
        $idOlderVersion = $this->api->createContainerVersion($this->idSite, $idContainer, 'older');
        $this->api->enablePreviewMode($this->idSite, $idContainer, $idOlderVersion);

        $this->assertGreaterThan(0, $this->addNestedVariablesUntilRefused($idContainer, $idDraftVersion));
    }

    public function test_addContainerTag_isAcceptedWhileAVersionReleasedBeforeTheLimitIsOverIt()
    {
        $context = StaticContainer::get(WebContext::class);
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idDraftVersion = $this->getContainerDraftVersion($idContainer);
        $idLiveVersion = $this->api->createContainerVersion($this->idSite, $idContainer, 'v1');
        $this->api->publishContainerVersion($this->idSite, $idContainer, $idLiveVersion, Environment::ENVIRONMENT_LIVE);
        // a previewed draft has every release regenerated on each change
        $this->api->enablePreviewMode($this->idSite, $idContainer, $idDraftVersion);
        $livePath = $this->getReleasePath($context, $idContainer, Environment::ENVIRONMENT_LIVE);
        $liveFile = $this->getGeneratedFiles()[$livePath];
        $this->storeTooLargeVariable($idLiveVersion);

        $idTrigger = $this->api->addContainerTrigger($this->idSite, $idContainer, $idDraftVersion, PageViewTrigger::ID, 'MyPageViewTrigger');
        $this->api->addContainerTag($this->idSite, $idContainer, $idDraftVersion, CustomHtmlTag::ID, 'MyTag', ['customHtml' => 'x'], [$idTrigger]);

        $this->assertSame(['MyTag'], $this->getContainerContents($idContainer, $idDraftVersion)['tags']);
        $this->assertSame($liveFile, $this->getGeneratedFiles()[$livePath]);
    }

    public function test_addContainerTrigger_writesAPlaceholderForAVersionOverTheLimitWhoseFileIsMissing()
    {
        $context = StaticContainer::get(WebContext::class);
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idDraftVersion = $this->getContainerDraftVersion($idContainer);
        $idLiveVersion = $this->api->createContainerVersion($this->idSite, $idContainer, 'v1');
        $this->api->publishContainerVersion($this->idSite, $idContainer, $idLiveVersion, Environment::ENVIRONMENT_LIVE);
        // a previewed draft has every release regenerated on each change
        $this->api->enablePreviewMode($this->idSite, $idContainer, $idDraftVersion);
        $livePath = $this->getReleasePath($context, $idContainer, Environment::ENVIRONMENT_LIVE);
        $this->storeTooLargeVariable($idLiveVersion);
        StaticContainer::get(StorageInterface::class)->delete($livePath);

        $this->api->addContainerTrigger($this->idSite, $idContainer, $idDraftVersion, PageViewTrigger::ID, 'MyPageViewTrigger');

        $this->assertArrayHasKey($livePath, $this->getGeneratedFiles());
    }

    public function test_addContainerTrigger_regeneratesAReleaseOverTheLimitUpToTheStoredReleaseLimit()
    {
        $context = StaticContainer::get(WebContext::class);
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idDraftVersion = $this->getContainerDraftVersion($idContainer);
        $idLiveVersion = $this->api->createContainerVersion($this->idSite, $idContainer, 'v1');
        $this->api->publishContainerVersion($this->idSite, $idContainer, $idLiveVersion, Environment::ENVIRONMENT_LIVE);
        // a previewed draft has every release regenerated on each change
        $this->api->enablePreviewMode($this->idSite, $idContainer, $idDraftVersion);
        $parameters = ['matomoUrl' => 'https://matomo.org', 'idSite' => $this->idSite, 'userId' => str_repeat('x', 7000000)];
        StaticContainer::get(VariablesDao::class)->createVariable($this->idSite, $idLiveVersion, MatomoConfigurationVariable::ID, 'Legacy', $parameters, false, [], '2020-01-01 00:00:00');
        try {
            $this->api->publishContainerVersion($this->idSite, $idContainer, $idLiveVersion, Environment::ENVIRONMENT_LIVE);
            $this->fail('The version is not over the limit for new releases');
        } catch (ContainerTooLargeException $e) {
            // only the release stored before that limit is regenerated
        }

        $this->api->addContainerTrigger($this->idSite, $idContainer, $idDraftVersion, PageViewTrigger::ID, 'MyPageViewTrigger');

        $this->assertStringContainsString($parameters['userId'], $this->getGeneratedFiles()[$this->getReleasePath($context, $idContainer, Environment::ENVIRONMENT_LIVE)]);
    }

    public function test_addContainerVariable_refusesTakingAPublishedVersionOverTheLimit()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idLiveVersion = $this->api->createContainerVersion($this->idSite, $idContainer, 'v1');
        $this->api->publishContainerVersion($this->idSite, $idContainer, $idLiveVersion, Environment::ENVIRONMENT_LIVE);

        $refusedLevel = $this->addNestedVariablesUntilRefused($idContainer, $idLiveVersion);

        $this->assertNotContains('Nested' . $refusedLevel, $this->getContainerContents($idContainer, $idLiveVersion)['variables']);
    }

    /**
     * @dataProvider getPreviewModes
     */
    public function test_aDraftOverTheLimitAcceptsChangesThatDoNotMakeItLarger(bool $previewDraft)
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idDraftVersion = $this->getContainerDraftVersion($idContainer);
        if ($previewDraft) {
            $this->api->enablePreviewMode($this->idSite, $idContainer, $idDraftVersion);
        }
        $idSmall = $this->api->addContainerVariable($this->idSite, $idContainer, $idDraftVersion, CustomJsFunctionVariable::ID, 'Small', ['jsFunction' => 'function () { return 1; }']);
        $idTooLarge = $this->storeTooLargeVariable($idDraftVersion);
        $tooLargeName = 'TooLarge' . $idDraftVersion . '_3';

        // a longer name would make the draft larger
        $this->api->updateContainerVariable($this->idSite, $idContainer, $idDraftVersion, $idSmall, 'Tiny', ['jsFunction' => 'function () { return 1; }']);
        $this->api->updateContainer($this->idSite, $idContainer, 'renamed');
        try {
            $this->api->addContainerVariable($this->idSite, $idContainer, $idDraftVersion, CustomJsFunctionVariable::ID, 'Larger', ['jsFunction' => 'function () { return "{{' . $tooLargeName . '}}"; }']);
            $this->fail('A change making the draft larger was accepted');
        } catch (ContainerTooLargeException $e) {
            // the draft only takes changes that bring it back under the limit
        }
        $this->api->deleteContainerVariable($this->idSite, $idContainer, $idDraftVersion, $idTooLarge);

        $variables = $this->getContainerContents($idContainer, $idDraftVersion)['variables'];
        $this->assertContains('Tiny', $variables);
        $this->assertNotContains('Larger', $variables);
        $this->assertNotContains($tooLargeName, $variables);
        $this->assertSame('renamed', $this->api->getContainer($this->idSite, $idContainer)['name']);
    }

    public function getPreviewModes(): array
    {
        return [
            'draft not previewed' => [false],
            'draft previewed' => [true],
        ];
    }

    public function test_publishContainerVersion_refusesAVersionOverTheLimitBeforeReleasingIt()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idDraftVersion = $this->getContainerDraftVersion($idContainer);
        $idLiveVersion = $this->api->createContainerVersion($this->idSite, $idContainer, 'v1');
        $this->api->publishContainerVersion($this->idSite, $idContainer, $idLiveVersion, Environment::ENVIRONMENT_LIVE);
        $this->storeTooLargeVariable($idDraftVersion);
        $idTooLargeVersion = $this->api->createContainerVersion($this->idSite, $idContainer, 'v2');
        $releasesDao = StaticContainer::get(ContainerReleaseDao::class);

        try {
            $this->api->publishContainerVersion($this->idSite, $idContainer, $idTooLargeVersion, Environment::ENVIRONMENT_LIVE);
            $this->fail('A version over the limit was published');
        } catch (ContainerTooLargeException $e) {
            // refused
        }
        try {
            $this->api->enablePreviewMode($this->idSite, $idContainer, $idDraftVersion);
            $this->fail('A version over the limit was previewed');
        } catch (ContainerTooLargeException $e) {
            // refused
        }

        $this->assertSame($idLiveVersion, (int) $releasesDao->getReleaseForContainerVersion($this->idSite, $idContainer, Environment::ENVIRONMENT_LIVE)['idcontainerversion']);
        $this->assertEmpty($releasesDao->getReleaseForContainerVersion($this->idSite, $idContainer, Environment::ENVIRONMENT_PREVIEW));
    }

    public function test_publishContainerVersion_isAcceptedWhileThePreviewedDraftIsOverTheLimit()
    {
        $context = StaticContainer::get(WebContext::class);
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idDraftVersion = $this->getContainerDraftVersion($idContainer);
        $this->api->enablePreviewMode($this->idSite, $idContainer, $idDraftVersion);
        $idVersion = $this->api->createContainerVersion($this->idSite, $idContainer, 'v1');
        $this->storeTooLargeVariable($idDraftVersion);
        $livePath = $this->getReleasePath($context, $idContainer, Environment::ENVIRONMENT_LIVE);
        $placeholder = $this->getGeneratedFiles()[$livePath];

        $this->api->publishContainerVersion($this->idSite, $idContainer, $idVersion, Environment::ENVIRONMENT_LIVE);

        $release = StaticContainer::get(ContainerReleaseDao::class)->getReleaseForContainerVersion($this->idSite, $idContainer, Environment::ENVIRONMENT_LIVE);
        $this->assertSame($idVersion, (int) $release['idcontainerversion']);
        $this->assertNotSame($placeholder, $this->getGeneratedFiles()[$livePath]);
    }

    public function test_publishContainerVersion_generatesTheLiveFileWhileTheDraftIsReleasedOverTheLimit()
    {
        $context = StaticContainer::get(WebContext::class);
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idDraftVersion = $this->getContainerDraftVersion($idContainer);
        $this->api->publishContainerVersion($this->idSite, $idContainer, $idDraftVersion, 'staging');
        // releases are generated in order of their date, and the live one is released within the same second
        Db::query('UPDATE ' . Common::prefixTable('tagmanager_container_release') . ' SET release_date = ? WHERE idcontainer = ?', ['2020-01-01 00:00:00', $idContainer]);
        $idVersion = $this->api->createContainerVersion($this->idSite, $idContainer, 'v1');
        $this->storeTooLargeVariable($idDraftVersion);
        $livePath = $this->getReleasePath($context, $idContainer, Environment::ENVIRONMENT_LIVE);
        $placeholder = $this->getGeneratedFiles()[$livePath];

        $this->api->publishContainerVersion($this->idSite, $idContainer, $idVersion, Environment::ENVIRONMENT_LIVE);

        $this->assertNotSame($placeholder, $this->getGeneratedFiles()[$livePath]);
    }

    public function test_updateContainerVersion_isAcceptedWhileThePreviewedDraftIsOverTheLimit()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idDraftVersion = $this->getContainerDraftVersion($idContainer);
        $this->api->enablePreviewMode($this->idSite, $idContainer, $idDraftVersion);
        $idVersion = $this->api->createContainerVersion($this->idSite, $idContainer, 'v1');
        $this->storeTooLargeVariable($idDraftVersion);

        $this->api->updateContainerVersion($this->idSite, $idContainer, $idVersion, 'renamed');

        $this->assertSame('renamed', $this->api->getContainerVersion($this->idSite, $idContainer, $idVersion)['name']);
    }

    public function test_updateContainerVersion_refusesARenameThatGrowsADraftOverTheLimit()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idDraftVersion = $this->getContainerDraftVersion($idContainer);
        $this->api->enablePreviewMode($this->idSite, $idContainer, $idDraftVersion);
        $this->storeTooLargeVariable($idDraftVersion);
        $name = $this->api->getContainerVersion($this->idSite, $idContainer, $idDraftVersion)['name'];

        try {
            $this->api->updateContainerVersion($this->idSite, $idContainer, $idDraftVersion, str_repeat('x', 50));
            $this->fail('A rename that grows the draft over the limit was accepted');
        } catch (ContainerTooLargeException $e) {
            // refused
        }

        $this->assertSame($name, $this->api->getContainerVersion($this->idSite, $idContainer, $idDraftVersion)['name']);
    }

    public function test_importContainerVersion_restoresADraftThatWasAlreadyOverTheLimit()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idDraftVersion = $this->getContainerDraftVersion($idContainer);
        $this->storeTooLargeVariable($idDraftVersion);
        $versions = $this->api->getContainerVersions($this->idSite, $idContainer);

        try {
            $this->api->importContainerVersion(json_encode($this->api->exportContainerVersion($this->idSite, $idContainer)), $this->idSite, $idContainer, 'backup');
            $this->fail('A version over the limit was imported');
        } catch (ContainerTooLargeException $e) {
            // refused
        }

        // the backup is only deleted once the draft was restored
        $this->assertSame($versions, $this->api->getContainerVersions($this->idSite, $idContainer));
        $this->assertContains('TooLarge' . $idDraftVersion . '_3', $this->getContainerContents($idContainer, $idDraftVersion)['variables']);
    }

    public function test_updateContainer_leavesTheLiveFileUntouchedWhenRefused()
    {
        $context = StaticContainer::get(WebContext::class);
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $this->api->updateContainer($this->idSite, $idContainer, 'test', '', 1);
        $idDraftVersion = $this->getContainerDraftVersion($idContainer);
        $idLiveVersion = $this->api->createContainerVersion($this->idSite, $idContainer, 'v1');
        $this->api->publishContainerVersion($this->idSite, $idContainer, $idLiveVersion, Environment::ENVIRONMENT_LIVE);
        $this->api->enablePreviewMode($this->idSite, $idContainer, $idDraftVersion);
        $livePath = $this->getReleasePath($context, $idContainer, Environment::ENVIRONMENT_LIVE);
        $liveFile = $this->getGeneratedFiles()[$livePath];
        // stored without the API that refuses it, as a draft from before recursion was detected could have it
        StaticContainer::get(VariablesDao::class)->createVariable($this->idSite, $idDraftVersion, MatomoConfigurationVariable::ID, 'Loop', ['matomoUrl' => 'https://matomo.org', 'idSite' => $this->idSite, 'userId' => '{{Loop}}'], false, [], '2020-01-01 00:00:00');

        try {
            // the live release is generated with the new setting before the draft's preview fails
            $this->api->updateContainer($this->idSite, $idContainer, 'test', '', 0);
            $this->fail('A change to a container that cannot be generated was accepted');
        } catch (EntityRecursionException $e) {
            // refused
        }

        $this->assertSame(1, (int) $this->api->getContainer($this->idSite, $idContainer)['ignoreGtmDataLayer']);
        $this->assertSame($liveFile, $this->getGeneratedFiles()[$livePath]);
    }

    public function test_updateContainerVariable_leavesTheStoredVariableUntouchedWhenRefused()
    {
        $idContainer = $this->api->addContainer($this->idSite, WebContext::ID, 'test');
        $idContainerVersion = $this->getContainerDraftVersion($idContainer);
        $refusedLevel = $this->addNestedVariablesUntilRefused($idContainer, $idContainerVersion);
        $dao = StaticContainer::get(VariablesDao::class);
        $idVariable = $dao->createVariable($this->idSite, $idContainerVersion, CustomJsFunctionVariable::ID, 'Small', ['jsFunction' => 'function () { return 1; }'], false, [], '2020-01-01 00:00:00');
        $stored = $dao->getContainerVariable($this->idSite, $idContainerVersion, $idVariable);

        try {
            $jsFunction = 'function () { return ' . str_repeat('"{{Nested' . ($refusedLevel - 1) . '}}" + ', self::NESTED_REFERENCES) . '""; }';
            $this->api->updateContainerVariable($this->idSite, $idContainer, $idContainerVersion, $idVariable, 'Large', ['jsFunction' => $jsFunction]);
            $this->fail('An expected exception has not been thrown');
        } catch (ContainerTooLargeException $e) {
            // refused
        }

        $this->assertSame($stored, $dao->getContainerVariable($this->idSite, $idContainerVersion, $idVariable));
    }

    /**
     * Adds an entity with as many references to the largest nested variable as the container accepts, so that it is
     * refused with twice as many
     */
    private function addLargestAccepted(callable $add): int
    {
        for ($references = self::NESTED_REFERENCES; $references > 1; $references = intdiv($references, 2)) {
            try {
                return $add($references);
            } catch (ContainerTooLargeException $e) {
                // NESTED_REFERENCES references are as large as the refused nested variable, so this is reached at least once
            }
        }

        $this->fail('Every entity was refused as too large');
    }

    /**
     * @return array<string, string[]>
     */
    private function getContainerContents(string $idContainer, int $idContainerVersion): array
    {
        return [
            'tags' => array_column($this->api->getContainerTags($this->idSite, $idContainer, $idContainerVersion), 'name'),
            'triggers' => array_column($this->api->getContainerTriggers($this->idSite, $idContainer, $idContainerVersion), 'name'),
            'variables' => array_column($this->api->getContainerVariables($this->idSite, $idContainer, $idContainerVersion), 'name'),
        ];
    }

    /**
     * Stores, without the API that refuses them, variables nested deep enough to make the container too large
     *
     * @return int the id of the outermost variable
     */
    private function storeTooLargeVariable(int $idContainerVersion): int
    {
        $dao = StaticContainer::get(VariablesDao::class);
        $prefix = 'TooLarge' . $idContainerVersion . '_';
        for ($level = 0; $level <= 3; $level++) {
            $idVariable = $dao->createVariable($this->idSite, $idContainerVersion, MatomoConfigurationVariable::ID, $prefix . $level, $this->getNestedVariableParameters($level, $prefix), false, [], '2020-01-01 00:00:00');
        }
        return $idVariable;
    }

    /**
     * @return array<string, string>
     */
    private function getGeneratedFiles(): array
    {
        return \Closure::bind(function () {
            return $this->content;
        }, StaticContainer::get(StorageInterface::class), Memory::class)();
    }

    private function getReleasePath(BaseContext $context, string $idContainer, string $environment): string
    {
        $container = $this->api->getContainer($this->idSite, $idContainer);
        return PIWIK_DOCUMENT_ROOT . $context->getJsTargetPath($this->idSite, $idContainer, $environment, $container['created_date']);
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
