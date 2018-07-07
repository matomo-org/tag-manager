<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration;

use Piwik\Plugins\TagManager\Model\Environment;
use Piwik\Plugins\TagManager\SystemSettings;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;

/**
 * @group TagManager
 * @group SystemSettings
 * @group SystemSettingsTest
 * @group Plugins
 */
class SystemSettingTest extends IntegrationTestCase
{
    /**
     * @var SystemSettings
     */
    private $settings;

    public function setUp()
    {
        parent::setUp();

        $this->settings = new SystemSettings();
    }

    public function test_enableCustomTemplates_shouldBeEnabledByDefault()
    {
        $this->assertTrue($this->settings->enableCustomTemplates->getDefaultValue());
    }

    public function test_enableCustomTemplates_shouldBePossibleToDisable()
    {
        $this->settings->enableCustomTemplates->setValue('0');
        $this->assertFalse($this->settings->enableCustomTemplates->getValue());
    }


    public function test_getEnvironments_byDefault()
    {
        $this->assertSame(array(Environment::ENVIRONMENT_LIVE, 'dev', 'staging'), $this->settings->getEnvironments());
    }

    public function test_getEnvironments_emptyCustomValue()
    {
        $this->settings->environments->setValue(array());
        $this->assertSame(array(Environment::ENVIRONMENT_LIVE), $this->settings->getEnvironments());
    }

    public function test_getEnvironments_customValue()
    {
        $this->settings->environments->setValue(array(
            array('environment' => Environment::ENVIRONMENT_LIVE),
            array('environment' => 'foo'),
            array('environment' => 'bar'),
            array('environment' => 'dev'),
        ));
        $this->assertSame(array(Environment::ENVIRONMENT_LIVE, 'foo', 'bar', 'dev'), $this->settings->getEnvironments());
    }

    public function test_getEnvironments_ignoresEmptyValue()
    {
        $this->settings->environments->setValue(array(
            array('environment' => Environment::ENVIRONMENT_LIVE),
            array('environment' => 'baz'),
            array('environment' => ''),
            array('environment' => 'bar'),
            array('environment' => ''),
        ));
        $this->assertSame(array(Environment::ENVIRONMENT_LIVE, 'baz', 'bar'), $this->settings->getEnvironments());
    }

    public function test_getEnvironments_lowersValue()
    {
        $this->settings->environments->setValue(array(
            array('environment' => 'BaZ'),
            array('environment' => 'fOo'),
        ));
        $this->assertSame(array(Environment::ENVIRONMENT_LIVE, 'baz', 'foo'), $this->settings->getEnvironments());
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The preview environment cannot be configured
     */
    public function test_getEnvironments_previewNotValid()
    {
        $this->settings->environments->setValue(array(
            array('environment' => 'foo'),
            array('environment' => Environment::ENVIRONMENT_PREVIEW),
            array('environment' => 'dev'),
        ));
        $this->settings->getEnvironments();
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage Missing array key environment
     */
    public function test_getEnvironments_invalidFormat()
    {
        $this->settings->environments->setValue(array(
            null
        ));
        $this->settings->getEnvironments();
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage Missing array key environment
     */
    public function test_getEnvironments_invalidKey()
    {
        $this->settings->environments->setValue(array(
            array('foo' => 'bar')
        ));
        $this->settings->getEnvironments();
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage does not have a valid lenght
     */
    public function test_getEnvironments_validatesTheName()
    {
        $this->settings->environments->setValue(array(
            array('environment' => 'foo'),
            array('environment' => str_pad('foo', Environment::MAX_LENGTH + 1, 'f')),
            array('environment' => 'dev'),
        ));
        $this->settings->getEnvironments();
    }

    public function test_save_willNotFail()
    {
        $this->settings->save();
        $this->settings->environments->setValue(array(
            array('environment' => 'BaZ'),
            array('environment' => 'fOo'),
        ));
        $this->settings->save();
        $this->assertTrue(true);
    }

}
