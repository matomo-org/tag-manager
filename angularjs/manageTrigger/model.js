/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    angular.module('piwikApp').factory('tagManagerTriggerModel', tagManagerTriggerModel);

    tagManagerTriggerModel.$inject = ['piwikApi', '$q', '$filter'];

    function tagManagerTriggerModel(piwikApi, $q, $filter) {
        var fetchPromise = null;
        var triggersPromise = {};
        var lookUpPromise = null;
        var translate = $filter('translate');

        var model = {
            triggers : [],
            isLoading: false,
            isUpdating: false,
            findTrigger: findTrigger,
            createOrUpdateTrigger: createOrUpdateTrigger,
            fetchAvailableTriggers: fetchAvailableTriggers,
            fetchContainer: fetchContainer,
            suggestNameForType: suggestNameForType,
            fetchAvailableComparisons: fetchAvailableComparisons,
            fetchAvailableContainerVariables: fetchAvailableContainerVariables,
            deleteTrigger: deleteTrigger,
            reload: reload,
            fetchTriggersIfNotLoaded: fetchTriggersIfNotLoaded,
            fetchTriggers: fetchTriggers
        };

        return model;

        function arrayFilter(array, filter)
        {
            var entries = [];

            angular.forEach(array, function (value) {
                if (filter(value)) {
                    entries.push(value);
                }
            });

            return entries;
        }

        function filterTriggerConditions(conditions)
        {
            return arrayFilter(conditions, function (condition) {
                return !!condition && condition.actual && condition.expected && condition.comparison;
            });
        }

        function fetchTriggersIfNotLoaded()
        {
            if (!fetchPromise) {
                // needed for suggestNameForType() to make sure it is aware of all names
                model.fetchTriggers();
            }
        }

        function fetchAvailableContainerVariables(idContainer, idContainerVersion) {
            var params = {
                method: 'TagManager.getAvailableContainerVariables', filter_limit: '-1',
                idContainer: idContainer, idContainerVersion: idContainerVersion
            };
            return piwikApi.fetch(params);
        }

        function reload(idContainer, idContainerVersion)
        {
            model.triggers = [];
            fetchPromise = null;
            triggersPromise = {};
            lookUpPromise = null;

            return fetchTriggers(idContainer, idContainerVersion);
        }

        function fetchAvailableTriggers(idContext) {
            if (!triggersPromise[idContext]) {
                var params = {method: 'TagManager.getAvailableTriggerTypesInContext', idContext: idContext, filter_limit: '-1'};
                triggersPromise[idContext] = piwikApi.fetch(params);
            }

            return triggersPromise[idContext];
        }

        function fetchContainer(idContainer) {
            var params = {method: 'TagManager.getContainer', idContainer: idContainer, filter_limit: '-1'};
            return piwikApi.fetch(params);
        }

        function fetchAvailableComparisons() {
            if (!lookUpPromise) {
                var params = {method: 'TagManager.getAvailableComparisons', filter_limit: '-1'};
                lookUpPromise = piwikApi.fetch(params);
            }

            return lookUpPromise;
        }

        function suggestNameForType(templateId) {
            var counter;
            for (counter = 0; counter < 100; counter++) {
                var name = templateId;
                if (counter) {
                    name = name + ' (' + counter + ')';
                }
                var isFree = true;
                angular.forEach(model.triggers, function (trigger) {
                    if (trigger && trigger.name === name) {
                        isFree = false;
                    }
                });
                if (isFree) {
                    return name;
                }
            }
        }

        function fetchTriggers(idContainer, idContainerVersion) {
            var params = {method: 'TagManager.getContainerTriggers', idContainer: idContainer,
                          idContainerVersion: idContainerVersion,filter_limit: '-1'};

            if (!fetchPromise) {
                fetchPromise = piwikApi.fetch(params);
            }

            model.isLoading = true;
            model.triggers = [];

            return fetchPromise.then(function (triggers) {
                model.triggers = triggers;

                model.isLoading = false;
                return triggers;
            }, function () {
                model.isLoading = false;
            });
        }

        function findTrigger(idContainer, idContainerVersion, idTrigger) {

            // before going through an API request we first try to find it in loaded triggers
            var found;
            angular.forEach(model.triggers, function (trigger) {
                if (!found && parseInt(trigger.idtrigger, 10) === idTrigger) {
                    found = trigger;
                }
            });

            if (found) {
                var deferred = $q.defer();
                deferred.resolve(found);
                return deferred.promise;
            }

            // otherwise we fetch it via API
            model.isLoading = true;

            return piwikApi.fetch({
                idTrigger: idTrigger,
                idContainer: idContainer,
                idContainerVersion: idContainerVersion,
                method: 'TagManager.getContainerTrigger', filter_limit: '-1'
            }).then(function (record) {
                model.isLoading = false;
                return record;

            }, function (error) {
                model.isLoading = false;
            });
        }

        function deleteTrigger(idContainer, idContainerVersion, idTrigger) {

            model.isUpdating = true;
            model.triggers = [];

            piwikApi.withTokenInUrl();

            return piwikApi.fetch({idTrigger: idTrigger, idContainerVersion: idContainerVersion, idContainer: idContainer, method: 'TagManager.deleteContainerTrigger'}).then(function (response) {
                model.isUpdating = false;

                return {type: 'success'};

            }, function (error) {
                model.isUpdating = false;
                return {type: 'error', message: error};
            });
        }

        function createOrUpdateTrigger(trigger, method) {
            trigger = angular.copy(trigger);
            trigger.method = method;

            trigger.parameters = {};

            angular.forEach(trigger.typeMetadata.parameters, function (setting) {
                var value = setting.value;
                if (value === false) {
                    value = '0';
                } else if (value === true) {
                    value = '1';
                }
                trigger.parameters[setting.name] = value;
            });

            delete trigger.typeMetadata;
            delete trigger.created_date;
            delete trigger.created_date_pretty;
            delete trigger.status;
            delete trigger.updated_date;
            delete trigger.updated_date_pretty;

            var map = {
                idTrigger: 'idtrigger',
                idContainer: 'idcontainer',
                idContainerVersion: 'idcontainerversion'
            };

            angular.forEach(map, function (value, key) {
                if (typeof trigger[value] !== 'undefined') {
                    trigger[key] = trigger[value];
                    delete trigger[value];
                }
            });

            trigger.conditions = filterTriggerConditions(trigger.conditions);

            var postParams = ['parameters', 'conditions'];
            var post = {};
            for (var i = 0; i < postParams.length; i++) {
                var postParam = postParams[i];
                if (typeof trigger[postParam] !== 'undefined') {
                    post[postParam] = trigger[postParam];
                    delete trigger[postParam];
                }
            }

            model.isUpdating = true;

            piwikApi.withTokenInUrl();

            return piwikApi.post(trigger, post).then(function (response) {
                model.isUpdating = false;

                return {type: 'success', response: response};

            }, function (error) {
                model.isUpdating = false;
                return {type: 'error', message: error};
            });
        }

    }
})();
