/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
(function () {
    angular.module('piwikApp').controller('ManageInstallTagCodeController', ManageInstallTagCodeController);

    ManageInstallTagCodeController.$inject = ['$scope', 'piwikApi', '$q', '$filter', '$timeout'];

    function ManageInstallTagCodeController($scope, piwikApi, $q, $filter, $timeout) {

        var self = this;
        this.idContainer = $scope.idContainer;
        this.environments = [];
        this.environment = 'live';
        this.installInstructions = '';
        this.releases = [];
        this.isLoading = false;

        var environmentsPromise = piwikApi.fetch({method: 'TagManager.getAvailableEnvironments', filter_limit: '-1'});

        this.fetchInstallInstructions = function (environment) {
            this.installInstructions = {};
            this.isLoading = true;

            piwikApi.fetch({
                method: 'TagManager.getContainerInstallInstructions', filter_limit: '-1',
                idContainer: this.idContainer, environment: environment
            }).then(function (instructions) {
                self.installInstructions = instructions;
                self.isLoading = false;
                $timeout(function () {
                    var codeBlock = $('.manageInstallTagCode .codeblock');
                    codeBlock.effect("highlight", {}, 1500);
                });

            }, function () {
                self.isLoading = false;
            });
        };

        this.fetchReleases = function () {
            this.environments = [];
            this.isLoading = true;
            var containerPromise = piwikApi.fetch({method: 'TagManager.getContainer', idContainer: this.idContainer, filter_limit: '-1'})

            $q.all([containerPromise, environmentsPromise]).then(function (response) {
                var container = response[0];
                var environments = response[1];
                self.releases = container.releases;

                self.environments = [];
                self.isLoading = false;
                var hasLive = false;

                angular.forEach(environments, function (environment) {
                    self.environments.push({key: environment.id, value: environment.name});
                })

                angular.forEach(self.releases, function (release) {
                    angular.forEach(container.versions, function (version) {
                        if (version.idcontainerversion === release.idcontainerversion) {
                            release.version = version;
                        }
                    });

                    if (release.environment === 'live') {
                        hasLive = true;
                    }
                });

                if (!hasLive && self.environments && self.environments[0] && self.environments[0].key) {
                    self.environment = self.environments[0].key;
                } else if (!hasLive) {
                    // no release available yet
                    self.environment = '';
                }

                if (self.environment) {
                    self.fetchInstallInstructions(self.environment);
                }
            }, function () {
                self.isLoading = false;
            });
        };

        this.fetchReleases();
    }
})();