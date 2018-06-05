/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * Usage:
 * <div piwik-container-manage>
 */
(function () {
    angular.module('piwikApp').directive('piwikContainerManage', piwikContainerManage);

    piwikContainerManage.$inject = ['piwik'];

    function piwikContainerManage(piwik){

        return {
            restrict: 'A',
            templateUrl: 'plugins/TagManager/angularjs/manageContainer/manage.directive.html?cb=' + piwik.cacheBuster,
            controller: 'ManageContainerController',
            controllerAs: 'manageContainer'
        };
    }
})();