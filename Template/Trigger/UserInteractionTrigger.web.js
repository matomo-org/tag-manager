(function () {
    return function (parameters, TagManager) {
        this.setUp = function (triggerEvent) {

            var eventNames = [
                "touchstart",
                "mouseover",
                "wheel",
                "scroll",
                "keydown"
            ];

            var windowAlias = parameters.window;
            
            var init = () => {
                triggerEvent({event: 'UserInteraction'});
                removeListeners();
            }
            
            var removeListeners = () => {
                for (var i = 0, iLen = eventNames.length; i < iLen; i++) {
                    windowAlias.removeEventListener(eventNames[i], init);
                }
            }
         
            for (var i = 0, iLen = eventNames.length; i < iLen; i++) {
                windowAlias.addEventListener(eventNames[i], init, {once : true});
            }

        };
    };
})();