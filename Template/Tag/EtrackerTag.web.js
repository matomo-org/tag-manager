(function () {
    var hasBeenLoaded = false;
    return function (parameters, TagManager) {
        this.fire = function () {
        var etrackerConfig = parameters.get('etrackerConfig', {});
        var trackingType = parameters.get('trackingType');
        var etrackerID = etrackerConfig.etrackerID;
        var etrackerBlockCookies = etrackerConfig.etrackerBlockCookies;
        
        if (trackingType === 'pageview') {
            // Pageview parameters for overwrite
            for (var i in etrackerConfig) {
                if (TagManager.utils.hasProperty(etrackerConfig, i)) {
                    if(i.startsWith('et_')){
                        window[i] = etrackerConfig[i];
                    }
                }
            }
            // Custom Dimensions
            if (etrackerConfig.customDimensions
                && TagManager.utils.isArray(etrackerConfig.customDimensions)
                && etrackerConfig.customDimensions.length) {
                var dimIndex;
                for (dimIndex = 0; dimIndex < etrackerConfig.customDimensions.length; dimIndex++) {
                    var dimension = etrackerConfig.customDimensions[dimIndex];
                    if (dimension && TagManager.utils.isObject(dimension) && dimension.index && dimension.value) {
                        window[dimension.index] = dimension.value;
                    }
                }
            }
        }

        if (!hasBeenLoaded && etrackerID) {
            hasBeenLoaded = true;
            // Pageview script
            var s = document.getElementsByTagName('script')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.setAttribute('data-secure-code', etrackerID);
            script.setAttribute('id', '_etLoader');
            script.setAttribute('charset', 'UTF-8');
            script.setAttribute('data-block-cookies', etrackerBlockCookies);
            if (etrackerConfig.etrackerDNT) {
                script.setAttribute('data-respect-dnt', 'true');
            }
            script.src = '//static.etracker.com/code/e.js';
            s.parentNode.insertBefore(script, s);
         }
        if (trackingType === 'wrapper' && typeof(_etracker) === "object") {
            var wrapperjson = '{et_et: '+etrackerID+',et_pagename:'+parameters.get('etrackerWrapperPagename');
            if(!empty(parameters.get('etrackerWrapperArea')){
               wrapperjson = wrapperjson+',et_areas:'+parameters.get('etrackerWrapperArea');
            }
            if(!empty(parameters.get('etrackerWrapperTarget')){
               wrapperjson = wrapperjson+',et_target:'+parameters.get('etrackerWrapperTarget');
            }
            if(!empty(parameters.get('etrackerWrapperTval')){
               wrapperjson = wrapperjson+',et_tval:'+parameters.get('etrackerWrapperTval');
            }
            if(!empty(parameters.get('etrackerWrapperTonr')){
               wrapperjson = wrapperjson+',et_tonr:'+parameters.get('etrackerWrapperTonr');
            }
            if(!empty(parameters.get('etrackerWrapperTsale')){
               wrapperjson = wrapperjson+',et_tsale:'+parameters.get('etrackerWrapperTsale');
            }
            if(!empty(parameters.get('etrackerWrapperCust')){
               wrapperjson = wrapperjson+',et_cust:'+parameters.get('etrackerWrapperCust');
            }
            if(!empty(parameters.get('etrackerWrapperBasket')){
               wrapperjson = wrapperjson+',et_basket:'+parameters.get('etrackerWrapperBasket');
            }
            wrapperjson = wrapperjson+'}';
            et_eC_Wrapper(wrapperjson);
        }
        if (trackingType === 'event' && typeof(_etracker) === "object") {
            _etracker.sendEvent(new et_UserDefinedEvent(parameters.get('etrackerEventObject'), parameters.get('etrackerEventCategory'), parameters.get('etrackerEventAction'), parameters.get('etrackerEventType')));
        }
        };
        };
    }
)();
