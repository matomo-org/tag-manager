/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
describe("TagManager", function () {
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

    async function createOrUpdateContainer(page)
    {
        await page.click('.editContainer .createButton');
    }

    async function cancelContainer(page)
    {
        await page.click('.editContainer .entityCancel a');
    }

    var selectorContainerOpen = '.top_controls .tagContainerSelector .dropdown';

    it('should load the manage containers page', async function () {
        await page.goto(generalParamsSite1 + urlBase + 'manageContainers');
        await capture.page(page, 'manage_containers');
    });

    it('should show only the site selector in top controls on manage containers', async function () {
        await page.goto(generalParamsSite1 + urlBase + 'manageContainers');
        await page.waitForNetworkIdle();

        expect(await page.evaluate(() => $('.top_controls .top_bar_sites_selector').length)).to.equal(1);
        expect(await page.evaluate(() => $('.top_controls .tagContainerSelector').length)).to.equal(0);
    });

    it('should show websites dropdown without all websites', async function () {
        await page.evaluate(() => $('.top_bar_sites_selector .siteSelector a.title').click());
        pageWrap = await page.$('.top_bar_sites_selector .dropdown');
        expect(await pageWrap.screenshot()).to.matchImage('websites_dropdown_without_all_websites');
        await page.evaluate(() => $('.top_bar_sites_selector .siteSelector a.title').click());
    });

    it('should show top bar list when no container exists', async function () {
        await page.goto(generalParamsSite5 + urlBase + 'manageContainers');
        await capture.topControls(page, 'top_controls_no_container_exists');
    });

    it('should not show a container selector on manage containers when no container exists', async function () {
        await page.goto(generalParamsSite5 + urlBase + 'manageContainers');
        await page.waitForNetworkIdle();

        expect(await page.evaluate(() => $('.top_controls .tagContainerSelector').length)).to.equal(0);
    });

    it('should show top bar list when container has no content', async function () {
        await page.goto(containerEmpty);
        await capture.topControls(page, 'top_controls_container_empty');
    });

    it('should open container selector and show available containers', async function () {
        await page.click('.tagContainerSelector');
        await page.waitForTimeout(250);
        await capture.selector(page, 'top_controls_container_empty_open', selectorContainerOpen);
    });

    it('should be able to show install code page for container without content', async function () {
        await page.goto(containerEmpty);
        await (await page.jQuery('#secondNavBar .item:contains(Install Code)')).click();
        await page.waitForNetworkIdle();
        await page.waitForTimeout(250);
        await capture.modal(page, 'install_code_without_content');
    });

    it('should be able to enable preview', async function () {
        await modal.close(page);
        await page.evaluate(function() {
            $('#secondNavBar .item:contains(Preview)').click();
        });
        await page.waitForNetworkIdle();
        await page.waitForTimeout(250);
        await page.waitForNetworkIdle();
        await capture.page(page, 'preview_enable');
    });

    it('should change debug URL', async function () {
        await page.evaluate(function() {
            $('#previewDebugUrl').val('https://example.com');
        });
        await page.evaluate(function() {
            $('[data-debug-site-url]').click();
        });
        await page.waitForNetworkIdle();
        await page.waitForTimeout(250);
        await page.waitForNetworkIdle();
        await capture.page(page, 'change_debug_url');
    });

    it('should show error for invalid debug URL', async function () {
        await page.evaluate(function() {
          $('#previewDebugUrl').val('javascript:alert(123456);//');
        });
        await page.evaluate(function() {
          $('[data-debug-site-url]').click();
        });
        await page.waitForNetworkIdle();
        await page.waitForTimeout(250);
        await page.waitForNetworkIdle();
        await capture.page(page, 'invalid_debug_url');
    });

    it('should be able to disable preview', async function () {
        await page.click('#notificationContainer .disablePreviewDebug');
        await page.waitForNetworkIdle();
        await page.waitForSelector('#content .card-content', { visible: true });
        await capture.page(page, 'preview_disable');
    });

    it('should show top bar list when container has no content', async function () {
        await page.goto(containerWithEntries);
        await capture.topControls(page, 'top_controls_container_with_entries');
    });

    it('should show no containers exist in top bar', async function () {
        await page.click('.tagContainerSelector');
        await page.waitForTimeout(250);
        await capture.selector(page, 'top_controls_container_with_entries_open', selectorContainerOpen);
    });

    it('should show a container dropdown in the left menu for multi-container sites', async function () {
        await page.goto(containerWithEntries);
        await page.waitForNetworkIdle();

        expect(await page.evaluate(() => $('#secondNavBar .tag-manager-left-menu-dropdown').length)).to.equal(1);
        expect(await page.evaluate(() => $('#secondNavBar .tag-manager-left-menu-dropdown .item.active').text().trim())).to.equal('Container1');
        expect(await page.evaluate(() => $('#secondNavBar .container-menu-item').length)).to.equal(0);
    });

    it('should include containers in the mobile left menu', async function () {
        await page.goto(containerWithEntries);
        page.webpage.setViewport({ width: 768, height: 512 });
        await page.evaluate(function () {
            $('.activateLeftMenu>span').click();
            $('#mobile-left-menu .icon-chevron-down').click();
        });
        await page.waitForTimeout(250);

        expect(await page.evaluate(() => $('#mobile-left-menu li li a:contains("Manage Containers")').length > 0)).to.equal(true);
        expect(await page.evaluate(() => $('#mobile-left-menu li li a:contains("Container1")').length > 0)).to.equal(true);
        expect(await page.evaluate(() => $('#mobile-left-menu li li a:contains("Container2")').length > 0)).to.equal(true);
    });

    it('should be able to show install code page for container with content', async function () {
        await page.goto(containerWithEntries);
        await (await page.jQuery('#secondNavBar .item:contains(Install Code)')).click();
        await page.waitForTimeout(250);
        await capture.modal(page, 'install_code_with_content');
    });

    it('should keep the selected container when navigating to manage containers', async function () {
        await page.goto(containerWithEntries);
        await (await page.jQuery('#secondNavBar .item:contains(Manage Containers)')).click();
        await page.waitForNetworkIdle();

        expect(page.url()).to.contain('action=manageContainers');
        expect(page.url()).to.contain('idContainer=aaacont1');
        expect(await page.evaluate(() => $('#secondNavBar .tag-manager-left-menu-dropdown .item.active').text().trim())).to.equal('Container1');
        expect(await page.evaluate(() => $('#secondNavBar .item:contains(Tags)').length > 0)).to.equal(true);
    });

    it('should show selected container context on manage containers when idContainer is in the query string', async function () {
        await page.goto(generalParamsSite1 + urlBase + 'manageContainers&idContainer=aaacont1');
        await page.waitForNetworkIdle();

        expect(await page.evaluate(() => $('#secondNavBar .tag-manager-left-menu-dropdown').length)).to.equal(1);
        expect(await page.evaluate(() => $('#secondNavBar .tag-manager-left-menu-dropdown .title').text().trim())).to.contain('Container1');
        expect(await page.evaluate(() => $('#secondNavBar .tag-manager-left-menu-dropdown .item.active').text().trim())).to.equal('Container1');
        expect(await page.evaluate(() => $('#secondNavBar .item:contains(Dashboard)').length > 0)).to.equal(true);
        expect(await page.evaluate(() => $('#secondNavBar .item:contains(Tags)').length > 0)).to.equal(true);
    });

    it('should be able to copy mtm tracking code', async function () {
        await page.goto(containerWithEntries);
        await page.waitForNetworkIdle();
        await (await page.jQuery('#secondNavBar .item:contains(Install Code)')).click();
        await page.waitForSelector('.modal.open .manageInstallTagCode .copyToClipboardButton');
        await page.evaluate(() => {
            const originalExecCommand = document.execCommand.bind(document);
            window.__copiedText = '';
            document.execCommand = ((commandId) => {
                if (commandId === 'copy') {
                    const textarea = document.querySelector('textarea[readonly]');
                    window.__copiedText = (textarea && textarea.value) || '';
                }
                return originalExecCommand(commandId);
            });
        });
        await page.click('.modal.open .manageInstallTagCode .copyToClipboardButton');
        const clipboardText = await page.evaluate(() => window.__copiedText)
            .then((text) => text.replace(/https?:\/\/[^/]+\//g, 'http://localhost/'));
        const expectedText = `<!-- Matomo Tag Manager -->
<script>
  var _mtm = window._mtm = window._mtm || [];
  _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
  (function() {
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src='http://localhost/tests/PHPUnit/proxy/js/container_aaacont1.js'; s.parentNode.insertBefore(g,s);
  })();
</script>
<!-- End Matomo Tag Manager -->`;
        expect(clipboardText).to.equal(expectedText);
    });

    it('should be able to show publish page for container with content', async function () {
        await page.goto(containerWithEntries);
        await page.waitForNetworkIdle();
        await page.evaluate(function(){
            $('#secondNavBar .item:contains(Publish)').click();
        });
        await page.waitForNetworkIdle();
        await page.waitForTimeout(500);
        await capture.modal(page, 'publish_with_content');
    });

    it('should show the manage website screen', async function () {
        permissions.setSuperUser();
        const urlToTest = "?module=SitesManager&action=index&idSite=2&period=day&date=yesterday&showaddsite=false";
        await page.goto(urlToTest);
        await capture.page(page, 'manageWebsites')
    });

    it('should show the container detail when delete button is pressed', async function () {
        permissions.setSuperUser();
        const urlToTest = "?module=SitesManager&action=index&idSite=2&period=day&date=yesterday&showaddsite=false";
        await page.goto(urlToTest);
        await page.waitForNetworkIdle();
        const pageElement = await page.$('.page');
        await page.evaluate(function(){
          $('.sitesManagerList .card-content:eq(1) .icon-delete').click()
        });
        await page.waitForTimeout(250);
        await capture.modal(page, 'manageWebsitesDeleteAction');
    });

    it("should display the MTM settings page", async function () {
        await page.goto('?module=CoreAdminHome&action=generalSettings&idSite=1&period=day&date=yesterday#/TagManager');
        expect(await page.screenshotSelector('#TagManagerPluginSettings')).to.matchImage('settings_page');
    });

    it("should be able to update restrict MTM access setting", async function () {
        await page.evaluate(() => $('select[name="restrictTagManagerAccess"]').click());
        await page.evaluate(() => $('li:nth-child(2)').click());
        await page.evaluate(() => $('#TagManagerPluginSettings .pluginsSettingsSubmit').click());
        await page.type('.confirm-password-modal input[type=password]', superUserPassword);
        await page.click('.confirm-password-modal .modal-close.btn');
        await page.waitForNetworkIdle();
        await page.mouse.move(-10, -10);
        expect(await page.screenshotSelector('#TagManagerPluginSettings')).to.matchImage('update_restrict_setting');
    });

    it('should fail to load MTM for view user', async function () {
        permissions.setViewUser();
        await page.goto(generalParamsSite1 + urlBase + 'manageContainers');
        const bodyElement = await page.$('body');
      expect(await bodyElement.screenshot()).to.matchImage('view_access_restricted');
    });

    it('should show MTM on tracking code page when user access is not restricted', async function () {
        await page.goto("?idSite=1&module=CoreAdminHome&action=trackingCodeGenerator");
        await page.waitForNetworkIdle();

        expect(await page.screenshotSelector('div.pageWrap')).to.matchImage('tracking_code_normal');
    });

    it('should hide MTM from tracking code page when user access is restricted', async function () {
        permissions.setViewUser();
        await page.goto("?idSite=1&module=CoreAdminHome&action=trackingCodeGenerator");
        await page.waitForNetworkIdle();

        expect(await page.screenshotSelector('div.pageWrap')).to.matchImage('tracking_code_hidden');
    });
});
