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

    function selectVariableType(page, variableType)
    {
        page.click('.editVariable .collection-item.templateType' + variableType);
    }

    function setVariableName(page, name, prefix)
    {
        if (!prefix) {
            prefix = '';
        } else {
            prefix += ' ';
        }
        form.sendFieldValue(page, prefix + '.editVariable [id=name]', name);
    }

    function setParameterValue(page, variableName, value)
    {
        form.sendFieldValue(page, '.editVariable [id=' + variableName + ']', value);
    }

    function clickFirstRowTableAction(page, action, rowIndex)
    {
        if (!rowIndex) {
            rowIndex = 3;
        }
        page.click('.tagManagerVariableList .entityTable tbody tr:nth-child(' + rowIndex + ') .table-action.' + action);
    }

    function createOrUpdateVariable(page)
    {
        page.click('.editVariable .createButton');
    }

    function cancelVariable(page)
    {
        page.click('.editVariable .entityCancel a');
    }

    function captureCustomVariablesList(done, screenshotName, theTest)
    {
        capture.selector(done, screenshotName, '.tagManagerCustomVariablesList', theTest)
    }

    it('should load variables page with some variables', function (done) {
        capture.page(done, 'variable_some_exist', function (page) {
            page.load(container1Base);
            page.wait(1000);
        }, done);
    });

    it('should be able to create a new variable and show list of available types', function (done) {
        capture.page(done, 'create_new', function (page) {
            page.click('.createNewVariable');
        }, done);
    });

    it('should be able to select a type and then show create variable screen', function (done) {
        capture.page(done, 'create_new_type_selected', function (page) {
            selectVariableType(page, 'DataLayer');
        }, done);
    });

    it('should show an error when not possible to create variable', function (done) {
        capture.page(done, 'create_new_error', function (page) {
            createOrUpdateVariable(page);
        }, done);
    });

    it('should fade out variables that cannot be created', function (done) {
        permissions.setWriteUser()
        capture.page(done, 'create_new_custom_templates_restricted', function (page) {
            page.load(container1Base);
            page.click('.createNewVariable');
        }, done);
    });
    return;
    it('should be able to prefill variable', function (done) {
        capture.page(done, 'create_new_prefilled', function (page) {
            page.load(container1Base);
            page.click('.createNewVariable');
            selectVariableType(page, 'DataLayer');
            setParameterValue(page, 'dataLayerName', 'My DataLayerVariable Name');
        }, done);
    });

    it('should be able to create a new variable and show update afterwards', function (done) {
        capture.page(done, 'create_new_submitted', function (page) {
            createOrUpdateVariable(page);
        }, done);
    });

    it('should be possible to go back to list of variables and show created variable', function (done) {
        captureCustomVariablesList(done, 'create_new_shown_in_list', function (page) {
            cancelVariable(page);
        }, done);
    });

    it('should be possible to edit a variable by clicking on edit', function (done) {
        capture.page(done, 'edit_through_list', function (page) {
            clickFirstRowTableAction(page, 'icon-edit');
        }, done);
    });

    it('should load an edit variable through URL', function (done) {
        capture.page(done, 'edit_url', function (page) {
            page.load(container1Base + '#?idVariable=2');
        }, done);
    });

    it('should enable edit button after changing a field', function (done) {
        capture.page(done, 'edit_url_updated', function (page) {
            setVariableName(page, 'variableNameNew');
            createOrUpdateVariable(page);
        }, done);
    });

    it('should have updated the list of variables', function (done) {
        captureCustomVariablesList(done, 'edit_updated_back_to_list', function (page) {
            cancelVariable(page);
        }, done);
    });

    it('should show confirm delete variable dialog_shows_warning_cannot_be_deleted', function (done) {
        capture.modal(done, 'confirm_delete_variable_warning_referenced', function (page) {
            page.load(container1Base);
            clickFirstRowTableAction(page, 'icon-delete', 5);
        }, done);
    });

    it('should show confirm delete variable dialog', function (done) {
        capture.modal(done, 'confirm_delete_variable', function (page) {
            page.load(container1Base);
            clickFirstRowTableAction(page, 'icon-delete', 3);
        }, done);
    });

    it('should do nothing when selecting no', function (done) {
        captureCustomVariablesList(done, 'confirm_delete_variable_declined', function (page) {
            modal.clickButton(page, 'No')
        }, done);
    });

    it('should delete variable when confirmed', function (done) {
        captureCustomVariablesList(done, 'confirm_delete_variable_confirmed', function (page) {
            clickFirstRowTableAction(page, 'icon-delete', 4);
            modal.clickButton(page, 'Yes')
        }, done);
    });

    it('should load variables page with no variables as view user', function (done) {
        permissions.setViewUser();
        capture.page(done, 'variable_none_exist_view_user', function (page) {
            permissions.setViewUser();
            page.load(container3Base);
        }, done);
    });

    it('should load a variables page with no variables', function (done) {
        capture.page(done, 'variable_none_exist_yet', function (page) {
            page.load(container3Base);
        }, done);
    });

    it('should open create variable page when clicking on create a variable now link', function (done) {
        capture.page(done, 'variable_none_exist_yet_create_now', function (page) {
            page.click('.createContainerVariableNow');
        }, done);
    });

    it('should be possible to create a variable with advanced settings', function (done) {
        capture.page(done, 'create_advanced_prefilled', function (page) {
            selectVariableType(page, 'DomElement');
            setParameterValue(page, 'elementId', 'myelementid');
            page.click('.showAdvancedSettings');
            setParameterValue(page, 'default_value', 'hello world');
            form.sendFieldValue(page, '.editVariable .lookupTable0 [id=lookup_table_matchvalue]', 'the match');
            form.sendFieldValue(page, '.editVariable .lookupTable0 [id=lookup_table_outvalue]', 'the out');
            form.sendFieldValue(page, '.editVariable .lookupTable1 [id=lookup_table_matchvalue]', 'the match 2');
            form.sendFieldValue(page, '.editVariable .lookupTable1 [id=lookup_table_outvalue]', 'the out 2');
        }, done);
    });

    it('should be possible to create a variable with advanced settings', function (done) {
        capture.page(done, 'create_advanced_submitted', function (page) {
            createOrUpdateVariable(page);
        }, done);
    });

    it('should be possible to create a variable with advanced settings', function (done) {
        captureCustomVariablesList(done, 'create_advanced_verified', function (page) {
            cancelVariable(page);
        }, done);
    });

    it('should load variables page with some variables as view user', function (done) {
        permissions.setViewUser();
        capture.page(done, 'variable_some_exist_view_user', function (page) {
            permissions.setViewUser();
            page.load(container1Base);
            page.wait(1000);
        }, done);
    });


});