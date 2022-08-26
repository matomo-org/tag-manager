<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration\Template;

use Piwik\Plugins\TagManager\Context\WebContext;
use Piwik\Plugins\TagManager\Template\BaseTemplate;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;
use Piwik\Settings\FieldConfig;
use Piwik\Settings\Setting;

class CustomTestTemplate extends BaseTemplate
{
    public $loadedFiles = [];
    public $templateFileChecks = [];

    public function getId()
    {
        return $this->makeIdFromClassname('Template');
    }

    public function getName()
    {
        return 'Custom Template';
    }

    public function getDescription()
    {
        return 'This is my description';
    }

    public function getHelp()
    {
        return 'This is my help';
    }

    public function getParameters()
    {
        return [$this->makeSetting('value', 'foo', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = 'Value';
        })];
    }

    public function getCategory()
    {
        return 'TestCategory';
    }

    public function getSupportedContexts()
    {
        return [WebContext::ID];
    }

    public function makeSetting($name, $defaultValue, $type, $fieldConfigCallback)
    {
        return parent::makeSetting($name, $defaultValue, $type, $fieldConfigCallback);
    }

    protected function hasTemplateFile($file)
    {
        $this->templateFileChecks[] = $file;
        return parent::hasTemplateFile($file);
    }

    protected function loadTemplateFile($file)
    {
        $this->loadedFiles[] = $file;
        return parent::loadTemplateFile($file);
    }
}

/**
 * @group TagManager
 * @group BaseTemplateTest
 * @group BaseTemplate
 * @group Plugins
 */
class BaseTemplateTest extends IntegrationTestCase
{
    /**
     * @var CustomTestTemplate
     */
    private $template;

    public function setUp(): void
    {
        parent::setUp();

        $this->template = new CustomTestTemplate();
    }

    public function testMakeSettingFailsWhenUsingReservedName()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The setting name "trigger" is reserved and cannot be used');

        $this->template->makeSetting($name = 'trigger', $defaultValue = false, FieldConfig::TYPE_BOOL, function () {
        });
    }

    public function testMakeSettingAssignsValues()
    {
        $setting = $this->template->makeSetting('value', 'foo', FieldConfig::TYPE_INT, function (FieldConfig $field) {
            $field->title = 'Value';
        });
        $this->assertTrue($setting instanceof Setting);
        $this->assertSame('value', $setting->getName());
        $this->assertSame('foo', $setting->getDefaultValue());
        $this->assertSame(FieldConfig::TYPE_INT, $setting->getType());
    }

    public function testMakeIdFromClassname()
    {
        $this->assertSame('CustomTest', $this->template->getId());
    }

    public function testLoadTemplateTemplateDoesNotExist()
    {
        $this->assertNull($this->template->loadTemplate(WebContext::ID, []));
        $this->assertSame([], $this->template->loadedFiles);
        $this->assertSame([
            PIWIK_DOCUMENT_ROOT . '/plugins/TagManager/tests/Integration/Template/BaseTemplateTest.web.min.js',
            PIWIK_DOCUMENT_ROOT . '/plugins/TagManager/tests/Integration/Template/BaseTemplateTest.web.js',
        ], $this->template->templateFileChecks);
    }

    public function testToArray()
    {
        $expected =  [
            'id' => 'CustomTest',
            'name' => 'Custom Template',
            'description' => 'This is my description',
            'category' => 'TestCategory',
            'icon' => 'plugins/TagManager/images/defaultIcon.svg',
            'help' => 'This is my help',
            'order' => 9999,
            'contexts' => [WebContext::ID],
            'hasAdvancedSettings' => true,
            'isCustomTemplate' => false,
            'parameters' =>  [
                 [
                    'name' => 'value',
                    'title' => 'Value',
                    'value' => 'foo',
                    'defaultValue' => 'foo',
                    'type' => FieldConfig::TYPE_STRING,
                    'uiControl' => FieldConfig::UI_CONTROL_TEXT,
                    'uiControlAttributes' =>  [],
                    'availableValues' => null,
                    'description' => null,
                    'inlineHelp' => null,
                    'templateFile' => '',
                    'introduction' => null,
                    'condition' => null,
                    'fullWidth' => false,
                 ],
            ],
        ];
        $this->assertSame($expected, $this->template->toArray());
    }

    public function provideContainerConfig()
    {
        return [
            'TagManagerJSMinificationEnabled' => true
        ];
    }
}
