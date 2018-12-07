/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


exports.selector = async function (page, screenshotName, selector)
{
    expect(await page.screenshotSelector(selector)).to.matchImage(screenshotName);
};

exports.topControls = async function (page, screenshotName)
{
    await exports.selector(page, screenshotName, '.top_controls');
};

exports.pageWithMenu = async function (page, screenshotName)
{
    await exports.selector(page, screenshotName, '#content,#notificationContainer');
};

exports.page = async function (page, screenshotName)
{
    await exports.selector(page, screenshotName, '.page,#notificationContainer');
};

exports.notification = async function (page, screenshotName)
{
    await exports.selector(page, screenshotName, '#notificationContainer');
};

exports.modal = async function (page, screenshotName)
{
    await page.waitForNetworkIdle();
    await page.waitFor(500); // ensure animation is finished

    pageWrap = await page.$('.modal.open');
    expect(await pageWrap.screenshot()).to.matchImage(screenshotName);
};
