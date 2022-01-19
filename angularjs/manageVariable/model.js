/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    angular.module('piwikApp').factory('tagManagerVariableModel', tagManagerVariableModel);

    tagManagerVariableModel.$inject = ['piwikApi', '$q', '$filter'];

    function tagManagerVariableModel(piwikApi, $q, $filter) {
        var fetchPromise = null;
        var variablesPromise = {};
        var comparisonPromise = null;
        var preconfiguredVarsPromise = null;
        var translate = $filter('translate');

        var model = {
            variables : [],
            isLoading: false,
            isUpdating: false,
            findVariable: findVariable,
            createOrUpdateVariable: createOrUpdateVariable,
            fetchAvailableVariables: fetchAvailableVariables,
            fetchContainer: fetchContainer,
            fetchAvailableComparisons: fetchAvailableComparisons,
            suggestNameForType: suggestNameForType,
            deleteVariable: deleteVariable,
            reload: reload,
            fetchVariables: fetchVariables,
            fetchVariablesIfNotLoaded: fetchVariablesIfNotLoaded,
            fetchAvailableContainerVariables: fetchAvailableContainerVariables
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

        function filterLookupTable(lookups)
        {
            return arrayFilter(lookups, function (lookup) {
                return !!lookup && lookup.out_value && lookup.comparison;
            });
        }

        function fetchAvailableVariables(idContext) {
            if (!variablesPromise[idContext]) {
                var params = {method: 'TagManager.getAvailableVariableTypesInContext', idContext: idContext, filter_limit: '-1'};
                variablesPromise[idContext] = piwikApi.fetch(params);
            }

            return variablesPromise[idContext];
        }

        function fetchAvailableContainerVariables(idContainer, idContainerVersion) {
            if (!preconfiguredVarsPromise) {
                var params = {method: 'TagManager.getAvailableContainerVariables', idContainer: idContainer, idContainerVersion: idContainerVersion, filter_limit: '-1'};
                preconfiguredVarsPromise = piwikApi.fetch(params);
            }

            return preconfiguredVarsPromise;
        }


        function deleteVariable(idContainer, idContainerVersion, idVariable) {

            model.isUpdating = true;
            model.variables = [];

            piwikApi.withTokenInUrl();

            return piwikApi.fetch({idVariable: idVariable, idContainerVersion: idContainerVersion, idContainer: idContainer, method: 'TagManager.deleteContainerVariable'}).then(function (response) {
                model.isUpdating = false;

                return {type: 'success'};

            }, function (error) {
                model.isUpdating = false;
                return {type: 'error', message: error};
            });
        }


    }
})();
