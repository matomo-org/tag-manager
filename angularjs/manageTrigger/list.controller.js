/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    angular.module('piwikApp').controller('TriggerListController', TriggerListController);

    TriggerListController.$inject = ['$scope', 'tagManagerTriggerModel', 'piwik', 'piwikApi', '$location'];

    function TriggerListController($scope, tagManagerTriggerModel, piwik, piwikApi, $location) {

        this.model = tagManagerTriggerModel;
        this.hasWriteAccess = piwik.hasUserCapability('tagmanager_write');

        var self = this;
        this.idContainer = $scope.idContainer;
        this.idContainerVersion = $scope.idContainerVersion;
        this.triggerReferences = [];

        this.createTrigger = function () {
            this.editTrigger(0);
        };

        this.editTrigger = function (idTrigger) {
            var $search = $location.search();
            $search.idTrigger = idTrigger;
            $location.search($search);
        };

        this.deleteTrigger = function (trigger) {

            piwikApi.fetch({method: 'TagManager.getContainerTriggerReferences', idContainer: this.idContainer,
                            idContainerVersion: this.idContainerVersion, idTrigger: trigger.idtrigger}).then(function (references) {
                if (!references || !references.length) {
                    self.triggerReferences = [];
                    function doDelete() {
                        tagManagerTriggerModel.deleteTrigger(self.idContainer, self.idContainerVersion, trigger.idtrigger).then(function () {
                            tagManagerTriggerModel.reload(self.idContainer, self.idContainerVersion);
                        });
                    }

                    piwik.helper.modalConfirm('#confirmDeleteTrigger', {yes: doDelete});
                } else {
                    self.triggerReferences = references;
                    piwik.helper.modalConfirm('#confirmDeleteTriggerNotPossible', {});
                }
            });

        };

        this.model.fetchTriggers(this.idContainer, this.idContainerVersion);
    }
})();