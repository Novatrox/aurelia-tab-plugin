import {inject} from 'aurelia-framework';
import {DOM} from 'aurelia-pal';
import {ATPConfiguration} from './atp-configuration';


@inject(DOM, ATPConfiguration)
export class ATPHandler {
	DOM: DOM;
	contexts: context[];
	
	currentIndex : number = 0;
	currentContext: context = null;
	constructor(dom, config) {
		this.DOM = dom;		
	}
	
	registerElements(elements: Element[], level:number = 0) {
		let index = this.contexts.map(function(el) {return el.level;}).indexOf(level);
		if(index === -1) {
			var levelContext = new context();
			levelContext.level = level;
			levelContext.elements = [];
			this.contexts.push(levelContext);
			index = this.contexts.length - 1;
		} 
		
		elements.forEach(function(element) {
			var object = new tabbableElement();
			object.element = element;
			object.index = element.attributes.getNamedItem("tabindex");
			this.contexts[index].elements.push(object);			
		}, this);		
	}

}

export class context {
	level: number;
	elements: Element[];
}

export class tabbableElement {
	element: Element;
	index: number;
}
