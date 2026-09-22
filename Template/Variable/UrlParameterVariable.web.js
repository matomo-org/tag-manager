/*
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    return function (parameters, TagManager) {
        this.get = function () {
            var name = parameters.get('parameterName');
            return TagManager.url.getQueryParameter(name, parameters.window.location.search);
        };
    };
})();
