import {customAttribute, inject, bindable} from 'aurelia-framework';
import {AKPConfiguration} from '../atp-configuration';
import {ATPHandler} from '../atp-handler';

@customAttribute('tabcontext')
@inject(Element, ATPHandler, ATPConfiguration)
export class AKPCustomAttribute {
	element: HTMLElement;
	eventHandler: ATPHandler;
	config: ATPConfiguration;
	@bindable level: number;
	constructor(element, handler, config) {
		this.element = element;
		this.eventHandler = eventHandler;
		this.config = config;
	}
	
		   
	attached() {
		//Find all children tabindexes
		//Add watcher if children are added or removed
		//Send list to handler
	}
	detached() {
		//Remove context
	}
}
