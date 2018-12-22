(function () {
    return function (parameters, TagManager) {
        this.fire = function () {
            var siteID = parameters.get('siteID');
            var fathomURL = parameters.get('fathomURL');
            if (siteID && fathomURL && typeof window.fathom === "undefined") {
                (function () {
                    window.fathom = window.fathom || function () {
                        (window.fathom.q = window.fathom.q || []).push(arguments)
                    };
                    var script = document.createElement('script');
                    var firstScript = document.getElementsByTagName('script')[0];
                    script.async = true;
                    if (!fathomURL.endsWith("/")) {
                        fathomURL += "/"
                    }
                    script.src = fathomURL + "tracker.js";
                    script.id = 'fathom-script';
                    firstScript.parentNode.insertBefore(script, firstScript);
                })();
                fathom('set', 'siteId', siteID);
                fathom('trackPageview');
            }
        };
    };
})();
