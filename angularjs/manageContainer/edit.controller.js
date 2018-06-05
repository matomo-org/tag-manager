/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    angular.module('piwikApp').controller('ContainerEditController', ContainerEditController);

    ContainerEditController.$inject = ['$scope', 'tagManagerContainerModel', 'piwik', '$location', '$filter', '$timeout', '$rootScope'];

    function ContainerEditController($scope, tagManagerContainerModel, piwik, $location, $filter, $timeout, $rootScope) {

        var self = this;
        var currentId = null;
        var notificationId = 'containertagmanagement';

        var translate = $filter('translate');

        this.isDirty = false;
        this.model = tagManagerContainerModel;
        this.contexts = [];

        tagManagerContainerModel.fetchAvailableContexts().then(function (contexts) {
            self.contexts = [];
            angular.forEach(contexts, function (context) {
                self.contexts.push({key: context.id, value: context.name});
            });
        });

        function getNotification()
        {
            var UI = require('piwik/UI');
            return new UI.Notification();
        }

        function removeAnyContainerNotification()
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

        function showErrorFieldNotProvidedNotification(title)
        {
            var message = _pk_translate('TagManager_ErrorXNotProvided', [title]);
            showNotification(message, 'error');
        }

        function init(idContainer)
        {
            self.create = idContainer == '0';
            self.edit   = !self.create;
            self.container = {};

            piwik.helper.lazyScrollToContent();

            if (self.edit && idContainer) {
                self.editTitle = translate('TagManager_EditContainer');
                self.model.findContainer(idContainer).then(function (container) {
                    if (!container) {
                        return;
                    }
                    self.container = angular.copy(container);
                    self.isDirty = false;
                });
            } else if (self.create) {
                self.editTitle = translate('TagManager_CreateNewContainer');
                self.container = {
                    idSite: piwik.idSite,
                    name: '',
                    context: 'web',
                    description: ''
                };
                self.isDirty = false;
            }
        }

        this.cancel = function () {
            $scope.idContainer = null;
            currentId = null;

            var $search = $location.search();
            delete $search.idContainer;
            $location.search($search);
        };

        $scope.$on('$destroy', function() {
            $scope.idContainer = null;
            currentId = null;
        });

        function checkRequiredFieldsAreSet()
        {
            var title;

            if (!self.container.name) {
                title = _pk_translate('General_Name');
                showErrorFieldNotProvidedNotification(title);
                return false;
            }

            return true;
        }

        this.createContainer = function () {
            removeAnyContainerNotification();

            if (!checkRequiredFieldsAreSet()) {
                return;
            }

            this.isUpdating = true;

            tagManagerContainerModel.createOrUpdateContainer(this.container, 'TagManager.addContainer').then(function (response) {
                self.isUpdating = false;

                if (!response || response.type === 'error' || !response.response) {
                    return;
                }

                self.isDirty = false;

                var idContainer = response.response.value;

                showNotification(translate('TagManager_CreatedX', translate('TagManager_Container')), response.type);

                var currentUrl = window.location.pathname + window.location.search;
                var newUrl = piwik.broadcast.updateParamValue('module=TagManager', currentUrl);
                newUrl = piwik.broadcast.updateParamValue('action=dashboard', newUrl);
                newUrl = piwik.broadcast.updateParamValue('idContainer=' + idContainer, newUrl);
                window.location.href = newUrl;

            }, function () {
                self.isUpdating = false;
            });
        };

        this.setValueHasChanged = function () {
            this.isDirty = true;
        };

        this.updateContainer = function () {

            removeAnyContainerNotification();

            if (!checkRequiredFieldsAreSet()) {
                return;
            }

            this.isUpdating = true;

            tagManagerContainerModel.createOrUpdateContainer(this.container, 'TagManager.updateContainer').then(function (response) {
                if (response.type === 'error') {
                    return;
                }

                var idContainer = self.container.idcontainer;

                self.isDirty = false;
                self.container = {};

                tagManagerContainerModel.reload().then(function () {
                    init(idContainer);
                });
                showNotification(translate('TagManager_UpdatedX', translate('TagManager_Container')), response.type);
            });
        };

        $scope.$watch('idContainer', function (newValue, oldValue) {
            if (newValue === null) {
                return;
            }
            if (newValue != oldValue || currentId === null) {
                currentId = newValue;
                init(newValue);
            }
        });
    }
})();