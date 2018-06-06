/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * Usage:
 * <div piwik-import-version>
 */
(function () {
    angular.module('piwikApp').directive('piwikImportVersion', piwikImportVersion);

    piwikImportVersion.$inject = ['piwik'];

    function piwikImportVersion(piwik){

        return {
            restrict: 'A',
            scope: {
                idContainer: '='
            },
            templateUrl: 'plugins/TagManager/angularjs/importVersion/import-version.directive.html?cb=' + piwik.cacheBuster,
            controller: 'ImportVersionController',
            controllerAs: 'importVersion'
        };
    }
})();