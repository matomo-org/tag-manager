/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
describe("ContainerDashboard", function () {
    this.timeout(0);

    this.fixture = "Piwik\\Plugins\\TagManager\\tests\\Fixtures\\TagManagerFixture";
    this.optionsOverride = {
        'persist-fixture-data': false
    };

    var generalParamsSite1 = '?idSite=2&period=day&date=2010-01-03',
        generalParamsSite5 = '?idSite=5&period=day&date=2010-01-03',
        urlBase = '&module=TagManager&action=dashboard';

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

    it('should show an empty dashboard', async function () {
        await page.goto(generalParamsSite1 + urlBase + '&idContainer=aaacont3&idSite=2&period=day&date=yesterday');
        await capture.pageWithMenu(page, 'empty_container');
    });

    it('should show dashboard with entries', async function () {
        await page.goto(generalParamsSite1 + urlBase + '&idContainer=aaacont1&idSite=2&period=day&date=yesterday');
        await capture.pageWithMenu(page, 'with_entries');
    });

});