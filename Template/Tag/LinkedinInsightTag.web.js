(function () {
    return function (parameters, TagManager) {
        this.fire = function () {
            var linkedinInsight = parameters.linkedinInsight;
            if (linkedinInsight) {
                window._linkedin_data_partner_id = linkedinInsight;
                (function () {
                    var s = document.getElementsByTagName("script")[0];
                    var b = document.createElement("script");
                    b.type = "text/javascript";
                    b.async = true;
                    b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                    s.parentNode.insertBefore(b, s);
                })();
            }
        };
    };
})();
