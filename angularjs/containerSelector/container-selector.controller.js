/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
(function () {
    angular.module('piwikApp').controller('ContainerSelectorController', ContainerSelectorController);

    ContainerSelectorController.$inject = ['$scope', 'piwikApi', 'piwik', '$filter'];

    function ContainerSelectorController($scope, piwikApi, piwik, $filter) {

        var self = this;
        this.containers = [];
        this.isLoading = false;
        this.hasWriteAccess = piwik.hasUserCapability('tagmanager_write');
        var translate = $filter('translate');

        if ($scope.containerName) {
            this.containerName = translate('TagManager_ContainerX', $scope.containerName);
        } else {
            this.containerName = 'Choose container';
        }

        this.fetchContainers = function () {
            this.isLoading = true;
            this.containers = [];
            piwikApi.fetch({method: 'TagManager.getContainers'}).then(function (containers) {
                self.isLoading = false;
                self.containers = containers;
            }, function () {
                self.isLoading = false;
            });
        };

        this.linkTo = function (idContainer){
            var currentUrl = window.location.pathname + window.location.search;
            currentUrl = piwik.broadcast.updateParamValue('idContainer=' + idContainer, currentUrl);
            var action = piwik.broadcast.getValueFromUrl('idContainer')
            if (!action || action === 'manageContainers') {
                if (this.hasWriteAccess) {
                    currentUrl = piwik.broadcast.updateParamValue('action=dashboard', currentUrl);
                } else {
                    currentUrl = piwik.broadcast.updateParamValue('action=manageTags', currentUrl);
                }
            }
            return currentUrl;
        };

    }
})();