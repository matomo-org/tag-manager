/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */


exports.clickButton = function(page, button)
{
    page.click('.modal.open .modal-footer a:contains(' + button + ')');
}

exports.close = function(page)
{
    page.execCallback(function () {
        page.webpage.evaluate(function () {
            $('.modal.open').closeModal();
        });
    });
}
