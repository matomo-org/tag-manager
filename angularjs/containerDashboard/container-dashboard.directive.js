/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * Usage:
 * <div piwik-container-dashboard>
 */
(function () {
    angular.module('piwikApp').directive('piwikContainerDashboard', piwikContainerDashboard);

    piwikContainerDashboard.$inject = ['piwik'];

    function piwikContainerDashboard(piwik){


        return {
            restrict: 'A',
            scope: {
               idContainer: '@'
            },
            templateUrl: 'plugins/TagManager/angularjs/containerDashboard/container-dashboard.directive.html?cb=' + piwik.cacheBuster,
            controller: 'ContainerDashboardController',
            controllerAs: 'containerDashboard',
            compile: function (element, attrs) {

                return function (scope, element, attrs) {

                };
            }
        };
    }
})();