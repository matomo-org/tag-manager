/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
describe("Container", function () {
    this.timeout(0);

    this.fixture = "Piwik\\Plugins\\TagManager\\tests\\Fixtures\\TagManagerFixture";
    this.optionsOverride = {
        'persist-fixture-data': false
    };

    var generalParamsSite1 = '?idSite=2&period=day&date=2010-01-03',
        generalParamsSite5 = '?idSite=5&period=day&date=2010-01-03',
        urlBase = '&module=TagManager&action=manageContainers';

    var permissions = require("./permissions");
    var form = require("./form");
    var capture = require("./capture");
    var modal = require("./modal");

    before(function () {
        testEnvironment.pluginsToLoad = ['TagManager'];
        testEnvironment.save();
    });

    beforeEach(function () {
        testEnvironment.testGenerateFixedId = 1;
        testEnvironment.save();
    });

    afterEach(function () {
        permissions.resetUser();
        testEnvironment.testUseMockAuth = 1;
        delete testEnvironment.testGenerateFixedId;
        testEnvironment.save();
    });

    function createOrUpdateContainer(page)
    {
        page.click('.editContainer .createButton');
    }

    function cancelContainer(page)
    {
        page.click('.editContainer .entityCancel a');
    }

    it('should load a container page with containers', function (done) {
        capture.page(done, 'site_some_exist', function (page) {
            page.load(generalParamsSite1 + urlBase);
        }, done);
    });

    it('should be able to create a new container', function (done) {
        capture.page(done, 'create_new', function (page) {
            page.click('.createNewContainer');
        }, done);
    });

    it('should show an error when not possible to create container', function (done) {
        capture.page(done, 'create_new_error', function (page) {
            form.sendFieldValue(page, '.editContainer #description', 'My Description');
            createOrUpdateContainer(page);
        }, done);
    });

    it('should be able to prefill container', function (done) {
        capture.page(done, 'create_new_prefilled', function (page) {
            form.sendFieldValue(page, '.editContainer #name', 'My Container Name');
            form.sendFieldValue(page, '.editContainer #description', 'My Description');
        }, done);
    });

    it('should be able to create a new container and show dashboard afterwards', function (done) {
        capture.page(done, 'create_new_submitted', function (page) {
            createOrUpdateContainer(page);
        }, done);
    });

    it('should load an edit container page through URL', function (done) {
        capture.page(done, 'edit_url', function (page) {
            page.load(generalParamsSite1 + urlBase + '#?idContainer=aaacont2');
        }, done);
    });

    it('should enable edit button after changing a field', function (done) {
        capture.page(done, 'edit_url_updated', function (page) {
            form.sendFieldValue(page, '.editContainer #name', 'My Updated Name');
            createOrUpdateContainer(page);
        }, done);
    });

    it('should have updated the list of containers', function (done) {
        capture.page(done, 'updated_back_to_list', function (page) {
            cancelContainer(page);
        }, done);
    });

    it('should be possible to open install code for container', function (done) {
        capture.modal(done, 'install_code_dialog', function (page) {
            page.click('#containeraaacont1 .table-action.installCode');
        }, done);
    });

    it('should show confirm delete container dialog', function (done) {
        capture.modal(done, 'confirm_delete_container', function (page) {
            page.load(generalParamsSite1 + urlBase);
            page.click('#containeraaacont1 .table-action.icon-delete');
        }, done);
    });

    it('should do nothing when selecting no', function (done) {
        capture.page(done, 'confirm_delete_container_declined', function (page) {
            modal.clickButton(page, 'No');
        }, done);
    });

    it('should delete container when confirmed', function (done) {
        capture.page(done, 'confirm_delete_container_confirmed', function (page) {
            page.click('#containeraaacont1 .table-action.icon-delete')
            modal.clickButton(page, 'Yes');
        }, done);
    });

    it('should load a container page with no containers', function (done) {
        capture.page(done, 'site_none_exist_yet', function (page) {
            page.load(generalParamsSite5 + urlBase);
        }, done);
    });

    it('should open create container page when clicking on create a container now link', function (done) {
        capture.page(done, 'site_none_exist_yet_create_now', function (page) {
            page.click('.createContainerNow');
        }, done);
    });

    it('should load container page with some containers as view user', function (done) {
        permissions.setViewUser();
        capture.page(done, 'some_exist_view_user', function (page) {
            permissions.setViewUser();
            page.load(generalParamsSite1 + urlBase);
        }, done);
    });

    it('should load container page with no containers as view user', function (done) {
        permissions.setViewUser();
        capture.page(done, 'none_exist_view_user', function (page) {
            permissions.setViewUser();
            page.load(generalParamsSite5 + urlBase);
        }, done);
    });
});