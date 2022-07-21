(function () {
    return function (parameters, TagManager) {
        this.setUp = function (triggerEvent) {
            TagManager.dom.onReady(function () {
                TagManager.dom.onClick(function (event, clickButton) {
                    clickCallback(event, triggerEvent, clickButton);
                });
            });
        };

        function clickCallback(event, triggerEvent, clickButton) {
            if (!event.target) {
                return;
            }
            var target = event.target;
            // If the data-matomo-mask attribute is present, mask the text
            var clickText = TagManager.dom.getElementText(target);
            if(TagManager.dom.getElementAttribute(target, 'data-matomo-mask') !== null) {
                clickText = '';
            }
            triggerEvent({
                event: 'mtm.AllElementsClick',
                'mtm.clickElement': target,
                'mtm.clickElementId': TagManager.dom.getElementAttribute(target, 'id'),
                'mtm.clickElementClasses': TagManager.dom.getElementClassNames(target),
                'mtm.clickText': clickText,
                'mtm.clickNodeName': target.nodeName,
                'mtm.clickElementUrl': target.href || TagManager.dom.getElementAttribute(target, 'href'),
                'mtm.clickButton': clickButton
            });
        }
    };
})();
