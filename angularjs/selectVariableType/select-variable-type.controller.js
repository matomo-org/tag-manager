/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    angular.module('piwikApp').controller('VariableSelectTypeController', VariableSelectTypeController);

    VariableSelectTypeController.$inject = ['$scope', 'piwikApi', 'piwikUrl'];

    function VariableSelectTypeController($scope, piwikApi, piwikUrl) {

        var self = this;
        this.containerVariables = [];
        this.isLoading = false;
        this.idContainer = piwikUrl.getSearchParam('idContainer');
        this.idContainerVersion = null;
        this.variableType = $scope.variableType;
        this.variable = $scope.variable;
        this.variableTypeName = $scope.variableTypeName;

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
            self.containerVariables = [];

            getContainer().then(function (container) {
                self.isLoading = true;
                self.idContainerVersion = container.draft.idcontainerversion;
                var params = {
                    method: 'TagManager.getAvailableContainerVariables', filter_limit: '-1',
                    idContainer: self.idContainer, idContainerVersion: self.idContainerVersion
                };
                return piwikApi.fetch(params).then(function (variables) {
                    self.containerVariables = [];
                    self.isLoading = false;

                    angular.forEach(variables, function (category) {
                        angular.forEach(category.types, function (variable, index) {
                            if (variable.type === $scope.variableType) {
                                self.containerVariables.push({key: '{{'+variable.id+'}}', value: variable.name});
                            }
                        });
                    });

                    if (!self.variable && self.containerVariables.length === 1) {
                        // when no value configured and only one selection is available, we preselect that value
                        self.variable = self.containerVariables[0].key;
                        self.onChange();
                    }
                }, function () {
                    self.isLoading = false;
                });
            });

        }

        fetchAvailableVariables();

        this.onChange = function () {
            $scope.variable = self.variable;
        };

        this.createVariable = function () {
            if (!this.idContainerVersion) {
                return;
            }

            tagManagerHelper.editVariable($scope, this.idContainer, this.idContainerVersion, 0, function (variable) {
               fetchAvailableVariables();
               if (variable) {
                   self.variable = '{{'+variable.name+'}}';
                   $scope.variable = self.variable;
               }
            }, $scope.variableType);
        };

        this.selectVariable = function (variable) {
            if ('function' === typeof $scope.onSelectVariable) {
                $scope.onSelectVariable({variable: variable});
                return;
            }
        }
    }
})();