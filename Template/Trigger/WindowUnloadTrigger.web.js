/*
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    return function (parameters, TagManager) {
        this.setUp = function (triggerEvent) {
            var triggered = false;
            TagManager.dom.addEventListener(parameters.window, 'beforeunload', function () {
                if (triggered) {
                    return;
                }
                triggered = true;
                triggerEvent({event: 'WindowUnload'});
            });
        };
    };
})();
