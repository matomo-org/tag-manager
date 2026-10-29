/*
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

// several mtmPreviewMode cookies can exist when they were set on different paths, so check all of them
var mtmPreviewCookieRegex = /(?:^|;\s*)mtmPreviewMode=([^;]*)/g, mtmPreviewCookieMatch, mtmHasPreviewCookie = false;
while (!mtmHasPreviewCookie && (mtmPreviewCookieMatch = mtmPreviewCookieRegex.exec(document.cookie)) !== null) {
    mtmHasPreviewCookie = ('%3A' + mtmPreviewCookieMatch[1] + '%3A').indexOf('%3A$cookieId%3A') !== -1;
}
if ((mtmHasPreviewCookie && window.location.href.indexOf('&$urlParamDisableId') === -1 && window.location.href.indexOf('?$urlParamDisableId') === -1) || window.location.href.indexOf('&$urlParamEnabledId') !== -1 || window.location.href.indexOf('?$urlParamEnabledId') !== -1) {

    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=false; g.defer=false; g.src='$previewUrl'; s.parentNode.insertBefore(g,s);
    return;
}
