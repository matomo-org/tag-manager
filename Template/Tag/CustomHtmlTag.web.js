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

            newScript.type = "text/javascript";
            newScript.async = true;

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

        function moveNodes(parent, children)
        {
            var limit = 5000; // prevent endless loop
            var counter = 0;
            var child;

            while (counter in children && children[counter] && counter < limit) {
                child = children[counter];
                counter++;
                
                if (isJavaScriptElement(child)) {
                    // we have to re-create the element, otherwise wouldn't be executed
                    parent.appendChild(cloneScript(child));
                } else if (doChildrenContainJavaScript(child)) {
                    // it contains at least one script, we better move them individually...
                    // first we remove all children from the element to have only the plain element left
                    var subChildren = moveChildrenToArray(child);
                    parent.appendChild(child);
                    // then we move all nodes indidivdually into it
                    moveNodes(child, subChildren);
                } else {
                    parent.appendChild(child);
                }
            }
        }

        this.fire = function () {
            var html = parameters.get('customHtml');
            if (html) {
                var div = parameters.document.createElement('div');
                div.innerHTML = html;
                if (div.childNodes) {
                    var children = moveChildrenToArray(div);
                    moveNodes(parameters.document.body, children);
                }
            }
        };
    };
})();