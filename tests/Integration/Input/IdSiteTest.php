<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\tests\Integration\Input;

use Piwik\Plugins\TagManager\Input\IdSite;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;
use Piwik\Tests\Framework\Fixture;

/**
 * @group TagManager
 * @group IdSiteTest
 * @group IdSite
 * @group Input
 * @group Plugins
 */
class IdSiteTest extends IntegrationTestCase
{
    public function setUp()
    {
        parent::setUp();
        Fixture::createWebsite('2012-03-04 05:06:07');
        Fixture::createWebsite('2012-03-04 05:06:07');
        Fixture::createWebsite('2012-03-04 05:06:07');
    }

    public function test_validate_successValueNotEmpty()
    {
        $this->checkIdSite('1');
        $this->checkIdSite('2');
        $this->checkIdSite(1);
        $this->checkIdSite(2);
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage idSite: A value needs to be provided
     */
    public function test_validate_failNotProvided()
    {
        $this->checkIdSite(false);
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage unexpected website was found
     */
    public function test_validate_failValueDoesNotExist()
    {
        $this->checkIdSite(99);
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage A value needs to be provided.
     */
    public function test_validate_failValueIsEmpty()
    {
        $this->checkIdSite(0);
    }

    private function checkIdSite($idsite)
    {
        $idsite = new IdSite($idsite);
        $idsite->check();
    }

}
