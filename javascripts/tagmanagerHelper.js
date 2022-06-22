(function ($) {
    var tagManagerHelper = {};
    tagManagerHelper.editTrigger = function (idContainer, idContainerVersion, idTag, callback) {
      var createVNode = Vue.createVNode;
      var createVueApp = CoreHome.createVueApp;
      var TriggerEdit = TagManager.TriggerEdit;

      var template = $('<div class="tag-ui-confirm"><div></div><input role="no" type="button" value="'
        + _pk_translate('General_Cancel') +'"/></div>')

      var app = createVueApp({
        render: function () {
          return createVNode(TriggerEdit, {
            idContainer: idContainer,
            idContainerVersion: parseInt(idContainerVersion, 10),
            idTrigger: parseInt(idTag,10),
            isEmbedded: true,
            onChangeTrigger: function (event) {
              if ('function' === typeof callback) {
                callback(event.trigger);
              }
              var modal = M.Modal.getInstance(template.parents('.modal.open'));

              if (modal) {
                modal.close();
              }
            },
          });
        },
      });
      app.mount(template.children()[0]);

      piwikHelper.modalConfirm(template, {}, {
        extraWide: true,
        onCloseEnd: function () {
          app.unmount();
          template.empty();
        },
      });
    };

    tagManagerHelper.createNewVersion = function () {
        var containerId = CoreHome.MatomoUrl.parsed.value.idContainer;
        this.editVersion(null, containerId, 0, function () { window.location.reload(); });
    };
    tagManagerHelper.editVersion = function (idContainer, idContainerVersion, callback) {
      var createVNode = Vue.createVNode;
      var createVueApp = CoreHome.createVueApp;
      var VersionEdit = TagManager.VersionEdit;

      var template = $('<div class="tag-ui-confirm ui-confirm"><div></div><input role="no" type="button" value="'
        + _pk_translate('General_Cancel') +'"/></div>')

      var app = createVueApp({
        render: function () {
          return createVNode(VersionEdit, {
            idContainer: idContainer,
            idContainerVersion: parseInt(idContainerVersion, 10),
            isEmbedded: true,
            onChangeVersion: function (event) {
              if ('function' === typeof callback) {
                callback(event.version);
              }
              var modal = M.Modal.getInstance(template.parents('.modal.open'));

              if (modal) {
                modal.close();
              }
            },
          });
        },
      });
      app.mount(template.children()[0]);

      piwikHelper.modalConfirm(template, {}, {
        extraWide: true,
        onCloseEnd: function () {
          app.unmount();
          template.empty();
        },
      });
    };

    tagManagerHelper.editVariable = function (ignored, idContainer, idContainerVersion, idVariable, callback, variableType) {
        var createVNode = Vue.createVNode;
        var createVueApp = CoreHome.createVueApp;
        var VariableEdit = TagManager.VariableEdit;

        var template = $('<div class="tag-ui-confirm"><div></div><input role="no" type="button" value="'
          + _pk_translate('General_Cancel') +'"/></div>')

        var app = createVueApp({
          render: function () {
            return createVNode(VariableEdit, {
              idContainer: idContainer,
              idContainerVersion: parseInt(idContainerVersion, 10),
              idVariable: idVariable,
              variableType: variableType,
              isEmbedded: true,
              onChangeVariable: function (event) {
                if ('function' === typeof callback) {
                  callback(event.variable);
                }

                var modal = M.Modal.getInstance(template.parents('.modal.open'));
                if (modal) {
                  modal.close();
                }
              },
            });
          },
        });
        app.mount(template.children()[0]);

        piwikHelper.modalConfirm(template, {}, {
          extraWide: true,
          onCloseEnd: function () {
            app.unmount();
            template.empty();
          },
        });
    };

    tagManagerHelper.selectVariable = function (callback) {
        var template = $('<div class="ui-confirm"><h2>Select a variable</h2><div></div><input role="no" type="button" value="' + _pk_translate('General_Cancel') +'"/></div>')

        var createVNode = Vue.createVNode;
        var createVueApp = CoreHome.createVueApp;
        var VariableSelect = TagManager.VariableSelect;
        var MatomoUrl = CoreHome.MatomoUrl;
        var containerId = MatomoUrl.parsed.value.containerId;

        var app = createVueApp({
          render: function () {
            return createVNode(VariableSelect, {
              idContainer: containerId,
              onSelectVariable: function (event) {
                if ('function' === typeof callback) {
                  callback(event.variable);
                }

                var modal = M.Modal.getInstance(template.parents('.modal.open'));
                if (modal) {
                  modal.close();
                }
              },
            });
          },
        });
        app.mount(template.children()[0]);

        piwikHelper.modalConfirm(template, {}, {
          onCloseEnd: function () {
            app.unmount();
            template.empty();
          },
        });
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
      var createVNode = Vue.createVNode;
      var createVueApp = CoreHome.createVueApp;
      var ManageInstallTagCode = TagManager.ManageInstallTagCode;

      var template = $('<div class="tag-ui-confirm" ui-confirm><div></div><input role="no" '
        + 'type="button" value="' + _pk_translate('General_Cancel') +'"/>')

      var app = createVueApp({
        render: function () {
          return createVNode(ManageInstallTagCode, {
            idContainer: idContainer,
          });
        },
      });
      app.mount(template.children()[0]);

      piwikHelper.modalConfirm(template, {}, {
        extraWide: true,
        onCloseEnd: function () {
          app.unmount();
          template.empty();
        },
      });
    };
    tagManagerHelper.enablePreviewMode = function (idContainer, idContainerVersion) {
        if (!idContainerVersion) {
            idContainerVersion = 0;
        }
        var params = {method: 'TagManager.enablePreviewMode', idContainer: idContainer, idContainerVersion: idContainerVersion};
        piwikHelper.modalConfirm('<h2>' + _pk_translate('TagManager_EnablingPreviewPleaseWait') + '</h2>', {});
        CoreHome.AjaxHelper.fetch(params).then(function () {
            window.location.reload();
        });
    };
    tagManagerHelper.disablePreviewMode = function (idContainer) {
        var params = {method: 'TagManager.disablePreviewMode', idContainer: idContainer};
        piwikHelper.modalConfirm('<h2>' + _pk_translate('TagManager_DisablingPreviewPleaseWait') + '</h2>', {});
        CoreHome.AjaxHelper.fetch(params).then(function () {
            tagManagerHelper.updateDebugSiteFlag(document.getElementById('previewDebugUrl').value, idContainer, -1);
            window.location.reload();
        });
    };
    tagManagerHelper.changeDebugUrl = function (idContainer, oldUrl) {
        var newUrl = document.getElementById('previewDebugUrl').value;
        var id = 'TagManager_changeDebugSiteUrl';
        var context = 'warning'; // or 'warning' or 'error' or 'success'
        var UI = require('piwik/UI');
        var notification = new UI.Notification();
        if (!newUrl) {
            return notification.show(_pk_translate('TagManager_DebugUrlNoUrlErrorMessage'), {context: context, id: id, title: ''});
        } else if (newUrl === oldUrl) {
            return tagManagerHelper.updateDebugSiteFlag(newUrl, idContainer, 1);;
        }
        var ajaxRequest = new ajaxHelper();
        ajaxRequest.addParams({
            module: 'API',
            method: 'TagManager.changeDebugUrl',
            idContainer: idContainer,
            url: newUrl
        }, 'get');
        ajaxRequest.withTokenInUrl();
        ajaxRequest.setCallback(
            function (response) {
                tagManagerHelper.updateDebugSiteFlag(oldUrl, idContainer, -1);
                tagManagerHelper.updateDebugSiteFlag(newUrl, idContainer, 1);
                window.location.reload();
            }
        );
        ajaxRequest.setFormat('html');
        piwikHelper.modalConfirm('<h2>' + _pk_translate('TagManager_UpdatingDebugSiteUrlPleaseWait') + '</h2>', {});
        ajaxRequest.send();
    };
    tagManagerHelper.updateDebugSiteFlag = function (url, idContainer, debugFlag) {
        if (!url || !idContainer || !debugFlag) {
            return;
        }
        window.open(url + (url.indexOf('?') == -1 ? '?' : '&') + 'mtmPreviewMode=' + encodeURIComponent(idContainer) + '&mtmSetDebugFlag=' + encodeURIComponent(debugFlag), '_blank', 'noreferrer');

    };
    tagManagerHelper.importVersion = function (idContainer) {
        var createVNode = Vue.createVNode;
        var createVueApp = CoreHome.createVueApp;
        var ImportVersion = TagManager.ImportVersion;

        var template = $('<div class="ui-confirm"><div></div><input role="no" type="button" value="'
          + _pk_translate('General_Cancel') +'"/></div>')

        var app = createVueApp({
          render: function () {
            return createVNode(ImportVersion, {
              idContainer: idContainer,
            });
          },
        });
        app.mount(template.children()[0]);

        piwikHelper.modalConfirm(template, {}, {
          extraWide: true,
          onCloseEnd() {
            app.unmount();
            template.empty();
          },
        });
    };

    window.tagManagerHelper = tagManagerHelper;

    $(function () {
      $('body').on('click', 'a.disablePreviewDebug', function (event) {
        event.preventDefault();

        var idContainer = $(event.target).data('idcontainer');
        tagManagerHelper.disablePreviewMode(idContainer);
      }).on('click', '.preview-debug-url-div button', function (event) {
        var idContainer = $(event.target).data('idcontainer');
        var debugSiteUrl = $(event.target).data('debug-site-url');
        tagManagerHelper.changeDebugUrl(idContainer, debugSiteUrl);
      });

      $('body').on('click', 'a.createNewVersionLink', function (e) {
        e.preventDefault();
        tagManagerHelper.createNewVersion();
      });
    });
})(jQuery);
