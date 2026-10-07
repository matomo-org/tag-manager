/*
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
  return function (parameters, TagManager) {
    this.fire = function () {

      var conversionId = parameters.get("googleAdsConversionId");
      var conversionLabel = parameters.get("googleAdsConversionLabel");
      var value = parameters.get("googleAdsConversionValue");
      var transactionId = parameters.get("googleAdsConversionTransactionId");
      var currency = parameters.get("googleAdsConversionCurrency");

      var formattedConversionId = conversionId.includes("AW-") ? conversionId : "AW-" + conversionId;

      var sendTo = formattedConversionId + "/" + conversionLabel;
      var conversionData = {"send_to": sendTo};

      if (value) {
        conversionData.value = value;
      }

      if (transactionId) {
        conversionData.transaction_id = transactionId;
      }

      if (currency) {
        conversionData.currency = currency;
      }

      gtag("event", "conversion", conversionData);

    };
  };
})();
