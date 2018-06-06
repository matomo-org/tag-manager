/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    angular.module('piwikApp').controller('VariableSelectController', VariableSelectController);

    VariableSelectController.$inject = ['$scope', 'piwikApi'];

    function VariableSelectController($scope, piwikApi) {
        var self = this;
        this.preconfiguredVariables = [];
        this.containerVariables = [];
        this.isLoading = false;
        this.idContainer = $scope.idContainer;
        this.idContainerVersion = null;

        function getContainer()
        {
            self.isLoading = true;
            var params = {
                method: 'TagManager.getContainer', filter_limit: '-1',
                idContainer: self.idContainer
            };
            return piwikApi.fetch(params);
        }

        function fetchAvailableVariables() {
            self.preconfiguredVariables = [];
            self.containerVariables = [];

            getContainer().then(function (container) {
                self.isLoading = true;
                self.idContainerVersion = container.draft.idcontainerversion;
                var params = {
                    method: 'TagManager.getAvailableContainerVariables', filter_limit: '-1',
                    idContainer: self.idContainer, idContainerVersion: self.idContainerVersion
                };
                return piwikApi.fetch(params).then(function (variables) {
                    self.preconfiguredVariables = [];
                    self.containerVariables = [];
                    self.isLoading = false;

                    angular.forEach(variables, function (category) {
                        var preConfig = angular.copy(category);
                        preConfig.types = [];

                        angular.forEach(category.types, function (variable, index) {
                            if (variable.is_pre_configured) {
                                preConfig.types.push(variable);
                            } else {
                                self.containerVariables.push(variable);
                            }
                        });
                        if (preConfig && preConfig.types && preConfig.types.length) {
                            self.preconfiguredVariables.push(preConfig);
                        }
                    });
                }, function () {

                    self.isLoading = false;
                });
            });

        }

        fetchAvailableVariables();

        this.editVariable = function (variable) {
            if (!this.idContainerVersion) {
                return;
            }

            tagManagerHelper.editVariable($scope, this.idContainer, this.idContainerVersion, variable.idvariable, function () {
               fetchAvailableVariables();
            });
        };

        this.createVariable = function () {
            if (!this.idContainerVersion) {
                return;
            }

            tagManagerHelper.editVariable($scope, this.idContainer, this.idContainerVersion, 0, function () {
               fetchAvailableVariables();
            });
        };

        this.selectVariable = function (variable) {
            if ('function' === typeof $scope.onSelectVariable) {
                $scope.onSelectVariable({variable: variable});
                return;
            }
        }
    }
})();