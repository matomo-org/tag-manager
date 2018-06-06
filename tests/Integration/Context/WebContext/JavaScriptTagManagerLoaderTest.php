<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration\Context\BaseContext;

use Piwik\Container\StaticContainer;
use Piwik\Plugins\TagManager\Context\WebContext;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;
use Piwik\Tests\Framework\Fixture;

/**
 * @group TagManager
 * @group JavaScriptTagManagerLoader
 * @group JavaScriptTagManagerLoaderTest
 * @group Plugins
 */
class JavaScriptTagManagerLoaderTest extends IntegrationTestCase
{
    /**
     * @var WebContext\JavaScriptTagManagerLoader
     */
    private $loader;

    public function setUp()
    {
        parent::setUp();

        Fixture::createWebsite('2014-01-01 02:03:04');

        $this->loader = StaticContainer::get('Piwik\Plugins\TagManager\Context\WebContext\JavaScriptTagManagerLoader');
    }

    public function test_getJavaScriptContent()
    {
        $result = $this->loader->getJavaScriptContent();
        $this->assertContains('window.MatomoTagManager', $result);
        $this->assertGreaterThanOrEqual(5000, strlen($result));
    }

    public function test_getDetectPreviewModeContent()
    {
        $previewUrl = 'https://localhost/js/1_live_23iaMf3k.js';
        $result = $this->loader->getDetectPreviewModeContent($previewUrl, 1, '23iaMf3k');
        $this->assertContains('document.cookie.indexOf', $result);
        $this->assertContains($previewUrl, $result);
        $this->assertGreaterThanOrEqual(100, strlen($result));
    }

    public function test_getPreviewJsContent()
    {
        $result = $this->loader->getPreviewJsContent();
        $this->assertContains('renderPreviewFrame("', $result);
        $this->assertContains('DOCTYPE html', $result);
        $this->assertContains('<body ng-app=', $result);
        $this->assertGreaterThanOrEqual(5000, strlen($result));
    }

}
