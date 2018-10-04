(function () {
    return function (parameters, TagManager) {
        this.fire = function () {
				_etracker.sendEvent(new et_UserDefinedEvent(parameters.get('etrackerEventObject'), parameters.get('etrackerEventCategory'), parameters.get('etrackerEventAction'), parameters.get('etrackerEventType')));
            };
        };
    }
)();