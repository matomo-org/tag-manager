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
use Piwik\Plugins\TagManager\Model\Variable;
use Piwik\Plugins\TagManager\TagManager;
use Piwik\Plugins\TagManager\Template\Variable\DataLayerVariable;
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

    public function setUp()
    {
        parent::setUp();

        TagManager::$enableAutoContainerCreation = false;
        $this->idSite = Fixture::createWebsite('2014-03-04 05:06:07');
        $this->idSite2 = Fixture::createWebsite('2014-03-04 05:06:07');

        $this->dao = StaticContainer::get('Piwik\Plugins\TagManager\Dao\VariablesDao');
        $this->model = StaticContainer::get('Piwik\Plugins\TagManager\Model\Variable');
        $this->model->setCurrentDateTime($this->now);

        $this->idVariable1 = $this->addContainerVariable($this->idSite, $this->containerVersion1, null, 'InitialVariable1', array('dataLayerName' => 'myVariable'), '');
    }

    public function tearDown()
    {
        TagManager::$enableAutoContainerCreation = true;
        parent::tearDown();
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage idSite: An unexpected website was found
     */
    public function test_addContainerVariable_invalidSite()
    {
        $this->addContainerVariable($idSite = 999, $this->containerVersion1);
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Name: The value contains
     */
    public function test_addContainerVariable_invalidName()
    {
        $this->addContainerVariable($this->idSite, $this->containerVersion1, $type = null, str_pad('4', Name::MAX_LENGTH + 1));
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The default value needs to be empty, a string
     */
    public function test_addContainerVariable_invalidDefaultValue()
    {
        $this->addContainerVariable($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = array('dataLayerName' => ''), array('foobar'), array());
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Data Layer Variable Name: A value needs to be provided.
     */
    public function test_addContainerVariable_missingParameter()
    {
        $this->addContainerVariable($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = array('dataLayerName' => ''), '', array());
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Data Layer Variable Name: A value needs to be provided.
     */
    public function test_addContainerVariable_invalidParameter()
    {
        $this->addContainerVariable($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = array('dataLayerName' => ''), '', array());
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Lookup Table: Missing value for array key "comparison"
     */
    public function test_addContainerVariable_invalidLookupTable()
    {
        $lookupTable = array(array('match_value' => 'five'));
        $this->addContainerVariable($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = array('dataLayerName' => '<div></div>'), '', $lookupTable);
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Lookup Table: The comparison "foobarbaz" is not supported
     */
    public function test_addContainerVariable_invalidLookupTable2()
    {
        $lookupTable = array(
            array('match_value' => 'inval', 'comparison' => 'foobarbaz', 'out_value' => 'foobarout'),
        );
        $this->addContainerVariable($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = array('dataLayerName' => '<div></div>'), '', $lookupTable);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The variable "inValiDType" is not supported
     */
    public function test_addContainerVariable_invalidType()
    {
        $lookupTable = array();
        $this->addContainerVariable($this->idSite, $this->containerVersion1, 'inValiDType', 'MyName', $parameters = array('dataLayerName' => '<div></div>'), '', $lookupTable);
    }

    public function test_addContainerVariable_successMinimal()
    {
        $idVariable = $this->addContainerVariable($this->idSite, $this->containerVersion1, DataLayerVariable::ID, 'MyName', $parameters = array('dataLayerName' => 'fooBar'), '', array());
        $this->assertSame(2, $idVariable);

        $variable = $this->model->getContainerVariable($this->idSite, $this->containerVersion1, $idVariable);

        $expected = array (
            'idvariable' => 2,
            'idcontainerversion' => 5,
            'idsite' => 1,
            'type' => DataLayerVariable::ID,
            'name' => 'MyName',
            'status' => 'active',
            'parameters' =>
                array (
                    'dataLayerName' => 'fooBar',
                ),
            'lookup_table' => array (),
            'default_value' => '',
            'created_date' => '2018-01-01 02:03:04',
            'updated_date' => '2018-01-01 02:03:04',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Jan 1, 2018 02:03:04',
            'typeMetadata' => Array(
                'id' => 'DataLayer',
                'name' => 'Data-Layer',
                'description' => 'Reads a custom value from the Data-Layer.',
                'category' => 'Page Variables',
                'icon' => 'plugins/TagManager/images/defaultIcon.svg',
                'help' => 'Using this variable you can access any value that is stored within the dataLayer. You can also push values to the dataLayer yourself and access them this way afterwards.',
                'order' => 9999,
                'contexts' => ['web'],
                'hasAdvancedSettings' => true,
                'parameters' => array (
                   array(
                        'name' => 'dataLayerName',
                        'title' => 'Data Layer Variable Name',
                        'value' => 'fooBar',
                        'defaultValue' => '',
                        'type' => 'string',
                        'uiControl' => 'text',
                        'uiControlAttributes' => array(),
                        'availableValues' => null,
                        'description' => 'The name of any variable that is stored within the dataLayer. In case you want to access the value of a nested object, you can access the value of an object by separating each property by a dot, for example "object1.myPropertyOfObject1".',
                        'inlineHelp' => null,
                        'templateFile' => '',
                        'introduction' => null,
                        'condition' => null,
                    )
                )
            )
        );
        $this->assertSame($expected, $variable);
    }

    public function test_addContainerVariable_successFull()
    {
        $lookupTable = array(
            array('match_value' => 'inval', 'comparison' => Comparison::ID_EQUALS, 'out_value' => 'errorfoo'),
            array('match_value' => 'foobar', 'comparison' => Comparison::ID_CONTAINS, 'out_value' => 'barbaz'),
        );
        $idVariable = $this->addContainerVariable($this->idSite, $this->containerVersion1, DataLayerVariable::ID, 'MyName', $parameters = array('dataLayerName' => 'fooBar'), 'myDefault', $lookupTable);
        $this->assertSame(2, $idVariable);

        $variable = $this->model->getContainerVariable($this->idSite, $this->containerVersion1, $idVariable);

        $expected = array (
            'idvariable' => $idVariable,
            'idcontainerversion' => 5,
            'idsite' => 1,
            'type' => DataLayerVariable::ID,
            'name' => 'MyName',
            'status' => 'active',
            'parameters' =>
                array (
                    'dataLayerName' => 'fooBar',
                ),
            'lookup_table' => $lookupTable,
            'default_value' => 'myDefault',
            'created_date' => '2018-01-01 02:03:04',
            'updated_date' => '2018-01-01 02:03:04',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Jan 1, 2018 02:03:04',
            'typeMetadata' => Array(
                'id' => 'DataLayer',
                'name' => 'Data-Layer',
                'description' => 'Reads a custom value from the Data-Layer.',
                'category' => 'Page Variables',
                'icon' => 'plugins/TagManager/images/defaultIcon.svg',
                'help' => 'Using this variable you can access any value that is stored within the dataLayer. You can also push values to the dataLayer yourself and access them this way afterwards.',
                'order' => 9999,
                'contexts' => ['web'],
                'hasAdvancedSettings' => true,
                'parameters' => array (
                    array(
                        'name' => 'dataLayerName',
                        'title' => 'Data Layer Variable Name',
                        'value' => 'fooBar',
                        'defaultValue' => '',
                        'type' => 'string',
                        'uiControl' => 'text',
                        'uiControlAttributes' => array(),
                        'availableValues' => null,
                        'description' => 'The name of any variable that is stored within the dataLayer. In case you want to access the value of a nested object, you can access the value of an object by separating each property by a dot, for example "object1.myPropertyOfObject1".',
                        'inlineHelp' => null,
                        'templateFile' => '',
                        'introduction' => null,
                        'condition' => null,
                    )
                )
            )
        );
        $this->assertSame($expected, $variable);
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage idSite: An unexpected website was found
     */
    public function test_updateContainerVariable_invalidSite()
    {
        $this->updateContainerVariable($idSite = 999, $this->containerVersion1, $this->idVariable1);
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Name: The value contains
     */
    public function test_updateContainerVariable_invalidName()
    {
        $this->updateContainerVariable($this->idSite, $this->containerVersion1, $this->idVariable1, str_pad('4', Name::MAX_LENGTH + 1));
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Data Layer Variable Name: A value needs to be provided.
     */
    public function test_updateContainerVariable_missingParameter()
    {
        $this->updateContainerVariable($this->idSite, $this->containerVersion1, $this->idVariable1, 'MyName', $parameters = array(), '', array());
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Data Layer Variable Name: A value needs to be provided.
     */
    public function test_updateContainerVariable_invalidParameter()
    {
        $this->updateContainerVariable($this->idSite, $this->containerVersion1, $this->idVariable1, 'MyName', $parameters = array('dataLayerName' => ''), '', array());
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Lookup Table: Missing value for array key "comparison"
     */
    public function test_updateContainerVariable_invalidCondition()
    {
        $conditions = array(array('match_value' => 'five'));
        $this->updateContainerVariable($this->idSite, $this->containerVersion1, $this->idVariable1, 'MyName', $parameters = array('dataLayerName' => '<div></div>'), '', $conditions);
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Lookup Table: The comparison "inValId"
     */
    public function test_updateContainerVariable_invalidCondition2()
    {
        $lookupTable = array(
            array('match_value' => 'inval', 'comparison' => 'inValId', 'out_value' => 'outva'),
        );
        $this->addContainerVariable($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = array('dataLayerName' => '<div></div>'), '', $lookupTable);
    }

    public function test_updateContainerVariable_success()
    {
        $lookupTable = array(
            array('match_value' => ErrorUrlVariable::ID, 'comparison' => Comparison::ID_EQUALS, 'out_value' => 'errouprfoo'),
            array('match_value' => ErrorUrlVariable::ID, 'comparison' => Comparison::ID_CONTAINS, 'out_value' => 'bauprbaz'),
        );

        $this->model->setCurrentDateTime('2018-02-01 05:06:07');
        $this->updateContainerVariable($this->idSite, $this->containerVersion1, $this->idVariable1, 'MyUpdatedName', $parameters = array('dataLayerName' => 'updatedVariable'), '', $lookupTable);

        $variable = $this->model->getContainerVariable($this->idSite, $this->containerVersion1, $this->idVariable1);

        $expected = array (
            'idvariable' => $this->idVariable1,
            'idcontainerversion' => 5,
            'idsite' => 1,
            'type' => 'DataLayer',
            'name' => 'MyUpdatedName',
            'status' => 'active',
            'parameters' =>
                array (
                    'dataLayerName' => 'updatedVariable'
                ),
            'lookup_table' => $lookupTable,
            'default_value' => '',
            'created_date' => '2018-01-01 02:03:04',
            'updated_date' => '2018-02-01 05:06:07',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Feb 1, 2018 05:06:07',
            'typeMetadata' => Array(
                'id' => 'DataLayer',
                'name' => 'Data-Layer',
                'description' => 'Reads a custom value from the Data-Layer.',
                'category' => 'Page Variables',
                'icon' => 'plugins/TagManager/images/defaultIcon.svg',
                'help' => 'Using this variable you can access any value that is stored within the dataLayer. You can also push values to the dataLayer yourself and access them this way afterwards.',
                'order' => 9999,
                'contexts' => ['web'],
                'hasAdvancedSettings' => true,
                'parameters' => array (
                    array(
                        'name' => 'dataLayerName',
                        'title' => 'Data Layer Variable Name',
                        'value' => 'updatedVariable',
                        'defaultValue' => '',
                        'type' => 'string',
                        'uiControl' => 'text',
                        'uiControlAttributes' => array(),
                        'availableValues' => null,
                        'description' => 'The name of any variable that is stored within the dataLayer. In case you want to access the value of a nested object, you can access the value of an object by separating each property by a dot, for example "object1.myPropertyOfObject1".',
                        'inlineHelp' => null,
                        'templateFile' => '',
                        'introduction' => null,
                        'condition' => null,
                    )
                )
            )
        );
        $this->assertSame($expected, $variable);
    }

    public function test_getContainer()
    {
        // no need to create new test for this
        $this->test_addContainerVariable_successFull();
        $this->test_updateContainerVariable_success();
    }

    public function test_getContainer_doesNotExist()
    {
        $this->assertFalse($this->model->getContainerVariable(999, $this->containerVersion1, $this->idVariable1));
        $this->assertFalse($this->model->getContainerVariable($this->idSite, 9999, $this->idVariable1));
        $this->assertFalse($this->model->getContainerVariable($this->idSite, $this->containerVersion1, 9999));
        // make sure when all params correct we do find the variable
        $this->assertNotEmpty($this->model->getContainerVariable($this->idSite, $this->containerVersion1, $this->idVariable1));
    }

    public function test_getContainer_doesNotReturnDeletedVariable()
    {
        $this->assertNotEmpty($this->model->getContainerVariable($this->idSite, $this->containerVersion1, $this->idVariable1));
        $this->model->deleteContainerVariable($this->idSite, $this->containerVersion1, $this->idVariable1);
        $this->assertFalse($this->model->getContainerVariable($this->idSite, $this->containerVersion1, $this->idVariable1));
    }

    public function test_getContainer_whenRelatedTypeNoLongerExists_ignoredTypeMetadata()
    {
        $this->dao->updateVariableColumns($this->idSite, $this->containerVersion1, $this->idVariable1, array('type' => 'Foo'));
        $variable = $this->model->getContainerVariable($this->idSite, $this->containerVersion1, $this->idVariable1);

        $this->assertSame(array (
            'idvariable' => 1,
            'idcontainerversion' => 5,
            'idsite' => 1,
            'type' => 'Foo',
            'name' => 'InitialVariable1',
            'status' => 'active',
            'parameters' => array (),
            'lookup_table' => array (),
            'default_value' => '',
            'created_date' => '2018-01-01 02:03:04',
            'updated_date' => '2018-01-01 02:03:04',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Jan 1, 2018 02:03:04',
            'typeMetadata' => NULL,
        ), $variable);
    }

    public function test_getContainerVariables_noVariableMatches()
    {
        $this->assertSame(array(), $this->model->getContainerVariables(999, $this->containerVersion1));
        $this->assertSame(array(), $this->model->getContainerVariables($this->idSite, 999));

        // make sure with correct params we do get a result
        $this->assertNotEmpty($this->model->getContainerVariables($this->idSite, $this->containerVersion1));
    }

    public function test_getContainerVariables_doesNotReturnDeleted()
    {
        $this->assertCount(1, $this->model->getContainerVariables($this->idSite, $this->containerVersion1));
        $this->model->deleteContainerVariable($this->idSite, $this->containerVersion1, $this->idVariable1);
        $this->assertSame(array(), $this->model->getContainerVariables($this->idSite, $this->containerVersion1));
    }

    public function test_getContainerVariables_onlyReturnsContainersForThatSiteAndVersion()
    {
        $this->addContainerVariable($this->idSite, $this->containerVersion1, ReferrerUrlVariable::ID, 'v1', array());
        $this->addContainerVariable($this->idSite, $this->containerVersion1, ReferrerUrlVariable::ID, 'v2', array());
        $this->addContainerVariable($this->idSite2, $this->containerVersion1, ReferrerUrlVariable::ID, 'v2', array());
        $this->addContainerVariable($this->idSite2, $this->containerVersion1, ReferrerUrlVariable::ID, 'v3', array());
        $this->addContainerVariable($this->idSite, $this->containerVersion2, ReferrerUrlVariable::ID, 'v4', array());

        $this->assertCount(3, $this->model->getContainerVariables($this->idSite, $this->containerVersion1));
        $this->assertCount(2, $this->model->getContainerVariables($this->idSite2, $this->containerVersion1));
        $this->assertCount(1, $this->model->getContainerVariables($this->idSite, $this->containerVersion2));
        $this->assertCount(0, $this->model->getContainerVariables($this->idSite2, $this->containerVersion2));
        $this->assertSame(array(), $this->model->getContainerVariables($this->idSite2, $this->containerVersion2));
    }

    public function test_getContainerVariables_formatsValues()
    {
        $this->addContainerVariable($this->idSite, $this->containerVersion1, ReferrerUrlVariable::ID, 'v1', array());
        $variables = $this->model->getContainerVariables($this->idSite, $this->containerVersion1);

        $this->assertCount(2, $variables);
        foreach ($variables as $variable) {
            $this->assertNotEmpty($variable['typeMetadata']);
        }
    }

    public function test_deleteContainerVariable()
    {
        $this->addContainerVariable($this->idSite, $this->containerVersion1, ReferrerUrlVariable::ID, 'v1', array());
        $idVariable3 = $this->addContainerVariable($this->idSite, $this->containerVersion1, ReferrerUrlVariable::ID, 'v2', array());
        $this->addContainerVariable($this->idSite2, $this->containerVersion1, ReferrerUrlVariable::ID, 'v2', array());
        $this->addContainerVariable($this->idSite2, $this->containerVersion1, ReferrerUrlVariable::ID, 'v3', array());
        $this->addContainerVariable($this->idSite, $this->containerVersion2, ReferrerUrlVariable::ID, 'v4', array());

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

    public function test_getVariableReferences_whenNoReferences()
    {
        // we test the references apart from this via API in system tests
        $this->assertSame(array(), $this->model->getContainerVariableReferences($this->idSite, $this->containerVersion1, $this->idVariable1));
    }

    private function addContainerVariable($idSite, $idContainerVersion = 5, $type = null, $name = 'MyName', $parameters = array(), $defaultValue = '', $lookupTable = array())
    {
        if (!isset($type)) {
            $type = DataLayerVariable::ID;
        }

        return $this->model->addContainerVariable($idSite, $idContainerVersion, $type, $name, $parameters, $defaultValue, $lookupTable);
    }

    private function updateContainerVariable($idSite, $idContainerVersion, $idVariable, $name = 'MyName', $parameters = array(), $defaultValue = '', $lookupTable = array())
    {
        return $this->model->updateContainerVariable($idSite, $idContainerVersion, $idVariable, $name, $parameters, $defaultValue, $lookupTable);
    }
}
