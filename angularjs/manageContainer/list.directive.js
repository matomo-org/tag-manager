/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * Usage:
 * <div piwik-container-list>
 */
(function () {
    angular.module('piwikApp').directive('piwikContainerList', piwikContainerList);

    piwikContainerList.$inject = ['piwik'];

    function piwikContainerList(piwik){

        return {
            restrict: 'A',
            scope: {},
            templateUrl: 'plugins/TagManager/angularjs/manageContainer/list.directive.html?cb=' + piwik.cacheBuster,
            controller: 'ContainerListController',
            controllerAs: 'containerList'
        };
    }
})();