<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration\Context\BaseContext;

use Piwik\Container\StaticContainer;
use Piwik\Plugins\TagManager\Context\BaseContext\TemplateLocator;
use Piwik\Plugins\TagManager\Context\WebContext;
use Piwik\Plugins\TagManager\Template\Tag\CustomHtmlTag;
use Piwik\Plugins\TagManager\Template\Trigger\CustomEventTrigger;
use Piwik\Plugins\TagManager\Template\Variable\CustomJsFunctionVariable;
use Piwik\Plugins\TagManager\Template\Variable\DataLayerVariable;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;

/**
 * @group TagManager
 * @group TemplateLocatorTest
 * @group TemplateLocator
 * @group Plugins
 */
class TemplateLocatorTest extends IntegrationTestCase
{
    /**
     * @var TemplateLocator
     */
    private $templateLocator;

    public function setUp(): void
    {
        parent::setUp();

        $this->templateLocator = StaticContainer::get('Piwik\Plugins\TagManager\Context\BaseContext\TemplateLocator');
    }

    public function test_loadTagTemplate()
    {
        $result = $this->templateLocator->loadTagTemplate(array('type' => CustomHtmlTag::ID), WebContext::ID);
        $this->assertEquals('CustomHtmlTag', $result);

        $templates = $this->templateLocator->getLoadedTemplates();
        $this->assertEquals(array('CustomHtmlTag'), array_keys($templates));
        self::assertStringContainsString("parameters.customHtml", $templates['CustomHtmlTag']);
    }

    public function test_loadTriggerTemplate()
    {
        $result = $this->templateLocator->loadTriggerTemplate(array('type' => CustomEventTrigger::ID), WebContext::ID);
        $this->assertEquals('CustomEventTrigger', $result);

        $templates = $this->templateLocator->getLoadedTemplates();
        $this->assertEquals(array('CustomEventTrigger'), array_keys($templates));
        self::assertStringContainsString("parameters.get('eventName')", $templates['CustomEventTrigger']);
    }

    public function test_loadVariableTemplate()
    {
        $result = $this->templateLocator->loadVariableTemplate(array('type' => DataLayerVariable::ID), WebContext::ID);
        $this->assertEquals('DataLayerVariable', $result);

        $templates = $this->templateLocator->getLoadedTemplates();
        $this->assertEquals(array('DataLayerVariable'), array_keys($templates));
        self::assertStringContainsString("parameters.get('dataLayerName')", $templates['DataLayerVariable']);
    }

    public function test_loadVariableTemplate_GeneratesDifferentTemplatePerJsFunction()
    {
        foreach (array(2,1) as $id) {
            // making sure the returned method name is based on jsFunction/parameters and not based on random value so for same function
            // should return same method name
            $result = $this->templateLocator->loadVariableTemplate(array('type' => CustomJsFunctionVariable::ID, 'id' => $id, 'parameters' => array('jsFunction' => 'function (){ return 1; }')), WebContext::ID);
            $this->assertEquals('CustomJsFunctionVariableddb61d12', $result);

            $templates = $this->templateLocator->getLoadedTemplates();
            $this->assertEquals(array('CustomJsFunctionVariableddb61d12'), array_keys($templates));
        }


        $result = $this->templateLocator->loadVariableTemplate(array('type' => CustomJsFunctionVariable::ID, 'parameters' => array('jsFunction' => 'function (){ return 2; }')), WebContext::ID);
        $this->assertEquals('CustomJsFunctionVariable786282aa', $result);

        $templates = $this->templateLocator->getLoadedTemplates();
        $this->assertEquals(array('CustomJsFunctionVariableddb61d12','CustomJsFunctionVariable786282aa'), array_keys($templates));
    }

    public function test_getLoadedTemplates_isEmptyByDefault()
    {
        $this->assertSame(array(), $this->templateLocator->getLoadedTemplates());
    }

    public function test_getLoadedTemplates_canLoadMultipleTemplates()
    {
        $this->templateLocator->loadTriggerTemplate(array('type' => CustomEventTrigger::ID), WebContext::ID);
        $this->templateLocator->loadVariableTemplate(array('type' => DataLayerVariable::ID), WebContext::ID);

        $this->assertSame(array('CustomEventTrigger', 'DataLayerVariable'), array_keys($this->templateLocator->getLoadedTemplates()));
    }

}
