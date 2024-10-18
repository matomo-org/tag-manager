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
use Piwik\Url;

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
    private $idTag2;

    /**
     * @var TagsDao;
     */
    private $dao;

    /**
     * @var Tag
     */
    private $model;

    public function setUp(): void
    {
        parent::setUp();

        TagManager::$enableAutoContainerCreation = false;
        $this->idSite = Fixture::createWebsite('2014-03-04 05:06:07');
        $this->idSite2 = Fixture::createWebsite('2014-03-04 05:06:07');
        $this->dao = StaticContainer::get('Piwik\Plugins\TagManager\Dao\TagsDao');
        $this->model = StaticContainer::get('Piwik\Plugins\TagManager\Model\Tag');
        $this->model->setCurrentDateTime($this->now);

        $trigger = StaticContainer::get('Piwik\Plugins\TagManager\Model\Trigger');
        $this->idTrigger1 = $trigger->addContainerTrigger($this->idSite, $this->containerVersion1, WindowLoadedTrigger::ID, 'MyTrigger1', [], []);
        $this->idTrigger2 = $trigger->addContainerTrigger($this->idSite, $this->containerVersion2, WindowLoadedTrigger::ID, 'MyTrigger2', [], []);
        $this->idTrigger3 = $trigger->addContainerTrigger($this->idSite, $this->containerVersion1, WindowLoadedTrigger::ID, 'MyTrigger3', [], []);
        $this->idTrigger4 = $trigger->addContainerTrigger($this->idSite2, $this->containerVersion1, WindowLoadedTrigger::ID, 'MyTrigger3', [], []);

        $this->idTag1 = $this->addContainerTag($this->idSite, $this->containerVersion1, null, 'InitialTag1', ['customHtml' => '<script></script>']);
        $this->idTag2 = $this->addContainerTag($this->idSite, $this->containerVersion1, null, 'InitialTag2', ['customHtml' => '<script></script>'], $fireTriggerIds = [1], $blockTriggerIds = [], $fireLimit = null, $fireDelay = 0, $priority = 9999, $startDate = null, $endDate = null, $description = '', $status = 'paused');
    }

    public function tearDown(): void
    {
        TagManager::$enableAutoContainerCreation = true;
        parent::tearDown();
    }

    public function testGetFireLimits()
    {
        $fireLimits = $this->model->getFireLimits();
        $expected =  [
             [
                'id' => 'unlimited',
                'name' => 'Unlimited',
             ],
             [
                'id' => 'once_page',
                'name' => 'Once per pageview',
             ],
             [
                'id' => 'once_24hours',
                'name' => 'Once per 24 hours',
             ],
             [
                'id' => 'once_lifetime',
                'name' => 'Once in lifetime',
             ],
        ];
        $this->assertSame($expected, $fireLimits);
    }

    public function testAddContainerTagInvalidSite()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('idSite: An unexpected website was found');

        $this->addContainerTag($idSite = 999);
    }

    public function testAddContainerTagInvalidName()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Name: The value contains');

        $this->addContainerTag($this->idSite, $this->containerVersion1, $type = null, str_pad('4', Name::MAX_LENGTH + 1));
    }

    public function testAddContainerTagMissingParameter()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Custom HTML: A value needs to be provided.');

        $this->addContainerTag($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = [], [$this->idTrigger1]);
    }

    public function testAddContainerTagInvalidParameter()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Custom HTML: A value needs to be provided.');

        $this->addContainerTag($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = ['customHtml' => ''], [$this->idTrigger1]);
    }

    public function testAddContainerTagMissingFireTrigger()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Fire Trigger: A value needs to be provided.');

        $this->addContainerTag($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = ['customHtml' => '<div></div>'], []);
    }

    public function testAddContainerTagInvalidFireTrigger()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Fire Trigger: The trigger "2"');

        $this->addContainerTag($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = ['customHtml' => '<div></div>'], [$this->idTrigger2]);
    }

    public function testAddContainerTagInvalidBlockTrigger()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Block Trigger: The trigger "9999"');

        $this->addContainerTag($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = ['customHtml' => '<div></div>'], [$this->idTrigger1], [9999]);
    }

    public function testAddContainerTagInvalidFireLimit()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Fire limit: The value "firelimit" is not allowed');

        $this->addContainerTag($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = ['customHtml' => '<div></div>'], [$this->idTrigger1], [], 'firelimit');
    }

    public function testAddContainerTagInvalidFireDelay()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Fire delay: The value is not a number.');

        $this->addContainerTag($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = ['customHtml' => '<div></div>'], [$this->idTrigger1], [], Tag::FIRE_LIMIT_UNLIMITED, 'foobar99999999999');
    }

    public function testAddContainerTagInvalidPriority()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Priority: The value is not a number.');

        $this->addContainerTag($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = ['customHtml' => '<div></div>'], [$this->idTrigger1], [], Tag::FIRE_LIMIT_UNLIMITED, 9, 'foobar99999999999');
    }

    public function testAddContainerTagInvalidStartDate()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Start date: Date format must be');

        $this->addContainerTag($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = ['customHtml' => '<div></div>'], [$this->idTrigger1], [], Tag::FIRE_LIMIT_UNLIMITED, 9, '99', '2099-43-31 14:99:99');
    }

    public function testAddContainerTagInvalidEndDate()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('End date: Date format must be');

        $this->addContainerTag($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = ['customHtml' => '<div></div>'], [$this->idTrigger1], [], Tag::FIRE_LIMIT_UNLIMITED, 9, '99', '2018-03-01 01:01:01', '2099-43-31 14:99:99');
    }

    public function testAddContainerTagEndDateBeforeStartDate()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The start date needs to be earlier than the end date');

        $this->addContainerTag($this->idSite, $this->containerVersion1, $type = null, 'MyName', $parameters = ['customHtml' => '<div></div>'], [$this->idTrigger1], [], Tag::FIRE_LIMIT_UNLIMITED, 9, '99', '2018-03-01 01:01:01', '2017-03-01 01:01:01');
    }

    public function testAddContainerTagInvalidType()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The tag "foobarbaz" is not supported');

        $this->addContainerTag($this->idSite, $this->containerVersion1, $type = 'foobarbaz', 'MyName', $parameters = ['customHtml' => '<div></div>'], [$this->idTrigger1], [], Tag::FIRE_LIMIT_UNLIMITED);
    }

    public function testAddContainerTagSuccessMinimal()
    {
        $idTag = $this->addContainerTag($this->idSite, $this->containerVersion1, CustomHtmlTag::ID, 'MyName', $parameters = ['customHtml' => '<div></div>'], [$this->idTrigger1], [], Tag::FIRE_LIMIT_UNLIMITED, 0, '0', false, false);
        $this->assertSame(3, $idTag);

        $tag = $this->model->getContainerTag($this->idSite, $this->containerVersion1, $idTag);

        $expected =  [
            'idtag' => 3,
            'idcontainerversion' => 5,
            'idsite' => 1,
            'type' => 'CustomHtml',
            'name' => 'MyName',
            'description' => '',
            'status' => 'active',
            'parameters' =>
                 [
                    'customHtml' => '<div></div>',
                    'htmlPosition' => 'bodyEnd'
                ],
            'fire_trigger_ids' =>  [1],
            'block_trigger_ids' =>  [],
            'fire_limit' => 'unlimited',
            'priority' => 0,
            'fire_delay' => 0,
            'start_date' => null,
            'end_date' => null,
            'created_date' => '2018-01-01 02:03:04',
            'updated_date' => '2018-01-01 02:03:04',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Jan 1, 2018 02:03:04',
            'typeMetadata' =>
                 [
                    'id' => 'CustomHtml',
                    'name' => 'Custom HTML',
                    'description' => 'Allows you to embed any custom HTML, for example JavaScript or CSS Styles.',
                    'category' => 'Custom',
                    'icon' => 'plugins/TagManager/images/icons/code.svg',
                    'help' => 'The Custom HTML tag allows you to embed any tag which is not supported yet. The possibilities with this tag are pretty much unlimited.',
                    'order' => 9999,
                    'contexts' =>
                         ['web'],
                    'hasAdvancedSettings' => true,
                    'isCustomTemplate' => true,
                    'parameters' =>
                         [
                                 [
                                    'name' => 'customHtml',
                                    'title' => 'Custom HTML',
                                    'value' => '<div></div>',
                                    'defaultValue' => '',
                                    'type' => 'string',
                                    'uiControl' => 'textarea',
                                    'uiControlAttributes' =>
                                         [
                                        ],
                                    'availableValues' => null,
                                    'description' => 'This tag is ideal when you need to add for example custom styles or custom JavaScript or when you are looking for a specific tag which is not yet supported. With this tag you can append any HTML to the bottom of your page, add styles, or execute JavaScript. Note: You can replace content within the HTML with variables by putting a variable name in curly brackets like this {{PageUrl}}.',
                                    'inlineHelp' => '<a rel="noreferrer noopener" target="_blank" href="' . Url::addCampaignParametersToMatomoLink('https://matomo.org/faq/tag-manager/faq_26815/?mtm_campaign=Matomo_App&mtm_source=Matomo_App_OnPremise&mtm_medium=App.TagManager.getParameters') . '">Learn more</a>',
                                    'introduction' => null,
                                    'condition' => null,
                                    'fullWidth' => false,
                                    'component' => [
                                        'plugin' => 'TagManager',
                                        'name' => 'FieldTextareaVariable',
                                    ],
                                 ],
                                 [
                                    'name' => 'htmlPosition',
                                    'title' => 'Position',
                                    'value' => 'bodyEnd',
                                    'defaultValue' => 'bodyEnd',
                                    'type' => 'string',
                                    'uiControl' => 'select',
                                    'uiControlAttributes' => [],
                                    'availableValues' => [
                                        'headStart' => 'Head Start',
                                        'headEnd' => 'Head End',
                                        'bodyStart' => 'Body Start',
                                        'bodyEnd' => 'Body End',
                                    ],
                                    'description' => 'Define the position of where the HTML should be inserted into your website.',
                                    'inlineHelp' => null,
                                    'introduction' => null,
                                    'condition' => null,
                                    'fullWidth' => false,
                                 ]
                        ],
                ],
        ];

        $tag['typeMetadata']['parameters'][1]['availableValues'] = (array) $tag['typeMetadata']['parameters'][1]['availableValues'];
        $this->assertSame($expected, $tag);
    }

    public function testAddContainerTagSuccessFull()
    {
        $description = 'Test description of MyName tag';
        $idTag = $this->addContainerTag($this->idSite, $this->containerVersion1, CustomHtmlTag::ID, 'MyName', $parameters = ['customHtml' => '<div></div>'], [$this->idTrigger1], [$this->idTrigger3], Tag::FIRE_LIMIT_ONCE_IN_LIFETIME, 9, '99', '2017-03-01 01:01:01', '2018-03-01 01:01:01', $description);
        $this->assertSame(3, $idTag);

        $tag = $this->model->getContainerTag($this->idSite, $this->containerVersion1, $idTag);

        $expected =  [
            'idtag' => $idTag,
            'idcontainerversion' => 5,
            'idsite' => 1,
            'type' => 'CustomHtml',
            'name' => 'MyName',
            'description' => $description,
            'status' => 'active',
            'parameters' =>
                 [
                    'customHtml' => '<div></div>',
                    'htmlPosition' => 'bodyEnd'
                ],
            'fire_trigger_ids' => [1],
            'block_trigger_ids' => [3],
            'fire_limit' => 'once_lifetime',
            'priority' => 99,
            'fire_delay' => 9,
            'start_date' => '2017-03-01 01:01:01',
            'end_date' => '2018-03-01 01:01:01',
            'created_date' => '2018-01-01 02:03:04',
            'updated_date' => '2018-01-01 02:03:04',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Jan 1, 2018 02:03:04',
            'typeMetadata' =>
                 [
                    'id' => 'CustomHtml',
                    'name' => 'Custom HTML',
                    'description' => 'Allows you to embed any custom HTML, for example JavaScript or CSS Styles.',
                    'category' => 'Custom',
                    'icon' => 'plugins/TagManager/images/icons/code.svg',
                    'help' => 'The Custom HTML tag allows you to embed any tag which is not supported yet. The possibilities with this tag are pretty much unlimited.',
                    'order' => 9999,
                    'contexts' => ['web'],
                    'hasAdvancedSettings' => true,
                    'isCustomTemplate' => true,
                    'parameters' =>
                         [
                                 [
                                    'name' => 'customHtml',
                                    'title' => 'Custom HTML',
                                    'value' => '<div></div>',
                                    'defaultValue' => '',
                                    'type' => 'string',
                                    'uiControl' => 'textarea',
                                    'uiControlAttributes' =>
                                         [
                                        ],
                                    'availableValues' => null,
                                    'description' => 'This tag is ideal when you need to add for example custom styles or custom JavaScript or when you are looking for a specific tag which is not yet supported. With this tag you can append any HTML to the bottom of your page, add styles, or execute JavaScript. Note: You can replace content within the HTML with variables by putting a variable name in curly brackets like this {{PageUrl}}.',
                                    'inlineHelp' => '<a rel="noreferrer noopener" target="_blank" href="' . Url::addCampaignParametersToMatomoLink('https://matomo.org/faq/tag-manager/faq_26815/?mtm_campaign=Matomo_App&mtm_source=Matomo_App_OnPremise&mtm_medium=App.TagManager.getParameters') . '">Learn more</a>',
                                    'introduction' => null,
                                    'condition' => null,
                                    'fullWidth' => false,
                                    'component' => [
                                        'plugin' => 'TagManager',
                                        'name' => 'FieldTextareaVariable',
                                    ],
                                 ],
                                 [
                                    'name' => 'htmlPosition',
                                    'title' => 'Position',
                                    'value' => 'bodyEnd',
                                    'defaultValue' => 'bodyEnd',
                                    'type' => 'string',
                                    'uiControl' => 'select',
                                    'uiControlAttributes' => [],
                                    'availableValues' => [
                                        'headStart' => 'Head Start',
                                        'headEnd' => 'Head End',
                                        'bodyStart' => 'Body Start',
                                        'bodyEnd' => 'Body End',
                                    ],
                                    'description' => 'Define the position of where the HTML should be inserted into your website.',
                                    'inlineHelp' => null,
                                    'introduction' => null,
                                    'condition' => null,
                                    'fullWidth' => false,
                                 ]
                        ],
                ],
        ];

        $tag['typeMetadata']['parameters'][1]['availableValues'] = (array) $tag['typeMetadata']['parameters'][1]['availableValues'];
        $this->assertSame($expected, $tag);
    }

    public function testUpdateContainerTagInvalidSite()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('idSite: An unexpected website was found');

        $this->updateContainerTag($idSite = 999, $this->containerVersion1, $this->idTag1);
    }

    public function testUpdateContainerTagInvalidName()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Name: The value contains');

        $this->updateContainerTag($this->idSite, $this->containerVersion1, $this->idTag1, str_pad('4', Name::MAX_LENGTH + 1));
    }

    public function testUpdateContainerTagInvalidParameter()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Custom HTML: A value needs to be provided.');

        $this->updateContainerTag($this->idSite, $this->containerVersion1, $this->idTag1, 'MyName', $parameters = ['customHtml' => ''], [$this->idTrigger1]);
    }

    public function testUpdateContainerTagMissingFireTrigger()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Fire Trigger: A value needs to be provided.');

        $this->updateContainerTag($this->idSite, $this->containerVersion1, $this->idTag1, 'MyName', $parameters = ['customHtml' => '<div></div>'], []);
    }

    public function testUpdateContainerTagInvalidFireTrigger()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Fire Trigger: The trigger "2"');

        $this->updateContainerTag($this->idSite, $this->containerVersion1, $this->idTag1, 'MyName', $parameters = ['customHtml' => '<div></div>'], [$this->idTrigger2]);
    }

    public function testUpdateContainerTagInvalidBlockTrigger()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Block Trigger: The trigger "9999"');

        $this->updateContainerTag($this->idSite, $this->containerVersion1, $this->idTag1, 'MyName', $parameters = ['customHtml' => '<div></div>'], [$this->idTrigger1], [9999]);
    }

    public function testUpdateContainerTagInvalidFireLimit()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Fire limit: The value "firelimit" is not allowed');

        $this->updateContainerTag($this->idSite, $this->containerVersion1, $this->idTag1, 'MyName', $parameters = ['customHtml' => '<div></div>'], [$this->idTrigger1], [], 'firelimit');
    }

    public function testUpdateContainerTagInvalidFireDelay()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Fire delay: The value is not a number.');

        $this->updateContainerTag($this->idSite, $this->containerVersion1, $this->idTag1, 'MyName', $parameters = ['customHtml' => '<div></div>'], [$this->idTrigger1], [], Tag::FIRE_LIMIT_UNLIMITED, 'foobar99999999999');
    }

    public function testUpdateContainerTagInvalidPriority()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Priority: The value is not a number.');

        $this->updateContainerTag($this->idSite, $this->containerVersion1, $this->idTag1, 'MyName', $parameters = ['customHtml' => '<div></div>'], [$this->idTrigger1], [], Tag::FIRE_LIMIT_UNLIMITED, 9, 'foobar99999999999');
    }

    public function testUpdateContainerTagInvalidStartDate()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Start date: Date format must be');

        $this->updateContainerTag($this->idSite, $this->containerVersion1, $this->idTag1, 'MyName', $parameters = ['customHtml' => '<div></div>'], [$this->idTrigger1], [], Tag::FIRE_LIMIT_UNLIMITED, 9, '99', '2099-43-31 14:99:99');
    }

    public function testUpdateContainerTagInvalidEndDate()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('End date: Date format must be');

        $this->updateContainerTag($this->idSite, $this->containerVersion1, $this->idTag1, 'MyName', $parameters = ['customHtml' => '<div></div>'], [$this->idTrigger1], [], Tag::FIRE_LIMIT_UNLIMITED, 9, '99', '2018-03-01 01:01:01', '2099-43-31 14:99:99');
    }

    public function testUpdateContainerTagEndDateBeforeStartDate()
    {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('The start date needs to be earlier than the end date');

        $this->updateContainerTag($this->idSite, $this->containerVersion1, $this->idTag1, 'MyName', $parameters = ['customHtml' => '<div></div>'], [$this->idTrigger1], [], Tag::FIRE_LIMIT_UNLIMITED, 9, '99', '2018-03-01 01:01:01', '2017-03-01 01:01:01');
    }

    public function testUpdateContainerTagSuccess()
    {
        $description = 'Test updated description for MyUpdatedName tag';
        $this->model->setCurrentDateTime('2018-02-01 05:06:07');
        $this->updateContainerTag($this->idSite, $this->containerVersion1, $this->idTag1, 'MyUpdatedName', $parameters = ['customHtml' => '<div></div>'], [$this->idTrigger1], [$this->idTrigger3], Tag::FIRE_LIMIT_ONCE_IN_LIFETIME, 9, '99', '2017-03-01 01:01:01', '2018-03-01 01:01:01', $description);

        $tag = $this->model->getContainerTag($this->idSite, $this->containerVersion1, $this->idTag1);

        $expected =  [
            'idtag' => $this->idTag1,
            'idcontainerversion' => 5,
            'idsite' => 1,
            'type' => 'CustomHtml',
            'name' => 'MyUpdatedName',
            'description' => $description,
            'status' => 'active',
            'parameters' =>
                 [
                    'customHtml' => '<div></div>',
                    'htmlPosition' => 'bodyEnd'
                ],
            'fire_trigger_ids' => [1],
            'block_trigger_ids' => [3],
            'fire_limit' => 'once_lifetime',
            'priority' => 99,
            'fire_delay' => 9,
            'start_date' => '2017-03-01 01:01:01',
            'end_date' => '2018-03-01 01:01:01',
            'created_date' => '2018-01-01 02:03:04',
            'updated_date' => '2018-02-01 05:06:07',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Feb 1, 2018 05:06:07',
            'typeMetadata' =>
                 [
                    'id' => 'CustomHtml',
                    'name' => 'Custom HTML',
                    'description' => 'Allows you to embed any custom HTML, for example JavaScript or CSS Styles.',
                    'category' => 'Custom',
                    'icon' => 'plugins/TagManager/images/icons/code.svg',
                    'help' => 'The Custom HTML tag allows you to embed any tag which is not supported yet. The possibilities with this tag are pretty much unlimited.',
                    'order' => 9999,
                    'contexts' => ['web'],
                    'hasAdvancedSettings' => true,
                    'isCustomTemplate' => true,
                    'parameters' =>
                         [
                             [
                                'name' => 'customHtml',
                                'title' => 'Custom HTML',
                                'value' => '<div></div>',
                                'defaultValue' => '',
                                'type' => 'string',
                                'uiControl' => 'textarea',
                                'uiControlAttributes' =>
                                     [
                                    ],
                                'availableValues' => null,
                                'description' => 'This tag is ideal when you need to add for example custom styles or custom JavaScript or when you are looking for a specific tag which is not yet supported. With this tag you can append any HTML to the bottom of your page, add styles, or execute JavaScript. Note: You can replace content within the HTML with variables by putting a variable name in curly brackets like this {{PageUrl}}.',
                                'inlineHelp' => '<a rel="noreferrer noopener" target="_blank" href="' . Url::addCampaignParametersToMatomoLink('https://matomo.org/faq/tag-manager/faq_26815/?mtm_campaign=Matomo_App&mtm_source=Matomo_App_OnPremise&mtm_medium=App.TagManager.getParameters') . '">Learn more</a>',
                                'introduction' => null,
                                'condition' => null,
                                'fullWidth' => false,
                                'component' => [
                                    'plugin' => 'TagManager',
                                    'name' => 'FieldTextareaVariable',
                                ],
                             ],
                             [
                                'name' => 'htmlPosition',
                                'title' => 'Position',
                                'value' => 'bodyEnd',
                                'defaultValue' => 'bodyEnd',
                                'type' => 'string',
                                'uiControl' => 'select',
                                'uiControlAttributes' => [],
                                'availableValues' => [
                                    'headStart' => 'Head Start',
                                    'headEnd' => 'Head End',
                                    'bodyStart' => 'Body Start',
                                    'bodyEnd' => 'Body End',
                                ],
                                'description' => 'Define the position of where the HTML should be inserted into your website.',
                                'inlineHelp' => null,
                                'introduction' => null,
                                'condition' => null,
                                'fullWidth' => false,
                             ]
                        ],
                ],
        ];

        $tag['typeMetadata']['parameters'][1]['availableValues'] = (array) $tag['typeMetadata']['parameters'][1]['availableValues'];
        $this->assertSame($expected, $tag);
    }

    public function testGetContainer()
    {
        // no need to create new test for this
        $this->testAddContainerTagSuccessFull();
        $this->testUpdateContainerTagSuccess();
    }

    public function testGetContainerDoesNotExist()
    {
        $this->assertFalse($this->model->getContainerTag(999, $this->containerVersion1, $this->idTag1));
        $this->assertFalse($this->model->getContainerTag($this->idSite, 9999, $this->idTag1));
        $this->assertFalse($this->model->getContainerTag($this->idSite, $this->containerVersion1, 9999));
        // make sure when all params correct we do find the tag
        $this->assertNotEmpty($this->model->getContainerTag($this->idSite, $this->containerVersion1, $this->idTag1));
    }

    public function testGetContainerDoesNotReturnDeletedTag()
    {
        $this->assertNotEmpty($this->model->getContainerTag($this->idSite, $this->containerVersion1, $this->idTag1));
        $this->model->deleteContainerTag($this->idSite, $this->containerVersion1, $this->idTag1);
        $this->assertFalse($this->model->getContainerTag($this->idSite, $this->containerVersion1, $this->idTag1));
    }

    public function testGetContainerWhenRelatedTypeNoLongerExistsIgnoredTypeMetadata()
    {
        $this->dao->updateTagColumns($this->idSite, $this->containerVersion1, $this->idTag1, ['type' => 'Foo']);
        $tag = $this->model->getContainerTag($this->idSite, $this->containerVersion1, $this->idTag1);

        $this->assertSame([
            'idtag' => 1,
            'idcontainerversion' => 5,
            'idsite' => 1,
            'type' => 'Foo',
            'name' => 'InitialTag1',
            'description' => '',
            'status' => 'active',
            'parameters' =>
                 [
                    'customHtml' => '<script></script>'
                ],
            'fire_trigger_ids' =>
                 [1
                ],
            'block_trigger_ids' =>
                 [
                ],
            'fire_limit' => 'unlimited',
            'priority' => 9999,
            'fire_delay' => 0,
            'start_date' => '2018-01-01 02:03:04',
            'end_date' => '2018-01-01 02:03:04',
            'created_date' => '2018-01-01 02:03:04',
            'updated_date' => '2018-01-01 02:03:04',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Jan 1, 2018 02:03:04',
            'typeMetadata' => null,
        ], $tag);
    }

    public function testGetContainerTagsNoTagMatches()
    {
        $this->assertSame([], $this->model->getContainerTags(999, $this->containerVersion1));
        $this->assertSame([], $this->model->getContainerTags($this->idSite, 999));

        // make sure with correct params we do get a result
        $this->assertNotEmpty($this->model->getContainerTags($this->idSite, $this->containerVersion1));
    }

    public function testGetContainerTagsDoesNotReturnDeleted()
    {
        $tags = $this->model->getContainerTags($this->idSite, $this->containerVersion1);
        $this->assertCount(2, $tags);
        $this->assertSame('active', $tags[0]['status']);
        $this->assertSame('paused', $tags[1]['status']);
        $this->model->deleteContainerTag($this->idSite, $this->containerVersion1, $this->idTag1);
        $this->model->deleteContainerTag($this->idSite, $this->containerVersion1, $this->idTag2);
        $this->assertSame([], $this->model->getContainerTags($this->idSite, $this->containerVersion1));
    }

    public function testGetContainerTagsOnlyReturnsContainersForThatSiteAndVersion()
    {
        $params = ['customHtml' => '<div>foo</div>'];
        $this->addContainerTag($this->idSite, $this->containerVersion1, null, 'v1', $params);
        $this->addContainerTag($this->idSite, $this->containerVersion1, null, 'v2', $params);
        $this->addContainerTag($this->idSite2, $this->containerVersion1, null, 'v2', $params, [$this->idTrigger4]);
        $this->addContainerTag($this->idSite2, $this->containerVersion1, null, 'v3', $params, [$this->idTrigger4]);
        $this->addContainerTag($this->idSite, $this->containerVersion2, null, 'v4', $params, [$this->idTrigger2]);

        $this->assertCount(4, $this->model->getContainerTags($this->idSite, $this->containerVersion1));
        $this->assertCount(2, $this->model->getContainerTags($this->idSite2, $this->containerVersion1));
        $this->assertCount(1, $this->model->getContainerTags($this->idSite, $this->containerVersion2));
        $this->assertCount(0, $this->model->getContainerTags($this->idSite2, $this->containerVersion2));
        $this->assertSame([], $this->model->getContainerTags($this->idSite2, $this->containerVersion2));
    }

    public function testGetContainerTagsFormatsValues()
    {
        $this->addContainerTag($this->idSite, $this->containerVersion1, null, 'v1', ['customHtml' => '<div>foo</div>']);
        $tags = $this->model->getContainerTags($this->idSite, $this->containerVersion1);

        $this->assertCount(3, $tags);
        foreach ($tags as $tag) {
            $this->assertNotEmpty($tag['typeMetadata']);
        }
    }

    public function testDeleteContainerTag()
    {
        $params = ['customHtml' => '<div>foo</div>'];
        $this->addContainerTag($this->idSite, $this->containerVersion1, null, 'v1', $params);
        $idTag3 = $this->addContainerTag($this->idSite, $this->containerVersion1, null, 'v2', $params);
        $this->addContainerTag($this->idSite2, $this->containerVersion1, null, 'v2', $params, [$this->idTrigger4]);
        $this->addContainerTag($this->idSite2, $this->containerVersion1, null, 'v3', $params, [$this->idTrigger4]);
        $this->addContainerTag($this->idSite, $this->containerVersion2, null, 'v4', $params, [$this->idTrigger2]);

        $this->model->setCurrentDateTime('2019-03-04 03:03:03');

        $this->assertCount(4, $this->model->getContainerTags($this->idSite, $this->containerVersion1));
        $this->assertCount(2, $this->model->getContainerTags($this->idSite2, $this->containerVersion1));
        $this->assertCount(1, $this->model->getContainerTags($this->idSite, $this->containerVersion2));

        // deletes nothing when no match
        $this->model->deleteContainerTag($this->idSite, $this->containerVersion1, 9999);
        $this->model->deleteContainerTag($this->idSite, 9999, $idTag3);
        $this->model->deleteContainerTag(9999, $this->containerVersion1, $idTag3);

        $this->assertCount(4, $this->model->getContainerTags($this->idSite, $this->containerVersion1));
        $this->assertCount(2, $this->model->getContainerTags($this->idSite2, $this->containerVersion1));
        $this->assertCount(1, $this->model->getContainerTags($this->idSite, $this->containerVersion2));

        $this->model->deleteContainerTag($this->idSite, $this->containerVersion1, $idTag3);

        // removes correct one
        $this->assertCount(3, $this->model->getContainerTags($this->idSite, $this->containerVersion1));
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

    public function testPauseContainerTag()
    {
        $params = ['customHtml' => '<div>foo</div>'];
        $this->addContainerTag($this->idSite, $this->containerVersion1, null, 'v1', $params);
        $idTag3 = $this->addContainerTag($this->idSite, $this->containerVersion1, null, 'v2', $params);
        $this->addContainerTag($this->idSite2, $this->containerVersion1, null, 'v2', $params, [$this->idTrigger4]);
        $this->addContainerTag($this->idSite2, $this->containerVersion1, null, 'v3', $params, [$this->idTrigger4]);
        $this->addContainerTag($this->idSite, $this->containerVersion2, null, 'v4', $params, [$this->idTrigger2]);

        $this->model->setCurrentDateTime('2019-03-04 03:03:03');

        $this->assertCount(4, $this->model->getContainerTags($this->idSite, $this->containerVersion1));
        $this->assertCount(2, $this->model->getContainerTags($this->idSite2, $this->containerVersion1));
        $this->assertCount(1, $this->model->getContainerTags($this->idSite, $this->containerVersion2));

        // deletes nothing when no match
        $this->model->pauseContainerTag($this->idSite, $this->containerVersion1, 9999);
        $this->model->pauseContainerTag($this->idSite, 9999, $idTag3);
        $this->model->pauseContainerTag(9999, $this->containerVersion1, $idTag3);

        $this->assertCount(4, $this->model->getContainerTags($this->idSite, $this->containerVersion1));
        $this->assertCount(2, $this->model->getContainerTags($this->idSite2, $this->containerVersion1));
        $this->assertCount(1, $this->model->getContainerTags($this->idSite, $this->containerVersion2));

        $this->model->pauseContainerTag($this->idSite, $this->containerVersion1, $idTag3);

        // removes correct one
        $this->assertCount(4, $this->model->getContainerTags($this->idSite, $this->containerVersion1));
        $this->assertCount(2, $this->model->getContainerTags($this->idSite2, $this->containerVersion1));
        $this->assertCount(1, $this->model->getContainerTags($this->idSite, $this->containerVersion2));

        // sets updated date etc
        $tags = $this->dao->getAllTags();
        $count = 0;
        foreach ($tags as $tag) {
            if ($tag['idtag'] === $idTag3 || $tag['idtag'] === $this->idTag2) {
                $count++;
                $this->assertSame(TagsDao::STATUS_PAUSED, $tag['status']);
                $this->assertEmpty($tag['deleted_date']);
            } else {
                $this->assertSame(TagsDao::STATUS_ACTIVE, $tag['status']);
                $this->assertEmpty($tag['deleted_date']);
            }
        }
        // make sure above assertion was executed
        $this->assertSame(2, $count);
    }

    public function testResumeContainerTag()
    {
        $params = ['customHtml' => '<div>foo</div>'];
        $this->addContainerTag($this->idSite, $this->containerVersion1, null, 'v1', $params);
        $idTag3 = $this->addContainerTag($this->idSite, $this->containerVersion1, null, 'v2', $params);
        $this->addContainerTag($this->idSite2, $this->containerVersion1, null, 'v2', $params, [$this->idTrigger4]);
        $this->addContainerTag($this->idSite2, $this->containerVersion1, null, 'v3', $params, [$this->idTrigger4]);
        $this->addContainerTag($this->idSite, $this->containerVersion2, null, 'v4', $params, [$this->idTrigger2]);

        $this->model->setCurrentDateTime('2019-03-04 03:03:03');

        $this->assertCount(4, $this->model->getContainerTags($this->idSite, $this->containerVersion1));
        $this->assertCount(2, $this->model->getContainerTags($this->idSite2, $this->containerVersion1));
        $this->assertCount(1, $this->model->getContainerTags($this->idSite, $this->containerVersion2));

        // deletes nothing when no match
        $this->model->pauseContainerTag($this->idSite, $this->containerVersion1, 9999);
        $this->model->resumeContainerTag($this->idSite, $this->containerVersion1, 9999);
        $this->model->pauseContainerTag($this->idSite, 9999, $idTag3);
        $this->model->resumeContainerTag($this->idSite, 9999, $idTag3);
        $this->model->pauseContainerTag(9999, $this->containerVersion1, $idTag3);
        $this->model->resumeContainerTag(9999, $this->containerVersion1, $idTag3);

        $this->assertCount(4, $this->model->getContainerTags($this->idSite, $this->containerVersion1));
        $this->assertCount(2, $this->model->getContainerTags($this->idSite2, $this->containerVersion1));
        $this->assertCount(1, $this->model->getContainerTags($this->idSite, $this->containerVersion2));

        $this->model->pauseContainerTag($this->idSite, $this->containerVersion1, $idTag3);

        // removes correct one
        $this->assertCount(4, $this->model->getContainerTags($this->idSite, $this->containerVersion1));
        $this->assertCount(2, $this->model->getContainerTags($this->idSite2, $this->containerVersion1));
        $this->assertCount(1, $this->model->getContainerTags($this->idSite, $this->containerVersion2));

        // sets updated date etc
        $tags = $this->dao->getAllTags();
        $count = 0;
        foreach ($tags as $tag) {
            if ($tag['idtag'] === $idTag3 || $tag['idtag'] === $this->idTag2) {
                $count++;
                $this->assertSame(TagsDao::STATUS_PAUSED, $tag['status']);
                $this->assertEmpty($tag['deleted_date']);
            } else {
                $this->assertSame(TagsDao::STATUS_ACTIVE, $tag['status']);
                $this->assertEmpty($tag['deleted_date']);
            }
        }
        // make sure above assertion was executed
        $this->assertSame(2, $count);

        $this->model->resumeContainerTag($this->idSite, $this->containerVersion1, $this->idTag2);
        $this->model->resumeContainerTag($this->idSite, $this->containerVersion1, $idTag3);
        $tags = $this->dao->getAllTags();
        $count = 0;
        foreach ($tags as $tag) {
            $count++;
            $this->assertSame(TagsDao::STATUS_ACTIVE, $tag['status']);
            $this->assertEmpty($tag['deleted_date']);
        }
        // make sure above assertion was executed
        $this->assertSame(7, $count);
    }

    public function testUpdateParametersSuccess()
    {
        $this->model->setCurrentDateTime('2018-02-01 05:06:07');
        $this->model->updateParameters($this->idSite, $this->containerVersion1, $this->idTag1, $parameters = ['customHtml' => '<div></div>']);

        $tag = $this->model->getContainerTag($this->idSite, $this->containerVersion1, $this->idTag1);
        $expected =  [
            'idtag' => 1,
            'idcontainerversion' => 5,
            'idsite' => 1,
            'type' => 'CustomHtml',
            'name' => 'InitialTag1',
            'description' => '',
            'status' => 'active',
            'parameters' =>
                 [
                    'customHtml' => '<div></div>',
                    'htmlPosition' => 'bodyEnd'
                ],
            'fire_trigger_ids' =>
                 [
                    1
                ],
            'block_trigger_ids' =>
                 [
                ],
            'fire_limit' => 'unlimited',
            'priority' => 9999,
            'fire_delay' => 0,
            'start_date' => '2018-01-01 02:03:04',
            'end_date' => '2018-01-01 02:03:04',
            'created_date' => '2018-01-01 02:03:04',
            'updated_date' => '2018-02-01 05:06:07',
            'created_date_pretty' => 'Jan 1, 2018 02:03:04',
            'updated_date_pretty' => 'Feb 1, 2018 05:06:07',
            'typeMetadata' =>
                 [
                    'id' => 'CustomHtml',
                    'name' => 'Custom HTML',
                    'description' => 'Allows you to embed any custom HTML, for example JavaScript or CSS Styles.',
                    'category' => 'Custom',
                    'icon' => 'plugins/TagManager/images/icons/code.svg',
                    'help' => 'The Custom HTML tag allows you to embed any tag which is not supported yet. The possibilities with this tag are pretty much unlimited.',
                    'order' => 9999,
                    'contexts' =>
                         [
                            0 => 'web',
                        ],
                    'hasAdvancedSettings' => true,
                    'isCustomTemplate' => true,
                    'parameters' =>
                         [
                                 [
                                    'name' => 'customHtml',
                                    'title' => 'Custom HTML',
                                    'value' => '<div></div>',
                                    'defaultValue' => '',
                                    'type' => 'string',
                                    'uiControl' => 'textarea',
                                    'uiControlAttributes' =>
                                         [
                                        ],
                                    'availableValues' => null,
                                    'description' => 'This tag is ideal when you need to add for example custom styles or custom JavaScript or when you are looking for a specific tag which is not yet supported. With this tag you can append any HTML to the bottom of your page, add styles, or execute JavaScript. Note: You can replace content within the HTML with variables by putting a variable name in curly brackets like this {{PageUrl}}.',
                                    'inlineHelp' => '<a rel="noreferrer noopener" target="_blank" href="' . Url::addCampaignParametersToMatomoLink('https://matomo.org/faq/tag-manager/faq_26815/?mtm_campaign=Matomo_App&mtm_source=Matomo_App_OnPremise&mtm_medium=App.TagManager.getParameters') . '">Learn more</a>',
                                    'introduction' => null,
                                    'condition' => null,
                                    'fullWidth' => false,
                                    'component' => [
                                        'plugin' => 'TagManager',
                                        'name' => 'FieldTextareaVariable',
                                    ],
                                 ],
                                 [
                                    'name' => 'htmlPosition',
                                    'title' => 'Position',
                                    'value' => 'bodyEnd',
                                    'defaultValue' => 'bodyEnd',
                                    'type' => 'string',
                                    'uiControl' => 'select',
                                    'uiControlAttributes' => [],
                                    'availableValues' => [
                                        'headStart' => 'Head Start',
                                        'headEnd' => 'Head End',
                                        'bodyStart' => 'Body Start',
                                        'bodyEnd' => 'Body End',
                                    ],
                                    'description' => 'Define the position of where the HTML should be inserted into your website.',
                                    'inlineHelp' => null,
                                    'introduction' => null,
                                    'condition' => null,
                                    'fullWidth' => false,
                                 ]
                        ],
                ],
        ];

        $tag['typeMetadata']['parameters'][1]['availableValues'] = (array) $tag['typeMetadata']['parameters'][1]['availableValues'];

        $this->assertSame($expected, $tag);
    }

    public function testUpdateParametersValidatesParameters()
    {
        $this->expectException(\Piwik\Validators\Exception::class);
        $this->expectExceptionMessage('Custom HTML: A value needs to be provided.');

        $this->model->updateParameters($this->idSite, $this->containerVersion1, $this->idTag1, $parameters = ['customHtml' => '']);
    }

    private function addContainerTag($idSite, $idContainerVersion = 5, $type = null, $name = 'MyName', $parameters = [], $fireTriggerIds = [1], $blockTriggerIds = [], $fireLimit = null, $fireDelay = 0, $priority = 9999, $startDate = null, $endDate = null, $description = '', $status = '')
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

        return $this->model->addContainerTag($idSite, $idContainerVersion, $type, $name, $parameters, $fireTriggerIds, $blockTriggerIds, $fireLimit, $fireDelay, $priority, $startDate, $endDate, $description, $status);
    }

    private function updateContainerTag($idSite, $idContainerVersion, $idTag, $name = 'MyName', $parameters = [], $fireTriggerIds = [1], $blockTriggerIds = [], $fireLimit = null, $fireDelay = 0, $priority = 9999, $startDate = null, $endDate = null, $description = '')
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

        return $this->model->updateContainerTag($idSite, $idContainerVersion, $idTag, $name, $parameters, $fireTriggerIds, $blockTriggerIds, $fireLimit, $fireDelay, $priority, $startDate, $endDate, $description);
    }
}
