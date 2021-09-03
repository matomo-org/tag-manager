(function () {
    return function (parameters, TagManager) {
        this.setUp = function (triggerEvent) {
            TagManager.dom.onReady(function () {
                TagManager.dom.onClick(function (event) {
                    clickCallback(event, triggerEvent);
                });
            });
        };

        function clickCallback(event, triggerEvent) {
            if (!event.target) {
                return;
            }
            var target = event.target;
            var clickButtonMap = {1: 'left', 2: 'middle', 3: 'right'};
            triggerEvent({
                event: 'mtm.AllElementsClick',
                'mtm.clickElement': target,
                'mtm.clickElementId': TagManager.dom.getElementAttribute(target, 'id'),
                'mtm.clickElementClasses': TagManager.dom.getElementClassNames(target),
                'mtm.clickText': TagManager.dom.getElementText(target),
                'mtm.clickNodeName': target.nodeName,
                'mtm.clickElementUrl': target.href || TagManager.dom.getElementAttribute(target, 'href'),
                'mtm.clickButton': clickButtonMap[event.which] ? clickButtonMap[event.which] : 'left'
            });
        }
    };
})();