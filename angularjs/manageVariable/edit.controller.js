/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    angular.module('piwikApp').controller('VariableEditController', VariableEditController);

    VariableEditController.$inject = ['$scope', 'tagManagerVariableModel', 'piwik', '$location', '$filter', '$timeout', '$rootScope'];

    function VariableEditController($scope, tagManagerVariableModel, piwik, $location, $filter, $timeout, $rootScope) {

        var self = this;
        var currentId = null;
        var notificationId = 'tagvariablemanagement';

        var translate = $filter('translate');

        this.isDirty = false;
        this.model = tagManagerVariableModel;
        this.idContainer = $scope.idContainer;
        this.idContainerVersion = $scope.idContainerVersion;
        this.showAdvanced = false;
        this.chooseVariableType = false;
        this.isEmbedded = !!$scope.onChangeVariable;
        this.canUseCustomTemplates = piwik.hasUserCapability('tagmanager_use_custom_templates');

        this.availableVariables = [];
        this.availableLookUpComparisons = [];

        this.model.fetchAvailableComparisons().then(function (lookUpComparisons) {
            self.availableLookUpComparisons = [];
            angular.forEach(lookUpComparisons, function (lookupComparison) {
                self.availableLookUpComparisons.push({key: lookupComparison.id, value: lookupComparison.name});
            });
        });

        // needed for suggestNameForType() to make sure it is aware of all names
        this.model.fetchVariablesIfNotLoaded(this.idContainer, this.idContainerVersion);

        function enrichTemplateType(template)
        {
            template.isDisabled = !self.canUseCustomTemplates && template && template.isCustomTemplate;
            return template;
        }

        function getNotification()
        {
            var UI = require('piwik/UI');
            return new UI.Notification();
        }

        function removeAnyVariableNotification()
        {
            var notification = getNotification();
            notification.remove(notificationId);
            notification.remove('ajaxHelper');
        }

        function showNotification(message, context)
        {
            var notification = getNotification();
            notification.show(message, {context: context, id: notificationId});
            $timeout(function () {
                notification.scrollToNotification();
            }, 200);
        }

        function showErrorFieldNotProvidedNotification(title)
        {
            var message = translate('TagManager_ErrorXNotProvided', [title]);
            showNotification(message, 'error');
        }

        var deregisterWatches = [];

        function init(idVariable)
        {
            self.create = idVariable == '0';
            self.edit   = !self.create;
            self.variable = {};
            self.chooseVariableType = false;
            self.editTitle = '';

            var dereg;
            for (dereg = 0; dereg < deregisterWatches.length; dereg++) {
                if ('function' === typeof deregisterWatches[dereg]) {
                    deregisterWatches[dereg]();
                }
            }

            piwik.helper.lazyScrollToContent();

            self.availableVariables = [];
            self.model.fetchContainer(self.idContainer).then(function (container){
                return self.model.fetchAvailableVariables(container.context);
            }).then(function (variables) {
                angular.forEach(variables, function (variablesGroup) {
                    angular.forEach(variablesGroup.types, function (variable) {
                        enrichTemplateType(variable);
                    });
                });

                self.availableVariables = variables;
            }).then(function () {
                if (self.edit && idVariable) {
                    self.editTitle = translate('TagManager_EditVariable');

                    self.model.findVariable(self.idContainer, self.idContainerVersion, idVariable).then(function (variable) {
                        if (!variable) {
                            return;
                        }
                        self.variable = angular.copy(variable);
                        self.variable.idcontainer = self.idContainer;

                        if (self.variable.typeMetadata) {
                            enrichTemplateType(self.variable.typeMetadata);
                        }

                        if (self.variable.lookup_table && self.variable.lookup_table.length) {
                            self.showAdvanced = true; // make sure lookup_table is visible directly if configured
                        } else if (self.variable.default_value) {
                            self.showAdvanced = true; // make sure default_value is visible directly if configured
                        }

                        self.addLookUpEntryIfNoneExists();
                        self.onLookupChange();
                        self.addParameterWatch();
                        self.isDirty = false;
                    });
                } else if (self.create) {

                    var found = false;
                    if ($scope.variableType) {
                        angular.forEach(self.availableVariables, function (variablesCategory) {

                            angular.forEach(variablesCategory.types, function (variable) {
                                if (!found && variable && variable.id === $scope.variableType) {
                                    self.createVariableType(variable);
                                    found = true;
                                }
                            })
                        });
                    }

                    if (!found) {
                        self.editTitle = translate('TagManager_ChooseVariableToContinue');
                        self.chooseVariableType = true;
                    }
                }
            });
        };

        this.addParameterWatch = function () {
            var index;
            if (this.variable.typeMetadata && this.variable.typeMetadata.parameters) {
                for (index = 0; index < this.variable.typeMetadata.parameters.length; index++) {
                    deregisterWatches.push($scope.$watch('editVariable.variable.typeMetadata.parameters[' + index + '].value', function (val, oldVal) {
                        if (val !== oldVal) {
                            self.isDirty = true;
                        }
                    }, true));
                }
            }
        }

        this.addLookUpEntryIfNoneExists = function () {
            if (!this.variable.lookup_table || !angular.isArray(this.variable.lookup_table)) {
                this.variable.lookup_table = [];
            }
            if (!this.variable.lookup_table.length) {
                this.variable.lookup_table.push({comparison: 'equals', match_value: '', out_value: ''});
            }
        };

        this.onLookupChange = function () {
            var hasAll = true;
            angular.forEach(this.variable.lookup_table, function (table) {
                if (!table || !table.out_value) {
                    hasAll = false;
                }
            });
            if (hasAll) {
                this.addLookUpEntry();
            }
        };

        this.addLookUpEntry = function () {
            this.variable.lookup_table.push({comparison: 'equals', match_value: '', out_value: ''});
            this.isDirty = true;
        };

        this.removeLookUpEntry = function (index) {
            if (index > -1) {
                this.variable.lookup_table.splice(index, 1);
                this.isDirty = true;
            }
        };

        this.createVariableType = function (variableTemplate) {
            if (variableTemplate && variableTemplate.isDisabled) {
                return;
            }

            this.chooseVariableType = false;
            this.editTitle = translate('TagManager_CreateNewVariable');
            this.variable = {
                idSite: piwik.idSite,
                name: this.model.suggestNameForType(variableTemplate.name),
                type: variableTemplate.id,
                idcontainer: self.idContainer,
                idcontainerversion: self.idContainerVersion,
                parameters: {},
                default_value: '',
                lookup_table: [],
                typeMetadata: variableTemplate
            };
            this.addLookUpEntry();
            this.addParameterWatch();

            this.isDirty = true; // we directly make the create button visible as sometimes some variables do not have any settings

            $timeout(function () {
                var editVariable = $('.editVariable');
                if (editVariable.length && editVariable[0]) {
                    editVariable[0].scrollIntoView()
                }
                $('.editVariable #name').focus();
            }, 1);
        };

        this.cancel = function () {
            $scope.idVariable = null;
            currentId = null;

            var $search = $location.search();
            delete $search.idVariable;
            $location.search($search);
        };

        $scope.$on('$destroy', function() {
            $scope.idVariable = null;
            currentId = null;
        });

        function checkRequiredFieldsAreSet()
        {
            var title;

            if (!self.variable.name) {
                title = _pk_translate('General_Name');
                showErrorFieldNotProvidedNotification(title);
                return false;
            }

            return true;
        }

        this.createVariable = function () {
            removeAnyVariableNotification();

            if (!checkRequiredFieldsAreSet()) {
                return;
            }

            this.isUpdating = true;

            var tempVariable = JSON.parse(JSON.stringify(this.variable));
            tempVariable.name = encodeURIComponent(tempVariable.name);

            tagManagerVariableModel.createOrUpdateVariable(tempVariable, 'TagManager.addContainerVariable').then(function (response) {
                self.isUpdating = false;

                if (!response || response.type === 'error' || !response.response) {
                    return;
                }

                self.isDirty = false;

                var idVariable = response.response.value;

                if ('function' === typeof $scope.onChangeVariable) {
                    self.model.reload(self.idContainer, self.idContainerVersion);
                    self.variable.idvariable = idVariable;
                    $scope.onChangeVariable({variable: self.variable});
                    return;
                }

                tagManagerVariableModel.reload(self.idContainer, self.idContainerVersion).then(function () {
                    if (piwik.helper.isAngularRenderingThePage()) {
                        var $search = $location.search();
                        $search.idVariable = idVariable;
                        $location.search($search);
                    } else {
                        $location.url('/?idVariable=' + idVariable);
                    }

                    $timeout(function () {
                        showNotification(translate('TagManager_CreatedX', translate('TagManager_Variable')) + ' ' + translate('TagManager_WantToDeployThisChangeCreateVersion', '<a onclick="tagManagerHelper.createNewVersion()">', '</a>'), response.type);
                    }, 200);
                });
            }, function () {
                self.isUpdating = false;
            });
        };

        this.setValueHasChanged = function () {
            this.isDirty = true;
        };

        this.updateVariable = function () {

            removeAnyVariableNotification();

            if (!checkRequiredFieldsAreSet()) {
                return;
            }

            this.isUpdating = true;

            var tempVariable = JSON.parse(JSON.stringify(this.variable));
            tempVariable.name = encodeURIComponent(tempVariable.name);

            tagManagerVariableModel.createOrUpdateVariable(tempVariable, 'TagManager.updateContainerVariable').then(function (response) {
                if (response.type === 'error') {
                    return;
                }

                var idVariable = self.variable.idvariable;

                if ('function' === typeof $scope.onChangeVariable) {
                    $scope.onChangeVariable({variable: self.variable});
                    return;
                }

                self.isDirty = false;
                self.variable = {};

                tagManagerVariableModel.reload(self.idContainer, self.idContainerVersion).then(function () {
                    init(idVariable);
                });
                showNotification(translate('TagManager_UpdatedX', translate('TagManager_Variable')) + ' ' + translate('TagManager_WantToDeployThisChangeCreateVersion', '<a onclick="tagManagerHelper.createNewVersion()">', '</a>'), response.type);
            });
        };

        $scope.$watch('idVariable', function (newValue, oldValue) {
            if (newValue === null) {
                return;
            }
            if (newValue != oldValue || currentId === null) {
                currentId = newValue;
                init(newValue);
            }
        });
    }
})();
