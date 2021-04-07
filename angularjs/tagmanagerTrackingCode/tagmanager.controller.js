/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    angular.module('piwikApp').controller('TagManagerTrackingCodeController', TagManagerTrackingCodeController);

    TagManagerTrackingCodeController.$inject = ['$scope', 'piwikApi', 'piwikUrl', '$timeout', '$filter', 'piwik'];

    function TagManagerTrackingCodeController($scope, piwikApi, piwikUrl, $timeout, $filter, piwik) {

        var self = this;
        this.containerVariables = [];
        this.isLoading = false;
        this.idContainer = 0
        this.environment = '';
        this.environmentNameMap = {};
        this.environments = [];
        this.containers = [];
        this.containerMap = {};
        this.site = null;
        this.matomoConfigs = [];
        this.releases = [];
        this.installInstructions = [];
        this.noReleaseFound = false;
        this.firstTime = true;
        var translate = $filter('translate');
        var ucfirst = $filter('ucfirst');

        var environmentsPromise = piwikApi.fetch({method: 'TagManager.getAvailableEnvironments', filter_limit: '-1'});
        environmentsPromise.then(function (environments) {
            angular.forEach(environments, function (environment) {
                self.environmentNameMap[environment.id] = environment.name;
            });
        });

        this.onSiteChange = function () {
            this.installInstructions = [];
            this.containers = [];
            this.environments = [];
            this.matomoConfigs = [];
            this.idContainer = '';
            this.firstTime = false;

            if (!this.site || !this.site.id) {
                return;
            }

            this.isLoading = true;

            piwikApi.fetch({
                method: 'TagManager.getContainers', filter_limit: '-1',
                idSite: this.site.id
            }).then(function (containers) {
                self.isLoading = false;
                self.containers = [];

                if (!containers || !containers.length) {
                    self.idContainer = '';
                    self.containers.push({key: '', value: translate('TagManager_NoContainersFound')});
                    return;
                }

                angular.forEach(containers, function (container) {
                    if (!self.idContainer) {
                        self.idContainer = container.idcontainer;
                    }
                    self.containerMap[container.idcontainer] = container;
                    self.containers.push({key: container.idcontainer, value: container.name});
                });

                self.onContainerChange();

            }, function () {
                self.isLoading = false;
            });
        };

        this.onContainerChange = function () {
            this.noReleaseFound = false;

            if (!this.idContainer) {
                return;
            }

            this.installInstructions = [];

            var container = this.containerMap[this.idContainer];
            var draftVersion = container.draft.idcontainerversion;

            this.environment = '';
            this.environments = [];

            angular.forEach(container.releases, function (release) {
                if (release.environment === 'live') { // we always prefer to pre-select the live environment
                    self.environment = release.environment;
                }
            });

            angular.forEach(container.releases, function (release) {
                if (release.environment === 'preview') {
                    return; // there is nothing to embed for this environment
                }

                if (!self.environment) {
                    self.environment = release.environment;
                }
                var name = ucfirst(release.environment);
                if (release.environment in self.environmentNameMap) {
                    name = self.environmentNameMap[release.environment];
                }
                self.environments.push({key: release.environment, value: name});
            });

            if (!this.environments.length) {
                this.noReleaseFound = true;
                this.environments.push({key: '', value: translate('TagManager_NoReleasesFound')});
            }

            this.fetchInstallInstructions();
            this.fetchVariables(draftVersion);
        };

        this.linkTo = function (action, idContainer, hash){
            var currentUrl = window.location.pathname + window.location.search;
            var newUrl = piwik.broadcast.updateParamValue('module=TagManager', currentUrl);
            newUrl = piwik.broadcast.updateParamValue('action=' + action, newUrl);
            newUrl = piwik.broadcast.updateParamValue('idContainer=' + idContainer, newUrl);
            if ('undefined' !== typeof hash && hash) {
                newUrl += '#?' + hash;
            }
            return newUrl;
        };

        this.fetchInstallInstructions = function () {
            this.installInstructions = {};

            if (!this.idContainer || !this.environment || !this.site || !this.site.id) {
                return;
            }

            this.isLoading = true;

            piwikApi.fetch({
                method: 'TagManager.getContainerInstallInstructions', filter_limit: '-1',
                idContainer: this.idContainer, environment: this.environment,
                idSite: this.site.id
            }).then(function (instructions) {
                self.installInstructions = instructions;
                self.isLoading = false;
                $timeout(function () {
                    var codeBlock = $('.tagManagerTrackingCode .codeblock');
                    codeBlock.effect("highlight", {}, 1500);
                });

            }, function () {
                self.isLoading = false;
            });
        };

        this.fetchVariables = function (containerDraftVersion) {
            this.matomoConfigs = [];

            if (!this.idContainer || !this.site || !this.site.id || !containerDraftVersion) {
                return;
            }

            piwikApi.fetch({
                method: 'TagManager.getContainerVariables', filter_limit: '-1',
                idContainer: this.idContainer, idContainerVersion: containerDraftVersion,
                idSite: this.site.id
            }).then(function (variables) {
                self.matomoConfigs = [];
                angular.forEach(variables, function (variable) {
                    if (variable.type === 'MatomoConfiguration') {
                        self.matomoConfigs.push(variable);
                    }
                });

            }, function () {
                self.isLoading = false;
            });
        };

        $scope.$watch('tagTrackingCode.site.id', function (val, oldVal) {
            if (val !== oldVal || self.firstTime) {
                self.onSiteChange();
            }
        });
    }
})();
