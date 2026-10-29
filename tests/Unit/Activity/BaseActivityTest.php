<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Unit\Activity;

use Piwik\Plugins\TagManager\Activity\ContainerAdded;
use Piwik\Plugins\TagManager\Activity\ContainerDeleted;
use Piwik\Plugins\TagManager\Activity\TagDeleted;
use Piwik\Plugins\TagManager\Activity\TagUpdated;
use Piwik\Plugins\TagManager\Activity\TriggerAdded;
use Piwik\Plugins\TagManager\Activity\VariableUpdated;
use Piwik\Plugins\TagManager\Activity\VersionDeleted;
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

    /**
     * @dataProvider getObjectData
     */
    public function testGetObject(string $class, array $parameters, ?array $expected)
    {
        $this->assertSame($expected, (new $class())->getObject($parameters));
    }

    /**
     * @dataProvider getObjectTypeLabelsData
     */
    public function testGetObjectTypeLabels(string $class, array $expected)
    {
        $this->assertSame($expected, (new $class())->getObjectTypeLabels());
    }

    public function getObjectTypeLabelsData(): array
    {
        return [
            'container' => [ContainerAdded::class, ['tm_container' => 'Containers']],
            'tag'       => [TagUpdated::class, ['tm_tag' => 'Tags']],
            'trigger'   => [TriggerAdded::class, ['tm_trigger' => 'Triggers']],
            'variable'  => [VariableUpdated::class, ['tm_variable' => 'Variables']],
            'version'   => [VersionPublished::class, ['tm_version' => 'Versions']],
        ];
    }

    public function getObjectData(): array
    {
        $site      = ['site_id' => 1, 'site_name' => 'Site 1'];
        $container = ['id' => 'aBcD1234', 'name' => 'Main'];
        $deleted   = ['id' => 'aBcD1234', 'name' => 'ID: aBcD1234'];

        return [
            'tag' => [
                TagUpdated::class,
                ['site' => $site, 'version' => 'v1', 'container' => $container, 'containertag' => ['id' => 5, 'name' => 'Pageview']],
                ['type' => 'tm_tag', 'id' => '5', 'name' => 'Pageview', 'context' => 'Main'],
            ],
            'trigger' => [
                TriggerAdded::class,
                ['site' => $site, 'version' => 'v1', 'container' => $container, 'containertrigger' => ['id' => 6, 'name' => 'All pages']],
                ['type' => 'tm_trigger', 'id' => '6', 'name' => 'All pages', 'context' => 'Main'],
            ],
            'variable' => [
                VariableUpdated::class,
                ['site' => $site, 'version' => 'v1', 'container' => $container, 'containervariable' => ['id' => 7, 'name' => 'Page URL']],
                ['type' => 'tm_variable', 'id' => '7', 'name' => 'Page URL', 'context' => 'Main'],
            ],
            'version' => [
                VersionPublished::class,
                ['site' => $site, 'version' => 'v1', 'container' => $container, 'containerversion' => ['id' => 8, 'name' => 'v1.0'], 'environment' => 'live'],
                ['type' => 'tm_version', 'id' => '8', 'name' => 'v1.0', 'context' => 'Main'],
            ],
            // container activities extend TagBaseActivity, so they carry an empty tag that isn't their item
            'container' => [
                ContainerAdded::class,
                ['site' => $site, 'version' => 'v1', 'container' => $container, 'containertag' => ['id' => 0, 'name' => 'ID: 0']],
                ['type' => 'tm_container', 'id' => 'aBcD1234', 'name' => 'Main', 'context' => 'Site 1'],
            ],
            'imported version' => [
                VersionImported::class,
                ['site' => $site, 'version' => 'v1', 'container' => $container, 'backupName' => ''],
                ['type' => 'tm_container', 'id' => 'aBcD1234', 'name' => 'Main', 'context' => 'Site 1'],
            ],
            'deleted container' => [
                ContainerDeleted::class,
                ['site' => $site, 'version' => 'v1', 'container' => $deleted],
                ['type' => 'tm_container', 'id' => 'aBcD1234', 'name' => null, 'context' => 'Site 1'],
            ],
            'tag in a deleted container' => [
                TagDeleted::class,
                ['site' => $site, 'version' => 'v1', 'container' => $deleted, 'containertag' => ['id' => 5, 'name' => 'ID: 5']],
                ['type' => 'tm_tag', 'id' => '5', 'name' => null, 'context' => null],
            ],
            'no subject' => [
                VersionDeleted::class,
                ['site' => $site, 'version' => 'v1', 'container' => $container],
                null,
            ],
        ];
    }
}
