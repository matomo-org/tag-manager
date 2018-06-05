/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * Usage:
 * <div matomo-tagmanager-tracking-code>
 */
(function () {
    angular.module('piwikApp').directive('matomoTagmanagerTrackingCode', matomoTagManagerTrackingCode);

    matomoTagManagerTrackingCode.$inject = ['piwik'];

    function matomoTagManagerTrackingCode(piwik){

        return {
            restrict: 'A',
            scope: {},
            templateUrl: 'plugins/TagManager/angularjs/tagmanagerTrackingCode/tagmanager.directive.html?cb=' + piwik.cacheBuster,
            controller: 'TagManagerTrackingCodeController',
            controllerAs: 'tagTrackingCode'
        };
    }
})();