/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * Usage:
 * <div piwik-version-list>
 */
(function () {
    angular.module('piwikApp').directive('piwikVersionList', piwikVersionList);

    piwikVersionList.$inject = ['piwik'];

    function piwikVersionList(piwik){

        return {
            restrict: 'A',
            scope: {idContainer: '='},
            templateUrl: 'plugins/TagManager/angularjs/manageVersion/list.directive.html?cb=' + piwik.cacheBuster,
            controller: 'VersionListController',
            controllerAs: 'versionList'
        };
    }
})();