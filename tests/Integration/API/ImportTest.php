<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration;

use Piwik\Container\StaticContainer;
use Piwik\Plugins\TagManager\API;
use Piwik\Plugins\TagManager\Template\Tag\CustomHtmlTag;
use Piwik\Plugins\TagManager\tests\Fixtures\TagManagerFixture;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;
use Piwik\Tests\Framework\Mock\FakeAccess;

/**
 * @group TagManager
 * @group ImportTest
 * @group Import
 * @group Plugins
 */
class ImportTest extends IntegrationTestCase
{
    /**
     * @var int
     */
    private $idSite;

    private $idContainer;
    private $idContainerDraftVersion;

    /**
     * @var array
     */
    private $exported;

    /**
     * @var TagManagerFixture
     */
    private $tagFixture;

    /**
     * @var API\Import
     */
    private $import;

    public function setUp(): void
    {
        parent::setUp();

        $this->tagFixture = new TagManagerFixture();
        $this->tagFixture->setUpWebsite();
        $this->tagFixture->setUpContainers();

        // we do not want to use idSite = 1, instead as we will sometimes also have idTag = 1... better tests this way
        $this->idSite = $this->tagFixture->idSite2;
        $this->idContainer = $this->tagFixture->idContainer1;
        $this->idContainerDraftVersion = $this->tagFixture->idContainer1DraftVersion;

        $this->exported = API::getInstance()->exportContainerVersion($this->idSite, $this->idContainer, $this->idContainerDraftVersion);
        $this->import = StaticContainer::get('Piwik\Plugins\TagManager\API\Import');
    }

    public function test_checkImportContainerIsPossible_shouldWorkWhenUsingPreviousExport()
    {
        $this->import->checkImportContainerIsPossible($this->exported, $this->idSite, $this->idContainer);
        $this->assertTrue(true);
    }

    public function test_checkImportContainerIsPossible_whenMissingTags()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Cannot import container. The specified container version is incomplete');

        unset($this->exported['tags']);
        $this->import->checkImportContainerIsPossible($this->exported, $this->idSite, $this->idContainer);
    }

    public function test_checkImportContainerIsPossible_whenNotMatchingContext()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The context of the current container is "web" but the imported content is of context "foobar"');

        $this->exported['context'] = 'foobar';
        $this->import->checkImportContainerIsPossible($this->exported, $this->idSite, $this->idContainer);
    }

    public function test_checkImportContainerIsPossible_whenTagNotExists()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The tag "Foo" is not supported');

        $this->exported['tags'][0]['type'] = 'Foo';
        $this->import->checkImportContainerIsPossible($this->exported, $this->idSite, $this->idContainer);
    }

    public function test_checkImportContainerIsPossible_whenNotCustomTemplatePermission()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('checkUserHasCapability tagmanager_use_custom_templates');

        $this->setUser();
        $this->exported['tags'][0]['type'] = CustomHtmlTag::ID;
        $this->import->checkImportContainerIsPossible($this->exported, $this->idSite, $this->idContainer);
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
            'Piwik\Access' => new FakeAccess()
        );
    }
}
