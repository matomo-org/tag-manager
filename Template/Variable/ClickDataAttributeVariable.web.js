/*
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

(function () {
  return function (parameters, TagManager) {

    this.get = function () {
      var dataAttributeName = parameters.get("dataAttribute");

      var event = TagManager.dataLayer.events.at(-1);

      if (event["mtm.clickElement"] && event["mtm.clickElement"].hasAttribute('data-' + dataAttributeName)) {
        return event["mtm.clickElement"].getAttribute('data-' + dataAttributeName);
      }

    };
  };
})();
