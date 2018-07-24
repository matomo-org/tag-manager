/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
describe("ContainerVersion", function () {
    this.timeout(0);

    this.fixture = "Piwik\\Plugins\\TagManager\\tests\\Fixtures\\TagManagerFixture";
    this.optionsOverride = {
        'persist-fixture-data': false
    };

    var generalParamsSite1 = '?idSite=2&period=day&date=2010-01-03',
        generalParamsSite5 = '?idSite=5&period=day&date=2010-01-03',
        urlBase = '&module=TagManager&action=manageVersions',
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

    function setVersionName(page, name, prefix)
    {
        if (!prefix) {
            prefix = '';
        } else {
            prefix += ' ';
        }
        form.sendFieldValue(page, prefix + '.editVersion [id=name]', name);
    }

    function setVersionDescription(page, name, prefix)
    {
        if (!prefix) {
            prefix = '';
        } else {
            prefix += ' ';
        }
        form.sendFieldValue(page, prefix + '.editVersion [id=description]', name);
    }

    function clickFirstRowTableAction(page, action, rowIndex)
    {
        if (!rowIndex) {
            rowIndex = 3;
        }
        page.click('.tagManagerVersionList .entityTable tbody tr:nth-child(' + rowIndex + ') .table-action.' + action);
    }

    function createOrUpdateVersion(page)
    {
        page.click('.editVersion .createButton');
    }

    function publishVersion(page)
    {
        page.click('.editVersion .publishButton');
    }

    function cancelVersion(page)
    {
        page.click('.editVersion .entityCancel a');
    }

    it('should load versions page with some versions', function (done) {
        capture.page(done, 'version_some_exist', function (page) {
            page.load(container1Base);
        }, done);
    });

    it('should be able to create a new version', function (done) {
        capture.page(done, 'create_new', function (page) {
            page.click('.createNewVersion');
        }, done);
    });

    it('should show an error when not possible to create version', function (done) {
        capture.page(done, 'create_new_error', function (page) {
            setVersionDescription(page, 'My Description');
            createOrUpdateVersion(page);
        }, done);
    });

    it('should be able to prefill version', function (done) {
        capture.page(done, 'create_new_prefilled', function (page) {
            setVersionName(page, 'My Version Name');
            setVersionDescription(page, 'My Description');
        }, done);
    });

    it('should be able to create a new version and show update afterwards', function (done) {
        capture.page(done, 'create_new_submitted', function (page) {
            createOrUpdateVersion(page);
        }, done);
    });

    it('should be possible to go back to list of versions and show created version', function (done) {
        capture.page(done, 'create_new_shown_in_list', function (page) {
            cancelVersion(page);
        }, done);
    });

    it('should be possible to publish new version', function (done) {
        capture.page(done, 'publish_new_prefilled', function (page) {
            page.click('.createNewVersion');
            setVersionName(page, 'v3.0');
        }, done);
    });

    it('should be possible to publish new version', function (done) {
        capture.page(done, 'publish_new_submitted', function (page) {
            publishVersion(page);
        }, done);
    });

    it('should be possible to verify it was released', function (done) {
        capture.page(done, 'publish_new_shown_in_list', function (page) {
            cancelVersion(page);
        }, done);
    });

    it('should be possible to edit a version by clicking on edit', function (done) {
        capture.page(done, 'edit_through_list', function (page) {
            clickFirstRowTableAction(page, 'icon-edit');
        }, done);
    });

    it('should load an edit version through URL', function (done) {
        capture.page(done, 'edit_url', function (page) {
            page.load(container1Base + '#?idContainerVersion=11');
        }, done);
    });

    it('should enable edit button after changing a field', function (done) {
        capture.page(done, 'edit_url_updated', function (page) {
            setVersionName(page, 'v5.1');
            createOrUpdateVersion(page);
        }, done);
    });

    it('should have updated the list of versions', function (done) {
        capture.page(done, 'updated_back_to_list', function (page) {
            cancelVersion(page);
        }, done);
    });

    it('should show confirm delete version dialog', function (done) {
        capture.modal(done, 'confirm_delete_version', function (page) {
            page.load(container1Base);
            clickFirstRowTableAction(page, 'icon-delete', 4);
        }, done);
    });

    it('should do nothing when selecting no', function (done) {
        capture.page(done, 'confirm_delete_version_declined', function (page) {
            modal.clickButton(page, 'No')
        }, done);
    });

    it('should delete version when confirmed', function (done) {
        capture.page(done, 'confirm_delete_version_confirmed', function (page) {
            clickFirstRowTableAction(page, 'icon-delete', 4);
            modal.clickButton(page, 'Yes')
        }, done);
    });

    it('should load a versions page with no versions', function (done) {
        capture.page(done, 'version_none_exist_yet', function (page) {
            page.load(container3Base);
        }, done);
    });

    it('should open create version page when clicking on create a version now link', function (done) {
        capture.page(done, 'version_none_exist_yet_create_now', function (page) {
            page.click('.createContainerVersionNow');
        }, done);
    });

    it('should be able to create new version through menu', function (done) {
        capture.modal(done, 'create_through_menu_prefilled', function (page) {
            page.load(container1Base);
            page.click('#secondNavBar .item:contains(Publish)');
            page.execCallback(function () {
                page.webpage.evaluate(function () {
                    if (window.scrollTo) {
                        window.scrollTo(0,0);
                    }
                });
            });
            setVersionName(page, 'Menu Version Name', '.modal.open');
            setVersionDescription(page, 'My Version Description', '.modal.open');
        }, done);
    });

    it('should be possible to create a new version and show update afterwards', function (done) {
        capture.page(done, 'create_through_menu_submitted', function (page) {
            page.click('.modal.open .editVersion .createButton')
        }, done);
    });

    it('should be possible to show publish version to different environment', function (done) {
        capture.modal(done, 'publish_environment', function (page) {
            clickFirstRowTableAction(page, 'icon-rocket');
        }, done);
    });

    it('should be possible to confirm publish version to different environment', function (done) {
        capture.page(done, 'publish_environment_confirmed', function (page) {
            modal.clickButton(page, 'Publish')
        }, done);
    });

    it('should be possible to debug a specific version', function (done) {
        capture.page(done, 'debug_version_enable', function (page) {
            clickFirstRowTableAction(page, 'icon-bug', 5);
        }, done);
    });

    it('should load versions page with some versions as view user', function (done) {
        permissions.setViewUser();
        capture.page(done, 'version_some_exist_view_user', function (page) {
            permissions.setViewUser();
            page.load(container1Base);
        }, done);
    });

    it('should load versions page with no versions as view user', function (done) {
        permissions.setViewUser();
        capture.page(done, 'version_none_exist_view_user', function (page) {
            permissions.setViewUser();
            page.load(container3Base);
        }, done);
    });

    it('should be able to show import version screen', function (done) {
        capture.modal(done, 'import_version_open', function (page) {
            page.load(container1Base);
            page.click('.importVersion');
        }, done);
    });

    it('should be able to show an error when not json formatted', function (done) {
        capture.modal(done, 'import_version_shows_error_not_json', function (page) {
            form.sendFieldValue(page, '.modal.open [id=importContent]', 'import test');
            page.click('.modal.open .importVersion');
        }, done);
    });

    it('should ask for confirmation before importing a version', function (done) {
        capture.modal(done, 'import_version_asks_confirmation', function (page) {
            form.sendFieldValue(page, '.modal.open [id=backupName]', 'vb0392');
            form.sendFieldValue(page, '.modal.open [id=importContent]', '{"tags": [], "triggers": [], "variables": [], "idcontainer": [], "context": "web"}');
            page.click('.modal.open .importVersion');
        }, done);
    });

    it('should be possible to confirm and import the version', function (done) {
        capture.page(done, 'import_version_confirmed', function (page) {
            modal.clickButton(page, 'Yes')
        }, done);
    });

    it('should show notice not possible to publish to live container and preselect alternative environment', function (done) {
        permissions.setWriteUser();
        capture.page(done, 'no_publish_live_container_capability', function (page) {
            page.load(container1Base);
            page.click('.createNewVersion');
        }, done);
    });

    it('should show notice not possible to publish to live container and preselect alternative environment in selector', function (done) {
        permissions.setWriteUser();
        capture.page(done, 'no_publish_live_container_capability_selector', function (page) {
            page.load(container1Base);
            clickFirstRowTableAction(page, 'icon-rocket');
        }, done);
    });
});