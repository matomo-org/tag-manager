(function () {
    return function (parameters, TagManager) {

        var fireTriggerWhen = parameters.get('fireTriggerWhen', 'oncePage');
        var minPercentVisible = parameters.get('minPercentVisible', 10);
        var self = this;
        var triggeredNodes = [];
        var documentAlias = parameters.document;
        var windowAlias = parameters.window;
        var utils = TagManager.utils;
        var blockTrigger = false;
        var onlyOncePerElement = fireTriggerWhen === 'onceElement';
        var selectors = getSelectors();

        function setIntersectionObserver(triggerEvent) {
            if ('IntersectionObserver' in window) {
                var interSectionObserverOptions = {
                    root: null,
                    rootMargin: '0px',
                    threshold: (minPercentVisible / 100)
                };
                var observerIntersection = new IntersectionObserver(function (entries) {
                    interSectionCallback(entries, triggerEvent, observerIntersection);
                }, interSectionObserverOptions);

                if (selectors) {
                    TagManager.dom.bySelector(selectors).forEach(function (element) {
                        observerIntersection.observe(element);
                    });
                }
            }
            
        }

        function interSectionCallback(entries, triggerEvent, observer) {
            var dom = TagManager.dom;
            entries.forEach(function (entry) {
                if (entry.intersectionRatio > 0) {
                    triggerEvent({
                        event: 'mtm.ElementVisibility',
                        'mtm.elementVisibilityPercentage': minPercentVisible,
                        'mtm.elementVisibilityId': dom.getElementAttribute(entry.target, 'id'),
                        'mtm.elementVisibilityClasses': dom.getElementClassNames(entry.target),
                        'mtm.elementVisibilityText': TagManager.utils.trim(entry.target.innerText),
                        'mtm.elementVisibilityNodeName': entry.target.nodeName,
                        'mtm.elementVisibilityUrl': entry.target.href || dom.getElementAttribute(entry.target, 'href'),
                    });

                    if (fireTriggerWhen === 'oncePage') {
                        TagManager.dom.bySelector(selectors).forEach(function (element) {
                            observer.unobserve(element);
                            triggeredNodes.push(element);
                        });
                    } else if(onlyOncePerElement) {
                        observer.unobserve(entry.target);
                        triggeredNodes.push(entry.target); // to avoid possible memory leaks as much as possible we add onceElement only when needed
                    }
                }
            });
        }

        function getSelectors() {
            var selectionMethod = parameters.get('selectionMethod');
            if (selectionMethod === 'elementId') {
                return '#' + parameters.get('elementId');
            } else if (selectionMethod === 'cssSelector') {
                return parameters.get('cssSelector');
            }

            return;
        }

        this.setUp = function (triggerEvent) {
            setIntersectionObserver(triggerEvent);
        };
    };
})();