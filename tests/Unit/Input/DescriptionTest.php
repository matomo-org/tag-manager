<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\tests\Unit\Input;
use Piwik\Plugins\TagManager\Input\Description;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\UnitTestCase;

/**
 * @group TagManager
 * @group DescriptionTest
 * @group Description
 * @group Input
 * @group Plugins
 */
class DescriptionTest extends UnitTestCase
{
    public function test_check_shouldThrowException_IfDescriptionIsTooLong()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Description: The value contains "1001" characters but should contain at most 1000 characters.');

        $this->checkDescription(str_pad('4', Description::MAX_LENGTH + 1));
    }

    public function test_check_valid()
    {
        self::expectNotToPerformAssertions();

        $this->checkDescription(false);
        $this->checkDescription('');
        $this->checkDescription('s');
        $this->checkDescription(str_pad('2', Description::MAX_LENGTH - 1, 'f'));
        $this->checkDescription('fooBarBaz4392');
        $this->checkDescription('foo Bar Baz 4392');
    }

    private function checkDescription($description)
    {
        $description = new Description($description);
        $description->check();
    }

}
