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
    // Store the initial state of window._paq so that we can apply it to all of the configs
    var initialPaq = window._paq && window._paq.length ? JSON.parse(JSON.stringify(window._paq)) : initialPaq || [];
    // Clear window._paq to prevent things from being tracked too early
    window._paq = [];

    var hasProcessedRemainingTrackings = false;

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
        var replaceMeWithTracker=''; // do not modify this line, be replaced with Matomo tracker. Cannot use !! comment because of Jshrink bug
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

                var setCustomDimensionIndexes = [];
                var indexesToRemove = [];
                var _paq = JSON.parse(JSON.stringify(initialPaq));

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

                    var requireCookieConsentIndex = disableBrowserFeatureDetectionIndex
                        = disableCookiesIndex = enableCrossDomainLinkingIndex = cookieSameSiteIndex
                        = setSecureCookieIndex = cookiePathIndex = cookieDomainIndex
                        = setDomainsIndex = alwaysUseSendBeaconIndex = enableLinkTrackingIndex
                        = requireConsentIndex = enableDoNotTrackIndex = enableJSErrorTrackingIndex
                        = enableHeartBeatTimerIndex = trackAllContentImpressionsIndex
                        = trackVisibleContentImpressionsIndex = disableFormAnalyticsIndex
                        = disableMediaAnalyticsIndex = -1;
                    for (k = 0; k < _paq.length; k++) {
                        // This should only be an array. Skip if it's not
                        if (!TagManager.utils.isArray(_paq[k])) {
                            continue;
                        }
                        var name = _paq[k][0];
                        switch (name) {
                            case 'requireCookieConsent':
                                requireCookieConsentIndex = k;
                                break;
                            case 'disableBrowserFeatureDetection':
                                disableBrowserFeatureDetectionIndex = k;
                                break;
                            case 'disableCookies':
                                disableCookiesIndex = k;
                                break;
                            case 'enableCrossDomainLinking':
                                enableCrossDomainLinkingIndex = k;
                                break;
                            case 'cookieSameSite':
                                cookieSameSiteIndex = k;
                                break;
                            case 'setSecureCookie':
                                setSecureCookieIndex = k;
                                break;
                            case 'cookiePath':
                                cookiePathIndex = k;
                                break;
                            case 'cookieDomain':
                                cookieDomainIndex = k;
                                break;
                            case 'setDomains':
                                setDomainsIndex = k;
                                break;
                            case 'alwaysUseSendBeacon':
                                alwaysUseSendBeaconIndex = k;
                                break;
                            case 'enableLinkTracking':
                                enableLinkTrackingIndex = k;
                                break;
                            case 'requireConsent':
                                requireConsentIndex = k;
                                break;
                            case 'enableDoNotTrack':
                                enableDoNotTrackIndex = k;
                                break;
                            case 'enableJSErrorTracking':
                                enableJSErrorTrackingIndex = k;
                                break;
                            case 'enableHeartBeatTimer':
                                enableHeartBeatTimerIndex = k;
                                break;
                            case 'trackAllContentImpressions':
                                trackAllContentImpressionsIndex = k;
                                break;
                            case 'trackVisibleContentImpressions':
                                trackVisibleContentImpressionsIndex = k;
                                break;
                            case 'FormAnalytics::disable':
                            case 'FormAnalytics::disableFormAnalytics':
                            case 'FormAnalytics.disableFormAnalytics':
                            case 'disableFormAnalytics':
                                disableFormAnalyticsIndex = k;
                                break;
                            case 'MediaAnalytics::disable':
                            case 'MediaAnalytics::disableMediaAnalytics':
                            case 'MediaAnalytics.disableMediaAnalytics':
                            case 'disableMediaAnalytics':
                                disableMediaAnalyticsIndex = k;
                                break;
                            case 'setCustomDimension':
                                // There could be multiple, so let's push the indexes onto an array
                                setCustomDimensionIndexes.push(k);
                                break;
                        }
                    }

                    if (matomoConfig.requireCookieConsent) {
                      	tracker.requireCookieConsent();
                    }
                    if (requireCookieConsentIndex !== -1) {
                        tracker.requireCookieConsent();
                        indexesToRemove.push(requireCookieConsentIndex);
                    }

                    if (matomoConfig.disableBrowserFeatureDetection && typeof tracker.disableBrowserFeatureDetection === 'function') {
                        tracker.disableBrowserFeatureDetection();
                    }
                    if (disableBrowserFeatureDetectionIndex !== -1) {
                        tracker.disableBrowserFeatureDetection();
                        indexesToRemove.push(disableBrowserFeatureDetectionIndex);
                    }

                    if (matomoConfig.disableCookies) {
                        tracker.disableCookies();
                    }
                    if (disableCookiesIndex !== -1) {
                        tracker.disableCookies();
                        indexesToRemove.push(disableCookiesIndex);
                    }

                    if (matomoConfig.enableCrossDomainLinking) {
                        tracker.enableCrossDomainLinking();
                    }
                    if (enableCrossDomainLinkingIndex !== -1) {
                        tracker.enableCrossDomainLinking();
                        indexesToRemove.push(enableCrossDomainLinkingIndex);
                    }

                    if (matomoConfig.cookieSameSite) {
                        tracker.setCookieSameSite(matomoConfig.cookieSameSite);
                    }
                    if (cookieSameSiteIndex !== -1 && _paq[cookieSameSiteIndex].length === 2) {
                        tracker.setCookieSameSite(_paq[cookieSameSiteIndex][1]);
                        indexesToRemove.push(cookieSameSiteIndex);
                    }

                    if (matomoConfig.setSecureCookie) {
                        tracker.setSecureCookie(true);
                    }
                    if (setSecureCookieIndex !== -1) {
                        tracker.setSecureCookie(true);
                        indexesToRemove.push(setSecureCookieIndex);
                    }

                    if (matomoConfig.cookiePath) {
                        tracker.setCookiePath(matomoConfig.cookiePath);
                    }
                    if (cookiePathIndex !== -1 && _paq[cookiePathIndex].length === 2) {
                        tracker.setCookiePath(_paq[cookiePathIndex][1]);
                        indexesToRemove.push(cookiePathIndex);
                    }

                    if (matomoConfig.cookieDomain) {
                        tracker.setCookieDomain(matomoConfig.cookieDomain);
                    }
                    if (cookieDomainIndex !== -1 && _paq[cookieDomainIndex].length === 2) {
                        tracker.setCookieDomain(_paq[cookieDomainIndex][1]);
                        indexesToRemove.push(cookieDomainIndex);
                    }

                    // If paq.push(['setDomains' has been called, override the Matomo config domains
                    if (setDomainsIndex !== -1 && _paq[setDomainsIndex].length === 2) {
                        var domainsArray = _paq[setDomainsIndex][1];
                        // It's valid to provide a string if there's only one domain
                        if (typeof _paq[setDomainsIndex][1] === 'string') {
                            domainsArray = [_paq[setDomainsIndex][1]];
                        }
                        if (TagManager.utils.isArray(domainsArray)) {
                            matomoConfig.domains = domainsArray;
                        }
                        indexesToRemove.push(setDomainsIndex);
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
                    if (alwaysUseSendBeaconIndex !== -1) {
                        tracker.alwaysUseSendBeacon();
                        indexesToRemove.push(alwaysUseSendBeaconIndex);
                    }

                    if (matomoConfig.enableLinkTracking) {
                        tracker.enableLinkTracking();
                    }
                    if (enableLinkTrackingIndex !== -1) {
                        tracker.enableLinkTracking();
                        indexesToRemove.push(enableLinkTrackingIndex);
                    }

                    if (matomoConfig.requireConsent) {
                        tracker.requireConsent();
                    }
                    if (requireConsentIndex !== -1) {
                        tracker.requireConsent();
                        indexesToRemove.push(requireConsentIndex);
                    }

                    if (matomoConfig.enableDoNotTrack) {
                        tracker.setDoNotTrack(1);
                    }
                    if (enableDoNotTrackIndex !== -1) {
                        tracker.setDoNotTrack(1);
                        indexesToRemove.push(enableDoNotTrackIndex);
                    }

                    if (matomoConfig.enableJSErrorTracking) {
                        tracker.enableJSErrorTracking();
                    }
                    if (enableJSErrorTrackingIndex !== -1) {
                        tracker.enableJSErrorTracking();
                        indexesToRemove.push(enableJSErrorTrackingIndex);
                    }

                    if (matomoConfig.enableHeartBeatTimer) {
                        tracker.enableHeartBeatTimer();
                    }
                    if (enableHeartBeatTimerIndex !== -1) {
                        tracker.enableHeartBeatTimer();
                        indexesToRemove.push(enableHeartBeatTimerIndex);
                    }

                    if (matomoConfig.trackAllContentImpressions) {
                        tracker.trackAllContentImpressions();
                    }
                    if (trackAllContentImpressionsIndex !== -1) {
                        tracker.trackAllContentImpressions();
                        indexesToRemove.push(trackAllContentImpressionsIndex);
                    }

                    if (matomoConfig.trackVisibleContentImpressions) {
                        tracker.trackVisibleContentImpressions();
                    }
                    if (trackVisibleContentImpressionsIndex !== -1) {
                        tracker.trackVisibleContentImpressions();
                        indexesToRemove.push(trackVisibleContentImpressionsIndex);
                    }

                    if (matomoConfig.hasOwnProperty('enableFormAnalytics') && !matomoConfig.enableFormAnalytics && window.Matomo && window.Matomo.FormAnalytics && typeof window.Matomo.FormAnalytics.disableFormAnalytics === 'function') {
                        window.Matomo.FormAnalytics.disableFormAnalytics();
                    }
                    if (disableFormAnalyticsIndex !== -1 && window.Matomo && window.Matomo.FormAnalytics && typeof window.Matomo.FormAnalytics.disableFormAnalytics === 'function') {
                        window.Matomo.FormAnalytics.disableFormAnalytics();
                        indexesToRemove.push(disableFormAnalyticsIndex);
                    }

                    if (matomoConfig.hasOwnProperty('enableMediaAnalytics') && !matomoConfig.enableMediaAnalytics && window.Matomo && window.Matomo.MediaAnalytics && typeof window.Matomo.MediaAnalytics.disableMediaAnalytics === 'function') {
                        window.Matomo.MediaAnalytics.disableMediaAnalytics();
                    }
                    if (disableMediaAnalyticsIndex !== -1 && window.Matomo && window.Matomo.MediaAnalytics && typeof window.Matomo.MediaAnalytics.disableMediaAnalytics === 'function') {
                        window.Matomo.MediaAnalytics.disableMediaAnalytics();
                        indexesToRemove.push(disableMediaAnalyticsIndex);
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

                // Add any custom dimensions added to _paq to the collection
                if (setCustomDimensionIndexes.length) {
                    if (!matomoConfig.customDimensions
                        || !TagManager.utils.isArray(matomoConfig.customDimensions)) {
                        matomoConfig.customDimensions = [];
                    }
                    for (indexIndex = 0; indexIndex < setCustomDimensionIndexes.length; indexIndex++) {
                        var customDim = _paq[setCustomDimensionIndexes[indexIndex]];
                        if (TagManager.utils.isArray(customDim) && customDim.length === 3) {
                            matomoConfig.customDimensions.push({
                                index: customDim[1],
                                value: customDim[2],
                            });
                        }
                        indexesToRemove.push(setCustomDimensionIndexes[indexIndex]);
                    }
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

                // Sort the indexes greatest to least so that removing one won't affect the others
                indexesToRemove.sort().reverse();
                var arrayLength = indexesToRemove.length;
                for (indexRemove = 0; indexRemove < arrayLength; indexRemove++) {
                    _paq.splice(indexesToRemove[indexRemove], 1);
                }

                // If the remaining _paq values haven't been processed yet, process them
                // We wait till now so that all configs are applied first
                if (!hasProcessedRemainingTrackings && _paq.length) {
                    hasProcessedRemainingTrackings = true;
                    for (trackingIndex = 0; trackingIndex < _paq.length; trackingIndex++) {
                        window._paq.push(_paq[trackingIndex]);
                    }
                }

                /*
                * TODO - process the remaining _paq elements similar to below. Make sure to account
                * for multiple trackers. AKA only process things once instead of per tracker like
                * the configs above
                */
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
