/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


exports.clickButton = async function(page, button)
{
    await (await page.jQuery('.modal.open .modal-footer a:contains(' + button + ')')).click();
    await page.waitForTimeout(250); // wait for modal to close
}

exports.close = async function(page)
{
    await page.evaluate(function () {
        var modal = M.Modal.getInstance($('.modal.open'));

        if (modal) {
            modal.close();
        }
    });
}
