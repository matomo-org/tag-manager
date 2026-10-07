/*
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    return function (parameters, TagManager) {
        this.fire = function () {
            var LivezillaDynamicID = parameters.get('LivezillaDynamicID');
            var LivezillaDynamicDomain = parameters.get('LivezillaDynamicDomain');
            var LivezillaDynamicDefer = parameters.get('LivezillaDynamicDefer');
            var s1 = document.createElement("script"),
                s0 = document.getElementsByTagName("script")[0];
            s1.type = 'text/javascript';
            s1.defer = LivezillaDynamicDefer;
            s1.id = LivezillaDynamicID;
            s1.src = '' + LivezillaDynamicDomain + '/script.php?id=' + LivezillaDynamicID + '';
            s0.parentNode.insertBefore(s1, s0);
        };
    };
})();
