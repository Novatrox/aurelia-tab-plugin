var _dec, _class;

import { inject } from 'aurelia-framework';
import { DOM } from 'aurelia-pal';
import { ATPConfiguration } from './atp-configuration';

export let ATPHandler = (_dec = inject(DOM, ATPConfiguration), _dec(_class = class ATPHandler {
	constructor(dom, config) {
		this.currentIndex = 0;
		this.currentContext = null;

		this.DOM = dom;
	}

	registerElements(elements, level = 0) {
		let index = this.contexts.map(function (el) {
			return el.level;
		}).indexOf(level);
		if (index === -1) {
			var levelContext = new context();
			levelContext.level = level;
			levelContext.elements = [];
			this.contexts.push(levelContext);
			index = this.contexts.length - 1;
		}

		elements.forEach(function (element) {
			var object = new tabbableElement();
			object.element = element;
			object.index = element.attributes.getNamedItem("tabindex");
			this.contexts[index].elements.push(object);
		}, this);
	}

}) || _class);

export let context = class context {};

export let tabbableElement = class tabbableElement {};