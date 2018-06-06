/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    angular.module('piwikApp').controller('ManageTriggerController', ManageTriggerController);

    ManageTriggerController.$inject = ['$scope', '$rootScope', '$location'];

    function ManageTriggerController($scope, $rootScope, $location) {

        this.editMode = false;

        var self = this;
        this.idContainer = $scope.idContainer;
        this.idContainerVersion = $scope.idContainerVersion;

        function removeAnyTriggerNotification()
        {
            var UI = require('piwik/UI');
            new UI.Notification().remove('triggertriggermanagement');
        }

        function initState() {
            var $search = $location.search();
            if ('idTrigger' in $search) {
                if ($search.idTrigger === 0 || $search.idTrigger === '0') {

                    var parameters = {isAllowed: true};
                    $rootScope.$emit('TagManager.initAddTrigger', parameters);
                    if (parameters && !parameters.isAllowed) {

                        self.editMode = false;
                        self.idTrigger = null;

                        return;
                    }
                }
                self.editMode = true;
                self.idTrigger = parseInt($search.idTrigger, 10);
            } else {
                self.editMode = false;
                self.idTrigger = null;
            }

            removeAnyTriggerNotification();
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