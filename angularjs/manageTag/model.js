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
            var params = {method: 'TagManager.getContainerTriggers', idContainer: idContainer, idContainerVersion: idContainerVersion, filter_limit: '-1'};
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

        function fetchTags(idContainer, idContainerVersion) {
            var params = {method: 'TagManager.getContainerTags', idContainer: idContainer,
                          idContainerVersion: idContainerVersion,filter_limit: '-1'};

            if (!fetchPromise) {
                fetchPromise = piwikApi.fetch(params);
            }

            model.isLoading = true;
            model.tags = [];

            return fetchPromise.then(function (tags) {
                model.tags = tags;

                model.isLoading = false;
                return tags;
            }, function () {
                model.isLoading = false;
            });
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

        function createOrUpdateTag(tag, method) {
            tag = angular.copy(tag);
            tag.method = method;

            tag.parameters = {};

            angular.forEach(tag.typeMetadata.parameters, function (setting) {
                var value = setting.value;
                if (value === false) {
                    value = '0';
                } else if (value === true) {
                    value = '1';
                }
                tag.parameters[setting.name] = value;
            });

            delete tag.typeMetadata;

            var map = {
                idTag: 'idtag',
                idContainer: 'idcontainer',
                idContainerVersion: 'idcontainerversion',
                startDate: 'start_date',
                endDate: 'end_date',
                fireLimit: 'fire_limit',
                fireDelay: 'fire_delay'
            };

            tag.fireTriggerIds = [];
            angular.forEach(tag.fire_triggers, function (trigger) {
                if (trigger && trigger.idtrigger) {
                    tag.fireTriggerIds.push(trigger.idtrigger);
                }
            });

            tag.blockTriggerIds = [];
            angular.forEach(tag.block_triggers, function (trigger) {
                if (trigger && trigger.idtrigger) {
                    tag.blockTriggerIds.push(trigger.idtrigger);
                }
            });

            delete tag.block_triggers;
            delete tag.block_trigger_ids;
            delete tag.fire_triggers;
            delete tag.fire_trigger_ids;

            angular.forEach(map, function (value, key) {
                if (typeof tag[value] !== 'undefined') {
                    tag[key] = tag[value];
                    delete tag[value];
                }
            });

            var postParams = ['parameters', 'fireTriggerIds', 'blockTriggerIds'];
            var post = {};
            for (var i = 0; i < postParams.length; i++) {
                var postParam = postParams[i];
                if (typeof tag[postParam] !== 'undefined') {
                    post[postParam] = tag[postParam];
                    delete tag[postParam];
                }
            }

            model.isUpdating = true;

            piwikApi.withTokenInUrl();

            return piwikApi.post(tag, post).then(function (response) {
                model.isUpdating = false;

                return {type: 'success', response: response};

            }, function (error) {
                model.isUpdating = false;
                return {type: 'error', message: error};
            });
        }

    }
})();