/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    angular.module('piwikApp').factory('tagManagerContainerModel', tagManagerContainerModel);

    tagManagerContainerModel.$inject = ['piwikApi', '$q', '$filter'];

    function tagManagerContainerModel(piwikApi, $q, $filter) {
        var fetchPromise = null;
        var contextPromise = null;
        var translate = $filter('translate');

        var model = {
            containers : [],
            isLoading: false,
            isUpdating: false,
            findContainer: findContainer,
            createOrUpdateContainer: createOrUpdateContainer,
            deleteContainer: deleteContainer,
            fetchAvailableContexts: fetchAvailableContexts,
            reload: reload,
            fetchContainers: fetchContainers
        };

        return model;

        function reload()
        {
            model.containers = [];
            fetchPromise = null;
            return fetchContainers();
        }

        function fetchContainers() {
            var params = {method: 'TagManager.getContainers', filter_limit: '-1'};

            if (!fetchPromise) {
                fetchPromise = piwikApi.fetch(params);
            }

            model.isLoading = true;
            model.containers = [];

            return fetchPromise.then(function (containers) {
                model.containers = containers;

                model.isLoading = false;
                return containers;
            }, function () {
                model.isLoading = false;
            });
        }

        function fetchAvailableContexts() {
            if (!contextPromise) {
                var params = {method: 'TagManager.getAvailableContexts', filter_limit: '-1'};
                contextPromise = piwikApi.fetch(params);
            }

            return contextPromise;
        }

        function findContainer(idContainer) {

            // before going through an API request we first try to find it in loaded containers
            var found;
            angular.forEach(model.containers, function (container) {
                if (!found && container.idcontainer === idContainer) {
                    found = container;
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
                idContainer: idContainer,
                method: 'TagManager.getContainer', filter_limit: '-1'
            }).then(function (record) {
                model.isLoading = false;
                return record;

            }, function (error) {
                model.isLoading = false;
            });
        }

        function deleteContainer(idContainer) {

            model.isUpdating = true;
            model.containers = [];

            piwikApi.withTokenInUrl();

            return piwikApi.fetch({idContainer: idContainer, method: 'TagManager.deleteContainer'}).then(function (response) {
                model.isUpdating = false;

                return {type: 'success'};

            }, function (error) {
                model.isUpdating = false;
                return {type: 'error', message: error};
            });
        }

        function createOrUpdateContainer(container, method) {
            container = angular.copy(container);

            var map = {
                idContainer: 'idcontainer',
            };

            angular.forEach(map, function (value, key) {
                if (typeof container[value] !== 'undefined') {
                    container[key] = container[value];
                    delete container[value];
                }
            });

            var postParams = ['idContainer', 'name', 'description', 'context'];
            var post = {};
            for (var i = 0; i < postParams.length; i++) {
                var param = postParams[i];
                if (typeof container[param] !== 'undefined') {
                    post[param] = container[param];
                }
            }

            model.isUpdating = true;

            piwikApi.withTokenInUrl();

            return piwikApi.post({method: method}, post).then(function (response) {
                model.isUpdating = false;

                return {type: 'success', response: response};

            }, function (error) {
                model.isUpdating = false;
                return {type: 'error', message: error};
            });
        }

    }
})();
