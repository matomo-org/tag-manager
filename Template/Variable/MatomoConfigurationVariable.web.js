/*
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    return function (parameters, TagManager) {

        this.get = function () {
            var config = {};
            for (var i in parameters) {
                if (i === 'document' || i === 'window' || i === 'container' || i === 'variable' || TagManager.utils.isFunction(parameters[i])) {
                    continue;
                }

                if (TagManager.utils.hasProperty(parameters, i)) {
                    config[i] = parameters.get(i);
                }
            }

            return config;
        };

        this.toString = function () {
            return '';
        };
    };
})();
