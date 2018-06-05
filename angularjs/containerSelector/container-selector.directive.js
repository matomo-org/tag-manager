/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * Usage:
 * <div piwik-container-selector>
 */
(function () {
    angular.module('piwikApp').directive('piwikContainerSelector', piwikContainerSelector);

    piwikContainerSelector.$inject = ['piwik'];

    function piwikContainerSelector(piwik){


        return {
            restrict: 'A',
            scope: {
                containerName: '@?'
            },
            templateUrl: 'plugins/TagManager/angularjs/containerSelector/container-selector.directive.html?cb=' + piwik.cacheBuster,
            controller: 'ContainerSelectorController',
            controllerAs: 'containerSelector',
            compile: function (element, attrs) {

                return function (scope, element, attrs) {

                };
            }
        };
    }
})();