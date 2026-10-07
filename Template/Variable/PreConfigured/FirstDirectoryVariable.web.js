/*
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    return function (parameters, TagManager) {

        this.get = function () {
            var pathname = parameters.window.location.pathname;
            if (!pathname || pathname === '/') {
                return null;
            }

            pathname = String(pathname).substr(1);
            var posFirstPath = String(pathname).indexOf('/');
            if (posFirstPath === -1) {
                return pathname; // no trailing slash
            }
            return pathname.substr(0, posFirstPath);
        };
    };
})();
