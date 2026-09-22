/*
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
    return function (parameters, TagManager) {
        this.get = function () {
            var selectionMethod = parameters.get('selectionMethod');

            if (!selectionMethod) {
                return;
            }
            var attributeName = parameters.get('attributeName');
            var dom = TagManager.dom;

            var ele;
            if (selectionMethod === 'elementId') {
                ele = dom.byId(parameters.get('elementId'));
            } else if (selectionMethod === 'cssSelector') {
                ele = dom.bySelector(parameters.get('cssSelector'));
                if (ele && ele[0]) {
                    ele = ele[0];
                } else {
                    ele = null;
                }
            }

            if (ele) {
                if (attributeName) {
                    if (String(attributeName).toLowerCase() === 'value'
                        && ele.nodeName === 'INPUT') {
                        var type = dom.getElementAttribute(ele, 'type');
                        if (type && type.toLowerCase() === 'password') {
                            // we do not let users read a value of a password form field
                            return;
                        }
                    }
                    return dom.getElementAttribute(ele, attributeName);
                }
                return TagManager.dom.getElementText(ele);
            }

        };
    };
})();
