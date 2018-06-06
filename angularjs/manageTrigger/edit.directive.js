/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * Usage:
 * <div piwik-trigger-edit>
 */
(function () {
    angular.module('piwikApp').directive('piwikTriggerEdit', piwikTriggerEdit);

    piwikTriggerEdit.$inject = ['piwik'];

    function piwikTriggerEdit(piwik){

        return {
            restrict: 'A',
            scope: {
                idTrigger: '=',
                idContainer: '=',
                idContainerVersion: '=',
                newTriggerType: '=',
                onChangeTrigger: '&?'
            },
            templateUrl: 'plugins/TagManager/angularjs/manageTrigger/edit.directive.html?cb=' + piwik.cacheBuster,
            controller: 'TriggerEditController',
            controllerAs: 'editTrigger'
        };
    }
})();