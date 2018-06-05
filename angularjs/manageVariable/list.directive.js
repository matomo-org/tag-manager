/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * Usage:
 * <div piwik-variable-list>
 */
(function () {
    angular.module('piwikApp').directive('piwikVariableList', piwikVariableList);

    piwikVariableList.$inject = ['piwik'];

    function piwikVariableList(piwik){

        return {
            restrict: 'A',
            scope: {
                idContainer: '=',
                idContainerVersion: '='
            },
            templateUrl: 'plugins/TagManager/angularjs/manageVariable/list.directive.html?cb=' + piwik.cacheBuster,
            controller: 'VariableListController',
            controllerAs: 'variableList'
        };
    }
})();