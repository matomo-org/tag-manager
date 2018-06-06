/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    angular.module('piwikApp').controller('ManageVersionController', ManageVersionController);

    ManageVersionController.$inject = ['$scope', '$rootScope', '$location'];

    function ManageVersionController($scope, $rootScope, $location) {

        this.editMode = false;

        var self = this;
        this.idContainer = $scope.idContainer;

        function removeAnyVersionNotification()
        {
            var UI = require('piwik/UI');
            new UI.Notification().remove('versiontagmanagement');
        }

        function initState() {
            var $search = $location.search();
            if ('idContainerVersion' in $search) {
                if ($search.idContainerVersion === 0 || $search.idContainerVersion === '0') {

                    var parameters = {isAllowed: true};
                    $rootScope.$emit('TagManager.initAddVersion', parameters);
                    if (parameters && !parameters.isAllowed) {

                        self.editMode = false;
                        self.idContainerVersion = null;

                        return;
                    }
                }
                self.editMode = true;
                self.idContainerVersion = parseInt($search.idContainerVersion, 10);
            } else {
                self.editMode = false;
                self.idContainerVersion = null;
            }

            removeAnyVersionNotification();
        }

        initState();

        var onChangeSuccess = $rootScope.$on('$locationChangeSuccess', initState);

        $scope.$on('$destroy', function() {
            if (onChangeSuccess) {
                onChangeSuccess();
            }
        });
    }
})();