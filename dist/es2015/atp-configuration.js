import { atpOptions } from './atp-options';
export let ATPConfiguration = class ATPConfiguration {
	constructor(aurelia) {
		this.aurelia = aurelia;
		this.settings = atpOptions;
	}

	useDefaults() {
		this.settings = Object.assign(this.settings, atpOptions);
		return this;
	}
};