<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration\Template\Trigger;

use Piwik\Config;
use Piwik\Container\StaticContainer;
use Piwik\Plugins\TagManager\Configuration;
use Piwik\Plugins\TagManager\SystemSettings;
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

    public function setUp(): void
    {
        parent::setUp();

        $this->provider = StaticContainer::get(TriggersProvider::class);
    }

    public function test_getAllTriggers()
    {
        $triggers = $this->provider->getAllTriggers();
        self::assertIsArray($triggers);
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

    public function test_checkIsValidTrigger_searchesCaseSensitive()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The trigger "domready" is not supported');

        $this->provider->checkIsValidTrigger('domready');
    }

    public function test_checkIsValidTrigger_notExistingTrigger()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The trigger "foobarbaz" is not supported');

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

    public function test_getAllWorksWhenCustomTemplatesDisabled()
    {
        $settings = StaticContainer::get(SystemSettings::class);
        $settings->restrictCustomTemplates->setValue(SystemSettings::CUSTOM_TEMPLATES_DISABLED);
        /** @var TriggersProvider $provider */
        $provider = StaticContainer::getContainer()->make(TriggersProvider::class, array(
            'systemSettings' => $settings
        ));
        $triggers = $provider->getAllTriggers();
        $this->assertNotEmpty($triggers);
    }

    public function test_isCustomTemplate()
    {
        $this->assertFalse($this->provider->isCustomTemplate(null));
        $this->assertFalse($this->provider->isCustomTemplate(false));
        $this->assertFalse($this->provider->isCustomTemplate('foo'));
    }

}
