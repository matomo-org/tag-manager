/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * Usage:
 * <div piwik-variable-manage>
 */
(function () {
    angular.module('piwikApp').directive('piwikVariableManage', piwikVariableManage);

    piwikVariableManage.$inject = ['piwik'];

    function piwikVariableManage(piwik){

        return {
            restrict: 'A',
            scope: {
                idContainerVersion: '@',
                idContainer: '@'
            },
            templateUrl: 'plugins/TagManager/angularjs/manageVariable/manage.directive.html?cb=' + piwik.cacheBuster,
            controller: 'ManageVariableController',
            controllerAs: 'manageVariable'
        };
    }
})();