(function () {
    return function (parameters, TagManager) {
        this.fire = function () {
            var partnerId = parameters.get('partnerId');
            var conversionId = parameters.get('conversionId');

            if (!partnerId) {
                return;
            }

            window._linkedin_partner_id = partnerId;
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];

            if (window._linkedin_data_partner_ids.indexOf(partnerId) === -1) {
                window._linkedin_data_partner_ids.push(partnerId);
            }

            // Queue LinkedIn tracking calls until the library is ready
            window.lintrk = window.lintrk || function (a, b) {
                window.lintrk.q.push([a, b]);
            };
            window.lintrk.q = window.lintrk.q || [];

            // Fire conversion immediately (will be queued if script isn't ready)
            if (conversionId) {
                window.lintrk('track', {
                    conversion_id: conversionId
                });
            }

            // Load the LinkedIn Insight script only once
             if (!window._mtmLinkedInInsightLoaded) {
                window._mtmLinkedInInsightLoaded = true;
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");

                b.type = "text/javascript";
                b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";

                s.parentNode.insertBefore(b, s);
            }
        };
    };
})();
