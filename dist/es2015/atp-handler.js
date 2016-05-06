var _dec, _class;

import { inject } from 'aurelia-framework';
import { DOM } from 'aurelia-pal';
import { ATPConfiguration } from './atp-configuration';

export let ATPHandler = (_dec = inject(DOM, ATPConfiguration), _dec(_class = class ATPHandler {

	constructor(dom, config) {
		this.DOM = dom;
	}

}) || _class);