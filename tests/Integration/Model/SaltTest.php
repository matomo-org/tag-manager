<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration\Model;

use Piwik\Plugins\TagManager\Model\Salt;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;

/**
 * @group TagManager
 * @group SaltTest
 * @group Salt
 * @group Plugins
 */
class SaltTest extends IntegrationTestCase
{
    /**
     * @var Salt
     */
    private $salt;

    public function setUp(): void
    {
        parent::setUp();
        $this->salt = new Salt();
    }

    public function test_generateSaltIfNeeded_shouldOnlyGenerateKeyOnce()
    {
        $salt1 = $this->salt->generateSaltIfNeeded();
        $this->assertSame(Salt::SALT_LENGTH, strlen($salt1));

        $salt2 = $this->salt->generateSaltIfNeeded();
        $this->assertSame($salt2, $salt1);
    }

    public function test_generateSaltIfNeeded_WhenNotExistsGeneratesNewSalt()
    {
        $salt1 = $this->salt->generateSaltIfNeeded();
        $this->assertSame(Salt::SALT_LENGTH, strlen($salt1));

        $this->salt->removeSalt();

        $salt2 = $this->salt->generateSaltIfNeeded();
        $this->assertSame(Salt::SALT_LENGTH, strlen($salt2));
        $this->assertNotSame($salt2, $salt1);
    }

    public function test_getSalt_alwaysReturnsSaltEvenIfWasRemoved()
    {
        $salt1 = $this->salt->getSalt();
        $this->assertSame(Salt::SALT_LENGTH, strlen($salt1));

        $this->salt->removeSalt();

        $salt2 = $this->salt->getSalt();
        $this->assertSame(Salt::SALT_LENGTH, strlen($salt2));
        $this->assertNotSame($salt2, $salt1);

        $salt3 = $this->salt->getSalt();
        $this->assertSame($salt3, $salt2);
    }

}
