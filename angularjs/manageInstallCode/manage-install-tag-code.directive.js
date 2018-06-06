/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * Usage:
 * <div piwik-manage-install-tag-code>
 */
(function () {
    angular.module('piwikApp').directive('piwikManageInstallTagCode', piwikManageInstallTagCode);

    piwikManageInstallTagCode.$inject = ['piwik'];

    function piwikManageInstallTagCode(piwik){

        return {
            restrict: 'A',
            scope: {
               idContainer: '@'
            },
            templateUrl: 'plugins/TagManager/angularjs/manageInstallCode/manage-install-tag-code.directive.html?cb=' + piwik.cacheBuster,
            controller: 'ManageInstallTagCodeController',
            controllerAs: 'manageInstallTagCode',
            compile: function (element, attrs) {

                return function (scope, element, attrs) {

                };
            }
        };
    }
})();