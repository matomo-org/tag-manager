/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    angular.module('piwikApp').factory('tagManagerTagModel', tagManagerTagModel);

    tagManagerTagModel.$inject = ['piwikApi', '$q', '$filter'];

    function tagManagerTagModel(piwikApi, $q, $filter) {
        var fetchPromise = null;
        var tagsPromise = {};
        var fireLimitsPromise = null;
        var translate = $filter('translate');

        var model = {
            tags : [],
            isLoading: false,
            isUpdating: false,
            findTag: findTag,
            createOrUpdateTag: createOrUpdateTag,
            fetchAvailableTags: fetchAvailableTags,
            fetchContainerTriggers: fetchContainerTriggers,
            fetchContainer: fetchContainer,
            fetchAvailableFireLimits: fetchAvailableFireLimits,
            suggestNameForType: suggestNameForType,
            deleteTag: deleteTag,
            reload: reload,
            onReload: null,
            fetchTags: fetchTags
        };

        return model;

        function reload(idContainer, idContainerVersion)
        {
            model.tags = [];
            fetchPromise = null;
            tagsPromise = {};
            fireLimitsPromise = null;

            if (model.onReload) {
                model.onReload();
            }

            return fetchTags(idContainer, idContainerVersion);
        }

        function fetchAvailableTags(idContext) {
            if (!tagsPromise[idContext]) {
                var params = {method: 'TagManager.getAvailableTagTypesInContext', idContext: idContext, filter_limit: '-1'};
                tagsPromise[idContext] = piwikApi.fetch(params);
            }

            return tagsPromise[idContext];
        }

        function fetchContainerTriggers(idContainer, idContainerVersion) {
            var params = {};
            return piwikApi.fetch(params);
        }

        function fetchContainer(idContainer) {
            var params = {method: 'TagManager.getContainer', idContainer: idContainer, filter_limit: '-1'};
            return piwikApi.fetch(params);
        }

        function fetchAvailableFireLimits() {
            if (!fireLimitsPromise) {
                var params = {method: 'TagManager.getAvailableTagFireLimits', filter_limit: '-1'};
                fireLimitsPromise = piwikApi.fetch(params);
            }

            return fireLimitsPromise;
        }


        function findTag(idContainer, idContainerVersion, idTag) {

            // before going through an API request we first try to find it in loaded tags
            var found;
            angular.forEach(model.tags, function (tag) {
                if (!found && parseInt(tag.idtag, 10) === idTag) {
                    found = tag;
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
                idTag: idTag,
                idContainer: idContainer,
                idContainerVersion: idContainerVersion,
                method: 'TagManager.getContainerTag', filter_limit: '-1'
            }).then(function (record) {
                model.isLoading = false;
                return record;

            }, function (error) {
                model.isLoading = false;
            });
        }

        function deleteTag(idContainer, idContainerVersion, idTag) {

            model.isUpdating = true;
            model.tags = [];

            piwikApi.withTokenInUrl();

            return piwikApi.fetch({idTag: idTag, idContainerVersion: idContainerVersion, idContainer: idContainer, method: 'TagManager.deleteContainerTag'}).then(function (response) {
                model.isUpdating = false;

                return {type: 'success'};

            }, function (error) {
                model.isUpdating = false;
                return {type: 'error', message: error};
            });
        }

        function suggestNameForType(templateId) {

            var counter;
            for (counter = 0; counter < 100; counter++) {
                var name = templateId;
                if (counter) {
                    name = name + ' (' + counter + ')';
                }
                var isFree = true;
                angular.forEach(model.tags, function (tag) {
                    if (tag && tag.name === name) {
                        isFree = false;
                    }
                });
                if (isFree) {
                    return name;
                }
            }
        }


    }
})();
