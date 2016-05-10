import {inject} from 'aurelia-framework';
import {ATPConfiguration} from './atp-configuration';


@inject(ATPConfiguration)
export class ATPHandler {
	contexts: context[] = [];
	config: ATPConfiguration;
	currentIndex: number = 0;
	currentElements: HTMLElement[] = [];
	reverse: boolean = false;

	constructor(config) {
		this.config = config;
		document.addEventListener("keydown", (ev: KeyboardEvent) => {
			if (ev.keyCode === 16) {
				this.reverse = true;
				return;
			}
			if (ev.keyCode === 9) {
				ev.preventDefault();
				this.onTabPress();
			}
		}, false);

		document.addEventListener("keyup", (ev: KeyboardEvent) => {
			if (ev.keyCode === 16) {
				this.reverse = false;
				return;
			}
		}, false);
	}


	onTabPress() {
		console.log("tab fired, reverse is: " + this.reverse);
		if (this.currentElements == null || this.currentElements.length === 0) {
			return;
		}
		let nextIndex = 0;
		let enabledCurrentElements = this.currentElements.filter(function (item) {
			if (item.disabled) {
				return false;
			}
			var style = window.getComputedStyle(item);
			if (style.display === 'none') {
				return false;
			}

			return true;
		});

		if (this.reverse) {
			if (this.currentIndex == null || this.currentIndex === 0) {
				nextIndex = enabledCurrentElements.length - 1;
			} else {
				nextIndex = --this.currentIndex;
			}
		} else {
			if (this.currentIndex == null || this.currentIndex >= enabledCurrentElements.length - 1) {
				nextIndex = 0;
			} else {
				nextIndex = ++this.currentIndex;
			}
		}


		let nextElement = enabledCurrentElements[nextIndex];
		this.currentIndex = nextIndex;

		if (nextElement) {
			if (this.config.settings.autoFocus) {
				nextElement.focus();
			}
			if (this.config.settings.autoScroll) {
				nextElement.scrollIntoView(true);
				window.scrollTo(0, window.scrollTop - this.config.settings.scrollOffset)
			}
		}
	}





	calculateElementsInCurrentContext() {
		if (this.contexts == null || this.contexts.length === 0) {
			this.currentElements = null;
			this.currentIndex = 0;
			return;
		}


		//Find highest level of scope
		let contextLevels = this.contexts.map(function (context) { return context.level; });
		let highestContextLevel = Math.max.apply(null, contextLevels);
		let indexOfContextToUse = contextLevels.indexOf(highestContextLevel);
		if (indexOfContextToUse === -1) {
			throw "Could not locate context..";
		}

		let elementsToUse = this.contexts[indexOfContextToUse].elements;

		this.currentElements = elementsToUse.sort((a: tabbableElement, b: tabbableElement) => {
			if (a.index > b.index) {
				return 1;
			} else {
				return -1;
			}
		}).map(function (el) { return el.element; });
		this.currentIndex = null; //reset

	}

	registerElements(elements: HTMLElement[], level: number = 0) {
		var self = this;
		let index = this.contexts.map(function (el) { return el.level; }).indexOf(level);
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
			var attrib = element.attributes.getNamedItem("tabindex");
			if (attrib && attrib.value) {
				var indexParsed = parseInt(attrib.value, 10);
				if (indexParsed < 0) {
					return; //dont add negative tabindex, used as custom handle to skip the index
				}
				object.index = indexParsed;
			} else {
				throw "Failed to parse tabIndex";
			}
			
			object.element.addEventListener("focus", (ev) => {				
				 this.elementGotFocus(ev);
			});
			
			this.contexts[index].elements.push(object);
		}, this);

		this.calculateElementsInCurrentContext();
	}
	
	elementGotFocus(ev) {		
		var target = ev.target;
		var index = this.currentElements.indexOf(target);
		if (index !== -1) {			
			this.currentIndex = index;							
		}
	}

	unregisterElements(elements: HTMLElement[], level: number = 0) {
		let self = this;
		let index = this.contexts.map(function (el) { return el.level; }).indexOf(level);
		let elementsInLevel = this.contexts[index].elements;

		elements.forEach(function (element) {
			var attrib = element.attributes.getNamedItem("tabindex");
			if (attrib && attrib.value) {
				var indexParsed = parseInt(attrib.value, 10);
				if (indexParsed < 0) {
					return; //dont add negative tabindex, used as custom handle to skip the index
				}
			} else {
				throw "Failed to parse tabIndex";
			}
			
			element.removeEventListener("focus",  (ev) => {				
				 this.elementGotFocus(ev);
			});
			

			let elementIndex = elementsInLevel.map(function (tabbableElement) { return tabbableElement.element }).indexOf(element);
			if (elementIndex === -1) {
				throw "Could not find element";
			} else {
				elementsInLevel.splice(elementIndex, 1);
			}
		});
		if (elementsInLevel.length === 0) {
			this.contexts.splice(index, 1);
		}
		this.calculateElementsInCurrentContext();
	}
}

export class context {
	level: number;
	elements: tabbableElement[];
}

export class tabbableElement {
	element: HTMLElement;
	index: number;
}
