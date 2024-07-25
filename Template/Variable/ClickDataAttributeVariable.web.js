(function () {
  return function (parameters, TagManager) {

    this.get = function () {
      var dataAttribute = parameters.get("dataAttribute");

      var event = TagManager.dataLayer.events.at(-1);

      if (event["mtm.clickElement"] && event["mtm.clickElement"].dataset) {
        return event["mtm.clickElement"].dataset[dataAttribute];
      }

    };
  };
})();
