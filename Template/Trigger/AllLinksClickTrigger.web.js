(function () {
    return function (parameters, TagManager) {
        this.setUp = function (triggerEvent) {

            TagManager.dom.onReady(function () {

                function isClickNode(nodeName)
                {
                    return nodeName === 'A' || nodeName === 'AREA';
                }

                TagManager.dom.onClick(function (event) {
                    clickCallback(event, triggerEvent);
                });

                function clickCallback(event, triggerEvent) {
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
                        var clickButtonMap = {1: 'left', 2: 'middle', 3: 'right'};
                        triggerEvent({
                            event: 'mtm.AllLinksClick',
                            'mtm.clickElement': target,
                            'mtm.clickElementId': TagManager.dom.getElementAttribute(target, 'id'),
                            'mtm.clickElementClasses': TagManager.dom.getElementClassNames(target),
                            'mtm.clickText': TagManager.dom.getElementText(target),
                            'mtm.clickNodeName': nodeName,
                            'mtm.clickElementUrl': TagManager.dom.getElementAttribute(target, 'href'),
                            'mtm.clickButton': clickButtonMap[event.which] ? clickButtonMap[event.which] : 'left'
                        });
                    }
                }

            });
        };
    };
})();