/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    angular.module('piwikApp').controller('VersionEditController', VersionEditController);

    VersionEditController.$inject = ['$scope', 'tagManagerVersionModel', 'tagManagerContainerModel', 'tagManagerVersionDiff', 'piwik', '$location', '$filter', '$timeout', '$rootScope'];

    function VersionEditController($scope, tagManagerVersionModel, tagManagerContainerModel, tagManagerVersionDiff, piwik, $location, $filter, $timeout, $rootScope) {

        var self = this;
        var currentId = null;
        var notificationId = 'versiontagmanagement';

        var translate = $filter('translate');

        this.isDirty = false;
        this.model = tagManagerVersionModel;
        this.environments = [];
        this.idContainer = $scope.idContainer;
        this.isEmbedded = !!$scope.onChangeVersion;
        this.lastVersion = null;
        this.versionChanges = [];
        this.isLoadingVersionChanges = false;
        this.canPublishToLive = piwik.hasUserCapability('tagmanager_publish_live_container');

        tagManagerVersionModel.fetchAvailableEnvironmentsWithPublishPermission().then(function (environments) {
            self.environments = [];
            angular.forEach(environments, function (environment) {
                self.environments.push({key: environment.id, value: environment.name});
            });
        });

        function getNotification()
        {
            var UI = require('piwik/UI');
            return new UI.Notification();
        }

        function removeAnyVersionNotification()
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
            var message = translate('TagManager_ErrorXNotProvided', [title]);
            showNotification(message, 'error');
        }

        function init(idContainerVersion)
        {
            self.create = idContainerVersion == '0';
            self.edit   = !self.create;
            self.version = {};
            self.lastVersion = null;
            self.versionChanges = [];

            self.isLoadingVersionChanges = true;
            tagManagerContainerModel.findContainer(self.idContainer).then(function (container) {
                self.isLoadingVersionChanges = false;
                self.lastVersion = null;

                if (!container || !container.versions || !angular.isArray(container.versions) || !container.versions.length) {
                    return;
                }
                container = angular.copy(container); // we copy to not change original versions array

                var versions = container.versions;
                versions.sort(function (a, b) {
                    return a.revision < b.revision;
                });

                var lastContainerVersion = null;
                if (self.create && versions[0] && versions[0].name) {
                    self.lastVersion = versions[0].name;
                    lastContainerVersion = versions[0].idcontainerversion;
                } else if (self.edit) {
                    for (var i = 0; i < (versions.length-1); i++) {
                        // we stop before the last one because it cannot have an entry
                        if (versions[i].idcontainerversion === parseInt(idContainerVersion, 10) && versions[i+1]) {
                            self.lastVersion = versions[i + 1].name;
                            lastContainerVersion = versions[i + 1].idcontainerversion;
                        }
                    }
                }

                if (self.lastVersion) {
                    self.isLoadingVersionChanges = true;
                    tagManagerVersionDiff.diffDraftVersion(self.idContainer, idContainerVersion, lastContainerVersion).then(function (diff) {
                        self.versionChanges = diff;
                        self.isLoadingVersionChanges = false;
                    });

                    if (self.create && !self.version.name && /^\d+$/.test(self.lastVersion)) {
                        self.version.name = parseInt(self.lastVersion, 10) + 1;
                        self.isDirty = true;
                    }
                }
            });

            piwik.helper.lazyScrollToContent();

            if (self.edit && idContainerVersion) {
                self.editTitle = translate('TagManager_EditVersion');
                self.model.findVersion(self.idContainer, idContainerVersion).then(function (version) {
                    if (!version) {
                        return;
                    }
                    self.version = angular.copy(version);
                    self.isDirty = false;
                });
            } else if (self.create) {
                self.editTitle = translate('TagManager_CreateNewVersion');

                self.version = {
                    idSite: piwik.idSite,
                    idcontainer: self.idContainer,
                    name: '',
                    environment: '',
                    description: ''
                };
                if (self.canPublishToLive) {
                    self.version.environment = 'live';
                } else if (angular.isArray(self.environments) && self.environments.length && self.environments[0]) {
                    self.version.environment = self.environments[0].key;
                }
                self.isDirty = false;
            }
        }

        this.cancel = function () {
            $scope.idContainerVersion = null;
            currentId = null;

            var $search = $location.search();
            delete $search.idContainerVersion;
            $location.search($search);
        };

        $scope.$on('$destroy', function() {
            $scope.idContainerVersion = null;
            currentId = null;
        });

        function checkRequiredFieldsAreSet()
        {
            var title;

            if (!self.version.name) {
                title = _pk_translate('General_Name');
                showErrorFieldNotProvidedNotification(title);
                return false;
            }

            return true;
        }

        this.createVersion = function () {
            removeAnyVersionNotification();

            if (!checkRequiredFieldsAreSet()) {
                return;
            }

            this.isUpdating = true;

            tagManagerVersionModel.createOrUpdateVersion(this.version, 'TagManager.createContainerVersion').then(function (response) {
                self.isUpdating = false;

                if (!response || response.type === 'error' || !response.response) {
                    return;
                }

                self.isDirty = false;

                var idContainerVersion = response.response.value;

                if ('function' === typeof $scope.onChangeVersion) {
                    self.version.idcontainerversion = idContainerVersion;
                    $scope.onChangeVersion({version: self.version});
                    return;
                }

                tagManagerVersionModel.reload(self.idContainer).then(function () {
                    var $search = $location.search();
                    $search.idContainerVersion = idContainerVersion;
                    $location.search($search);

                    $timeout(function () {
                        showNotification(translate('TagManager_CreatedX', translate('TagManager_Version')), response.type);
                    }, 200);
                });
            }, function () {
                self.isUpdating = false;
            });
        };

        this.createVersionAndPublish = function () {
            removeAnyVersionNotification();

            if (!checkRequiredFieldsAreSet()) {
                return;
            }

            this.isUpdating = true;

            tagManagerVersionModel.createOrUpdateVersion(this.version, 'TagManager.createContainerVersion').then(function (response) {

                if (!response || response.type === 'error' || !response.response || !response.response.value) {
                    self.isUpdating = false;
                    return;
                }

                var idContainerVersion = response.response.value;

                self.version.idcontainerversion = idContainerVersion;

                tagManagerVersionModel.publishVersion(self.idContainer, idContainerVersion, self.version.environment).then(function (response) {

                    self.isUpdating = false;

                    if (!response || response.type === 'error') {
                        return;
                    }

                    self.isDirty = false;

                    if ('function' === typeof $scope.onChangeVersion) {
                        $scope.onChangeVersion({version: self.version});
                        return;
                    }

                    tagManagerVersionModel.reload(self.idContainer).then(function () {
                        var $search = $location.search();
                        $search.idContainerVersion = idContainerVersion;
                        $location.search($search);

                        $timeout(function () {
                            showNotification(translate('TagManager_VersionPublishSuccess'), response.type);
                        }, 200);
                    });
                });

            }, function () {
                self.isUpdating = false;
            });
        }

        this.setValueHasChanged = function () {
            this.isDirty = true;
        };

        this.updateVersion = function () {

            removeAnyVersionNotification();

            if (!checkRequiredFieldsAreSet()) {
                return;
            }

            this.isUpdating = true;

            tagManagerVersionModel.createOrUpdateVersion(this.version, 'TagManager.updateContainerVersion').then(function (response) {
                if (response.type === 'error') {
                    return;
                }

                var idContainerVersion = self.version.idcontainerversion;

                if ('function' === typeof $scope.onChangeVersion) {
                    $scope.onChangeVersion({version: self.version});
                    return;
                }

                self.isDirty = false;
                self.version = {};

                tagManagerVersionModel.reload(self.idContainer).then(function () {
                    init(idContainerVersion);
                });
                showNotification(translate('TagManager_UpdatedX', translate('TagManager_Version')), response.type);
            });
        };

        $scope.$watch('idContainerVersion', function (newValue, oldValue) {
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
