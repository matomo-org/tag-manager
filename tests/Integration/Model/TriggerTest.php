<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration\Model;

use Piwik\Container\StaticContainer;
use Piwik\Plugins\TagManager\Dao\TriggersDao;
use Piwik\Plugins\TagManager\Input\Name;
use Piwik\Plugins\TagManager\Model\Comparison;
use Piwik\Plugins\TagManager\Model\Tag;
use Piwik\Plugins\TagManager\Model\Trigger;
use Piwik\Plugins\TagManager\TagManager;
use Piwik\Plugins\TagManager\Template\Tag\CustomHtmlTag;
use Piwik\Plugins\TagManager\Template\Trigger\CustomEventTrigger;
use Piwik\Plugins\TagManager\Template\Trigger\WindowLoadedTrigger;
use Piwik\Plugins\TagManager\Template\Variable\PreConfigured\ErrorUrlVariable;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;
use Piwik\Tests\Framework\Fixture;

/**
 * @group TagManager
 * @group TriggerTest
 * @group Trigger
 * @group Plugins
 */
class TriggerTest extends IntegrationTestCase
{
    private $now = '2018-01-01 02:03:04';

    /**
     * @var int
     */
    private $idSite;
    private $idSite2;

    private $idTrigger1;

    private $containerVersion1 = 5;
    private $containerVersion2 = 6;

    /**
     * @var TriggersDao;
     */
    private $dao;

    /**
     * @var Trigger
     */
    private $model;

    public function setUp(): void
    {
        parent::setUp();

        TagManager::$enableAutoContainerCreation = false;
        $this->idSite = Fixture::createWebsite('2014-03-04 05:06:07');
        $this->idSite2 = Fixture::createWebsite('2014-03-04 05:06:07');

        $this->dao = StaticContainer::get('Piwik\Plugins\TagManager\Dao\TriggersDao');
        $this->model = StaticContainer::get('Piwik\Plugins\TagManager\Model\Trigger');
        $this->model->setCurrentDateTime($this->now);

        $this->idTrigger1 = $this->addContainerTrigger($this->idSite, $this->containerVersion1, null, 'InitialTrigger1', array('eventName' => 'myEvent'));
    }

    public function tearDown(): void
    {
        TagManager::$enableAutoContainerCreation = true;
        parent::tearDown();
    }

    public function test_addContainerTrigger_invalidSite()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('idSite: An unexpected website was found');

        $this->addContainerTrigger($idSite = 999);
    }

    public function test_addContainerTrigger_invalidName()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Name: The value contains');

        $this->addContainerTrigger($this->idSite, $this->containerVersion1, $type = null, str_pad('4', Name::MAX_LENGTH + 1));
    }

    public function test_addContainerTrigger_missingParameter()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Event Name: A value needs to be provided.');

        $this->addContainerTrigger($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = array('eventName' => ''), array());
    }

    public function test_addContainerTrigger_invalidParameter()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Event Name: A value needs to be provided.');

        $this->addContainerTrigger($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = array('eventName' => ''), array());
    }

    public function test_addContainerTrigger_invalidCondition()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Conditions: Missing value for array key "comparison"');

        $conditions = array(array('actual' => 'five'));
        $this->addContainerTrigger($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = array('eventName' => '<div></div>'), $conditions);
    }

    public function test_addContainerTrigger_invalidCondition2()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Conditions: The variable "invalid" in the condition');

        $conditions = array(
            array('actual' => 'invalid', 'comparison' => Comparison::ID_EQUALS, 'expected' => 'errorfoo'),
        );
        $this->addContainerTrigger($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = array('eventName' => '<div></div>'), $conditions);
    }

    public function test_addContainerTrigger_invalidType()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The trigger "MyBarBaz" is not supported');

        $conditions = array();
        $this->addContainerTrigger($this->idSite, $this->containerVersion1, $type = 'MyBarBaz', 'MyName', $parameters = array('eventName' => '<div></div>'), $conditions);
    }

    public function test_addContainerTrigger_successMinimal()
    {
        $idTrigger = $this->addContainerTrigger($this->idSite, $this->containerVersion1, CustomEventTrigger::ID, 'MyName', $parameters = array('eventName' => 'fooBar'), array());
        $this->assertSame(2, $idTrigger);

        $trigger = $this->model->getContainerTrigger($this->idSite, $this->containerVersion1, $idTrigger);

        $expected = array (
            'idtrigger' => 2,
            'idcontainerversion' => 5,
            'idsite' => 1,
            'type' => CustomEventTrigger::ID,
            'name' => 'MyName',
            'status' => 'active',
            'parameters' =>
                array (
                    'eventName' => 'fooBar',
                ),
            'conditions' => array (),
            'created_date' => '2018-01-01 02:03:04',
            'updated_date' => '2018-01-01 02:03:04',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Jan 1, 2018 02:03:04',
            'typeMetadata' => Array(
                'id' => 'CustomEvent',
                'name' => 'Custom Event',
                'description' => 'Triggered when a custom event is pushed to the Data-Layer.',
                'category' => 'Others',
                'icon' => 'plugins/TagManager/images/defaultIcon.svg',
                'help' => 'Allows developers to define manually when this trigger should be triggered by pushing an event to the Data-Layer. This way you can for example execute certain actions when a product is added to the cart, or when a user logs in.',
                'order' => 9999,
                'contexts' => ['web'],
                'hasAdvancedSettings' => true,
                'isCustomTemplate' => false,
                'parameters' => array (
                   array(
                        'name' => 'eventName',
                        'title' => 'Event Name',
                        'value' => 'fooBar',
                        'defaultValue' => '',
                        'type' => 'string',
                        'uiControl' => 'text',
                        'uiControlAttributes' => array(),
                        'availableValues' => null,
                        'description' => 'The name of the event that is pushed to the Data-Layer. For example you can push an event by adding this to your website: _mtm.push({"event": "my-custom-event"});',
                        'inlineHelp' => null,
                        'templateFile' => '',
                        'introduction' => null,
                        'condition' => null,
                        'component' => [
                            'plugin' => 'TagManager',
                            'name' => 'FieldVariableTemplate',
                        ],
                    )
                )
            )
        );
        $this->assertSame($expected, $trigger);
    }

    public function test_addContainerTrigger_successFull()
    {
        $conditions = array(
            array('actual' => ErrorUrlVariable::ID, 'comparison' => Comparison::ID_EQUALS, 'expected' => 'errorfoo'),
            array('actual' => ErrorUrlVariable::ID, 'comparison' => Comparison::ID_CONTAINS, 'expected' => 'barbaz'),
        );
        $idTrigger = $this->addContainerTrigger($this->idSite, $this->containerVersion1, CustomEventTrigger::ID, 'MyName', $parameters = array('eventName' => 'fooBar'), $conditions);
        $this->assertSame(2, $idTrigger);

        $trigger = $this->model->getContainerTrigger($this->idSite, $this->containerVersion1, $idTrigger);

        $expected = array (
            'idtrigger' => $idTrigger,
            'idcontainerversion' => 5,
            'idsite' => 1,
            'type' => CustomEventTrigger::ID,
            'name' => 'MyName',
            'status' => 'active',
            'parameters' =>
                array (
                    'eventName' => 'fooBar',
                ),
            'conditions' => $conditions,
            'created_date' => '2018-01-01 02:03:04',
            'updated_date' => '2018-01-01 02:03:04',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Jan 1, 2018 02:03:04',
            'typeMetadata' => Array(
                'id' => 'CustomEvent',
                'name' => 'Custom Event',
                'description' => 'Triggered when a custom event is pushed to the Data-Layer.',
                'category' => 'Others',
                'icon' => 'plugins/TagManager/images/defaultIcon.svg',
                'help' => 'Allows developers to define manually when this trigger should be triggered by pushing an event to the Data-Layer. This way you can for example execute certain actions when a product is added to the cart, or when a user logs in.',
                'order' => 9999,
                'contexts' => ['web'],
                'hasAdvancedSettings' => true,
                'isCustomTemplate' => false,
                'parameters' => array (
                    array(
                        'name' => 'eventName',
                        'title' => 'Event Name',
                        'value' => 'fooBar',
                        'defaultValue' => '',
                        'type' => 'string',
                        'uiControl' => 'text',
                        'uiControlAttributes' => array(),
                        'availableValues' => null,
                        'description' => 'The name of the event that is pushed to the Data-Layer. For example you can push an event by adding this to your website: _mtm.push({"event": "my-custom-event"});',
                        'inlineHelp' => null,
                        'templateFile' => '',
                        'introduction' => null,
                        'condition' => null,
                        'component' => [
                            'plugin' => 'TagManager',
                            'name' => 'FieldVariableTemplate',
                        ],
                    )
                )
            )
        );
        $this->assertSame($expected, $trigger);
    }

    public function test_updateContainerTrigger_invalidSite()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('idSite: An unexpected website was found');

        $this->updateContainerTrigger($idSite = 999, $this->containerVersion1, $this->idTrigger1);
    }

    public function test_updateContainerTrigger_invalidName()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Name: The value contains');

        $this->updateContainerTrigger($this->idSite, $this->containerVersion1, $this->idTrigger1, str_pad('4', Name::MAX_LENGTH + 1));
    }

    public function test_updateContainerTrigger_missingParameter()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Event Name: A value needs to be provided.');

        $this->updateContainerTrigger($this->idSite, $this->containerVersion1, $this->idTrigger1, 'MyName', $parameters = array(), array());
    }

    public function test_updateContainerTrigger_invalidParameter()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Event Name: A value needs to be provided.');

        $this->updateContainerTrigger($this->idSite, $this->containerVersion1, $this->idTrigger1, 'MyName', $parameters = array('eventName' => ''), array());
    }

    public function test_updateContainerTrigger_invalidCondition()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Conditions: Missing value for array key "comparison"');

        $conditions = array(array('actual' => 'five'));
        $this->updateContainerTrigger($this->idSite, $this->containerVersion1, $this->idTrigger1, 'MyName', $parameters = array('eventName' => '<div></div>'), $conditions);
    }

    public function test_updateContainerTrigger_invalidCondition2()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Conditions: The variable "invalid" in the condition');

        $conditions = array(
            array('actual' => 'invalid', 'comparison' => Comparison::ID_EQUALS, 'expected' => 'errorfoo'),
        );
        $this->addContainerTrigger($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = array('eventName' => '<div></div>'), $conditions);
    }

    public function test_updateContainerTrigger_success()
    {
        $conditions = array(
            array('actual' => ErrorUrlVariable::ID, 'comparison' => Comparison::ID_EQUALS, 'expected' => 'errouprfoo'),
            array('actual' => ErrorUrlVariable::ID, 'comparison' => Comparison::ID_CONTAINS, 'expected' => 'bauprbaz'),
        );

        $this->model->setCurrentDateTime('2018-02-01 05:06:07');
        $this->updateContainerTrigger($this->idSite, $this->containerVersion1, $this->idTrigger1, 'MyUpdatedName', $parameters = array('eventName' => 'updatedEvent'), $conditions);

        $trigger = $this->model->getContainerTrigger($this->idSite, $this->containerVersion1, $this->idTrigger1);

        $expected = array (
            'idtrigger' => $this->idTrigger1,
            'idcontainerversion' => 5,
            'idsite' => 1,
            'type' => 'CustomEvent',
            'name' => 'MyUpdatedName',
            'status' => 'active',
            'parameters' =>
                array (
                    'eventName' => 'updatedEvent'
                ),
            'conditions' => $conditions,
            'created_date' => '2018-01-01 02:03:04',
            'updated_date' => '2018-02-01 05:06:07',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Feb 1, 2018 05:06:07',
            'typeMetadata' => Array(
                'id' => 'CustomEvent',
                'name' => 'Custom Event',
                'description' => 'Triggered when a custom event is pushed to the Data-Layer.',
                'category' => 'Others',
                'icon' => 'plugins/TagManager/images/defaultIcon.svg',
                'help' => 'Allows developers to define manually when this trigger should be triggered by pushing an event to the Data-Layer. This way you can for example execute certain actions when a product is added to the cart, or when a user logs in.',
                'order' => 9999,
                'contexts' => ['web'],
                'hasAdvancedSettings' => true,
                'isCustomTemplate' => false,
                'parameters' => array (
                    array(
                        'name' => 'eventName',
                        'title' => 'Event Name',
                        'value' => 'updatedEvent',
                        'defaultValue' => '',
                        'type' => 'string',
                        'uiControl' => 'text',
                        'uiControlAttributes' => array(),
                        'availableValues' => null,
                        'description' => 'The name of the event that is pushed to the Data-Layer. For example you can push an event by adding this to your website: _mtm.push({"event": "my-custom-event"});',
                        'inlineHelp' => null,
                        'templateFile' => '',
                        'introduction' => null,
                        'condition' => null,
                        'component' => [
                            'plugin' => 'TagManager',
                            'name' => 'FieldVariableTemplate',
                        ],
                    )
                )
            )
        );
        $this->assertSame($expected, $trigger);
    }

    public function test_getContainer()
    {
        // no need to create new test for this
        $this->test_addContainerTrigger_successFull();
        $this->test_updateContainerTrigger_success();
    }

    public function test_getContainer_doesNotExist()
    {
        $this->assertFalse($this->model->getContainerTrigger(999, $this->containerVersion1, $this->idTrigger1));
        $this->assertFalse($this->model->getContainerTrigger($this->idSite, 9999, $this->idTrigger1));
        $this->assertFalse($this->model->getContainerTrigger($this->idSite, $this->containerVersion1, 9999));
        // make sure when all params correct we do find the trigger
        $this->assertNotEmpty($this->model->getContainerTrigger($this->idSite, $this->containerVersion1, $this->idTrigger1));
    }

    public function test_getContainer_doesNotReturnDeletedTrigger()
    {
        $this->assertNotEmpty($this->model->getContainerTrigger($this->idSite, $this->containerVersion1, $this->idTrigger1));
        $this->model->deleteContainerTrigger($this->idSite, $this->containerVersion1, $this->idTrigger1);
        $this->assertFalse($this->model->getContainerTrigger($this->idSite, $this->containerVersion1, $this->idTrigger1));
    }

    public function test_getContainer_whenRelatedTypeNoLongerExists_ignoredTypeMetadata()
    {
        $this->dao->updateTriggerColumns($this->idSite, $this->containerVersion1, $this->idTrigger1, array('type' => 'Foo'));
        $trigger = $this->model->getContainerTrigger($this->idSite, $this->containerVersion1, $this->idTrigger1);

        $this->assertSame(array (
            'idtrigger' => 1,
            'idcontainerversion' => 5,
            'idsite' => 1,
            'type' => 'Foo',
            'name' => 'InitialTrigger1',
            'status' => 'active',
            'parameters' => array ('eventName' => 'myEvent'),
            'conditions' => array (),
            'created_date' => '2018-01-01 02:03:04',
            'updated_date' => '2018-01-01 02:03:04',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Jan 1, 2018 02:03:04',
            'typeMetadata' => NULL,
        ), $trigger);
    }

    public function test_getContainerTriggers_noTriggerMatches()
    {
        $this->assertSame(array(), $this->model->getContainerTriggers(999, $this->containerVersion1));
        $this->assertSame(array(), $this->model->getContainerTriggers($this->idSite, 999));

        // make sure with correct params we do get a result
        $this->assertNotEmpty($this->model->getContainerTriggers($this->idSite, $this->containerVersion1));
    }

    public function test_getContainerTriggers_doesNotReturnDeleted()
    {
        $this->assertCount(1, $this->model->getContainerTriggers($this->idSite, $this->containerVersion1));
        $this->model->deleteContainerTrigger($this->idSite, $this->containerVersion1, $this->idTrigger1);
        $this->assertSame(array(), $this->model->getContainerTriggers($this->idSite, $this->containerVersion1));
    }

    public function test_getContainerTriggers_onlyReturnsContainersForThatSiteAndVersion()
    {
        $this->addContainerTrigger($this->idSite, $this->containerVersion1, WindowLoadedTrigger::ID, 'v1');
        $this->addContainerTrigger($this->idSite, $this->containerVersion1, WindowLoadedTrigger::ID, 'v2');
        $this->addContainerTrigger($this->idSite2, $this->containerVersion1, WindowLoadedTrigger::ID, 'v2');
        $this->addContainerTrigger($this->idSite2, $this->containerVersion1, WindowLoadedTrigger::ID, 'v3');
        $this->addContainerTrigger($this->idSite, $this->containerVersion2, WindowLoadedTrigger::ID, 'v4');

        $this->assertCount(3, $this->model->getContainerTriggers($this->idSite, $this->containerVersion1));
        $this->assertCount(2, $this->model->getContainerTriggers($this->idSite2, $this->containerVersion1));
        $this->assertCount(1, $this->model->getContainerTriggers($this->idSite, $this->containerVersion2));
        $this->assertCount(0, $this->model->getContainerTriggers($this->idSite2, $this->containerVersion2));
        $this->assertSame(array(), $this->model->getContainerTriggers($this->idSite2, $this->containerVersion2));
    }

    public function test_getContainerTriggers_formatsValues()
    {
        $this->addContainerTrigger($this->idSite, $this->containerVersion1, WindowLoadedTrigger::ID, 'v1');
        $triggers = $this->model->getContainerTriggers($this->idSite, $this->containerVersion1);

        $this->assertCount(2, $triggers);
        foreach ($triggers as $trigger) {
            $this->assertNotEmpty($trigger['typeMetadata']);
        }
    }

    public function test_deleteContainerTrigger()
    {
        $this->addContainerTrigger($this->idSite, $this->containerVersion1, WindowLoadedTrigger::ID, 'v1');
        $idTrigger3 = $this->addContainerTrigger($this->idSite, $this->containerVersion1, WindowLoadedTrigger::ID, 'v2');
        $this->addContainerTrigger($this->idSite2, $this->containerVersion1, WindowLoadedTrigger::ID, 'v2');
        $this->addContainerTrigger($this->idSite2, $this->containerVersion1, WindowLoadedTrigger::ID, 'v3');
        $this->addContainerTrigger($this->idSite, $this->containerVersion2, WindowLoadedTrigger::ID, 'v4');

        $this->model->setCurrentDateTime('2019-03-04 03:03:03');

        $this->assertCount(3, $this->model->getContainerTriggers($this->idSite, $this->containerVersion1));
        $this->assertCount(2, $this->model->getContainerTriggers($this->idSite2, $this->containerVersion1));
        $this->assertCount(1, $this->model->getContainerTriggers($this->idSite, $this->containerVersion2));
        $this->assertCount(0, $this->model->getContainerTriggers($this->idSite2, $this->containerVersion2));

        // deletes nothing when no match
        $this->model->deleteContainerTrigger($this->idSite, $this->containerVersion1, 9999);
        $this->model->deleteContainerTrigger($this->idSite, 9999, $idTrigger3);
        $this->model->deleteContainerTrigger(9999, $this->containerVersion1, $idTrigger3);

        $this->assertCount(3, $this->model->getContainerTriggers($this->idSite, $this->containerVersion1));
        $this->assertCount(2, $this->model->getContainerTriggers($this->idSite2, $this->containerVersion1));
        $this->assertCount(1, $this->model->getContainerTriggers($this->idSite, $this->containerVersion2));
        $this->assertCount(0, $this->model->getContainerTriggers($this->idSite2, $this->containerVersion2));

        $this->model->setCurrentDateTime('2019-03-04 03:03:03');
        $this->model->deleteContainerTrigger($this->idSite, $this->containerVersion1, $idTrigger3);

        // removes correct one
        $this->assertCount(2, $this->model->getContainerTriggers($this->idSite, $this->containerVersion1));
        $this->assertCount(2, $this->model->getContainerTriggers($this->idSite2, $this->containerVersion1));
        $this->assertCount(1, $this->model->getContainerTriggers($this->idSite, $this->containerVersion2));

        // sets updated date etc
        $triggers = $this->dao->getAllTriggers();
        $count = 0;
        foreach ($triggers as $trigger) {
            if ($trigger['idtrigger'] === $idTrigger3) {
                $count++;
                $this->assertSame(TriggersDao::STATUS_DELETED, $trigger['status']);
                $this->assertSame('2019-03-04 03:03:03', $trigger['deleted_date']);
            } else {
                $this->assertNotSame(TriggersDao::STATUS_DELETED, $trigger['status']);
                $this->assertEmpty($trigger['deleted_date']);
            }
        }
        // make sure above assertion was executed
        $this->assertSame(1, $count);
    }

    public function test_getTriggerReferences_whenNoReferences()
    {
        $this->assertSame(array(), $this->model->getTriggerReferences($this->idSite, $this->containerVersion1, $this->idTrigger1));
    }

    public function test_getTriggerReferences_withReferences()
    {
        $idTrigger2 = $this->addContainerTrigger($this->idSite, $this->containerVersion1, $type = null, 'MyName2', $parameters = array('eventName' => '<div></div>'));
        $idTrigger3 = $this->addContainerTrigger($this->idSite, $this->containerVersion1, $type = null, 'MyName3', $parameters = array('eventName' => '<div></div>'));
        $idTrigger4 = $this->addContainerTrigger($this->idSite, $this->containerVersion1, $type = null, 'MyName4', $parameters = array('eventName' => '<div></div>'));

        $idTrigger5 = $this->addContainerTrigger($this->idSite, $this->containerVersion2, $type = null, 'MyName5', $parameters = array('eventName' => '<div></div>'));
        $idTrigger6 = $this->addContainerTrigger($this->idSite2, $this->containerVersion1, $type = null, 'MyName6', $parameters = array('eventName' => '<div></div>'));

        $this->addContainerTag($this->idSite, $this->containerVersion1, 'TagName1', $fire = array($idTrigger3), $block = array($this->idTrigger1));
        $this->addContainerTag($this->idSite, $this->containerVersion1, 'TagName2', $fire = array($this->idTrigger1), $block = array($idTrigger2));
        $this->addContainerTag($this->idSite, $this->containerVersion1, 'TagName3', $fire = array($this->idTrigger1), $block = array());
        $this->addContainerTag($this->idSite, $this->containerVersion2, 'TagName4', $fire = array($idTrigger5), $block = array());

        // is finding triggers in fire and block trigger
        $expected = array (
                array (
                    'referenceId' => 1,
                    'referenceType' => 'tag',
                    'referenceTypeName' => 'Tag',
                    'referenceName' => 'TagName1',
                ),
                array (
                    'referenceId' => 2,
                    'referenceType' => 'tag',
                    'referenceTypeName' => 'Tag',
                    'referenceName' => 'TagName2',
                ),
                array (
                    'referenceId' => 3,
                    'referenceType' => 'tag',
                    'referenceTypeName' => 'Tag',
                    'referenceName' => 'TagName3',
                ),
        );

        $this->assertSame($expected, $this->model->getTriggerReferences($this->idSite, $this->containerVersion1, $this->idTrigger1));

        // is finding them in block trigger
        $expected = array (
                array (
                    'referenceId' => 2,
                    'referenceType' => 'tag',
                    'referenceTypeName' => 'Tag',
                    'referenceName' => 'TagName2',
                ),
        );
        $this->assertSame($expected, $this->model->getTriggerReferences($this->idSite, $this->containerVersion1, $idTrigger2));

        // when nothing matches
        $expected = array();
        $this->assertSame($expected, $this->model->getTriggerReferences($this->idSite, $this->containerVersion1, $idTrigger4));
    }

    private function updateContainerTrigger($idSite, $idContainerVersion, $idTrigger, $name = 'MyName', $parameters = array(), $conditions = array())
    {
        return $this->model->updateContainerTrigger($idSite, $idContainerVersion, $idTrigger, $name, $parameters, $conditions);
    }

    private function addContainerTrigger($idSite, $idContainerVersion = 5, $type = null, $name = 'MyName', $parameters = array(), $conditions = array())
    {
        if (!isset($type)) {
            $type = CustomEventTrigger::ID;
        }

        return $this->model->addContainerTrigger($idSite, $idContainerVersion, $type, $name, $parameters, $conditions);
    }

    private function addContainerTag($idSite, $idContainerVersion = 5, $name = 'TagName', $fireTriggerIds = array(), $blockTriggerIds = array())
    {
        $type = CustomHtmlTag::ID;
        $parameters = array('customHtml' => '<p></p>');
        $tag = StaticContainer::get('Piwik\Plugins\TagManager\Model\Tag');
        return $tag->addContainerTag($idSite, $idContainerVersion, $type, $name, $parameters, $fireTriggerIds, $blockTriggerIds, $fireLimit = Tag::FIRE_LIMIT_UNLIMITED, $fireDelay = 0, $priority = 999, $startDate = null, $endDate = null);
    }
}
