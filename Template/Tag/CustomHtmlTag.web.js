(function () {
    return function (parameters, TagManager) {

        function moveChildrenToArray(element)
        {
            var children = [];
            var j = 0;
            while (j in element.childNodes && element.childNodes.length) {
                children.push(element.removeChild(element.childNodes[j]));
            }
            return children;
        }

        function cloneScript(element) {
            var newScript = parameters.document.createElement('script');

            var src = TagManager.dom.getElementAttribute(element, 'src');
            if (src) {
                newScript.src = src;
            } else {
                newScript.text = element.text || element.textContent || element.innerHTML || '';
            }

            if (element.id) {
                newScript.id = element.id;
            }
            if (element.charset) {
                newScript.charset = element.charset;
            }
            if (element.defer) {
                newScript.defer = element.defer;
            }
            if (element.async) {
                newScript.async = element.async;
            }

            newScript.type = "text/javascript";

            return newScript;
        }

        function isJavaScriptElement(element)
        {
            if (element && element.nodeName && element.nodeName.toLowerCase() === 'script') {
                // we have to re-create the element, otherwise wouldn't be executed
                var type = TagManager.dom.getElementAttribute(element, 'type');
                if (!type || String(type).toLowerCase() === 'text/javascript') {
                    return true;
                }
            }
            return false;
        }

        function doChildrenContainJavaScript(element)
        {
            return element && element.innerHTML && element.innerHTML.toLowerCase().indexOf("<script") !== -1;
        }

        function insertNode(parent, child, append)
        {
            if (append || !parent.firstChild) {
                parent.appendChild(child);
            } else {
                parent.insertBefore(child, parent.firstChild);
            }
        }

        function moveNodes(parent, children, append)
        {
            var limit = 5000; // prevent endless loop
            var counter = 0;
            var child;

            while (counter in children && children[counter] && counter < limit) {
                child = children[counter];
                counter++;
                
                if (isJavaScriptElement(child)) {
                    // we have to re-create the element, otherwise wouldn't be executed
                    insertNode(parent, cloneScript(child), append);
                } else if (doChildrenContainJavaScript(child)) {
                    // it contains at least one script, we better move them individually...
                    // first we remove all children from the element to have only the plain element left
                    var subChildren = moveChildrenToArray(child);
                    insertNode(parent, child, append);
                    // then we move all nodes indidivdually into it
                    moveNodes(child, subChildren);
                } else {
                    insertNode(parent, child, append);
                }
            }
        }

        this.fire = function () {
            var html = parameters.customHtml;
            if (html && html.type === 'JoinedVariable') {
                var variables = html.getDefinition();
                var value = '', varReturn, theVarValue, isVariable;
                for (var i = 0; i < variables.length; i++) {
                    varReturn = parameters.buildVariable(variables[i]);
                    isVariable = TagManager.utils.isObject(variables[i]);
                    theVarValue = varReturn.get();
                    if (TagManager.utils.isObject(theVarValue) && TagManager.dom.isJsContext(value)) {
                        // instead of serializing the object, we make it accessbile through a method so users can reference
                        // an object using eg "var mytest = {{myObj}}"
                        if (!TagManager.utils.isDefined(TagManager.customHtmlDataStore)) {
                            TagManager.customHtmlDataStore = [];
                        }
                        TagManager.customHtmlDataStore.push((function (variable) {
                            return function(){
                                return varReturn.get();
                            }
                        })(varReturn));
                        value += 'window.MatomoTagManager.customHtmlDataStore[' + (TagManager.customHtmlDataStore.length - 1) +']()';
                    } else if (theVarValue !== false && theVarValue !== null && TagManager.utils.isDefined(theVarValue)) {
                       if (isVariable && TagManager.utils.isString(theVarValue) && TagManager.dom.isJsContext(value)) {
                            // we only escape it when the string is a result of a variable, not when it was actually entered
                            // by a user
                            value += theVarValue.replace(/[^,\-\.0-9A-Z_a-z]/g, function (charStr) {
                                // from https://github.com/salesforce/secure-filters/blob/master/lib/secure-filters.js
                                // license: BSD-3-Clause https://github.com/salesforce/secure-filters/blob/master/LICENSE.txt
                                var code = charStr.charCodeAt(0);
                                var hex = code.toString(16).toUpperCase();
                                if (code < 0x80) { // ASCII
                                    if (hex.length === 1) {
                                        return '\\x0'+hex;
                                    } else {
                                        return '\\x'+hex;
                                    }
                                } else { // Unicode
                                    switch(hex.length) {
                                        case 2:
                                            return '\\u00'+hex;
                                        case 3:
                                            return '\\u0'+hex;
                                        case 4:
                                            return '\\u'+hex;
                                        default:
                                            // charCodeAt() JS shouldn't return code > 0xFFFF, and only four hex
                                            // digits can be encoded via `\u`-encoding, so return REPLACEMENT
                                            // CHARACTER U+FFFD.
                                            return '\\uFFFD';
                                    }
                                }

                            });
                        } else {
                            value += theVarValue;
                        }
                    }
                }
                html = value;
            } else {
                html = html.get();
            }
            if (html) {
                var div = parameters.document.createElement('div');
                div.innerHTML = html;
                if (div.childNodes) {
                    var children = moveChildrenToArray(div);

                    var htmlPosition = parameters.get('htmlPosition', 'bodyEnd');

                    var append = true;
                    if (htmlPosition === 'headStart' || htmlPosition === 'bodyStart') {
                        append = false;
                    }

                    if (htmlPosition === 'headStart' || htmlPosition === 'headEnd') {
                        moveNodes(parameters.document.head, children, append);
                    } else {
                        moveNodes(parameters.document.body, children, append);
                    }
                }
            }
        };
    };
})();