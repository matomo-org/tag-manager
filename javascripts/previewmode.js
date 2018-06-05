function htmlToElement(content)
{
    var div = document.createElement('div');
    div.innerHTML = content;
    return div.firstChild;
}

function createDebugFrame()
{
    return htmlToElement('<iframe id="mtmDebugFrame" src="about:blank" frameborder="0" style="background-color:#edecec !important; clip: initial !important; display: inline !important; height:33% !important; opacity: 1 !important; visibility:visible !important; padding:0 !important; margin:0 !important; border:0 !important; border-top: 2px solid #fff !important; position:fixed !important; bottom:0 !important; left:0 !important; top:initial !important; width:100% !important; z-index:999999999 !important;"></iframe>');
}

function renderPreviewFrame(theContent)
{
    if (window.mtmPreviewWindow) {
        return;
    }

    var previewFrame = document.getElementById('mtmDebugFrame');

    if (!previewFrame) {
        // might already exist when embedding multiple containers
        previewFrame = createDebugFrame();
        document.body.appendChild(previewFrame);

        var theDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;

        theDoc.open('text/html', 'replace');
        theDoc.write(theContent);
        theDoc.close();
    }

    if (previewFrame && previewFrame.contentWindow) {
        window.mtmPreviewWindow = previewFrame.contentWindow;
    }
}

renderPreviewFrame(/*!! previewContent */);
