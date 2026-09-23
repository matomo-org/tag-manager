/*
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    return function (parameters, TagManager) {
        this.get = function () {
            var dataLayerName = parameters.get('dataLayerName');
            if (dataLayerName && parameters.container) {
                return parameters.container.dataLayer.get(dataLayerName);
            }
        };
    };
})();
