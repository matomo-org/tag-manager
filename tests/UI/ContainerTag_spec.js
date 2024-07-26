/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
describe("ContainerTag", function () {
    this.timeout(0);

    this.fixture = "Piwik\\Plugins\\TagManager\\tests\\Fixtures\\TagManagerFixture";
    this.optionsOverride = {
        'persist-fixture-data': false
    };

    var generalParamsSite1 = '?idSite=2&period=day&date=2010-01-03',
        generalParamsSite5 = '?idSite=5&period=day&date=2010-01-03',
        urlBase = '&module=TagManager&action=manageTags',
    container1Base = generalParamsSite1 + urlBase + '&idContainer=aaacont1',
    container3Base = generalParamsSite1 + urlBase + '&idContainer=aaacont3';

    var permissions = require("./permissions");
    var form = require("./form");
    var capture = require("./capture");
    var modal = require("./modal");

    before(function () {
        testEnvironment.pluginsToLoad = ['TagManager'];
        testEnvironment.save();
    });

    afterEach(function () {
        permissions.resetUser();
        testEnvironment.testUseMockAuth = 1;
        testEnvironment.save();
    });

    async function selectTagType(tagType)
    {
        await page.click('.editTag .collection-item.templateType' + tagType);
        await page.waitForNetworkIdle();
        await page.waitForTimeout(250);
    }

    async function setTagName(name, prefix)
    {
        if (!prefix) {
            prefix = '';
        } else {
            prefix += ' ';
        }
        await form.sendFieldValue(page, prefix + '.editTag [id=name]', name);
    }

    async function setParameterValue(tagName, value)
    {
        await form.sendFieldValue(page, '.editTag [id=' + tagName + ']', value);
    }

    async function selectParameterValue(tagName, value)
    {
        await form.selectValue(page, '.editTag [id=' + tagName + ']', value);
    }

    async function clickFirstRowTableAction(action, rowIndex)
    {
        if (!rowIndex) {
            rowIndex = 3;
        }
        await page.click('.tagManagerTagList .entityTable tbody tr:nth-child(' + rowIndex + ') .table-action.' + action);
        await page.waitForNetworkIdle();
        await page.waitForTimeout(250);
    }

    async function createOrUpdateTag()
    {
        await page.click('.editTag .createButton');
        await page.waitForNetworkIdle();
        await page.mouse.move(-10, -10);
        await page.waitForTimeout(250);
    }

    async function cancelTag()
    {
        await page.click('.editTag .entityCancel a');
    }

    it('should load tags page with some tags', async function () {
        await page.goto(container1Base);
        await page.waitForTimeout(1000);
        await capture.page(page, 'tag_some_exist');
    });

    it('should be able to create a new tag and show list of available types', async function () {
        await page.click('.createNewTag');
        await page.waitForNetworkIdle();
        await page.waitForTimeout(500);
        await capture.page(page, 'create_new');
    });

    it('should be able to select a type and then show create tag screen', async function () {
        await selectTagType('CustomHtml');
        await capture.page(page, 'create_new_type_selected');
    });

    it('should show an error when not possible to create tag', async function () {
        await form.selectValue(page, '.fireTrigger0 [name=fire_triggers]', 'Mytrigger3');
        await createOrUpdateTag();
        await capture.page(page, 'create_new_error');
    });

    it('should fade out tags that cannot be created', async function () {f
        permissions.setWriteUser();
        await page.goto(container1Base);
        await page.click('.createNewTag');
        await page.waitForNetworkIdle();
        await page.mouse.move(-10, -10);
        await page.waitForTimeout(250);
        await capture.page(page, 'create_new_custom_templates_restricted');
    });

    it('should be able to select matomo tag with goal tracking type', async function () {
      await page.goto(container3Base);
      await page.click('.createNewTag');
      await page.waitForNetworkIdle();
      await page.waitForTimeout(250);
      await selectTagType('Matomo');
      await form.selectValue(page, 'form > div > div:nth-child(5) > div:nth-child(2) div.select-wrapper', 'Goal');
      await capture.page(page, 'create_new_with_goal_tracking_type');
    });

    it('should be able to prefill tag', async function () {
        await page.goto(container1Base);
        await page.click('.createNewTag');
        await page.waitForNetworkIdle();
        await page.waitForTimeout(250);
        await selectTagType('CustomHtml');
        await form.selectValue(page, '.fireTrigger0 [name=fire_triggers]', 'Mytrigger3');
        await setParameterValue('customHtml', '<script></script>');
        await capture.page(page, 'create_new_prefilled');
    });

    it('should be able to create a new tag and show update afterwards', async function () {
        await createOrUpdateTag();
        await capture.page(page, 'create_new_submitted');
    });

    it('should be possible to go back to list of tags and show created tag', async function () {
        await page.click('.notification .close');
        await cancelTag();
        await page.mouse.move(-10, -10);
        await page.waitForTimeout(250);
        await capture.page(page, 'create_new_shown_in_list');
    });

    it('should be possible to edit a tag by clicking on edit', async function () {
        await clickFirstRowTableAction('icon-edit');
        await capture.page(page, 'edit_through_list');
    });

    it('should be possible to edit a trigger directly', async function () {
        await page.click('.fireTrigger .icon-edit');
        await page.waitForNetworkIdle();
        await page.waitForTimeout(400);
        await capture.modal(page, 'edit_trigger_directly_popup');
    });

    it('should be possible to edit a trigger directly', async function () {
        await form.sendFieldValue(page, '.modal.open .editTrigger [id=name]', 'updatedTrigger');
        await page.waitForTimeout(100);
        await page.click('.modal.open .createButton');
        await page.waitForNetworkIdle();
        await page.waitForTimeout(250);
        await capture.page(page, 'edit_trigger_directly_updated');
    });

    it('should load an edit tag through URL', async function () {
        await page.goto(container1Base + '#?idTag=2');
        await capture.page(page, 'edit_url');
    });

    it('should enable edit button after changing a field', async function () {
        await setTagName('tagNameNew');
        await createOrUpdateTag();
        await capture.page(page, 'edit_url_updated');
    });

    it('should have updated the list of tags', async function () {
        await page.click('.notification .close');
        await cancelTag();
        await page.mouse.move(-10, -10);
        await page.waitForTimeout(250);
        await capture.page(page, 'edit_updated_back_to_list');
    });

    it('should show confirm pause tag dialog', async function () {
        await page.goto(container1Base);
        await clickFirstRowTableAction('icon-pause', 3);
        await capture.modal(page, 'confirm_pause_tag');
    });

    it('should do nothing when selecting no for paused tag', async function () {
        await modal.clickButton(page, 'No');
        await capture.page(page, 'confirm_paused_tag_declined');
    });

    it('should pause a tag when confirmed', async function () {
        await clickFirstRowTableAction('icon-pause', 3);
        await modal.clickButton(page, 'Yes');
        await page.waitForNetworkIdle();
        await capture.page(page, 'confirm_pause_tag_confirmed');
    });

    it('should show paused status in publish version changes list', async function () {
        await page.evaluate(() => $('.icon-rocket').parent().click());
        await page.waitForNetworkIdle();
        await page.waitForTimeout(500);
        await page.evaluate(() => $('.modal:visible').scrollTop($('.modal:visible').height()+500));
        await page.waitForTimeout(100);
        await capture.page(page, 'paused_publish_new_version_list');
    });

    it('should show confirm resume tag dialog', async function () {
      await page.goto(container1Base);
      await clickFirstRowTableAction('icon-play', 3);
      await capture.modal(page, 'confirm_resume_tag');
  });

  it('should do nothing when selecting no for resume tag', async function () {
      await modal.clickButton(page, 'No');
      await capture.page(page, 'confirm_resume_tag_declined');
  });

  it('should resume a tag when confirmed', async function () {
      await clickFirstRowTableAction('icon-play', 3);
      await modal.clickButton(page, 'Yes');
      await page.waitForNetworkIdle();
      await capture.page(page, 'confirm_resume_tag_confirmed');
  });

  it('should show resume status in publish version changes list', async function () {
      await page.evaluate(() => $('.icon-rocket').parent().click());
      await page.waitForNetworkIdle();
      await page.waitForTimeout(500);
      await page.evaluate(() => $('.modal:visible').scrollTop($('.modal:visible').height()+500));
      await page.waitForTimeout(100);
      await capture.page(page, 'resume_publish_new_version_list');
  });

    it('should show confirm delete tag dialog', async function () {
        await page.goto(container1Base);
        await clickFirstRowTableAction('icon-delete', 3);
        await capture.modal(page, 'confirm_delete_tag');
    });

    it('should do nothing when selecting no', async function () {
        await modal.clickButton(page, 'No');
        await capture.page(page, 'confirm_delete_tag_declined');
    });

    it('should delete tag when confirmed', async function () {
        await clickFirstRowTableAction('icon-delete', 3);
        await modal.clickButton(page, 'Yes');
        await page.waitForNetworkIdle();
        await capture.page(page, 'confirm_delete_tag_confirmed');
    });

    it('should load tags page with no tags as view user', async function () {
        permissions.setViewUser();
        await page.goto(container3Base);
        await capture.setTableRowHeight(page);
        pageWrap = await page.$('#content');
        expect(await pageWrap.screenshot()).to.matchImage('tag_none_exist_view_user');
    });

    it('should load a tags page with no tags', async function () {
        await page.goto(container3Base);
        await capture.page(page, 'tag_none_exist_yet');
    });

    it('should open create tag page when clicking on create a tag now link', async function () {
        await page.click('.createContainerTagNow');
        await page.waitForNetworkIdle();
        await page.waitForTimeout(250);
        await capture.page(page, 'tag_none_exist_yet_create_now');
    });

    it('should be possible to start create a tag and show advanced settings', async function () {
        await selectTagType('CustomHtml');
        await form.selectValue(page, '.fireTrigger0 [name=fire_triggers]', 'Mytrigger3');
        await setParameterValue('customHtml', '<script></script>');
        await page.click('.showAdvancedSettings');
        await capture.page(page, 'create_advanced_prefilled1');
    });

    it('should be possible to complete creating a tag with show advanced settings', async function () {
        await setParameterValue('fire_delay', '500');
        await setParameterValue('priority', '402');
        await setParameterValue('start_date_date', '2017-01-02');
        await setParameterValue('start_date_time', '03:04:05');
        await setParameterValue('end_date_date', '2030-05-12');
        await setParameterValue('end_date_time', '11:42:05');
        await page.click('#fire_limitonce_24hours');
        await capture.page(page, 'create_advanced_prefilled2');
    });

    it('should show missing fire trigger error', async function () {
        await createOrUpdateTag();
        await capture.page(page, 'create_advanced_firetrigger_error');
    });

    it('should be possible to create a fire trigger directly', async function () {
        await page.click('.notification .close');
        await page.click('.fireTriggers .createNewTrigger');
        await page.mouse.move(-10, -10);
        await capture.modal(page, 'create_advanced_firetrigger_popup');
    });

    it('should be possible to prefill fire trigger', async function () {
        await page.click('.modal.open .templateTypeAllElementsClick');
        await capture.modal(page, 'create_advanced_firetrigger_typeselected');
    });

    it('should be possible to prefill fire trigger', async function () {
        await page.click('.modal.open .createButton');
        await page.waitForNetworkIdle();
        await page.waitForTimeout(200);
        await capture.page(page, 'create_advanced_firetrigger_created');
    });

    it('should be possible to create a block trigger directly', async function () {
        await page.click('.blockTriggers .createTriggerInHelp');
        await page.waitForNetworkIdle(); // wait for modal
        await page.waitForTimeout(250); // wait for modal
        await page.click('.modal.open .templateTypeAllElementsClick');
        await page.click('.modal.open .createButton');
        await page.waitForNetworkIdle();
        await capture.page(page, 'create_advanced_blocktrigger_created');
    });

    it('should be possible to create a tag with advanced settings', async function () {
        await createOrUpdateTag();
        await page.evaluate(function () {
            $('.showAdvancedSettings').click();
        });
        await capture.page(page, 'create_advanced_submitted');
    });

    it('should be possible to create a tag with conditions filter', async function () {
        await page.click('.notification .close');
        await cancelTag();
        await page.waitForTimeout(200);
        await capture.page(page, 'create_advanced_verified');
    });

    it('should load tags page with some tags as view user', async function () {
        permissions.setViewUser();
        await page.goto(container1Base);
        await capture.setTableRowHeight(page);
        pageWrap = await page.$('.manageTag');
        expect(await pageWrap.screenshot()).to.matchImage('tag_some_exist_view_user');
    });

    it('should be able to select matomo tag with pageview tracking type and ecommerce checkbox', async function () {
        await page.goto(container1Base);
        await page.click('.createNewTag');
        await page.waitForNetworkIdle();
        await page.waitForTimeout(250);
        await selectTagType('Matomo');
        await page.waitForTimeout(250);
        await page.click('#isEcommerceView');
        await page.waitForTimeout(250);
        await capture.page(page, 'create_new_with_ecommerce_checkbox');
    });
});
