/*
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    var initialised = Object.create(null);

    return function (parameters, TagManager) {
        this.fire = function () {
            var w = parameters.window;
            var d = parameters.document;
            var pixelId = parameters.get('pixelId');
            var eventName = parameters.get('eventName');
            var eventParams = parameters.get('eventParameters');
            var userEmail = parameters.get('userEmail');

            if (!pixelId) {
                return;
            }

            if (!w.snaptr) {
                var snaptr = w.snaptr = function () {
                    snaptr.handleRequest ? snaptr.handleRequest.apply(snaptr, arguments) : snaptr.queue.push(arguments);
                };
                snaptr.queue = [];
                var script = d.createElement('script');
                script.async = true;
                script.src = 'https://sc-static.net/scevent.min.js';
                var firstScript = d.getElementsByTagName('script')[0];
                firstScript.parentNode.insertBefore(script, firstScript);
            }

            if (!initialised[pixelId]) {
                initialised[pixelId] = true;
                if (userEmail) {
                    w.snaptr('init', pixelId, {user_email: userEmail});
                } else {
                    w.snaptr('init', pixelId);
                }
            }

            if (!eventName) {
                return;
            }

            var paramsObject = {};
            if (Array.isArray(eventParams)) {
                eventParams.forEach(function (param) {
                    if (param.parameter) {
                        paramsObject[param.parameter] = param.value;
                    }
                });
            }

            w.snaptr('track', eventName, paramsObject);
        };
    };
})();
