/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * Usage:
 * <div piwik-trigger-manage>
 */
(function () {
    angular.module('piwikApp').directive('piwikTriggerManage', piwikTriggerManage);

    piwikTriggerManage.$inject = ['piwik'];

    function piwikTriggerManage(piwik){

        return {
            restrict: 'A',
            scope: {
                idContainerVersion: '@',
                idContainer: '@'
            },
            templateUrl: 'plugins/TagManager/angularjs/manageTrigger/manage.directive.html?cb=' + piwik.cacheBuster,
            controller: 'ManageTriggerController',
            controllerAs: 'manageTrigger'
        };
    }
})();