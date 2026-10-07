/*
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    return function (parameters, TagManager) {
        var numTriggers = 0;
        var events = ['webkitfullscreenchange', 'mozfullscreenchange', 'fullscreenchange', 'MSFullscreenChange'];

        this.setUp = function (triggerEvent) {
            function onFullScreen() {
                var limit = parameters.get('triggerLimit', 1);

                if (limit) {
                    limit = parseInt(limit, 10);
                }

                if (limit && limit <= numTriggers) {
                    return;
                }

                var docAlias = parameters.document;

                var triggerAction = parameters.get('triggerAction', 'enter');
                var isFullscreen = docAlias.fullScreen || docAlias.webkitIsFullScreen || docAlias.mozFullScreen || docAlias.msFullscreenElement;
                if (isFullscreen && (triggerAction === 'any' || triggerAction === 'enter')) {
                    triggerEvent({event: 'mtm.Fullscreen', 'mtm.fullscreenAction': 'enter'});
                    numTriggers++;
                } else if (!isFullscreen && (triggerAction === 'any' || triggerAction === 'exit')) {
                    numTriggers++;
                    triggerEvent({event: 'mtm.Fullscreen', 'mtm.fullscreenAction': 'exit'});
                }
            }

            for (var i = 0; i < events.length; i++) {
                TagManager.dom.addEventListener(parameters.document, events[i], onFullScreen);
            }
        };
    };
})();
