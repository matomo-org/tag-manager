/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
describe("ContainerVariable", function () {
    this.timeout(0);

    this.fixture = "Piwik\\Plugins\\TagManager\\tests\\Fixtures\\TagManagerFixture";
    this.optionsOverride = {
        'persist-fixture-data': false
    };

    var generalParamsSite1 = '?idSite=2&period=day&date=2010-01-03',
        generalParamsSite5 = '?idSite=5&period=day&date=2010-01-03',
        urlBase = '&module=TagManager&action=manageVariables',
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

    async function selectVariableType(variableType)
    {
        await page.click('.editVariable .collection-item.templateType' + variableType);
    }

    async function setVariableName(name, prefix)
    {
        if (!prefix) {
            prefix = '';
        } else {
            prefix += ' ';
        }
        await form.sendFieldValue(page, prefix + '.editVariable [id=name]', name);
    }

    async function setParameterValue(variableName, value)
    {
        await form.sendFieldValue(page, '.editVariable [id=' + variableName + ']', value);
    }

    async function clickFirstRowTableAction(action, rowIndex)
    {
        if (!rowIndex) {
            rowIndex = 3;
        }
        await page.click('.tagManagerVariableList .entityTable tbody tr:nth-child(' + rowIndex + ') .table-action.' + action);
        await page.waitForNetworkIdle();
        await page.waitForTimeout(250);
    }

    async function createOrUpdateVariable()
    {
        await page.click('.editVariable .createButton');
        await page.waitForNetworkIdle();
    }

    async function cancelVariable()
    {
        await page.click('.editVariable .entityCancel a');
    }

    async function captureCustomVariablesList(screenshotName)
    {
        await capture.selector(page, screenshotName, '.tagManagerCustomVariablesList')
    }

    async function searchVariable(searchTerm)
    {
        await page.focus('#variableSearch');
        await page.evaluate((searchTerm) => {
          var search = document.getElementById('variableSearch');
          search.value = searchTerm;
          var event = new Event('change');
          search.dispatchEvent(event);
        }, searchTerm);
        await page.waitForTimeout(200);
    }

    it('should load variables page with some variables', async function () {
        await page.goto(container1Base);
        await page.waitForTimeout(1000);
        await capture.page(page, 'variable_some_exist');
    });

    it('should be able to search variables by name', async function () {
        await searchVariable('My var 1');
        await capture.page(page, 'variable_search_name');
    });

    it('should be able to search variables by description', async function () {
        await searchVariable('My var 3 description');
        await capture.page(page, 'variable_search_description');
    });

    it('should be able to search variables by type', async function () {
        await searchVariable('data-layer');
        await capture.page(page, 'variable_search_type');
    });

    it('should be able to search variables by value not present', async function () {
        await searchVariable('shjdkfk');
        await capture.page(page, 'variable_search_empty_result');
    });

    it('should be able to create a new variable and show list of available types', async function () {
        await page.click('.createNewVariable');
        await page.waitForNetworkIdle();
        await page.mouse.move(-10, -10);
        await page.waitForTimeout(250);
        await capture.page(page, 'create_new');
    });

    it('should be able to select a type and then show create variable screen', async function () {
        await selectVariableType('DataLayer');
        await capture.page(page, 'create_new_type_selected');
    });

    it('should show an error when not possible to create variable', async function () {
        await createOrUpdateVariable();
        await capture.page(page, 'create_new_error');
    });

    it('should fade out variables that cannot be created', async function () {
        permissions.setWriteUser();
        await page.goto(container1Base);
        await page.click('.createNewVariable');
        await page.waitForNetworkIdle();
        await capture.page(page, 'create_new_custom_templates_restricted');
    });

    it('should be able to view a customJS variable but without edit button', async function () {
        await page.goto(container1Base);
        await page.click('.createNewVariable');
        await page.waitForNetworkIdle();
        await selectVariableType('CustomJsFunction');
        await createOrUpdateVariable();
        permissions.setWriteUser();
        await page.reload();
        await clickFirstRowTableAction('icon-edit');
        await page.waitForNetworkIdle();
        await page.waitForTimeout(750);
        await capture.page(page, 'custom_js_variable_write_user_not_editable');
    });

    it('should be able to view a customJS variable but without edit button after edit', async function () {
        await setVariableName('CustomJSVariable after write user edit');
        await capture.page(page, 'custom_js_variable_write_user_not_editable_after_edit');
        await cancelVariable();
        await page.reload();
        await page.waitForNetworkIdle();
        await clickFirstRowTableAction('icon-delete', 3);
        await modal.clickButton(page, 'Yes');
        await page.waitForNetworkIdle();
    });

    it('should be able to prefill variable', async function () {
        await page.goto(container1Base);
        await page.click('.createNewVariable');
        await page.waitForNetworkIdle();
        await selectVariableType('DataLayer');
        await setParameterValue('dataLayerName', 'My DataLayerVariable Name');
        await capture.page(page, 'create_new_prefilled');
    });

    it('should be able to create a new variable and show update afterwards', async function () {
        await createOrUpdateVariable();
        await captureCustomVariablesList('create_new_shown_in_list');
    });

    it('should be possible to edit a variable by clicking on edit', async function () {
        await clickFirstRowTableAction('icon-edit');
        await capture.page(page, 'edit_through_list');
    });

    it('should load an edit variable through URL', async function () {
        await page.goto(container1Base + '#?idVariable=2');
        await capture.page(page, 'edit_url');
    });

    it('should enable edit button after changing a field', async function () {
        await setVariableName('variableNameNew');
        await capture.page(page, 'edit_url_updated');
    });

    it('should have updated the list of variables', async function () {
        await createOrUpdateVariable();
        await captureCustomVariablesList('edit_updated_back_to_list');
    });

    it('should show confirm delete variable dialog_shows_warning_cannot_be_deleted', async function () {
        await page.goto(container1Base);
        await clickFirstRowTableAction('icon-delete', 5);
        await capture.modal(page, 'confirm_delete_variable_warning_referenced');
    });

    it('should show confirm delete variable dialog', async function () {
        await page.goto(container1Base);
        await clickFirstRowTableAction('icon-delete', 3);
        await capture.modal(page, 'confirm_delete_variable');
    });

    it('should do nothing when selecting no', async function () {
        await modal.clickButton(page, 'No');
        await captureCustomVariablesList('confirm_delete_variable_declined');
    });

    it('should delete variable when confirmed', async function () {
        await clickFirstRowTableAction('icon-delete', 4);
        await modal.clickButton(page, 'Yes');
        await page.waitForNetworkIdle();
        await captureCustomVariablesList('confirm_delete_variable_confirmed');
    });

    it('should load variables page with no variables as view user', async function () {
        permissions.setViewUser();
        await page.goto(container3Base);
        await capture.page(page, 'variable_none_exist_view_user');
    });

    it('should load a variables page with no variables', async function () {
        await page.goto(container3Base);
        await capture.page(page, 'variable_none_exist_yet');
    });

    it('should open create variable page when clicking on create a variable now link', async function () {
        await page.click('.createContainerVariableNow');
        await page.mouse.move(-10, -10);
        await page.waitForNetworkIdle();
        await capture.page(page, 'variable_none_exist_yet_create_now');
    });

    it('should be possible to create a variable with advanced settings', async function () {
        await selectVariableType('DomElement');
        await setParameterValue('elementId', 'myelementid');
        await page.click('.showAdvancedSettings');
        await setParameterValue('default_value', 'hello world');
        await form.sendFieldValue(page, '.editVariable .lookupTable0 [id=lookup_table_matchvalue]', 'the match');
        await form.sendFieldValue(page, '.editVariable .lookupTable0 [id=lookup_table_outvalue]', 'the out');
        await form.sendFieldValue(page, '.editVariable .lookupTable1 [id=lookup_table_matchvalue]', 'the match 2');
        await form.sendFieldValue(page, '.editVariable .lookupTable1 [id=lookup_table_outvalue]', 'the out 2');
        await capture.page(page, 'create_advanced_prefilled');
    });

    it('should be possible to create a variable with advanced settings', async function () {
        await createOrUpdateVariable();
        await captureCustomVariablesList('create_advanced_verified');
    });

    it('should be possible to create a new version after updating a variable', async function () {
        await page.click('tbody tr:last-of-type td.action a.icon-edit');
        await page.waitForNetworkIdle();
        await page.click('div.matomo-save-button');
        await page.waitForNetworkIdle();
        await page.click('div.notification-body a.createNewVersionLink');
        await page.waitForNetworkIdle();
        await capture.selector(page, 'create_version_after_update', 'div.modal div.modal-content');
    });

    it('should load variables page with some variables as view user', async function () {
        permissions.setViewUser();
        await page.goto(container1Base);
        await page.waitForTimeout(1000);
        await capture.page(page, 'variable_some_exist_view_user');
    });

    it('should be able to prefill variable', async function () {
        await page.goto(container1Base);
        await page.click('.createNewVariable');
        await page.waitForNetworkIdle();
        await selectVariableType('DataLayer');
        await setParameterValue('dataLayerName', 'My DataLayerVariable Name');
        await setParameterValue('name', 'Test variable with a really long name. Abcdefghijklmnopqrstuvwxyz1234567890Abcdefghijklmnopqrstuvwxyz1234567890Abcdefghijklmnopqrstuvwxyz1234567890Abcdefghijklmnopqrstuvwxyz1234567890Abcdefghijklmnopqrstuvwxyz1234567890Abcdefghijklmnopqrstuvwxyz1234567890');
        await createOrUpdateVariable();
        await captureCustomVariablesList('create_new_long_name');
    });

    it('should show dialog to copy variable', async function () {
        await page.goto(container1Base);
        await clickFirstRowTableAction('icon-content-copy', 3);
        await page.waitForNetworkIdle();
        pageWrap = await page.waitForSelector('div.ui-dialog.mtmCopyVariable');
        expect(await pageWrap.screenshot()).to.matchImage('copy_variable_dialog');
    });

    it('should select container to copy variable to', async function () {
        await page.evaluate(() => $('div.matomo-field-select div.select-wrapper input.dropdown-trigger')[0].click());
        await page.waitForTimeout(250);
        await page.evaluate(() => $('div.matomo-field-select ul li:first').click());
        await page.waitForTimeout(250);
        pageWrap = await page.waitForSelector('div.ui-dialog.mtmCopyVariable');
        expect(await pageWrap.screenshot()).to.matchImage('copy_variable_container_selected');
    });

    it('should show list of sites to copy variable to', async function () {
        await page.click('#destinationSite');
        await page.waitForTimeout(250);
        pageWrap = await page.waitForSelector('div.ui-dialog.mtmCopyVariable');
        expect(await pageWrap.screenshot()).to.matchImage('copy_variable_site_select');
    });

    it('should select site to copy variable to', async function () {
        await page.evaluate(() => $('#destinationSite ul li:first').click());
        await page.waitForTimeout(250);
        pageWrap = await page.waitForSelector('div.ui-dialog.mtmCopyVariable');
        expect(await pageWrap.screenshot()).to.matchImage('copy_variable_site_selected');
    });

    it('should be able to copy variable', async function () {
        await page.goto(container1Base);
        await clickFirstRowTableAction('icon-content-copy', 3);
        await page.waitForNetworkIdle();
        await page.evaluate(() => $('div.copyMtmObjectDialog button.btn').click());
        await page.waitForNetworkIdle();
        await capture.page(page, 'copy_variable_success');
    });

    it('should hide copy success notification after deleting variable', async function () {
        await clickFirstRowTableAction('icon-delete', 4);
        await page.waitForNetworkIdle();
        await modal.clickButton(page, 'Yes');
        await page.waitForNetworkIdle();
        await capture.page(page, 'copy_variable_success_hidden');
    });

    it('should show list of containers to copy variable to', async function () {
        await page.goto(container1Base);
        await clickFirstRowTableAction('icon-content-copy', 3);
        await page.waitForNetworkIdle();
        // Reverse testing specific CSS preventing dropdown from overflowing the modal like usual
        await page.evaluate(function() {
          var style = document.createElement('style');
          style.appendChild(document.createTextNode(`div.ui-dialog.mtmCopyVariable div#Piwik_Popover { overflow-y: unset !important; }`));
          document.body.appendChild(style);
        });
        await page.evaluate(() => $('div.matomo-field-select div.select-wrapper input.dropdown-trigger')[0].click());
        await page.waitForTimeout(250);
        await capture.page(page, 'copy_variable_container_select');
    });
});
