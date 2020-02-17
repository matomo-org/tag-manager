<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Framework\TestCase;
use Piwik\Tests\Framework\Fixture;

/**
 * @group unit
 */
class UnitTestCase extends \PHPUnit\Framework\TestCase
{
    public function setUp()
    {
        Fixture::loadAllTranslations();
    }
}
