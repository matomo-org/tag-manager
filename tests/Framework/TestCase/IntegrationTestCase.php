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
 * @group integration
 */
class IntegrationTestCase extends \Piwik\Tests\Framework\TestCase\IntegrationTestCase
{
    public function setUp()
    {
        parent::setUp();
        Translate::loadEnglishTranslation();
    }

    public function tearDown()
    {
        Translate::unloadEnglishTranslation();
        parent::tearDown();
    }

}
