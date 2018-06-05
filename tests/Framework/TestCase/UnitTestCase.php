<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Framework\TestCase;
use Piwik\Translate;

/**
 * @group unit
 */
class UnitTestCase extends \PHPUnit_Framework_TestCase
{
    public function setUp()
    {
        Translate::loadEnglishTranslation();
    }
}
