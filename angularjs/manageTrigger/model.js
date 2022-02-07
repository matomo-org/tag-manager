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
            fetchTriggersIfNotLoaded: fetchTriggersIfNotLoaded
        };

        return model;

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

    }
})();
