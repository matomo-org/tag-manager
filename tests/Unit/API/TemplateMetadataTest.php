<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Unit\API;

use Piwik\Plugins\TagManager\API\TemplateMetadata;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\UnitTestCase;

/**
 * @group TagManager
 * @group TemplateMetadataTest
 * @group TemplateMetadata
 * @group Plugins
 */
class TemplateMetadataTest extends UnitTestCase
{
    /**
     * @var TemplateMetadata
     */
    private $template;

    public function setUp(): void
    {
        parent::setUp();
        $this->template = new TemplateMetadata();
    }

    public function test_formatTemplates_BasedOnArrays()
    {
        $templates = array(
            ['category' => 'Foo', 'name' => 'ZooName', 'order' => 10],
            ['category' => 'Foo', 'name' => 'AooName', 'order' => 15],
            ['category' => 'Foo', 'name' => 'FooName', 'order' => 5],
            ['category' => 'Bar', 'name' => 'ZooName', 'order' => 6],
            ['category' => 'Bar', 'name' => 'FooName', 'order' => 15],
            ['category' => 'Baz', 'name' => 'ZooName', 'order' => 10],
            ['category' => 'Baz', 'name' => 'FooName', 'order' => 10],
            ['category' => 'Baz', 'name' => 'AooName', 'order' => 10],
        );
        $expected = array (
            array (
                'name' => 'Bar',
                'types' =>
                    array (
                        array (
                            'category' => 'Bar',
                            'name' => 'ZooName',
                            'order' => 6,
                        ),
                        array (
                            'category' => 'Bar',
                            'name' => 'FooName',
                            'order' => 15,
                        ),
                    ),
            ),
            array (
                'name' => 'Baz',
                'types' =>
                    array (
                        array (
                            'category' => 'Baz',
                            'name' => 'AooName',
                            'order' => 10,
                        ),
                        array (
                            'category' => 'Baz',
                            'name' => 'FooName',
                            'order' => 10,
                        ),
                        array (
                            'category' => 'Baz',
                            'name' => 'ZooName',
                            'order' => 10,
                        ),
                    ),
            ),
            array (
                'name' => 'Foo',
                'types' =>
                    array (
                        array (
                            'category' => 'Foo',
                            'name' => 'FooName',
                            'order' => 5,
                        ),
                        array (
                            'category' => 'Foo',
                            'name' => 'ZooName',
                            'order' => 10,
                        ),
                        array (
                            'category' => 'Foo',
                            'name' => 'AooName',
                            'order' => 15,
                        ),
                    ),
            ),
        );
        $this->assertSame($expected, $this->template->formatTemplates($templates));
    }
}
