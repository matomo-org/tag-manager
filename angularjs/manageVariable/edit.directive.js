/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * Usage:
 * <div piwik-variable-edit>
 */
(function () {
    angular.module('piwikApp').directive('piwikVariableEdit', piwikVariableEdit);

    piwikVariableEdit.$inject = ['piwik'];

    function piwikVariableEdit(piwik){

        return {
            restrict: 'A',
            scope: {
                idVariable: '=',
                idContainer: '=',
                idContainerVersion: '=',
                variableType: '=?',
                onChangeVariable: '&?'
            },
            templateUrl: 'plugins/TagManager/angularjs/manageVariable/edit.directive.html?cb=' + piwik.cacheBuster,
            controller: 'VariableEditController',
            controllerAs: 'editVariable'
        };
    }
})();