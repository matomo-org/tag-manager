/*
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    var initialised = Object.create(null);

    var EVENT_TYPES = {
        page_viewed: 'contents',
        contents_viewed: 'contents',
        items_added: 'contents',
        checkout_started: 'contents',
        order_created: 'contents',
        lead_created: 'customer_action',
        registration_completed: 'customer_action',
        appointment_scheduled: 'customer_action',
        subscription_created: 'plan_enrollment',
        trial_started: 'plan_enrollment',
        custom: 'custom'
    };

    var CUSTOM_EVENT_NAME_PATTERN = /^[a-z0-9](?:[a-z0-9_-]{0,62}[a-z0-9])?$/;

    // Only one decimal separator is accepted, and not before exactly three digits, as "1,299.00",
    // "1.299,00" and "1,299" could each be a thousands separator
    var AMOUNT_PATTERN = /^-?\d+(?:[.,](?!\d{3}$)\d+)?$/;
    // Currencies with three decimal places, such as KWD, write amounts like "12.500"
    var THREE_DECIMALS_AMOUNT_PATTERN = /^-?\d+(?:[.,]\d+)?$/;

    // The pixel only accepts integer amounts in the currency's smallest unit
    function toMinorUnits(value, currency, w) {
        var digits = 2;
        if (currency && w.Intl && w.Intl.NumberFormat) {
            try {
                digits = new w.Intl.NumberFormat('en', {style: 'currency', currency: currency}).resolvedOptions().maximumFractionDigits;
            } catch (e) {
                // Intl rejects a malformed currency code, which the pixel would not accept either
                return undefined;
            }
        }
        var number;
        if (typeof value === 'number') {
            number = value;
        } else if ((digits === 3 ? THREE_DECIMALS_AMOUNT_PATTERN : AMOUNT_PATTERN).test(String(value).trim())) {
            number = parseFloat(String(value).trim().replace(',', '.'));
        }
        if (typeof number !== 'number' || !isFinite(number)) {
            return undefined;
        }
        return Math.round(number * Math.pow(10, digits));
    }

    return function (parameters, TagManager) {
        this.fire = function () {
            var w = parameters.window;
            var d = parameters.document;
            var pixelId = parameters.get('pixelId');
            var eventName = parameters.get('eventName');

            if (!pixelId || !EVENT_TYPES.hasOwnProperty(eventName)) {
                return;
            }

            var options = {};
            if (eventName === 'custom') {
                var customEventName = String(parameters.get('customEventName') || '').trim().toLowerCase();
                if (!CUSTOM_EVENT_NAME_PATTERN.test(customEventName) || EVENT_TYPES.hasOwnProperty(customEventName)) {
                    return;
                }
                options.custom_event_name = customEventName;
            }

            var eventId = parameters.get('eventId');
            if (eventId) {
                options.event_id = String(eventId);
            }

            if (!w.oaiq) {
                var oaiq = w.oaiq = function () {
                    oaiq.q.push(arguments);
                };
                oaiq.q = [];
                var script = d.createElement('script');
                script.async = true;
                script.src = 'https://bzrcdn.openai.com/sdk/oaiq.min.js';
                var firstScript = d.getElementsByTagName('script')[0];
                firstScript.parentNode.insertBefore(script, firstScript);
            }

            if (!initialised[pixelId]) {
                initialised[pixelId] = true;
                w.oaiq('init', {pixelId: pixelId});
            }

            var data = {type: EVENT_TYPES[eventName]};
            var amount = parameters.get('amount');
            if (amount !== '' && amount !== null && amount !== undefined) {
                var currency = String(parameters.get('currency') || '').trim().toUpperCase();
                var minorUnits = currency ? toMinorUnits(amount, currency, w) : undefined;
                if (minorUnits !== undefined) {
                    data.amount = minorUnits;
                    data.currency = currency;
                }
            }

            // measureSingle keeps the event on this tag's pixel when several pixels share the page
            if (Object.keys(options).length) {
                w.oaiq('measureSingle', pixelId, eventName, data, options);
            } else {
                w.oaiq('measureSingle', pixelId, eventName, data);
            }
        };
    };
})();
