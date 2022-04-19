function htmlToElement(content)
{
    var div = document.createElement('div');
    div.innerHTML = content;
    return div.firstChild;
}

function createDebugFrame()
{
    var iframeClass = stickToTop() ? 'mtmStickyTop' : 'mtmStickyBottom';
    return htmlToElement('<iframe class="'+ iframeClass +'" id="mtmDebugFrame" src="about:blank" frameborder="0" style="background-color:#edecec !important; clip: initial !important; display: inline !important; height:33% !important; opacity: 1 !important; visibility:visible !important; padding:0 !important; margin:0 !important; position:fixed !important; left:0 !important; width:100% !important; z-index:999999999 !important;min-height: 18rem;"></iframe>');
}

function stickToTop() {
    return document.cookie.indexOf('mtmPreviewPosition=top') > -1;
}

function renderPreviewFrame(theContent)
{
    if (window.mtmPreviewWindow) {
        return;
    }

    if (!document.body) {
        document.addEventListener('DOMContentLoaded', function () {
          renderPreviewFrame(theContent);
        });
        return;
    }

    var previewFrame = document.getElementById('mtmDebugFrame');

    if (!previewFrame) {
        // might already exist when embedding multiple containers
        previewFrame = createDebugFrame();
        var sheet = document.createElement('style');
        sheet.innerHTML = ".mtmStickyBottom { bottom: 0 !important;  border:0 !important; border-top: 2px solid #fff !important; } .mtmStickyTop { top: 0 !important; border:0 !important; border-bottom: 2px solid #fff !important; }";
        document.body.prepend(sheet);
        document.body.prepend(previewFrame);

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
