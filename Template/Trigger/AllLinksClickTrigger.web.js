(function () {
    return function (parameters, TagManager) {
        this.setUp = function (triggerEvent) {

            function isClickNode(nodeName)
            {
                return nodeName === 'A' || nodeName === 'AREA';
            }

            TagManager.dom.addEventListener(parameters.document.body, 'click', function (event) {
                if (!event.target) {
                    return;
                }

                var target = event.target;
                var nodeName = target.nodeName;

                while (!isClickNode(nodeName) && target && target.parentNode) {
                    target = target.parentNode;
                    nodeName = target.nodeName;
                }

                if (target && isClickNode(nodeName)) {
                    triggerEvent({
                        event: 'mtm.AllLinksClick',
                        'mtm.clickElement': target,
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