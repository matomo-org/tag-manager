function htmlToElement(content)
{
    var div = document.createElement('div');
    div.innerHTML = content;
    return div.firstChild;
}

function createDebugFrame()
{
    var iframeClass = stickToTop() ? 'mtmStickyTop' : 'mtmStickyBottom';
    return htmlToElement('<iframe class="'+ iframeClass +'" id="mtmDebugFrame" src="about:blank" frameborder="0" style="cursor: row-resize !important; background-color:#edecec !important; clip: initial !important; display: inline !important; height: ' + getHeight() + '; opacity: 1 !important; visibility:visible !important; padding:0 !important; margin:0 !important; position:fixed !important; left:0 !important; width:100% !important; z-index:999999999 !important;"></iframe>');
}

function hasCookie(cookie) {
    return document.cookie.indexOf(cookie) > -1;
}

function stickToTop() {
    return hasCookie( 'mtmPreviewPosition=top' );
}

function getSize() {
    if (hasCookie('mtmPreviewHeight')) {
        var values = /mtmPreviewHeight=([\d.]+)/.exec(document.cookie);
        if (values !== null && values.length === 2) {
            return parseFloat( values[1] );
        }
    }

    return 0.33;
}

function getHeight() {
    return getSize() * 100 + '% !important';
}

function setHeight( size ) {
    var date = new Date();
    var sevenDays = 7 * 60 * 60 * 24 * 1000;
    date.setTime(date.getTime() + sevenDays); // 7 days

    document.cookie = 'mtmPreviewHeight=' + size + '; expires=' + date.toUTCString() + '; path=/';
}

function makeResizable(previewFrame) {
    function mouseDownListener(e) {
        e.preventDefault();

        var pointerEvents = previewFrame.style.pointerEvents;
        var invert = !stickToTop();
        var ratio;

        previewFrame.style.pointerEvents = 'none';

        function moveListener(e) {
            var y = e.clientY;
            ratio = (y / window.innerHeight).toFixed(2);
            if (invert) {
              ratio = (1 - ratio);
            }

            previewFrame.style.height = (ratio * 100) + '%';
        }

        function mouseUpListener() {
            setHeight(ratio);
            previewFrame.style.pointerEvents = pointerEvents;
            document.body.removeEventListener('mousemove', moveListener, {passive: true});
            document.body.removeEventListener('mouseup', mouseUpListener, {passive: true});
        }

        document.body.addEventListener('mousemove', moveListener, {passive: true});
        document.body.addEventListener('mouseup', mouseUpListener, {passive: true});

        return false;
    }

    previewFrame.addEventListener('mousedown', mouseDownListener);
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
        sheet.innerHTML = ".mtmStickyBottom { bottom: 0 !important;  border:0 !important; border-top: 6px solid #f3f3f3 !important; } .mtmStickyTop { top: 0 !important; border:0 !important; border-bottom: 6px solid #f3f3f3 !important; }";
        document.body.prepend(sheet);
        document.body.prepend(previewFrame);

        var theDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;

        theDoc.open('text/html', 'replace');
        theDoc.write(theContent);
        theDoc.close();

        makeResizable(previewFrame);
    }

  if (previewFrame && previewFrame.contentWindow) {
      window.mtmPreviewWindow = previewFrame.contentWindow;
  }
}

renderPreviewFrame(/*!! previewContent */);
