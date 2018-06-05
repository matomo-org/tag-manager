/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    angular.module('piwikApp').controller('ImportVersionController', ImportVersionController);

    ImportVersionController.$inject = ['$scope', 'piwikApi', 'piwik', '$timeout', '$filter'];

    function ImportVersionController($scope, piwikApi, piwik, $timeout, $filter) {
        var self = this;
        this.isUpdating = false;
        this.idContainer = $scope.idContainer;
        this.backupName = '';

        var notificationId = 'importContainerVersion';
        var translate = $filter('translate');

        function getNotification()
        {
            var UI = require('piwik/UI');
            return new UI.Notification();
        }

        function removeAnyTagNotification()
        {
            var notification = getNotification();
            notification.remove(notificationId);
            notification.remove('ajaxHelper');
        }

        function showNotification(message, context)
        {
            var notification = getNotification();
            notification.show(message, {context: context, id: notificationId});
            $timeout(function () {
                notification.scrollToNotification();
            }, 200);
        }

        this.importVersion = function (backupName, version) {
            if (!version) {
                return;
            }

            var parsed;
            try {
                parsed = JSON.parse(version);
            } catch (e) {
                showNotification(translate('TagManager_ErrorInvalidContainerImportFormat'), 'error');
                return;
            }

            if ('tags' in parsed && 'triggers' in parsed && 'variables' in parsed && 'idcontainer' in parsed && 'context' in parsed) {
                piwik.helper.modalConfirm('#confirmImportContainerVersion', {yes: function () {
                        self.isUpdating = true;
                        var params = {
                            method: 'TagManager.importContainerVersion',
                            idContainer: self.idContainer,
                            backupName: backupName
                        };

                        var post = {exportedContainerVersion: version};
                        piwikApi.post(params, post).then(function () {
                            showNotification(translate('TagManager_VersionImportSuccess'), 'success');
                            self.isUpdating = false;
                            window.location.reload();
                        }, function () {
                            self.isUpdating = false;
                        });
                    }});
            } else {
                showNotification(translate('TagManager_ErrorContainerVersionImportIncomplete'), 'error');
            }

        };

    }
})();