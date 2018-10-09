(function () {
    return function (parameters, TagManager) {
        this.setUp = function (triggerEvent) {
            TagManager.dom.addEventListener(parameters.document, "copy", function (event) {
                if (!event.target) {
                    return;
                }
                var target = event.target;
                var dom = TagManager.dom;
                triggerEvent({
                    event: 'mtm.Copy',
                    'mtm.copyElement': target,
                    'mtm.copyElementId': dom.getElementAttribute(target, 'id'),
                    'mtm.copyElementName': dom.getElementAttribute(target, 'name'),
                    'mtm.copyElementClasses': dom.getElementClassNames(target)
                });
            });
        };
    };
})();
