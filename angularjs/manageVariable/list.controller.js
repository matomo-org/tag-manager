/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    angular.module('piwikApp').controller('VariableListController', VariableListController);

    VariableListController.$inject = ['$scope', 'tagManagerVariableModel', 'piwik', 'piwikApi', '$location'];

    function VariableListController($scope, tagManagerVariableModel, piwik, piwikApi, $location) {

        this.model = tagManagerVariableModel;
        this.hasWriteAccess = piwik.hasUserCapability('tagmanager_write');

        var self = this;
        this.idContainer = $scope.idContainer;
        this.idContainerVersion = $scope.idContainerVersion;
        this.variableReferences = [];

        this.createVariable = function () {
            this.editVariable(0);
        };

        this.editVariable = function (idVariable) {
            var $search = $location.search();
            $search.idVariable = idVariable;
            $location.search($search);
        };

        this.deleteVariable = function (variable) {

            piwikApi.fetch({method: 'TagManager.getContainerVariableReferences', idContainer: this.idContainer,
                idContainerVersion: this.idContainerVersion, idVariable: variable.idvariable}).then(function (references) {
                if (!references || !references.length) {
                    self.variableReferences = [];
                    function doDelete() {
                        tagManagerVariableModel.deleteVariable(self.idContainer, self.idContainerVersion, variable.idvariable).then(function () {
                            tagManagerVariableModel.reload(self.idContainer, self.idContainerVersion);
                        });
                    }

                    piwik.helper.modalConfirm('#confirmDeleteVariable', {yes: doDelete});
                } else {
                    self.variableReferences = references;
                    piwik.helper.modalConfirm('#confirmDeleteVariableNotPossible', {});
                }
            });

        };

        this.model.fetchVariables(this.idContainer, this.idContainerVersion);
        this.model.fetchAvailableContainerVariables(this.idContainer, this.idContainerVersion).then(function (variables) {
            self.containerVariables = variables;
        });
    }
})();