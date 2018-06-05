<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration;

use Piwik\Config;
use Piwik\Plugins\TagManager\Configuration;
use Piwik\Plugins\TagManager\Model\Environment;
use Piwik\Plugins\TagManager\SystemSettings;
use Piwik\Plugins\TagManager\Template\Tag\CustomHtmlTag;
use Piwik\Plugins\TagManager\Template\Variable\CustomJsFunctionVariable;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * @group TagManager
 * @group ConfigurationTest
 * @group Configuration
 * @group Plugins
 */
class ConfigurationTest extends IntegrationTestCase
{
    /**
     * @var Configuration
     */
    private $configuration;

    /**
     * @var SystemSettings
     */
    private $systemSettings;

    public function setUp()
    {
        parent::setUp();

        $this->systemSettings = new SystemSettings();
        $this->configuration = new Configuration($this->systemSettings);
        $this->configuration->install();
    }

    public function test_shouldInstallConfig()
    {
        $this->configuration->install();

        $configs = Config::getInstance()->TagManager;
        $this->assertEquals(array(
            'disable_tags' => array(),
            'disable_triggers' => array(),
            'disable_variables' => array(),
        ), $configs);
    }

    public function test_getDisabledTags_byDefault()
    {
        $this->assertSame(array(), $this->configuration->getDisabledTags());
    }

    public function test_getDisabledTags_emptyCustomValue()
    {
        Config::getInstance()->TagManager = array(
            Configuration::KEY_DISABLED_TAGS => array('customhtml', 'foo', 'bar')
        );
        $this->assertSame(array('customhtml', 'foo', 'bar'), $this->configuration->getDisabledTags());
    }

    public function test_getDisabledTags_disabledCustomTags()
    {
        $this->systemSettings->enableCustomTemplates->setValue(0);
        $this->assertSame(array(CustomHtmlTag::ID), $this->configuration->getDisabledTags());
    }

    public function test_getDisabledTags_disabledCustomTagsAndValues()
    {
        Config::getInstance()->TagManager = array(
            Configuration::KEY_DISABLED_TAGS => array('foo', 'bar')
        );
        $this->systemSettings->enableCustomTemplates->setValue(0);
        $this->assertSame(array('foo', 'bar', CustomHtmlTag::ID), $this->configuration->getDisabledTags());
    }

    public function test_getDisabledTags_invalidValue()
    {
        Config::getInstance()->TagManager = array(
            Configuration::KEY_DISABLED_TAGS => '5'
        );
        $this->assertSame(array(), $this->configuration->getDisabledTags());
    }

    public function test_getDisabledVariables_byDefault()
    {
        $this->assertSame(array(), $this->configuration->getDisabledVariables());
    }

    public function test_getDisabledVariables_emptyCustomValue()
    {
        Config::getInstance()->TagManager = array(
            Configuration::KEY_DISABLED_VARIABLES => array('customhtml', 'foo', 'bar')
        );
        $this->assertSame(array('customhtml', 'foo', 'bar'), $this->configuration->getDisabledVariables());
    }

    public function test_getDisabledVariables_disabledCustomVariables()
    {
        $this->systemSettings->enableCustomTemplates->setValue(0);
        $this->assertSame(array(CustomJsFunctionVariable::ID), $this->configuration->getDisabledVariables());
    }

    public function test_getDisabledVariables_disabledCustomVariablesAndValues()
    {
        Config::getInstance()->TagManager = array(
            Configuration::KEY_DISABLED_VARIABLES => array('foo', 'bar')
        );
        $this->systemSettings->enableCustomTemplates->setValue(0);
        $this->assertSame(array('foo', 'bar', CustomJsFunctionVariable::ID), $this->configuration->getDisabledVariables());
    }

    public function test_getDisabledVariables_invalidValue()
    {
        Config::getInstance()->TagManager = array(
            Configuration::KEY_DISABLED_VARIABLES => '5'
        );
        $this->assertSame(array(), $this->configuration->getDisabledVariables());
    }
    
    public function test_getDisabledTriggers_byDefault()
    {
        $this->assertSame(array(), $this->configuration->getDisabledTriggers());
    }

    public function test_getDisabledTriggers_emptyCustomValue()
    {
        Config::getInstance()->TagManager = array(
            Configuration::KEY_DISABLED_TRIGGERS => array('customhtml', 'foo', 'bar')
        );
        $this->assertSame(array('customhtml', 'foo', 'bar'), $this->configuration->getDisabledTriggers());
    }

    public function test_getDisabledTriggers_invalidValue()
    {
        Config::getInstance()->TagManager = array(
            Configuration::KEY_DISABLED_TRIGGERS => '5'
        );
        $this->assertSame(array(), $this->configuration->getDisabledTriggers());
    }

}
