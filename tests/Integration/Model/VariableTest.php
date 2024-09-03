<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration\Model;

use Piwik\Container\StaticContainer;
use Piwik\Plugins\TagManager\Dao\VariablesDao;
use Piwik\Plugins\TagManager\Input\Name;
use Piwik\Plugins\TagManager\Model\Comparison;
use Piwik\Plugins\TagManager\Model\Tag;
use Piwik\Plugins\TagManager\Model\Variable;
use Piwik\Plugins\TagManager\TagManager;
use Piwik\Plugins\TagManager\Template\Tag\CustomHtmlTag;
use Piwik\Plugins\TagManager\Template\Tag\MatomoTag;
use Piwik\Plugins\TagManager\Template\Trigger\WindowLoadedTrigger;
use Piwik\Plugins\TagManager\Template\Variable\CustomJsFunctionVariable;
use Piwik\Plugins\TagManager\Template\Variable\DataLayerVariable;
use Piwik\Plugins\TagManager\Template\Variable\PreConfigured\ClickButtonVariable;
use Piwik\Plugins\TagManager\Template\Variable\PreConfigured\ErrorUrlVariable;
use Piwik\Plugins\TagManager\Template\Variable\ReferrerUrlVariable;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;
use Piwik\Tests\Framework\Fixture;

/**
 * @group TagManager
 * @group VariableTest
 * @group Variable
 * @group Plugins
 */
class VariableTest extends IntegrationTestCase
{
    private $now = '2018-01-01 02:03:04';

    /**
     * @var int
     */
    private $idSite;
    private $idSite2;

    private $idVariable1;

    private $containerVersion1 = 5;
    private $containerVersion2 = 6;

    /**
     * @var VariablesDao
     */
    private $dao;

    /**
     * @var Variable
     */
    private $model;

    /**
     * @var Tag
     */
    private $tagModel;

    public function setUp(): void
    {
        parent::setUp();

        TagManager::$enableAutoContainerCreation = false;
        $this->idSite = Fixture::createWebsite('2014-03-04 05:06:07');
        $this->idSite2 = Fixture::createWebsite('2014-03-04 05:06:07');

        $this->dao = StaticContainer::get('Piwik\Plugins\TagManager\Dao\VariablesDao');
        $this->model = StaticContainer::get('Piwik\Plugins\TagManager\Model\Variable');
        $this->model->setCurrentDateTime($this->now);

        $this->idVariable1 = $this->addContainerVariable($this->idSite, $this->containerVersion1, null, 'InitialVariable1', ['dataLayerName' => 'myVariable'], '');

        $this->tagModel = StaticContainer::get('Piwik\Plugins\TagManager\Model\Tag');
        $this->tagModel->setCurrentDateTime($this->now);
    }

    public function tearDown(): void
    {
        TagManager::$enableAutoContainerCreation = true;
        parent::tearDown();
    }

    public function testAddContainerVariableInvalidSite()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('idSite: An unexpected website was found');

        $this->addContainerVariable($idSite = 999, $this->containerVersion1);
    }

    public function testAddContainerVariableInvalidName()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Name: The value contains');

        $this->addContainerVariable($this->idSite, $this->containerVersion1, $type = null, str_pad('4', Name::MAX_LENGTH + 1));
    }

    public function testAddContainerVariableInvalidDefaultValue()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The default value needs to be empty, a string');

        $this->addContainerVariable($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = ['dataLayerName' => ''], ['foobar'], []);
    }

    public function testAddContainerVariableMissingParameter()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Data Layer Variable Name: A value needs to be provided.');

        $this->addContainerVariable($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = ['dataLayerName' => ''], '', []);
    }

    public function testAddContainerVariableInvalidParameter()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Data Layer Variable Name: A value needs to be provided.');

        $this->addContainerVariable($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = ['dataLayerName' => ''], '', []);
    }

    public function testAddContainerVariableInvalidLookupTable()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Lookup Table: Missing value for array key "comparison"');

        $lookupTable = [['match_value' => 'five']];
        $this->addContainerVariable($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = ['dataLayerName' => '<div></div>'], '', $lookupTable);
    }

    public function testAddContainerVariableInvalidLookupTable2()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Lookup Table: The comparison "foobarbaz" is not supported');

        $lookupTable = [
            ['match_value' => 'inval', 'comparison' => 'foobarbaz', 'out_value' => 'foobarout'],
        ];
        $this->addContainerVariable($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = ['dataLayerName' => '<div></div>'], '', $lookupTable);
    }

    public function testAddContainerVariableInvalidType()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The variable "inValiDType" is not supported');

        $lookupTable = [];
        $this->addContainerVariable($this->idSite, $this->containerVersion1, 'inValiDType', 'MyName', $parameters = ['dataLayerName' => '<div></div>'], '', $lookupTable);
    }

    public function testAddContainerVariableSuccessMinimal()
    {
        $idVariable = $this->addContainerVariable($this->idSite, $this->containerVersion1, DataLayerVariable::ID, 'MyName', $parameters = ['dataLayerName' => 'fooBar'], '', []);
        $this->assertSame(2, $idVariable);

        $variable = $this->model->getContainerVariable($this->idSite, $this->containerVersion1, $idVariable);

        $expected =  [
            'idvariable' => 2,
            'idcontainerversion' => 5,
            'idsite' => 1,
            'type' => DataLayerVariable::ID,
            'name' => 'MyName',
            'description' => '',
            'status' => 'active',
            'parameters' =>
                 [
                    'dataLayerName' => 'fooBar',
                ],
            'lookup_table' =>  [],
            'default_value' => '',
            'created_date' => '2018-01-01 02:03:04',
            'updated_date' => '2018-01-01 02:03:04',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Jan 1, 2018 02:03:04',
            'typeMetadata' => [
                'id' => 'DataLayer',
                'name' => 'Data-Layer',
                'description' => 'Reads a custom value from the Data-Layer.',
                'category' => 'Page Variables',
                'icon' => 'plugins/TagManager/images/defaultIcon.svg',
                'help' => 'Using this variable you can access any value that is stored within the dataLayer. You can also push values to the dataLayer yourself and access them this way afterwards.',
                'order' => 9999,
                'contexts' => ['web'],
                'hasAdvancedSettings' => true,
                'isCustomTemplate' => false,
                'parameters' =>  [
                   [
                        'name' => 'dataLayerName',
                        'title' => 'Data Layer Variable Name',
                        'value' => 'fooBar',
                        'defaultValue' => '',
                        'type' => 'string',
                        'uiControl' => 'text',
                        'uiControlAttributes' => [
                            'placeholder' => 'e.g. object1.myPropertyOfObject1'
                        ],
                        'availableValues' => null,
                        'description' => 'The name of any variable that is stored within the dataLayer. In case you want to access the value of a nested object, you can access the value of an object by separating each property by a dot, for example "object1.myPropertyOfObject1".',
                        'inlineHelp' => null,
                        'introduction' => null,
                        'condition' => null,
                        'fullWidth' => false,
                    ]
                ]
            ]
        ];
        $this->assertSame($expected, $variable);
    }

    public function testAddContainerVariableSuccessFull()
    {
        $description = 'Test description for MyName variable';
        $lookupTable = [
            ['match_value' => 'inval', 'comparison' => Comparison::ID_EQUALS, 'out_value' => 'errorfoo'],
            ['match_value' => 'foobar', 'comparison' => Comparison::ID_CONTAINS, 'out_value' => 'barbaz'],
        ];
        $idVariable = $this->addContainerVariable($this->idSite, $this->containerVersion1, DataLayerVariable::ID, 'MyName', $parameters = ['dataLayerName' => 'fooBar'], 'myDefault', $lookupTable, $description);
        $this->assertSame(2, $idVariable);

        $variable = $this->model->getContainerVariable($this->idSite, $this->containerVersion1, $idVariable);

        $expected =  [
            'idvariable' => $idVariable,
            'idcontainerversion' => 5,
            'idsite' => 1,
            'type' => DataLayerVariable::ID,
            'name' => 'MyName',
            'description' => $description,
            'status' => 'active',
            'parameters' =>
                 [
                    'dataLayerName' => 'fooBar',
                ],
            'lookup_table' => $lookupTable,
            'default_value' => 'myDefault',
            'created_date' => '2018-01-01 02:03:04',
            'updated_date' => '2018-01-01 02:03:04',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Jan 1, 2018 02:03:04',
            'typeMetadata' => [
                'id' => 'DataLayer',
                'name' => 'Data-Layer',
                'description' => 'Reads a custom value from the Data-Layer.',
                'category' => 'Page Variables',
                'icon' => 'plugins/TagManager/images/defaultIcon.svg',
                'help' => 'Using this variable you can access any value that is stored within the dataLayer. You can also push values to the dataLayer yourself and access them this way afterwards.',
                'order' => 9999,
                'contexts' => ['web'],
                'hasAdvancedSettings' => true,
                'isCustomTemplate' => false,
                'parameters' =>  [
                    [
                        'name' => 'dataLayerName',
                        'title' => 'Data Layer Variable Name',
                        'value' => 'fooBar',
                        'defaultValue' => '',
                        'type' => 'string',
                        'uiControl' => 'text',
                        'uiControlAttributes' => [
                            'placeholder' => 'e.g. object1.myPropertyOfObject1'
                        ],
                        'availableValues' => null,
                        'description' => 'The name of any variable that is stored within the dataLayer. In case you want to access the value of a nested object, you can access the value of an object by separating each property by a dot, for example "object1.myPropertyOfObject1".',
                        'inlineHelp' => null,
                        'introduction' => null,
                        'condition' => null,
                        'fullWidth' => false,
                    ]
                ]
            ]
        ];
        $this->assertSame($expected, $variable);
    }

    public function testUpdateContainerVariableInvalidSite()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('idSite: An unexpected website was found');

        $this->updateContainerVariable($idSite = 999, $this->containerVersion1, $this->idVariable1);
    }

    public function testUpdateContainerVariableInvalidName()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Name: The value contains');

        $this->updateContainerVariable($this->idSite, $this->containerVersion1, $this->idVariable1, str_pad('4', Name::MAX_LENGTH + 1));
    }

    public function testUpdateContainerVariableMissingParameter()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Data Layer Variable Name: A value needs to be provided.');

        $this->updateContainerVariable($this->idSite, $this->containerVersion1, $this->idVariable1, 'MyName', $parameters = [], '', []);
    }

    public function testUpdateContainerVariableInvalidParameter()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Data Layer Variable Name: A value needs to be provided.');

        $this->updateContainerVariable($this->idSite, $this->containerVersion1, $this->idVariable1, 'MyName', $parameters = ['dataLayerName' => ''], '', []);
    }

    public function testUpdateContainerVariableInvalidCondition()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Lookup Table: Missing value for array key "comparison"');

        $conditions = [['match_value' => 'five']];
        $this->updateContainerVariable($this->idSite, $this->containerVersion1, $this->idVariable1, 'MyName', $parameters = ['dataLayerName' => '<div></div>'], '', $conditions);
    }

    public function testUpdateContainerVariableInvalidCondition2()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Lookup Table: The comparison "inValId"');

        $lookupTable = [
            ['match_value' => 'inval', 'comparison' => 'inValId', 'out_value' => 'outva'],
        ];
        $this->addContainerVariable($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = ['dataLayerName' => '<div></div>'], '', $lookupTable);
    }

    public function testUpdateContainerVariableSuccess()
    {
        $description = 'Test updated description of MyUpdatedName variable';
        $lookupTable = [
            ['match_value' => ErrorUrlVariable::ID, 'comparison' => Comparison::ID_EQUALS, 'out_value' => 'errouprfoo'],
            ['match_value' => ErrorUrlVariable::ID, 'comparison' => Comparison::ID_CONTAINS, 'out_value' => 'bauprbaz'],
        ];

        $this->model->setCurrentDateTime('2018-02-01 05:06:07');
        $this->updateContainerVariable($this->idSite, $this->containerVersion1, $this->idVariable1, 'MyUpdatedName', $parameters = ['dataLayerName' => 'updatedVariable'], '', $lookupTable, $description);

        $variable = $this->model->getContainerVariable($this->idSite, $this->containerVersion1, $this->idVariable1);

        $expected =  [
            'idvariable' => $this->idVariable1,
            'idcontainerversion' => 5,
            'idsite' => 1,
            'type' => 'DataLayer',
            'name' => 'MyUpdatedName',
            'description' => $description,
            'status' => 'active',
            'parameters' =>
                 [
                    'dataLayerName' => 'updatedVariable'
                ],
            'lookup_table' => $lookupTable,
            'default_value' => '',
            'created_date' => '2018-01-01 02:03:04',
            'updated_date' => '2018-02-01 05:06:07',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Feb 1, 2018 05:06:07',
            'typeMetadata' => [
                'id' => 'DataLayer',
                'name' => 'Data-Layer',
                'description' => 'Reads a custom value from the Data-Layer.',
                'category' => 'Page Variables',
                'icon' => 'plugins/TagManager/images/defaultIcon.svg',
                'help' => 'Using this variable you can access any value that is stored within the dataLayer. You can also push values to the dataLayer yourself and access them this way afterwards.',
                'order' => 9999,
                'contexts' => ['web'],
                'hasAdvancedSettings' => true,
                'isCustomTemplate' => false,
                'parameters' =>  [
                    [
                        'name' => 'dataLayerName',
                        'title' => 'Data Layer Variable Name',
                        'value' => 'updatedVariable',
                        'defaultValue' => '',
                        'type' => 'string',
                        'uiControl' => 'text',
                        'uiControlAttributes' => [
                            'placeholder' => 'e.g. object1.myPropertyOfObject1'
                        ],
                        'availableValues' => null,
                        'description' => 'The name of any variable that is stored within the dataLayer. In case you want to access the value of a nested object, you can access the value of an object by separating each property by a dot, for example "object1.myPropertyOfObject1".',
                        'inlineHelp' => null,
                        'introduction' => null,
                        'condition' => null,
                        'fullWidth' => false,
                    ]
                ]
            ]
        ];
        $this->assertSame($expected, $variable);
    }

    public function testUpdateContainerVariableNameReferences()
    {
        $idVariable = $this->addContainerVariable($this->idSite, $this->containerVersion1, DataLayerVariable::ID, 'MyName', $parameters = ['dataLayerName' => 'fooBar'], 'myDefault');
        $this->assertSame(2, $idVariable);

        $variable = $this->model->getContainerVariable($this->idSite, $this->containerVersion1, $idVariable);

        $trigger = StaticContainer::get('Piwik\Plugins\TagManager\Model\Trigger');
        $idTrigger1 = $trigger->addContainerTrigger($this->idSite, $this->containerVersion1, WindowLoadedTrigger::ID, 'MyTrigger1', [], []);
        $this->assertSame(1, $idTrigger1);
        $tagParameters = ['matomoConfig' => "{{{$variable['name']}}}", 'trackingType' => 'pageview'];
        $idTag1 = $this->tagModel->addContainerTag($this->idSite, $this->containerVersion1, MatomoTag::ID, 'Tag1Name', $tagParameters, [$idTrigger1], [], Tag::FIRE_LIMIT_UNLIMITED, 0, 9999, $this->now, $this->now);
        $this->assertSame(1, $idTag1);
        $idTag2 = $this->tagModel->addContainerTag($this->idSite, $this->containerVersion1, MatomoTag::ID, 'Tag2Name', $tagParameters, [$idTrigger1], [], Tag::FIRE_LIMIT_UNLIMITED, 0, 9999, $this->now, $this->now);
        $this->assertSame(2, $idTag2);

        $newVariableName = 'NewVariableName';
        $this->updateContainerVariable($this->idSite, $this->containerVersion1, $idVariable, $newVariableName, ['dataLayerName' => 'updatedVariable']);

        $tag1 = $this->tagModel->getContainerTag($this->idSite, $this->containerVersion1, $idTag1);
        $this->assertSame("{{{$newVariableName}}}", $tag1['parameters']['matomoConfig']);
        $tag2 = $this->tagModel->getContainerTag($this->idSite, $this->containerVersion1, $idTag2);
        $this->assertSame("{{{$newVariableName}}}", $tag2['parameters']['matomoConfig']);
    }

    public function testUpdateContainerVariableNameReferencesInCustomJsVariable()
    {
        $variableParams = ['jsFunction' => 'function () { return 12345; }'];
        $idVariable = $this->addContainerVariable($this->idSite, $this->containerVersion1, CustomJsFunctionVariable::ID, 'TestVariable', $variableParams);
        $this->assertSame(2, $idVariable);

        $idReferencingVariable = $this->addContainerVariable($this->idSite, $this->containerVersion1, CustomJsFunctionVariable::ID, 'ReferencingTestVariable', $parameters = ['jsFunction' => 'function () { return {{TestVariable}}; }']);
        $this->assertSame(3, $idReferencingVariable);

        $newVariableName = 'NewVariableName';
        $this->updateContainerVariable($this->idSite, $this->containerVersion1, $idVariable, $newVariableName, $variableParams);

        $variable = $this->model->getContainerVariable($this->idSite, $this->containerVersion1, $idVariable);
        $this->assertNotEmpty($variable['parameters']['jsFunction']);
        $this->assertSame($variableParams['jsFunction'], $variable['parameters']['jsFunction']);
        $referencingVariable = $this->model->getContainerVariable($this->idSite, $this->containerVersion1, $idReferencingVariable);
        $this->assertSame('function () { return {{NewVariableName}}; }', $referencingVariable['parameters']['jsFunction']);
    }

    public function testGetContainer()
    {
        // no need to create new test for this
        $this->testAddContainerVariableSuccessFull();
        $this->testUpdateContainerVariableSuccess();
    }

    public function testGetContainerDoesNotExist()
    {
        $this->assertFalse($this->model->getContainerVariable(999, $this->containerVersion1, $this->idVariable1));
        $this->assertFalse($this->model->getContainerVariable($this->idSite, 9999, $this->idVariable1));
        $this->assertFalse($this->model->getContainerVariable($this->idSite, $this->containerVersion1, 9999));
        // make sure when all params correct we do find the variable
        $this->assertNotEmpty($this->model->getContainerVariable($this->idSite, $this->containerVersion1, $this->idVariable1));
    }

    public function testGetContainerDoesNotReturnDeletedVariable()
    {
        $this->assertNotEmpty($this->model->getContainerVariable($this->idSite, $this->containerVersion1, $this->idVariable1));
        $this->model->deleteContainerVariable($this->idSite, $this->containerVersion1, $this->idVariable1);
        $this->assertFalse($this->model->getContainerVariable($this->idSite, $this->containerVersion1, $this->idVariable1));
    }

    public function testGetContainerWhenRelatedTypeNoLongerExistsIgnoredTypeMetadata()
    {
        $this->dao->updateVariableColumns($this->idSite, $this->containerVersion1, $this->idVariable1, ['type' => 'Foo']);
        $variable = $this->model->getContainerVariable($this->idSite, $this->containerVersion1, $this->idVariable1);

        $this->assertSame([
            'idvariable' => 1,
            'idcontainerversion' => 5,
            'idsite' => 1,
            'type' => 'Foo',
            'name' => 'InitialVariable1',
            'description' => '',
            'status' => 'active',
            'parameters' =>  ['dataLayerName' => 'myVariable'],
            'lookup_table' =>  [],
            'default_value' => '',
            'created_date' => '2018-01-01 02:03:04',
            'updated_date' => '2018-01-01 02:03:04',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Jan 1, 2018 02:03:04',
            'typeMetadata' => null,
        ], $variable);
    }

    public function testGetContainerVariablesNoVariableMatches()
    {
        $this->assertSame([], $this->model->getContainerVariables(999, $this->containerVersion1));
        $this->assertSame([], $this->model->getContainerVariables($this->idSite, 999));

        // make sure with correct params we do get a result
        $this->assertNotEmpty($this->model->getContainerVariables($this->idSite, $this->containerVersion1));
    }

    public function testGetContainerVariablesDoesNotReturnDeleted()
    {
        $this->assertCount(1, $this->model->getContainerVariables($this->idSite, $this->containerVersion1));
        $this->model->deleteContainerVariable($this->idSite, $this->containerVersion1, $this->idVariable1);
        $this->assertSame([], $this->model->getContainerVariables($this->idSite, $this->containerVersion1));
    }

    public function testGetContainerVariablesOnlyReturnsContainersForThatSiteAndVersion()
    {
        $this->addContainerVariable($this->idSite, $this->containerVersion1, ReferrerUrlVariable::ID, 'v1', []);
        $this->addContainerVariable($this->idSite, $this->containerVersion1, ReferrerUrlVariable::ID, 'v2', []);
        $this->addContainerVariable($this->idSite2, $this->containerVersion1, ReferrerUrlVariable::ID, 'v2', []);
        $this->addContainerVariable($this->idSite2, $this->containerVersion1, ReferrerUrlVariable::ID, 'v3', []);
        $this->addContainerVariable($this->idSite, $this->containerVersion2, ReferrerUrlVariable::ID, 'v4', []);

        $this->assertCount(3, $this->model->getContainerVariables($this->idSite, $this->containerVersion1));
        $this->assertCount(2, $this->model->getContainerVariables($this->idSite2, $this->containerVersion1));
        $this->assertCount(1, $this->model->getContainerVariables($this->idSite, $this->containerVersion2));
        $this->assertCount(0, $this->model->getContainerVariables($this->idSite2, $this->containerVersion2));
        $this->assertSame([], $this->model->getContainerVariables($this->idSite2, $this->containerVersion2));
    }

    public function testGetContainerVariablesFormatsValues()
    {
        $this->addContainerVariable($this->idSite, $this->containerVersion1, ReferrerUrlVariable::ID, 'v1', []);
        $variables = $this->model->getContainerVariables($this->idSite, $this->containerVersion1);

        $this->assertCount(2, $variables);
        foreach ($variables as $variable) {
            $this->assertNotEmpty($variable['typeMetadata']);
        }
    }

    public function testDeleteContainerVariable()
    {
        $this->addContainerVariable($this->idSite, $this->containerVersion1, ReferrerUrlVariable::ID, 'v1', []);
        $idVariable3 = $this->addContainerVariable($this->idSite, $this->containerVersion1, ReferrerUrlVariable::ID, 'v2', []);
        $this->addContainerVariable($this->idSite2, $this->containerVersion1, ReferrerUrlVariable::ID, 'v2', []);
        $this->addContainerVariable($this->idSite2, $this->containerVersion1, ReferrerUrlVariable::ID, 'v3', []);
        $this->addContainerVariable($this->idSite, $this->containerVersion2, ReferrerUrlVariable::ID, 'v4', []);

        $this->model->setCurrentDateTime('2019-03-04 03:03:03');

        $this->assertCount(3, $this->model->getContainerVariables($this->idSite, $this->containerVersion1));
        $this->assertCount(2, $this->model->getContainerVariables($this->idSite2, $this->containerVersion1));
        $this->assertCount(1, $this->model->getContainerVariables($this->idSite, $this->containerVersion2));
        $this->assertCount(0, $this->model->getContainerVariables($this->idSite2, $this->containerVersion2));

        // deletes nothing when no match
        $this->model->deleteContainerVariable($this->idSite, $this->containerVersion1, 9999);
        $this->model->deleteContainerVariable($this->idSite, 9999, $idVariable3);
        $this->model->deleteContainerVariable(9999, $this->containerVersion1, $idVariable3);

        $this->assertCount(3, $this->model->getContainerVariables($this->idSite, $this->containerVersion1));
        $this->assertCount(2, $this->model->getContainerVariables($this->idSite2, $this->containerVersion1));
        $this->assertCount(1, $this->model->getContainerVariables($this->idSite, $this->containerVersion2));
        $this->assertCount(0, $this->model->getContainerVariables($this->idSite2, $this->containerVersion2));

        $this->model->deleteContainerVariable($this->idSite, $this->containerVersion1, $idVariable3);

        // removes correct one
        $this->assertCount(2, $this->model->getContainerVariables($this->idSite, $this->containerVersion1));
        $this->assertCount(2, $this->model->getContainerVariables($this->idSite2, $this->containerVersion1));
        $this->assertCount(1, $this->model->getContainerVariables($this->idSite, $this->containerVersion2));

        // sets updated date etc
        $variables = $this->dao->getAllVariables();
        $count = 0;
        foreach ($variables as $variable) {
            if ($variable['idvariable'] === $idVariable3) {
                $count++;
                $this->assertSame(VariablesDao::STATUS_DELETED, $variable['status']);
                $this->assertSame('2019-03-04 03:03:03', $variable['deleted_date']);
            } else {
                $this->assertNotSame(VariablesDao::STATUS_DELETED, $variable['status']);
                $this->assertEmpty($variable['deleted_date']);
            }
        }
        // make sure above assertion was executed
        $this->assertSame(1, $count);
    }

    public function testGetVariableReferencesWhenNoReferences()
    {
        // we test the references apart from this via API in system tests
        $this->assertSame([], $this->model->getContainerVariableReferences($this->idSite, $this->containerVersion1, $this->idVariable1));
    }

    private function addContainerVariable($idSite, $idContainerVersion = 5, $type = null, $name = 'MyName', $parameters = [], $defaultValue = '', $lookupTable = [], $description = '')
    {
        if (!isset($type)) {
            $type = DataLayerVariable::ID;
        }

        return $this->model->addContainerVariable($idSite, $idContainerVersion, $type, $name, $parameters, $defaultValue, $lookupTable, $description);
    }

    private function updateContainerVariable($idSite, $idContainerVersion, $idVariable, $name = 'MyName', $parameters = [], $defaultValue = '', $lookupTable = [], $description = '')
    {
        return $this->model->updateContainerVariable($idSite, $idContainerVersion, $idVariable, $name, $parameters, $defaultValue, $lookupTable, $description);
    }
}
