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
    public function setUp(): void
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

    public function test_validate_failNotProvided()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('idSite: A value needs to be provided');

        $this->checkIdSite(false);
    }

    public function test_validate_failValueDoesNotExist()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('unexpected website was found');

        $this->checkIdSite(99);
    }

    public function test_validate_failValueIsEmpty()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('A value needs to be provided.');

        $this->checkIdSite(0);
    }

    private function checkIdSite($idsite)
    {
        $idsite = new IdSite($idsite);
        $idsite->check();
    }

}
