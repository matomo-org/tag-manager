(function () {
    return function (parameters, TagManager) {
        this.setUp = function (triggerEvent) {
            TagManager.dom.addEventListener(parameters.document.body, 'click', function (event) {
                if (!event.target) {
                    return;
                }
                var target = event.target;
                var nodeName = target.nodeName;
                if (nodeName === 'A' || nodeName === 'AREA') {
                    triggerEvent({
                        event: 'mtm.AllLinksClick',
                        'mtm.clickElementId': TagManager.dom.getElementAttribute(target, 'id'),
                        'mtm.clickElementClasses': TagManager.dom.getElementClassNames(target),
                        'mtm.clickText': TagManager.dom.getElementText(target),
                        'mtm.clickNodeName': nodeName,
                        'mtm.clickElementUrl': TagManager.dom.getElementAttribute(target, 'href')
                    });
                }
            });
        };
    };
})();