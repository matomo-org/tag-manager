/*!
 * Matomo - free/libre analytics platform
 *
 * Screenshot integration tests.
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

describe("EmptySite_MTM_MultipleContainers", function () {

  this.fixture = "Piwik\\Plugins\\TagManager\\tests\\Fixtures\\TagManagerNoTrackingFixture";

  const generalParams = 'idSite=2&period=day&date=2010-01-03';

  it('should show the MTM tracking code if the website has no recorded data multiple containers', async function () {
    const urlToTest = "?" + generalParams + "&module=CoreHome&action=index#?" + generalParams + '&activeTab=matomotagmanager';
    await page.goto(urlToTest);
    await page.waitForNetworkIdle();
    await page.waitForSelector('#start-tracking-details .codeblock', {visible: true});
    await page.evaluate(function () {
      // since containerID will be random and keeps changing
      var selector = $('#start-tracking-details .codeblock');
      selector.text(selector.text().replace(/http(.*)container_(.*).js/g, 'http://localhost/js/container_test123.js'));
    });

    const pageElement = await page.$('.page');
    expect(await pageElement.screenshot()).to.matchImage('emptySiteDashboard');
  });

  it('should show the advanced options when clicked', async function () {
    await page.click('div.advance-option > span > a');
    await page.waitForSelector('#tagManagerTrackingCodeSite', {visible: true});

    const pageElement = await page.$('.page');
    expect(await pageElement.screenshot()).to.matchImage('showAdvanced');
  });
});
