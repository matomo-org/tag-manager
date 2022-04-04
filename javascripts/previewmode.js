function htmlToElement(content)
{
  var div = document.createElement('div');
  div.innerHTML = content;
  return div.firstChild;
}

function createDebugFrame()
{
  return htmlToElement('<div id="mtmDebugFrameWrapDiv" style="position: absolute;z-index: 99999999999999999999;width: 100%;border: 1px solid #d3d3d3;"><div id="mtmDebugFrameResizeDiv" style="padding: 10px;z-index: 999999999999999999999;text-align: center;cursor: move;color: #fff;background-color: #3450a3;">Click here to move</div> <iframe id="mtmDebugFrame" src="about:blank" frameborder="0" style="background-color:#edecec !important; clip: initial !important; display: inline !important; height:33% !important; opacity: 1 !important; visibility:visible !important; padding:0 !important; margin:0 !important; border:0 !important; border-top: 2px solid #fff !important; bottom:0 !important; left:0 !important; top:initial !important; width:100% !important; z-index:999999999 !important;min-height: 18em !important"></iframe></div>');
  // return htmlToElement('<iframe id="mtmDebugFrame" src="about:blank" frameborder="0" style="background-color:#edecec !important; clip: initial !important; display: inline !important; height:33% !important; opacity: 1 !important; visibility:visible !important; padding:0 !important; margin:0 !important; border:0 !important; border-top: 2px solid #fff !important; position:relative !important; bottom:0 !important; left:0 !important; top:initial !important; width:100% !important; z-index:999999999 !important;min-height: 18em !important"></iframe>');
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

    var debugPreviewDiv = createDebugFrame();
    previewFrame = debugPreviewDiv.getElementsByTagName('iframe')[0];
    document.body.appendChild(debugPreviewDiv);

    // previewFrame = createDebugFrame();
    // document.body.appendChild(previewFrame);

    var theDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;

    theDoc.open('text/html', 'replace');
    theDoc.write(theContent);
    theDoc.close();
    dragElement(document.getElementById("mtmDebugFrameWrapDiv"));
  }

  if (previewFrame && previewFrame.contentWindow) {
    window.mtmPreviewWindow = previewFrame.contentWindow;
  }
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    var topValue = (elmnt.offsetTop - pos2);
    console.log(topValue,'topValue');
    elmnt.style.top = ( topValue - 10 < 0 ? 10 : topValue + "px");
    // elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

renderPreviewFrame(/*!! previewContent */);
