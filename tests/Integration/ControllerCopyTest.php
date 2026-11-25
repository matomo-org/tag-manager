<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration;

use Piwik\Container\StaticContainer;
use Piwik\Nonce;
use Piwik\Plugins\TagManager\API;
use Piwik\Plugins\TagManager\Context\WebContext;
use Piwik\Plugins\TagManager\Controller;
use Piwik\Plugins\TagManager\Dao\TagsDao;
use Piwik\Plugins\TagManager\Dao\TriggersDao;
use Piwik\Plugins\TagManager\Dao\VariablesDao;
use Piwik\Plugins\TagManager\TagManager;
use Piwik\Plugins\TagManager\Template\Tag\CustomHtmlTag;
use Piwik\Plugins\TagManager\Template\Trigger\PageViewTrigger;
use Piwik\Plugins\TagManager\tests\Framework\Mock\FakeAccessTagManager;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;
use Piwik\Tests\Framework\Fixture;
use Piwik\Tests\Framework\Mock\FakeAccess;

/**
 * @group TagManager
 * @group ControllerCopyTest
 * @group Plugins
 */
class ControllerCopyTest extends IntegrationTestCase
{
    private const MARKUP = '<div id="planted">x</div>';

    /**
     * @var int
     */
    private $idSite;

    public function setUp(): void
    {
        parent::setUp();

        TagManager::$enableAutoContainerCreation = false;
        FakeAccess::clearAccess(true);

        $this->idSite = Fixture::createWebsite('2014-03-04 05:06:07');
        $_GET = ['idSite' => $this->idSite];
        $_POST = [];
    }

    public function tearDown(): void
    {
        $_GET = [];
        $_POST = [];
        FakeAccess::clearAccess(true);
        TagManager::$enableAutoContainerCreation = true;
        parent::tearDown();
    }

    public function test_copyTrigger_encodesTheErrorMessage()
    {
        [$idContainer, $idContainerVersion] = $this->addContainer();

        $idTrigger = $this->addTriggerWithUnsupportedComparison($idContainerVersion);

        $_POST = [
            'nonce' => Nonce::getNonce(Controller::COPY_TRIGGER_NONCE),
            'idDestinationSite' => $this->idSite,
            'idDestinationContainer' => $idContainer,
            'idTrigger' => $idTrigger,
            'idContainerVersion' => $idContainerVersion,
        ];

        $this->assertMarkupIsEncoded(StaticContainer::getContainer()->make(Controller::class)->copyTrigger());
    }

    public function test_copyTag_encodesTheErrorMessage()
    {
        [$idContainer, $idContainerVersion] = $this->addContainer();

        // copying a tag to another container also copies its fire trigger, which fails validation
        $idTrigger = $this->addTriggerWithUnsupportedComparison($idContainerVersion);
        $idTag = StaticContainer::get(TagsDao::class)->createTag($this->idSite, $idContainerVersion, CustomHtmlTag::ID, 'Tag', ['customHtml' => 'x'], [$idTrigger], [], 'unlimited', 0, 999, null, null, '2014-03-04 05:06:07');
        [$idDestinationContainer] = $this->addContainer('Destination');

        $_POST = [
            'nonce' => Nonce::getNonce(Controller::COPY_TAG_NONCE),
            'idDestinationSite' => $this->idSite,
            'idDestinationContainer' => $idDestinationContainer,
            'idTag' => $idTag,
            'idContainerVersion' => $idContainerVersion,
        ];

        $this->assertMarkupIsEncoded(StaticContainer::getContainer()->make(Controller::class)->copyTag());
    }

    public function test_copyVariable_encodesTheErrorMessage()
    {
        [$idContainer, $idContainerVersion] = $this->addContainer();

        // stored without validation so the copy fails on its unsupported lookup table comparison
        $idVariable = StaticContainer::get(VariablesDao::class)->createVariable(
            $this->idSite,
            $idContainerVersion,
            'Constant',
            'Variable',
            ['constantValue' => 'x'],
            null,
            [['match_value' => 'x', 'comparison' => self::MARKUP, 'out_value' => 'y']],
            '2014-03-04 05:06:07'
        );

        $_POST = [
            'nonce' => Nonce::getNonce(Controller::COPY_VARIABLE_NONCE),
            'idDestinationSite' => $this->idSite,
            'idDestinationContainer' => $idContainer,
            'idVariable' => $idVariable,
            'idContainerVersion' => $idContainerVersion,
        ];

        $this->assertMarkupIsEncoded(StaticContainer::getContainer()->make(Controller::class)->copyVariable());
    }

    public function test_copyContainer_encodesTheErrorMessage()
    {
        [$idContainer, $idContainerVersion] = $this->addContainer();

        // a tag whose type is not available makes the copy fail, naming the type
        StaticContainer::get(TagsDao::class)->createTag($this->idSite, $idContainerVersion, self::MARKUP, 'Tag', [], [], [], 'unlimited', 0, 999, null, null, '2014-03-04 05:06:07');

        $_POST = [
            'nonce' => Nonce::getNonce(Controller::COPY_CONTAINER_NONCE),
            'idDestinationSite' => $this->idSite,
            'idContainer' => $idContainer,
        ];

        $this->assertMarkupIsEncoded(StaticContainer::getContainer()->make(Controller::class)->copyContainer());
    }

    /**
     * @return array{string, int}
     */
    private function addContainer(string $name = 'Container'): array
    {
        $idContainer = API::getInstance()->addContainer($this->idSite, WebContext::ID, $name);
        $idContainerVersion = (int) API::getInstance()->getContainer($this->idSite, $idContainer)['draft']['idcontainerversion'];
        return [$idContainer, $idContainerVersion];
    }

    /**
     * Stored without validation, so copying the trigger fails on its condition.
     */
    private function addTriggerWithUnsupportedComparison(int $idContainerVersion): int
    {
        return StaticContainer::get(TriggersDao::class)->createTrigger(
            $this->idSite,
            $idContainerVersion,
            PageViewTrigger::ID,
            'Trigger',
            [],
            [['actual' => 'PageUrl', 'comparison' => self::MARKUP, 'expected' => 'x']],
            '2014-03-04 05:06:07'
        );
    }

    private function assertMarkupIsEncoded(string $json): void
    {
        $response = json_decode($json, true);
        $this->assertFalse($response['isSuccess']);
        $this->assertStringContainsString('&lt;div id=&quot;planted&quot;&gt;x&lt;/div&gt;', $response['message']);
        $this->assertStringNotContainsString(self::MARKUP, $response['message']);
    }

    public function provideContainerConfig()
    {
        return [
            'Piwik\Access' => new FakeAccessTagManager(),
        ];
    }
}
