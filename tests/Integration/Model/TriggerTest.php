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

        $this->idTrigger1 = $this->addContainerTrigger($this->idSite, $this->containerVersion1, null, 'InitialTrigger1', ['eventName' => 'myEvent']);
    }

    public function tearDown(): void
    {
        TagManager::$enableAutoContainerCreation = true;
        parent::tearDown();
    }

    public function testAddContainerTriggerInvalidSite()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('idSite: An unexpected website was found');

        $this->addContainerTrigger($idSite = 999);
    }

    public function testAddContainerTriggerInvalidName()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Name: The value contains');

        $this->addContainerTrigger($this->idSite, $this->containerVersion1, $type = null, str_pad('4', Name::MAX_LENGTH + 1));
    }

    public function testAddContainerTriggerMissingParameter()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Event Name: A value needs to be provided.');

        $this->addContainerTrigger($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = ['eventName' => ''], []);
    }

    public function testAddContainerTriggerInvalidParameter()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Event Name: A value needs to be provided.');

        $this->addContainerTrigger($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = ['eventName' => ''], []);
    }

    public function testAddContainerTriggerInvalidCondition()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Conditions: Missing value for array key "comparison"');

        $conditions = [['actual' => 'five']];
        $this->addContainerTrigger($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = ['eventName' => '<div></div>'], $conditions);
    }

    public function testAddContainerTriggerInvalidCondition2()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Conditions: The variable "invalid" in the condition');

        $conditions = [
            ['actual' => 'invalid', 'comparison' => Comparison::ID_EQUALS, 'expected' => 'errorfoo'],
        ];
        $this->addContainerTrigger($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = ['eventName' => '<div></div>'], $conditions);
    }

    public function testAddContainerTriggerInvalidType()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The trigger "MyBarBaz" is not supported');

        $conditions = [];
        $this->addContainerTrigger($this->idSite, $this->containerVersion1, $type = 'MyBarBaz', 'MyName', $parameters = ['eventName' => '<div></div>'], $conditions);
    }

    public function testAddContainerTriggerSuccessMinimal()
    {
        $idTrigger = $this->addContainerTrigger($this->idSite, $this->containerVersion1, CustomEventTrigger::ID, 'MyName', $parameters = ['eventName' => 'fooBar'], []);
        $this->assertSame(2, $idTrigger);

        $trigger = $this->model->getContainerTrigger($this->idSite, $this->containerVersion1, $idTrigger);

        $expected =  [
            'idtrigger' => 2,
            'idcontainerversion' => 5,
            'idsite' => 1,
            'type' => CustomEventTrigger::ID,
            'name' => 'MyName',
            'description' => '',
            'status' => 'active',
            'parameters' =>
                 [
                    'eventName' => 'fooBar',
                ],
            'conditions' =>  [],
            'created_date' => '2018-01-01 02:03:04',
            'updated_date' => '2018-01-01 02:03:04',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Jan 1, 2018 02:03:04',
            'typeMetadata' => [
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
                'parameters' =>  [
                   [
                        'name' => 'eventName',
                        'title' => 'Event Name',
                        'value' => 'fooBar',
                        'defaultValue' => '',
                        'type' => 'string',
                        'uiControl' => 'text',
                        'uiControlAttributes' => [],
                        'availableValues' => null,
                        'description' => 'The name of the event that is pushed to the Data-Layer. For example you can push an event by adding this to your website: _mtm.push({"event": "my-custom-event"});',
                        'inlineHelp' => null,
                        'introduction' => null,
                        'condition' => null,
                        'fullWidth' => false,
                        'component' => [
                            'plugin' => 'TagManager',
                            'name' => 'FieldVariableTemplate',
                        ],
                    ]
                ]
            ]
        ];
        $this->assertSame($expected, $trigger);
    }

    public function testAddContainerTriggerSuccessFull()
    {
        $conditions = [
            ['actual' => ErrorUrlVariable::ID, 'comparison' => Comparison::ID_EQUALS, 'expected' => 'errorfoo'],
            ['actual' => ErrorUrlVariable::ID, 'comparison' => Comparison::ID_CONTAINS, 'expected' => 'barbaz'],
        ];
        $description = 'Test description for MyName tag';
        $idTrigger = $this->addContainerTrigger($this->idSite, $this->containerVersion1, CustomEventTrigger::ID, 'MyName', $parameters = ['eventName' => 'fooBar'], $conditions, $description);
        $this->assertSame(2, $idTrigger);

        $trigger = $this->model->getContainerTrigger($this->idSite, $this->containerVersion1, $idTrigger);

        $expected =  [
            'idtrigger' => $idTrigger,
            'idcontainerversion' => 5,
            'idsite' => 1,
            'type' => CustomEventTrigger::ID,
            'name' => 'MyName',
            'description' => 'Test description for MyName tag',
            'status' => 'active',
            'parameters' =>
                 [
                    'eventName' => 'fooBar',
                ],
            'conditions' => $conditions,
            'created_date' => '2018-01-01 02:03:04',
            'updated_date' => '2018-01-01 02:03:04',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Jan 1, 2018 02:03:04',
            'typeMetadata' => [
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
                'parameters' =>  [
                    [
                        'name' => 'eventName',
                        'title' => 'Event Name',
                        'value' => 'fooBar',
                        'defaultValue' => '',
                        'type' => 'string',
                        'uiControl' => 'text',
                        'uiControlAttributes' => [],
                        'availableValues' => null,
                        'description' => 'The name of the event that is pushed to the Data-Layer. For example you can push an event by adding this to your website: _mtm.push({"event": "my-custom-event"});',
                        'inlineHelp' => null,
                        'introduction' => null,
                        'condition' => null,
                        'fullWidth' => false,
                        'component' => [
                            'plugin' => 'TagManager',
                            'name' => 'FieldVariableTemplate',
                        ],
                    ]
                ]
            ]
        ];
        $this->assertSame($expected, $trigger);
    }

    public function testUpdateContainerTriggerInvalidSite()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('idSite: An unexpected website was found');

        $this->updateContainerTrigger($idSite = 999, $this->containerVersion1, $this->idTrigger1);
    }

    public function testUpdateContainerTriggerInvalidName()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Name: The value contains');

        $this->updateContainerTrigger($this->idSite, $this->containerVersion1, $this->idTrigger1, str_pad('4', Name::MAX_LENGTH + 1));
    }

    public function testUpdateContainerTriggerMissingParameter()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Event Name: A value needs to be provided.');

        $this->updateContainerTrigger($this->idSite, $this->containerVersion1, $this->idTrigger1, 'MyName', $parameters = [], []);
    }

    public function testUpdateContainerTriggerInvalidParameter()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Event Name: A value needs to be provided.');

        $this->updateContainerTrigger($this->idSite, $this->containerVersion1, $this->idTrigger1, 'MyName', $parameters = ['eventName' => ''], []);
    }

    public function testUpdateContainerTriggerInvalidCondition()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Conditions: Missing value for array key "comparison"');

        $conditions = [['actual' => 'five']];
        $this->updateContainerTrigger($this->idSite, $this->containerVersion1, $this->idTrigger1, 'MyName', $parameters = ['eventName' => '<div></div>'], $conditions);
    }

    public function testUpdateContainerTriggerInvalidCondition2()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Conditions: The variable "invalid" in the condition');

        $conditions = [
            ['actual' => 'invalid', 'comparison' => Comparison::ID_EQUALS, 'expected' => 'errorfoo'],
        ];
        $this->addContainerTrigger($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = ['eventName' => '<div></div>'], $conditions);
    }

    public function testUpdateContainerTriggerSuccess()
    {
        $conditions = [
            ['actual' => ErrorUrlVariable::ID, 'comparison' => Comparison::ID_EQUALS, 'expected' => 'errouprfoo'],
            ['actual' => ErrorUrlVariable::ID, 'comparison' => Comparison::ID_CONTAINS, 'expected' => 'bauprbaz'],
        ];
        $description = 'Test updated description for MyName tag';

        $this->model->setCurrentDateTime('2018-02-01 05:06:07');
        $this->updateContainerTrigger($this->idSite, $this->containerVersion1, $this->idTrigger1, 'MyUpdatedName', $parameters = ['eventName' => 'updatedEvent'], $conditions, $description);

        $trigger = $this->model->getContainerTrigger($this->idSite, $this->containerVersion1, $this->idTrigger1);

        $expected =  [
            'idtrigger' => $this->idTrigger1,
            'idcontainerversion' => 5,
            'idsite' => 1,
            'type' => 'CustomEvent',
            'name' => 'MyUpdatedName',
            'description' => $description,
            'status' => 'active',
            'parameters' =>
                 [
                    'eventName' => 'updatedEvent'
                ],
            'conditions' => $conditions,
            'created_date' => '2018-01-01 02:03:04',
            'updated_date' => '2018-02-01 05:06:07',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Feb 1, 2018 05:06:07',
            'typeMetadata' => [
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
                'parameters' =>  [
                    [
                        'name' => 'eventName',
                        'title' => 'Event Name',
                        'value' => 'updatedEvent',
                        'defaultValue' => '',
                        'type' => 'string',
                        'uiControl' => 'text',
                        'uiControlAttributes' => [],
                        'availableValues' => null,
                        'description' => 'The name of the event that is pushed to the Data-Layer. For example you can push an event by adding this to your website: _mtm.push({"event": "my-custom-event"});',
                        'inlineHelp' => null,
                        'introduction' => null,
                        'condition' => null,
                        'fullWidth' => false,
                        'component' => [
                            'plugin' => 'TagManager',
                            'name' => 'FieldVariableTemplate',
                        ],
                    ]
                ]
            ]
        ];
        $this->assertSame($expected, $trigger);
    }

    public function testGetContainer()
    {
        // no need to create new test for this
        $this->testAddContainerTriggerSuccessFull();
        $this->testUpdateContainerTriggerSuccess();
    }

    public function testGetContainerDoesNotExist()
    {
        $this->assertFalse($this->model->getContainerTrigger(999, $this->containerVersion1, $this->idTrigger1));
        $this->assertFalse($this->model->getContainerTrigger($this->idSite, 9999, $this->idTrigger1));
        $this->assertFalse($this->model->getContainerTrigger($this->idSite, $this->containerVersion1, 9999));
        // make sure when all params correct we do find the trigger
        $this->assertNotEmpty($this->model->getContainerTrigger($this->idSite, $this->containerVersion1, $this->idTrigger1));
    }

    public function testGetContainerDoesNotReturnDeletedTrigger()
    {
        $this->assertNotEmpty($this->model->getContainerTrigger($this->idSite, $this->containerVersion1, $this->idTrigger1));
        $this->model->deleteContainerTrigger($this->idSite, $this->containerVersion1, $this->idTrigger1);
        $this->assertFalse($this->model->getContainerTrigger($this->idSite, $this->containerVersion1, $this->idTrigger1));
    }

    public function testGetContainerWhenRelatedTypeNoLongerExists_ignoredTypeMetadata()
    {
        $this->dao->updateTriggerColumns($this->idSite, $this->containerVersion1, $this->idTrigger1, ['type' => 'Foo']);
        $trigger = $this->model->getContainerTrigger($this->idSite, $this->containerVersion1, $this->idTrigger1);

        $this->assertSame([
            'idtrigger' => 1,
            'idcontainerversion' => 5,
            'idsite' => 1,
            'type' => 'Foo',
            'name' => 'InitialTrigger1',
            'description' => '',
            'status' => 'active',
            'parameters' =>  ['eventName' => 'myEvent'],
            'conditions' =>  [],
            'created_date' => '2018-01-01 02:03:04',
            'updated_date' => '2018-01-01 02:03:04',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Jan 1, 2018 02:03:04',
            'typeMetadata' => null,
        ], $trigger);
    }

    public function testGetContainerTriggersNoTriggerMatches()
    {
        $this->assertSame([], $this->model->getContainerTriggers(999, $this->containerVersion1));
        $this->assertSame([], $this->model->getContainerTriggers($this->idSite, 999));

        // make sure with correct params we do get a result
        $this->assertNotEmpty($this->model->getContainerTriggers($this->idSite, $this->containerVersion1));
    }

    public function testGetContainerTriggersDoesNotReturnDeleted()
    {
        $this->assertCount(1, $this->model->getContainerTriggers($this->idSite, $this->containerVersion1));
        $this->model->deleteContainerTrigger($this->idSite, $this->containerVersion1, $this->idTrigger1);
        $this->assertSame([], $this->model->getContainerTriggers($this->idSite, $this->containerVersion1));
    }

    public function testGetContainerTriggersOnlyReturnsContainersForThatSiteAndVersion()
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
        $this->assertSame([], $this->model->getContainerTriggers($this->idSite2, $this->containerVersion2));
    }

    public function testGetContainerTriggersFormatsValues()
    {
        $this->addContainerTrigger($this->idSite, $this->containerVersion1, WindowLoadedTrigger::ID, 'v1');
        $triggers = $this->model->getContainerTriggers($this->idSite, $this->containerVersion1);

        $this->assertCount(2, $triggers);
        foreach ($triggers as $trigger) {
            $this->assertNotEmpty($trigger['typeMetadata']);
        }
    }

    public function testDeleteContainerTrigger()
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

    public function testGetTriggerReferencesWhenNoReferences()
    {
        $this->assertSame([], $this->model->getTriggerReferences($this->idSite, $this->containerVersion1, $this->idTrigger1));
    }

    public function testGetTriggerReferencesWithReferences()
    {
        $idTrigger2 = $this->addContainerTrigger($this->idSite, $this->containerVersion1, $type = null, 'MyName2', $parameters = ['eventName' => '<div></div>']);
        $idTrigger3 = $this->addContainerTrigger($this->idSite, $this->containerVersion1, $type = null, 'MyName3', $parameters = ['eventName' => '<div></div>']);
        $idTrigger4 = $this->addContainerTrigger($this->idSite, $this->containerVersion1, $type = null, 'MyName4', $parameters = ['eventName' => '<div></div>']);

        $idTrigger5 = $this->addContainerTrigger($this->idSite, $this->containerVersion2, $type = null, 'MyName5', $parameters = ['eventName' => '<div></div>']);
        $idTrigger6 = $this->addContainerTrigger($this->idSite2, $this->containerVersion1, $type = null, 'MyName6', $parameters = ['eventName' => '<div></div>']);

        $this->addContainerTag($this->idSite, $this->containerVersion1, 'TagName1', $fire = [$idTrigger3], $block = [$this->idTrigger1]);
        $this->addContainerTag($this->idSite, $this->containerVersion1, 'TagName2', $fire = [$this->idTrigger1], $block = [$idTrigger2]);
        $this->addContainerTag($this->idSite, $this->containerVersion1, 'TagName3', $fire = [$this->idTrigger1], $block = []);
        $this->addContainerTag($this->idSite, $this->containerVersion2, 'TagName4', $fire = [$idTrigger5], $block = []);

        // is finding triggers in fire and block trigger
        $expected =  [
                 [
                    'referenceId' => 1,
                    'referenceType' => 'tag',
                    'referenceTypeName' => 'Tag',
                    'referenceName' => 'TagName1',
                 ],
                 [
                    'referenceId' => 2,
                    'referenceType' => 'tag',
                    'referenceTypeName' => 'Tag',
                    'referenceName' => 'TagName2',
                 ],
                 [
                    'referenceId' => 3,
                    'referenceType' => 'tag',
                    'referenceTypeName' => 'Tag',
                    'referenceName' => 'TagName3',
                 ],
        ];

        $this->assertSame($expected, $this->model->getTriggerReferences($this->idSite, $this->containerVersion1, $this->idTrigger1));

        // is finding them in block trigger
        $expected =  [
                 [
                    'referenceId' => 2,
                    'referenceType' => 'tag',
                    'referenceTypeName' => 'Tag',
                    'referenceName' => 'TagName2',
                 ],
        ];
        $this->assertSame($expected, $this->model->getTriggerReferences($this->idSite, $this->containerVersion1, $idTrigger2));

        // when nothing matches
        $expected = [];
        $this->assertSame($expected, $this->model->getTriggerReferences($this->idSite, $this->containerVersion1, $idTrigger4));
    }

    private function updateContainerTrigger($idSite, $idContainerVersion, $idTrigger, $name = 'MyName', $parameters = [], $conditions = [], $description = '')
    {
        return $this->model->updateContainerTrigger($idSite, $idContainerVersion, $idTrigger, $name, $parameters, $conditions, $description);
    }

    private function addContainerTrigger($idSite, $idContainerVersion = 5, $type = null, $name = 'MyName', $parameters = [], $conditions = [], $description = '')
    {
        if (!isset($type)) {
            $type = CustomEventTrigger::ID;
        }

        return $this->model->addContainerTrigger($idSite, $idContainerVersion, $type, $name, $parameters, $conditions, $description);
    }

    private function addContainerTag($idSite, $idContainerVersion = 5, $name = 'TagName', $fireTriggerIds = [], $blockTriggerIds = [])
    {
        $type = CustomHtmlTag::ID;
        $parameters = ['customHtml' => '<p></p>'];
        $tag = StaticContainer::get('Piwik\Plugins\TagManager\Model\Tag');
        return $tag->addContainerTag($idSite, $idContainerVersion, $type, $name, $parameters, $fireTriggerIds, $blockTriggerIds, $fireLimit = Tag::FIRE_LIMIT_UNLIMITED, $fireDelay = 0, $priority = 999, $startDate = null, $endDate = null);
    }
}
