/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
describe("ContainerTag", function () {
    this.timeout(0);

    this.fixture = "Piwik\\Plugins\\TagManager\\tests\\Fixtures\\TagManagerFixture";
    this.optionsOverride = {
        'persist-fixture-data': false
    };

    var generalParamsSite1 = '?idSite=2&period=day&date=2010-01-03',
        generalParamsSite5 = '?idSite=5&period=day&date=2010-01-03',
        urlBase = '&module=TagManager&action=manageTags',
    container1Base = generalParamsSite1 + urlBase + '&idContainer=aaacont1',
    container3Base = generalParamsSite1 + urlBase + '&idContainer=aaacont3';

    var permissions = require("./permissions");
    var form = require("./form");
    var capture = require("./capture");
    var modal = require("./modal");

    before(function () {
        testEnvironment.pluginsToLoad = ['TagManager'];
        testEnvironment.save();
    });

    afterEach(function () {
        permissions.resetUser();
        testEnvironment.testUseMockAuth = 1;
        testEnvironment.save();
    });

    function selectTagType(page, tagType)
    {
        page.click('.editTag .collection-item.templateType' + tagType);
    }

    function setTagName(page, name, prefix)
    {
        if (!prefix) {
            prefix = '';
        } else {
            prefix += ' ';
        }
        form.sendFieldValue(page, prefix + '.editTag [id=name]', name);
    }

    function setParameterValue(page, tagName, value)
    {
        form.sendFieldValue(page, '.editTag [id=' + tagName + ']', value);
    }

    function selectParameterValue(page, tagName, value)
    {
        form.selectValue(page, '.editTag [id=' + tagName + ']', value);
    }

    function clickFirstRowTableAction(page, action, rowIndex)
    {
        if (!rowIndex) {
            rowIndex = 3;
        }
        page.click('.tagManagerTagList .entityTable tbody tr:nth-child(' + rowIndex + ') .table-action.' + action);
    }

    function createOrUpdateTag(page)
    {
        page.click('.editTag .createButton');
    }

    function cancelTag(page)
    {
        page.click('.editTag .entityCancel a');
    }

    it('should load tags page with some tags', function (done) {
        this.retries(3);
        capture.page(done, 'tag_some_exist', function (page) {
            page.load(container1Base);
            page.wait(1000);
        }, done);
    });

    it('should be able to create a new tag and show list of available types', function (done) {
        capture.page(done, 'create_new', function (page) {
            page.click('.createNewTag');
        }, done);
    });

    it('should be able to select a type and then show create tag screen', function (done) {
        capture.page(done, 'create_new_type_selected', function (page) {
            selectTagType(page, 'CustomHtml');
        }, done);
    });

    it('should show an error when not possible to create tag', function (done) {
        capture.page(done, 'create_new_error', function (page) {
            form.selectValue(page, '.fireTrigger0 [name=fire_triggers]', 'Mytrigger3');
            createOrUpdateTag(page);
        }, done);
    });

    it('should fade out tags that cannot be created', function (done) {
        permissions.setWriteUser()
        capture.page(done, 'create_new_custom_templates_restricted', function (page) {
            page.load(container1Base);
            page.click('.createNewTag');
        }, done);
    });

    it('should be able to prefill tag', function (done) {
        capture.page(done, 'create_new_prefilled', function (page) {
            page.load(container1Base);
            page.click('.createNewTag');
            selectTagType(page, 'CustomHtml');
            form.selectValue(page, '.fireTrigger0 [name=fire_triggers]', 'Mytrigger3');
            setParameterValue(page, 'customHtml', '<script></script>');
        }, done);
    });

    it('should be able to create a new tag and show update afterwards', function (done) {
        capture.page(done, 'create_new_submitted', function (page) {
            createOrUpdateTag(page);
        }, done);
    });

    it('should be possible to go back to list of tags and show created tag', function (done) {
        capture.page(done, 'create_new_shown_in_list', function (page) {
            cancelTag(page);
        }, done);
    });

    it('should be possible to edit a tag by clicking on edit', function (done) {
        capture.page(done, 'edit_through_list', function (page) {
            clickFirstRowTableAction(page, 'icon-edit');
        }, done);
    });

    it('should be possible to edit a trigger directly', function (done) {
        capture.page(done, 'edit_trigger_directly_popup', function (page) {
            page.click('.fireTrigger .icon-edit');
        }, done);
    });

    it('should be possible to edit a trigger directly', function (done) {
        capture.page(done, 'edit_trigger_directly_updated', function (page) {
            form.sendFieldValue(page, '.modal.open .editTrigger [id=name]', 'updatedTrigger');
            page.click('.modal.open .createButton');
        }, done);
    });

    it('should load an edit tag through URL', function (done) {
        capture.page(done, 'edit_url', function (page) {
            page.load(container1Base + '#?idTag=2');
        }, done);
    });

    it('should enable edit button after changing a field', function (done) {
        capture.page(done, 'edit_url_updated', function (page) {
            setTagName(page, 'tagNameNew');
            createOrUpdateTag(page);
        }, done);
    });

    it('should have updated the list of tags', function (done) {
        capture.page(done, 'edit_updated_back_to_list', function (page) {
            cancelTag(page);
        }, done);
    });

    it('should show confirm delete tag dialog', function (done) {
        capture.modal(done, 'confirm_delete_tag', function (page) {
            page.load(container1Base);
            clickFirstRowTableAction(page, 'icon-delete', 3);
        }, done);
    });

    it('should do nothing when selecting no', function (done) {
        capture.page(done, 'confirm_delete_tag_declined', function (page) {
            modal.clickButton(page, 'No')
        }, done);
    });

    it('should delete tag when confirmed', function (done) {
        capture.page(done, 'confirm_delete_tag_confirmed', function (page) {
            clickFirstRowTableAction(page, 'icon-delete', 3);
            modal.clickButton(page, 'Yes')
        }, done);
    });

    it('should load tags page with no tags as view user', function (done) {
        permissions.setViewUser();
        capture.page(done, 'tag_none_exist_view_user', function (page) {
            permissions.setViewUser();
            page.load(container3Base);
            page.wait(1000);
        }, done);
    });

    it('should load a tags page with no tags', function (done) {
        capture.page(done, 'tag_none_exist_yet', function (page) {
            page.load(container3Base);
        }, done);
    });

    it('should open create tag page when clicking on create a tag now link', function (done) {
        capture.page(done, 'tag_none_exist_yet_create_now', function (page) {
            page.click('.createContainerTagNow');
        }, done);
    });

    it('should be possible to start create a tag and show advanced settings', function (done) {
        capture.page(done, 'create_advanced_prefilled1', function (page) {
            selectTagType(page, 'CustomHtml');
            form.selectValue(page, '.fireTrigger0 [name=fire_triggers]', 'Mytrigger3');
            setParameterValue(page, 'customHtml', '<script></script>');
            page.click('.showAdvancedSettings');
        }, done);
    });

    it('should be possible to complete creating a tag with show advanced settings', function (done) {
        capture.page(done, 'create_advanced_prefilled2', function (page) {
            setParameterValue(page, 'fire_delay', '500');
            setParameterValue(page, 'priority', '402');
            setParameterValue(page, 'start_date_date', '2017-01-02');
            setParameterValue(page, 'start_date_time', '03:04:05');
            setParameterValue(page, 'end_date_date', '2030-05-12');
            setParameterValue(page, 'end_date_time', '11:42:05');
            page.click('label[for=fire_limitonce_24hours]');
        }, done);
    });

    it('should show missing fire trigger error', function (done) {
        capture.page(done, 'create_advanced_firetrigger_error', function (page) {
            createOrUpdateTag(page);
        }, done);
    });

    it('should be possible to create a fire trigger directly', function (done) {
        capture.modal(done, 'create_advanced_firetrigger_popup', function (page) {
            page.click('.createNewFireTrigger');
        }, done);
    });

    it('should be possible to prefill fire trigger', function (done) {
        capture.modal(done, 'create_advanced_firetrigger_typeselected', function (page) {
            page.click('.modal.open .templateTypeAllElementsClick');
        }, done);
    });

    it('should be possible to prefill fire trigger', function (done) {
        capture.page(done, 'create_advanced_firetrigger_created', function (page) {
            page.click('.modal.open .createButton');
        }, done);
    });

    it('should be possible to create a block trigger directly', function (done) {
        capture.page(done, 'create_advanced_blocktrigger_created', function (page) {
            page.click('.createBlockTriggerInHelp');
            page.click('.modal.open .templateTypeAllElementsClick');
            page.click('.modal.open .createButton');
        }, done);
    });

    it('should be possible to create a tag with advanced settings', function (done) {
        capture.page(done, 'create_advanced_submitted', function (page) {
            createOrUpdateTag(page);
            page.click('.showAdvancedSettings');
        }, done);
    });

    it('should be possible to create a tag with conditions filter', function (done) {
        capture.page(done, 'create_advanced_verified', function (page) {
            cancelTag(page);
        }, done);
    });

    it('should load tags page with some tags as view user', function (done) {
        this.retries(3);
        permissions.setViewUser();
        capture.page(done, 'tag_some_exist_view_user', function (page) {
            permissions.setViewUser();
            page.load(container1Base);
            page.wait(1000);
        }, done);
    });


});