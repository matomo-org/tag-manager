<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration\Model;

use Piwik\Container\StaticContainer;
use Piwik\Plugins\TagManager\Configuration;
use Piwik\Plugins\TagManager\Model\Environment;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;
use Piwik\Tests\Framework\Fixture;

/**
 * @group TagManager
 * @group EnvironmentTest
 * @group Environment
 * @group Plugins
 */
class EnvironmentTest extends IntegrationTestCase
{
    /**
     * @var int
     */
    private $idSite;

    /**
     * @var Configuration
     */
    private $settings;

    /**
     * @var Environment
     */
    private $environment;

    public function setUp(): void
    {
        parent::setUp();

        $this->idSite = Fixture::createWebsite('2014-03-04 05:06:07');

        $this->settings = StaticContainer::get('Piwik\Plugins\TagManager\SystemSettings');
        $this->environment = new Environment($this->settings);
    }

    public function test_checkEnvironmentNameFormat_valid()
    {
        self::expectNotToPerformAssertions();

        Environment::checkEnvironmentNameFormat('fo_f');
        Environment::checkEnvironmentNameFormat('foo_f');
        Environment::checkEnvironmentNameFormat('fo');
        Environment::checkEnvironmentNameFormat('99');
        Environment::checkEnvironmentNameFormat('foo');
        Environment::checkEnvironmentNameFormat(str_pad('foo', Environment::MAX_LENGTH, 'f'));
        Environment::checkEnvironmentNameFormat('0foo');
        Environment::checkEnvironmentNameFormat('foo9');
        Environment::checkEnvironmentNameFormat('949101');
        Environment::checkEnvironmentNameFormat('949_101');
    }

    public function test_checkEnvironmentNameFormat_tooLong()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The environment "fooffffffffffffffffffffffffffffffffffffff" does not have a valid length. Please use between 2 and 40 characters.');

        Environment::checkEnvironmentNameFormat(str_pad('foo', Environment::MAX_LENGTH + 1, 'f'));
    }

    /**
     * @dataProvider getInvalidFormatDataProvider
     */
    public function test_checkIsValidEnvironment_invalidFormat($value)
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('is not a valid name');

        Environment::checkEnvironmentNameFormat($value);
    }

    public function getInvalidFormatDataProvider()
    {
        return array(['_foo', 'foo-', 'fo-of', 'foo_', 'f', 'foo-f', 'füf']);
    }

    public function test_checkIsValidEnvironment_notExistingEnvironment()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The environment "foobar" does not exist');

        $this->environment->checkIsValidEnvironment('foobar');
    }

    public function test_checkIsValidEnvironment_hasToMatchExactlyNotCaseInsensitive()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The environment "Live" does not exist');

        $this->environment->checkIsValidEnvironment('Live');
    }

    public function test_checkIsValidEnvironment_previewIsNotConsideredAnEnvironmentThatCanBeSelected()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The environment "preview" does not exist');

        $this->environment->checkIsValidEnvironment(Environment::ENVIRONMENT_PREVIEW);
    }

    public function test_checkIsValidEnvironment_valid()
    {
        self::expectNotToPerformAssertions();

        $this->environment->checkIsValidEnvironment(Environment::ENVIRONMENT_LIVE);
        $this->environment->checkIsValidEnvironment('dev'); // selected by default
    }

    public function test_getEnvironments()
    {
        $environments = $this->environment->getEnvironments();
        $expected = array(array ('id' => 'live','name' => 'Live',),
            array (
                'id' => 'dev',
                'name' => 'Dev',
            ), array (
                'id' => 'staging',
                'name' => 'Staging',
            ),
        );
        $this->assertSame($expected, $environments);
    }

}
