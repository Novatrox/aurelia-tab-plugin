define(['exports', './atp-configuration'], function (exports, _atpConfiguration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ATPConfiguration = undefined;
  exports.configure = configure;
  Object.defineProperty(exports, 'ATPConfiguration', {
    enumerable: true,
    get: function () {
      return _atpConfiguration.ATPConfiguration;
    }
  });
  function configure(aurelia, callback) {
    aurelia.globalResources('./resources/tabcontext-custom-attribute');

    var config = new _atpConfiguration.ATPConfiguration(aurelia);
    if (callback !== undefined && typeof callback === 'function') {
      callback(config);
      return;
    }
    config.useDefaults();
  }
});