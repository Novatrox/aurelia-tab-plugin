import {customAttribute, inject, bindable} from 'aurelia-framework';
import {ATPConfiguration} from '../atp-configuration';
import {ATPHandler} from '../atp-handler';

@customAttribute('tabcontext')
@inject(Element, ATPHandler, ATPConfiguration)
export class ATPTabContextAttribute {
	element: HTMLElement;
	handler: ATPHandler;
	config: ATPConfiguration;
	@bindable level: string = "0";
	isAttached: boolean = false;
	constructor(element, handler, config) {
		this.element = element;
		this.handler = handler;
		this.config = config;
	}
	
	levelChanged(newval, oldvalue) {
		if(!this.isAttached) {
			return;
		}
		//Unreg
		let self = this;
		if(oldvalue.indexOf(",") !== -1) {
			//multiple levels
			let levels = oldvalue.split(",");
			levels.forEach(function(level) {
				let parsedLevel = parseInt(level.trim(),10);
				self.handler.unregisterElements(self.tabbableChildren, parsedLevel);				
			});
		} else {
			let parsedLevel = parseInt(oldvalue.trim(),10);
			this.handler.unregisterElements(this.tabbableChildren, parsedLevel);
		}
		
		//Rereg with new value
		if(newval.indexOf(",") !== -1) {
			//multiple levels
			let levels = newval.split(",");
			levels.forEach(function(level) {
				let parsedLevel = parseInt(level.trim(),10);
				self.handler.registerElements(self.tabbableChildren, parsedLevel);				
			});
		} else {
			let parsedLevel = parseInt(newval.trim(),10);
			this.handler.registerElements(this.tabbableChildren, parsedLevel);	
		}
	}
	
	tabbableChildren: HTMLElement[] = [];	   
	attached() {
		console.log("ATP Attached!");
		this.isAttached = true;
		let children = this.element.querySelectorAll("[tabindex]");
		for (let index = 0; index < children.length; index++) {
			let element = children[index];
			this.tabbableChildren.push(element);
			
		}
		if(this.tabbableChildren.length === 0) {
			return;
		}
		console.log("I found " + this.tabbableChildren.length + " children with tabindexes");
		let self = this;
		if(this.level.indexOf(",") !== -1) {
			//multiple levels
			let levels = this.level.split(",");
			levels.forEach(function(level) {
				let parsedLevel = parseInt(level.trim(),10);
				self.handler.registerElements(self.tabbableChildren, parsedLevel);				
			});
		} else {
			let parsedLevel = parseInt(this.level.trim(),10);
			this.handler.registerElements(this.tabbableChildren, parsedLevel);	
		}
		 
		
	}
	detached() {
		if(this.tabbableChildren.length > 0) {
			this.handler.unregisterElements(this.tabbableChildren);
		}
	}
}
