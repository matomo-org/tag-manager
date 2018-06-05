/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    angular.module('piwikApp').controller('TagListController', TagListController);

    TagListController.$inject = ['$scope', 'tagManagerTagModel', 'tagManagerTriggerModel', 'piwik', 'piwikApi', '$location'];

    function TagListController($scope, tagManagerTagModel, tagManagerTriggerModel, piwik, piwikApi, $location) {

        this.model = tagManagerTagModel;
        this.hasAdminAccess = piwik.tagManagerAdminAccess;

        var self = this;
        this.idContainer = $scope.idContainer;
        this.idContainerVersion = $scope.idContainerVersion;
        this.triggers = {};

        function updateTriggers() {
            tagManagerTriggerModel.reload(self.idContainer, self.idContainerVersion).then(function (triggers) {
                self.triggers = {};
                angular.forEach(triggers, function (trigger) {
                    self.triggers[trigger.idtrigger] = trigger.name;
                });
            });
        }

        this.model.onReload = function () {
            updateTriggers();
        };

        this.createTag = function () {
            this.editTag(0);
        };

        this.editTrigger = function (idTrigger) {
            tagManagerHelper.editTrigger($scope, this.idContainer, this.idContainerVersion, idTrigger, function () {
                updateTriggers();
            });
        };

        this.editTag = function (idTag) {
            var $search = $location.search();
            $search.idTag = idTag;
            $location.search($search);
        };

        this.deleteTag = function (tag) {
            function doDelete() {
                tagManagerTagModel.deleteTag(self.idContainer, self.idContainerVersion, tag.idtag).then(function () {
                    tagManagerTagModel.reload(self.idContainer, self.idContainerVersion);
                });
            }

            piwik.helper.modalConfirm('#confirmDeleteTag', {yes: doDelete});
        };

        this.model.fetchTags(this.idContainer, this.idContainerVersion);
        updateTriggers();
    }
})();