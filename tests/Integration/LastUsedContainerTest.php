<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration;

use Piwik\Container\StaticContainer;
use Piwik\Plugins\TagManager\Context\WebContext;
use Piwik\Plugins\TagManager\LastUsedContainer;
use Piwik\Plugins\TagManager\Menu;
use Piwik\Plugins\TagManager\Model\Container;
use Piwik\Plugins\TagManager\TagManager;
use Piwik\Plugins\TagManager\tests\Framework\Mock\FakeAccessTagManager;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;
use Piwik\Tests\Framework\Fixture;
use Piwik\Tests\Framework\Mock\FakeAccess;

/**
 * @group TagManager
 * @group LastUsedContainerTest
 * @group Plugins
 */
class LastUsedContainerTest extends IntegrationTestCase
{
    /**
     * @var int
     */
    private $idSite;

    /**
     * @var int
     */
    private $idOtherSite;

    /**
     * @var Container
     */
    private $model;

    /**
     * @var LastUsedContainer
     */
    private $lastUsedContainer;

    public function setUp(): void
    {
        parent::setUp();

        TagManager::$enableAutoContainerCreation = false;
        FakeAccess::clearAccess(true);

        $this->idSite = Fixture::createWebsite('2014-03-04 05:06:07');
        $this->idOtherSite = Fixture::createWebsite('2014-03-04 05:06:07');

        $this->model = StaticContainer::get(Container::class);
        $this->lastUsedContainer = StaticContainer::get(LastUsedContainer::class);

        $_GET['idSite'] = $this->idSite;
    }

    public function tearDown(): void
    {
        unset($_GET['idSite']);
        FakeAccess::clearAccess(true);
        TagManager::$enableAutoContainerCreation = true;
        parent::tearDown();
    }

    public function testGetDefaultActionOpensOnlyContainer()
    {
        $idContainer = $this->addContainer($this->idSite, 'Only');

        $this->assertSame(['dashboard', ['idContainer' => $idContainer]], Menu::getDefaultAction());
    }

    public function testGetDefaultActionOpensManageContainersWhenNoContainerWasUsed()
    {
        $this->addContainer($this->idSite, 'First');
        $this->addContainer($this->idSite, 'Second');

        $this->assertSame(['manageContainers', ['idContainer' => false]], Menu::getDefaultAction());
    }

    public function testGetDefaultActionOpensLastUsedContainer()
    {
        $this->addContainer($this->idSite, 'First');
        $idSecondContainer = $this->addContainer($this->idSite, 'Second');

        $this->lastUsedContainer->setForCurrentUser($this->idSite, $idSecondContainer);

        $this->assertSame(['dashboard', ['idContainer' => $idSecondContainer]], Menu::getDefaultAction());
    }

    public function testGetDefaultActionOpensManageTagsWithoutWriteAccess()
    {
        $this->addContainer($this->idSite, 'First');
        $idSecondContainer = $this->addContainer($this->idSite, 'Second');

        $this->setViewUser();
        $this->lastUsedContainer->setForCurrentUser($this->idSite, $idSecondContainer);

        $this->assertSame(['manageTags', ['idContainer' => $idSecondContainer]], Menu::getDefaultAction());
    }

    public function testGetDefaultActionIgnoresContainerUsedOnOtherSite()
    {
        $this->addContainer($this->idSite, 'First');
        $this->addContainer($this->idSite, 'Second');
        $idOtherSiteContainer = $this->addContainer($this->idOtherSite, 'Other site');

        $this->lastUsedContainer->setForCurrentUser($this->idOtherSite, $idOtherSiteContainer);

        $this->assertSame(['manageContainers', ['idContainer' => false]], Menu::getDefaultAction());
    }

    public function testGetDefaultActionIgnoresDeletedContainer()
    {
        $idFirstContainer = $this->addContainer($this->idSite, 'First');
        $this->addContainer($this->idSite, 'Second');
        $this->addContainer($this->idSite, 'Third');

        $this->lastUsedContainer->setForCurrentUser($this->idSite, $idFirstContainer);
        $this->model->deleteContainer($this->idSite, $idFirstContainer);

        $this->assertSame(['manageContainers', ['idContainer' => false]], Menu::getDefaultAction());
    }

    public function testLastUsedContainerIsStoredPerSite()
    {
        $this->lastUsedContainer->setForCurrentUser($this->idSite, 'abc123');
        $this->lastUsedContainer->setForCurrentUser($this->idOtherSite, 'def456');

        $this->assertSame('abc123', $this->lastUsedContainer->getForCurrentUser($this->idSite));
        $this->assertSame('def456', $this->lastUsedContainer->getForCurrentUser($this->idOtherSite));
    }

    public function testLastUsedContainerIsNotStoredForAnonymousUser()
    {
        FakeAccess::clearAccess(false);
        FakeAccess::$identity = 'anonymous';

        $this->lastUsedContainer->setForCurrentUser($this->idSite, 'abc123');

        $this->assertNull($this->lastUsedContainer->getForCurrentUser($this->idSite));
    }

    private function addContainer(int $idSite, string $name): string
    {
        return $this->model->addContainer($idSite, WebContext::ID, $name, '', 0, 0, 0);
    }

    private function setViewUser(): void
    {
        FakeAccess::clearAccess(false);
        FakeAccess::$identity = 'viewUser';
        FakeAccess::$idSitesView = [$this->idSite];
    }

    public function provideContainerConfig()
    {
        return [
            'Piwik\Access' => new FakeAccessTagManager()
        ];
    }
}
