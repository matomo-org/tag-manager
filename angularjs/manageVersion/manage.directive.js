/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * Usage:
 * <div piwik-version-manage>
 */
(function () {
    angular.module('piwikApp').directive('piwikVersionManage', piwikVersionManage);

    piwikVersionManage.$inject = ['piwik'];

    function piwikVersionManage(piwik){

        return {
            restrict: 'A',
            scope: {
                idContainer: '@'
            },
            templateUrl: 'plugins/TagManager/angularjs/manageVersion/manage.directive.html?cb=' + piwik.cacheBuster,
            controller: 'ManageVersionController',
            controllerAs: 'manageVersion'
        };
    }
})();