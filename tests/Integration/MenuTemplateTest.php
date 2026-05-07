<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration;

use Piwik\Container\StaticContainer;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;

/**
 * @group TagManager
 * @group MenuTemplateTest
 * @group Plugins
 */
class MenuTemplateTest extends IntegrationTestCase
{
    private const XSS_CONTAINER_NAME = 'Container <img src=x onerror=alert(1)> "Quotes" & More';
    private const XSS_CONTAINER_NAME_ESCAPED_FOR_HTML_ATTR = 'Container&#x20;&lt;img&#x20;src&#x3D;x&#x20;onerror&#x3D;alert&#x28;1&#x29;&gt;&#x20;&quot;Quotes&quot;&#x20;&amp;&#x20;More';
    private const XSS_CONTAINER_NAME_HTML_ESCAPED_FOR_HTML_ATTR = 'Container&#x20;&amp;lt&#x3B;img&#x20;src&#x3D;x&#x20;onerror&#x3D;alert&#x28;1&#x29;&amp;gt&#x3B;&#x20;&amp;quot&#x3B;Quotes&amp;quot&#x3B;&#x20;&amp;amp&#x3B;&#x20;More';

    public function testContainerDropdownEscapesContainerNames(): void
    {
        $html = $this->renderMacro(
            'containerDropdown',
            array(
                array(
                    array(
                        'id' => 'xsscont1',
                        'name' => self::XSS_CONTAINER_NAME,
                        'url' => 'index.php?module=TagManager&action=dashboard&idContainer=xsscont1',
                    ),
                ),
                'xsscont1',
                self::XSS_CONTAINER_NAME,
                true,
            )
        );

        $this->assertStringContainsString('Container &lt;img src=x onerror=alert(1)&gt; &quot;Quotes&quot; &amp; More', $html);
        $this->assertStringContainsString('title="' . self::XSS_CONTAINER_NAME_ESCAPED_FOR_HTML_ATTR . '"', $html);
        $this->assertStringContainsString('menu-title="' . self::XSS_CONTAINER_NAME_HTML_ESCAPED_FOR_HTML_ATTR . '"', $html);
        $this->assertStringNotContainsString('<img src=x', $html);
        $this->assertStringNotContainsString('"Quotes"', $html);
    }

    public function testSingleContainerMenuItemEscapesContainerNames(): void
    {
        $html = $this->renderMacro(
            'menuItem',
            array(
                self::XSS_CONTAINER_NAME,
                array(
                    '_cssClass' => 'container-menu-item',
                    '_tooltip' => self::XSS_CONTAINER_NAME,
                    '_url' => array(),
                    '_onclick' => '',
                    '_icon' => '',
                    '_help' => '',
                ),
                true,
                false,
            )
        );

        $this->assertStringContainsString('Container &lt;img src=x onerror=alert(1)&gt; &quot;Quotes&quot; &amp; More', $html);
        $this->assertStringContainsString('title="' . self::XSS_CONTAINER_NAME_ESCAPED_FOR_HTML_ATTR . '"', $html);
        $this->assertStringNotContainsString('<img src=x', $html);
        $this->assertStringNotContainsString('"Quotes"', $html);
    }

    private function renderMacro(string $macro, array $arguments): string
    {
        $renderer = StaticContainer::get('Piwik\Twig');
        $template = $renderer->getTwigEnvironment()->createTemplate(
            sprintf(
                '{%% import "@TagManager/_menu.twig" as menu %%}{{ menu.%s(%s) }}',
                $macro,
                implode(', ', array_map('json_encode', $arguments))
            )
        );

        return $template->render();
    }
}
