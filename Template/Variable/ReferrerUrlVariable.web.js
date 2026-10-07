/*
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    return function (parameters, TagManager) {
        this.get = function () {
            var urlPart = parameters.get('urlPart', 'href');
            var urlReferrer = parameters.get('document.referrer');
            if (!urlReferrer || !urlPart) {
                return;
            }
            return TagManager.url.parseUrl(urlReferrer, urlPart);
        };
    };
})();
