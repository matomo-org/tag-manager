/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


exports.selector = function (done, screenshotName, selector, theTest)
{
    expect.screenshot(screenshotName).to.be.captureSelector(selector, theTest, done);
}

exports.topControls = function (done, screenshotName, theTest)
{
    exports.selector(done, screenshotName, '.top_controls', theTest);
}

exports.pageWithMenu = function (done, screenshotName, theTest)
{
    exports.selector(done, screenshotName, '#content,#notificationContainer', theTest);
}

exports.page = function (done, screenshotName, theTest)
{
    exports.selector(done, screenshotName, '.page,#notificationContainer', theTest);
}

exports.notification = function (done, screenshotName, theTest)
{
    exports.selector(done, screenshotName, '#notificationContainer', theTest);
}

exports.modal = function (done, screenshotName, theTest)
{
    exports.selector(done, screenshotName, '.modal.open', theTest);
}
