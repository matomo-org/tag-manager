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
use Piwik\Plugins\TagManager\SystemSettings;
use Piwik\Plugins\TagManager\Template\Tag\CustomHtmlTag;
use Piwik\Plugins\TagManager\Template\Tag\MatomoTag;
use Piwik\Plugins\TagManager\Template\Tag\TagsProvider;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;

/**
 * @group TagManager
 * @group TagsProviderTest
 * @group TagsProvider
 * @group Plugins
 */
class TagsProviderTest extends IntegrationTestCase
{
    /**
     * @var TagsProvider
     */
    private $provider;

    public function setUp()
    {
        parent::setUp();

        $this->provider = StaticContainer::get('Piwik\Plugins\TagManager\Template\Tag\TagsProvider');
    }

    public function test_getAllTags()
    {
        $tags = $this->provider->getAllTags();
        $this->assertInternalType('array', $tags);
        $this->assertGreaterThanOrEqual(3, count($tags));
    }

    public function test_getTag_findsTagById()
    {
        $tag = $this->provider->getTag('Matomo');
        $this->assertTrue($tag instanceof MatomoTag);
        $this->assertSame('Matomo', $tag->getId());
    }

    public function test_getTag_searchesCaseSensitive()
    {
        $this->assertNotEmpty($this->provider->getTag('Matomo'));
        $this->assertNull($this->provider->getTag('matomo'));
        $this->assertNull($this->provider->getTag('matOmo'));
    }

    public function test_getTag_notExistingTag()
    {
        $this->assertNull($this->provider->getTag('foobarbaz'));
    }

    public function test_checkIsValidTag_noExceptionWhenTagExists()
    {
        $this->provider->checkIsValidTag('Matomo');
        $this->assertTrue(true);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The tag "matomo" is not supported
     */
    public function test_checkIsValidTag_searchesCaseSensitive()
    {
        $this->provider->checkIsValidTag('matomo');
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The tag "foobarbaz" is not supported
     */
    public function test_checkIsValidTag_notExistingTag()
    {
        $this->provider->checkIsValidTag('foobarbaz');
    }

    public function test_blocksConfiguredTags()
    {
        Config::getInstance()->TagManager = array(Configuration::KEY_DISABLED_TAGS => array('matoMo'));
        $tags = $this->provider->getAllTags();
        foreach ($tags as $tag) {
            $this->assertNotEquals('Matomo', $tag->getId());
        }
        $this->assertNull($this->provider->getTag('Matomo'));
    }

    public function test_getAllWorksWhenCustomTemplatesDisabled()
    {
        $settings = StaticContainer::get(SystemSettings::class);
        $settings->restrictCustomTemplates->setValue(SystemSettings::CUSTOM_TEMPLATES_DISABLED);
        /** @var TagsProvider $provider */
        $provider = StaticContainer::getContainer()->make(TagsProvider::class, array(
            'systemSettings' => $settings
        ));
        $tags = $provider->getAllTags();
        $this->assertNotEmpty($tags);
    }

    public function test_isCustomTemplate()
    {
        $this->assertFalse($this->provider->isCustomTemplate(null));
        $this->assertFalse($this->provider->isCustomTemplate(false));
        $this->assertFalse($this->provider->isCustomTemplate('foo'));
        $this->assertTrue($this->provider->isCustomTemplate(CustomHtmlTag::ID));
    }

}
