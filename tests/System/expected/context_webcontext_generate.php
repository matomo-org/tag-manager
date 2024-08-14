array (
  '/js/container_aaacont1.js' => '        if ((document.cookie.indexOf(\'mtmPreview2_aaacont1%3D1\') !== -1 && window.location.search.indexOf(\'&mtmPreviewMode=0\') === -1 && window.location.search.indexOf(\'?mtmPreviewMode=0\') === -1) || window.location.search.indexOf(\'&mtmPreviewMode=aaacont1\') !== -1 || window.location.search.indexOf(\'?mtmPreviewMode=aaacont1\') !== -1) {

    var d=document, g=d.createElement(\'script\'), s=d.getElementsByTagName(\'script\')[0];
    g.type=\'text/javascript\'; g.async=false; g.defer=false; g.src=\'http://localhost/tests/PHPUnit/proxy/js/container_aaacont1_preview.js\'; s.parentNode.insertBefore(g,s);
    return;
}
        var content = \'foobar\';
        (function(){
var Templates = {};
Templates[\'CustomHtmlTag\'] = function () { return (function(){return function(parameters,TagManager){function moveChildrenToArray(element)
{var children=[];var j=0;while(j in element.childNodes&&element.childNodes.length){children.push(element.removeChild(element.childNodes[j]));}
return children;}
function cloneScript(element){var newScript=parameters.document.createElement(\'script\');var src=TagManager.dom.getElementAttribute(element,\'src\');if(src){newScript.src=src;}else{newScript.text=element.text||element.textContent||element.innerHTML||\'\';}
if(element.id){newScript.id=element.id;}
if(element.charset){newScript.charset=element.charset;}
if(element.defer){newScript.defer=element.defer;}
newScript.type="text/javascript";newScript.async=true;return newScript;}
function isJavaScriptElement(element)
{if(element&&element.nodeName&&element.nodeName.toLowerCase()===\'script\'){var type=TagManager.dom.getElementAttribute(element,\'type\');if(!type||String(type).toLowerCase()===\'text/javascript\'){return true;}}
return false;}
function doChildrenContainJavaScript(element)
{return element&&element.innerHTML&&element.innerHTML.toLowerCase().indexOf("<script")!==-1;}
function moveNodes(parent,children)
{var limit=5000;var counter=0;var child;while(counter in children&&children[counter]&&counter<limit){child=children[counter];counter++;if(isJavaScriptElement(child)){parent.appendChild(cloneScript(child));}else if(doChildrenContainJavaScript(child)){var subChildren=moveChildrenToArray(child);parent.appendChild(child);moveNodes(child,subChildren);}else{parent.appendChild(child);}}}
this.fire=function(){var html=parameters.get(\'customHtml\');if(html){var div=parameters.document.createElement(\'div\');div.innerHTML=html;if(div.childNodes){var children=moveChildrenToArray(div);moveNodes(parameters.document.body,children);}}};};})(); }
Templates[\'CustomImageTag\'] = function () { return function () { var x = 1; } }
Templates[\'CustomEventTrigger\'] = function () { return function () { var x = 1; } }
Templates[\'WindowLoadedTrigger\'] = function () { return function () { var x = 1; } }
Templates[\'ErrorUrlVariable\'] = function () { return function () { var x = 1; } }
Templates[\'DomReadyTrigger\'] = function () { return function () { var x = 1; } }
window.MatomoTagManager.addContainer({"id":"aaacont1","isTagFireLimitAllowedInPreviewMode":"0","idsite":2,"versionName":"container1_v4_reversioned","revision":4,"environment":"live","tags":[{"id":12,"type":"CustomHtml","name":"8345e7bb96d4218e2d16226c4270d278","parameters":{"customHtml":"<script><\\/script>","htmlPosition":"bodyEnd"},"blockTriggerIds":[15],"fireTriggerIds":[14],"fireLimit":"once_lifetime","fireDelay":1350,"startDate":"2017-01-02 03:04:05","endDate":"2029-01-02 03:04:05","Tag":"CustomHtmlTag"},{"id":13,"type":"CustomHtml","name":"d5b8a62874c0dbff8e0a987ee5415d4c","parameters":{"customHtml":"<p><\\/p>","htmlPosition":"bodyEnd"},"blockTriggerIds":[],"fireTriggerIds":[14],"fireLimit":"unlimited","fireDelay":0,"startDate":null,"endDate":null,"Tag":"CustomHtmlTag"},{"id":14,"type":"CustomImage","name":"de507228cec67c55088edf4928cf9db6","parameters":{"customImageSrc":"\\/plugins\\/tracking.png","cacheBusterEnabled":true},"blockTriggerIds":[],"fireTriggerIds":[15,16],"fireLimit":"unlimited","fireDelay":0,"startDate":null,"endDate":null,"Tag":"CustomImageTag"}],"triggers":[{"id":14,"type":"CustomEvent","name":"CustomEvent","parameters":{"eventName":"foo"},"conditions":[],"Trigger":"CustomEventTrigger"},{"id":15,"type":"WindowLoaded","name":"WindowLoaded","parameters":[],"conditions":[{"actual":{"name":"ErrorUrl","type":"ErrorUrl","lookUpTable":[],"defaultValue":null,"parameters":[],"Variable":"ErrorUrlVariable"},"comparison":"contains","expected":"foo"}],"Trigger":"WindowLoadedTrigger"},{"id":16,"type":"DomReady","name":"DomReady","parameters":[],"conditions":[],"Trigger":"DomReadyTrigger"}],"variables":[{"name":"ErrorUrl","type":"ErrorUrl","lookUpTable":[],"defaultValue":null,"parameters":[],"Variable":"ErrorUrlVariable"}]}, Templates);})()        ',
  '/js/container_aaacont1_dev_51d68917d3dfb5362030c0df.js' => '        if ((document.cookie.indexOf(\'mtmPreview2_aaacont1%3D1\') !== -1 && window.location.search.indexOf(\'&mtmPreviewMode=0\') === -1 && window.location.search.indexOf(\'?mtmPreviewMode=0\') === -1) || window.location.search.indexOf(\'&mtmPreviewMode=aaacont1\') !== -1 || window.location.search.indexOf(\'?mtmPreviewMode=aaacont1\') !== -1) {

    var d=document, g=d.createElement(\'script\'), s=d.getElementsByTagName(\'script\')[0];
    g.type=\'text/javascript\'; g.async=false; g.defer=false; g.src=\'http://localhost/tests/PHPUnit/proxy/js/container_aaacont1_preview.js\'; s.parentNode.insertBefore(g,s);
    return;
}
        var content = \'foobar\';
        (function(){
var Templates = {};
Templates[\'CustomHtmlTag\'] = function () { return (function(){return function(parameters,TagManager){function moveChildrenToArray(element)
{var children=[];var j=0;while(j in element.childNodes&&element.childNodes.length){children.push(element.removeChild(element.childNodes[j]));}
return children;}
function cloneScript(element){var newScript=parameters.document.createElement(\'script\');var src=TagManager.dom.getElementAttribute(element,\'src\');if(src){newScript.src=src;}else{newScript.text=element.text||element.textContent||element.innerHTML||\'\';}
if(element.id){newScript.id=element.id;}
if(element.charset){newScript.charset=element.charset;}
if(element.defer){newScript.defer=element.defer;}
newScript.type="text/javascript";newScript.async=true;return newScript;}
function isJavaScriptElement(element)
{if(element&&element.nodeName&&element.nodeName.toLowerCase()===\'script\'){var type=TagManager.dom.getElementAttribute(element,\'type\');if(!type||String(type).toLowerCase()===\'text/javascript\'){return true;}}
return false;}
function doChildrenContainJavaScript(element)
{return element&&element.innerHTML&&element.innerHTML.toLowerCase().indexOf("<script")!==-1;}
function moveNodes(parent,children)
{var limit=5000;var counter=0;var child;while(counter in children&&children[counter]&&counter<limit){child=children[counter];counter++;if(isJavaScriptElement(child)){parent.appendChild(cloneScript(child));}else if(doChildrenContainJavaScript(child)){var subChildren=moveChildrenToArray(child);parent.appendChild(child);moveNodes(child,subChildren);}else{parent.appendChild(child);}}}
this.fire=function(){var html=parameters.get(\'customHtml\');if(html){var div=parameters.document.createElement(\'div\');div.innerHTML=html;if(div.childNodes){var children=moveChildrenToArray(div);moveNodes(parameters.document.body,children);}}};};})(); }
Templates[\'CustomImageTag\'] = function () { return function () { var x = 1; } }
Templates[\'CustomEventTrigger\'] = function () { return function () { var x = 1; } }
Templates[\'WindowLoadedTrigger\'] = function () { return function () { var x = 1; } }
Templates[\'ErrorUrlVariable\'] = function () { return function () { var x = 1; } }
Templates[\'DomReadyTrigger\'] = function () { return function () { var x = 1; } }
window.MatomoTagManager.addContainer({"id":"aaacont1","isTagFireLimitAllowedInPreviewMode":"0","idsite":2,"versionName":"container1_v4_reversioned","revision":4,"environment":"dev","tags":[{"id":12,"type":"CustomHtml","name":"8345e7bb96d4218e2d16226c4270d278","parameters":{"customHtml":"<script><\\/script>","htmlPosition":"bodyEnd"},"blockTriggerIds":[15],"fireTriggerIds":[14],"fireLimit":"once_lifetime","fireDelay":1350,"startDate":"2017-01-02 03:04:05","endDate":"2029-01-02 03:04:05","Tag":"CustomHtmlTag"},{"id":13,"type":"CustomHtml","name":"d5b8a62874c0dbff8e0a987ee5415d4c","parameters":{"customHtml":"<p><\\/p>","htmlPosition":"bodyEnd"},"blockTriggerIds":[],"fireTriggerIds":[14],"fireLimit":"unlimited","fireDelay":0,"startDate":null,"endDate":null,"Tag":"CustomHtmlTag"},{"id":14,"type":"CustomImage","name":"de507228cec67c55088edf4928cf9db6","parameters":{"customImageSrc":"\\/plugins\\/tracking.png","cacheBusterEnabled":true},"blockTriggerIds":[],"fireTriggerIds":[15,16],"fireLimit":"unlimited","fireDelay":0,"startDate":null,"endDate":null,"Tag":"CustomImageTag"}],"triggers":[{"id":14,"type":"CustomEvent","name":"CustomEvent","parameters":{"eventName":"foo"},"conditions":[],"Trigger":"CustomEventTrigger"},{"id":15,"type":"WindowLoaded","name":"WindowLoaded","parameters":[],"conditions":[{"actual":{"name":"ErrorUrl","type":"ErrorUrl","lookUpTable":[],"defaultValue":null,"parameters":[],"Variable":"ErrorUrlVariable"},"comparison":"contains","expected":"foo"}],"Trigger":"WindowLoadedTrigger"},{"id":16,"type":"DomReady","name":"DomReady","parameters":[],"conditions":[],"Trigger":"DomReadyTrigger"}],"variables":[{"name":"ErrorUrl","type":"ErrorUrl","lookUpTable":[],"defaultValue":null,"parameters":[],"Variable":"ErrorUrlVariable"}]}, Templates);})()        ',
  '/js/container_aaacont1_staging_650a677a1a4eef090b53dfc8.js' => '        if ((document.cookie.indexOf(\'mtmPreview2_aaacont1%3D1\') !== -1 && window.location.search.indexOf(\'&mtmPreviewMode=0\') === -1 && window.location.search.indexOf(\'?mtmPreviewMode=0\') === -1) || window.location.search.indexOf(\'&mtmPreviewMode=aaacont1\') !== -1 || window.location.search.indexOf(\'?mtmPreviewMode=aaacont1\') !== -1) {

    var d=document, g=d.createElement(\'script\'), s=d.getElementsByTagName(\'script\')[0];
    g.type=\'text/javascript\'; g.async=false; g.defer=false; g.src=\'http://localhost/tests/PHPUnit/proxy/js/container_aaacont1_preview.js\'; s.parentNode.insertBefore(g,s);
    return;
}
        var content = \'foobar\';
        (function(){
var Templates = {};
Templates[\'CustomHtmlTag\'] = function () { return (function(){return function(parameters,TagManager){function moveChildrenToArray(element)
{var children=[];var j=0;while(j in element.childNodes&&element.childNodes.length){children.push(element.removeChild(element.childNodes[j]));}
return children;}
function cloneScript(element){var newScript=parameters.document.createElement(\'script\');var src=TagManager.dom.getElementAttribute(element,\'src\');if(src){newScript.src=src;}else{newScript.text=element.text||element.textContent||element.innerHTML||\'\';}
if(element.id){newScript.id=element.id;}
if(element.charset){newScript.charset=element.charset;}
if(element.defer){newScript.defer=element.defer;}
newScript.type="text/javascript";newScript.async=true;return newScript;}
function isJavaScriptElement(element)
{if(element&&element.nodeName&&element.nodeName.toLowerCase()===\'script\'){var type=TagManager.dom.getElementAttribute(element,\'type\');if(!type||String(type).toLowerCase()===\'text/javascript\'){return true;}}
return false;}
function doChildrenContainJavaScript(element)
{return element&&element.innerHTML&&element.innerHTML.toLowerCase().indexOf("<script")!==-1;}
function moveNodes(parent,children)
{var limit=5000;var counter=0;var child;while(counter in children&&children[counter]&&counter<limit){child=children[counter];counter++;if(isJavaScriptElement(child)){parent.appendChild(cloneScript(child));}else if(doChildrenContainJavaScript(child)){var subChildren=moveChildrenToArray(child);parent.appendChild(child);moveNodes(child,subChildren);}else{parent.appendChild(child);}}}
this.fire=function(){var html=parameters.get(\'customHtml\');if(html){var div=parameters.document.createElement(\'div\');div.innerHTML=html;if(div.childNodes){var children=moveChildrenToArray(div);moveNodes(parameters.document.body,children);}}};};})(); }
Templates[\'CustomImageTag\'] = function () { return function () { var x = 1; } }
Templates[\'CustomEventTrigger\'] = function () { return function () { var x = 1; } }
Templates[\'WindowLoadedTrigger\'] = function () { return function () { var x = 1; } }
Templates[\'ErrorUrlVariable\'] = function () { return function () { var x = 1; } }
Templates[\'DomReadyTrigger\'] = function () { return function () { var x = 1; } }
Templates[\'DataLayerVariable\'] = function () { return function () { var x = 1; } }
Templates[\'PageUrlVariable\'] = function () { return function () { var x = 1; } }
window.MatomoTagManager.addContainer({"id":"aaacont1","isTagFireLimitAllowedInPreviewMode":"0","idsite":2,"versionName":"container1_v5","revision":5,"environment":"staging","tags":[{"id":17,"type":"CustomHtml","name":"8345e7bb96d4218e2d16226c4270d278","parameters":{"customHtml":"<script><\\/script>","htmlPosition":"bodyEnd"},"blockTriggerIds":[20],"fireTriggerIds":[19],"fireLimit":"once_lifetime","fireDelay":1350,"startDate":"2017-01-02 03:04:05","endDate":"2029-01-02 03:04:05","Tag":"CustomHtmlTag"},{"id":18,"type":"CustomHtml","name":"d5b8a62874c0dbff8e0a987ee5415d4c","parameters":{"customHtml":"<p><\\/p>","htmlPosition":"bodyEnd"},"blockTriggerIds":[],"fireTriggerIds":[19],"fireLimit":"unlimited","fireDelay":0,"startDate":null,"endDate":null,"Tag":"CustomHtmlTag"},{"id":19,"type":"CustomImage","name":"de507228cec67c55088edf4928cf9db6","parameters":{"customImageSrc":"\\/plugins\\/tracking.png","cacheBusterEnabled":true},"blockTriggerIds":[],"fireTriggerIds":[20,21],"fireLimit":"unlimited","fireDelay":0,"startDate":null,"endDate":null,"Tag":"CustomImageTag"}],"triggers":[{"id":19,"type":"CustomEvent","name":"CustomEvent","parameters":{"eventName":"foo"},"conditions":[],"Trigger":"CustomEventTrigger"},{"id":20,"type":"WindowLoaded","name":"WindowLoaded","parameters":[],"conditions":[{"actual":{"name":"ErrorUrl","type":"ErrorUrl","lookUpTable":[],"defaultValue":null,"parameters":[],"Variable":"ErrorUrlVariable"},"comparison":"contains","expected":"foo"}],"Trigger":"WindowLoadedTrigger"},{"id":21,"type":"DomReady","name":"DomReady","parameters":[],"conditions":[],"Trigger":"DomReadyTrigger"},{"id":22,"type":"CustomEvent","name":"CustomEvent","parameters":{"eventName":{"joinedVariable":["foo",{"name":"My Var 3","type":"DataLayer","lookUpTable":[],"defaultValue":"","parameters":{"dataLayerName":"dataVarName"},"Variable":"DataLayerVariable"},"bar",{"name":"My Var 2","type":"DataLayer","lookUpTable":[],"defaultValue":"","parameters":{"dataLayerName":"dataVarName"},"Variable":"DataLayerVariable"},"baz",{"name":"PageUrl","type":"PageUrl","lookUpTable":[],"defaultValue":null,"parameters":[],"Variable":"PageUrlVariable"},"yeah"]}},"conditions":[],"Trigger":"CustomEventTrigger"}],"variables":[{"name":"ErrorUrl","type":"ErrorUrl","lookUpTable":[],"defaultValue":null,"parameters":[],"Variable":"ErrorUrlVariable"},{"name":"DataLayer","type":"DataLayer","lookUpTable":[],"defaultValue":"","parameters":{"dataLayerName":"dataVarName"},"Variable":"DataLayerVariable"},{"name":"DataLayer","type":"DataLayer","lookUpTable":[],"defaultValue":"","parameters":{"dataLayerName":"dataVarName"},"Variable":"DataLayerVariable"},{"name":"PageUrl","type":"PageUrl","lookUpTable":[],"defaultValue":null,"parameters":[],"Variable":"PageUrlVariable"},{"name":"DataLayer","type":"DataLayer","lookUpTable":[{"matchValue":"foo","outValue":"bar","comparison":"equals"}],"defaultValue":"10","parameters":{"dataLayerName":"fooBarName"},"Variable":"DataLayerVariable"}]}, Templates);})()        ',
  '/js/container_aaacont1_preview.js' => '        function htmlToElement(content)
{
    var div = document.createElement(\'div\');
    div.innerHTML = content;
    return div.firstChild;
}

function createDebugFrame()
{
    return htmlToElement(\'<iframe id="mtmDebugFrame" src="about:blank" frameborder="0" style="background-color:#edecec !important; clip: initial !important; display: inline !important; height:33% !important; opacity: 1 !important; visibility:visible !important; padding:0 !important; margin:0 !important; border:0 !important; border-top: 2px solid #fff !important; position:fixed !important; bottom:0 !important; left:0 !important; top:initial !important; width:100% !important; z-index:999999999 !important;"></iframe>\');
}

function renderPreviewFrame(theContent)
{
    if (window.mtmPreviewWindow) {
        return;
    }

    var previewFrame = document.getElementById(\'mtmDebugFrame\');

    if (!previewFrame) {
        // might already exist when embedding multiple containers
        previewFrame = createDebugFrame();
        document.body.appendChild(previewFrame);

        var theDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;

        theDoc.open(\'text/html\', \'replace\');
        theDoc.write(theContent);
        theDoc.close();
    }

    if (previewFrame && previewFrame.contentWindow) {
        window.mtmPreviewWindow = previewFrame.contentWindow;
    }
}

renderPreviewFrame("debughtml");

        var content = \'foobar\';
        (function(){
var Templates = {};
Templates[\'CustomHtmlTag\'] = function () { return (function(){return function(parameters,TagManager){function moveChildrenToArray(element)
{var children=[];var j=0;while(j in element.childNodes&&element.childNodes.length){children.push(element.removeChild(element.childNodes[j]));}
return children;}
function cloneScript(element){var newScript=parameters.document.createElement(\'script\');var src=TagManager.dom.getElementAttribute(element,\'src\');if(src){newScript.src=src;}else{newScript.text=element.text||element.textContent||element.innerHTML||\'\';}
if(element.id){newScript.id=element.id;}
if(element.charset){newScript.charset=element.charset;}
if(element.defer){newScript.defer=element.defer;}
newScript.type="text/javascript";newScript.async=true;return newScript;}
function isJavaScriptElement(element)
{if(element&&element.nodeName&&element.nodeName.toLowerCase()===\'script\'){var type=TagManager.dom.getElementAttribute(element,\'type\');if(!type||String(type).toLowerCase()===\'text/javascript\'){return true;}}
return false;}
function doChildrenContainJavaScript(element)
{return element&&element.innerHTML&&element.innerHTML.toLowerCase().indexOf("<script")!==-1;}
function moveNodes(parent,children)
{var limit=5000;var counter=0;var child;while(counter in children&&children[counter]&&counter<limit){child=children[counter];counter++;if(isJavaScriptElement(child)){parent.appendChild(cloneScript(child));}else if(doChildrenContainJavaScript(child)){var subChildren=moveChildrenToArray(child);parent.appendChild(child);moveNodes(child,subChildren);}else{parent.appendChild(child);}}}
this.fire=function(){var html=parameters.get(\'customHtml\');if(html){var div=parameters.document.createElement(\'div\');div.innerHTML=html;if(div.childNodes){var children=moveChildrenToArray(div);moveNodes(parameters.document.body,children);}}};};})(); }
Templates[\'CustomImageTag\'] = function () { return function () { var x = 1; } }
Templates[\'CustomEventTrigger\'] = function () { return function () { var x = 1; } }
Templates[\'WindowLoadedTrigger\'] = function () { return function () { var x = 1; } }
Templates[\'ErrorUrlVariable\'] = function () { return function () { var x = 1; } }
Templates[\'DomReadyTrigger\'] = function () { return function () { var x = 1; } }
Templates[\'DataLayerVariable\'] = function () { return function () { var x = 1; } }
Templates[\'PageUrlVariable\'] = function () { return function () { var x = 1; } }
window.MatomoTagManager.addContainer({"id":"aaacont1","isTagFireLimitAllowedInPreviewMode":"0","idsite":2,"versionName":"","revision":0,"environment":"preview","tags":[{"id":2,"type":"CustomHtml","name":"My Tag 2","parameters":{"customHtml":"<script><\\/script>","htmlPosition":"bodyEnd"},"blockTriggerIds":[2],"fireTriggerIds":[1],"fireLimit":"once_lifetime","fireDelay":1350,"startDate":"2017-01-02 03:04:05","endDate":"2029-01-02 03:04:05","Tag":"CustomHtmlTag"},{"id":1,"type":"CustomHtml","name":"My Tag 1","parameters":{"customHtml":"<p><\\/p>","htmlPosition":"bodyEnd"},"blockTriggerIds":[],"fireTriggerIds":[1],"fireLimit":"unlimited","fireDelay":0,"startDate":null,"endDate":null,"Tag":"CustomHtmlTag"},{"id":3,"type":"CustomImage","name":"My Tag 3","parameters":{"customImageSrc":"\\/plugins\\/tracking.png","cacheBusterEnabled":true},"blockTriggerIds":[],"fireTriggerIds":[2,3],"fireLimit":"unlimited","fireDelay":0,"startDate":null,"endDate":null,"Tag":"CustomImageTag"}],"triggers":[{"id":1,"type":"CustomEvent","name":"My trigger1","parameters":{"eventName":"foo"},"conditions":[],"Trigger":"CustomEventTrigger"},{"id":2,"type":"WindowLoaded","name":"Mytrigger2","parameters":[],"conditions":[{"actual":{"name":"ErrorUrl","type":"ErrorUrl","lookUpTable":[],"defaultValue":null,"parameters":[],"Variable":"ErrorUrlVariable"},"comparison":"contains","expected":"foo"}],"Trigger":"WindowLoadedTrigger"},{"id":3,"type":"DomReady","name":"Mytrigger3","parameters":[],"conditions":[],"Trigger":"DomReadyTrigger"},{"id":18,"type":"CustomEvent","name":"My trigger4","parameters":{"eventName":{"joinedVariable":["foo",{"name":"My Var 3","type":"DataLayer","lookUpTable":[],"defaultValue":"","parameters":{"dataLayerName":"dataVarName"},"Variable":"DataLayerVariable"},"bar",{"name":"My Var 2","type":"DataLayer","lookUpTable":[],"defaultValue":"","parameters":{"dataLayerName":"dataVarName"},"Variable":"DataLayerVariable"},"baz",{"name":"PageUrl","type":"PageUrl","lookUpTable":[],"defaultValue":null,"parameters":[],"Variable":"PageUrlVariable"},"yeah"]}},"conditions":[],"Trigger":"CustomEventTrigger"}],"variables":[{"name":"ErrorUrl","type":"ErrorUrl","lookUpTable":[],"defaultValue":null,"parameters":[],"Variable":"ErrorUrlVariable"},{"name":"My Var 3","type":"DataLayer","lookUpTable":[],"defaultValue":"","parameters":{"dataLayerName":"dataVarName"},"Variable":"DataLayerVariable"},{"name":"My Var 2","type":"DataLayer","lookUpTable":[],"defaultValue":"","parameters":{"dataLayerName":"dataVarName"},"Variable":"DataLayerVariable"},{"name":"PageUrl","type":"PageUrl","lookUpTable":[],"defaultValue":null,"parameters":[],"Variable":"PageUrlVariable"},{"name":"My Var 1","type":"DataLayer","lookUpTable":[{"matchValue":"foo","outValue":"bar","comparison":"equals"}],"defaultValue":"10","parameters":{"dataLayerName":"fooBarName"},"Variable":"DataLayerVariable"}]}, Templates);})()        ',
)