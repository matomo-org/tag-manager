/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    angular.module('piwikApp').controller('TriggerEditController', TriggerEditController);

    TriggerEditController.$inject = ['$scope', 'tagManagerTriggerModel', 'piwik', '$location', '$filter', '$timeout', '$rootScope'];

    function TriggerEditController($scope, tagManagerTriggerModel, piwik, $location, $filter, $timeout, $rootScope) {

        var self = this;
        var currentId = null;
        var notificationId = 'tagtriggermanagement';

        var translate = $filter('translate');

        this.isDirty = false;
        this.model = tagManagerTriggerModel;
        this.idContainer = $scope.idContainer;
        this.idContainerVersion = $scope.idContainerVersion;
        this.chooseTriggerType = false;
        this.isEmbedded = !!$scope.onChangeTrigger;

        this.availableTriggers = [];
        this.availableComparisons = [];
        this.availableVariables = [];
        this.variableIdToName = {};

        this.model.fetchAvailableComparisons().then(function (comparisons) {
            self.availableComparisons = [];
            angular.forEach(comparisons, function (comparison) {
                self.availableComparisons.push({key: comparison.id, value: comparison.name});
            });
        });

        this.model.fetchAvailableContainerVariables(this.idContainer, this.idContainerVersion).then(function (variables) {
            self.availableVariables = [];
            angular.forEach(variables, function (category) {
                angular.forEach(category.types, function (variable) {
                    self.variableIdToName[variable.id] = variable.name;
                    self.availableVariables.push({key: variable.id, value: variable.name, group: category.name});
                });
            });
        });

        // needed for suggestNameForType() to make sure it is aware of all names
        this.model.fetchTriggersIfNotLoaded();

        function getNotification()
        {
            var UI = require('piwik/UI');
            return new UI.Notification();
        }

        function removeAnyTriggerNotification()
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

        function init(idTrigger)
        {
            self.create = idTrigger == '0';
            self.edit   = !self.create;
            self.trigger = {};
            self.chooseTriggerType = false;
            self.editTitle = '';

            var dereg;
            for (dereg = 0; dereg < deregisterWatches.length; dereg++) {
                if ('function' === typeof deregisterWatches[dereg]) {
                    deregisterWatches[dereg]();
                }
            }

            piwik.helper.lazyScrollToContent();

            self.availableTriggers = [];
            self.model.fetchContainer(self.idContainer).then(function (container){
                return self.model.fetchAvailableTriggers(container.context);
            }).then(function (triggers) {
                self.availableTriggers = triggers;
            }).then(function () {
                if (self.edit && idTrigger) {
                    self.editTitle = translate('TagManager_EditTrigger');

                    self.model.findTrigger(self.idContainer, self.idContainerVersion, idTrigger).then(function (trigger) {
                        if (!trigger) {
                            return;
                        }
                        self.trigger = angular.copy(trigger);
                        self.trigger.idcontainer = self.idContainer;
                        self.addConditionEntryIfNoneExists();
                        self.onConditionChange();
                        self.addParameterWatch();
                        self.isDirty = false;
                    });
                } else if (self.create) {
                    self.editTitle = translate('TagManager_ChooseTriggerToContinue');
                    self.chooseTriggerType = true;
                }
            });
        };

        this.addParameterWatch = function () {
            var index;
            if (this.trigger.typeMetadata && this.trigger.typeMetadata.parameters) {
                for (index = 0; index < this.trigger.typeMetadata.parameters.length; index++) {
                    deregisterWatches.push($scope.$watch('editTrigger.trigger.typeMetadata.parameters[' + index + '].value', function (val, oldVal) {
                        if (val !== oldVal) {
                            self.isDirty = true;
                        }
                    }));
                }
            }
        };

        this.onConditionChange = function () {
            var hasAll = true;
            angular.forEach(this.trigger.conditions, function (condition) {
                if (!condition || !condition.expected) {
                    hasAll = false;
                }
            });
            if (hasAll) {
                this.addConditionEntry();
            }
        };

        this.getDefaultCondition = function()
        {
            var defaultActual = 'PageUrl';
            if (this.trigger && this.trigger.typeMetadata) {
                var types = {
                    'AllElementsClick': 'ClickId',
                    'AllLinksClick': 'ClickId',
                    'DownloadClick': 'ClickId',
                    'ElementVisibility': 'VisibleElementClasses',
                    'FormSubmit': 'FormId',
                    'JavaScriptError': 'ErrorMessage'
                };
                var type = this.trigger.typeMetadata.id;
                if (type in types) {
                    defaultActual = types[type];
                }

            }
            return {comparison: 'equals', actual: defaultActual, expected: ''};
        }

        this.addConditionEntryIfNoneExists = function () {
            if (!this.trigger.conditions || !angular.isArray(this.trigger.conditions)) {
                this.trigger.conditions = [];
            }
            if (!this.trigger.conditions.length) {
                this.trigger.conditions.push(this.getDefaultCondition());
            }
        };

        this.addConditionEntry = function () {
            this.trigger.conditions.push(this.getDefaultCondition());
            this.isDirty = true;
        };

        this.removeConditionEntry = function (index) {
            if (index > -1) {
                var lastIndex = this.trigger.conditions.length - 1;
                if (lastIndex === index) {
                    this.trigger.conditions[index] = this.getDefaultCondition();
                } else {
                    this.trigger.conditions.splice(index, 1);
                }
            }
        };

        this.createTriggerType = function (triggerTemplate) {
            this.chooseTriggerType = false;
            this.editTitle = translate('TagManager_CreateNewTrigger');
            this.trigger = {
                idSite: piwik.idSite,
                name: this.model.suggestNameForType(triggerTemplate.name),
                type: triggerTemplate.id,
                idcontainer: self.idContainer,
                idcontainerversion: self.idContainerVersion,
                parameters: {},
                conditions: [],
                typeMetadata: triggerTemplate
            };
            this.addConditionEntry();
            this.addParameterWatch();

            this.isDirty = true; // we directly make the create button visible as sometimes some triggers do not have any settings

            $timeout(function () {
                var $editTrigger = $('.editTrigger');
                if ($editTrigger.length && $editTrigger[0]) {
                    $editTrigger[0].scrollIntoView()
                }
                $('.editTrigger #name').focus();
            }, 1);
        };

        this.cancel = function () {
            $scope.idTrigger = null;
            currentId = null;

            var $search = $location.search();
            delete $search.idTrigger;
            $location.search($search);
        };

        $scope.$on('$destroy', function() {
            $scope.idTrigger = null;
            currentId = null;
        });

        function checkRequiredFieldsAreSet()
        {
            var title;

            if (!self.trigger.name) {
                title = _pk_translate('General_Name');
                showErrorFieldNotProvidedNotification(title);
                return false;
            }

            return true;
        }

        this.createTrigger = function () {
            removeAnyTriggerNotification();

            if (!checkRequiredFieldsAreSet()) {
                return;
            }

            this.isUpdating = true;

            tagManagerTriggerModel.createOrUpdateTrigger(this.trigger, 'TagManager.addContainerTrigger').then(function (response) {
                self.isUpdating = false;

                if (!response || response.type === 'error' || !response.response) {
                    return;
                }
                var idTrigger = response.response.value;

                if ('function' === typeof $scope.onChangeTrigger) {
                    self.model.reload(self.idContainer, self.idContainerVersion);
                    self.trigger.idtrigger = idTrigger;
                    $scope.onChangeTrigger({trigger: self.trigger});
                    return;
                }

                self.isDirty = false;

                tagManagerTriggerModel.reload(self.idContainer, self.idContainerVersion).then(function () {
                    var $search = $location.search();
                    $search.idTrigger = idTrigger;
                    $location.search($search);

                    $timeout(function () {
                        showNotification(translate('TagManager_CreatedX', translate('TagManager_Trigger')) + ' ' + translate('TagManager_WantToDeployThisChangeCreateVersion', '<a onclick="tagManagerHelper.createNewVersion()">', '</a>'), response.type);
                    }, 200);
                });
            }, function () {
                self.isUpdating = false;
            });
        };

        this.setValueHasChanged = function () {
            this.isDirty = true;
        };

        this.updateTrigger = function () {

            removeAnyTriggerNotification();

            if (!checkRequiredFieldsAreSet()) {
                return;
            }

            this.isUpdating = true;

            tagManagerTriggerModel.createOrUpdateTrigger(this.trigger, 'TagManager.updateContainerTrigger').then(function (response) {
                if (response.type === 'error') {
                    return;
                }

                if ('function' === typeof $scope.onChangeTrigger) {
                    self.trigger.idtrigger = idTrigger;
                    $scope.onChangeTrigger({trigger: self.trigger});
                    return;
                }

                var idTrigger = self.trigger.idtrigger;

                self.isDirty = false;
                self.trigger = {};

                tagManagerTriggerModel.reload(self.idContainer, self.idContainerVersion).then(function () {
                    init(idTrigger);
                });
                showNotification(translate('TagManager_UpdatedX', translate('TagManager_Trigger')) + ' ' + translate('TagManager_WantToDeployThisChangeCreateVersion', '<a onclick="tagManagerHelper.createNewVersion()">', '</a>'), response.type);
            });
        };

        $scope.$watch('idTrigger', function (newValue, oldValue) {
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