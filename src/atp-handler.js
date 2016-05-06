import {inject} from 'aurelia-framework';
import {DOM} from 'aurelia-pal';
import {ATPConfiguration} from './atp-configuration';


@inject(DOM, ATPConfiguration)
export class ATPHandler {
	DOM: DOM;

	constructor(dom, config) {
		this.DOM = dom;
		
	}

}
