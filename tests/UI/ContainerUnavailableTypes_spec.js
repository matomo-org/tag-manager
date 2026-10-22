/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
describe("ContainerUnavailableTypes", function () {
    this.fixture = "Piwik\\Plugins\\TagManager\\tests\\Fixtures\\TagManagerUnavailableTypesUiFixture";
    this.optionsOverride = {
        'persist-fixture-data': false
    };

    var containerBase = '?idSite=5&period=day&date=2010-01-03&module=TagManager&idContainer=aaacont8';

    before(function () {
        testEnvironment.pluginsToLoad = ['TagManager'];
        // disabled types are unavailable the same way as types of a plugin that is no longer active
        testEnvironment.overrideConfig('TagManager', {
            disable_tags: ['PingdomRUM'],
            disable_triggers: ['WindowLoaded'],
            disable_variables: ['Constant'],
        });
        testEnvironment.save();
    });

    after(function () {
        delete testEnvironment.configOverride.TagManager;
        testEnvironment.save();
    });

    async function openList(action)
    {
        await page.goto(containerBase + '&action=' + action);
        await page.waitForNetworkIdle();
        await page.waitForTimeout(500);
    }

    async function getRow(rowSelector, name)
    {
        return page.evaluate((rowSelector, name) => {
            var isVisible = (element) => !!element && element.offsetParent !== null;
            var row = Array.from(document.querySelectorAll(rowSelector))
                .find((tr) => tr.querySelector('td.name').textContent.trim() === name);
            if (!row) {
                return null;
            }

            return {
                type: row.querySelector('td.type').textContent.trim().replace(/\s+/g, ' '),
                edit: isVisible(row.querySelector('.icon-edit')),
                copy: isVisible(row.querySelector('.icon-content-copy')),
                delete: isVisible(row.querySelector('.icon-delete')),
                chips: Array.from(row.querySelectorAll('td.triggers .chip'))
                    .filter(isVisible)
                    .map((chip) => chip.tagName.toLowerCase() + ':' + chip.textContent.trim()),
            };
        }, rowSelector, name);
    }

    it('should show an unavailable tag type and only allow to delete the tag', async function () {
        await openList('manageTags');

        expect(await getRow('tr.tags', 'Unavailable tag')).to.deep.include({
            type: 'Not available (PingdomRUM)',
            edit: false,
            copy: false,
            delete: true,
        });
    });

    it('should show an unavailable trigger as a chip without a link', async function () {
        expect(await getRow('tr.tags', 'Available tag')).to.deep.include({
            type: 'Custom Image',
            edit: true,
            chips: ['a:Page view', 'span:Unavailable trigger'],
        });
    });

    it('should show an unavailable trigger type and only allow to delete the trigger', async function () {
        await openList('manageTriggers');

        expect(await getRow('tr.triggers', 'Unavailable trigger')).to.deep.include({
            type: 'Not available (WindowLoaded)',
            edit: false,
            copy: false,
            delete: true,
        });
    });

    it('should show an unavailable variable type and only allow to delete the variable', async function () {
        await openList('manageVariables');

        expect(await getRow('tr.variables', 'Unavailable variable')).to.deep.include({
            type: 'Not available (Constant)',
            edit: false,
            copy: false,
            delete: true,
        });
    });

    it('should only offer an unavailable trigger in the tag editor where the tag already uses it', async function () {
        await openList('manageTags');
        await page.evaluate(() => {
            Array.from(document.querySelectorAll('tr.tags'))
                .find((tr) => tr.querySelector('td.name').textContent.trim() === 'Available tag')
                .querySelector('.icon-edit')
                .click();
        });
        await page.waitForNetworkIdle();
        await page.waitForTimeout(500);

        const selectors = await page.evaluate(() => ['fire', 'block'].map((type) => {
            var row = document.querySelector('.' + type + 'Triggers .multiple');
            var select = row.querySelector('select');
            var edit = row.querySelector('.icon-edit');
            return {
                selected: select.options[select.selectedIndex].text,
                options: Array.from(select.options).map((option) => option.text).filter((text) => text),
                edit: !!edit && edit.offsetParent !== null,
            };
        }));

        expect(selectors[0]).to.deep.equal({ selected: 'Page view', options: ['Page view'], edit: true });
        expect(selectors[1]).to.deep.equal({
            selected: 'Unavailable trigger (not available)',
            options: ['Page view', 'Unavailable trigger (not available)'],
            edit: false,
        });
    });
});
