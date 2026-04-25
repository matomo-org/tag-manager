<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Unit\API;

use Piwik\Plugins\TagManager\API\BaseReference;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\UnitTestCase;

/**
 * @group TagManager
 * @group BaseReferenceTest
 * @group BaseReference
 * @group Plugins
 */
class BaseReferenceTest extends UnitTestCase
{
    public function test_toArray()
    {
        $referenceId = '3';
        $referenceName = 'My Trigger';
        $referenceType = 'TriGger';
        $referenceTypeName = 'Trigger';
        $ref = new BaseReference($referenceId, $referenceName, $referenceType, $referenceTypeName);

        $expected = array(
            'referenceId' => $referenceId,
            'referenceType' => $referenceType,
            'referenceTypeName' => $referenceTypeName,
            'referenceName' => $referenceName
        );
        $this->assertSame($expected, $ref->toArray());
    }
}
