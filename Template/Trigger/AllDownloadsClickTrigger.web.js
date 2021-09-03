(function () {
    return function (parameters, TagManager) {
        this.setUp = function (triggerEvent) {
            TagManager.dom.onReady(function () {
                var extensions = parameters.get('downloadExtensions');
                if (!extensions) {
                    return;
                }

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

                    extensions = String(extensions).split(',');
                    var i;
                    for (i = 0; i < extensions.length; i++) {
                        extensions[i] = TagManager.utils.trim(extensions[i]);
                    }

                    if (target && isClickNode(nodeName)) {
                        var link = TagManager.dom.getElementAttribute(target, 'href');

                        var downloadExtensionsPattern = new RegExp('\\.(' + extensions.join('|') + ')([?&#]|$)', 'i');
                        if (downloadExtensionsPattern.test(link)) {
                            var clickButtonMap = {1: 'left', 2: 'middle', 3: 'right'};
                            triggerEvent({
                                event: 'mtm.DownloadClick',
                                'mtm.clickElement': target,
                                'mtm.clickElementId': TagManager.dom.getElementAttribute(target, 'id'),
                                'mtm.clickElementClasses': TagManager.dom.getElementClassNames(target),
                                'mtm.clickText': TagManager.dom.getElementText(target),
                                'mtm.clickNodeName': nodeName,
                                'mtm.clickElementUrl': link,
                                'mtm.clickButton': clickButtonMap[event.which] ? clickButtonMap[event.which] : 'left'
                            });
                        }

                    }
                }
            });
        };
    };
})();