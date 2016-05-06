'use strict';

System.register(['./atp-configuration'], function (_export, _context) {
  var ATPConfiguration;
  return {
    setters: [function (_atpConfiguration) {
      ATPConfiguration = _atpConfiguration.ATPConfiguration;
      var _exportObj = {};
      _exportObj.ATPConfiguration = _atpConfiguration.ATPConfiguration;

      _export(_exportObj);
    }],
    execute: function () {
      function configure(aurelia, callback) {
        aurelia.globalResources('./resources/tabcontext-custom-attribute');

        var config = new ATPConfiguration(aurelia);
        if (callback !== undefined && typeof callback === 'function') {
          callback(config);
          return;
        }
        config.useDefaults();
      }

      _export('configure', configure);
    }
  };
});