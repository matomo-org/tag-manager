/*
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    var initialised = Object.create(null);
    var CUSTOM_EVENT_NAME_MAX_LENGTH = 64;
    var SURROGATE_PAIR_PATTERN = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;

    return function (parameters, TagManager) {
        this.fire = function () {
            var w = parameters.window;
            var d = parameters.document;
            var pixelId = parameters.get('pixelId');
            var eventName = parameters.get('eventName');
            var customEventName = String(parameters.get('customEventName') || '').trim();
            var eventParams = parameters.get('eventParameters');

            if (!pixelId) {
                return;
            }

            var isCustom = eventName === 'custom';
            // Reddit counts characters, and JS counts one outside the Basic Multilingual Plane as two
            if (isCustom && (!customEventName || customEventName.replace(SURROGATE_PAIR_PATTERN, '_').length > CUSTOM_EVENT_NAME_MAX_LENGTH)) {
                return;
            }

            if (!w.rdt) {
                var rdt = w.rdt = function () {
                    rdt.sendEvent ? rdt.sendEvent.apply(rdt, arguments) : rdt.callQueue.push(arguments);
                };
                rdt.callQueue = [];
                var script = d.createElement('script');
                script.async = true;
                script.src = 'https://www.redditstatic.com/ads/pixel.js';
                var firstScript = d.getElementsByTagName('script')[0];
                firstScript.parentNode.insertBefore(script, firstScript);
            }

            if (!initialised[pixelId]) {
                initialised[pixelId] = true;
                w.rdt('init', pixelId);
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

            if (isCustom) {
                paramsObject.customEventName = customEventName;
                w.rdt('track', 'Custom', paramsObject);
            } else {
                w.rdt('track', eventName, paramsObject);
            }
        };
    };
})();
