/*
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    return function (parameters, TagManager) {
        function getMetaContent(name) {
            if (!name) {
                return;
            }
            var dom = TagManager.dom;

            var elements = dom.byTagName('meta');
            var index,element;
            for (index = 0; index < elements.length; index++) {
                element = elements[index];
                if (element.name === name || dom.getElementAttribute(element, 'property') === name || dom.getElementAttribute(element, 'http-equiv') === name) {
                    return element.content;
                }
            }
        }

        this.get = function () {
            return getMetaContent(parameters.get('metaName'));
        };
    };
})();
