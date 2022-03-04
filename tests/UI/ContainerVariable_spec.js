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

    it('should load variables page with some variables', async function () {
        await page.goto(container1Base);
        await page.waitForTimeout(1000);
        await capture.page(page, 'variable_some_exist');
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
        await capture.page(page, 'create_new_submitted');
    });

    it('should be possible to go back to list of variables and show created variable', async function () {
        await cancelVariable();
        await page.mouse.move(-10, -10);
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
        await createOrUpdateVariable();
        await capture.page(page, 'edit_url_updated');
    });

    it('should have updated the list of variables', async function () {
        await cancelVariable();
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
        await capture.page(page, 'create_advanced_submitted');
    });

    it('should be possible to create a variable with advanced settings', async function () {
        await cancelVariable();
        await captureCustomVariablesList('create_advanced_verified');
    });

    it('should load variables page with some variables as view user', async function () {
        permissions.setViewUser();
        await page.goto(container1Base);
        await page.waitForTimeout(1000);
        await capture.page(page, 'variable_some_exist_view_user');
    });


});
