/*!
 * Matomo - free/libre analytics platform
 *
 * Screenshot integration tests.
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

describe("EmptySite_MTM_SingleSiteSingleContainer", function () {

  this.fixture = "Piwik\\Tests\\Fixtures\\EmptySite";

  const generalParams = 'idSite=1&period=day&date=2010-01-03';

  it('should show the MTM tracking code if the website has no recorded data one container', async function () {

    testEnvironment.detectedContentDetections = [];
    testEnvironment.connectedConsentManagers = [];
    testEnvironment.save();

    const urlToTest = "?" + generalParams + "&module=CoreHome&action=index#?" + generalParams + '&activeTab=matomotagmanager';
    await page.goto(urlToTest);
    await page.waitForSelector('#start-tracking-details .codeblock', {visible: true});
    await page.evaluate(function () {
      // since containerID will be random and keeps changing
      var selector = $('#start-tracking-details .codeblock');
      selector.text(selector.text().replace(/http(.*)container_(.*).js/g, 'http://localhost/js/container_test123.js'));
    });

    const pageElement = await page.$('.page');
    expect(await pageElement.screenshot()).to.matchImage('emptySiteDashboard');
  });

});
