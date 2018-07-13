<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration\Input;

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
    public function test_checkWritePermission()
    {
        $this->setUser();
        $this->validator->checkWritePermission($idSite = 1);
    }

    public function test_checkWritePermission_successAdmin()
    {
        $this->setAdmin();
        $this->validator->checkWritePermission($idSite = 1);
        $this->assertTrue(true);
    }

    public function test_checkWritePermission_successSuperUser()
    {
        $this->validator->checkWritePermission($idSite = 1);
        $this->assertTrue(true);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage checkUserHasCapability tagmanager_publish_live_container Fake exception
     */
    public function test_checkPublishLiveEnvironmentPermission()
    {
        $this->setUser();
        $this->validator->checkPublishLiveEnvironmentPermission($idSite = 1);
    }

    public function test_checkPublishLiveEnvironmentPermission_successAdmin()
    {
        $this->setAdmin();
        $this->validator->checkPublishLiveEnvironmentPermission($idSite = 1);
        $this->assertTrue(true);
    }

    public function test_checkPublishLiveEnvironmentPermission_successSuperUser()
    {
        $this->validator->checkPublishLiveEnvironmentPermission($idSite = 1);
        $this->assertTrue(true);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage checkUserHasCapability tagmanager_use_custom_templates Fake exception
     */
    public function test_checkUseCustomTemplatesPermission()
    {
        $this->setUser();
        $this->validator->checkUseCustomTemplatesPermission($idSite = 1);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage checkUserHasSuperUserAccess Fake exception
     */
    public function test_checkUseCustomTemplatesPermission_noAccessWhenRequireSuperUser()
    {
        $this->settings->restrictCustomTemplates->setValue(SystemSettings::CUSTOM_TEMPLATES_SUPERUSER);
        $this->setAdmin();
        $this->validator->checkUseCustomTemplatesPermission($idSite = 1);
    }

    public function test_checkUseCustomTemplatesPermission_successAdmin()
    {
        $this->setAdmin();
        $this->validator->checkUseCustomTemplatesPermission($idSite = 1);
        $this->assertTrue(true);
    }

    public function test_checkUseCustomTemplatesPermission_successSuperUser()
    {
        $this->validator->checkUseCustomTemplatesPermission($idSite = 1);
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

    public function test_hasWritePermission_anonymousWithoutViewCannot()
    {
        $this->setAnonymous();
        $this->assertFalse($this->validator->hasWritePermission($idSite = 1));
    }

    public function test_hasWritePermission_success_user()
    {
        $this->setUser();
        $this->assertFalse($this->validator->hasWritePermission($idSite = 1));
    }

    public function test_hasWritePermission_admin()
    {
        $this->setAdmin();
        $this->assertTrue($this->validator->hasWritePermission($idSite = 1));
    }

    public function test_hasWritePermission_success_Superuser()
    {
        $this->assertTrue($this->validator->hasWritePermission($idSite = 1));
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
