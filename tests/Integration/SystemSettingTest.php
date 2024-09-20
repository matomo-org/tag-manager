<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration;

use Piwik\Access;
use Piwik\Container\StaticContainer;
use Piwik\Plugins\TagManager\Model\Environment;
use Piwik\Plugins\TagManager\SystemSettings;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;
use Piwik\Tests\Framework\Mock\FakeAccess;

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

    public function setUp(): void
    {
        parent::setUp();

        $this->settings = new SystemSettings();
    }

    public function test_enableCustomTemplates_shouldBeEnabledByDefault()
    {
        $this->assertSame(SystemSettings::CUSTOM_TEMPLATES_ADMIN, $this->settings->restrictCustomTemplates->getDefaultValue());
    }

    public function test_enableCustomTemplates_shouldBePossibleToDisable()
    {
        $this->settings->restrictCustomTemplates->setValue(SystemSettings::CUSTOM_TEMPLATES_DISABLED);
        $this->assertSame(SystemSettings::CUSTOM_TEMPLATES_DISABLED, $this->settings->restrictCustomTemplates->getValue());
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

    public function test_getEnvironments_previewNotValid()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The preview environment cannot be configured');

        $this->settings->environments->setValue(array(
            array('environment' => 'foo'),
            array('environment' => Environment::ENVIRONMENT_PREVIEW),
            array('environment' => 'dev'),
        ));
        $this->settings->getEnvironments();
    }

    public function test_getEnvironments_invalidFormat()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Missing array key environment');

        $this->settings->environments->setValue(array(
            null
        ));
        $this->settings->getEnvironments();
    }

    public function test_getEnvironments_invalidKey()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Missing array key environment');

        $this->settings->environments->setValue(array(
            array('foo' => 'bar')
        ));
        $this->settings->getEnvironments();
    }

    public function test_getEnvironments_validatesTheName()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('does not have a valid length');

        $this->settings->environments->setValue(array(
            array('environment' => 'foo'),
            array('environment' => str_pad('foo', Environment::MAX_LENGTH + 1, 'f')),
            array('environment' => 'dev'),
        ));
        $this->settings->getEnvironments();
    }

    public function test_save_willNotFail()
    {
        self::expectNotToPerformAssertions();

        $this->settings->save();
        $this->settings->environments->setValue(array(
            array('environment' => 'BaZ'),
            array('environment' => 'fOo'),
        ));
        $this->settings->save();
    }

    public function testSaveRestrictTagManagerAccess()
    {
        $settingValue = SystemSettings::USER_PERMISSON_LIST[2];
        $this->settings->restrictTagManagerAccess->setValue($settingValue);
        $this->settings->save();

        $this->assertSame($settingValue, $this->settings->restrictTagManagerAccess->getValue());
    }

    /**
     * @dataProvider getDoesCurrentUserHaveTagManagerAccessData
     */
    public function testDoesCurrentUserHaveTagManagerAccess(?int $roleIndex, ?int $settingRoleIndex, bool $isSuperUser, bool $expected)
    {
        if ($settingRoleIndex !== null) {
            $this->settings->restrictTagManagerAccess->setValue(SystemSettings::USER_PERMISSON_LIST[$settingRoleIndex]);
        }

        if ($roleIndex !== null) {
            $fakeAccess = new FakeAccess();
            switch ($roleIndex) {
                case 0:
                    $fakeAccess->setIdSitesView([1, 2, 3]);
                    break;
                case 1:
                    $fakeAccess->setIdSitesWrite([1, 2, 3]);
                    break;
                case 2:
                    $fakeAccess->setIdSitesAdmin([1, 2, 3]);
                    break;
            }

            StaticContainer::getContainer()->set('Piwik\Access', $fakeAccess);
        }

        Access::getInstance()->setSuperUserAccess($isSuperUser);

        $this->assertSame($isSuperUser, Access::getInstance()->hasSuperUserAccess());

        $roleName = $roleIndex === null ? 'None' : SystemSettings::USER_PERMISSON_LIST[$roleIndex];
        $settingMinRole = $settingRoleIndex === null ? 'None' : SystemSettings::USER_PERMISSON_LIST[$settingRoleIndex];
        $message = "Expected '{$expected}' for user role '{$roleName}', setting min role '{$settingMinRole}', and is superuser? '{$isSuperUser}'.";
        $this->assertSame($expected, $this->settings->doesCurrentUserHaveTagManagerAccess(), $message);
    }

    public function getDoesCurrentUserHaveTagManagerAccessData(): array
    {
        return [
            [null, null, false, false],
            [null, null, true, true],
            [0, null, true, true],
            [0, null, true, true],
            [1, null, true, true],
            [1, null, true, true],
            [2, null, true, true],
            [2, null, true, true],
            [null, 0, false, false],
            [null, 0, true, true],
            [0, 0, true, true],
            [0, 0, true, true],
            [1, 0, true, true],
            [1, 0, true, true],
            [2, 0, true, true],
            [2, 0, true, true],
            [null, 1, false, false],
            [null, 1, true, true],
            [0, 1, false, false],
            [0, 1, true, true],
            [1, 1, true, true],
            [1, 1, true, true],
            [2, 1, true, true],
            [2, 1, true, true],
            [null, 2, false, false],
            [null, 2, true, true],
            [0, 2, false, false],
            [0, 2, true, true],
            [1, 2, false, false],
            [1, 2, true, true],
            [2, 2, true, true],
            [2, 2, true, true],
            [null, 3, false, false],
            [null, 3, true, true],
            [0, 3, false, false],
            [0, 3, true, true],
            [1, 3, false, false],
            [1, 3, true, true],
            [2, 3, false, false],
            [2, 3, true, true],
        ];
    }
}
