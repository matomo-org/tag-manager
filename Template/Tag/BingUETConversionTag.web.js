/*
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    // Only one decimal separator is accepted, and not before exactly three digits, as "1,299.00",
    // "1.299,00" and "1,299" could each be a thousands separator
    var NUMBER_PATTERN = /^-?\d+(?:[.,](?!\d{3}$)\d+)?$/;
    // Currencies with three decimal places, such as KWD, write amounts like "12.500"
    var THREE_DECIMALS_NUMBER_PATTERN = /^-?\d+(?:[.,]\d+)?$/;
    var CURRENCY_PATTERN = /^[A-Z]{3}$/;
    // Set only from the tag's own validated settings, never from an event parameter
    var OWN_FIELDS = ['event_category', 'event_label', 'event_value', 'revenue_value', 'currency'];

    function hasThreeDecimals(currency, w) {
        if (!currency || !w.Intl || !w.Intl.NumberFormat) {
            return false;
        }
        try {
            return new w.Intl.NumberFormat('en', {style: 'currency', currency: currency}).resolvedOptions().maximumFractionDigits === 3;
        } catch (e) {
            return false;
        }
    }

    function toNumber(value, threeDecimals) {
        if (typeof value === 'number') {
            return isFinite(value) ? value : undefined;
        }
        var pattern = threeDecimals ? THREE_DECIMALS_NUMBER_PATTERN : NUMBER_PATTERN;
        if (value === null || value === undefined || !pattern.test(String(value).trim())) {
            return undefined;
        }
        return parseFloat(String(value).trim().replace(',', '.'));
    }

    return function (parameters, TagManager) {
        this.fire = function () {
            var w = parameters.window;
            var eventCategory = parameters.get('eventCategory');
            var eventLabel = parameters.get('eventLabel');
            var eventValue = parameters.get('eventValue');
            var revenueValue = parameters.get('revenueValue');
            var currency = String(parameters.get('currency') || '').trim().toUpperCase();
            if (!CURRENCY_PATTERN.test(currency)) {
                currency = '';
            }
            var eventParams = parameters.get('eventParameters');

            // Queued until the Bing Ads UET Tag loads bat.js and replaces uetq
            w.uetq = w.uetq || [];

            var data = {};
            if (Array.isArray(eventParams)) {
                eventParams.forEach(function (param) {
                    if (param.parameter && OWN_FIELDS.indexOf(param.parameter) === -1) {
                        data[param.parameter] = param.value;
                    }
                });
            }

            if (eventCategory) {
                data.event_category = eventCategory;
            }
            if (eventLabel) {
                data.event_label = eventLabel;
            }
            eventValue = toNumber(eventValue);
            if (eventValue !== undefined) {
                data.event_value = eventValue;
            }
            revenueValue = toNumber(revenueValue, hasThreeDecimals(currency, w));
            if (revenueValue !== undefined) {
                data.revenue_value = revenueValue;
                if (currency) {
                    data.currency = currency;
                }
            }

            w.uetq.push('event', parameters.get('eventAction') || '', data);
        };
    };
})();
