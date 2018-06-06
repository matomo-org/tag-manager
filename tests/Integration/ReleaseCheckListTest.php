<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration;

use Piwik\Filesystem;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * @group TagManager
 * @group ReleaseCheckListTest
 * @group Plugins
 */
class ReleaseCheckListTest extends IntegrationTestCase
{
    public function test_piwikJs_minified_isUpToDate()
    {
        $base = PIWIK_DOCUMENT_ROOT . "/plugins/TagManager/javascripts/";
        $pathTagManagerJs = $base . "tagmanager.js";
        $pathTagManagerJsMin = $base . "tagmanager.min.js";
        $testMinifiedJs = PIWIK_DOCUMENT_ROOT ."/tagmanager-minified.js";

        Filesystem::deleteFileIfExists($testMinifiedJs);

        shell_exec("cat ". $pathTagManagerJs ." | java -jar ". PIWIK_DOCUMENT_ROOT ."/tests/resources/yuicompressor/yuicompressor-2.4.8.jar --type js --line-break 1000 | sed 's/replacedEvilString/eval/' | sed 's/^[/][*]/\/*!/' > " . $testMinifiedJs);

        $this->assertFileEquals($testMinifiedJs,
            $pathTagManagerJsMin,
            'minified tagmanager.min.js is out of date, please re-generate the minified files using instructions in tagmanager.js'
        );

        Filesystem::deleteFileIfExists($testMinifiedJs);
    }


}
