(function () {
    return function (parameters, TagManager) {
        this.setUp = function (triggerEvent) {
            var extensions = parameters.get('downloadExtensions');
            if (!extensions) {
                return;
            }

            TagManager.dom.addEventListener(parameters.document.body, 'click', function (event) {
                if (!event.target) {
                    return;
                }

                extensions = String(extensions).split(',');
                var i;
                for (i = 0; i < extensions.length; i++) {
                    extensions[i] = TagManager.utils.trim(extensions[i]);
                }

                var target = event.target;
                var nodeName = target.nodeName;
                if (nodeName === 'A' || nodeName === 'AREA') {
                    var link = TagManager.dom.getElementAttribute(target, 'href');

                    var downloadExtensionsPattern = new RegExp('\\.(' + extensions.join('|') + ')([?&#]|$)', 'i');
                    if (downloadExtensionsPattern.test(link)) {
                        triggerEvent({
                            event: 'mtm.DownloadClick',
                            'mtm.clickElementId': TagManager.dom.getElementAttribute(target, 'id'),
                            'mtm.clickElementClasses': TagManager.dom.getElementClassNames(target),
                            'mtm.clickText': TagManager.dom.getElementText(target),
                            'mtm.clickNodeName': nodeName,
                            'mtm.clickElementUrl': link
                        });
                    }

                }
            });
        };
    };
})();