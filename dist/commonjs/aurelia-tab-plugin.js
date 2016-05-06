'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ATPConfiguration = undefined;
exports.configure = configure;

var _atpConfiguration = require('./atp-configuration');

Object.defineProperty(exports, 'ATPConfiguration', {
  enumerable: true,
  get: function get() {
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