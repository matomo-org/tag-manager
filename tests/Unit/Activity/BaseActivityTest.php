<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Unit\Activity;

use Piwik\Plugins\TagManager\Activity\ContainerAdded;
use Piwik\Plugins\TagManager\Activity\VersionImported;
use Piwik\Plugins\TagManager\Activity\VersionPublished;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\UnitTestCase;

/**
 * @group TagManager
 * @group BaseActivityTest
 * @group Activity
 * @group Plugins
 */
class BaseActivityTest extends UnitTestCase
{
    public function setUp(): void
    {
        if (!class_exists('\\Piwik\\Plugins\\ActivityLog\\Activity\\Activity')) {
            $this->markTestSkipped('The ActivityLog plugin is not installed.');
        }

        parent::setUp();
    }

    /**
     * ActivityLog ignores an event only on a literal false, so anything else here is logged as a blank entry.
     */
    public function testExtractParamsReturnsFalseWhenTheSiteIdIsNotNumeric()
    {
        $activity = new ContainerAdded();

        $eventData = [1, ['parameters' => ['idSite' => 'unknown']]];

        $this->assertFalse($activity->extractParams($eventData));
    }

    public function testExtractParamsReturnsFalseWhenAnImportedVersionHasNoUsableSiteId()
    {
        $activity = new VersionImported();

        $eventData = [null, ['parameters' => ['idSite' => 'unknown', 'idContainer' => 1, 'backupName' => 'a backup']]];

        $this->assertFalse($activity->extractParams($eventData));
    }

    public function testExtractParamsReturnsFalseWhenAPublishedVersionHasNoUsableSiteId()
    {
        $activity = new VersionPublished();

        $eventData = [null, ['parameters' => [
            'idSite' => 'unknown',
            'idContainer' => 1,
            'idContainerVersion' => 2,
            'environment' => 'live',
        ]]];

        $this->assertFalse($activity->extractParams($eventData));
    }
}
