/*
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    var initialised = Object.create(null);

    var CUSTOM_EVENT_NAME_PATTERN = /^[a-z0-9_-]{1,100}$/i;
    var TAKEN_EVENT_NAMES = ['pagevisit', 'viewcategory', 'search', 'addtocart', 'checkout', 'signup', 'lead', 'watchvideo', 'custom'];

    return function (parameters, TagManager) {
        this.fire = function () {
            var w = parameters.window;
            var d = parameters.document;
            var tagId = parameters.get('tagId');
            var eventName = parameters.get('eventName');
            var eventParams = parameters.get('eventParameters');
            var eventId = parameters.get('eventId');

            if (!tagId) {
                return;
            }

            var name = eventName;
            if (eventName === 'custom') {
                name = String(parameters.get('customEventName') || '').trim();
                if (!CUSTOM_EVENT_NAME_PATTERN.test(name) || TAKEN_EVENT_NAMES.indexOf(name.toLowerCase()) !== -1) {
                    return;
                }
            }

            if (!w.pintrk) {
                w.pintrk = function () {
                    w.pintrk.queue.push(Array.prototype.slice.call(arguments));
                };
                w.pintrk.queue = [];
                w.pintrk.version = '3.0';
                var script = d.createElement('script');
                script.async = true;
                script.src = 'https://s.pinimg.com/ct/core.js';
                var firstScript = d.getElementsByTagName('script')[0];
                firstScript.parentNode.insertBefore(script, firstScript);
            }

            if (!initialised[tagId]) {
                initialised[tagId] = true;
                w.pintrk('load', tagId);
                w.pintrk('page');
            }

            if (!name) {
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

            // pintrk's fourth argument is a callback, so the event ID goes in the data object
            if (eventId) {
                paramsObject.event_id = eventId;
            }

            w.pintrk('track', name, paramsObject);
        };
    };
})();
