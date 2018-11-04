(function () {

    var libLoaded = false;
    var libAvailable = false;
    var callbacks = {
        callbacks: [],
        push: function (callback) {
            if (libAvailable) {
                callback();
            } else {
                this.callbacks.push(callback);
            }
        }
    };

    window._paq = window._paq || [];

    if ('object' !== typeof window.piwikPluginAsyncInit) {
        window.piwikPluginAsyncInit = [];
    }

    window.piwikPluginAsyncInit.push(function () {
        libAvailable = true;

        var i;
        for (i = 0; i < callbacks.callbacks.length; i++) {
            callbacks.callbacks[i]();
        }
    });

    function checkLoadedAlready()
    {
        if (libAvailable || typeof window.Piwik === 'object') {
            libAvailable = true;
            libLoaded = true; // eg loaded by tests or manually by user
            return true;
        }
        return false;
    }

    function loadMatomo() {
        if (checkLoadedAlready()) {
            return;
        }
        var replaceMeWithTracker=''; // do not modify this line, be replaced with Matomo tracker. Cannot use /*!! comment because of Jshrink bug
        libAvailable = typeof window.Piwik !== 'undefined' || typeof window.Matomo !== 'undefined';
        libLoaded = libAvailable;
    }

    function loadTracker(url)
    {
        if (checkLoadedAlready()) {
            return;
        }
        if (!libLoaded) {
            // we can load the lib only once... if user tries configures different Matomo instances where they have
            // different piwik.js , this will be a known problem (eg some other instance has maybe additional 3rd party plugin)
            // installed which another doesn't have.
            libLoaded = true;
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.type='text/javascript'; g.async=true; g.defer=true; g.src=url+'piwik.js'; s.parentNode.insertBefore(g,s);
        }
    }

    var configuredTrackers = {};

    return function (parameters, TagManager) {
        var lastUserId;
        var lastIdSite;
        var lastMatomoUrl;

        function getMatomoUrlFromConfig(matomoConfig)
        {
            var matomoUrl = matomoConfig.matomoUrl;
            if (matomoUrl && String(matomoUrl).substr(-1, 1) !== '/') {
                matomoUrl += '/';
            }
            return matomoUrl;
        }

        this.fire = function () {
            callbacks.push(function () {
                if (!parameters.matomoConfig || !parameters.matomoConfig.name) {
                    return;
                }

                // this is the matomoConfig variable name and the only way to differentiate two different tracker
                // configurations
                var variableName = parameters.matomoConfig.name;
                
                // we need to fetch matomoConfig again in case some parameters changed meanwhile that are variables...
                // eg userId might be a variable and it's value might be different now
                var matomoConfig = parameters.get('matomoConfig', {});
                var tracker;
                // we make sure to not update jsonConfig even when the configured values change... otherwise we would create
                // randomly too many trackers when eg userId changes meanwhile etc
                if (variableName in configuredTrackers) {
                    tracker = configuredTrackers[variableName];
                } else {
                    // we need to set it up manually and make sure we call methods in correct order because there could be
                    // lots of different trackers configured either for different matomo URLs, for different matomo Ids
                    lastIdSite = matomoConfig.idSite;
                    // but even two or more different configs for the same Matomo URL & idSite
                    lastMatomoUrl = getMatomoUrlFromConfig(matomoConfig);
                    var trackerUrl = lastMatomoUrl + 'piwik.php';
                    tracker = Piwik.addTracker(trackerUrl, matomoConfig.idSite);
                    configuredTrackers[variableName] = tracker;

                    if (matomoConfig.disableCookies) {
                        tracker.disableCookies();
                    }

                    if (matomoConfig.enableCrossDomainLinking) {
                        tracker.enableCrossDomainLinking();
                    }

                    if (matomoConfig.cookieDomain) {
                        tracker.setCookieDomain(matomoConfig.cookieDomain);
                    }

                    if (matomoConfig.cookiePath) {
                        tracker.setCookiePath(matomoConfig.cookiePath);
                    }

                    if (matomoConfig.enableLinkTracking) {
                        tracker.enableLinkTracking();
                    }
                    if (matomoConfig.enableDoNotTrack) {
                        tracker.setDoNotTrack(1);
                    }
                    if (matomoConfig.enableJSErrorTracking) {
                        tracker.enableJSErrorTracking();
                    }
                    if (matomoConfig.enableHeartBeatTimer) {
                        tracker.enableHeartBeatTimer();
                    }
                    if (matomoConfig.trackAllContentImpressions) {
                        tracker.trackAllContentImpressions();
                    }
                    if (matomoConfig.trackVisibleContentImpressions) {
                        tracker.trackVisibleContentImpressions();
                    }
                }

                if ((matomoConfig.userId || tracker.getUserId()) && lastUserId !== matomoConfig.userId) {
                    // we also go in here if a userId is set currently, and we now need to unset it
                    // might change each time this method is called
                    tracker.setUserId(matomoConfig.userId);
                    lastUserId = matomoConfig.userId;
                }

                if (matomoConfig.idSite && lastIdSite !== matomoConfig.idSite) {
                    // might change each time this method is called
                    tracker.setSiteId(matomoConfig.idSite);
                    lastIdSite = matomoConfig.idSite;
                }

                var possiblyUpdatedMatomoUrl = getMatomoUrlFromConfig(matomoConfig);
                if (possiblyUpdatedMatomoUrl && lastMatomoUrl !== possiblyUpdatedMatomoUrl) {
                    // might change each time this method is called
                    tracker.setTrackerUrl(possiblyUpdatedMatomoUrl + 'piwik.php');
                    lastIdSite = possiblyUpdatedMatomoUrl;
                }

                if (matomoConfig.customDimensions
                    && TagManager.utils.isArray(matomoConfig.customDimensions)
                    && matomoConfig.customDimensions.length) {
                    var dimIndex;
                    for (dimIndex = 0; dimIndex < matomoConfig.customDimensions.length; dimIndex++) {
                        var dimension = matomoConfig.customDimensions[dimIndex];
                        if (dimension && TagManager.utils.isObject(dimension) && dimension.index && dimension.value) {
                            tracker.setCustomDimension(dimension.index, dimension.value);
                        }
                    }
                }

                if (tracker) {
                    var trackingType = parameters.get('trackingType');

                    if (trackingType === 'pageview') {
                        tracker.trackPageView();
                    } else if (trackingType === 'event') {
                        tracker.trackEvent(parameters.get('eventCategory'), parameters.get('eventAction'), parameters.get('eventName'), parameters.get('eventValue'));
                    } else if (trackingType === 'goal') {
                        tracker.trackGoal(parameters.get('idGoal'));
                    }
                }
            });
        };

        var matomoConfig = parameters.get('matomoConfig', {});
        if (matomoConfig.bundleTracker) {
            loadMatomo();
            // we don't return in case for some reason matomo was not loaded there, then we have the fallback
        }

        if (!matomoConfig.matomoUrl || !matomoConfig.idSite) {
            return;
        }

        var matomoUrl = getMatomoUrlFromConfig(matomoConfig);
        loadTracker(matomoUrl);
    };
})();