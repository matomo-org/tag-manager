/*
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    return function (parameters, TagManager) {
        this.fire = function () {
            var apiKey = parameters.get('honeybadgerApiKey');
            if (apiKey) {
                var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
                s1.src = '//js.honeybadger.io/v0.5/honeybadger.min.js';
                s1.setAttribute('data-apiKey', apiKey);
                var environment = parameters.get('honeybadgerEnvironment');
                if (!environment) {
                    environment = TagManager.Container.environment
                }
                s1.setAttribute('data-environment', environment);
                var revision = parameters.get('honeybadgerRevision');
                if (revision) {
                    s1.setAttribute('data-revision', revision)
                }
                s0.parentNode.insertBefore(s1, s0);
            }
        };
    };
})();
