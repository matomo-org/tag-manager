(function () {
    return function (parameters, TagManager) {
        this.fire = function () {
            var imageUrl = parameters.get('conversionID');
            if (!imageUrl) {
                return;
            }
            TagManager.dom.loadScriptUrl('https://www.googleadservices.com/pagead/conversion_async.js', {
                onload: function () {
                    var conversionID = parameters.get('conversionID');
                    var configObject = {
                        google_conversion_id: conversionID,
                        google_conversion_format: parameters.get('conversionFormat'),
                        google_remarketing_only: false
                    };
                    var conversionCurrency = parameters.get("conversionCurrency");
                    if (conversionCurrency) {
                        configObject.google_conversion_currency = conversionCurrency;
                    }
                    var conversionValue = parameters.get("conversionValue");
                    if (conversionValue) {
                        configObject.google_conversion_value = conversionValue;
                    }
                    var conversionLanguage = parameters.get("conversionLanguage");
                    if (conversionLanguage) {
                        configObject.google_conversion_language = conversionLanguage;
                    }
                    var conversionColor = parameters.get("conversionColor");
                    if (conversionColor) {
                        configObject.google_conversion_color = conversionColor;
                    }
                    
                    configObject.google_conversion_label = conversionID + '/' + parameters.get('conversionLabel');
                    window.google_trackConversion(configObject)
                }
            });
        };
    };
})();
