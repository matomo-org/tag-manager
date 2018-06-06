/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    angular.module('piwikApp').controller('ManageTagController', ManageTagController);

    ManageTagController.$inject = ['$scope', '$rootScope', '$location'];

    function ManageTagController($scope, $rootScope, $location) {

        this.editMode = false;

        var self = this;
        this.idContainer = $scope.idContainer;
        this.idContainerVersion = $scope.idContainerVersion;

        function removeAnyTagNotification()
        {
            var UI = require('piwik/UI');
            new UI.Notification().remove('tagtagmanagement');
        }

        function initState() {
            var $search = $location.search();
            if ('idTag' in $search) {
                if ($search.idTag === 0 || $search.idTag === '0') {

                    var parameters = {isAllowed: true};
                    $rootScope.$emit('TagManager.initAddTag', parameters);
                    if (parameters && !parameters.isAllowed) {

                        self.editMode = false;
                        self.idTag = null;

                        return;
                    }
                }
                self.editMode = true;
                self.idTag = parseInt($search.idTag, 10);
            } else {
                self.editMode = false;
                self.idTag = null;
            }

            removeAnyTagNotification();
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