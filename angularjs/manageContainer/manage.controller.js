/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    angular.module('piwikApp').controller('ManageContainerController', ManageContainerController);

    ManageContainerController.$inject = ['$scope', '$rootScope', '$location'];

    function ManageContainerController($scope, $rootScope, $location) {

        this.editMode = false;

        var self = this;

        function removeAnyContainerNotification()
        {
            var UI = require('piwik/UI');
            new UI.Notification().remove('containertagmanagement');
        }

        function initState() {
            var $search = $location.search();
            if ('idContainer' in $search) {
                if ($search.idContainer === 0 || $search.idContainer === '0') {

                    var parameters = {isAllowed: true};
                    $rootScope.$emit('TagManager.initAddContainer', parameters);
                    if (parameters && !parameters.isAllowed) {

                        self.editMode = false;
                        self.idContainer = null;

                        return;
                    }
                }
                self.editMode = true;
                self.idContainer = $search.idContainer;
            } else {
                self.editMode = false;
                self.idContainer = null;
            }

            removeAnyContainerNotification();
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