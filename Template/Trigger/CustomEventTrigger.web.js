(function () {
    return function (parameters, TagManager) {
        this.setUp = function (triggerEvent) {
            parameters.container.dataLayer.on(function (value) {
                var eventName = parameters.get('eventName');
                if (eventName && TagManager.utils.isObject(value) && 'event' in value && value.event === eventName) {
                    triggerEvent({event: 'mtm.CustomEvent', 'mtm.customEventMatch': eventName});
                }
            });
        };
    };
})();