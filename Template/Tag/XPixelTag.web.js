/*
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    var configured = Object.create(null);

    return function (parameters, TagManager) {
        this.fire = function () {
            var w = parameters.window;
            var d = parameters.document;
            var pixelId = parameters.get('pixelId');
            var eventId = parameters.get('eventId');
            var eventParams = parameters.get('eventParameters');

            if (!pixelId) {
                return;
            }

            if (!w.twq) {
                var twq = w.twq = function () {
                    twq.exe ? twq.exe.apply(twq, arguments) : twq.queue.push(arguments);
                };
                twq.version = '1.1';
                twq.queue = [];
                var script = d.createElement('script');
                script.async = true;
                script.src = 'https://static.ads-twitter.com/uwt.js';
                var firstScript = d.getElementsByTagName('script')[0];
                firstScript.parentNode.insertBefore(script, firstScript);
            }

            if (!configured[pixelId]) {
                configured[pixelId] = true;
                w.twq('config', pixelId);
            }

            if (!eventId) {
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

            w.twq('event', eventId, paramsObject);
        };
    };
})();
