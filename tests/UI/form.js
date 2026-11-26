/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

exports.sendFieldValue = async function (page, selector, text)
{
    await page.evaluate((selector) => {
        $(selector).val('').change();
    }, selector);

    // page.sendKeys(selector, text);

    await page.evaluate((selector, text) => {
        $(selector).val(text).change();
    }, selector, text);

    await page.waitForTimeout(200);
};
exports.sendCodeEditorValue = async function (page, selector, text)
{
    await page.waitForSelector(selector + ' .cm-content');
    await page.click(selector + ' .cm-content');
    await page.keyboard.down('Control');
    await page.keyboard.press('KeyA');
    await page.keyboard.up('Control');

    await page.evaluate((selector, text) => {
        const clipboardData = new DataTransfer();
        clipboardData.setData('text/plain', text);
        document.querySelector(selector + ' .cm-content').dispatchEvent(
            new ClipboardEvent('paste', { clipboardData, bubbles: true, cancelable: true })
        );
    }, selector, text);

    await page.waitForTimeout(200);
};
exports.selectValue = async function (page, field, title)
{
    await page.evaluate((field) => {
        $(field + ' input.select-dropdown').click()
    }, field);
    await page.waitForTimeout(800);
    await page.evaluate((field, title) => {
        $(field + ' .dropdown-content li:contains("' + title + '"):first').click()
    }, field, title);
};
