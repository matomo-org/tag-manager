/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

exports.sendFieldValue = function (page, selector, text)
{
    page.execCallback(function () {
        page.webpage.evaluate(function(selector) {
            $(selector).val('').change();
        }, selector);
    });

    // page.sendKeys(selector, text);

    page.execCallback(function () {
        page.webpage.evaluate(function(selector, text) {
            $(selector).val(text).change();
        }, selector, text);
    });
};
exports.selectValue = function (page, field, title)
{
    page.execCallback(function () {
        page.webpage.evaluate(function(field) {
            $(field + ' input.select-dropdown').click()
        }, field);
    });
    page.wait(800);
    page.execCallback(function () {
        page.webpage.evaluate(function(field, title) {
            $(field + ' .dropdown-content.active li:contains("' + title + '"):first').click()
        }, field, title);
    });
};