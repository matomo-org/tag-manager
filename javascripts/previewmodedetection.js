if ((document.cookie.indexOf('$cookieId') !== -1 && window.location.search.indexOf('&$urlParamDisableId') === -1 && window.location.search.indexOf('?$urlParamDisableId') === -1) || window.location.search.indexOf('&$urlParamEnabledId') !== -1 || window.location.search.indexOf('?$urlParamEnabledId') !== -1) {
    var rand = Math.floor(Math.random() * 999999998) + 1;
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=false; g.defer=false; g.src='$previewUrl?rand=' + rand; s.parentNode.insertBefore(g,s);
    return;
}