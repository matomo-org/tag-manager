<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugins\TagManager\tests\Fixtures;

use Piwik\Container\StaticContainer;
use Piwik\Date;
use Piwik\Plugins\TagManager\API;
use Piwik\Plugins\TagManager\Context\WebContext;
use Piwik\Plugins\TagManager\Dao\ContainersDao;
use Piwik\Plugins\TagManager\Model\Comparison;
use Piwik\Plugins\TagManager\Model\Container\StaticContainerIdGenerator;
use Piwik\Plugins\TagManager\Model\Environment;
use Piwik\Plugins\TagManager\Model\Tag;
use Piwik\Plugins\TagManager\Template\Tag\CustomHtmlTag;
use Piwik\Plugins\TagManager\Template\Trigger\CustomEventTrigger;
use Piwik\Plugins\TagManager\Template\Trigger\WindowLoadedTrigger;
use Piwik\Plugins\TagManager\Template\Variable\DataLayerVariable;
use Piwik\Plugins\TagManager\Template\Variable\PreConfigured\ErrorUrlVariable;
use Piwik\Tests\Framework\Fixture;

class TagManagerFixture extends Fixture
{
    public $dateTime = '2013-01-23 01:23:45';
    public $idSite = 1;
    public $idSite2 = 2;
    public $idSite3 = 3;
    public $idSite4 = 4;
    public $idSite5 = 5;

    public $idContainer1 = 'aaacont1';
    public $idContainer1DraftVersion = 1;
    public $idContainer1Version1;
    public $idContainer1Version2;
    public $idContainer1Version3;
    public $idContainer1Version4;
    public $idContainer1Version5;
    public $idContainer2 = 'aaacont2';
    public $idContainer2DraftVersion = 2;
    public $idContainer3 = 'aaacont3';
    public $idContainer3DraftVersion = 3;
    public $idContainer4 = 'aaacont4';
    public $idContainer4DraftVersion = 4;
    public $idContainer5 = 'aaacont5';
    public $idContainer5DraftVersion = 5;

    /**
     * @var API
     */
    private $api;

    public function setUp(): void
    {
        $this->setUpWebsite();
        $this->setUpContainers();
        $this->trackFirstVisit();
    }

    public function tearDown(): void
    {
        // empty
    }

    public function setUpWebsite()
    {
        for ($i = 1; $i <= 5; $i++) {
            if (!self::siteCreated($i)) {
                $idSite = self::createWebsite($this->dateTime, $ecommerce = 1, 'Site' . $i, $siteUrl = false,
                    $siteSearch = 1, $searchKeywordParameters = null,
                    $searchCategoryParameters = null, $timezone = null, $type = 'mobileapp');
                // we set type "mobileapp" to avoid the creation of a default container
                $this->assertSame($i, $idSite);
            }
        }
    }

    public function setUpContainers()
    {
        $this->initIfNeeded();
        $this->setUpWebsite();

        $this->addContainer($this->idSite2, $this->idContainer1, 'Container1');
        $idContainer1DraftVersion = $this->getContainerDraftVersion($this->idSite2, $this->idContainer1);
        self::assertSame($this->idContainer1DraftVersion, $idContainer1DraftVersion);

        $this->addContainer($this->idSite2, $this->idContainer2, 'Container2', 'My container 2 description');
        $idContainer2DraftVersion = $this->getContainerDraftVersion($this->idSite2, $this->idContainer2);
        self::assertSame($this->idContainer2DraftVersion, $idContainer2DraftVersion);

        $this->addContainer($this->idSite2, $this->idContainer3, 'Container3', 'My container 3 description');
        $idContainer3DraftVersion = $this->getContainerDraftVersion($this->idSite2, $this->idContainer3);
        self::assertSame($this->idContainer3DraftVersion, $idContainer3DraftVersion);

        $this->addContainer($this->idSite3, $this->idContainer4, 'Container4');
        $idContainer4DraftVersion = $this->getContainerDraftVersion($this->idSite3, $this->idContainer4);
        self::assertSame($this->idContainer4DraftVersion, $idContainer4DraftVersion);

        $this->addContainer($this->idSite4, $this->idContainer5, 'Container5', 'My container 5 description');
        $idContainer5DraftVersion = $this->getContainerDraftVersion($this->idSite4, $this->idContainer5);
        self::assertSame($this->idContainer5DraftVersion, $idContainer5DraftVersion);

        $this->api->createContainerVersion($this->idSite2, $this->idContainer2, 'container2_v1', 'Version from draft without content');

        $idTrigger1Container1 = $this->addContainerTrigger($this->idSite2, $this->idContainer1, $this->idContainer1DraftVersion, null, 'My trigger1');
        $idTrigger2Container1 = $this->addContainerTrigger($this->idSite2, $this->idContainer1, $this->idContainer1DraftVersion, WindowLoadedTrigger::ID, 'Mytrigger2', $params = array(), $conditions = array(array('actual' => ErrorUrlVariable::ID, 'comparison' => Comparison::ID_CONTAINS, 'expected' => 'foo')));
        $idTrigger3Container1 = $this->addContainerTrigger($this->idSite2, $this->idContainer1, $this->idContainer1DraftVersion, 'DomReady', 'Mytrigger3', $params = array());

        $this->idContainer1Version1 = $this->api->createContainerVersion($this->idSite2, $this->idContainer1, 'container1_v1', 'Version from draft with only triggers');

        $this->addContainerTag($this->idSite2, $this->idContainer1, $this->idContainer1DraftVersion, null, 'My Tag 1', array($idTrigger1Container1));
        $this->addContainerTag($this->idSite2, $this->idContainer1, $this->idContainer1DraftVersion, 'CustomHtml', 'My Tag 2', array($idTrigger1Container1), array($idTrigger2Container1), $params = array('customHtml' => '<script></script>'), Tag::FIRE_LIMIT_ONCE_IN_LIFETIME, $fireDelay = 1350, $priority = 343, $startDate = '2017-01-02 03:04:05', $endDate = '2029-01-02 03:04:05');
        $this->addContainerTag($this->idSite2, $this->idContainer1, $this->idContainer1DraftVersion, 'CustomImage', 'My Tag 3', array($idTrigger2Container1, $idTrigger3Container1), $blockTriggers = array(), $params = array('customImageSrc' => '/plugins/tracking.png'));

        $this->idContainer1Version2 = $this->api->createContainerVersion($this->idSite2, $this->idContainer1, 'container1_v2', 'Version from draft with tags and triggers');

        $this->addContainerVariable($this->idSite2, $this->idContainer1, $this->idContainer1DraftVersion, null, 'My Var 1', $parameters = array('dataLayerName' => 'fooBarName'), $default = 10, $lookUp = array(array('match_value' => 'foo', 'comparison' => Comparison::ID_EQUALS, 'out_value' => 'bar')));
        $this->addContainerVariable($this->idSite2, $this->idContainer1, $this->idContainer1DraftVersion, null, 'My Var 2');

        $this->idContainer1Version3 = $this->api->createContainerVersion($this->idSite2, $this->idContainer1, 'container1_v3', 'Version from draft with tags, triggers and variables');
        $this->idContainer1Version4 = $this->api->createContainerVersion($this->idSite2, $this->idContainer1, 'container1_v4_reversioned', 'new version from an older version', $this->idContainer1Version2);

        $this->addContainerVariable($this->idSite2, $this->idContainer1, $this->idContainer1DraftVersion, null, 'My Var 3');

        $idTrigger1Container4 = $this->addContainerTrigger($this->idSite2, $this->idContainer1, $this->idContainer1DraftVersion, null, 'My trigger4', array('eventName' => 'foo{{My Var 3}}bar{{My Var 2}}baz{{PageUrl}}yeah'));

        $this->idContainer1Version5 = $this->api->createContainerVersion($this->idSite2, $this->idContainer1, 'container1_v5', 'Version with linked variables');

        $this->api->publishContainerVersion($this->idSite2, $this->idContainer1, $this->idContainer1Version4, Environment::ENVIRONMENT_LIVE);
        $this->api->publishContainerVersion($this->idSite2, $this->idContainer1, $this->idContainer1Version4, 'dev');
        $this->api->publishContainerVersion($this->idSite2, $this->idContainer1, $this->idContainer1Version5, 'staging');
        $this->api->enablePreviewMode($this->idSite2, $this->idContainer1);

        $containerDao = new ContainersDao();
        foreach ($containerDao->getAllContainers() as $container) {
            $containerDao->updateContainerColumns($container['idsite'], $container['idcontainer'], array(
                'created_date' => $this->dateTime
            ));
        }
    }

    public function addContainer($idSite, $idContainer, $name = 'My Name', $description = '', $context = null)
    {
        $this->initIfNeeded();
        if (!isset($context)) {
            $context = WebContext::ID;
        }

        /** @var \Piwik\Plugins\TagManager\Model\Container $container */
        $container = StaticContainer::getContainer()->make('Piwik\Plugins\TagManager\Model\Container', array(
            'containerIdGenerator' => new StaticContainerIdGenerator($idContainer)
        ));

        return $container->addContainer($idSite, $context, $name, $description);
    }

    public function updateContainer($idSite, $idContainer, $name = 'Updated Name', $description = '')
    {
        $this->initIfNeeded();
        return $this->api->updateContainer($idSite, $idContainer, $name, $description);
    }

    public function getContainerDraftVersion($idSite, $idContainer)
    {
        $containerVersion = $this->api->getContainer($idSite, $idContainer);
        if (!empty($containerVersion['draft']['idcontainerversion'])) {
            return $containerVersion['draft']['idcontainerversion'];
        }
    }

    public function addContainerTrigger($idSite, $idContainer, $idContainerVersion, $type = null, $name = 'MyName', $parameters = array('eventName' => 'foo'), $conditions = array())
    {
        $this->initIfNeeded();

        if (!isset($type)) {
            $type = CustomEventTrigger::ID;
        }

        return $this->api->addContainerTrigger($idSite, $idContainer, $idContainerVersion, $type, $name, $parameters, $conditions);
    }

    public function addContainerVariable($idSite, $idContainer, $idContainerVersion = 5, $type = null, $name = 'MyName', $parameters = array('dataLayerName' => 'dataVarName'), $defaultValue = '', $lookupTable = array())
    {
        if (!isset($type)) {
            $type = DataLayerVariable::ID;
        }

        return $this->api->addContainerVariable($idSite, $idContainer, $idContainerVersion, $type, $name, $parameters, $defaultValue, $lookupTable);
    }

    public function updateContainerVariable($idSite, $idContainer, $idContainerVersion, $idVariable, $name = 'MyName', $parameters = array(), $defaultValue = '', $lookupTable = array())
    {
        return $this->api->updateContainerVariable($idSite, $idContainer, $idContainerVersion, $idVariable, $name, $parameters, $defaultValue, $lookupTable);
    }

    public function addContainerTag($idSite, $idContainer, $idContainerVersion, $type = null, $name = 'TagName', $fireTriggerIds = array(), $blockTriggerIds = array(), $parameters = array('customHtml' => '<p></p>'), $fireLimit = null, $fireDelay = 0, $priority = 999, $startDate = null, $endDate = null)
    {
        $this->initIfNeeded();

        if (!isset($type)) {
            $type = CustomHtmlTag::ID;
        }
        if (!isset($fireLimit)) {
            $fireLimit = Tag::FIRE_LIMIT_UNLIMITED;
        }

        return $this->api->addContainerTag($idSite, $idContainer, $idContainerVersion, $type, $name, $parameters, $fireTriggerIds, $blockTriggerIds, $fireLimit, $fireDelay, $priority, $startDate, $endDate);
    }

    protected function initIfNeeded()
    {
        if (!$this->api) {
            $this->api = API::getInstance();
        }
    }

    protected function trackFirstVisit()
    {
        $t = self::getTracker($this->idSite, $this->dateTime, $defaultInit = true);

        $t->setForceVisitDateTime(Date::factory($this->dateTime)->addHour(0.1)->getDatetime());
        $t->setUrl('http://example.com/');
        self::checkResponse($t->doTrackPageView('Viewing homepage'));
    }

}