(function () {
    return function (parameters, TagManager) {
        this.setUp = function (triggerEvent) {
            TagManager.dom.onReady(function () {
                TagManager.dom.addEventListener(parameters.document.body, "click", function (event) {
                    if (!event.target) {
                        return;
                    }
                    var target = event.target;
                    triggerEvent({
                        event: 'mtm.AllElementsClick',
                        'mtm.clickElement': target,
                        'mtm.clickElementId': TagManager.dom.getElementAttribute(target, 'id'),
                        'mtm.clickElementClasses': TagManager.dom.getElementClassNames(target),
                        'mtm.clickText': TagManager.dom.getElementText(target),
                        'mtm.clickNodeName': target.nodeName,
                        'mtm.clickElementUrl': target.href || TagManager.dom.getElementAttribute(target, 'href')
                    });
                }, true);
            });
        };
    };
})();