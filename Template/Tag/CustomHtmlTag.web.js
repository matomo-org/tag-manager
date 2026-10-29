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

        function getAttributeValueSoFar(htmlString, isSvgAndMathTracked)
        {
            // follows the HTML tokenizer from the start of htmlString
            // returns the attribute value so far, or false when htmlString does not end within an attribute value
            var html = String(htmlString);
            var position = 0, openForeignElements = [], match, rest, isEndTag, isSelfClosing, tagName, quote, end;
            var rawTextElements = ['script', 'style', 'textarea', 'title', 'xmp', 'iframe', 'noembed', 'noframes', 'noscript'];
            // these start tags, and the p and br end tags, end svg and math content
            var foreignContentBreakouts = ['b', 'big', 'blockquote', 'body', 'br', 'center', 'code', 'dd', 'div', 'dl', 'dt', 'em', 'embed',
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'hr', 'i', 'img', 'li', 'listing', 'menu', 'meta', 'nobr', 'ol', 'p', 'pre',
                'ruby', 's', 'small', 'span', 'strong', 'strike', 'sub', 'sup', 'table', 'tt', 'u', 'ul', 'var'];

            while ((position = html.indexOf('<', position)) !== -1) {
                rest = html.substring(position);
                // written as "-{2}" because an HTML comment opener in this code breaks a script element that inlines it
                if (/^<!-{2}/.test(rest)) {
                    match = /^<!-{2}(>|->|[\s\S]*?--!?>)/.exec(rest);
                    if (!match) {
                        return false;
                    }
                    position += match[0].length;
                    continue;
                }
                if (openForeignElements.length && rest.indexOf('<![CDATA[') === 0) {
                    end = html.indexOf(']]>', position);
                    if (end === -1) {
                        return false;
                    }
                    position = end + 3;
                    continue;
                }
                match = /^<(\/?)([a-zA-Z][^\t\n\f\r \/>]*)/.exec(rest);
                if (!match) {
                    if (/^<[!?\/]/.test(rest)) {
                        // bogus comment
                        end = html.indexOf('>', position + 2);
                        if (end === -1) {
                            return false;
                        }
                        position = end + 1;
                    } else {
                        position++;
                    }
                    continue;
                }
                isEndTag = match[1] === '/';
                tagName = match[2].toLowerCase();
                position += match[0].length;

                while (true) {
                    match = /^[\t\n\f\r \/]*/.exec(html.substring(position));
                    position += match[0].length;
                    if (position >= html.length) {
                        return false;
                    }
                    if (html.charAt(position) === '>') {
                        isSelfClosing = /\/$/.test(match[0]);
                        break;
                    }
                    // attribute name, which can start with "="
                    position += /^[\s\S][^\t\n\f\r \/>=]*[\t\n\f\r ]*/.exec(html.substring(position))[0].length;
                    if (html.charAt(position) !== '=') {
                        continue;
                    }
                    position += /^=[\t\n\f\r ]*/.exec(html.substring(position))[0].length;
                    quote = html.charAt(position);
                    if (quote === '"' || quote === "'") {
                        end = html.indexOf(quote, position + 1);
                        if (end === -1) {
                            return html.substring(position + 1);
                        }
                        position = end + 1;
                    } else {
                        match = /^[^\t\n\f\r >]*/.exec(html.substring(position));
                        if (position + match[0].length >= html.length) {
                            return match[0];
                        }
                        position += match[0].length;
                    }
                }
                position++;

                if (isSvgAndMathTracked && (tagName === 'svg' || tagName === 'math')) {
                    // content in svg and math elements is not raw text, and it can contain CDATA sections
                    if (isEndTag) {
                        // an end tag without a matching open element is ignored
                        for (var i = openForeignElements.length - 1; i >= 0; i--) {
                            if (openForeignElements[i] === tagName) {
                                openForeignElements.length = i;
                                break;
                            }
                        }
                    } else if (!isSelfClosing) {
                        openForeignElements.push(tagName);
                    }
                } else if (openForeignElements.length && TagManager.utils.indexOfArray(foreignContentBreakouts, tagName) !== -1
                    && (!isEndTag || tagName === 'p' || tagName === 'br')) {
                    openForeignElements = [];
                } else if (!isEndTag && !openForeignElements.length) {
                    if (tagName === 'plaintext') {
                        return false;
                    }
                    if (TagManager.utils.indexOfArray(rawTextElements, tagName) !== -1) {
                        match = new RegExp('</' + tagName + '[\\t\\n\\f\\r />]', 'i').exec(html.substring(position));
                        if (!match) {
                            return false;
                        }
                        position += match.index;
                    }
                }
            }
            return false;
        }

        function hasScriptUriScheme(attributeValue)
        {
            var textarea = parameters.document.createElement('textarea');
            textarea.innerHTML = attributeValue; // decodes character references without parsing any elements
            // browsers ignore leading whitespace and control characters, and tabs and newlines anywhere in a URL
            var uri = textarea.value.replace(/[\t\n\r]/g, '').replace(/^[\x00-\x20]+/, '');
            return /^(javascript|vbscript):/i.test(uri);
        }

        function isAllowedInAttributeValue(htmlString, filteredValue)
        {
            // svg and math content is tokenized differently, and we do not follow all the rules of where it ends,
            // so we check both ways
            var isSvgAndMathTracked = [false, true];
            for (var i = 0; i < isSvgAndMathTracked.length; i++) {
                var attributeValue = getAttributeValueSoFar(htmlString, isSvgAndMathTracked[i]);
                if (attributeValue !== false && hasScriptUriScheme(attributeValue + filteredValue)) {
                    return false;
                }
            }
            return true;
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
                var value = '', contextValue, filteredValue, varReturn, theVarValue, isVariable, hasValueSet;
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
                            if (TagManager.dom.isAttributeContext(contextValue, 'href') || TagManager.dom.isAttributeContext(contextValue, 'src')) {
                                filteredValue = secureFilters.uri(theVarValue);
                            } else {
                                filteredValue = secureFilters.html(theVarValue);
                            }
                            if (isAllowedInAttributeValue(value, filteredValue)) {
                                value += filteredValue;
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
