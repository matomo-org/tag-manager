/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

exports.sendFieldValue = async function (page, selector, text) {
  await page.evaluate((selector) => {
    $(selector).val('').change();
  }, selector);

  await page.waitForFunction(() => $(selector).val() === '');

  await page.evaluate((selector, text) => {
    $(selector).val(text).change();
  }, selector, text);

  await page.waitForFunction(() => $(selector).val() === text);
};
exports.selectValue = async function (page, field, title) {
  await page.evaluate((field) => {
    $(field + ' input.select-dropdown').click()
  }, field);

  await page.waitForFunction(() => $(field + ' .dropdown-content li:contains("' + title + '")').length() > 0);

  await page.evaluate((field, title) => {
    $(field + ' .dropdown-content li:contains("' + title + '"):first').click()
  }, field, title);
};
