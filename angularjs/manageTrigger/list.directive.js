/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * Usage:
 * <div piwik-trigger-list>
 */
(function () {
    angular.module('piwikApp').directive('piwikTriggerList', piwikTriggerList);

    piwikTriggerList.$inject = ['piwik'];

    function piwikTriggerList(piwik){

        return {
            restrict: 'A',
            scope: {
                idContainer: '=',
                idContainerVersion: '='
            },
            templateUrl: 'plugins/TagManager/angularjs/manageTrigger/list.directive.html?cb=' + piwik.cacheBuster,
            controller: 'TriggerListController',
            controllerAs: 'triggerList'
        };
    }
})();