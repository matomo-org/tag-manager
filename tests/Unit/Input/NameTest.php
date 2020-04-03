<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\tests\Unit\Input;

use Piwik\Plugins\TagManager\Input\Name;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\UnitTestCase;

/**
 * @group TagManager
 * @group NameTest
 * @group Name
 * @group Input
 * @group Plugins
 */
class NameTest extends UnitTestCase
{
    public function test_check_shouldThrowException_IfNameIsEmpty()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Name: A value needs to be provided.');

        $this->checkName(false);
    }

    public function test_check_shouldThrowException_IfNameStringIsEmpty()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Name: A value needs to be provided.');

        $this->checkName('');
    }

    public function test_check_shouldThrowException_IfNameIsTooLong()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Name: The value contains "51" characters but should contain at most 50 characters.');

        $this->checkName(str_pad('4', Name::MAX_LENGTH + 1));
    }

    public function test_check_valid()
    {
        $this->checkName('s');
        $this->checkName(str_pad('2', Name::MAX_LENGTH - 1, 'f'));
        $this->checkName('fooBarBaz4392');
        $this->checkName('12121212f');
        $this->checkName('121 212 12f');
        $this->checkName('f1212121212');
        $this->checkName('fooBarBaz4392');
        $this->assertTrue(true);
    }

    private function checkName($name)
    {
        $name = new Name($name);
        $name->check();
    }

}
