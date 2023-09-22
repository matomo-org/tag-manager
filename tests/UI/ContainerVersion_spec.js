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

    async function setVersionName(name, prefix)
    {
        if (!prefix) {
            prefix = '';
        } else {
            prefix += ' ';
        }
        await page.waitForSelector(prefix + '.editVersion [id=name]');
        await form.sendFieldValue(page, prefix + '.editVersion [id=name]', name);
    }

    async function setVersionDescription(name, prefix)
    {
        if (!prefix) {
            prefix = '';
        } else {
            prefix += ' ';
        }
        await form.sendFieldValue(page, prefix + '.editVersion [id=description]', name);
    }

    async function clickFirstRowTableAction(action, rowIndex)
    {
        if (!rowIndex) {
            rowIndex = 3;
        }
        await page.click('.tagManagerVersionList .entityTable tbody tr:nth-child(' + rowIndex + ') .table-action.' + action);
        await page.waitForNetworkIdle();
        await page.waitForTimeout(250);
    }

    async function createOrUpdateVersion()
    {
        await page.click('.editVersion .createButton');
        await page.waitForNetworkIdle();
    }

    async function publishVersion()
    {
        await page.click('.editVersion .publishButton');
        await page.waitForNetworkIdle();
    }

    async function cancelVersion()
    {
        await page.waitForSelector('.editVersion .entityCancel a');
        await page.click('.editVersion .entityCancel a');
    }

    it('should load versions page with some versions', async function () {
        await page.goto(container1Base);
        await capture.page(page, 'version_some_exist');
    });

    it('should be able to create a new version', async function () {
        await page.click('.createNewVersion');
        await page.waitForNetworkIdle();
        await capture.page(page, 'create_new');
    });

    it('should show an error when not possible to create version', async function () {
        await setVersionDescription('My Description');
        await createOrUpdateVersion();
        await capture.page(page, 'create_new_error');
    });

    it('should be able to prefill version', async function () {
        await setVersionName('My Version Name');
        await setVersionDescription('My Description');
        await capture.page(page, 'create_new_prefilled');
    });

    it('should be able to create a new version and show update afterwards', async function () {
        await createOrUpdateVersion();
        await capture.page(page, 'create_new_submitted');
    });

    it('should be possible to go back to list of versions and show created version', async function () {
        await page.click('.notification .close');
        await cancelVersion();
        await page.mouse.move(-10, -10);
        await capture.page(page, 'create_new_shown_in_list');
    });

    it('should be possible to fill in publish new version form', async function () {
        await page.click('.createNewVersion');
        await setVersionName('v3.0');
        await page.waitForTimeout(500);
        await capture.page(page, 'publish_new_prefilled');
    });

    it('should be possible to publish new version', async function () {
        await publishVersion();
        await page.waitForTimeout(500);
        await capture.page(page, 'publish_new_submitted');
    });

    it('should be possible to verify it was released', async function () {
        await page.click('.notification .close');
        await cancelVersion();
        await page.mouse.move(-10, -10);
        await capture.page(page, 'publish_new_shown_in_list');
    });

    it('should be possible to edit a version by clicking on edit', async function () {
        await clickFirstRowTableAction('icon-edit');
        await capture.page(page, 'edit_through_list');
    });

    it('should load an edit version through URL', async function () {
        await page.goto(container1Base + '#?idContainerVersion=11');
        await capture.page(page, 'edit_url');
    });

    it('should enable edit button after changing a field', async function () {
        await setVersionName('v5.1');
        await createOrUpdateVersion();
        await capture.page(page, 'edit_url_updated');
    });

    it('should have updated the list of versions', async function () {
        await page.click('.notification .close');
        await cancelVersion();
        await page.mouse.move(-10, -10);
        await capture.page(page, 'updated_back_to_list');
    });

    it('should show confirm delete version dialog', async function () {
        await page.goto(container1Base);
        await clickFirstRowTableAction('icon-delete', 4);
        await capture.modal(page, 'confirm_delete_version');
    });

    it('should do nothing when selecting no', async function () {
        await modal.clickButton(page, 'No');
        await capture.page(page, 'confirm_delete_version_declined');
    });

    it('should delete version when confirmed', async function () {
        await clickFirstRowTableAction('icon-delete', 4);
        await modal.clickButton(page, 'Yes');
        await page.waitForNetworkIdle();
        await capture.page(page, 'confirm_delete_version_confirmed');
    });

    it('should load a versions page with no versions', async function () {
        await page.goto(container3Base);
        await capture.page(page, 'version_none_exist_yet');
    });

    it('should open create version page when clicking on create a version now link', async function () {
        await page.click('.createContainerVersionNow');
        await capture.setTableRowHeight(page);
        await page.waitForTimeout(250); // loading element sometimes needs longer to be fully hidden
        pageWrap = await page.$('#content');
        expect(await pageWrap.screenshot()).to.matchImage('version_none_exist_yet_create_now');
    });

    it('should be able to create new version through menu', async function () {
        await page.goto(container1Base);
        await page.waitForNetworkIdle();
        await (await page.jQuery('#secondNavBar .item:contains(Publish)')).click();
        await page.waitForNetworkIdle();
        await page.evaluate(function () {
            if (window.scrollTo) {
                window.scrollTo(0,0);
            }
        });
        await setVersionName('Menu Version Name', '.modal.open');
        await setVersionDescription('My Version Description', '.modal.open');
        await capture.modal(page, 'create_through_menu_prefilled');
    });

    it('should be possible to create a new version and show update afterwards', async function () {
        await page.click('.modal.open .editVersion .createButton');
        await page.waitForNetworkIdle();
        await page.waitForSelector('.tagManagerManageList tr', { visible: true });
        await page.waitForTimeout(500);
        await capture.page(page, 'create_through_menu_submitted');
    });

    it('should be possible to show publish version to different environment', async function () {
        await clickFirstRowTableAction('icon-rocket');
        await capture.modal(page, 'publish_environment');
    });

    it('should be possible to confirm publish version to different environment', async function () {
        await modal.clickButton(page, 'Publish');
        await page.mouse.move(-10, -10);
        await capture.page(page, 'publish_environment_confirmed');
    });

    it('should be possible to debug a specific version', async function () {
        await page.reload();
        await clickFirstRowTableAction('icon-bug', 5);
        await capture.page(page, 'debug_version_enable');
    });

    it('should load versions page with some versions as view user', async function () {
        permissions.setViewUser();
        await page.goto(container1Base);
        await capture.page(page, 'version_some_exist_view_user');
    });

    it('should load versions page with no versions as view user', async function () {
        permissions.setViewUser();
        await page.goto(container3Base);
        await page.waitForSelector('.manageVersion', { visible: true });
        await capture.selector(page, 'version_none_exist_view_user', '.manageVersion');
    });

    it('should be able to show import version screen', async function () {
        await page.goto(container1Base);
        await page.click('.importVersion');
        await capture.modal(page, 'import_version_open');
    });

    it('should be able to show an error when not json formatted', async function () {
        await form.sendFieldValue(page, '.modal.open [id=importContent]', 'import test');
        await page.click('.modal.open .importVersion');
        await page.waitForTimeout(200);
        await capture.modal(page, 'import_version_shows_error_not_json');
    });

    it('should ask for confirmation before importing a version', async function () {
        await form.sendFieldValue(page, '.modal.open [id=backupName]', 'vb0392');
        await form.sendFieldValue(page, '.modal.open [id=importContent]', '{"tags": [], "triggers": [], "variables": [], "idcontainer": [], "context": "web"}');
        await page.click('.modal.open .importVersion');
        await page.waitForTimeout(200);
        await capture.modal(page, 'import_version_asks_confirmation');
    });

    it('should be possible to confirm and import the version', async function () {
        await modal.clickButton(page, 'Yes');
        await page.waitForNetworkIdle();
        await page.waitForSelector('.tagManagerManageList td');
        await page.waitForTimeout(200);
        await capture.page(page, 'import_version_confirmed');
    });

    it('should show notice not possible to publish to live container and preselect alternative environment', async function () {
        permissions.setWriteUser();
        await page.goto(container1Base);
        await page.click('.createNewVersion');
        await page.waitForNetworkIdle();
        await capture.page(page, 'no_publish_live_container_capability');
    });

    it('should show notice not possible to publish to live container and preselect alternative environment in selector', async function () {
        permissions.setWriteUser();
        await page.goto(container1Base);
        await clickFirstRowTableAction('icon-rocket');
        await capture.modal(page, 'no_publish_live_container_capability_selector');
    });
});
