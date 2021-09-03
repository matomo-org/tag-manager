/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
describe("ContainerTrigger", function () {
    this.timeout(0);

    this.fixture = "Piwik\\Plugins\\TagManager\\tests\\Fixtures\\TagManagerFixture";
    this.optionsOverride = {
        'persist-fixture-data': false
    };

    var generalParamsSite1 = '?idSite=2&period=day&date=2010-01-03',
        generalParamsSite5 = '?idSite=5&period=day&date=2010-01-03',
        urlBase = '&module=TagManager&action=manageTriggers',
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

    async function selectTriggerType(triggerType)
    {
        await page.click('.editTrigger .collection-item.templateType' + triggerType);
    }

    async function setTriggerName(name, prefix)
    {
        if (!prefix) {
            prefix = '';
        } else {
            prefix += ' ';
        }
        await form.sendFieldValue(page, prefix + '.editTrigger [id=name]', name);
    }

    async function setParameterValue(triggerName, value)
    {
        await form.sendFieldValue(page, '.editTrigger [id=' + triggerName + ']', value);
    }

    async function clickFirstRowTableAction(action, rowIndex)
    {
        if (!rowIndex) {
            rowIndex = 3;
        }
        const selector = '.tagManagerTriggerList .entityTable tbody tr:nth-child(' + rowIndex + ') .table-action.' + action;
        await page.waitForSelector(selector, { visible: true });
        await page.click(selector);
    }

    async function createOrUpdateTrigger()
    {
        await page.click('.editTrigger .createButton');
        await page.waitForNetworkIdle();
    }

    async function cancelTrigger()
    {
        await page.click('.editTrigger .entityCancel a');
    }

    it('should load triggers page with some triggers', async function () {
        await page.goto(container1Base);
        await page.waitForTimeout(1000);
        await capture.page(page, 'trigger_some_exist');
    });

    it('should be able to create a new trigger and show list of available types', async function () {
        await page.click('.createNewTrigger');
        await page.waitForNetworkIdle();
        await capture.page(page, 'create_new');
    });

    it('should be able to select a type and then show create trigger screen', async function () {
        await selectTriggerType('ElementVisibility');
        await capture.page(page, 'create_new_type_selected');
    });

    it('should show an error when not possible to create trigger', async function () {
        await createOrUpdateTrigger();
        await capture.page(page, 'create_new_error');
    });

    it('should be able to prefill trigger', async function () {
        await page.goto(container1Base);
        await page.click('.createNewTrigger');
        await page.waitForNetworkIdle();
        await selectTriggerType('ElementVisibility');
        await setParameterValue('elementId', 'myElementId');
        await capture.page(page, 'create_new_prefilled');
    });

    it('should be able to create a new trigger and show update afterwards', async function () {
        await createOrUpdateTrigger();
        await capture.page(page, 'create_new_submitted');
    });

    it('should be possible to go back to list of triggers and show created trigger', async function () {
        await cancelTrigger();
        await page.mouse.move(-10, -10);
        await capture.page(page, 'create_new_shown_in_list');
    });

    it('should be possible to edit a trigger by clicking on edit', async function () {
        await clickFirstRowTableAction('icon-edit');
        await page.waitForNetworkIdle();
        await page.waitForTimeout(250);
        await capture.page(page, 'edit_through_list');
    });

    it('should load an edit trigger through URL', async function () {
        await page.goto('about:blank'); // hashchange won't trigger a new page load
        await page.goto(container1Base + '#?idTrigger=2');
        await capture.page(page, 'edit_url');
    });

    it('should enable edit button after changing a field', async function () {
        await setTriggerName('triggerNameNew');
        await createOrUpdateTrigger();
        await capture.page(page, 'edit_url_updated');
    });

    it('should have updated the list of triggers', async function () {
        await cancelTrigger();
        await page.mouse.move(-10, -10);
        await capture.page(page, 'edit_updated_back_to_list');
    });

    it('should show confirm delete trigger dialog_shows_warning_cannot_be_deleted', async function () {
        await page.goto(container1Base);
        await clickFirstRowTableAction('icon-delete', 4);
        await capture.modal(page, 'confirm_delete_trigger_warning_referenced');
    });

    it('should show confirm delete trigger dialog', async function () {
        await page.goto(container1Base);
        await clickFirstRowTableAction('icon-delete', 3);
        await capture.modal(page, 'confirm_delete_trigger');
    });

    it('should do nothing when selecting no', async function () {
        await modal.clickButton(page, 'No');
        await capture.page(page, 'confirm_delete_trigger_declined');
    });

    it('should delete trigger when confirmed', async function () {
        await clickFirstRowTableAction('icon-delete', 3);
        await page.waitForTimeout(250);
        await modal.clickButton(page, 'Yes');
        await page.waitForNetworkIdle();
        await capture.page(page, 'confirm_delete_trigger_confirmed');
    });

    it('should load triggers page with no triggers as view user', async function () {
        permissions.setViewUser();
        await page.goto(container3Base);
        await capture.page(page, 'trigger_none_exist_view_user');
    });

    it('should load a triggers page with no triggers', async function () {
        await page.goto(container3Base);
        await capture.page(page, 'trigger_none_exist_yet');
    });

    it('should open create trigger page when clicking on create a trigger now link', async function () {
        await page.click('.createContainerTriggerNow');
        await page.mouse.move(-10, -10);
        await page.waitForNetworkIdle();
        await page.waitForTimeout(200);
        await capture.page(page, 'trigger_none_exist_yet_create_now');
    });

    it('should be possible to create a trigger with a conditions filter', async function () {
        await selectTriggerType('ElementVisibility');
        await setParameterValue('elementId', 'myelementid');
        await form.sendFieldValue(page, '.editTrigger .condition0 [id=condition_expected]', 'elementIdFoo');
        await form.sendFieldValue(page, '.editTrigger .condition1 [id=condition_expected]', 'elementIdBar');
        await capture.page(page, 'create_advanced_prefilled');
    });

    it('should be possible to create a trigger with conditions filter', async function () {
        await createOrUpdateTrigger();
        await capture.page(page, 'create_advanced_submitted');
    });

    it('should be possible to create a trigger with conditions filter', async function () {
        await cancelTrigger();
        await capture.page(page, 'create_advanced_verified');
    });

    it('should load triggers page with some triggers as view user', async function () {
        permissions.setViewUser();
        await page.goto(container1Base);
        await page.waitForTimeout(1000);
        await capture.page(page, 'trigger_some_exist_view_user');
    });


});