/*
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    var initialised = Object.create(null);

    var CUSTOM_EVENT_NAME_PATTERN = /^[a-z][a-z0-9_-]{0,49}$/i;
    // Standard and reserved TikTok event names, lowercased, which a custom event cannot use
    var TAKEN_EVENT_NAMES = [
        'pageview', 'viewcontent', 'search', 'addtowishlist', 'addtocart', 'initiatecheckout', 'addpaymentinfo',
        'purchase', 'completeregistration', 'contact', 'download', 'submitform', 'submitapplication', 'subscribe',
        'customizeproduct', 'findlocation', 'schedule', 'starttrial',
        'addbilling', 'browse', 'checkout', 'clickform', 'clickindownloadpage', 'clicktodownload', 'consult',
        'consultbyphone', 'completepayment', 'registration', 'startcheckout', 'viewconsultationpage',
        'viewdownloadpage', 'viewform'
    ];

    return function (parameters, TagManager) {
        this.fire = function () {
            var w = parameters.window;
            var pixelId = parameters.get('pixelId');
            var eventName = parameters.get('eventName');
            var eventParams = parameters.get('eventParameters');
            var eventId = parameters.get('eventId');

            if (!pixelId) {
                return;
            }

            var name = eventName;
            if (eventName === 'custom') {
                name = String(parameters.get('customEventName') || '').trim();
                if (!CUSTOM_EVENT_NAME_PATTERN.test(name) || TAKEN_EVENT_NAMES.indexOf(name.toLowerCase()) !== -1) {
                    return;
                }
            }

            if (!w.ttq) {
                !function (w, d, t) {
                    w.TiktokAnalyticsObject = t;
                    var ttq = w[t] = w[t] || [];
                    ttq.methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie', 'holdConsent', 'revokeConsent', 'grantConsent'];
                    ttq.setAndDefer = function (e, n) {
                        e[n] = function () { e.push([n].concat(Array.prototype.slice.call(arguments, 0))); };
                    };
                    for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
                    ttq.instance = function (e) {
                        for (var n = ttq._i[e] || [], i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(n, ttq.methods[i]);
                        return n;
                    };
                    ttq.load = function (e, n) {
                        var r = 'https://analytics.tiktok.com/i18n/pixel/events.js';
                        ttq._i = ttq._i || {}; ttq._i[e] = []; ttq._i[e]._u = r;
                        ttq._t = ttq._t || {}; ttq._t[e] = +new Date();
                        ttq._o = ttq._o || {}; ttq._o[e] = n || {};
                        var s = d.createElement('script'); s.type = 'text/javascript'; s.async = !0;
                        s.src = r + '?sdkid=' + encodeURIComponent(e) + '&lib=' + t;
                        var a = d.getElementsByTagName('script')[0];
                        a.parentNode.insertBefore(s, a);
                    };
                }(w, parameters.document, 'ttq');
            }

            if (!initialised[pixelId]) {
                initialised[pixelId] = true;
                w.ttq.load(pixelId);
            }

            if (!name) {
                return;
            }

            // An instance keeps the event on this tag's pixel when several pixels share the page
            var pixel = w.ttq.instance(pixelId);
            if (name === 'PageView') {
                pixel.page();
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

            if (eventId) {
                pixel.track(name, paramsObject, {event_id: eventId});
            } else {
                pixel.track(name, paramsObject);
            }
        };
    };
})();
