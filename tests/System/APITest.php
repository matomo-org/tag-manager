<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\System;

use Piwik\API\Request;
use Piwik\Plugins\TagManager\API;
use Piwik\Plugins\TagManager\Context\AndroidContext;
use Piwik\Plugins\TagManager\Context\iOSContext;
use Piwik\Plugins\TagManager\Context\WebContext;
use Piwik\Plugins\TagManager\Model\Container\FixedIdGenerator;
use Piwik\Plugins\TagManager\Model\Environment;
use Piwik\Plugins\TagManager\Model\Salt;
use Piwik\Plugins\TagManager\tests\Fixtures\TagManagerFixture;
use Piwik\Tests\Framework\Fixture;
use Piwik\Tests\Framework\TestCase\SystemTestCase;

/**
 * @group TagManager
 * @group APITest
 * @group Plugins
 */
class APITest extends SystemTestCase
{
    private $fieldsToRemove = array('created_date', 'updated_date', 'deleted_date', 'release_date', 'created_date_pretty', 'updated_date_pretty', 'release_date_pretty');

    /**
     * @var TagManagerFixture
     */
    public static $fixture = null; // initialized below class definition

    /**
     * @dataProvider getExportApiForTesting
     */
    public function test_export($params, $testSuffix)
    {
        $api = 'TagManager.exportContainerVersion';
        $apiId = implode('_', $params) . '_' . $testSuffix;

        if (!empty($params['idContainerVersion']) && strpos($params['idContainerVersion'], 'idContainer1Version') === 0) {
            $params['idContainerVersion'] = self::$fixture->{$params['idContainerVersion']};
        }

        $params['token_auth'] = Fixture::getTokenAuth();
        $this->runAnyApiTest($api, $apiId, $params, array('xmlFieldsToRemove' => $this->fieldsToRemove, 'testSuffix' => $testSuffix));
    }

    public function getExportApiForTesting()
    {
        return array(
            array(
                array('idSite' => 999, 'idContainer' => self::$fixture->idContainer1),
                'container_site_not_found'),
            array(
                array('idSite' => self::$fixture->idSite2, 'idContainer' => 999),
                'container_not_found'),
            array(
                array('idSite' => self::$fixture->idSite2, 'idContainer' => self::$fixture->idContainer1, 'idContainerVersion' => 999),
                'container_version_not_found'),
            array(
                array('idSite' => self::$fixture->idSite2, 'idContainer' => self::$fixture->idContainer1),
                'container1_draft_detected_automatically'),
            array(
                array('idSite' => self::$fixture->idSite2,
                      'idContainer' => self::$fixture->idContainer1,
                      'idContainerVersion' => self::$fixture->idContainer1DraftVersion),
                'container1_draft_version'),
            array(
                array('idSite' => self::$fixture->idSite2,
                      'idContainer' => self::$fixture->idContainer1,
                      'idContainerVersion' => 'idContainer1Version1'),
                'container1_v1'),
            array(
                array('idSite' => self::$fixture->idSite2,
                      'idContainer' => self::$fixture->idContainer1,
                      'idContainerVersion' => 'idContainer1Version2'),
                'container1_v2'),
            array(
                array('idSite' => self::$fixture->idSite2,
                      'idContainer' => self::$fixture->idContainer1,
                      'idContainerVersion' => 'idContainer1Version3'),
                'container1_v3'),
            array(
                array('idSite' => self::$fixture->idSite2,
                      'idContainer' => self::$fixture->idContainer1,
                      'idContainerVersion' => 'idContainer1Version4'),
                'container1_v4'),
            array(
                array('idSite' => self::$fixture->idSite2,
                      'idContainer' => self::$fixture->idContainer1,
                      'idContainerVersion' => 'idContainer1Version5'),
                'container1_v5'),
            array(
                array('idSite' => self::$fixture->idSite2,
                      'idContainer' => self::$fixture->idContainer2,
                      'idContainerVersion' => self::$fixture->idContainer2DraftVersion),
                'container2_empty_container'),
            array(
                array('idSite' => self::$fixture->idSite4,
                    'idContainer' => self::$fixture->idContainer6,
                    'idContainerVersion' => self::$fixture->idContainer6DraftVersion),
                'container6_v1'),
        );
    }

    public function test_getContainerVariable()
    {
        $api = API::getInstance();
        $variables = $api->getContainerVariables(self::$fixture->idSite2, self::$fixture->idContainer1, self::$fixture->idContainer1DraftVersion);

        $exception = null;
        foreach ($variables as $var) {
            $params = array(
                'idSite' => self::$fixture->idSite2,
                'otherRequestParameters' => array(
                    'idContainer' => self::$fixture->idContainer1,
                    'idContainerVersion' => self::$fixture->idContainer1DraftVersion,
                    'idVariable' => $var['idvariable'],
                ),
                'testSuffix' => 'variable' . $var['idvariable']
            );

            $params['xmlFieldsToRemove'] = $this->fieldsToRemove;

            try {
                $this->runApiTests(array('TagManager.getContainerVariableReferences', 'TagManager.getContainerVariable'), $params);
            } catch (\PHPUnit\Framework\Exception $e) {
                $exception = $e;
                continue;
            }
        }
        if ($exception) {
            throw $exception;
        }
    }

    public function test_getContainerTrigger()
    {
        $api = API::getInstance();
        $triggers = $api->getContainerTriggers(self::$fixture->idSite2, self::$fixture->idContainer1, self::$fixture->idContainer1DraftVersion);

        $exception = null;
        foreach ($triggers as $var) {
            $params = array(
                'idSite' => self::$fixture->idSite2,
                'otherRequestParameters' => array(
                    'idContainer' => self::$fixture->idContainer1,
                    'idContainerVersion' => self::$fixture->idContainer1DraftVersion,
                    'idTrigger' => $var['idtrigger'],
                ),
                'testSuffix' => 'trigger' . $var['idtrigger']
            );

            $params['xmlFieldsToRemove'] = $this->fieldsToRemove;

            try {
                $this->runApiTests(array('TagManager.getContainerTriggerReferences', 'TagManager.getContainerTrigger'), $params);
            } catch (\PHPUnit\Framework\Exception $e) {
                $exception = $e;
                continue;
            }
        }
        if ($exception) {
            throw $exception;
        }
    }

    public function test_getContainerTag()
    {
        $api = API::getInstance();
        $tags = $api->getContainerTags(self::$fixture->idSite2, self::$fixture->idContainer1, self::$fixture->idContainer1DraftVersion);

        $exception = null;
        foreach ($tags as $var) {
            $params = array(
                'idSite' => self::$fixture->idSite2,
                'otherRequestParameters' => array(
                    'idContainer' => self::$fixture->idContainer1,
                    'idContainerVersion' => self::$fixture->idContainer1DraftVersion,
                    'idTag' => $var['idtag'],
                ),
                'testSuffix' => 'tag' . $var['idtag']
            );

            $params['xmlFieldsToRemove'] = $this->fieldsToRemove;

            try {
                $this->runApiTests(array('TagManager.getContainerTag'), $params);
            } catch (\PHPUnit\Framework\Exception $e) {
                $exception = $e;
                continue;
            }
        }
        if ($exception) {
            throw $exception;
        }
    }

    /**
     * @dataProvider getApiForTesting
     */
    public function testApi($api, $params)
    {
        if (empty($params)) {
            $params = array();
        }
        $params['xmlFieldsToRemove'] = $this->fieldsToRemove;
        $this->runApiTests($api, $params);
    }

    public function getApiForTesting()
    {
        $api = array(
            'TagManager.getAvailableContexts',
            'TagManager.getAvailableEnvironments',
            'TagManager.getAvailableTagFireLimits',
            'TagManager.getAvailableComparisons',
        );

        $apiToTest   = array();
        $apiToTest[] = array($api, array('testSuffix' => ''));

        $apiContextDependend = array(
            'TagManager.getAvailableTagTypesInContext',
            'TagManager.getAvailableTriggerTypesInContext',
            'TagManager.getAvailableVariableTypesInContext',
        );

        $apiToTest[] = array($apiContextDependend,
            array(
                'testSuffix' => 'webContext',
                'otherRequestParameters' => array(
                    'idContext' => WebContext::ID
                ),
            )
        );

        $apiToTest[] = array($apiContextDependend,
            array(
                'testSuffix' => 'iosContext',
                'otherRequestParameters' => array(
                    'idContext' => iOSContext::ID
                ),
            )
        );

        $apiToTest[] = array($apiContextDependend,
            array(
                'testSuffix' => 'androidContext',
                'otherRequestParameters' => array(
                    'idContext' => AndroidContext::ID
                ),
            )
        );

        $apiSiteDependend = array(
            'TagManager.getContainers',
            'TagManager.getAvailableEnvironmentsWithPublishCapability'
        );

        $apiToTest[] = array($apiSiteDependend,
            array(
                'idSite' => self::$fixture->idSite2,
                'testSuffix' => 'with_containers',
            )
        );

        $apiToTest[] = array($apiSiteDependend,
            array(
                'idSite' => self::$fixture->idSite5,
                'testSuffix' => 'no_containers',
            )
        );

        $apiContainerDependend = array(
            'TagManager.getContainer',
            'TagManager.getContainerVersions',
        );
        $containerDependend = array(
            self::$fixture->idContainer1 => 'with_versions_and_releases',
            self::$fixture->idContainer2 => 'only_one_version',
            self::$fixture->idContainer3 => 'empty_no_changes',
            'foobarbaz' => 'not_existing',
        );
        foreach ($containerDependend as $idContainer => $testSuffix) {
            $apiToTest[] = array($apiContainerDependend,
                array(
                    'idSite' => self::$fixture->idSite2,
                    'testSuffix' => $testSuffix,
                    'otherRequestParameters' => array(
                        'idContainer' => $idContainer
                    ),
                )
            );
        }

        $apiContainerVersionDependend = array(
            'TagManager.getContainerTags',
            'TagManager.getContainerTriggers',
            'TagManager.getContainerVariables',
            'TagManager.getAvailableContainerVariables',
            'TagManager.getContainerVersion',
        );
        $containerVersionDependend = array(
            array(
                'idContainer' => self::$fixture->idContainer1,
                'idContainerVersion' => self::$fixture->idContainer1DraftVersion,
                'testSuffix' => 'with_content'),
            array(
                'idContainer' => self::$fixture->idContainer2,
                'idContainerVersion' => self::$fixture->idContainer2DraftVersion,
                'testSuffix' => 'no_content'),
            array(
                'idContainer' => self::$fixture->idContainer2,
                'idContainerVersion' => 9999999,
                'testSuffix' => 'not_existing'),
        );
        foreach ($containerVersionDependend as $versionDependent) {
            $testSuffix = $versionDependent['testSuffix'];
            unset($versionDependent['testSuffix']);
            $apiToTest[] = array($apiContainerVersionDependend,
                array(
                    'idSite' => self::$fixture->idSite2,
                    'testSuffix' => $testSuffix,
                    'otherRequestParameters' => $versionDependent
                )
            );
        }

        $containerEnvironmentDependend = array(
            array(
                'idContainer' => self::$fixture->idContainer1,
                'environment' => Environment::ENVIRONMENT_LIVE,
                'testSuffix' => 'live_with_content'),
            array(
                'idContainer' => self::$fixture->idContainer1,
                'environment' => 'dev',
                'testSuffix' => 'dev_with_content'),
            array(
                'idContainer' => self::$fixture->idContainer1,
                'environment' => 'staging',
                'testSuffix' => 'stating_with_content'),
            array(
                'idContainer' => self::$fixture->idContainer1,
                'environment' => Environment::ENVIRONMENT_PREVIEW,
                'testSuffix' => 'preview_with_content'),
            array(
                'idContainer' => self::$fixture->idContainer1,
                'environment' => Environment::ENVIRONMENT_LIVE,
                'testSuffix' => 'with_content'),
            array(
                'idContainer' => self::$fixture->idContainer2,
                'environment' => Environment::ENVIRONMENT_LIVE,
                'testSuffix' => 'no_such_release'),
        );

        foreach ($containerEnvironmentDependend as $environmentDependent) {
            $testSuffix = $environmentDependent['testSuffix'];
            unset($environmentDependent['testSuffix']);
            $apiToTest[] = array(array('TagManager.getContainerInstallInstructions', 'TagManager.getContainerEmbedCode'),
                array(
                    'idSite' => self::$fixture->idSite2,
                    'testSuffix' => $testSuffix,
                    'otherRequestParameters' => $environmentDependent
                )
            );
        }

        return $apiToTest;
    }

    /**
     * THIS SHOULD ALWAYS BE THE LAST TEST IN THIS FILE AS IT CHANGES THE DB BY CREATING/IMPORTING DATA!!
     */
    public function test_import_with_backupname()
    {
        $exportDraftContainer1 = API::getInstance()->exportContainerVersion(self::$fixture->idSite2, self::$fixture->idContainer1);

        $idContainer = 'import01';
        self::$fixture->addContainer(self::$fixture->idSite5, $idContainer);

        $idDraftVersion = self::$fixture->getContainerDraftVersion(self::$fixture->idSite5, $idContainer);

        $api = 'TagManager.exportContainerVersion';
        $params = array('token_auth' => Fixture::getTokenAuth(), 'idContainer' => $idContainer, 'idSite' => self::$fixture->idSite5, 'idContainerVersion' => $idDraftVersion);
        $this->runAnyApiTest($api, 'import_with_backupname_before_import_into_draft', $params, array('xmlFieldsToRemove' => $this->fieldsToRemove));

        API::getInstance()->importContainerVersion(json_encode($exportDraftContainer1), self::$fixture->idSite5, $idContainer, 'v1imported');

        $api = 'TagManager.exportContainerVersion';
        $params = array('token_auth' => Fixture::getTokenAuth(), 'idContainer' => $idContainer, 'idSite' => self::$fixture->idSite5, 'idContainerVersion' => $idDraftVersion);
        $this->runAnyApiTest($api, 'import_with_backupname_after_import_into_draft', $params, array('xmlFieldsToRemove' => $this->fieldsToRemove));
        $this->runAnyApiTest('TagManager.getContainer', 'import_with_backupname_after_import_into_draft', $params, array('xmlFieldsToRemove' => $this->fieldsToRemove));
    }

    /**
     * THIS SHOULD ALWAYS BE THE LAST TEST IN THIS FILE AS IT CHANGES THE DB BY CREATING/IMPORTING DATA!!
     */
    public function test_import_without_backupname()
    {
        $exportDraftContainer1 = API::getInstance()->exportContainerVersion(self::$fixture->idSite2, self::$fixture->idContainer1);

        $idContainer = 'import02';
        self::$fixture->addContainer(self::$fixture->idSite4, $idContainer);

        $idDraftVersion = self::$fixture->getContainerDraftVersion(self::$fixture->idSite4, $idContainer);

        API::getInstance()->importContainerVersion(json_encode($exportDraftContainer1), self::$fixture->idSite4, $idContainer);

        $params = array('token_auth' => Fixture::getTokenAuth(), 'idContainer' => $idContainer, 'idSite' => self::$fixture->idSite4, 'idContainerVersion' => $idDraftVersion);

        $this->runAnyApiTest('TagManager.exportContainerVersion', 'import_without_backupname_after_import_into_draft', $params, array('xmlFieldsToRemove' => $this->fieldsToRemove));
        $this->runAnyApiTest('TagManager.getContainer', 'import_without_backupname_after_import_into_draft', $params, array('xmlFieldsToRemove' => $this->fieldsToRemove));
    }

    /**
     * THIS SHOULD ALWAYS BE THE LAST TEST IN THIS FILE AS IT CHANGES THE DB BY CREATING/IMPORTING DATA!!
     */
    public function test_import_possible_to_overwrite_itself()
    {
        $idSite = self::$fixture->idSite2;
        $idContainer = self::$fixture->idContainer1;
        $exportDraftContainer1 = API::getInstance()->exportContainerVersion($idSite, $idContainer);

        API::getInstance()->importContainerVersion(json_encode($exportDraftContainer1), $idSite, $idContainer);

        $params = array('token_auth' => Fixture::getTokenAuth(), 'idContainer' => $idContainer, 'idSite' => $idSite);

        $this->runAnyApiTest('TagManager.exportContainerVersion', 'import_overwrite_itself', $params, array('xmlFieldsToRemove' => $this->fieldsToRemove));
        $this->runAnyApiTest('TagManager.getContainer', 'import_overwrite_itself', $params, array('xmlFieldsToRemove' => $this->fieldsToRemove));
    }

    public function test_addSite_createsDefaultContainer()
    {
        $idSite = Request::processRequest('SitesManager.addSite', array(
            'siteName' => 'mySite'
        ));
        $this->assertNotEmpty($idSite);

        $containers = Request::processRequest('TagManager.getContainers', array(
            'idSite' => $idSite
        ));
        $this->assertNotEmpty($containers);
        $idContainer = $containers[0]['idcontainer'];

        $params = array('token_auth' => Fixture::getTokenAuth(), 'idContainer' => $idContainer, 'idSite' => $idSite);

        $this->runAnyApiTest('TagManager.exportContainerVersion', 'site_default_container', $params, array('xmlFieldsToRemove' => $this->fieldsToRemove));
    }

    public static function getOutputPrefix()
    {
        return '';
    }

    public static function getPathToTestDirectory()
    {
        return dirname(__FILE__);
    }


    public static function provideContainerConfigBeforeClass()
    {
        $generator = new FixedIdGenerator();
        return array(
            'Piwik\Plugins\TagManager\Model\Container\ContainerIdGenerator' => $generator,
            'Piwik\Plugins\TagManager\Model\Salt' => function () {
                return new Salt(sha1('foobar'));
            }
        );
    }
}

APITest::$fixture = new TagManagerFixture();
