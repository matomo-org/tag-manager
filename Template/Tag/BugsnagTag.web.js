/*
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    return function (parameters, TagManager) {
        this.fire = function () {
            TagManager.dom.loadScriptUrl('https://d2wy8f7a9ursnm.cloudfront.net/v4/bugsnag.min.js', {
                onload: function () {
                    var config = {
                        apiKey: parameters.get('apiKey'),
                        collectUserIp: parameters.get('collectUserIp')
                    };
                    window.bugsnagClient = bugsnag(config)
                }
            });
        };
    };
})();
