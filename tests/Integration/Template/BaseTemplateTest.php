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

class CustomTestTemplate extends BaseTemplate {

    public $loadedFiles = array();
    public $templateFileChecks = array();

    public function getId(){
        return $this->makeIdFromClassname('Template');
    }
    public function getName(){ return 'Custom Template'; }
    public function getDescription(){ return 'This is my description'; }
    public function getHelp(){ return 'This is my help'; }
    public function getParameters(){
        return array($this->makeSetting('value', 'foo', FieldConfig::TYPE_STRING, function (FieldConfig $field) {
            $field->title = 'Value';
        }));
    }
    public function getCategory(){
        return 'TestCategory';
    }
    public function getSupportedContexts(){
        return array(WebContext::ID);
    }

    public function makeSetting($name, $defaultValue, $type, $fieldConfigCallback){
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

    public function setUp()
    {
        parent::setUp();

        $this->template = new CustomTestTemplate();
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The setting name "trigger" is reserved and cannot be used
     */
    public function test_makeSetting_failsWhenUsingReservedName()
    {
        $this->template->makeSetting($name = 'trigger', $defaultValue = false, FieldConfig::TYPE_BOOL, function () {});
    }

    public function test_makeSetting_assignsValues()
    {
        $setting = $this->template->makeSetting('value', 'foo', FieldConfig::TYPE_INT, function (FieldConfig $field) {
            $field->title = 'Value';
        });
        $this->assertTrue($setting instanceof Setting);
        $this->assertSame('value', $setting->getName());
        $this->assertSame('foo', $setting->getDefaultValue());
        $this->assertSame(FieldConfig::TYPE_INT, $setting->getType());
    }

    public function test_makeIdFromClassname()
    {
        $this->assertSame('CustomTest', $this->template->getId());
    }

    public function test_loadTemplate_templateDoesNotExist()
    {
        $this->assertNull($this->template->loadTemplate(WebContext::ID, array()));
        $this->assertSame([], $this->template->loadedFiles);
        $this->assertSame([
            PIWIK_DOCUMENT_ROOT . '/plugins/TagManager/tests/Integration/Template/BaseTemplateTest.web.min.js',
            PIWIK_DOCUMENT_ROOT . '/plugins/TagManager/tests/Integration/Template/BaseTemplateTest.web.js',
        ], $this->template->templateFileChecks);
    }

    public function test_toArray()
    {
        $expected = array (
            'id' => 'CustomTest',
            'name' => 'Custom Template',
            'description' => 'This is my description',
            'category' => 'TestCategory',
            'icon' => 'plugins/TagManager/images/defaultIcon.svg',
            'help' => 'This is my help',
            'order' => 9999,
            'contexts' => array(WebContext::ID),
            'hasAdvancedSettings' => true,
            'parameters' => array (
                array (
                    'name' => 'value',
                    'title' => 'Value',
                    'value' => 'foo',
                    'defaultValue' => 'foo',
                    'type' => FieldConfig::TYPE_STRING,
                    'uiControl' => FieldConfig::UI_CONTROL_TEXT,
                    'uiControlAttributes' => array (),
                    'availableValues' => NULL,
                    'description' => NULL,
                    'inlineHelp' => NULL,
                    'templateFile' => '',
                    'introduction' => NULL,
                    'condition' => NULL,
                ),
            ),
        );
        $this->assertSame($expected, $this->template->toArray());
    }


}
