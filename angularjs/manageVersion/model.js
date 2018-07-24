/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    angular.module('piwikApp').factory('tagManagerVersionModel', tagManagerVersionModel);

    tagManagerVersionModel.$inject = ['piwikApi', '$q', '$filter'];

    function tagManagerVersionModel(piwikApi, $q, $filter) {
        var fetchPromise = null;
        var environmentPublishPromise = null;
        var translate = $filter('translate');

        var model = {
            versions : [],
            isLoading: false,
            isUpdating: false,
            findVersion: findVersion,
            createOrUpdateVersion: createOrUpdateVersion,
            deleteVersion: deleteVersion,
            publishVersion: publishVersion,
            fetchAvailableEnvironmentsWithPublishPermission: fetchAvailableEnvironmentsWithPublishPermission,
            reload: reload,
            fetchVersions: fetchVersions
        };

        return model;

        function reload(idContainer)
        {
            model.versions = [];
            fetchPromise = null;
            return fetchVersions(idContainer);
        }

        function fetchVersions(idContainer) {
            var params = {method: 'TagManager.getContainerVersions', idContainer: idContainer, filter_limit: '-1'};

            if (!fetchPromise) {
                fetchPromise = piwikApi.fetch(params);
            }

            model.isLoading = true;
            model.versions = [];

            return fetchPromise.then(function (versions) {
                model.versions = versions;

                model.isLoading = false;
                return versions;
            }, function () {
                model.isLoading = false;
            });
        }

        function fetchAvailableEnvironmentsWithPublishPermission() {
            if (!environmentPublishPromise) {
                var params = {method: 'TagManager.getAvailableEnvironmentsWithPublishCapability', filter_limit: '-1'};
                environmentPublishPromise = piwikApi.fetch(params);
            }

            return environmentPublishPromise;
        }

        function findVersion(idContainer, idContainerVersion) {

            // before going through an API request we first try to find it in loaded versions
            var found;
            angular.forEach(model.versions, function (version) {
                if (!found && parseInt(version.idcontainerversion, 10) === idContainerVersion) {
                    found = version;
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
                idContainerVersion: idContainerVersion,
                idContainer: idContainer,
                method: 'TagManager.getContainerVersion', filter_limit: '-1'
            }).then(function (record) {
                model.isLoading = false;
                return record;

            }, function (error) {
                model.isLoading = false;
            });
        }

        function deleteVersion(idContainer, idContainerVersion) {

            model.isUpdating = true;
            model.versions = [];

            piwikApi.withTokenInUrl();

            return piwikApi.fetch({idContainer: idContainer, idContainerVersion: idContainerVersion, method: 'TagManager.deleteContainerVersion'}).then(function (response) {
                model.isUpdating = false;

                return {type: 'success'};

            }, function (error) {
                model.isUpdating = false;
                return {type: 'error', message: error};
            });
        }

        function publishVersion(idContainer, idContainerVersion, environment)
        {
            model.isUpdating = true;
            var params = {idContainer: idContainer,
                          idContainerVersion: idContainerVersion,
                          environment: environment,
                          method: 'TagManager.publishContainerVersion'};
            return piwikApi.fetch(params).then(function (response) {
                model.isUpdating = false;

                return {type: 'success'};

            }, function (error) {
                model.isUpdating = false;
                return {type: 'error', message: error};
            });
        }

        function createOrUpdateVersion(version, method) {
            version = angular.copy(version);
            version.method = method;

            var map = {
                idContainerVersion: 'idcontainerversion',
                idContainer: 'idcontainer',
            };

            angular.forEach(map, function (value, key) {
                if (typeof version[value] !== 'undefined') {
                    version[key] = version[value];
                    delete version[value];
                }
            });

            var postParams = [];
            var post = {};
            for (var i = 0; i < postParams.length; i++) {
                var postParam = postParams[i];
                if (typeof version[postParam] !== 'undefined') {
                    post[postParam] = version[postParam];
                    delete version[postParam];
                }
            }

            model.isUpdating = true;

            piwikApi.withTokenInUrl();

            return piwikApi.post(version, post).then(function (response) {
                model.isUpdating = false;

                return {type: 'success', response: response};

            }, function (error) {
                model.isUpdating = false;
                return {type: 'error', message: error};
            });
        }

    }
})();