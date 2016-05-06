import {ATPConfiguration} from './atp-configuration';

export function configure(aurelia, callback) {
  aurelia.globalResources('./resources/tabcontext-custom-attribute');
  
  let config = new ATPConfiguration(aurelia);
  if (callback !== undefined && typeof(callback) === 'function') {
    callback(config);
    return;
  }
  config.useDefaults();
}


export {ATPConfiguration} from './atp-configuration';
