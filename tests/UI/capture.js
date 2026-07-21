/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

// the first table row can for some reason can have height that varies randomly by 1px.
// hardcoding to 78px here for screenshot tests.
exports.setTableRowHeight = async function (page) {
  await page.waitForSelector('#content .card-content');
  await page.webpage.addStyleTag({
    content: 'table tr { height: 78px; }',
  });
};

exports.selector = async function (page, screenshotName, selector)
{
    await exports.setTableRowHeight(page);
    expect(await page.screenshotSelector(selector)).to.matchImage({
        imageName: screenshotName,
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
    await exports.selector(page, screenshotName, '.pageWrap,#notificationContainer,.navbar');
};

exports.notification = async function (page, screenshotName)
{
    await exports.selector(page, screenshotName, '#notificationContainer');
};

exports.modal = async function (page, screenshotName)
{
    await page.waitForNetworkIdle();
    await page.waitForTimeout(500); // ensure animation is finished

    pageWrap = await page.waitForSelector('.modal.open');

    // Materialize's modal open-animation may not advance under the new headless Chrome, leaving stale
    // inline styles that offset the capture; settle the open modal to its final state before capturing.
    await page.evaluate(function () {
        document.querySelectorAll('.modal.open').forEach(function (m) {
            m.style.top = '10%';
            m.style.transform = 'none';
            m.style.opacity = '1';
        });
    });

    await exports.setTableRowHeight(page);
    expect(await pageWrap.screenshot()).to.matchImage(screenshotName);
};
