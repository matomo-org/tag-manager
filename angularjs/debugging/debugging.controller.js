/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * Controller for javascript tracking code generator
 */
(function () {

    angular.module('piwikApp').controller('MtmDebugController', MtmDebugController);

    MtmDebugController.$inject = ['$scope', '$window'];

    function MtmDebugController($scope, $window) {
        var self = this;
        this.mtmEvents = [];
        this.mtmLogs = [];
        this.selectedEventIndex = 0;
        this.contentTab = 'tags';
        this.selectedEvent = null;

        this.selectEvent = function (eventIndex) {
            if (this.mtmEvents[eventIndex]) {
                this.selectedEventIndex = eventIndex;
                this.selectedEvent = this.mtmEvents[eventIndex];

                var tagsFired = [];
                angular.forEach(this.mtmEvents, function (event, index) {
                    if (index <= eventIndex) {
                        angular.forEach(event.tags, function (tag) {
                            tagsFired.push(tag.name);
                        });
                    }
                });

                var tagsNotFired = [];
                angular.forEach(this.selectedEvent.container.tags, function (tag) {
                    if (tagsFired.indexOf && tagsFired.indexOf(tag.name) === -1) {
                        tagsNotFired.push(tag);
                    }
                });
                this.selectedEvent.notFiredTags = tagsNotFired;
            }
        };

        if ($window.mtmEvents && $window.mtmEvents.events) {
            this.mtmEvents = $window.mtmEvents.events;
            this.selectEvent(this.selectedEventIndex);
        }
        if ($window.mtmLogs && $window.mtmLogs.logs) {
            this.mtmLogs = $window.mtmLogs.logs;
        }

        $(function () {
            self.mtmEvents = $window.mtmEvents.events || [];
            self.mtmLogs = $window.mtmLogs.logs || [];
            self.selectEvent(self.selectedEventIndex);
        });

        $scope.$watch(function () {
            return $window.mtmEvents;
        }, function(n,o){
            if (n !== o) {
                self.mtmEvents = $window.mtmEvents;
                if (!self.selectedEvent) {
                    self.selectEvent(self.selectedEventIndex);
                }
            }
        });
        $scope.$watch(function () {
            return $window.mtmLogs;
        }, function(n,o){
            if (n !== o) {
                self.mtmLogs = $window.mtmLogs;
            }
        });

    }
})();