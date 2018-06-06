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

    function selectTriggerType(page, triggerType)
    {
        page.click('.editTrigger .collection-item.templateType' + triggerType);
    }

    function setTriggerName(page, name, prefix)
    {
        if (!prefix) {
            prefix = '';
        } else {
            prefix += ' ';
        }
        form.sendFieldValue(page, prefix + '.editTrigger [id=name]', name);
    }

    function setParameterValue(page, triggerName, value)
    {
        form.sendFieldValue(page, '.editTrigger [id=' + triggerName + ']', value);
    }

    function clickFirstRowTableAction(page, action, rowIndex)
    {
        if (!rowIndex) {
            rowIndex = 3;
        }
        page.click('.tagManagerTriggerList .entityTable tbody tr:nth-child(' + rowIndex + ') .table-action.' + action);
    }

    function createOrUpdateTrigger(page)
    {
        page.click('.editTrigger .createButton');
    }

    function cancelTrigger(page)
    {
        page.click('.editTrigger .entityCancel a');
    }

    it('should load triggers page with some triggers', function (done) {
        capture.page(done, 'trigger_some_exist', function (page) {
            page.load(container1Base);
            page.wait(1000);
        }, done);
    });

    it('should be able to create a new trigger and show list of available types', function (done) {
        capture.page(done, 'create_new', function (page) {
            page.click('.createNewTrigger');
        }, done);
    });

    it('should be able to select a type and then show create trigger screen', function (done) {
        capture.page(done, 'create_new_type_selected', function (page) {
            selectTriggerType(page, 'ElementVisibility');
        }, done);
    });

    it('should show an error when not possible to create trigger', function (done) {
        capture.page(done, 'create_new_error', function (page) {
            createOrUpdateTrigger(page);
        }, done);
    });

    it('should be able to prefill trigger', function (done) {
        capture.page(done, 'create_new_prefilled', function (page) {
            page.load(container1Base);
            page.click('.createNewTrigger');
            selectTriggerType(page, 'ElementVisibility');
            setParameterValue(page, 'elementId', 'myElementId');
        }, done);
    });

    it('should be able to create a new trigger and show update afterwards', function (done) {
        capture.page(done, 'create_new_submitted', function (page) {
            createOrUpdateTrigger(page);
        }, done);
    });

    it('should be possible to go back to list of triggers and show created trigger', function (done) {
        capture.page(done, 'create_new_shown_in_list', function (page) {
            cancelTrigger(page);
        }, done);
    });

    it('should be possible to edit a trigger by clicking on edit', function (done) {
        capture.page(done, 'edit_through_list', function (page) {
            clickFirstRowTableAction(page, 'icon-edit');
        }, done);
    });

    it('should load an edit trigger through URL', function (done) {
        capture.page(done, 'edit_url', function (page) {
            page.load(container1Base + '#?idTrigger=2');
        }, done);
    });

    it('should enable edit button after changing a field', function (done) {
        capture.page(done, 'edit_url_updated', function (page) {
            setTriggerName(page, 'triggerNameNew');
            createOrUpdateTrigger(page);
        }, done);
    });

    it('should have updated the list of triggers', function (done) {
        capture.page(done, 'edit_updated_back_to_list', function (page) {
            cancelTrigger(page);
        }, done);
    });

    it('should show confirm delete trigger dialog_shows_warning_cannot_be_deleted', function (done) {
        capture.modal(done, 'confirm_delete_trigger_warning_referenced', function (page) {
            page.load(container1Base);
            clickFirstRowTableAction(page, 'icon-delete', 4);
        }, done);
    });

    it('should show confirm delete trigger dialog', function (done) {
        capture.modal(done, 'confirm_delete_trigger', function (page) {
            page.load(container1Base);
            clickFirstRowTableAction(page, 'icon-delete', 3);
        }, done);
    });

    it('should do nothing when selecting no', function (done) {
        capture.page(done, 'confirm_delete_trigger_declined', function (page) {
            modal.clickButton(page, 'No')
        }, done);
    });

    it('should delete trigger when confirmed', function (done) {
        capture.page(done, 'confirm_delete_trigger_confirmed', function (page) {
            clickFirstRowTableAction(page, 'icon-delete', 3);
            modal.clickButton(page, 'Yes')
        }, done);
    });

    it('should load triggers page with no triggers as view user', function (done) {
        permissions.setViewUser();
        capture.page(done, 'trigger_none_exist_view_user', function (page) {
            permissions.setViewUser();
            page.load(container3Base);
        }, done);
    });

    it('should load a triggers page with no triggers', function (done) {
        capture.page(done, 'trigger_none_exist_yet', function (page) {
            page.load(container3Base);
        }, done);
    });

    it('should open create trigger page when clicking on create a trigger now link', function (done) {
        capture.page(done, 'trigger_none_exist_yet_create_now', function (page) {
            page.click('.createContainerTriggerNow');
        }, done);
    });

    it('should be possible to create a trigger with a conditions filter', function (done) {
        capture.page(done, 'create_advanced_prefilled', function (page) {
            selectTriggerType(page, 'ElementVisibility');
            setParameterValue(page, 'elementId', 'myelementid');
            form.sendFieldValue(page, '.editTrigger .condition0 [id=condition_expected]', 'elementIdFoo');
            form.sendFieldValue(page, '.editTrigger .condition1 [id=condition_expected]', 'elementIdBar');
        }, done);
    });

    it('should be possible to create a trigger with conditions filter', function (done) {
        capture.page(done, 'create_advanced_submitted', function (page) {
            createOrUpdateTrigger(page);
        }, done);
    });

    it('should be possible to create a trigger with conditions filter', function (done) {
        capture.page(done, 'create_advanced_verified', function (page) {
            cancelTrigger(page);
        }, done);
    });

    it('should load triggers page with some triggers as view user', function (done) {
        permissions.setViewUser();
        capture.page(done, 'trigger_some_exist_view_user', function (page) {
            permissions.setViewUser();
            page.load(container1Base);
            page.wait(1000);
        }, done);
    });


});