<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration\Model\Container;

use Piwik\Plugins\TagManager\Model\Container\StaticContainerIdGenerator;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;

/**
 * @group TagManager
 * @group StaticContainerIdGeneratorTest
 * @group StaticContainerIdGenerator
 * @group Plugins
 */
class StaticContainerIdGeneratorTest extends IntegrationTestCase
{
    public function test_generateId_alwaysReturnsFixedId()
    {
        $generator = new StaticContainerIdGenerator('foobar');
        $this->assertSame('foobar', $generator->generateId());
        $this->assertSame('foobar', $generator->generateId());
        $this->assertSame('foobar', $generator->generateId());
    }
}
