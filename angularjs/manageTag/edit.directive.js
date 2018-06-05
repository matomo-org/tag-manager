/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * Usage:
 * <div piwik-tag-edit>
 */
(function () {
    angular.module('piwikApp').directive('piwikTagEdit', piwikTagEdit);

    piwikTagEdit.$inject = ['piwik'];

    function piwikTagEdit(piwik){

        return {
            restrict: 'A',
            scope: {
                idTag: '=',
                idContainer: '=',
                idContainerVersion: '=',
                newTagType: '='
            },
            templateUrl: 'plugins/TagManager/angularjs/manageTag/edit.directive.html?cb=' + piwik.cacheBuster,
            controller: 'TagEditController',
            controllerAs: 'editTag'
        };
    }
})();