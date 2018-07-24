<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration\Input;

use Piwik\Plugins\TagManager\Access\Capability\PublishLiveContainer;
use Piwik\Plugins\TagManager\Access\Capability\TagManagerWrite;
use Piwik\Plugins\TagManager\Input\AccessValidator;
use Piwik\Plugins\TagManager\SystemSettings;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;
use Piwik\Tests\Framework\Fixture;
use Piwik\Tests\Framework\Mock\FakeAccess;

/**
 * @group TagManager
 * @group Validator
 * @group ValidatorTest
 * @group Plugins
 */
class AccessValidatorTest extends IntegrationTestCase
{
    /**
     * @var AccessValidator
     */
    private $validator;

    /**
     * @var SystemSettings
     */
    private $settings;

    public function setUp()
    {
        parent::setUp();

        $this->settings = new SystemSettings();
        $this->validator = new AccessValidator($this->settings);

        Fixture::createWebsite('2014-01-02 03:04:05');
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage checkUserHasCapability tagmanager_write Fake exception
     */
    public function test_checkWriteCapability()
    {
        $this->setUser();
        $this->validator->checkWriteCapability($idSite = 1);
    }

    public function test_checkWriteCapability_successWrite()
    {
        $this->setWrite();
        $this->validator->checkWriteCapability($idSite = 1);
        $this->assertTrue(true);
    }

    public function test_checkWriteCapability_successAdmin()
    {
        $this->setAdmin();
        $this->validator->checkWriteCapability($idSite = 1);
        $this->assertTrue(true);
    }

    public function test_checkWriteCapability_successSuperUser()
    {
        $this->validator->checkWriteCapability($idSite = 1);
        $this->assertTrue(true);
    }

    public function test_checkWriteCapability_successViewUserWithCapability()
    {
        $this->setUser();
        FakeAccess::$idSitesCapabilities = array(TagManagerWrite::ID => array($idSite = 1));
        $this->validator->checkWriteCapability($idSite = 1);
        $this->assertTrue(true);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage checkUserHasCapability tagmanager_publish_live_container Fake exception
     */
    public function test_checkPublishLiveEnvironmentCapability()
    {
        $this->setUser();
        $this->validator->checkPublishLiveEnvironmentCapability($idSite = 1);
    }

    public function test_checkPublishLiveEnvironmentCapability_successAdmin()
    {
        $this->setAdmin();
        $this->validator->checkPublishLiveEnvironmentCapability($idSite = 1);
        $this->assertTrue(true);
    }

    public function test_checkPublishLiveEnvironmentCapability_successWriteUserWithCapability()
    {
        $this->setUser();
        FakeAccess::$idSitesCapabilities = array(PublishLiveContainer::ID => array($idSite = 1));
        $this->validator->checkPublishLiveEnvironmentCapability($idSite = 1);
        $this->assertTrue(true);
    }

    public function test_checkPublishLiveEnvironmentCapability_successSuperUser()
    {
        $this->validator->checkPublishLiveEnvironmentCapability($idSite = 1);
        $this->assertTrue(true);
    }

    public function test_hasUseCustomTemplatesCapability()
    {
        $this->assertTrue($this->validator->hasUseCustomTemplatesCapability(1));
        $this->setUser();
        $this->assertFalse($this->validator->hasUseCustomTemplatesCapability(1));
        $this->setAdmin();
        $this->assertTrue($this->validator->hasUseCustomTemplatesCapability(1));
        $this->setWrite();
        $this->assertFalse($this->validator->hasUseCustomTemplatesCapability(1));
    }

    public function test_hasPublishLiveEnvironmentCapability()
    {
        $this->assertTrue($this->validator->hasPublishLiveEnvironmentCapability(1));
        $this->setUser();
        $this->assertFalse($this->validator->hasPublishLiveEnvironmentCapability(1));
        $this->setAdmin();
        $this->assertTrue($this->validator->hasPublishLiveEnvironmentCapability(1));
        $this->setWrite();
        $this->assertFalse($this->validator->hasPublishLiveEnvironmentCapability(1));
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage checkUserHasCapability tagmanager_use_custom_templates Fake exception
     */
    public function test_checkUseCustomTemplatesCapability()
    {
        $this->setUser();
        $this->validator->checkUseCustomTemplatesCapability($idSite = 1);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage checkUserHasSuperUserAccess Fake exception
     */
    public function test_checkUseCustomTemplatesCapability_noAccessWhenRequireSuperUser()
    {
        $this->settings->restrictCustomTemplates->setValue(SystemSettings::CUSTOM_TEMPLATES_SUPERUSER);
        $this->setAdmin();
        $this->validator->checkUseCustomTemplatesCapability($idSite = 1);
    }

    public function test_checkUseCustomTemplatesCapability_successAdmin()
    {
        $this->setAdmin();
        $this->validator->checkUseCustomTemplatesCapability($idSite = 1);
        $this->assertTrue(true);
    }

    public function test_checkUseCustomTemplatesCapability_successSuperUser()
    {
        $this->validator->checkUseCustomTemplatesCapability($idSite = 1);
        $this->assertTrue(true);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage checkUserHasViewAccess Fake exception
     */
    public function test_checkViewPermission()
    {
        $this->setAnonymous();
        $this->validator->checkViewPermission($idSite = 1);
    }

    public function test_checkViewPermission_success()
    {
        $this->setUser();
        $this->validator->checkViewPermission($idSite = 1);
        $this->assertTrue(true);
    }

    public function test_checkSiteExists_whenSiteExists_noException()
    {
        $this->validator->checkSiteExists($idSite = 1);
        $this->assertTrue(true);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage An unexpected website was found in the request
     */
    public function test_checkSiteExists_whenSiteNotExists_Exception()
    {
        $this->validator->checkSiteExists($idSite = 999);
    }

    public function test_hasWriteCapability_anonymousWithoutViewCannot()
    {
        $this->setAnonymous();
        $this->assertFalse($this->validator->hasWriteCapability($idSite = 1));
    }

    public function test_hasWriteCapability_success_user()
    {
        $this->setUser();
        $this->assertFalse($this->validator->hasWriteCapability($idSite = 1));
    }

    public function test_hasWriteCapability_admin()
    {
        $this->setAdmin();
        $this->assertTrue($this->validator->hasWriteCapability($idSite = 1));
    }

    public function test_hasWriteCapability_success_Superuser()
    {
        $this->assertTrue($this->validator->hasWriteCapability($idSite = 1));
    }

    protected function setAnonymous()
    {
        FakeAccess::clearAccess(false);
        FakeAccess::$identity = 'anonymous';
        FakeAccess::$idSitesView = array();
        FakeAccess::$idSitesAdmin = array();
    }

    protected function setUser()
    {
        FakeAccess::clearAccess(false);
        FakeAccess::$identity = 'testUser';
        FakeAccess::$idSitesView = array(1,3);
        FakeAccess::$idSitesAdmin = array();
    }

    protected function setWrite()
    {
        FakeAccess::clearAccess(false);
        FakeAccess::$identity = 'testUser';
        FakeAccess::$idSitesView = array();
        FakeAccess::$idSitesWrite = array(1,3);
        FakeAccess::$idSitesAdmin = array();
    }

    protected function setAdmin()
    {
        FakeAccess::clearAccess(false);
        FakeAccess::$identity = 'testUser';
        FakeAccess::$idSitesView = array();
        FakeAccess::$idSitesAdmin = array(1,3);
    }

    public function provideContainerConfig()
    {
        return array(
            'Piwik\Access' => new FakeAccess()
        );
    }
}
