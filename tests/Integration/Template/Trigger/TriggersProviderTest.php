<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration\Template\Tag;

use Piwik\Config;
use Piwik\Container\StaticContainer;
use Piwik\Plugins\TagManager\Configuration;
use Piwik\Plugins\TagManager\Template\Trigger\DomReadyTrigger;
use Piwik\Plugins\TagManager\Template\Trigger\TriggersProvider;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;

/**
 * @group TagManager
 * @group TriggersProviderTest
 * @group TriggersProvider
 * @group Plugins
 */
class TriggersProviderTest extends IntegrationTestCase
{
    /**
     * @var TriggersProvider
     */
    private $provider;

    public function setUp()
    {
        parent::setUp();

        $this->provider = StaticContainer::get('Piwik\Plugins\TagManager\Template\Trigger\TriggersProvider');
    }

    public function test_getAllTriggers()
    {
        $triggers = $this->provider->getAllTriggers();
        $this->assertInternalType('array', $triggers);
        $this->assertGreaterThanOrEqual(6, count($triggers));
    }

    public function test_getTrigger_findsTriggerById()
    {
        $trigger = $this->provider->getTrigger('DomReady');
        $this->assertTrue($trigger instanceof DomReadyTrigger);
        $this->assertSame('DomReady', $trigger->getId());
    }

    public function test_getTrigger_searchesCaseSensitive()
    {
        $this->assertNotEmpty($this->provider->getTrigger('DomReady'));
        $this->assertNull($this->provider->getTrigger('domready'));
        $this->assertNull($this->provider->getTrigger('Domready'));
        $this->assertNull($this->provider->getTrigger('doMReady'));
    }

    public function test_getTrigger_notExistingTrigger()
    {
        $this->assertNull($this->provider->getTrigger('foobarbaz'));
    }

    public function test_checkIsValidTrigger_noExceptionWhenTriggerExists()
    {
        $this->provider->checkIsValidTrigger('DomReady');
        $this->assertTrue(true);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The trigger "domready" is not supported
     */
    public function test_checkIsValidTrigger_searchesCaseSensitive()
    {
        $this->provider->checkIsValidTrigger('domready');
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The trigger "foobarbaz" is not supported
     */
    public function test_checkIsValidTrigger_notExistingTrigger()
    {
        $this->provider->checkIsValidTrigger('foobarbaz');
    }

    public function test_blocksConfiguredTriggers()
    {
        Config::getInstance()->TagManager = array(Configuration::KEY_DISABLED_TRIGGERS => array('domReAdy'));
        $triggers = $this->provider->getAllTriggers();
        foreach ($triggers as $trigger) {
            $this->assertNotEquals('DomReady', $trigger->getId());
        }
        $this->assertNull($this->provider->getTrigger('DomReady'));
    }

}
