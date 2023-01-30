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

    if ('object' !== typeof window.matomoPluginAsyncInit) {
        window.matomoPluginAsyncInit = [];
    }

    function executeCallbacks() {

        var i;
        for (i = 0; i < callbacks.callbacks.length; i++) {
            callbacks.callbacks[i]();
        }

        callbacks.callbacks = [];
    }

    window.matomoPluginAsyncInit.push(function () {
        libAvailable = true;
        executeCallbacks();
    });

    function checkLoadedAlready()
    {
        if (libAvailable || typeof window.Piwik === 'object') {
            libAvailable = true;
            libLoaded = true; // eg loaded by tests or manually by user
            executeCallbacks();
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

    function loadTracker(url, jsEndpoint)
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
            g.async=true; g.src=url+jsEndpoint; s.parentNode.insertBefore(g,s);
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
                    var trackerUrl = lastMatomoUrl + matomoConfig.trackingEndpoint;
                    if (matomoConfig.registerAsDefaultTracker) {
                        tracker = Piwik.addTracker(trackerUrl, matomoConfig.idSite);
                    } else {
                        tracker = Piwik.getTracker(trackerUrl, matomoConfig.idSite);
                    }
                    configuredTrackers[variableName] = tracker;

                    if (matomoConfig.requireCookieConsent) {
                      	tracker.requireCookieConsent();
                    }

                    if (matomoConfig.disableBrowserFeatureDetection && typeof tracker.disableBrowserFeatureDetection === 'function') {
                        tracker.disableBrowserFeatureDetection();
                    }

                    if (matomoConfig.disableCookies) {
                        tracker.disableCookies();
                    }

                    if (matomoConfig.enableCrossDomainLinking) {
                        tracker.enableCrossDomainLinking();
                    }

                    if (matomoConfig.cookieSameSite) {
                        tracker.setCookieSameSite(matomoConfig.cookieSameSite);
                    }

                    if (matomoConfig.setSecureCookie) {
                        tracker.setSecureCookie(true);
                    }

                    if (matomoConfig.cookiePath) {
                        tracker.setCookiePath(matomoConfig.cookiePath);
                    }


                    if (matomoConfig.cookieDomain) {
                        tracker.setCookieDomain(matomoConfig.cookieDomain);
                    }

                    if (matomoConfig.domains
                        && TagManager.utils.isArray(matomoConfig.domains)
                        && matomoConfig.domains.length) {
                        var domains = [];
                        var k, domainType;

                        for (k = 0; k < matomoConfig.domains.length; k++) {
                            var domainType = typeof matomoConfig.domains[k];
                            if (domainType === 'string') {
                                domains.push(matomoConfig.domains[k]);
                            } else if (domainType === 'object' && matomoConfig.domains[k].domain) {
                                domains.push(matomoConfig.domains[k].domain);
                            }
                        }

                        tracker.setDomains(domains);
                    }

                    if (matomoConfig.alwaysUseSendBeacon) {
                        tracker.alwaysUseSendBeacon();
                    }

                    if (matomoConfig.enableLinkTracking) {
                        tracker.enableLinkTracking();
                    }

                    if (matomoConfig.requireConsent) {
                        tracker.requireConsent();
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
                    if (matomoConfig.hasOwnProperty('enableFormAnalytics') && !matomoConfig.enableFormAnalytics && window.Matomo && window.Matomo.FormAnalytics && typeof window.Matomo.FormAnalytics.disableFormAnalytics === 'function') {
                        window.Matomo.FormAnalytics.disableFormAnalytics();
                    }
                    if (matomoConfig.hasOwnProperty('enableMediaAnalytics') && !matomoConfig.enableMediaAnalytics && window.Matomo && window.Matomo.MediaAnalytics && typeof window.Matomo.MediaAnalytics.disableMediaAnalytics === 'function') {
                        window.Matomo.MediaAnalytics.disableMediaAnalytics();
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
                    tracker.setTrackerUrl(possiblyUpdatedMatomoUrl + matomoConfig.trackingEndpoint);
                    lastIdSite = possiblyUpdatedMatomoUrl;
                }

                if (matomoConfig.customDimensions
                    && TagManager.utils.isArray(matomoConfig.customDimensions)
                    && matomoConfig.customDimensions.length) {
                    var dimIndex;
                    for (dimIndex = 0; dimIndex < matomoConfig.customDimensions.length; dimIndex++) {
                        var dimension = matomoConfig.customDimensions[dimIndex];
                        if (dimension && TagManager.utils.isObject(dimension) && dimension.index && (dimension.value || dimension.value === null)) {
                            tracker.setCustomDimension(dimension.index, dimension.value);
                        }
                    }
                }

                if (tracker) {
                    var trackingType = parameters.get('trackingType');

                    if (trackingType === 'pageview') {
                        var customTitle = parameters.get('documentTitle');
                        if (customTitle) {
                            tracker.setDocumentTitle(customTitle);
                        }
                        var customUrl = parameters.get('customUrl');
                        if (customUrl) {
                            tracker.setCustomUrl(customUrl);
                        }
                        if (matomoConfig.customCookieTimeOutEnable) {  
                            tracker.setVisitorCookieTimeout(matomoConfig.customCookieTimeOut * 86400);
                        }
                        tracker.trackPageView();
                    } else if (trackingType === 'event') {
                        tracker.trackEvent(parameters.get('eventCategory'), parameters.get('eventAction'), parameters.get('eventName'), parameters.get('eventValue'));
                    } else if (trackingType === 'goal') {
                        tracker.trackGoal(parameters.get('idGoal'), parameters.get('goalCustomRevenue'));
                    }
                }
            });

            // we load the matomo tracker only when the tag was fired
            // and we load it only after adding the callback, this way we make sure at least for the first matomo tag
            // to initialize the tracker during window.piwikPluginAsyncInit

            var matomoConfig = parameters.get('matomoConfig', {});
            if (matomoConfig.bundleTracker) {
                loadMatomo();
                // we don't return in case for some reason matomo was not loaded there, then we have the fallback
            }

            if (!matomoConfig.matomoUrl || !matomoConfig.idSite) {
                return;
            }

            var matomoUrl = getMatomoUrlFromConfig(matomoConfig);
            loadTracker(matomoUrl, matomoConfig.jsEndpoint);
        };
    };
})();
