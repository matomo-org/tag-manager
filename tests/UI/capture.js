/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

// A CSS transition keeps repainting after the DOM has stopped changing, so waiting on the page cannot tell
// whether the pixels have settled. The modal footer's scroll shadow is the one that bites: it is still fading
// when the capture lands, which differs by a few thousand pixels between otherwise identical runs.
exports.disableAnimations = async function (page) {
  await page.webpage.addStyleTag({
    content: '*, *::before, *::after { transition: none !important; animation: none !important; }',
  });
};

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

async function settleOpenModal(page)
{
    await page.waitForNetworkIdle();

    const modal = await page.waitForSelector('.modal.open');

    // The modal fades in through anime.js, which Materialize binds at load time, so the screenshot override
    // that zeroes M.anime durations does not reach it and the CSS-only disableAnimations cannot stop it. A
    // fixed sleep lost the race on slow runners; wait for the final frame (opacity 1, unscaled) instead.
    try {
        await page.waitForFunction(function () {
            return Array.prototype.every.call(document.querySelectorAll('.modal.open'), function (m) {
                return m.style.opacity === '1' && m.style.transform.indexOf('scaleX(1)') !== -1;
            });
        }, { timeout: 5000 });
    } catch (e) {
        // fall through: the animation may not advance at all, which the styles forced below handle
    }

    // Materialize's modal open-animation may not advance under the new headless Chrome, leaving stale
    // inline styles that offset the capture; settle the open modal to its final state before capturing.
    await page.evaluate(function () {
        document.querySelectorAll('.modal.open').forEach(function (m) {
            m.style.top = '10%';
            m.style.transform = 'none';
            m.style.opacity = '1';
        });
    });

    await exports.disableAnimations(page);

    return modal;
}

exports.modal = async function (page, screenshotName, comparisonThreshold)
{
    const modal = await settleOpenModal(page);

    await exports.setTableRowHeight(page);
    const image = comparisonThreshold
        ? { imageName: screenshotName, comparisonThreshold: comparisonThreshold }
        : screenshotName;
    expect(await modal.screenshot()).to.matchImage(image);
};
