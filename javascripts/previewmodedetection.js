var mtmPreviewCookieMatch = document.cookie.match(/(?:^|;\s*)mtmPreviewMode=([^;]*)/);
var mtmHasPreviewCookie = !!mtmPreviewCookieMatch && ('%3A' + mtmPreviewCookieMatch[1] + '%3A').indexOf('%3A$cookieId%3A') !== -1;
if ((mtmHasPreviewCookie && window.location.href.indexOf('&$urlParamDisableId') === -1 && window.location.href.indexOf('?$urlParamDisableId') === -1) || window.location.href.indexOf('&$urlParamEnabledId') !== -1 || window.location.href.indexOf('?$urlParamEnabledId') !== -1) {

    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=false; g.defer=false; g.src='$previewUrl'; s.parentNode.insertBefore(g,s);
    return;
}
