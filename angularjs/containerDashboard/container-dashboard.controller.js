/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
(function () {
    angular.module('piwikApp').controller('ContainerDashboardController', ContainerDashboardController);

    ContainerDashboardController.$inject = ['$scope', 'piwikApi', '$q', 'piwik', '$filter'];

    function ContainerDashboardController($scope, piwikApi, $q, piwik, $filter) {

        var self = this;
        var translate = $filter('translate');
        this.availableContexts = {};
        this.idContainer = $scope.idContainer;
        this.container = null;
        this.containerVersion = null;
        this.isLoading = true;

        var containerPromise = piwikApi.fetch({method: 'TagManager.getContainer', idContainer: this.idContainer}).then(function (container) {
            self.container = container;
            if (container && container.versions) {
                self.container.lastVersions = self.container.versions.slice(-5);
            }

            if (container && container.releases) {
                angular.forEach(container.releases, function (release) {
                    if (release.version_name) {
                        release.versionName = translate('TagManager_ReleaseVersionInfo', release.version_name);
                    } else {
                        release.versionName = '';
                    }
                });
            }
        });

        var versionPromise = piwikApi.fetch({method: 'TagManager.exportContainerVersion', idContainer: this.idContainer}).then(function (containerVersion) {
            self.containerVersion = containerVersion;
        });

        $q.all([containerPromise, versionPromise]).then(function () {
            self.isLoading = false;
        }, function () {
            self.isLoading = false;
        });

        piwikApi.fetch({method: 'TagManager.getAvailableContexts'}).then(function (contexts) {
            angular.forEach(contexts, function (context) {
                self.availableContexts[context.id] = context.name;
            });
        });

        this.linkTo = function (action, hash){
            var currentUrl = window.location.pathname + window.location.search;
            var newUrl = piwik.broadcast.updateParamValue('module=TagManager', currentUrl);
            newUrl = piwik.broadcast.updateParamValue('action=' + action, newUrl);
            if ('undefined' !== typeof hash && hash) {
                newUrl += '#?' + hash;
            }
            return newUrl;
        }
        this.createNewVersion = function () {
            $('.tagVersionManager .title').click();
        };
    }
})();