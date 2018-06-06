/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * Usage:
 * <div piwik-container-edit>
 */
(function () {
    angular.module('piwikApp').directive('piwikContainerEdit', piwikContainerEdit);

    piwikContainerEdit.$inject = ['piwik'];

    function piwikContainerEdit(piwik){

        return {
            restrict: 'A',
            scope: {
                idContainer: '='
            },
            templateUrl: 'plugins/TagManager/angularjs/manageContainer/edit.directive.html?cb=' + piwik.cacheBuster,
            controller: 'ContainerEditController',
            controllerAs: 'editContainer'
        };
    }
})();