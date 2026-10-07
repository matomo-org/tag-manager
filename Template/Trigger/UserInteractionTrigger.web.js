/*
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

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
            
            var init = function () {
                triggerEvent({event: 'UserInteraction'});
                removeListeners();
            };
            
            var removeListeners = function () {
                for (var i = 0, iLen = eventNames.length; i < iLen; i++) {
                    windowAlias.removeEventListener(eventNames[i], init);
                }
            };
         
            for (var i = 0, iLen = eventNames.length; i < iLen; i++) {
                windowAlias.addEventListener(eventNames[i], init, {once : true});
            }

        };
    };
})();
