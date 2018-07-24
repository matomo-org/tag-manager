<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\TagManager\tests\Integration\Model;

use Piwik\Container\StaticContainer;
use Piwik\Plugins\TagManager\Dao\TagsDao;
use Piwik\Plugins\TagManager\Input\Name;
use Piwik\Plugins\TagManager\Model\Tag;
use Piwik\Plugins\TagManager\TagManager;
use Piwik\Plugins\TagManager\Template\Tag\CustomHtmlTag;
use Piwik\Plugins\TagManager\Template\Trigger\WindowLoadedTrigger;
use Piwik\Plugins\TagManager\tests\Framework\TestCase\IntegrationTestCase;
use Piwik\Tests\Framework\Fixture;

/**
 * @group TagManager
 * @group TagTest
 * @group Tag
 * @group Plugins
 */
class TagTest extends IntegrationTestCase
{
    private $now = '2018-01-01 02:03:04';

    /**
     * @var int
     */
    private $idSite;
    private $idSite2;
    private $idTrigger1;
    private $idTrigger2;
    private $idTrigger3;
    private $idTrigger4;

    private $containerVersion1 = 5;
    private $containerVersion2 = 6;

    private $idTag1;

    /**
     * @var TagsDao;
     */
    private $dao;

    /**
     * @var Tag
     */
    private $model;

    public function setUp()
    {
        parent::setUp();

        TagManager::$enableAutoContainerCreation = false;
        $this->idSite = Fixture::createWebsite('2014-03-04 05:06:07');
        $this->idSite2 = Fixture::createWebsite('2014-03-04 05:06:07');
        $this->dao = StaticContainer::get('Piwik\Plugins\TagManager\Dao\TagsDao');
        $this->model = StaticContainer::get('Piwik\Plugins\TagManager\Model\Tag');
        $this->model->setCurrentDateTime($this->now);

        $trigger = StaticContainer::get('Piwik\Plugins\TagManager\Model\Trigger');
        $this->idTrigger1 = $trigger->addContainerTrigger($this->idSite, $this->containerVersion1, WindowLoadedTrigger::ID, 'MyTrigger1', array(), array());
        $this->idTrigger2 = $trigger->addContainerTrigger($this->idSite, $this->containerVersion2, WindowLoadedTrigger::ID, 'MyTrigger2', array(), array());
        $this->idTrigger3 = $trigger->addContainerTrigger($this->idSite, $this->containerVersion1, WindowLoadedTrigger::ID, 'MyTrigger3', array(), array());
        $this->idTrigger4 = $trigger->addContainerTrigger($this->idSite2, $this->containerVersion1, WindowLoadedTrigger::ID, 'MyTrigger3', array(), array());

        $this->idTag1 = $this->addContainerTag($this->idSite, $this->containerVersion1, null, 'InitialTag1', array('customHtml' => '<script></script>'));
    }

    public function tearDown()
    {
        TagManager::$enableAutoContainerCreation = true;
        parent::tearDown();
    }

    public function test_getFireLimits()
    {
        $fireLimits = $this->model->getFireLimits();
        $expected = array (
            array (
                'id' => 'unlimited',
                'name' => 'Unlimited',
            ),
            array (
                'id' => 'once_page',
                'name' => 'Once per pageview',
            ),
            array (
                'id' => 'once_24hours',
                'name' => 'Once per 24 hours',
            ),
            array (
                'id' => 'once_lifetime',
                'name' => 'Once in lifetime',
            ),
        );
        $this->assertSame($expected, $fireLimits);
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage idSite: An unexpected website was found
     */
    public function test_addContainerTag_invalidSite()
    {
        $this->addContainerTag($idSite = 999);
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Name: The value contains
     */
    public function test_addContainerTag_invalidName()
    {
        $this->addContainerTag($this->idSite, $this->containerVersion1, $type = null, str_pad('4', Name::MAX_LENGTH + 1));
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Custom HTML: A value needs to be provided.
     */
    public function test_addContainerTag_missingParameter()
    {
        $this->addContainerTag($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = array(), array($this->idTrigger1));
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Custom HTML: A value needs to be provided.
     */
    public function test_addContainerTag_invalidParameter()
    {
        $this->addContainerTag($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = array('customHtml' => ''), array($this->idTrigger1));
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Fire Trigger: A value needs to be provided.
     */
    public function test_addContainerTag_missingFireTrigger()
    {
        $this->addContainerTag($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = array('customHtml' => '<div></div>'), array());
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Fire Trigger: The trigger "2"
     */
    public function test_addContainerTag_invalidFireTrigger()
    {
        $this->addContainerTag($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = array('customHtml' => '<div></div>'), array($this->idTrigger2));
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Block Trigger: The trigger "9999"
     */
    public function test_addContainerTag_invalidBlockTrigger()
    {
        $this->addContainerTag($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = array('customHtml' => '<div></div>'), array($this->idTrigger1), array(9999));
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Fire limit: The value "firelimit" is not allowed
     */
    public function test_addContainerTag_invalidFireLimit()
    {
        $this->addContainerTag($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = array('customHtml' => '<div></div>'), array($this->idTrigger1), array(), 'firelimit');
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Fire delay: The value is not a number.
     */
    public function test_addContainerTag_invalidFireDelay()
    {
        $this->addContainerTag($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = array('customHtml' => '<div></div>'), array($this->idTrigger1), array(), Tag::FIRE_LIMIT_UNLIMITED, 'foobar99999999999');
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Priority: The value is not a number.
     */
    public function test_addContainerTag_invalidPriority()
    {
        $this->addContainerTag($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = array('customHtml' => '<div></div>'), array($this->idTrigger1), array(), Tag::FIRE_LIMIT_UNLIMITED, 9, 'foobar99999999999');
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Start date: Date format must be
     */
    public function test_addContainerTag_invalidStartDate()
    {
        $this->addContainerTag($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = array('customHtml' => '<div></div>'), array($this->idTrigger1), array(), Tag::FIRE_LIMIT_UNLIMITED, 9, '99', '2099-43-31 14:99:99');
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage End date: Date format must be
     */
    public function test_addContainerTag_invalidEndDate()
    {
        $this->addContainerTag($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = array('customHtml' => '<div></div>'), array($this->idTrigger1), array(), Tag::FIRE_LIMIT_UNLIMITED, 9, '99', '2018-03-01 01:01:01', '2099-43-31 14:99:99');
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The start date needs to be earlier than the end date
     */
    public function test_addContainerTag_endDateBeforeStartDate()
    {
        $this->addContainerTag($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = array('customHtml' => '<div></div>'), array($this->idTrigger1), array(), Tag::FIRE_LIMIT_UNLIMITED, 9, '99', '2018-03-01 01:01:01', '2017-03-01 01:01:01');
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The tag "foobarbaz" is not supported
     */
    public function test_addContainerTag_invalidType()
    {
        $this->addContainerTag($this->idSite, $this->containerVersion1, $type = 'foobarbaz', 'MyName', $parameters = array('customHtml' => '<div></div>'), array($this->idTrigger1), array(), Tag::FIRE_LIMIT_UNLIMITED);
    }

    public function test_addContainerTag_successMinimal()
    {
        $idTag = $this->addContainerTag($this->idSite, $this->containerVersion1, CustomHtmlTag::ID, 'MyName', $parameters = array('customHtml' => '<div></div>'), array($this->idTrigger1), array(), Tag::FIRE_LIMIT_UNLIMITED, 0, '0', false, false);
        $this->assertSame(2, $idTag);

        $tag = $this->model->getContainerTag($this->idSite, $this->containerVersion1, $idTag);

        $expected = array (
            'idtag' => 2,
            'idcontainerversion' => 5,
            'idsite' => 1,
            'type' => 'CustomHtml',
            'name' => 'MyName',
            'status' => 'active',
            'parameters' =>
                array (
                    'customHtml' => '<div></div>',
                    'htmlPosition' => 'bodyEnd'
                ),
            'fire_trigger_ids' => array (1),
            'block_trigger_ids' => array (),
            'fire_limit' => 'unlimited',
            'priority' => '0',
            'fire_delay' => '0',
            'start_date' => null,
            'end_date' => null,
            'created_date' => '2018-01-01 02:03:04',
            'updated_date' => '2018-01-01 02:03:04',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Jan 1, 2018 02:03:04',
            'typeMetadata' =>
                array (
                    'id' => 'CustomHtml',
                    'name' => 'Custom HTML',
                    'description' => 'Allows you to embed any custom HTML, for example JavaScript or CSS Styles.',
                    'category' => 'Custom',
                    'icon' => 'plugins/TagManager/images/icons/code.svg',
                    'help' => 'The Custom HTML tag allows you to embed any tag which is not supported yet. The possibilities with this trigger are pretty much unlimited.',
                    'order' => 9999,
                    'contexts' =>
                        array ('web'),
                    'hasAdvancedSettings' => true,
                    'isCustomTemplate' => true,
                    'parameters' =>
                        array (
                                array (
                                    'name' => 'customHtml',
                                    'title' => 'Custom HTML',
                                    'value' => '<div></div>',
                                    'defaultValue' => '',
                                    'type' => 'string',
                                    'uiControl' => 'textarea',
                                    'uiControlAttributes' =>
                                        array (
                                        ),
                                    'availableValues' => NULL,
                                    'description' => 'This tag is ideal when you need to add for example custom styles or custom JavaScript or when you are looking for a specific tag which is not yet supported. With this tag you can append any HTML to the bottom of your page, add styles, or execute JavaScript. Note: You can replace content within the HTML with variables by putting a variable name in curly brackets like this {{PageUrl}}.',
                                    'inlineHelp' => '<a href="https://matomo.org/faq/tag-manager/faq_26815/">Learn more</a>',
                                    'templateFile' => 'plugins/TagManager/angularjs/form-field/field-textarea-variable-template.html',
                                    'introduction' => NULL,
                                    'condition' => NULL,
                                ),
                                array (
                                    'name' => 'htmlPosition',
                                    'title' => 'Position',
                                    'value' => 'bodyEnd',
                                    'defaultValue' => 'bodyEnd',
                                    'type' => 'string',
                                    'uiControl' => 'select',
                                    'uiControlAttributes' => array(),
                                    'availableValues' => array(
                                        'headStart' => 'Head Start',
                                        'headEnd' => 'Head End',
                                        'bodyStart' => 'Body Start',
                                        'bodyEnd' => 'Body End',
                                    ),
                                    'description' => 'Define the position of where the HTML should be inserted into your website.',
                                    'inlineHelp' => null,
                                    'templateFile' => '',
                                    'introduction' => null,
                                    'condition' => null,
                            )
                        ),
                ),
        );

        $tag['typeMetadata']['parameters'][1]['availableValues'] = (array) $tag['typeMetadata']['parameters'][1]['availableValues'];
        $this->assertSame($expected, $tag);
    }

    public function test_addContainerTag_successFull()
    {
        $idTag = $this->addContainerTag($this->idSite, $this->containerVersion1, CustomHtmlTag::ID, 'MyName', $parameters = array('customHtml' => '<div></div>'), array($this->idTrigger1), array($this->idTrigger3), Tag::FIRE_LIMIT_ONCE_IN_LIFETIME, 9, '99', '2017-03-01 01:01:01', '2018-03-01 01:01:01');
        $this->assertSame(2, $idTag);

        $tag = $this->model->getContainerTag($this->idSite, $this->containerVersion1, $idTag);

        $expected = array (
            'idtag' => $idTag,
            'idcontainerversion' => 5,
            'idsite' => 1,
            'type' => 'CustomHtml',
            'name' => 'MyName',
            'status' => 'active',
            'parameters' =>
                array (
                    'customHtml' => '<div></div>',
                    'htmlPosition' => 'bodyEnd'
                ),
            'fire_trigger_ids' =>[1],
            'block_trigger_ids' =>[3],
            'fire_limit' => 'once_lifetime',
            'priority' => '99',
            'fire_delay' => '9',
            'start_date' => '2017-03-01 01:01:01',
            'end_date' => '2018-03-01 01:01:01',
            'created_date' => '2018-01-01 02:03:04',
            'updated_date' => '2018-01-01 02:03:04',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Jan 1, 2018 02:03:04',
            'typeMetadata' =>
                array (
                    'id' => 'CustomHtml',
                    'name' => 'Custom HTML',
                    'description' => 'Allows you to embed any custom HTML, for example JavaScript or CSS Styles.',
                    'category' => 'Custom',
                    'icon' => 'plugins/TagManager/images/icons/code.svg',
                    'help' => 'The Custom HTML tag allows you to embed any tag which is not supported yet. The possibilities with this trigger are pretty much unlimited.',
                    'order' => 9999,
                    'contexts' =>['web'],
                    'hasAdvancedSettings' => true,
                    'isCustomTemplate' => true,
                    'parameters' =>
                        array (
                                array (
                                    'name' => 'customHtml',
                                    'title' => 'Custom HTML',
                                    'value' => '<div></div>',
                                    'defaultValue' => '',
                                    'type' => 'string',
                                    'uiControl' => 'textarea',
                                    'uiControlAttributes' =>
                                        array (
                                        ),
                                    'availableValues' => NULL,
                                    'description' => 'This tag is ideal when you need to add for example custom styles or custom JavaScript or when you are looking for a specific tag which is not yet supported. With this tag you can append any HTML to the bottom of your page, add styles, or execute JavaScript. Note: You can replace content within the HTML with variables by putting a variable name in curly brackets like this {{PageUrl}}.',
                                    'inlineHelp' => '<a href="https://matomo.org/faq/tag-manager/faq_26815/">Learn more</a>',
                                    'templateFile' => 'plugins/TagManager/angularjs/form-field/field-textarea-variable-template.html',
                                    'introduction' => NULL,
                                    'condition' => NULL,
                                ),
                                array (
                                    'name' => 'htmlPosition',
                                    'title' => 'Position',
                                    'value' => 'bodyEnd',
                                    'defaultValue' => 'bodyEnd',
                                    'type' => 'string',
                                    'uiControl' => 'select',
                                    'uiControlAttributes' => array(),
                                    'availableValues' => array(
                                        'headStart' => 'Head Start',
                                        'headEnd' => 'Head End',
                                        'bodyStart' => 'Body Start',
                                        'bodyEnd' => 'Body End',
                                    ),
                                    'description' => 'Define the position of where the HTML should be inserted into your website.',
                                    'inlineHelp' => null,
                                    'templateFile' => '',
                                    'introduction' => null,
                                    'condition' => null,
                                )
                        ),
                ),
        );

        $tag['typeMetadata']['parameters'][1]['availableValues'] = (array) $tag['typeMetadata']['parameters'][1]['availableValues'];
        $this->assertSame($expected, $tag);
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage idSite: An unexpected website was found
     */
    public function test_updateContainerTag_invalidSite()
    {
        $this->updateContainerTag($idSite = 999, $this->containerVersion1, $this->idTag1);
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Name: The value contains
     */
    public function test_updateContainerTag_invalidName()
    {
        $this->updateContainerTag($this->idSite, $this->containerVersion1, $this->idTag1, str_pad('4', Name::MAX_LENGTH + 1));
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Custom HTML: A value needs to be provided.
     */
    public function test_updateContainerTag_invalidParameter()
    {
        $this->updateContainerTag($this->idSite, $this->containerVersion1, $this->idTag1, 'MyName', $parameters = array('customHtml' => ''), array($this->idTrigger1));
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Fire Trigger: A value needs to be provided.
     */
    public function test_updateContainerTag_missingFireTrigger()
    {
        $this->updateContainerTag($this->idSite, $this->containerVersion1, $this->idTag1, 'MyName', $parameters = array('customHtml' => '<div></div>'), array());
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Fire Trigger: The trigger "2"
     */
    public function test_updateContainerTag_invalidFireTrigger()
    {
        $this->updateContainerTag($this->idSite, $this->containerVersion1, $this->idTag1, 'MyName', $parameters = array('customHtml' => '<div></div>'), array($this->idTrigger2));
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Block Trigger: The trigger "9999"
     */
    public function test_updateContainerTag_invalidBlockTrigger()
    {
        $this->updateContainerTag($this->idSite, $this->containerVersion1, $this->idTag1, 'MyName', $parameters = array('customHtml' => '<div></div>'), array($this->idTrigger1), array(9999));
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Fire limit: The value "firelimit" is not allowed
     */
    public function test_updateContainerTag_invalidFireLimit()
    {
        $this->updateContainerTag($this->idSite, $this->containerVersion1, $this->idTag1, 'MyName', $parameters = array('customHtml' => '<div></div>'), array($this->idTrigger1), array(), 'firelimit');
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Fire delay: The value is not a number.
     */
    public function test_updateContainerTag_invalidFireDelay()
    {
        $this->updateContainerTag($this->idSite, $this->containerVersion1, $this->idTag1, 'MyName', $parameters = array('customHtml' => '<div></div>'), array($this->idTrigger1), array(), Tag::FIRE_LIMIT_UNLIMITED, 'foobar99999999999');
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Priority: The value is not a number.
     */
    public function test_updateContainerTag_invalidPriority()
    {
        $this->updateContainerTag($this->idSite, $this->containerVersion1, $this->idTag1, 'MyName', $parameters = array('customHtml' => '<div></div>'), array($this->idTrigger1), array(), Tag::FIRE_LIMIT_UNLIMITED, 9, 'foobar99999999999');
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Start date: Date format must be
     */
    public function test_updateContainerTag_invalidStartDate()
    {
        $this->updateContainerTag($this->idSite, $this->containerVersion1, $this->idTag1, 'MyName', $parameters = array('customHtml' => '<div></div>'), array($this->idTrigger1), array(), Tag::FIRE_LIMIT_UNLIMITED, 9, '99', '2099-43-31 14:99:99');
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage End date: Date format must be
     */
    public function test_updateContainerTag_invalidEndDate()
    {
        $this->updateContainerTag($this->idSite, $this->containerVersion1, $this->idTag1, 'MyName', $parameters = array('customHtml' => '<div></div>'), array($this->idTrigger1), array(), Tag::FIRE_LIMIT_UNLIMITED, 9, '99', '2018-03-01 01:01:01', '2099-43-31 14:99:99');
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage The start date needs to be earlier than the end date
     */
    public function test_updateContainerTag_endDateBeforeStartDate()
    {
        $this->updateContainerTag($this->idSite, $this->containerVersion1, $this->idTag1, 'MyName', $parameters = array('customHtml' => '<div></div>'), array($this->idTrigger1), array(), Tag::FIRE_LIMIT_UNLIMITED, 9, '99', '2018-03-01 01:01:01', '2017-03-01 01:01:01');
    }

    public function test_updateContainerTag_success()
    {
        $this->model->setCurrentDateTime('2018-02-01 05:06:07');
        $this->updateContainerTag($this->idSite, $this->containerVersion1, $this->idTag1, 'MyUpdatedName', $parameters = array('customHtml' => '<div></div>'), array($this->idTrigger1), array($this->idTrigger3), Tag::FIRE_LIMIT_ONCE_IN_LIFETIME, 9, '99', '2017-03-01 01:01:01', '2018-03-01 01:01:01');

        $tag = $this->model->getContainerTag($this->idSite, $this->containerVersion1, $this->idTag1);

        $expected = array (
            'idtag' => $this->idTag1,
            'idcontainerversion' => 5,
            'idsite' => 1,
            'type' => 'CustomHtml',
            'name' => 'MyUpdatedName',
            'status' => 'active',
            'parameters' =>
                array (
                    'customHtml' => '<div></div>',
                    'htmlPosition' => 'bodyEnd'
                ),
            'fire_trigger_ids' =>[1],
            'block_trigger_ids' =>[3],
            'fire_limit' => 'once_lifetime',
            'priority' => '99',
            'fire_delay' => '9',
            'start_date' => '2017-03-01 01:01:01',
            'end_date' => '2018-03-01 01:01:01',
            'created_date' => '2018-01-01 02:03:04',
            'updated_date' => '2018-02-01 05:06:07',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Feb 1, 2018 05:06:07',
            'typeMetadata' =>
                array (
                    'id' => 'CustomHtml',
                    'name' => 'Custom HTML',
                    'description' => 'Allows you to embed any custom HTML, for example JavaScript or CSS Styles.',
                    'category' => 'Custom',
                    'icon' => 'plugins/TagManager/images/icons/code.svg',
                    'help' => 'The Custom HTML tag allows you to embed any tag which is not supported yet. The possibilities with this trigger are pretty much unlimited.',
                    'order' => 9999,
                    'contexts' =>['web'],
                    'hasAdvancedSettings' => true,
                    'isCustomTemplate' => true,
                    'parameters' =>
                        array (
                            array (
                                'name' => 'customHtml',
                                'title' => 'Custom HTML',
                                'value' => '<div></div>',
                                'defaultValue' => '',
                                'type' => 'string',
                                'uiControl' => 'textarea',
                                'uiControlAttributes' =>
                                    array (
                                    ),
                                'availableValues' => NULL,
                                'description' => 'This tag is ideal when you need to add for example custom styles or custom JavaScript or when you are looking for a specific tag which is not yet supported. With this tag you can append any HTML to the bottom of your page, add styles, or execute JavaScript. Note: You can replace content within the HTML with variables by putting a variable name in curly brackets like this {{PageUrl}}.',
                                'inlineHelp' => '<a href="https://matomo.org/faq/tag-manager/faq_26815/">Learn more</a>',
                                'templateFile' => 'plugins/TagManager/angularjs/form-field/field-textarea-variable-template.html',
                                'introduction' => NULL,
                                'condition' => NULL,
                            ),
                            array (
                                'name' => 'htmlPosition',
                                'title' => 'Position',
                                'value' => 'bodyEnd',
                                'defaultValue' => 'bodyEnd',
                                'type' => 'string',
                                'uiControl' => 'select',
                                'uiControlAttributes' => array(),
                                'availableValues' => array(
                                    'headStart' => 'Head Start',
                                    'headEnd' => 'Head End',
                                    'bodyStart' => 'Body Start',
                                    'bodyEnd' => 'Body End',
                                ),
                                'description' => 'Define the position of where the HTML should be inserted into your website.',
                                'inlineHelp' => null,
                                'templateFile' => '',
                                'introduction' => null,
                                'condition' => null,
                            )
                        ),
                ),
        );

        $tag['typeMetadata']['parameters'][1]['availableValues'] = (array) $tag['typeMetadata']['parameters'][1]['availableValues'];
        $this->assertSame($expected, $tag);
    }

    public function test_getContainer()
    {
        // no need to create new test for this
        $this->test_addContainerTag_successFull();
        $this->test_updateContainerTag_success();
    }

    public function test_getContainer_doesNotExist()
    {
        $this->assertFalse($this->model->getContainerTag(999, $this->containerVersion1, $this->idTag1));
        $this->assertFalse($this->model->getContainerTag($this->idSite, 9999, $this->idTag1));
        $this->assertFalse($this->model->getContainerTag($this->idSite, $this->containerVersion1, 9999));
        // make sure when all params correct we do find the tag
        $this->assertNotEmpty($this->model->getContainerTag($this->idSite, $this->containerVersion1, $this->idTag1));
    }

    public function test_getContainer_doesNotReturnDeletedTag()
    {
        $this->assertNotEmpty($this->model->getContainerTag($this->idSite, $this->containerVersion1, $this->idTag1));
        $this->model->deleteContainerTag($this->idSite, $this->containerVersion1, $this->idTag1);
        $this->assertFalse($this->model->getContainerTag($this->idSite, $this->containerVersion1, $this->idTag1));
    }

    public function test_getContainer_whenRelatedTypeNoLongerExists_ignoredTypeMetadata()
    {
        $this->dao->updateTagColumns($this->idSite, $this->containerVersion1, $this->idTag1, array('type' => 'Foo'));
        $tag = $this->model->getContainerTag($this->idSite, $this->containerVersion1, $this->idTag1);

        $this->assertSame(array (
            'idtag' => 1,
            'idcontainerversion' => 5,
            'idsite' => 1,
            'type' => 'Foo',
            'name' => 'InitialTag1',
            'status' => 'active',
            'parameters' =>
                array (
                ),
            'fire_trigger_ids' =>
                array (
                ),
            'block_trigger_ids' =>
                array (
                ),
            'fire_limit' => 'unlimited',
            'priority' => '9999',
            'fire_delay' => '0',
            'start_date' => '2018-01-01 02:03:04',
            'end_date' => '2018-01-01 02:03:04',
            'created_date' => '2018-01-01 02:03:04',
            'updated_date' => '2018-01-01 02:03:04',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Jan 1, 2018 02:03:04',
            'typeMetadata' => NULL,
        ), $tag);
    }

    public function test_getContainerTags_noTagMatches()
    {
        $this->assertSame(array(), $this->model->getContainerTags(999, $this->containerVersion1));
        $this->assertSame(array(), $this->model->getContainerTags($this->idSite, 999));

        // make sure with correct params we do get a result
        $this->assertNotEmpty($this->model->getContainerTags($this->idSite, $this->containerVersion1));
    }

    public function test_getContainerTags_doesNotReturnDeleted()
    {
        $this->assertCount(1, $this->model->getContainerTags($this->idSite, $this->containerVersion1));
        $this->model->deleteContainerTag($this->idSite, $this->containerVersion1, $this->idTag1);
        $this->assertSame(array(), $this->model->getContainerTags($this->idSite, $this->containerVersion1));
    }

    public function test_getContainerTags_onlyReturnsContainersForThatSiteAndVersion()
    {
        $params = array('customHtml' => '<div>foo</div>');
        $this->addContainerTag($this->idSite, $this->containerVersion1, null, 'v1', $params);
        $this->addContainerTag($this->idSite, $this->containerVersion1, null, 'v2', $params);
        $this->addContainerTag($this->idSite2, $this->containerVersion1, null, 'v2', $params, array($this->idTrigger4));
        $this->addContainerTag($this->idSite2, $this->containerVersion1, null, 'v3', $params, array($this->idTrigger4));
        $this->addContainerTag($this->idSite, $this->containerVersion2, null, 'v4', $params, array($this->idTrigger2));

        $this->assertCount(3, $this->model->getContainerTags($this->idSite, $this->containerVersion1));
        $this->assertCount(2, $this->model->getContainerTags($this->idSite2, $this->containerVersion1));
        $this->assertCount(1, $this->model->getContainerTags($this->idSite, $this->containerVersion2));
        $this->assertCount(0, $this->model->getContainerTags($this->idSite2, $this->containerVersion2));
        $this->assertSame(array(), $this->model->getContainerTags($this->idSite2, $this->containerVersion2));
    }

    public function test_getContainerTags_formatsValues()
    {
        $this->addContainerTag($this->idSite, $this->containerVersion1, null, 'v1', array('customHtml' => '<div>foo</div>'));
        $tags = $this->model->getContainerTags($this->idSite, $this->containerVersion1);

        $this->assertCount(2, $tags);
        foreach ($tags as $tag) {
            $this->assertNotEmpty($tag['typeMetadata']);
        }
    }

    public function test_deleteContainerTag()
    {
        $params = array('customHtml' => '<div>foo</div>');
        $this->addContainerTag($this->idSite, $this->containerVersion1, null, 'v1', $params);
        $idTag3 = $this->addContainerTag($this->idSite, $this->containerVersion1, null, 'v2', $params);
        $this->addContainerTag($this->idSite2, $this->containerVersion1, null, 'v2', $params, array($this->idTrigger4));
        $this->addContainerTag($this->idSite2, $this->containerVersion1, null, 'v3', $params, array($this->idTrigger4));
        $this->addContainerTag($this->idSite, $this->containerVersion2, null, 'v4', $params, array($this->idTrigger2));

        $this->model->setCurrentDateTime('2019-03-04 03:03:03');

        $this->assertCount(3, $this->model->getContainerTags($this->idSite, $this->containerVersion1));
        $this->assertCount(2, $this->model->getContainerTags($this->idSite2, $this->containerVersion1));
        $this->assertCount(1, $this->model->getContainerTags($this->idSite, $this->containerVersion2));

        // deletes nothing when no match
        $this->model->deleteContainerTag($this->idSite, $this->containerVersion1, 9999);
        $this->model->deleteContainerTag($this->idSite, 9999, $idTag3);
        $this->model->deleteContainerTag(9999, $this->containerVersion1, $idTag3);

        $this->assertCount(3, $this->model->getContainerTags($this->idSite, $this->containerVersion1));
        $this->assertCount(2, $this->model->getContainerTags($this->idSite2, $this->containerVersion1));
        $this->assertCount(1, $this->model->getContainerTags($this->idSite, $this->containerVersion2));

        $this->model->deleteContainerTag($this->idSite, $this->containerVersion1, $idTag3);

        // removes correct one
        $this->assertCount(2, $this->model->getContainerTags($this->idSite, $this->containerVersion1));
        $this->assertCount(2, $this->model->getContainerTags($this->idSite2, $this->containerVersion1));
        $this->assertCount(1, $this->model->getContainerTags($this->idSite, $this->containerVersion2));

        // sets updated date etc
        $tags = $this->dao->getAllTags();
        $count = 0;
        foreach ($tags as $tag) {
            if ($tag['idtag'] === $idTag3) {
                $count++;
                $this->assertSame(TagsDao::STATUS_DELETED, $tag['status']);
                $this->assertSame('2019-03-04 03:03:03', $tag['deleted_date']);
            } else {
                $this->assertNotSame(TagsDao::STATUS_DELETED, $tag['status']);
                $this->assertEmpty($tag['deleted_date']);
            }
        }
        // make sure above assertion was executed
        $this->assertSame(1, $count);
    }

    public function test_updateParameters_success()
    {
        $this->model->setCurrentDateTime('2018-02-01 05:06:07');
        $this->model->updateParameters($this->idSite, $this->containerVersion1, $this->idTag1, $parameters = array('customHtml' => '<div></div>'));

        $tag = $this->model->getContainerTag($this->idSite, $this->containerVersion1, $this->idTag1);
        $expected = array (
            'idtag' => 1,
            'idcontainerversion' => 5,
            'idsite' => 1,
            'type' => 'CustomHtml',
            'name' => 'InitialTag1',
            'status' => 'active',
            'parameters' =>
                array (
                    'customHtml' => '<div></div>',
                    'htmlPosition' => 'bodyEnd'
                ),
            'fire_trigger_ids' =>
                array (
                ),
            'block_trigger_ids' =>
                array (
                ),
            'fire_limit' => 'unlimited',
            'priority' => '9999',
            'fire_delay' => '0',
            'start_date' => '2018-01-01 02:03:04',
            'end_date' => '2018-01-01 02:03:04',
            'created_date' => '2018-01-01 02:03:04',
            'updated_date' => '2018-02-01 05:06:07',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Feb 1, 2018 05:06:07',
            'typeMetadata' =>
                array (
                    'id' => 'CustomHtml',
                    'name' => 'Custom HTML',
                    'description' => 'Allows you to embed any custom HTML, for example JavaScript or CSS Styles.',
                    'category' => 'Custom',
                    'icon' => 'plugins/TagManager/images/icons/code.svg',
                    'help' => 'The Custom HTML tag allows you to embed any tag which is not supported yet. The possibilities with this trigger are pretty much unlimited.',
                    'order' => 9999,
                    'contexts' =>
                        array (
                            0 => 'web',
                        ),
                    'hasAdvancedSettings' => true,
                    'isCustomTemplate' => true,
                    'parameters' =>
                        array (
                                array (
                                    'name' => 'customHtml',
                                    'title' => 'Custom HTML',
                                    'value' => '<div></div>',
                                    'defaultValue' => '',
                                    'type' => 'string',
                                    'uiControl' => 'textarea',
                                    'uiControlAttributes' =>
                                        array (
                                        ),
                                    'availableValues' => NULL,
                                    'description' => 'This tag is ideal when you need to add for example custom styles or custom JavaScript or when you are looking for a specific tag which is not yet supported. With this tag you can append any HTML to the bottom of your page, add styles, or execute JavaScript. Note: You can replace content within the HTML with variables by putting a variable name in curly brackets like this {{PageUrl}}.',
                                    'inlineHelp' => '<a href="https://matomo.org/faq/tag-manager/faq_26815/">Learn more</a>',
                                    'templateFile' => 'plugins/TagManager/angularjs/form-field/field-textarea-variable-template.html',
                                    'introduction' => NULL,
                                    'condition' => NULL,
                                ),
                                array (
                                    'name' => 'htmlPosition',
                                    'title' => 'Position',
                                    'value' => 'bodyEnd',
                                    'defaultValue' => 'bodyEnd',
                                    'type' => 'string',
                                    'uiControl' => 'select',
                                    'uiControlAttributes' => array(),
                                    'availableValues' => array(
                                        'headStart' => 'Head Start',
                                        'headEnd' => 'Head End',
                                        'bodyStart' => 'Body Start',
                                        'bodyEnd' => 'Body End',
                                    ),
                                    'description' => 'Define the position of where the HTML should be inserted into your website.',
                                    'inlineHelp' => null,
                                    'templateFile' => '',
                                    'introduction' => null,
                                    'condition' => null,
                                )
                        ),
                ),
        );

        $tag['typeMetadata']['parameters'][1]['availableValues'] = (array) $tag['typeMetadata']['parameters'][1]['availableValues'];

        $this->assertSame($expected, $tag);
    }

    /**
     * @expectedException \Piwik\Validators\Exception
     * @expectedExceptionMessage Custom HTML: A value needs to be provided.
     */
    public function test_updateParameters_validatesParameters()
    {
        $this->model->updateParameters($this->idSite, $this->containerVersion1, $this->idTag1, $parameters = array('customHtml' => ''));
    }

    private function addContainerTag($idSite, $idContainerVersion = 5, $type = null, $name = 'MyName', $parameters = array(), $fireTriggerIds = array(1), $blockTriggerIds = array(), $fireLimit = null, $fireDelay = 0, $priority = 9999, $startDate = null, $endDate = null)
    {
        if (!isset($type)) {
            $type = CustomHtmlTag::ID;
        }

        if (!isset($fireLimit)) {
            $fireLimit = Tag::FIRE_LIMIT_UNLIMITED;
        }

        if (!isset($startDate)) {
            $startDate = $this->now;
        }
        if (!isset($endDate)) {
            $endDate = $this->now;
        }

        return $this->model->addContainerTag($idSite, $idContainerVersion, $type, $name, $parameters, $fireTriggerIds, $blockTriggerIds, $fireLimit, $fireDelay, $priority, $startDate, $endDate);
    }

    private function updateContainerTag($idSite, $idContainerVersion, $idTag, $name = 'MyName', $parameters = array(), $fireTriggerIds = array(1), $blockTriggerIds = array(), $fireLimit = null, $fireDelay = 0, $priority = 9999, $startDate = null, $endDate = null)
    {
        if (!isset($fireLimit)) {
            $fireLimit = Tag::FIRE_LIMIT_UNLIMITED;
        }

        if (!isset($startDate)) {
            $startDate = $this->now;
        }
        if (!isset($endDate)) {
            $endDate = $this->now;
        }

        return $this->model->updateContainerTag($idSite, $idContainerVersion, $idTag, $name, $parameters, $fireTriggerIds, $blockTriggerIds, $fireLimit, $fireDelay, $priority, $startDate, $endDate);
    }
}
