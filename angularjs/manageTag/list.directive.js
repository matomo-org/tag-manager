/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * Usage:
 * <div piwik-tag-list>
 */
(function () {
    angular.module('piwikApp').directive('piwikTagList', piwikTagList);

    piwikTagList.$inject = ['piwik'];

    function piwikTagList(piwik){

        return {
            restrict: 'A',
            scope: {
                idContainer: '=',
                idContainerVersion: '='
            },
            templateUrl: 'plugins/TagManager/angularjs/manageTag/list.directive.html?cb=' + piwik.cacheBuster,
            controller: 'TagListController',
            controllerAs: 'tagList'
        };
    }
})();