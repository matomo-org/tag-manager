<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration\Model\Container;

use Piwik\Plugins\TagManager\Dao\ContainersDao;
use Piwik\Plugins\TagManager\Model\Container\RandomContainerIdGenerator;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;

/**
 * @group TagManager
 * @group RandomContainerIdGeneratorTest
 * @group RandomContainerIdGenerator
 * @group Plugins
 */
class RandomContainerIdGeneratorTest extends IntegrationTestCase
{
    /**
     * @var RandomContainerIdGenerator
     */
    private $generator;

    public function setUp(): void
    {
        parent::setUp();
        $this->generator = new RandomContainerIdGenerator(new ContainersDao());
    }

    public function test_generateId_alwaysReturnsDifferentId()
    {
        $id1 = $this->generator->generateId();
        $id2 = $this->generator->generateId();
        $id3 = $this->generator->generateId();
        $this->assertNotSame($id1, $id2);
        $this->assertNotSame($id2, $id3);
        $this->assertSame(8, strlen($id1));
        $this->assertTrue(ctype_alnum($id1));
    }
}
