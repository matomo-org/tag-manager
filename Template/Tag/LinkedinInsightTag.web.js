(function () {
    return function (parameters, TagManager) {
        this.fire = function () {
            var partnerId = parameters.get('partnerId');
            var conversionId = parameters.get('conversionId');
            if (partnerId) {
                window._linkedin_partner_id = partnerId;
                window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
                window._linkedin_data_partner_ids.push(window._linkedin_partner_id);
                if (conversionId) {
                    window._linkedin_data_conversion_id = conversionId;
                }
                (function(){
                    var s = document.getElementsByTagName("script")[0];
                    var b = document.createElement("script");
                    b.type = "text/javascript";b.async = true;
                    b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                    s.parentNode.insertBefore(b, s);
                })();
            }
        };
    };
})();
