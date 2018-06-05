/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * Usage:
 * <div piwik-variable-select-type>
 */
(function () {
    angular.module('piwikApp').directive('piwikVariableSelectType', piwikVariableSelectType);

    piwikVariableSelectType.$inject = ['piwik'];

    function piwikVariableSelectType(piwik){

        return {
            restrict: 'A',
            scope: {
                variableTypeName: '@',
                variable: '=',
                variableType: '@'
            },
            require: "?ngModel",
            templateUrl: 'plugins/TagManager/angularjs/selectVariableType/select-variable-type.directive.html?cb=' + piwik.cacheBuster,
            controller: 'VariableSelectTypeController',
            controllerAs: 'variableSelectType'
        };
    }
})();