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

        function reload(idContainer, idContainerVersion)
        {
            model.variables = [];
            fetchPromise = null;
            variablesPromise = {};
            comparisonPromise = null;

            return fetchVariables(idContainer, idContainerVersion);
        }

        function fetchVariablesIfNotLoaded(idContainer, idContainerVersion)
        {
            if (!fetchPromise) {
                // needed for suggestNameForType() to make sure it is aware of all names
                model.fetchVariables(idContainer, idContainerVersion);
            }
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

        function fetchContainer(idContainer) {
            var params = {method: 'TagManager.getContainer', idContainer: idContainer, filter_limit: '-1'};
            return piwikApi.fetch(params);
        }

        function fetchAvailableComparisons() {
            if (!comparisonPromise) {
                var params = {method: 'TagManager.getAvailableComparisons', filter_limit: '-1'};
                comparisonPromise = piwikApi.fetch(params);
            }

            return comparisonPromise;
        }

        function suggestNameForType(templateId) {

            var counter;
            for (counter = 0; counter < 100; counter++) {
                var name = templateId;
                if (counter) {
                    name = name + ' (' + counter + ')';
                }
                var isFree = true;
                angular.forEach(model.variables, function (variable) {
                    if (variable && variable.name === name) {
                        isFree = false;
                    }
                });
                if (isFree) {
                    return name;
                }
            }
        }

        function fetchVariables(idContainer, idContainerVersion) {
            var params = {method: 'TagManager.getContainerVariables', idContainer: idContainer,
                          idContainerVersion: idContainerVersion,filter_limit: '-1'};

            if (!fetchPromise) {
                fetchPromise = piwikApi.fetch(params);
            }

            model.isLoading = true;
            model.variables = [];

            return fetchPromise.then(function (variables) {
                model.variables = variables;

                model.isLoading = false;
                return variables;
            }, function () {
                model.isLoading = false;
            });
        }

        function findVariable(idContainer, idContainerVersion, idVariable) {

            // before going through an API request we first try to find it in loaded variables
            var found;
            angular.forEach(model.variables, function (variable) {
                if (!found && parseInt(variable.idvariable, 10) === idVariable) {
                    found = variable;
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
                idVariable: idVariable,
                idContainer: idContainer,
                idContainerVersion: idContainerVersion,
                method: 'TagManager.getContainerVariable', filter_limit: '-1'
            }).then(function (record) {
                model.isLoading = false;
                return record;

            }, function (error) {
                model.isLoading = false;
            });
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

        function createOrUpdateVariable(variable, method) {
            variable = angular.copy(variable);
            variable.method = method;

            variable.parameters = {};

            angular.forEach(variable.typeMetadata.parameters, function (setting) {
                var value = setting.value;
                if (value === false) {
                    value = '0';
                } else if (value === true) {
                    value = '1';
                }
                variable.parameters[setting.name] = value;
            });

            delete variable.typeMetadata;

            var map = {
                idVariable: 'idvariable',
                idContainer: 'idcontainer',
                idContainerVersion: 'idcontainerversion',
                lookupTable: 'lookup_table',
                defaultValue: 'default_value'
            };

            angular.forEach(map, function (value, key) {
                if (typeof variable[value] !== 'undefined') {
                    variable[key] = variable[value];
                    delete variable[value];
                }
            });

            variable.lookupTable = filterLookupTable(variable.lookupTable);

            var postParams = ['parameters', 'lookupTable'];
            var post = {};
            for (var i = 0; i < postParams.length; i++) {
                var postParam = postParams[i];
                if (typeof variable[postParam] !== 'undefined') {
                    post[postParam] = variable[postParam];
                    delete variable[postParam];
                }
            }

            model.isUpdating = true;

            piwikApi.withTokenInUrl();

            return piwikApi.post(variable, post).then(function (response) {
                model.isUpdating = false;

                return {type: 'success', response: response};

            }, function (error) {
                model.isUpdating = false;
                return {type: 'error', message: error};
            });
        }

    }
})();