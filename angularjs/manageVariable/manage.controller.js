/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    angular.module('piwikApp').controller('ManageVariableController', ManageVariableController);

    ManageVariableController.$inject = ['$scope', '$rootScope', '$location'];

    function ManageVariableController($scope, $rootScope, $location) {

        this.editMode = false;

        var self = this;
        this.idContainer = $scope.idContainer;
        this.idContainerVersion = $scope.idContainerVersion;

        function removeAnyVariableNotification()
        {
            var UI = require('piwik/UI');
            new UI.Notification().remove('variablevariablemanagement');
        }

        function initState() {
            var $search = $location.search();
            if ('idVariable' in $search) {
                if ($search.idVariable === 0 || $search.idVariable === '0') {

                    var parameters = {isAllowed: true};
                    $rootScope.$emit('TagManager.initAddVariable', parameters);
                    if (parameters && !parameters.isAllowed) {

                        self.editMode = false;
                        self.idVariable = null;

                        return;
                    }
                }
                self.editMode = true;
                self.idVariable = parseInt($search.idVariable, 10);
            } else {
                self.editMode = false;
                self.idVariable = null;
            }

            removeAnyVariableNotification();
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