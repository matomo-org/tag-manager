/*
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    return function (parameters, TagManager) {
        this.get = function () {
            var varName = parameters.get('variableName');
            if (varName) {
                var parts = varName.split('.');
                var i;
                var obj = parameters.window;
                for (i = 0; i < parts.length; i++) {
                    if (parts[i] in obj) {
                        obj = obj[parts[i]];
                    } else {
                        // value does not exist
                        return;
                    }
                }
                if (obj !== parameters.window) {
                    return '' + obj;
                }
            }
        };
    };
})();
