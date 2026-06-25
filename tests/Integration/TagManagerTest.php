<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration;

use Piwik\Piwik;
use Piwik\Plugins\TagManager\Context\BaseContext;
use Piwik\Plugins\TagManager\tests\Fixtures\TagManagerFixture;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;

/**
 * @group TagManager
 * @group TagManagerTest
 * @group Plugins
 */
class TagManagerTest extends IntegrationTestCase
{
    /**
     * @var TagManagerFixture
     */
    private $tagFixture;

    public function setUp(): void
    {
        parent::setUp();

        $this->tagFixture = new TagManagerFixture();
        $this->tagFixture->setUpWebsite();
        $this->tagFixture->setUpContainers();
    }


    public function test_CoreUpdaterUpdateEnd_regeneratesReleasedContainers()
    {
        $this->assertGreaterThan(0, BaseContext::removeAllFilesOfAllContainers());

        $this->assertSame(0, BaseContext::removeAllFilesOfAllContainers());

        Piwik::postEvent('CoreUpdater.update.end');

        $this->assertGreaterThan(0, BaseContext::removeAllFilesOfAllContainers());
    }
}
