/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    angular.module('piwikApp').controller('VersionListController', VersionListController);

    VersionListController.$inject = ['$scope', 'tagManagerVersionModel', 'piwik', 'piwikApi', '$location'];

    function VersionListController($scope, tagManagerVersionModel, piwik, piwikApi, $location) {

        this.model = tagManagerVersionModel;
        this.hasAdminAccess = piwik.tagManagerWriteAccess;

        var self = this;
        this.idContainer = $scope.idContainer;
        this.token_auth = piwik.token_auth;
        this.environments = [];
        this.versionToBePublished = null;
        this.idSite = piwik.idSite;

        tagManagerVersionModel.fetchAvailableEnvironments().then(function (environments) {
            self.environments = [];
            angular.forEach(environments, function (environment) {
                self.environments.push({key: environment.id, value: environment.name});
            });
        });

        this.createVersion = function () {
            this.editVersion(0);
        };

        this.truncateText = function(text, length) {
            if (text && (text + '').length > length) {
                return String(text).substr(0, length - 3) + '...';
            }
            return text;
        };

        this.publishVersion = function (version) {
            version.deployEnvironment = '';
            version.availableEnvironments = [];
            angular.forEach(this.environments, function (env) {
                var found = false;
                if (version.releases) {
                    angular.forEach(version.releases, function (release) {
                        if (env && env.key == release.environment) {
                            found = true;
                        }
                    });
                }
                if (!found) {
                    if (!version.deployEnvironment) {
                        version.deployEnvironment = env.key;
                    }
                    version.availableEnvironments.push(env);
                }
            });
            this.versionToBePublished = version;
            piwik.helper.modalConfirm('#confirmPublishVersion', {yes: function () {
                if (version.deployEnvironment) {
                    self.model.publishVersion(version.idcontainer, version.idcontainerversion, version.deployEnvironment).then(function () {
                        self.model.reload(self.idContainer);
                    });
                }
            }});
        };

        this.enableDebugMode = function (idContainerVersion) {
            tagManagerHelper.enablePreviewMode(self.idContainer, idContainerVersion);
        };

        this.exportVersion = function (idContainerVersion, versionName) {
            var params = {
                module: 'API',
                method: 'TagManager.exportContainerVersion',
                format: 'json',
                idContainer: self.idContainer,
                filter_limit: -1,
            };
            if (idContainerVersion) {
                params.idContainerVersion = idContainerVersion;
            }
            var filename = 'container_' + self.idContainer;
            if (versionName) {
                filename += '_' + versionName;
            }
            piwikApi.fetch(params).then(function (exportedContainer) {
                piwik.helper.sendContentAsDownload(filename + '.json', JSON.stringify(exportedContainer));
            });
        };

        this.editVersion = function (idContainerVersion) {
            var $search = $location.search();
            $search.idContainerVersion = idContainerVersion;
            $location.search($search);
        };

        this.importVersion = function () {
            tagManagerHelper.importVersion($scope, self.idContainer);
        }

        this.deleteVersion = function (version) {
            function doDelete() {
                tagManagerVersionModel.deleteVersion(self.idContainer, version.idcontainerversion).then(function () {
                    tagManagerVersionModel.reload(self.idContainer);
                });
            }

            piwik.helper.modalConfirm('#confirmDeleteVersion', {yes: doDelete});
        };

        this.model.fetchVersions(this.idContainer);
    }
})();