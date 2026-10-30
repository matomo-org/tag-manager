/*
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    var sentPaths = {};
    var countedPaths = {};

    // The path the page was loaded on, which a single-page app may since have changed
    function getLoadedPath(w) {
        var entries = w.performance && w.performance.getEntriesByType && w.performance.getEntriesByType('navigation');
        var match = entries && entries[0] && /^[a-z][a-z\d+.-]*:\/\/[^\/?#]*([^#]*)/i.exec(String(entries[0].name || ''));
        if (!match) {
            return null;
        }
        return match[1].charAt(0) === '/' ? match[1] : '/' + match[1];
    }

    return function (parameters, TagManager) {
        this.fire = function () {
            var w = parameters.window;
            var d = parameters.document;
            var portalId = String(parameters.get('portalId') || '').trim();
            var region = parameters.get('region');
            var email = parameters.get('email');
            var eventName = parameters.get('eventName');

            // The portal ID becomes part of a script URL, so anything but digits is rejected
            if (!/^\d+$/.test(portalId)) {
                return;
            }

            // HubSpot runs only the first tracking code on a page, and everything queued goes to its account
            // Integrations that embed the tracking code themselves do not always use HubSpot's element id
            var loader = d.getElementById('hs-script-loader') || d.querySelector('script[src*="hs-scripts.com/"]');
            var loadedPortal = loader && /\/(\d+)\.js(?:[?#]|$)/.exec(String(loader.src || ''));
            if (loadedPortal && loadedPortal[1] !== portalId) {
                return;
            }

            w._hsq = w._hsq || [];

            var path = w.location.pathname + w.location.search;
            var isFirstFire = !sentPaths.hasOwnProperty(portalId);
            if (isFirstFire) {
                // The tracking code reads the path and records a page view for it when it loads, so tracking code
                // already on the page recorded the path the page was loaded on
                var loadedPath = (loader && getLoadedPath(w)) || path;
                sentPaths[portalId] = loadedPath;
                countedPaths[portalId] = loadedPath;
            }
            if (sentPaths[portalId] !== path) {
                // Sent before any event so that the event is attributed to the current page
                sentPaths[portalId] = path;
                countedPaths[portalId] = null;
                w._hsq.push(['setPath', path]);
            }

            if (email) {
                w._hsq.push(['identify', {email: email}]);
            }

            if (eventName) {
                w._hsq.push(['trackCustomBehavioralEvent', {name: eventName}]);
            }

            if (isFirstFire && !loader) {
                var host = region === 'eu1' ? 'js-eu1.hs-scripts.com' : 'js.hs-scripts.com';
                var script = d.createElement('script');
                script.type = 'text/javascript';
                script.async = true;
                script.defer = true;
                script.id = 'hs-script-loader';
                script.src = 'https://' + host + '/' + portalId + '.js';
                var firstScript = d.getElementsByTagName('script')[0];
                firstScript.parentNode.insertBefore(script, firstScript);
            } else if (!eventName && countedPaths[portalId] !== path) {
                countedPaths[portalId] = path;
                w._hsq.push(['trackPageView']);
            }
        };
    };
})();
