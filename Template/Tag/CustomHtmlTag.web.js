/*
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {

    /*!
    * secure-filters from https://github.com/salesforce/secure-filters/blob/master/lib/secure-filters.js
    * license: BSD-3-Clause https://github.com/salesforce/secure-filters/blob/master/LICENSE.txt
    * */
    function convertControlCharacters(str) {
        return String(str).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, ' ');
    };
    var secureFilters = {};
    secureFilters.css = function(val) {
        var str = String(val);
        str = convertControlCharacters(str);
        return str.replace(/[^a-zA-Z0-9\uD800-\uDFFF]/g, function(match) {
            var code = match.charCodeAt(0);
            if (code === 0) {
                return '\\fffd '; // REPLACEMENT CHARACTER U+FFFD
            } else {
                var hex = code.toString(16).toLowerCase();
                return '\\'+hex+' ';
            }
        });
    };
    secureFilters.html = function(val) {
        var str = String(val);
        str = convertControlCharacters(str);
        return str.replace(/[^\t\n\v\f\r ,\.0-9A-Z_a-z\-\u00A0-\uFFFF]/g, function(match) {
            var code = match.charCodeAt(0);
            switch(code) {
                // folks expect these "nice" entities:
                case 0x22:
                    return '&quot;';
                case 0x26:
                    return '&amp;';
                case 0x3C:
                    return '&lt;';
                case 0x3E:
                    return '&gt;';

                default:
                    // optimize for size:
                    if (code < 100) {
                        var dec = code.toString(10);
                        return '&#'+dec+';';
                    } else {
                        // XXX: this doesn't produce strictly valid entities for code-points
                        // requiring a UTF-16 surrogate pair. However, browsers are generally
                        // tolerant of this. Surrogate pairs are currently in the whitelist
                        // defined via HTML_NOT_WHITELISTED.
                        var hex = code.toString(16).toUpperCase();
                        return '&#x'+hex+';';
                    }
            }
        });
    };
    secureFilters.style = function(val) {
        return secureFilters.html(secureFilters.css(val));
    };
    secureFilters.uri = function(val) {
        // encodeURIComponent() is well-standardized across browsers and it handles
        // UTF-8 natively.  It will not encode "~!*()'", so need to replace those here.
        // encodeURIComponent also won't encode ".-_", but those are known-safe.
        //
        // IE does not always encode '"' to '%27':
        // http://blog.imperva.com/2012/01/ie-bug-exposes-its-users-to-xss-attacks-.html
        var QUOT = /\x22/g; // "
        var APOS = /\x27/g; // '
        var AST = /\*/g;
        var TILDE = /~/g;
        var BANG = /!/g;
        var LPAREN = /\(/g;
        var RPAREN = /\)/g;
        var AMP = /&/g;
        var encode = encodeURI(String(val));
        // modification by matomo: we use encodeURI instead of encodeURIComponent as we are currently not detecting
        // whether we are escaping a variable as part of a uri or the full uri
        // modification by matomo: encodeURI keeps "&", so we escape it as well
        return encode
            .replace(AMP, '&amp;')
            .replace(BANG, '%21')
            .replace(QUOT, '%27')
            .replace(APOS, '%27')
            .replace(LPAREN, '%28')
            .replace(RPAREN, '%29')
            .replace(AST, '%2A')
            .replace(TILDE, '%7E');
    };
    /*! end secure filters */

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
                newScript.setAttribute('src', src);
            } else {
                newScript.text = element.text || element.textContent || element.innerHTML || '';
            }

            if (element.hasAttribute('id')) {
                newScript.setAttribute('id', element.getAttribute('id'));
            }
            if (element.hasAttribute('charset')) {
                newScript.setAttribute('charset', element.getAttribute('charset'));
            }
            if (element.hasAttribute('defer')) {
                newScript.setAttribute('defer', element.getAttribute('defer'));
            }
            if (element.hasAttribute('async')) {
                newScript.setAttribute('async',element.getAttribute('async'));
            }
            if (element.hasAttribute('onload')) {
                newScript.setAttribute('onload', element.getAttribute('onload'));
            }
            if (element.hasAttribute('type')) {
                newScript.setAttribute('type', element.getAttribute('type'));
            }

            // If this script is executing using a nonce, set the nonce on its children too.
            var scriptWithNonce = TagManager.dom.bySelector('script[nonce]');
            if (scriptWithNonce.length && scriptWithNonce[0]) {
                scriptWithNonce = scriptWithNonce[0]; // Grab the first element.
                // Try using the attribute first for compatibility, then go to the property.
                var nonceAttr = TagManager.dom.getElementAttribute(scriptWithNonce, 'nonce');
                nonceAttr = nonceAttr ? nonceAttr : scriptWithNonce.nonce;
                newScript.setAttribute('nonce', nonceAttr);
            }

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

        function getNoscriptReplacement(htmlString)
        {
            // the page runs scripts, so it parses noscript content as text. The parser we use to check the HTML does not
            // run scripts and would parse it as markup, so we rename noscript to an element whose content is always text.
            // returns false when the HTML already uses all these elements
            var names = ['noframes', 'noembed', 'xmp'];
            for (var i = 0; i < names.length; i++) {
                if (!new RegExp(names[i], 'i').test(htmlString)) {
                    return names[i];
                }
            }
            return false;
        }

        function parseHtml(html, noscriptReplacement)
        {
            // a document without a browsing context does not load or run anything. We do not use a template element,
            // because it parses some HTML differently from the div of the page, for example a leading <col>
            var div = parameters.document.implementation.createHTMLDocument('').createElement('div');
            div.innerHTML = noscriptReplacement ? html.replace(/(<\/?)noscript/gi, '$1' + noscriptReplacement) : html;
            return div;
        }

        function getElements(root, elements)
        {
            var children = root.querySelectorAll('*');
            for (var i = 0; i < children.length; i++) {
                elements.push(children[i]);
                if (children[i].nodeName.toLowerCase() === 'template' && children[i].content) {
                    getElements(children[i].content, elements);
                }
            }
            return elements;
        }

        function hasScriptUriScheme(attributeName, attributeValue)
        {
            var uris = [attributeValue];
            if (attributeName === 'values') {
                // an svg animation can set an attribute to each item of its "values" list
                uris = attributeValue.split(';');
            } else if (attributeName === 'content') {
                // a meta refresh goes to the URL after the delay
                uris.push(attributeValue.replace(/^\s*[\d.]*\s*[;,]?\s*(url\s*=\s*)?['"]?/i, ''));
            }
            for (var i = 0; i < uris.length; i++) {
                // browsers ignore leading whitespace and control characters, and tabs and newlines anywhere in a URL
                var uri = uris[i].replace(/[\t\n\r]/g, '').replace(/^[\x00-\x20]+/, '');
                if (/^(javascript|vbscript):/i.test(uri)) {
                    return true;
                }
            }
            return false;
        }

        function getScriptUriAttribute(htmlString, filteredValue)
        {
            // asks the browser where filteredValue goes when it is added to htmlString
            // returns {name, isUnquoted, isUnchecked} when filteredValue would make the attribute value a script URL,
            // or when we cannot check it. Otherwise returns false.
            // We check the value up to the end of filteredValue: the tag owner writes the text after it.
            var closing = '"\'>';
            var hasNoscript = /<\/?noscript/i.test(htmlString);
            var noscriptReplacement = hasNoscript ? getNoscriptReplacement(htmlString) : false;
            var implementation = parameters.document.implementation;
            if (!implementation || !implementation.createHTMLDocument || (hasNoscript && !noscriptReplacement)) {
                // we cannot parse the HTML like the page does, so we do not add the value
                return {name: '', isUnquoted: /=[\t\n\f\r ]*[^\t\n\f\r "'>]*$/.test(htmlString), isUnchecked: true};
            }

            // filteredValue cannot contain "<", quotes or ">", so it does not change the elements before it
            var marker = 'mtm' + String(Math.random()).replace(/\D/g, '') + 'x';
            var elements = getElements(parseHtml(htmlString + marker + closing, noscriptReplacement), []);
            for (var i = 0; i < elements.length; i++) {
                for (var j = 0; j < elements[i].attributes.length; j++) {
                    var attribute = elements[i].attributes[j];
                    var position = attribute.value.indexOf(marker);
                    if (position === -1) {
                        continue;
                    }
                    var element = getElements(parseHtml(htmlString + filteredValue + closing, noscriptReplacement), [])[i];
                    var attributeValue = element ? element.getAttribute(attribute.name) : null;
                    if (attributeValue === null || hasScriptUriScheme(attribute.name, attributeValue)) {
                        return {
                            name: attribute.name,
                            // an unquoted value also takes the closing quotes
                            isUnquoted: attribute.value.substring(position + marker.length) === closing.substring(0, 2),
                            isUnchecked: false
                        };
                    }
                    return false;
                }
            }
            return false;
        }

        function doChildrenContainJavaScript(element)
        {
            return element && element.innerHTML && element.innerHTML.toLowerCase().indexOf("<script") !== -1;
        }

        function insertNode(parent, child, append, previousElement)
        {
            if (append || !parent.firstChild) {
                return parent.appendChild(child);
            } else {
                if (previousElement) {
                    return previousElement.parentNode.insertBefore(child, previousElement.nextSibling);
                }

                return parent.insertBefore(child, parent.firstChild);
            }
        }

        function moveNodes(parent, children, append)
        {
            var limit = 5000; // prevent endless loop
            var counter = 0;
            var child;
            var previousElement = null;

            while (counter in children && children[counter] && counter < limit) {
                child = children[counter];
                counter++;

                if (isJavaScriptElement(child)) {
                    // we have to re-create the element, otherwise wouldn't be executed
                    previousElement = insertNode(parent, cloneScript(child), append, previousElement);
                } else if (doChildrenContainJavaScript(child)) {
                    // it contains at least one script, we better move them individually...
                    // first we remove all children from the element to have only the plain element left
                    var subChildren = moveChildrenToArray(child);
                    previousElement = insertNode(parent, child, append, previousElement);
                    // then we move all nodes indidivdually into it
                    moveNodes(child, subChildren);
                } else {
                    previousElement = insertNode(parent, child, append, previousElement);
                }
            }
        }

        this.fire = function () {
            var html = parameters.customHtml;
            if (html && html.type === 'JoinedVariable') {
                var variables = html.getDefinition();
                var value = '', contextValue, filteredValue, blockedAttribute, varReturn, theVarValue, isVariable, hasValueSet;
                for (var i = 0; i < variables.length; i++) {
                    varReturn = parameters.buildVariable(variables[i]);
                    isVariable = TagManager.utils.isObject(variables[i]);
                    theVarValue = varReturn.get();
                    hasValueSet = theVarValue !== false && theVarValue !== null && TagManager.utils.isDefined(theVarValue);

                    if (isVariable) {
                        // browsers also separate attributes with tabs and line breaks
                        contextValue = value.replace(/[\t\n\r\f]/g, ' ');
                        if (TagManager.dom.isElementContext(value, 'script')) {
                            // instead of serializing the object, we make it accessible through a method so users can reference
                            // an object using eg "var mytest = {{myObj}}"
                            if (!TagManager.utils.isDefined(TagManager.customHtmlDataStore)) {
                                TagManager.customHtmlDataStore = [];
                            }
                            TagManager.customHtmlDataStore.push(theVarValue);
                            value += 'window.MatomoTagManager.customHtmlDataStore[' + (TagManager.customHtmlDataStore.length - 1) +']';
                        } else if (TagManager.dom.isElementContext(value, 'style')
                                 || TagManager.dom.isAttributeContext(contextValue, 'style')) {
                            if (hasValueSet) {
                                // we need to make sure to print a value... we use a random value... if someone searches for it
                                // they can find the FAQ article
                                value += secureFilters.css(theVarValue);
                            } else {
                                value += 'mTmKpwoqM';
                            }
                        } else if (hasValueSet) {
                            if (TagManager.dom.isAttributeContext(contextValue, 'href')
                                || TagManager.dom.isAttributeContext(contextValue, 'src')) {
                                filteredValue = secureFilters.uri(theVarValue);
                            } else {
                                filteredValue = secureFilters.html(theVarValue);
                            }
                            blockedAttribute = getScriptUriAttribute(value, filteredValue);
                            if (!blockedAttribute) {
                                value += filteredValue;
                            } else {
                                if (blockedAttribute.isUnchecked) {
                                    TagManager.debug.log('Custom HTML tag: a variable value is not added, because this browser cannot check it');
                                } else {
                                    TagManager.debug.log('Custom HTML tag: a variable value is not added, because it would make the "'
                                        + blockedAttribute.name + '" attribute a script URL');
                                }
                                if (blockedAttribute.isUnquoted) {
                                    // an empty unquoted value would take the next attribute as its value
                                    value += 'mTmKpwoqM';
                                }
                            }
                        }
                    } else if (hasValueSet) {
                        // raw value entered by user, no escaping
                        value += theVarValue;
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
                    } else if (parameters.document.body) {
                        moveNodes(parameters.document.body, children, append);
                    } else {
                        // tag manager is embedded in head and loaded before body exists, need to wait for body to exist
                        TagManager.dom.onReady(function () {
                            moveNodes(parameters.document.body, children, append);
                        });
                    }
                }
            }
        };
    };
})();
