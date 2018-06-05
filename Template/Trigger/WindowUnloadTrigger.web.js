(function () {
    return function (parameters, TagManager) {
        this.setUp = function (triggerEvent) {
            TagManager.dom.addEventListener(parameters.window, 'beforeunload', function () {
                triggerEvent({event: 'WindowUnload'});
            });
        };
    };
})();