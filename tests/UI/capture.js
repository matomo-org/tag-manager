/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

// the first table row can for some reason can have height that varies randomly by 1px.
// hardcoding to 78px here for screenshot tests.
exports.setTableRowHeight = async function (page) {
    await page.evaluate(() => {
        $('table tr').each(function () {
            $(this).css('height', '78px');
        });
    });
};

exports.selector = async function (page, screenshotName, selector)
{
    await exports.setTableRowHeight(page);
    expect(await page.screenshotSelector(selector)).to.matchImage({
        imageName: screenshotName,
        comparisonThreshold: 0.05,
    });
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
    await exports.selector(page, screenshotName, '.pageWrap,#notificationContainer,#secondNavBar');
};

exports.notification = async function (page, screenshotName)
{
    await exports.selector(page, screenshotName, '#notificationContainer');
};

exports.modal = async function (page, screenshotName)
{
    await page.waitForNetworkIdle();
    await page.waitForTimeout(500); // ensure animation is finished

    pageWrap = await page.$('.modal.open');

    await exports.setTableRowHeight(page);
    expect(await pageWrap.screenshot()).to.matchImage(screenshotName);
};
