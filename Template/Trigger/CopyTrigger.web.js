(function () {
    return function (parameters, TagManager) {
        this.setUp = function (triggerEvent) {
            TagManager.dom.addEventListener(parameters.document, "copy", function (event) {
                if (!event.target) {
                    return;
                }
                var target = event.target;
                var dom = TagManager.dom;
                var selectedText;
                if (window.getSelection) {
                    selectedText = window.getSelection().toString();
                } else if (document.selection && document.selection.type !== 'Control') {
                    selectedText = document.selection.createRange().text;
                } else {
                    TagManager.debug.error("can't detect selected text");
                    return false;
                }
                console.info(selectedText);
                triggerEvent({
                    event: 'mtm.Copy',
                    'mtm.copyElement': target,
                    'mtm.copyElementId': dom.getElementAttribute(target, 'id'),
                    'mtm.copyElementName': dom.getElementAttribute(target, 'name'),
                    'mtm.copyElementClasses': dom.getElementClassNames(target),
                    'mtm.copyTextLength': selectedText.length
                });
            });
        };
    };
})();
