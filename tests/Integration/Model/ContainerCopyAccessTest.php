<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration\Model;

use Piwik\Container\StaticContainer;
use Piwik\NoAccessException;
use Piwik\Plugins\TagManager\Access\Capability\PublishLiveContainer;
use Piwik\Plugins\TagManager\Access\Capability\UseCustomTemplates;
use Piwik\Plugins\TagManager\Context\WebContext;
use Piwik\Plugins\TagManager\Model\Container;
use Piwik\Plugins\TagManager\Model\Tag;
use Piwik\Plugins\TagManager\Model\Trigger;
use Piwik\Plugins\TagManager\TagManager;
use Piwik\Plugins\TagManager\Template\Tag\CustomHtmlTag;
use Piwik\Plugins\TagManager\Template\Trigger\CustomEventTrigger;
use Piwik\Plugins\TagManager\tests\Framework\Mock\FakeAccessTagManager;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;
use Piwik\Tests\Framework\Fixture;
use Piwik\Tests\Framework\Mock\FakeAccess;

/**
 * @group TagManager
 * @group ContainerCopyAccessTest
 * @group Container
 * @group Plugins
 */
class ContainerCopyAccessTest extends IntegrationTestCase
{
    /**
     * @var int
     */
    private $idSite;

    /**
     * @var int
     */
    private $idDestinationSite;

    /**
     * @var Container
     */
    private $model;

    public function setUp(): void
    {
        parent::setUp();

        TagManager::$enableAutoContainerCreation = false;

        $this->setSuperUser();

        $this->idSite = Fixture::createWebsite('2014-03-04 05:06:07');
        $this->idDestinationSite = Fixture::createWebsite('2014-03-04 05:06:07');

        $this->model = StaticContainer::get(Container::class);
    }

    public function tearDown(): void
    {
        $this->setSuperUser();
        TagManager::$enableAutoContainerCreation = true;
        parent::tearDown();
    }

    public function testCopyContainerToDifferentSiteFailsWhenMissingCustomTemplatesCapabilityOnDestinationSite()
    {
        $idContainer = $this->addContainerWithCustomTemplateTag();

        $this->setPublisherWithoutCustomTemplatesCapability();

        $this->expectException(NoAccessException::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_use_custom_templates');

        $this->model->copyContainer($this->idSite, $idContainer, $this->idDestinationSite);
    }

    public function testCopyContainerToDifferentSiteDoesNotLeaveContainerBehindWhenImportFails()
    {
        $idContainer = $this->addContainerWithCustomTemplateTag();

        $this->setPublisherWithoutCustomTemplatesCapability();

        try {
            $this->model->copyContainer($this->idSite, $idContainer, $this->idDestinationSite);
            $this->fail('copyContainer succeeded although the custom templates capability is missing on the destination site');
        } catch (NoAccessException $e) {
            // expected, the assertion below verifies the half finished copy was rolled back
        }

        $this->setSuperUser();
        $this->assertSame(array(), $this->model->getContainers($this->idDestinationSite));
    }

    public function testCopyContainerToDifferentSiteSucceedsWithCustomTemplatesCapabilityOnBothSites()
    {
        $idContainer = $this->addContainerWithCustomTemplateTag();

        $this->setPublisherWithoutCustomTemplatesCapability();
        FakeAccess::$idSitesCapabilities[UseCustomTemplates::ID] = array($this->idSite, $this->idDestinationSite);

        $idContainerCopy = $this->model->copyContainer($this->idSite, $idContainer, $this->idDestinationSite);
        $this->assertNotEmpty($idContainerCopy);

        $this->setSuperUser();
        $containers = $this->model->getContainers($this->idDestinationSite);
        $this->assertCount(1, $containers);

        $containerCopy = $this->model->getContainer($this->idDestinationSite, $idContainerCopy);
        $tag = StaticContainer::get(Tag::class);
        $copiedTags = $tag->getContainerTags($this->idDestinationSite, $containerCopy['draft']['idcontainerversion']);
        $this->assertCount(1, $copiedTags);
        $this->assertSame(CustomHtmlTag::ID, $copiedTags[0]['type']);
    }

    private function addContainerWithCustomTemplateTag()
    {
        $idContainer = $this->model->addContainer($this->idSite, WebContext::ID, 'My Name', 'My Description', 0, 0, 0);

        $container = $this->model->getContainer($this->idSite, $idContainer);
        $idContainerVersion = $container['draft']['idcontainerversion'];

        $trigger = StaticContainer::get(Trigger::class);
        $idTrigger = $trigger->addContainerTrigger($this->idSite, $idContainerVersion, CustomEventTrigger::ID, 'My Trigger', array('eventName' => 'foo'), array());

        $tag = StaticContainer::get(Tag::class);
        $tag->addContainerTag(
            $this->idSite,
            $idContainerVersion,
            CustomHtmlTag::ID,
            'My Custom Html Tag',
            array('customHtml' => '<p></p>'),
            array($idTrigger),
            array(),
            Tag::FIRE_LIMIT_UNLIMITED,
            0,
            999,
            null,
            null
        );

        return $idContainer;
    }

    private function setSuperUser()
    {
        FakeAccess::clearAccess(true);
    }

    /**
     * A user that may write to and publish on both sites, but that does not hold the custom templates capability
     * on either of them.
     */
    private function setPublisherWithoutCustomTemplatesCapability()
    {
        FakeAccess::clearAccess(false);
        FakeAccess::$identity = 'testUser';
        FakeAccess::$idSitesView = array($this->idSite, $this->idDestinationSite);
        FakeAccess::$idSitesWrite = array($this->idSite, $this->idDestinationSite);
        FakeAccess::$idSitesAdmin = array();
        FakeAccess::$idSitesCapabilities = array(
            PublishLiveContainer::ID => array($this->idSite, $this->idDestinationSite),
        );
    }

    public function provideContainerConfig()
    {
        return array(
            'Piwik\Access' => new FakeAccessTagManager()
        );
    }
}
