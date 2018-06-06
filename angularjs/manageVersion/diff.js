/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    angular.module('piwikApp').factory('tagManagerVersionDiff', tagManagerVersionDiff);

    tagManagerVersionDiff.$inject = ['piwikApi', '$q'];

    function tagManagerVersionDiff(piwikApi, $q) {
        var model = {
            diffDraftVersion : diffDraftVersion
        };

        return model;

        function diffDraftVersion(idContainer, idContainerVersionNew, idContainerVersionPrevious) {

            function findEntryInArray(array, name)
            {
                for (var j = 0; j < array.length; j++) {
                    if (name === array[j].name) {
                        return array[j];
                    }
                }
            }

            function getDifference(entityType, array1, array2, keysToCheck)
            {
                var diff = [];

                var i;
                for (i = 0; i < array1.length; i++) {
                    var matchingEntry = findEntryInArray(array2, array1[i].name);
                    var found = false;
                    if (!!matchingEntry) {
                        found = true;
                        var j;
                        for (j = 0; j < keysToCheck.length; j++) {
                            if (JSON.stringify(array1[i][keysToCheck[j]]) !== JSON.stringify(matchingEntry[keysToCheck[j]])) {
                                // matching, check if different
                                diff.push({entityType: entityType, type: 'TagManager_DiffModified', name: array1[i].name, lastChanged: array1[i].updated_date_pretty});
                                break;
                            }
                        }
                    }

                    if (!found) {
                        diff.push({entityType: entityType, type: 'TagManager_DiffAdded', name: array1[i].name, lastChanged: array1[i].updated_date_pretty});
                    }
                }
                for (i = 0; i < array2.length; i++) {
                    if (!findEntryInArray(array1, array2[i].name)) {
                        diff.push({entityType: entityType, type: 'TagManager_DiffDeleted', name: array2[i].name, lastChanged: array2[i].updated_date_pretty});
                    }
                }

                return diff;
            }

            function mixinTagTriggers(tags, triggers)
            {
                angular.forEach(tags, function (tag) {
                    tag.fire_triggers = [];
                    tag.block_triggers = [];
                    angular.forEach(tag.fire_trigger_ids, function (idtrigger) {
                        angular.forEach(triggers, function (trigger) {
                            if (trigger.idtrigger === idtrigger) {
                                tag.fire_triggers.push(trigger.name);
                            }
                        });
                    });
                    angular.forEach(tag.block_trigger_ids, function (idtrigger) {
                        angular.forEach(triggers, function (trigger) {
                            if (trigger.idtrigger === idtrigger) {
                                tag.block_triggers.push(trigger.name);
                            }
                        });
                    });
                });
            }

            var draftVersion = {
                module: 'API',
                method: 'TagManager.exportContainerVersion',
                format: 'json',
                idContainer: idContainer,
                filter_limit: -1,
            };
            if (idContainerVersionNew) {
                draftVersion.idContainerVersion = idContainerVersionNew;
            }
            var lastVersion = {
                module: 'API',
                method: 'TagManager.exportContainerVersion',
                format: 'json',
                idContainer: idContainer,
                idContainerVersion: idContainerVersionPrevious,
                filter_limit: -1,
            };

            var deferred = $q.defer();

            piwikApi.bulkFetch([draftVersion, lastVersion]).then(function (response) {
                mixinTagTriggers(response[0].tags, response[0].triggers);
                mixinTagTriggers(response[1].tags, response[1].triggers);

                var diff1 = getDifference('TagManager_Tag', response[0].tags, response[1].tags, ['name', 'type', 'fire_limit', 'priority', 'fire_delay', 'fire_triggers', 'block_triggers', 'parameters']);
                var diff2 = getDifference('TagManager_Trigger', response[0].triggers, response[1].triggers, ['name', 'type', 'conditions', 'parameters']);
                var diff3 = getDifference('TagManager_Variable', response[0].variables, response[1].variables, ['name', 'type', 'lookup_table', 'default_value', 'parameters']);
                var diff = [];
                diff = diff.concat(diff1, diff2, diff3);
                deferred.resolve(diff);
            });

            return deferred.promise;
        }
    }
})();