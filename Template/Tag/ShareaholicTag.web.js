(function () {
    return function (parameters, TagManager) {
        this.fire = function () {
            var siteId = parameters.get('shareaholicSiteId');
            if (siteId) {
                // should result in a <script> like this:
                // <script type="text/javascript" data-cfasync="false" src="//apps.shareaholic.com/assets/pub/shareaholic.js" data-shr-siteid="[SITEID]" async="async"></script>

                var script = document.createElement('script');
                var s = document.getElementsByTagName('script')[0];
                script.type = 'text/javascript';
                script.async = true;
                script.setAttribute('data-cfasync', 'false');
                script.setAttribute('data-shr-siteid', siteId);
                script.src = '//apps.shareaholic.com/assets/pub/shareaholic.js';
                s.parentNode.insertBefore(script, s);
            }
        };
    };
})();
