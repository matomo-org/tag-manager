/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * Usage:
 * <div piwik-version-edit>
 */
(function () {
    angular.module('piwikApp').directive('piwikVersionEdit', piwikVersionEdit);

    piwikVersionEdit.$inject = ['piwik'];

    function piwikVersionEdit(piwik){

        return {
            restrict: 'A',
            scope: {
                idContainerVersion: '=',
                idContainer: '=',
                onChangeVersion: '&?'
            },
            templateUrl: 'plugins/TagManager/angularjs/manageVersion/edit.directive.html?cb=' + piwik.cacheBuster,
            controller: 'VersionEditController',
            controllerAs: 'editVersion'
        };
    }
})();