<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration\Validators;

use Piwik\Container\StaticContainer;
use Piwik\Plugins\TagManager\TagManager;
use Piwik\Plugins\TagManager\Template\Trigger\WindowLoadedTrigger;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;
use Piwik\Plugins\TagManager\Validators\TriggerIds;
use Piwik\Tests\Framework\Fixture;

/**
 * @group TagManager
 * @group TriggerIdsTest
 * @group TriggerIds
 * @group Plugins
 */
class TriggerIdsTest extends IntegrationTestCase
{
    /**
     * @var int
     */
    private $idSite;

    public function setUp(): void
    {
        parent::setUp();

        TagManager::$enableAutoContainerCreation = false;

        $this->idSite = Fixture::createWebsite('2014-03-04 05:06:07');

        $trigger = StaticContainer::get('Piwik\Plugins\TagManager\Model\Trigger');
        $idTrigger1 = $trigger->addContainerTrigger($this->idSite, 5, WindowLoadedTrigger::ID, 'MyTrigger1', array(), array());
        $idTrigger2 = $trigger->addContainerTrigger($this->idSite, 6, WindowLoadedTrigger::ID, 'MyTrigger2', array(), array());
        $idTrigger3 = $trigger->addContainerTrigger($this->idSite, 5, WindowLoadedTrigger::ID, 'MyTrigger3', array(), array());
    }

    public function tearDown(): void
    {
        TagManager::$enableAutoContainerCreation = true;

        parent::tearDown();
    }

    public function test_valid()
    {
        $this->validateTriggerIds($this->idSite, $containerVersion = 5, array(1,3));
        $this->validateTriggerIds($this->idSite, $containerVersion = 6, array(2));
        $this->validateTriggerIds($this->idSite, $containerVersion = 5, array(1));
    }

    public function test_valid_empty()
    {
        self::expectNotToPerformAssertions();

        $this->validateTriggerIds($this->idSite, $containerVersion = 5, array());
    }

    public function test_notValidTriggerId()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('The trigger "2" at position "0" does not exist.');

        $this->validateTriggerIds($this->idSite, $containerVersion = 5, array(2));
    }

    public function test_mixedValidAndNotValidTriggerId()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('The trigger "2" at position "1" does not exist.');

        $this->validateTriggerIds($this->idSite, $containerVersion = 5, array(1,2));
    }

    public function test_emptyTriggerId()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('"Triggers" has to be an array.');

        $this->validateTriggerIds($this->idSite, $containerVersion = 5, false);
    }

    private function validateTriggerIds($idSite, $idContainerVersion, $value)
    {
        $validator = new TriggerIds($idSite, $idContainerVersion);
        $validator->validate($value);
    }


}
