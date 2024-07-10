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

    async function createOrUpdateContainer(page)
    {
        await page.click('.editContainer .createButton');
    }

    async function cancelContainer(page)
    {
        await page.click('.editContainer .entityCancel a');
    }

    var selectorContainerOpen = '.top_controls .tagContainerSelector .dropdown';

    it('should load a getting started page', async function () {
        await page.goto(generalParamsSite1 + urlBase + 'gettingStarted');
        await capture.page(page, 'getting_started');
    });

    it('should show websites dropdown without all websites', async function () {
        await page.evaluate(() => $('.top_bar_sites_selector .siteSelector a.title').click());
        pageWrap = await page.$('.top_bar_sites_selector .dropdown');
        expect(await pageWrap.screenshot()).to.matchImage('websites_dropdown_without_all_websites');
        await page.evaluate(() => $('.top_bar_sites_selector .siteSelector a.title').click());
    });

    it('should show top bar list when no container exists', async function () {
        await page.goto(generalParamsSite5 + urlBase + 'gettingStarted');
        await capture.topControls(page, 'top_controls_no_container_exists');
    });

    it('should open container selector and show no containers exist', async function () {
        await page.click('.tagContainerSelector');
        await page.waitForTimeout(250);
        await capture.selector(page, 'top_controls_no_container_exists_open', selectorContainerOpen);
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

    it('should be able to show install code page for container with content', async function () {
        await page.goto(containerWithEntries);
        await (await page.jQuery('#secondNavBar .item:contains(Install Code)')).click();
        await page.waitForTimeout(250);
        await capture.modal(page, 'install_code_with_content');
    });

    it('should be able to copy mtm tracking code', async function () {
        await page.allowClipboard();
        await page.click('.copyToClipboardSpan');
        const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
        const expectedText = `<!-- Matomo Tag Manager -->
<script>
  var _mtm = window._mtm = window._mtm || [];
  _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
  (function() {
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src='https://localhost/tests/PHPUnit/proxy/js/container_aaacont1.js'; s.parentNode.insertBefore(g,s);
  })();
</script>
<!-- End Matomo Tag Manager -->`;
        expect(clipboardText).to.equal(expectedText);
    });

    it('should be able to show publish page for container with content', async function () {
        await modal.close(page);
        await page.evaluate(function(){
            $('#secondNavBar .item:contains(Publish)').click();
        });
        await page.waitForNetworkIdle();
        await page.waitForTimeout(500);
        await capture.modal(page, 'publish_with_content');
    });


});
