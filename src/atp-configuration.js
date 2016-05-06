import {atpOptions} from './atp-options';
export class ATPConfiguration {
	settings: any;
	aurelia: any;
	constructor(aurelia) {
		this.aurelia = aurelia;
		this.settings = atpOptions;
  	}
	  
	useDefaults() : ATPConfiguration {
		 this.settings = Object.assign(this.settings, atpOptions);
		 return this;
	}
}
