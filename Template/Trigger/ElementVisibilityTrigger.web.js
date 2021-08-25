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
        var observerIntersection;

        function getPercentVisible(node)
        {
            if (!node || !node.getBoundingClientRect) {
                return 0;
            }
            var nodeRect = node.getBoundingClientRect();
            var winRect = {height: parameters.window.innerHeight, width: parameters.window.innerWidth};

            var visHeight = 0;
            var visWidth = 0;

            if (nodeRect.left >= 0) {
                visWidth = Math.min(nodeRect.width, winRect.width - nodeRect.left);
            } else if (nodeRect.right > 0) {
                visWidth = Math.min(winRect.width, nodeRect.right);
            } else {
                return 0;
            }

            if (nodeRect.top >= 0) {
                visHeight = Math.min(nodeRect.height, winRect.height - nodeRect.top);
            } else if (nodeRect.bottom > 0) {
                visHeight = Math.min(winRect.height, nodeRect.bottom);
            } else {
                return 0;
            }

            var vis = visHeight * visWidth;
            var ele = nodeRect.height * nodeRect.width;

            if (!ele) {
                return 0;
            }

            return (vis / ele) * 100;
        }

        /************************************************************
         * Element Visiblility
         ************************************************************/

        /**
         * Author: Jason Farrell
         * Author URI: http://useallfive.com/
         *
         * Description: Checks if a DOM element is truly visible.
         * Package URL: https://github.com/UseAllFive/true-visibility
         * License: MIT (https://github.com/UseAllFive/true-visibility/blob/master/LICENSE.txt)
         */
        function isVisible(node) {

            if (!node) {
                return false;
            }

            //-- Cross browser method to get style properties:
            function _getStyle(el, property) {
                if (windowAlias.getComputedStyle) {
                    return documentAlias.defaultView.getComputedStyle(el,null)[property];
                }
                if (el.currentStyle) {
                    return el.currentStyle[property];
                }
            }

            function _elementInDocument(element) {
                element = element.parentNode;

                while (element) {
                    if (element === documentAlias) {
                        return true;
                    }
                    element = element.parentNode;
                }
                return false;
            }

            /**
             * Checks if a DOM element is visible. Takes into
             * consideration its parents and overflow.
             *
             * @param (el)      the DOM element to check if is visible
             *
             * These params are optional that are sent in recursively,
             * you typically won't use these:
             *
             * @param (t)       Top corner position number
             * @param (r)       Right corner position number
             * @param (b)       Bottom corner position number
             * @param (l)       Left corner position number
             * @param (w)       Element width number
             * @param (h)       Element height number
             */
            function _isVisible(el, t, r, b, l, w, h) {
                var p = el.parentNode,
                    VISIBLE_PADDING = 1; // has to be visible at least one px of the element

                if (!_elementInDocument(el)) {
                    return false;
                }

                //-- Return true for document node
                if (9 === p.nodeType) {
                    return true;
                }

                //-- Return false if our element is invisible
                if (
                    '0' === _getStyle(el, 'opacity') ||
                    'none' === _getStyle(el, 'display') ||
                    'hidden' === _getStyle(el, 'visibility')
                ) {
                    return false;
                }

                if (!utils.isDefined(t) ||
                    !utils.isDefined(r) ||
                    !utils.isDefined(b) ||
                    !utils.isDefined(l) ||
                    !utils.isDefined(w) ||
                    !utils.isDefined(h)) {
                    t = el.offsetTop;
                    l = el.offsetLeft;
                    b = t + el.offsetHeight;
                    r = l + el.offsetWidth;
                    w = el.offsetWidth;
                    h = el.offsetHeight;
                }

                if (node === el && (0 === h || 0 === w) && 'hidden' === _getStyle(el, 'overflow')) {
                    return false;
                }

                //-- If we have a parent, let's continue:
                if (p) {
                    //-- Check if the parent can hide its children.
                    if (('hidden' === _getStyle(p, 'overflow') || 'scroll' === _getStyle(p, 'overflow'))) {
                        //-- Only check if the offset is different for the parent
                        if (
                            //-- If the target element is to the right of the parent elm
                            l + VISIBLE_PADDING > p.offsetWidth + p.scrollLeft ||
                            //-- If the target element is to the left of the parent elm
                            l + w - VISIBLE_PADDING < p.scrollLeft ||
                            //-- If the target element is under the parent elm
                            t + VISIBLE_PADDING > p.offsetHeight + p.scrollTop ||
                            //-- If the target element is above the parent elm
                            t + h - VISIBLE_PADDING < p.scrollTop
                        ) {
                            //-- Our target element is out of bounds:
                            return false;
                        }
                    }
                    //-- Add the offset parent's left/top coords to our element's offset:
                    if (el.offsetParent === p) {
                        l += p.offsetLeft;
                        t += p.offsetTop;
                    }
                    //-- Let's recursively check upwards:
                    return _isVisible(p, t, r, b, l, w, h);
                }
                return true;
            }

            return _isVisible(node);
        }

        function checkVisiblity (triggerEvent) {
            return function (event) {
                if (blockTrigger) {
                    // oncePerPage trigger only. do not trigger it again
                    return;
                }
                var nodes = [];
                var selectionMethod = parameters.get('selectionMethod');

                var dom = TagManager.dom;

                if (!selectors) {
                    return;
                }
                nodes = TagManager.dom.bySelector(selectors);

                for (var i = 0; i < nodes.length; i++) {
                    if (onlyOncePerElement) {
                        if (isNodeEventTriggered(nodes[i])) {
                            continue;
                        }
                    }
                    if (nodes[i] && isVisible(nodes[i])) {
                        var percentVisible = getPercentVisible(nodes[i]);
                        if (!minPercentVisible || minPercentVisible <= percentVisible) {
                            triggerEvent({
                                event: 'mtm.ElementVisibility',
                                'mtm.elementVisibilityPercentage': Math.round(percentVisible * 100) / 100,
                                'mtm.elementVisibilityId': dom.getElementAttribute(nodes[i], 'id'),
                                'mtm.elementVisibilityClasses': dom.getElementClassNames(nodes[i]),
                                'mtm.elementVisibilityText': TagManager.utils.trim(nodes[i].innerText),
                                'mtm.elementVisibilityNodeName': nodes[i].nodeName,
                                'mtm.elementVisibilityUrl': nodes[i].href || dom.getElementAttribute(nodes[i], 'href'),
                            });
                            if (fireTriggerWhen === 'oncePage') {
                                blockTrigger = true;
                                TagManager.window.offScroll(self.scrollIndex);
                                if (observerIntersection) {
                                    observerIntersection.disconnect();
                                }
                            } else if (onlyOncePerElement) {
                                triggeredNodes.push(nodes[i]); // to avoid possible memory leaks as much as possible we add onceElement only when needed
                                if (observerIntersection) {
                                    observerIntersection.unobserve(nodes[i]);
                                }
                            }
                        }
                    }
                }
            };
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

        function setIntersectionObserver(triggerEvent) {
            if ('IntersectionObserver' in window) {
                var interSectionObserverOptions = {
                    root: null, // document's viewport as the container.
                    rootMargin: '0px',
                    threshold: (minPercentVisible / 100)
                };
                observerIntersection = new IntersectionObserver(function (entries) {
                    interSectionCallback(entries, triggerEvent);
                }, interSectionObserverOptions);

                if (selectors) {
                    TagManager.dom.bySelector(selectors).forEach(function (element) {
                        observerIntersection.observe(element);
                    });
                }
            }

        }

        function interSectionCallback(entries, triggerEvent) {
            var dom = TagManager.dom;
            entries.forEach(function (entry) {
                if (entry.intersectionRatio > 0) {
                    if (blockTrigger || (onlyOncePerElement && isNodeEventTriggered(entry.target))) {
                        return;
                    }
                    var percentVisible = Math.max(getPercentVisible(entry.target), minPercentVisible);

                    triggerEvent({
                        event: 'mtm.ElementVisibility',
                        'mtm.elementVisibilityPercentage': Math.round(percentVisible * 100) / 100,
                        'mtm.elementVisibilityId': dom.getElementAttribute(entry.target, 'id'),
                        'mtm.elementVisibilityClasses': dom.getElementClassNames(entry.target),
                        'mtm.elementVisibilityText': TagManager.utils.trim(entry.target.innerText),
                        'mtm.elementVisibilityNodeName': entry.target.nodeName,
                        'mtm.elementVisibilityUrl': entry.target.href || dom.getElementAttribute(entry.target, 'href'),
                    });

                    if (fireTriggerWhen === 'oncePage') {
                        blockTrigger = true;
                        TagManager.dom.bySelector(selectors).forEach(function (element) {
                            observerIntersection.unobserve(element);
                            triggeredNodes.push(element);
                        });
                        if (self.scrollIndex) {
                            TagManager.window.offScroll(self.scrollIndex);
                        }
                    } else if (onlyOncePerElement) {
                        observerIntersection.unobserve(entry.target);
                        triggeredNodes.push(entry.target); // to avoid possible memory leaks as much as possible we add onceElement only when needed
                    }
                }
            });
        }

        function isNodeEventTriggered(node) {
            for (var j = 0; j < triggeredNodes.length; j++) {
                if (node === triggeredNodes[j]) {
                    return true;
                }
            }

            return false;
        }

        this.setUp = function (triggerEvent) {
            this.scrollIndex = TagManager.window.onScroll(checkVisiblity(triggerEvent));
            TagManager.dom.onLoad(checkVisiblity(triggerEvent));
            TagManager.dom.onLoad(setIntersectionObserver(triggerEvent));
        };
    };
})();