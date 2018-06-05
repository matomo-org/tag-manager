/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * Usage:
 * <div piwik-tag-manage>
 */
(function () {
    angular.module('piwikApp').directive('piwikTagManage', piwikTagManage);

    piwikTagManage.$inject = ['piwik'];

    function piwikTagManage(piwik){

        return {
            restrict: 'A',
            scope: {
                idContainerVersion: '@',
                idContainer: '@'
            },
            templateUrl: 'plugins/TagManager/angularjs/manageTag/manage.directive.html?cb=' + piwik.cacheBuster,
            controller: 'ManageTagController',
            controllerAs: 'manageTag'
        };
    }
})();