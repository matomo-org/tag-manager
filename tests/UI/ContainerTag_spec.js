/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
describe("ContainerTag", function () {
    this.timeout(0);

    this.fixture = "Piwik\\Plugins\\TagManager\\tests\\Fixtures\\TagManagerTagUiFixture";
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

    async function searchTag(searchTerm)
    {
        await page.focus('#tagSearch');
        await page.evaluate((searchTerm) => {
          var search = document.getElementById('tagSearch');
          search.value = searchTerm;
          var event = new Event('change');
          search.dispatchEvent(event);
        }, searchTerm);
        await page.waitForTimeout(200);
    }

    it('should load tags page with some tags', async function () {
        await page.goto(container1Base);
        await page.waitForTimeout(1000);
        await capture.page(page, 'tag_some_exist');
    });

    it('should be able to search tags by name', async function () {
        await searchTag('My Tag 2');
        await capture.page(page, 'tag_search_name');
    });

    it('should be able to search tags by description', async function () {
        await searchTag('My Tag 2 description');
        await capture.page(page, 'tag_search_description');
    });

    it('should be able to search tags by type', async function () {
        await searchTag('custom html');
        await capture.page(page, 'tag_search_type');
    });

    it('should be able to search customHTML tags content', async function () {
        await searchTag('<p></p>');
        await capture.page(page, 'tag_search_custom_html_content');
    });

    it('should be able to search tags by status', async function () {
        await searchTag('active');
        await capture.page(page, 'tag_search_by_status_active');
    });

    it('should be able to search tags by status', async function () {
        await searchTag('pause');
        await capture.page(page, 'tag_search_by_status_pause_empty_result');
    });

    it('should be able to search tags by value not present', async function () {
        await searchTag('shjdkfk');
        await capture.page(page, 'tag_search_empty_result');
    });

    it('should be able to search tags by triggers', async function () {
        await searchTag('My trigger1');
        await capture.page(page, 'tag_search_trigger_result');
    });

    it('should be able to search tags by triggers', async function () {
        await searchTag('Mytrigger2 Mytrigger3');
        await capture.page(page, 'tag_search_trigger_result_multiple');
    });

    it('should be able to search tags by triggers multiple', async function () {
        await searchTag('Mytrigger2 updatedTrigger');
        await capture.page(page, 'tag_search_trigger_multiple_result');
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

    it('should fade out tags that cannot be created', async function () {
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
        await capture.page(page, 'create_new_shown_in_list');
    });

    it('should be possible to edit a tag by clicking on edit', async function () {
        await page.click('.notification .close');
        await clickFirstRowTableAction('icon-edit');
        await capture.page(page, 'edit_through_list');
    });

    it('should be possible to edit a trigger directly', async function () {
        await page.click('.fireTrigger .icon-edit');
        await page.waitForNetworkIdle();
        await page.waitForTimeout(500);
        await capture.modal(page, 'edit_trigger_directly_popup');
    });

    it('should show the popup list level 1 completely visible', async function () {
        await page.evaluate(() => $('.modal.open .expandableSelector .select-wrapper').click());
        await page.waitForTimeout(100);
        await page.waitForNetworkIdle();
        await page.evaluate(() => function() {
          var elem = $($('.modal.open'));
          elem.scrollTop(elem.height())
        });
        await page.waitForTimeout(500);
        await capture.modal(page, 'edit_trigger_directly_popup_list_level1');
    });

    it('should show the popup list level 2 completely visible', async function () {
        await page.evaluate(() => $('.modal.open .expandableList .collection.firstLevel li.collection-item:eq(0) h4').click());
        await page.waitForTimeout(100);
        await page.waitForNetworkIdle();
        await page.waitForTimeout(500);
        await capture.modal(page, 'edit_trigger_directly_popup_list_level2');
        await page.evaluate(() => function() {
          $('.modal.open .modal-close')[0].click();
        });
    });

    it('should be possible to edit a trigger directly', async function () {
        await page.reload();
        await page.click('.fireTrigger .icon-edit');
        await page.waitForNetworkIdle();
        await page.waitForTimeout(500);
        await form.sendFieldValue(page, '.modal.open .editTrigger [id=name]', 'updatedTrigger');
        await page.waitForTimeout(500);
        await page.click('.modal.open .createButton');
        await page.waitForNetworkIdle();
        await page.waitForTimeout(500);
        await capture.page(page, 'edit_trigger_directly_updated');
    });

    it('should load an edit tag through URL', async function () {
        await page.goto(container1Base + '#?idTag=2');
        await page.waitForNetworkIdle();
        await page.waitForTimeout(750);
        await capture.page(page, 'edit_url');
    });

    it('should enable edit button after changing a field', async function () {
        await setTagName('tagNameNew');
        await page.waitForNetworkIdle();
        await page.waitForTimeout(750);
        await capture.page(page, 'edit_url_updated');
    });

    it('should have updated the list of tags', async function () {
        await createOrUpdateTag();
        await page.waitForNetworkIdle();
        await page.waitForTimeout(750);
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
        await page.evaluate(() => $('.modal.open').scrollTop($('.modal.open').height()+500));
        await page.waitForTimeout(100);
        const content = await page.$('.modal.open');
        await page.waitForNetworkIdle();

        // Hide the last few rows since they are causing the test to be flaky
        await page.evaluate(() => $('div.versionChanges tbody tr:nth-child(3) ~ tr').hide());

        expect(await content.screenshot()).to.matchImage('paused_publish_new_version_list');
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
      await page.evaluate(() => $('.modal.open').scrollTop($('.modal.open').height()+500));
      await page.waitForTimeout(100);
      const content = await page.$('.modal.open');
      await page.waitForNetworkIdle();

      // Hide the last few rows since they are causing the test to be flaky
      await page.evaluate(() => $('div.versionChanges tbody tr:nth-child(3) ~ tr').hide());

      expect(await content.screenshot()).to.matchImage('resume_publish_new_version_list');
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

    it('should be able to create tag with really long name', async function () {
        await page.goto(container1Base);
        await page.click('.createNewTag');
        await page.waitForNetworkIdle();
        await page.waitForTimeout(250);
        await selectTagType('CustomHtml');
        await form.selectValue(page, '.fireTrigger0 [name=fire_triggers]', 'updatedTrigger');
        await setParameterValue('customHtml', '<script></script>');
        await setParameterValue('name', 'Test tag with a really long name. Abcdefghijklmnopqrstuvwxyz1234567890Abcdefghijklmnopqrstuvwxyz1234567890Abcdefghijklmnopqrstuvwxyz1234567890Abcdefghijklmnopqrstuvwxyz1234567890Abcdefghijklmnopqrstuvwxyz1234567890Abcdefghijklmnopqrstuvwxyz1234567890Abcde');
        await createOrUpdateTag();
        await capture.page(page, 'create_new_long_name');
    });

    it('should be able to select matomo tag with pageview tracking type and add custom dimensions', async function () {
        await page.goto(container1Base);
        await page.click('.createNewTag');
        await page.waitForNetworkIdle();
        await page.waitForTimeout(250);
        await selectTagType('Matomo');
        await page.waitForTimeout(250);
        await form.selectValue(page, '.fireTrigger0 [name=fire_triggers]', 'updatedTrigger');
        await setParameterValue('customDimensions-p1-0', 1);
        await setParameterValue('customDimensions-p2-0', 'someValue1');
        await setParameterValue('customDimensions-p1-1', 2);
        await setParameterValue('customDimensions-p2-1', 'someValue2');
        await setParameterValue('customDimensions-p1-2', 3);
        await setParameterValue('customDimensions-p2-2', 'someValue3');
        await capture.page(page, 'create_new_with_custom_dimensions');
    });

    it('should save new tag with custom dimensions', async function () {
        await createOrUpdateTag();
        await capture.page(page, 'save_new_with_custom_dimensions');
    });

    it('should show custom dimensions when tracking type is event', async function () {
        await clickFirstRowTableAction('icon-edit', 3);
        await page.waitForNetworkIdle();
        await form.selectValue(page, 'form > div > div:nth-child(5) > div:nth-child(2) div.select-wrapper', 'Event');
        await page.waitForTimeout(250);
        await capture.page(page, 'create_new_with_custom_dimensions_event');
    });

    it('should show custom dimensions when tracking type is goal', async function () {
        await form.selectValue(page, 'form > div > div:nth-child(5) > div:nth-child(2) div.select-wrapper', 'Goal');
        await page.waitForTimeout(250);
        await setParameterValue('idGoal', 1);
        await capture.page(page, 'create_new_with_custom_dimensions_goal');
    });

    it('should be able to delete some custom dimensions', async function () {
        await page.click('div.multiPairFieldTable2 span.icon-minus');
        await page.click('div.multiPairFieldTable1 span.icon-minus');
        await page.waitForTimeout(250);
        await page.click('#areCustomDimensionsSticky');
        await page.waitForTimeout(250);
        await capture.page(page, 'create_new_delete_custom_dimensions');
    });

    it('should save updated tag with custom dimensions', async function () {
        await createOrUpdateTag();
        await page.waitForNetworkIdle();
        await clickFirstRowTableAction('icon-edit', 3);
        await page.waitForNetworkIdle();
        await page.mouse.move(-10, -10);
        await capture.page(page, 'save_updated_with_custom_dimensions');
    });
});
