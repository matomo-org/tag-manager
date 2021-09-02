(function ($) {
    var tagManagerHelper = {};
    tagManagerHelper.editTrigger = function ($scope, idContainer, idContainerVersion, idTag, callback) {
        if (!$scope) {
            $scope = piwikHelper.getAngularDependency('$rootScope');
        }

        var childScope = $scope.$new(true, $scope);
        var template = $('<div class="tag-ui-confirm"><div piwik-trigger-edit id-container="idContainer" on-change-trigger="onChangeTrigger(trigger)" id-container-version="idContainerVersion" id-trigger="' + parseInt(idTag,10) +'"></div><input role="no" type="button" value="' + _pk_translate('General_Cancel') +'"/></div>')

        var params = {
            idContainer: idContainer,
            idContainerVersion: idContainerVersion,
            onChangeTrigger: function (trigger) {
                if ('function' === typeof callback) {
                    callback(trigger);
                }
                var modal = M.Modal.getInstance(template.parents('.modal.open'));

                if (modal) {
                    modal.close();
                }
            }
        };
        piwikHelper.compileAngularComponents(template, {scope: childScope, params: params});
        piwikHelper.modalConfirm(template, {}, {extraWide: true, onCloseEnd: function () {
            childScope.$destroy();
            template.empty();
        }});
    };

    tagManagerHelper.createNewVersion = function () {
        var piwikUrl = piwikHelper.getAngularDependency('piwikUrl');
        var containerId = piwikUrl.getSearchParam('idContainer');
        this.editVersion(null, containerId, 0, function () { window.location.reload(); });
    };
    tagManagerHelper.editVersion = function ($scope, idContainer, idContainerVersion, callback) {
        if (!$scope) {
            $scope = piwikHelper.getAngularDependency('$rootScope');
        }

        var childScope = $scope.$new(true, $scope);
        var template = $('<div class="tag-ui-confirm"><div piwik-version-edit id-container="idContainer" on-change-version="onChangeVersion(version)" id-container-version="idContainerVersion"></div><input role="no" type="button" value="' + _pk_translate('General_Cancel') +'"/></div>')

        var params = {
            idContainer: idContainer,
            idContainerVersion: parseInt(idContainerVersion, 10),
            onChangeVersion: function (version) {
                if ('function' === typeof callback) {
                    callback(version);
                }
                var modal = M.Modal.getInstance(template.parents('.modal.open'));

                if (modal) {
                    modal.close();
                }
            }
        };
        piwikHelper.compileAngularComponents(template, {scope: childScope, params: params});
        piwikHelper.modalConfirm(template, {}, {extraWide: true, onCloseEnd: function () {
            childScope.$destroy();
            template.empty();
        }});
    };

    tagManagerHelper.editVariable = function ($scope, idContainer, idContainerVersion, idVariable, callback, variableType) {
        if (!$scope) {
            $scope = piwikHelper.getAngularDependency('$rootScope');
        }

        var childScope = $scope.$new(true, $scope);
        var template = $('<div class="tag-ui-confirm"><div piwik-variable-edit id-container="idContainer" variable-type="variableType" on-change-variable="onChangeVariable(variable)" id-container-version="idContainerVersion" id-variable="idVariable"></div><input role="no" type="button" value="' + _pk_translate('General_Cancel') +'"/></div>')

        var params = {
            idContainer: idContainer,
            idVariable: idVariable,
            variableType: variableType,
            idContainerVersion: parseInt(idContainerVersion, 10),
            onChangeVariable: function (variable) {
                if ('function' === typeof callback) {
                    callback(variable);
                }
                var modal = M.Modal.getInstance(template.parents('.modal.open'));

                if (modal) {
                    modal.close();
                }
            }
        };

        piwikHelper.compileAngularComponents(template, {scope: childScope, params: params});
        piwikHelper.modalConfirm(template, {}, {extraWide: true, onCloseEnd: function () {
            childScope.$destroy();
            template.empty();
        }});
    };

    tagManagerHelper.selectVariable = function (callback) {
        var $scope = piwikHelper.getAngularDependency('$rootScope');
        var piwikUrl = piwikHelper.getAngularDependency('piwikUrl');
        var containerId = piwikUrl.getSearchParam('idContainer');

        var childScope = $scope.$new(true, $scope);
        var template = $('<div class="ui-confirm"><h2>Select a variable</h2><div piwik-variable-select id-container="idContainer" on-select-variable="onSelectVariable(variable)"></div><input role="no" type="button" value="' + _pk_translate('General_Cancel') +'"/></div>')

        var params = {
            idContainer: containerId,
            onSelectVariable: function (variable) {
                if ('function' === typeof callback) {
                    callback(variable);
                }
                var modal = M.Modal.getInstance(template.parents('.modal.open'));

                if (modal) {
                    modal.close();
                }
            }
        };
        piwikHelper.compileAngularComponents(template, {scope: childScope, params: params});
        piwikHelper.modalConfirm(template, {}, {onCloseEnd: function () {
            childScope.$destroy();
            template.empty();
        }});
    };
    tagManagerHelper.insertTextSnippetAtElement = function(inputField, textToAdd) {
        if (!inputField || !textToAdd) {
            return;
        }

        var scrollPos = inputField.scrollTop;
        var startPos = inputField.selectionStart;
        var endPos = inputField.selectionEnd;

        var value = String(inputField.value);
        var valueBefore = value.substring(0, startPos);
        var valueAfter = value.substring(endPos, value.length);
        inputField.value = valueBefore + textToAdd + valueAfter;
        inputField.selectionStart = startPos + textToAdd.length;
        inputField.selectionEnd = startPos + textToAdd.length;
        inputField.focus();

        inputField.scrollTop = scrollPos;
        $(inputField).change();
    };

    tagManagerHelper.showInstallCode = function (idContainer) {
        var $scope = piwikHelper.getAngularDependency('$rootScope');
        var childScope = $scope.$new(true, $scope);
        var template = $('<div class="tag-ui-confirm"><div piwik-manage-install-tag-code id-container="{{ idContainer }}"></div><input role="no" type="button" value="' + _pk_translate('General_Cancel') +'"/>')

        var params = {
            idContainer: idContainer
        };
        piwikHelper.compileAngularComponents(template, {scope: childScope, params: params});
        piwikHelper.modalConfirm(template, {}, {extraWide: true, onCloseEnd: function () {
            childScope.$destroy();
            template.empty();
        }});
    };
    tagManagerHelper.enablePreviewMode = function (idContainer, idContainerVersion) {
        if (!idContainerVersion) {
            idContainerVersion = 0;
        }
        var piwikApi = piwikHelper.getAngularDependency('piwikApi');
        var params = {method: 'TagManager.enablePreviewMode', idContainer: idContainer, idContainerVersion: idContainerVersion};
        piwikHelper.modalConfirm('<h2>' + _pk_translate('TagManager_EnablingPreviewPleaseWait') + '</h2>', {});
        piwikApi.fetch(params).then(function () {
            tagManagerHelper.updateDebugSiteFlag(piwik.siteMainUrl, idContainer, 1);
            window.location.reload();
        });
    };
    tagManagerHelper.disablePreviewMode = function (idContainer) {
        var piwikApi = piwikHelper.getAngularDependency('piwikApi');
        var params = {method: 'TagManager.disablePreviewMode', idContainer: idContainer};
        piwikHelper.modalConfirm('<h2>' + _pk_translate('TagManager_DisablingPreviewPleaseWait') + '</h2>', {});
        piwikApi.fetch(params).then(function () {
            tagManagerHelper.updateDebugSiteFlag(piwik.siteMainUrl, idContainer, -1);
            window.location.reload();
        });
    };
    tagManagerHelper.changeDebugUrl = function (idContainer, oldUrl) {
        var newUrl = document.getElementById('previewDebugUrl').value;
        if (newUrl != '' && newUrl != null && oldUrl != newUrl) {
            var piwikApi = piwikHelper.getAngularDependency('piwikApi');
            var params = {method: 'TagManager.changeDebugUrl', idContainer: idContainer, url: newUrl};
            piwikHelper.modalConfirm('<h2>' + _pk_translate('TagManager_UpdatingDebugSiteUrlPleaseWait') + '</h2>', {});
            piwikApi.fetch(params).then(function () {
                tagManagerHelper.updateDebugSiteFlag(oldUrl, idContainer, -1);
                tagManagerHelper.updateDebugSiteFlag(newUrl, idContainer, 1);
                window.location.reload();
            });
        }
    };
    tagManagerHelper.updateDebugSiteFlag = function (url, idContainer, debugFlag) {
        if (!url || !idContainer || !debugFlag) {
            return;
        }
        window.open(url + (url.indexOf('?') == -1 ? '?' : '&') + 'mtmPreviewMode=' + idContainer + '&setDebugFlag=' + debugFlag, '_blank', 'toolbar=0,location=0,menubar=0');
    };
    tagManagerHelper.importVersion = function ($scope, idContainer) {
        var childScope = $scope.$new(true, $scope);
        var template = $('<div class="ui-confirm"><div piwik-import-version id-container="idContainer"></div><input role="no" type="button" value="' + _pk_translate('General_Cancel') +'"/>')

        var params = {
            idContainer: idContainer
        };
        piwikHelper.compileAngularComponents(template, {scope: childScope, params: params});
        piwikHelper.modalConfirm(template, {}, {extraWide: true, onCloseEnd: function () {
            childScope.$destroy();
            template.empty();
        }});
    };

    window.tagManagerHelper = tagManagerHelper;
})(jQuery);