/*
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
  return function (parameters, TagManager) {
    this.fire = function () {

      var eventName = parameters.get("eventName");
      var eventParams = parameters.get("eventParameters");

      var paramsObject = {};

      eventParams.forEach(function (params) {
        if (params.parameter && params.value) {
          paramsObject[params.parameter] = params.value;
        }
      });

      gtag("event", eventName, paramsObject);
    };
  };
})();
