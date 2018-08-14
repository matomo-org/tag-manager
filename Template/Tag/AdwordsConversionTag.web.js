(function () {
    return function (parameters, TagManager) {
        var setup = {};
        var isLibLoaded = false;
        this.fire = function () {
            var conversionID = parameters.get('conversionID');

            if (!isLibLoaded) {
                isLibLoaded = true;
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.type='text/javascript'; g.async=true; g.defer=true; g.src='https://www.googletagmanager.com/gtag/js?id=' + conversionID;
                s.parentNode.insertBefore(g,s);
            }

            if (!(conversionID in setup)) {
                setup[conversionID] = true;
                gtag('js', new Date());
                gtag('config', conversionID);
            }

            gtag('event', 'conversion', {
                'send_to': conversionID + '/' + parameters.get('conversionLabel'),
                'value': parseFloat(parameters.get('conversionValue')),
                'currency': parameters.get('conversionCurrency'),
                'transaction_id': parameters.get('conversionOrder')
            });
        };
    };
})();
