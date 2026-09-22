/*
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
  return function (parameters, TagManager) {

    this.get = function () {
      var htmlAttribute = parameters.get("htmlAttribute");

      var event = TagManager.dataLayer.events.at(-1);

      if (event["mtm.clickElement"] && htmlAttribute && event["mtm.clickElement"].hasAttribute(htmlAttribute)) {
        return event["mtm.clickElement"].getAttribute(htmlAttribute);
      }

    };
  };
})();
