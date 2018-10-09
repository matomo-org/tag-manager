(function () {
    return function (parameters, TagManager) {
        this.fire = function () {
		var etrackerConfig = parameters.get('etrackerConfig', {});
		var trackingType = parameters.get('trackingType');
		if (trackingType === 'pageview') {
			var etrackerID = etrackerConfig.etrackerID;
            		if (etrackerID) {
				var s = document.getElementsByTagName('script')[0];
				// Pageview parameters for overwrite
				var etracker_variables = '';
				if(etrackerConfig.et_pagename != ''){
					etracker_variables += 'var et_pagename = "'+etrackerConfig.et_pagename+'";';
				}
				if(etrackerConfig.et_areas != ''){
					etracker_variables += 'var et_areas = "'+etrackerConfig.et_areas+'";';
				}
				if(etrackerConfig.et_target != ''){
					etracker_variables += 'var et_target = "'+etrackerConfig.et_target+'";';
				}
				if(etrackerConfig.et_tval != ''){
					etracker_variables += 'var et_tval = "'+etrackerConfig.et_tval+'";';
				}
				if(etrackerConfig.et_tonr != ''){
					etracker_variables += 'var et_tonr = "'+etrackerConfig.et_tonr+'";';
				}
				if(etrackerConfig.et_tsale != ''){
					etracker_variables += 'var et_tsale = "'+etrackerConfig.et_tsale+'";';
				}
				if(etrackerConfig.et_basket != ''){
					etracker_variables += 'var et_basket = "'+etrackerConfig.et_basket+'";';
				}
				if(etrackerConfig.et_cust != ''){
					etracker_variables += 'var et_cust = "'+etrackerConfig.et_cust+'";';
				}
				if(etracker_variables.length > 5){
					var script_inner = document.createElement('script');
					script_inner.text = etracker_variables;
					s.parentNode.insertBefore(script_inner, s);
				}
				// Pageview script
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
