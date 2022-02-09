/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    angular.module('piwikApp').controller('TagEditController', TagEditController);

    TagEditController.$inject = ['$scope', 'tagManagerTagModel', 'piwik', '$location', '$filter', '$timeout', '$rootScope'];

    function TagEditController($scope, tagManagerTagModel, piwik, $location, $filter, $timeout, $rootScope) {

        var self = this;
        var currentId = null;
        var

        var translate = $filter('translate');

        this.isDirty = false;
        this.model = tagManagerTagModel;
        this.idContainer = $scope.idContainer;
        this.idContainerVersion = $scope.idContainerVersion;
        this.showAdvanced = false;
        this.chooseTagType = false;
        this.canUseCustomTemplates = piwik.hasUserCapability('tagmanager_use_custom_templates');

        this.availableTags = [];
        this.availableFireLimits = [];
        this.containerTriggers = [];
        this.currentTime = null;





        function enrichTemplateType(template)
        {
            template.isDisabled = !self.canUseCustomTemplates && template && template.isCustomTemplate;
            return template;
        }

        function updateAvailableTriggers()
        {
            self.model.fetchContainerTriggers(self.idContainer, self.idContainerVersion).then(function (triggers) {
                self.containerTriggers = [];
                angular.forEach(triggers, function (trigger) {
                    self.containerTriggers.push({key: trigger.idtrigger, value:  trigger.name});
                });
            });
        }
        updateAvailableTriggers();


        function setCurrentTime() {
            self.currentTime = getCurrentTime();
            $timeout(setCurrentTime, 10000);
        }

        setCurrentTime();

        this.model.fetchAvailableFireLimits().then(function (fireLimits) {
            self.availableFireLimits = [];
            angular.forEach(fireLimits, function (fireLimit) {
                self.availableFireLimits.push({key: fireLimit.id, value: fireLimit.name});
            });
        });

        function getNotification()
        {
            var UI = require('piwik/UI');
            return new UI.Notification();
        }

        function removeAnyTagNotification()
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
            var message = _pk_translate('TagManager_ErrorXNotProvided', [title]);
            showNotification(message, 'error');
        }

        var deregisterWatches = [];

        function init(idTag)
        {
            self.create = idTag == '0';
            self.edit   = !self.create;
            self.tag = {};
            self.chooseTagType = false;
            self.editTitle = '';

            var dereg;
            for (dereg = 0; dereg < deregisterWatches.length; dereg++) {
                if ('function' === typeof deregisterWatches[dereg]) {
                    deregisterWatches[dereg]();
                }
            }

            piwik.helper.lazyScrollToContent();

            self.availableTags = [];
            self.model.fetchContainer(self.idContainer).then(function (container){
                return self.model.fetchAvailableTags(container.context);
            }).then(function (tags) {
                angular.forEach(tags, function (tagsGroup) {
                    angular.forEach(tagsGroup.types, function (tag) {
                        enrichTemplateType(tag);
                    });
                });

                self.availableTags = tags;
            }).then(function () {
                if (self.edit && idTag) {
                    self.editTitle = translate('TagManager_EditTag');

                    self.model.findTag(self.idContainer, self.idContainerVersion, idTag).then(function (tag) {
                        if (!tag) {
                            return;
                        }
                        self.tag = angular.copy(tag);
                        self.tag.idcontainer = self.idContainer;
                        self.tag.block_triggers = [];
                        self.tag.fire_triggers = [];

                        if (self.tag.typeMetadata) {
                            enrichTemplateType(self.tag.typeMetadata);
                        }

                        if (angular.isArray(self.tag.block_trigger_ids)) {
                            angular.forEach(self.tag.block_trigger_ids, function (id) {
                                self.tag.block_triggers.push({idtrigger: id});
                            });
                        }
                        if (!self.tag.block_triggers.length) {
                            self.tag.block_triggers.push({idtrigger: ''});
                        }

                        if (angular.isArray(self.tag.fire_trigger_ids)) {
                            angular.forEach(self.tag.fire_trigger_ids, function (id) {
                                self.tag.fire_triggers.push({idtrigger: id});
                            });
                        }
                        if (!self.tag.fire_triggers.length) {
                            self.tag.fire_triggers.push({idtrigger: ''});
                        }

                        if (self.tag.start_date) {
                            self.tag.start_date_date = convertUtcDateToLocalDatePart(self.tag.start_date);
                            self.tag.start_date_time = convertUtcDateToLocalTimePart(self.tag.start_date)
                        }

                        if (self.tag.end_date) {
                            self.tag.end_date_date = convertUtcDateToLocalDatePart(self.tag.end_date);
                            self.tag.end_date_time = convertUtcDateToLocalTimePart(self.tag.end_date)
                        }

                        self.addParameterWatch();
                        self.onFireTriggerChange();
                        self.onBlockTriggerChange();
                        self.isDirty = false;

                    });
                } else if (self.create) {
                    self.editTitle = translate('TagManager_ChooseTagToContinue');
                    self.chooseTagType = true;
                }
            });
        };

        this.addParameterWatch = function () {
            var index;
            if (this.tag.typeMetadata && this.tag.typeMetadata.parameters) {
                for (index = 0; index < this.tag.typeMetadata.parameters.length; index++) {
                    deregisterWatches.push($scope.$watch('editTag.tag.typeMetadata.parameters[' + index + '].value', function (val, oldVal) {
                        if (val !== oldVal) {
                            self.isDirty = true;
                        }
                    }));
                }
            }
        };

        this.onCreateNewBlockTrigger = function (callback) {
            this.openEditTrigger(function (trigger) {
                var indexLastEntry = self.tag.block_triggers.length - 1;
                if (!self.tag.block_triggers[indexLastEntry] ||
                    !self.tag.block_triggers[indexLastEntry].idtrigger) {
                    self.tag.block_triggers[indexLastEntry] = {idtrigger:trigger.idtrigger};
                } else {
                    self.tag.block_triggers.push({idtrigger:trigger.idtrigger});
                }
                self.onBlockTriggerChange();
            }, 0);
        };

        this.onCreateNewFireTrigger = function() {
            this.openEditTrigger(function (trigger) {
                var indexLastEntry = self.tag.fire_triggers.length - 1;
                if (!self.tag.fire_triggers[indexLastEntry] ||
                    !self.tag.fire_triggers[indexLastEntry].idtrigger) {
                    self.tag.fire_triggers[indexLastEntry] = {idtrigger:trigger.idtrigger};
                } else {
                    self.tag.fire_triggers.push({idtrigger:trigger.idtrigger});
                }
                self.onFireTriggerChange();
            }, 0);
        };

        this.editTrigger = function(idTrigger) {
            this.openEditTrigger(function (trigger) {
                //
            }, idTrigger);
        };

        this.openEditTrigger = function(callback, idTag) {
            tagManagerHelper.editTrigger($scope, this.idContainer, this.idContainerVersion, idTag, function (trigger) {
                updateAvailableTriggers();
                callback(trigger);
            });
        };

        this.onBlockTriggerChange = function () {
            var hasAll = true;
            angular.forEach(this.tag.block_triggers, function (trigger) {
                if (!trigger || !trigger.idtrigger) {
                    hasAll = false;
                }
            });
            if (hasAll) {
                this.addBlockTrigger();
            }
        };

        this.addBlockTrigger = function () {
            this.tag.block_triggers.push({idtrigger: ''});
            this.isDirty = true;
        };

        this.removeBlockTrigger = function (index) {
            if (index > -1) {
                var lastIndex = this.tag.block_triggers.length - 1;
                if (lastIndex === index) {
                    this.tag.block_triggers[index] = {idtrigger: ''};
                } else {
                    this.tag.block_triggers.splice(index, 1);
                }

                this.isDirty = true;
            }
        };

        this.onFireTriggerChange = function () {
            var hasAll = true;
            angular.forEach(this.tag.fire_triggers, function (trigger) {
                if (!trigger || !trigger.idtrigger) {
                    hasAll = false;
                }
            });
            if (hasAll) {
                this.addFireTrigger();
            }
        };

        this.addFireTrigger = function () {
            this.tag.fire_triggers.push({idtrigger:''});
            this.isDirty = true;
        };

        this.removeFireTrigger = function (index) {
            if (index > -1) {
                var lastIndex = this.tag.fire_triggers.length - 1;
                if (lastIndex === index) {
                    this.tag.block_triggers[index] = {idtrigger: ''};
                } else {
                    this.tag.fire_triggers.splice(index, 1);
                }

                this.isDirty = true;
            }
        };

        this.createTagType = function (tagTemplate) {
            if (tagTemplate && tagTemplate.isDisabled) {
                return;
            }
            this.chooseTagType = false;
            this.editTitle = translate('TagManager_CreateNewTag');
            this.tag = {
                idSite: piwik.idSite,
                name: this.model.suggestNameForType(tagTemplate.name),
                type: tagTemplate.id,
                idcontainer: self.idContainer,
                idcontainerversion: self.idContainerVersion,
                parameters: {},
                fire_limit: 'unlimited',
                priority: 999,
                fire_delay: 0,
                block_triggers: [{idtrigger: ''}],
                fire_triggers: [{idtrigger: ''}],
                typeMetadata: tagTemplate
            };
            this.addParameterWatch();

            this.isDirty = false;

            $timeout(function () {
                var editTag = $('.editTag');
                if (editTag.length && editTag[0]) {
                    editTag[0].scrollIntoView()
                }
                $('.editTag #name').focus();
            }, 1);
        };

        this.cancel = function () {
            $scope.idTag = null;
            currentId = null;

            var $search = $location.search();
            delete $search.idTag;
            $location.search($search);
        };

        $scope.$on('$destroy', function() {
            $scope.idTag = null;
            currentId = null;
        });

        function checkRequiredFieldsAreSet()
        {
            var title;

            if (!self.tag.name) {
                title = translate('General_Name');
                showErrorFieldNotProvidedNotification(title);
                return false;
            }

            if (!self.tag.fire_triggers || !self.tag.fire_triggers.length) {
                showNotification(translate('TagManager_TagFireTriggerRequirement'), 'error');
                return false;
            }

            return true;
        }

        this.onAnyDateChange = function () {
            if (this.tag.start_date_date) {
                if (!this.tag.start_date_time) {
                    this.tag.start_date_time = '00:00:00';
                }

                this.tag.start_date = convertLocalDateToUtc(this.tag.start_date_date + ' ' + this.tag.start_date_time);

            } else {
                this.tag.start_date = null;
            }

            if (this.tag.end_date_date) {
                if (!this.tag.end_date_time) {
                    this.tag.end_date_time = '23:59:59';
                }

                this.tag.end_date = convertLocalDateToUtc(this.tag.end_date_date + ' ' + this.tag.end_date_time);
            } else {
                this.tag.end_date = null;
            }
        };

        this.createTag = function () {
            removeAnyTagNotification();

            if (!checkRequiredFieldsAreSet()) {
                return;
            }

            this.isUpdating = true;

            tagManagerTagModel.createOrUpdateTag(this.tag, 'TagManager.addContainerTag').then(function (response) {
                self.isUpdating = false;

                if (!response || response.type === 'error' || !response.response) {
                    return;
                }

                self.isDirty = false;

                var idTag = response.response.value;

                tagManagerTagModel.reload(self.idContainer, self.idContainerVersion).then(function () {
                    var $search = $location.search();
                    $search.idTag = idTag;
                    $location.search($search);

                    $timeout(function () {
                        showNotification(translate('TagManager_CreatedX', translate('TagManager_Tag')) + ' ' + translate('TagManager_WantToDeployThisChangeCreateVersion', '<a onclick="tagManagerHelper.createNewVersion()">', '</a>'), response.type);
                    }, 200);
                });
            }, function () {
                self.isUpdating = false;
            });
        };

        this.setValueHasChanged = function () {
            this.isDirty = true;
        };

        this.updateTag = function () {

            removeAnyTagNotification();

            if (!checkRequiredFieldsAreSet()) {
                return;
            }

            this.isUpdating = true;

            tagManagerTagModel.createOrUpdateTag(this.tag, 'TagManager.updateContainerTag').then(function (response) {
                if (response.type === 'error') {
                    return;
                }

                var idTag = self.tag.idtag;

                self.isDirty = false;
                self.tag = {};

                tagManagerTagModel.reload(self.idContainer, self.idContainerVersion).then(function () {
                    init(idTag);
                });
                showNotification(translate('TagManager_UpdatedX', translate('TagManager_Tag')) + ' ' + translate('TagManager_WantToDeployThisChangeCreateVersion', '<a onclick="tagManagerHelper.createNewVersion()">', '</a>'), response.type);
            });
        };

        $scope.$watch('idTag', function (newValue, oldValue) {
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
