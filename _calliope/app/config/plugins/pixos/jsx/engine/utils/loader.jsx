/*                                                 *\
** ----------------------------------------------- **
**             Calliope - Site Generator   	       **
** ----------------------------------------------- **
**  Copyright (c) 2020-2021 - Kyle Derby MacInnis  **
**                                                 **
**    Any unauthorized distribution or transfer    **
**       of this work is strictly prohibited.      **
**                                                 **
**               All Rights Reserved.              **
** ----------------------------------------------- **
\*                                                 */

export default class DynamicClassLoader {
  constructor(baseClass, requestUrlLookup) {
    // Class prototype definitions
    (this.definitions = []),
      // Dictionary of type: instances that require notifying when loaded
      (this.instances = {}),
      (this.baseClass = baseClass);
    this.requestUrlLookup = requestUrlLookup;
  }

  load(type) {
    let afterLoad = arguments[1];
    let afterConstruct = arguments[2];

    // Unknown class type - create a skeleton class to be updated once the code has downloaded
    if (typeof this.definitions[type] === "undefined") {
      this.definitions[type] = new Class({
        Extends: this.baseClass,
      });

      this.instances[type] = [];
      let self = this;
      let url = this.requestUrlLookup(type);
      new Request({
        url: url,
        method: "get",
        link: "chain",
        onSuccess: function (json) {
          let def;
          try {
            eval(json);
          } catch (e) {
            let lineNumber = "";
            // Dirty browser specific hack to determine line number in loaded file
            if (e.lineNumber)
              lineNumber = e.lineNumber - new Error().lineNumber + 6;

            debug.error(
              "Error in type definition for " + type + ":" + lineNumber
            );
            debug.error(e.message);
          }
          self.definitions[type].implement(def);
          self.definitions[type].implement({ templateLoaded: true });

          // notify existing actor instances
          self.instances[type].each(function (i) {
            if (i.f) i.f(i.i);
          });
          debug.log("Loaded definition for type '" + type + "'");
        },
        onFailure: function () {
          debug.error("Error fetching definition for '" + type + "'");
        },
      }).send();
    }

    let instance = new this.definitions[type]();
    if (afterConstruct) afterConstruct(instance);

    if (afterLoad) {
      if (instance.templateLoaded) afterLoad(instance);
      else this.instances[type].push({ i: instance, f: afterLoad });
    }

    return instance;
  }
}
