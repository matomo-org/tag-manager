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

    // Make sure that window._paq always exists
    if (!window._paq) {
      window._paq = [];
    }
    // Store the initial state of window._paq so that we can apply it to all the configs
    // We use the stringify and parse to make sure that we have a copy and not a reference
    var localPaq = window._paq && window._paq.length ? JSON.parse(JSON.stringify(window._paq)) : localPaq || [];
    var indexesOfConfigs = [];
    // Clear window._paq to prevent things from being tracked too early
    while (window._paq.length > 0) {
        window._paq.pop();
    }

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

    function markIndexAsConfig(index)
    {
        if (index < 0) {
           return;
        }

        indexesOfConfigs.push(index);
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
                indexesOfConfigs = [];

                // we need to fetch matomoConfig again in case some parameters changed meanwhile that are variables...
                // eg userId might be a variable and it's value might be different now
                var matomoConfig = parameters.get('matomoConfig', {});
                var trackingEndpoint = matomoConfig.trackingEndpoint == 'custom' ? matomoConfig.trackingEndpointCustom : matomoConfig.trackingEndpoint;
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
                    var trackerUrl = lastMatomoUrl + trackingEndpoint;
                    if (matomoConfig.registerAsDefaultTracker) {
                        tracker = Piwik.addTracker(trackerUrl, matomoConfig.idSite);
                    } else {
                        tracker = Piwik.getTracker(trackerUrl, matomoConfig.idSite);
                    }
                    configuredTrackers[variableName] = tracker;

                    // NOTE: When a new config is created, it should probably be added to this list
                    // There might already be some configs missing from this list
                    var setUserIdIndex = setSiteIdIndex = setTrackerUrlIndex
                        = requireCookieConsentIndex = disableBrowserFeatureDetectionIndex
                        = disableCookiesIndex = enableCrossDomainLinkingIndex
                        = setCrossDomainLinkingTimeoutIndex = cookieSameSiteIndex
                        = setVisitorCookieTimeoutIndex = setReferralCookieTimeoutIndex
                        = setSessionCookieTimeoutIndex = setSecureCookieIndex = cookiePathIndex
                        = cookieNamePrefixIndex = cookieDomainIndex = setDomainsIndex
                        = alwaysUseSendBeaconIndex = disableAlwaysUseSendBeaconIndex
                        = setRequestMethodIndex = enableLinkTrackingIndex = enableFileTrackingIndex
                        = requireConsentIndex = enableDoNotTrackIndex
                        = disablePerformanceTrackingIndex = appendToTrackingUrlIndex
                        = setRequestContentTypeIndex = setCustomRequestProcessingIndex
                        = enableJSErrorTrackingIndex = enableHeartBeatTimerIndex
                        = trackAllContentImpressionsIndex = trackVisibleContentImpressionsIndex
                        = disableFormAnalyticsIndex = disableMediaAnalyticsIndex
                        = disableCampaignParametersIndex = -1;
                    for (k = 0; k < localPaq.length; k++) {
                        // This should only be an array. Skip if it's not
                        if (!TagManager.utils.isArray(localPaq[k])) {
                          continue;
                        }
                        var name = localPaq[k][0];
                        switch (name) {
                            case 'setUserId':
                                setUserIdIndex = k;
                                // Mark this one for removal right away since we don't want it to override the container
                                markIndexAsConfig(k);
                                break;
                            case 'setSiteId':
                                setSiteIdIndex = k;
                                // Mark this one for removal right away since we don't want it to override the container
                                markIndexAsConfig(k);
                                break;
                            case 'setTrackerUrl':
                                setTrackerUrlIndex = k;
                                // Mark this one for removal right away since we don't want it to override the container
                                markIndexAsConfig(k);
                                break;
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
                            case 'setCrossDomainLinkingTimeout':
                                setCrossDomainLinkingTimeoutIndex = k;
                                break;
                            case 'cookieSameSite':
                                cookieSameSiteIndex = k;
                                break;
                            case 'setVisitorCookieTimeout':
                                setVisitorCookieTimeoutIndex = k;
                                break;
                            case 'setReferralCookieTimeout':
                                setReferralCookieTimeoutIndex = k;
                                break;
                            case 'setSessionCookieTimeout':
                                setSessionCookieTimeoutIndex = k;
                                break;
                            case 'setSecureCookie':
                                setSecureCookieIndex = k;
                                break;
                            case 'cookiePath':
                                cookiePathIndex = k;
                                break;
                            case 'cookieNamePrefix':
                                cookieNamePrefixIndex = k;
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
                            case 'disableAlwaysUseSendBeacon':
                                disableAlwaysUseSendBeaconIndex = k;
                                break;
                            case 'enableLinkTracking':
                                enableLinkTrackingIndex = k;
                                break;
                            case 'enableFileTracking':
                                enableFileTrackingIndex = k;
                                break;
                            case 'requireConsent':
                                requireConsentIndex = k;
                                break;
                            case 'enableDoNotTrack':
                                enableDoNotTrackIndex = k;
                                break;
                            case 'disablePerformanceTracking':
                                disablePerformanceTrackingIndex = k;
                                break;
                            case 'appendToTrackingUrl':
                                appendToTrackingUrlIndex = k;
                                break;
                            case 'setRequestContentType':
                                setRequestContentTypeIndex = k;
                                break;
                            case 'setCustomRequestProcessing':
                                setCustomRequestProcessingIndex = k;
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
                            case 'disableCampaignParameters':
                                disableCampaignParametersIndex = k;
                                break;
                        }
                    }

                    if (matomoConfig.requireCookieConsent || requireCookieConsentIndex !== -1) {
                        tracker.requireCookieConsent();
                        markIndexAsConfig(requireCookieConsentIndex);
                    }

                    if ((matomoConfig.disableBrowserFeatureDetection || disableBrowserFeatureDetectionIndex !== -1) && typeof tracker.disableBrowserFeatureDetection === 'function') {
                        tracker.disableBrowserFeatureDetection();
                        markIndexAsConfig(disableBrowserFeatureDetectionIndex);
                    }

                    if (matomoConfig.requireConsentForCampaignTracking || disableCampaignParametersIndex !== -1) {
                        tracker.disableCampaignParameters();
                        markIndexAsConfig(disableCampaignParametersIndex);
                    }

                    if (matomoConfig.disableCookies || disableCookiesIndex !== -1) {
                        tracker.disableCookies();
                        markIndexAsConfig(disableCookiesIndex);
                    }

                    if (matomoConfig.enableCrossDomainLinking || enableCrossDomainLinkingIndex !== -1) {
                        tracker.enableCrossDomainLinking();
                        markIndexAsConfig(enableCrossDomainLinkingIndex);
                    }

                    if (setCrossDomainLinkingTimeoutIndex !== -1 && localPaq[setCrossDomainLinkingTimeoutIndex].length === 2) {
                        tracker.setCrossDomainLinkingTimeout(localPaq[setCrossDomainLinkingTimeoutIndex][1]);
                        markIndexAsConfig(setCrossDomainLinkingTimeoutIndex);
                    } else if (matomoConfig.enableCrossDomainLinking && matomoConfig.crossDomainLinkingTimeout) {
                        tracker.setCrossDomainLinkingTimeout(matomoConfig.crossDomainLinkingTimeout);
                    }

                    if (cookieSameSiteIndex !== -1 && localPaq[cookieSameSiteIndex].length === 2) {
                       tracker.setCookieSameSite(localPaq[cookieSameSiteIndex][1]);
                       markIndexAsConfig(cookieSameSiteIndex);
                    } else if (matomoConfig.cookieSameSite) {
                        tracker.setCookieSameSite(matomoConfig.cookieSameSite);
                    }

                    if (setVisitorCookieTimeoutIndex !== -1 && localPaq[setVisitorCookieTimeoutIndex].length === 2) {
                        tracker.setVisitorCookieTimeout(localPaq[setVisitorCookieTimeoutIndex][1]);
                        markIndexAsConfig(setVisitorCookieTimeoutIndex);
                    } else if (matomoConfig.customCookieTimeOutEnable) {
                        tracker.setVisitorCookieTimeout(matomoConfig.customCookieTimeOut * 86400);
                    }

                    if (setReferralCookieTimeoutIndex !== -1 && localPaq[setReferralCookieTimeoutIndex].length === 2) {
                        tracker.setReferralCookieTimeout(localPaq[setReferralCookieTimeoutIndex][1]);
                        markIndexAsConfig(setReferralCookieTimeoutIndex);
                    } else if (matomoConfig.customCookieTimeOutEnable) {
                        tracker.setReferralCookieTimeout(matomoConfig.referralCookieTimeOut * 86400);
                    }

                    if (setSessionCookieTimeoutIndex !== -1 && localPaq[setSessionCookieTimeoutIndex].length === 2) {
                        tracker.setSessionCookieTimeout(localPaq[setSessionCookieTimeoutIndex][1]);
                        markIndexAsConfig(setSessionCookieTimeoutIndex);
                    } else if (matomoConfig.customCookieTimeOutEnable) {
                        tracker.setSessionCookieTimeout(matomoConfig.sessionCookieTimeOut * 60);
                    }

                    if (matomoConfig.setSecureCookie || setSecureCookieIndex !== -1) {
                        tracker.setSecureCookie(true);
                        markIndexAsConfig(setSecureCookieIndex);
                    }

                    if (cookiePathIndex !== -1 && localPaq[cookiePathIndex].length === 2) {
                        tracker.setCookiePath(localPaq[cookiePathIndex][1]);
                        markIndexAsConfig(cookiePathIndex);
                    } else if (matomoConfig.cookiePath) {
                        tracker.setCookiePath(matomoConfig.cookiePath);
                    }

                    if (cookieNamePrefixIndex !== -1 && localPaq[cookieNamePrefixIndex].length === 2) {
                        tracker.setCookiePath(localPaq[cookieNamePrefixIndex][1]);
                        markIndexAsConfig(cookieNamePrefixIndex);
                    } else if (matomoConfig.cookieNamePrefix) {
                        tracker.setCookiePath(matomoConfig.cookieNamePrefix);
                    }

                    if (cookieDomainIndex !== -1 && localPaq[cookieDomainIndex].length === 2) {
                        tracker.setCookieDomain(localPaq[cookieDomainIndex][1]);
                        markIndexAsConfig(cookieDomainIndex);
                    } else if (matomoConfig.cookieDomain) {
                        tracker.setCookieDomain(matomoConfig.cookieDomain);
                    }

                    // If paq.push(['setDomains' has been called, override the Matomo config domains
                    if (setDomainsIndex !== -1 && localPaq[setDomainsIndex].length === 2) {
                        var domainsArray = localPaq[setDomainsIndex][1];
                        // It's valid to provide a string if there's only one domain
                        if (typeof localPaq[setDomainsIndex][1] === 'string') {
                            domainsArray = [localPaq[setDomainsIndex][1]];
                        }
                        if (TagManager.utils.isArray(domainsArray)) {
                            matomoConfig.domains = domainsArray;
                        }
                        markIndexAsConfig(setDomainsIndex);
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

                    if (matomoConfig.alwaysUseSendBeacon || alwaysUseSendBeaconIndex !== -1) {
                        tracker.alwaysUseSendBeacon();
                        markIndexAsConfig(alwaysUseSendBeaconIndex);
                    }

                    if (matomoConfig.disableAlwaysUseSendBeacon || disableAlwaysUseSendBeaconIndex !== -1) {
                        tracker.disableAlwaysUseSendBeacon();
                        markIndexAsConfig(disableAlwaysUseSendBeaconIndex);
                    }

                    if (appendToTrackingUrlIndex !== -1 && localPaq[appendToTrackingUrlIndex].length === 2
                        && typeof localPaq[appendToTrackingUrlIndex][1] === 'string'
                        && ['POST', 'GET'].includes(localPaq[appendToTrackingUrlIndex][1].toUpperCase())) {
                        tracker.setRequestMethod(localPaq[appendToTrackingUrlIndex][1]);
                        if (localPaq[appendToTrackingUrlIndex][1].toUpperCase() === 'POST'
                            && setRequestContentTypeIndex !== -1 && localPaq[setRequestContentTypeIndex].length === 2
                            && typeof localPaq[setRequestContentTypeIndex][1] === 'string' && localPaq[setRequestContentTypeIndex][1].length > 0) {
                            tracker.setRequestContentType(localPaq[setRequestContentTypeIndex][1]);
                            markIndexAsConfig(setRequestContentTypeIndex);
                        }
                        markIndexAsConfig(appendToTrackingUrlIndex);
                    } else if (matomoConfig.forceRequestMethod && typeof matomoConfig.requestMethod === 'string'
                        && ['POST', 'GET'].includes(matomoConfig.requestMethod.toUpperCase())) {
                        tracker.setRequestMethod(matomoConfig.requestMethod);
                        if(matomoConfig.requestMethod.toUpperCase() === 'POST'){
                            tracker.setRequestContentType(matomoConfig.requestContentType);
                        }
                    }

                    if (matomoConfig.enableLinkTracking || enableLinkTrackingIndex !== -1) {
                        tracker.enableLinkTracking();
                        markIndexAsConfig(enableLinkTrackingIndex);
                    }

                    if (matomoConfig.enableFileTracking || enableFileTrackingIndex !== -1) {
                        tracker.enableFileTracking();
                        markIndexAsConfig(enableFileTrackingIndex);
                    }

                    if (matomoConfig.requireConsent || requireConsentIndex !== -1) {
                        tracker.requireConsent();
                        markIndexAsConfig(requireConsentIndex);
                    }

                    if (matomoConfig.enableDoNotTrack || enableDoNotTrackIndex !== -1) {
                        tracker.setDoNotTrack(1);
                        markIndexAsConfig(enableDoNotTrackIndex);
                    }

                    if (matomoConfig.disablePerformanceTracking || disablePerformanceTrackingIndex !== -1) {
                        tracker.disablePerformanceTracking();
                        markIndexAsConfig(disablePerformanceTrackingIndex);
                    }

                    if (appendToTrackingUrlIndex !== -1 && localPaq[appendToTrackingUrlIndex].length === 2
                        && typeof localPaq[appendToTrackingUrlIndex][1] === 'string' && localPaq[appendToTrackingUrlIndex][1].length > 0) {
                        tracker.appendToTrackingUrl(localPaq[appendToTrackingUrlIndex][1]);
                       markIndexAsConfig(appendToTrackingUrlIndex);
                    } else if (typeof matomoConfig.appendToTrackingUrl === 'string' && matomoConfig.appendToTrackingUrl.length > 0) {
                        tracker.appendToTrackingUrl(matomoConfig.appendToTrackingUrl);
                    }

                    if (setCustomRequestProcessingIndex !== -1 && localPaq[setCustomRequestProcessingIndex].length === 2
                        && typeof localPaq[setCustomRequestProcessingIndex][1] === 'function' && localPaq[setCustomRequestProcessingIndex][1].length >= 1) {
                        tracker.setCustomRequestProcessing(localPaq[setCustomRequestProcessingIndex][1]);
                        markIndexAsConfig(setCustomRequestProcessingIndex);
                    } else if(typeof matomoConfig.customRequestProcessing === 'function' && matomoConfig.customRequestProcessing.length >= 1) {
                        tracker.setCustomRequestProcessing(matomoConfig.customRequestProcessing);
                    }

                    if (matomoConfig.enableJSErrorTracking || enableJSErrorTrackingIndex !== -1) {
                        tracker.enableJSErrorTracking();
                        markIndexAsConfig(enableJSErrorTrackingIndex);
                    }

                    if (matomoConfig.enableHeartBeatTimer || enableHeartBeatTimerIndex !== -1) {
                        if (enableHeartBeatTimerIndex !== -1 && localPaq[enableHeartBeatTimerIndex].length === 2) {
                            tracker.enableHeartBeatTimer(localPaq[enableHeartBeatTimerIndex][1]);
                        } else if (matomoConfig.heartBeatTime) {
                            tracker.enableHeartBeatTimer(matomoConfig.heartBeatTime);
                        } else {
                            tracker.enableHeartBeatTimer();
                        }
                        markIndexAsConfig(enableHeartBeatTimerIndex);
                    }

                    if (matomoConfig.trackAllContentImpressions || trackAllContentImpressionsIndex !== -1) {
                        tracker.trackAllContentImpressions();
                        markIndexAsConfig(trackAllContentImpressionsIndex);
                    }

                    if (matomoConfig.trackVisibleContentImpressions || trackVisibleContentImpressionsIndex !== -1) {
                        tracker.trackVisibleContentImpressions();
                        markIndexAsConfig(trackVisibleContentImpressionsIndex);
                    }

                    if (((matomoConfig.hasOwnProperty('enableFormAnalytics') && !matomoConfig.enableFormAnalytics) || disableFormAnalyticsIndex !== -1) && window.Matomo && window.Matomo.FormAnalytics && typeof window.Matomo.FormAnalytics.disableFormAnalytics === 'function') {
                        window.Matomo.FormAnalytics.disableFormAnalytics();
                        markIndexAsConfig(disableFormAnalyticsIndex);
                    }

                    if (((matomoConfig.hasOwnProperty('enableMediaAnalytics') && !matomoConfig.enableMediaAnalytics) || disableMediaAnalyticsIndex !== -1) && window.Matomo && window.Matomo.MediaAnalytics && typeof window.Matomo.MediaAnalytics.disableMediaAnalytics === 'function') {
                        window.Matomo.MediaAnalytics.disableMediaAnalytics();
                        markIndexAsConfig(disableMediaAnalyticsIndex);
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
                    tracker.setTrackerUrl(possiblyUpdatedMatomoUrl + trackingEndpoint);
                    lastIdSite = possiblyUpdatedMatomoUrl;
                }

                // Add any custom dimensions added to _paq to the collection
                if (setCustomDimensionIndexes.length) {
                    if (!matomoConfig.customDimensions
                        || !TagManager.utils.isArray(matomoConfig.customDimensions)) {
                        matomoConfig.customDimensions = [];
                    }
                    for (indexIndex = 0; indexIndex < setCustomDimensionIndexes.length; indexIndex++) {
                        var customDim = localPaq[setCustomDimensionIndexes[indexIndex]];
                        if (TagManager.utils.isArray(customDim) && customDim.length === 3) {
                            matomoConfig.customDimensions.push({
                                index: customDim[1],
                                value: customDim[2],
                            });
                        }
                        markIndexAsConfig(setCustomDimensionIndexes[indexIndex]);
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

                // If the remaining _paq values haven't been processed yet, process them
                // We wait till now so that all configs are applied first
                var applyRemainingPaqEntries = parameters.get('applyRemainingPaqEntries', false);
                if (!hasProcessedRemainingTrackings && localPaq.length > indexesOfConfigs.length && applyRemainingPaqEntries) {
                    hasProcessedRemainingTrackings = true;
                    for (trackingIndex = 0; trackingIndex < localPaq.length; trackingIndex++) {
                        // Skip config items since they've already been processed
                        if (indexesOfConfigs.indexOf(trackingIndex) >= 0) {
                            continue;
                        }

                        window._paq.push(localPaq[trackingIndex]);
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

                        if (parameters.get('isEcommerceView')) {
                            tracker.setEcommerceView(parameters.get('productSKU'), parameters.get('productName'), parameters.get('categoryName'), parameters.get('price'));
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
            var jsEndpoint = matomoConfig.jsEndpoint == 'custom' ? matomoConfig.jsEndpointCustom : matomoConfig.jsEndpoint;
            loadTracker(matomoUrl, jsEndpoint);
        };
    };
})();
