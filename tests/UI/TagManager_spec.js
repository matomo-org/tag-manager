/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
describe("TagManager", function () {
    this.timeout(0);

    this.fixture = "Piwik\\Plugins\\TagManager\\tests\\Fixtures\\TagManagerFixture";
    this.optionsOverride = {
        'persist-fixture-data': false
    };

    var generalParamsSite1 = '?idSite=2&period=day&date=2010-01-03',
        generalParamsSite5 = '?idSite=5&period=day&date=2010-01-03',
        urlBase = '&module=TagManager&action=',
        containerEmpty = generalParamsSite1 + urlBase + 'dashboard&idContainer=aaacont3&idSite=2&period=day&date=yesterday',
        containerWithEntries = generalParamsSite1 + urlBase + 'dashboard&idContainer=aaacont1&idSite=2&period=day&date=yesterday';

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

    function createOrUpdateContainer(page)
    {
        page.click('.editContainer .createButton');
    }

    function cancelContainer(page)
    {
        page.click('.editContainer .entityCancel a');
    }

    var selectorContainerOpen = '.top_controls .tagContainerSelector .dropdown';

    it('should load a getting started page', function (done) {
        capture.page(done, 'getting_started', function (page) {
            page.load(generalParamsSite1 + urlBase + 'gettingStarted');
        }, done);
    });

    it('should show top bar list when no container exists', function (done) {
        capture.topControls(done, 'top_controls_no_container_exists', function (page) {
            page.load(generalParamsSite5 + urlBase + 'gettingStarted');
        }, done);
    });

    it('should open container selector and show no containers exist', function (done) {
        capture.selector(done, 'top_controls_no_container_exists_open', selectorContainerOpen, function (page) {
            page.click('.tagContainerSelector');
        }, done);
    });

    it('should show top bar list when container has no content', function (done) {
        capture.topControls(done, 'top_controls_container_empty', function (page) {
            page.load(containerEmpty);
        }, done);
    });

    it('should open container selector and show available containers', function (done) {
        capture.selector(done, 'top_controls_container_empty_open', selectorContainerOpen, function (page) {
            page.click('.tagContainerSelector');
        }, done);
    });

    it('should be able to show install code page for container without content', function (done) {
        capture.modal(done, 'install_code_without_content', function (page) {
            page.load(containerEmpty);
            page.click('#secondNavBar .item:contains(Install Code)');
        }, done);
    });

    it('should be able to enable preview', function (done) {
        capture.page(done, 'preview_enable', function (page) {
            modal.close(page);
            page.click('#secondNavBar .item:contains(Preview)');
        }, done);
    });

    it('should be able to disable preview', function (done) {
        capture.page(done, 'preview_disable', function (page) {
            page.click('#notificationContainer .disablePreviewDebug');
            page.wait(1000);
        }, done);
    });

    it('should show top bar list when container has no content', function (done) {
        capture.topControls(done, 'top_controls_container_with_entries', function (page) {
            page.load(containerWithEntries);
        }, done);
    });

    it('should show no containers exist in top bar', function (done) {
        capture.selector(done, 'top_controls_container_with_entries_open', selectorContainerOpen, function (page) {
            page.click('.tagContainerSelector');
        }, done);
    });

    it('should be able to show install code page for container with content', function (done) {
        capture.modal(done, 'install_code_with_content', function (page) {
            page.load(containerWithEntries);
            page.click('#secondNavBar .item:contains(Install Code)');
        }, done);
    });

    it('should be able to show publish page for container with content', function (done) {
        capture.modal(done, 'publish_with_content', function (page) {
            modal.close(page);
            page.click('#secondNavBar .item:contains(Publish)');
        }, done);
    });


});