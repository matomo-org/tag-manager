(function () {
    return function (parameters, TagManager) {
        this.fire = function () {
		var etrackerConfig = parameters.get('etrackerConfig', {});
		var trackingType = parameters.get('trackingType');
		if (trackingType === 'pageview') {
			var etrackerID = etrackerConfig.etrackerID;
            		if (etrackerID) {
				// Pageview parameters for overwrite
				if(etrackerConfig.et_pagename){
					window.et_pagename = etrackerConfig.et_pagename;
				}
				if(etrackerConfig.et_areas){
					window.et_areas = etrackerConfig.et_areas;
				}
				if(etrackerConfig.et_target){
					window.et_target = etrackerConfig.et_target;
				}
				if(etrackerConfig.et_tval){
					window.et_tval = etrackerConfig.et_tval;
				}
				if(etrackerConfig.et_tonr){
					window.et_tonr = etrackerConfig.et_tonr;
				}
				if(etrackerConfig.et_tsale){
					window.et_tsale = etrackerConfig.et_tsale;
				}
				if(etrackerConfig.et_basket){
					window.et_basket = etrackerConfig.et_basket;
				}
				if(etrackerConfig.et_cust){
					window.et_cust = etrackerConfig.et_cust;
				}
				// Pageview script
				var s = document.getElementsByTagName('script')[0];
				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.setAttribute('data-secure-code', etrackerID);
				script.setAttribute('id', '_etLoader');
				script.setAttribute('charset', 'UTF-8');
				if (etrackerConfig.etrackerDNT) {
                        		script.setAttribute('data-respect-dnt', 'true');
                    		}
				script.src = '//static.etracker.com/code/e.js';
				s.parentNode.insertBefore(script, s);               
			}
		} else if (trackingType === 'event') {
			_etracker.sendEvent(new et_UserDefinedEvent(parameters.get('etrackerEventObject'), parameters.get('etrackerEventCategory'), parameters.get('etrackerEventAction'), parameters.get('etrackerEventType')));
		}
		};
        };
    }
)();
