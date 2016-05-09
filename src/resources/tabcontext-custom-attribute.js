import {customAttribute, inject, bindable} from 'aurelia-framework';
import {ATPConfiguration} from '../atp-configuration';
import {ATPHandler} from '../atp-handler';

@customAttribute('tabcontext')
@inject(Element, ATPHandler, ATPConfiguration)
export class ATPTabContextAttribute {
	element: HTMLElement;
	handler: ATPHandler;
	config: ATPConfiguration;
	isAttached: boolean = false;
	tabbableChildren: HTMLElement[] = [];

	@bindable level: string = "0";
	@bindable observe: boolean = true;

	observer: MutationObserver;
	observerConfig: MutationObserverInit;
	constructor(element, handler, config) {
		this.element = element;
		this.handler = handler;
		this.config = config;
		var self = this;
		this.observer = new MutationObserver(function (mutations) {
			self.onChange();
		});
		this.config = { attributes: false, childList: true, characterData: false, subtree: true };
	}



	levelChanged(newval, oldvalue) {
		if (!this.isAttached) {
			return;
		}
		//Unreg
		this.unregisterElements(this.tabbableChildren, oldvalue);

		//Rereg with new value
		this.registerElements(this.tabbableChildren, newval);
	}

	discoverElements(context: HTMLElement): HTMLElement[] {
		let result: HTMLElement[] = [];
		let children = context.querySelectorAll("[tabindex]");
		for (let index = 0; index < children.length; index++) {
			let element = children[index];
			result.push(element);
		}
		return result;
	}

	unregisterElements(elements: HTMLElement[], levelString: string) {
		var self = this;
		if (levelString.indexOf(",") !== -1) {
			//multiple levels
			let levels = levelString.split(",");
			levels.forEach(function (level) {
				let parsedLevel = parseInt(level.trim(), 10);
				self.handler.unregisterElements(elements, parsedLevel);
			});
		} else {
			let parsedLevel = parseInt(levelString.trim(), 10);
			this.handler.unregisterElements(elements, parsedLevel);
		}
	}

	registerElements(elements: HTMLElement[], levelString: string) {
		let self = this;
		if (levelString.indexOf(",") !== -1) {
			//multiple levels
			let levels = levelString.split(",");
			levels.forEach(function (level) {
				let parsedLevel = parseInt(level.trim(), 10);
				self.handler.registerElements(elements, parsedLevel);
			});
		} else {
			let parsedLevel = parseInt(levelString.trim(), 10);
			this.handler.registerElements(elements, parsedLevel);
		}
	}

	onChange() {
		this.unregisterElements(this.tabbableChildren, this.level);
		this.tabbableChildren = this.discoverElements(this.element);
		if (this.tabbableChildren.length > 0) {
			this.registerElements(this.tabbableChildren, this.level);
		}
	}


	attached() {
		this.isAttached = true;
		this.tabbableChildren = this.discoverElements(this.element);
		if (this.tabbableChildren.length === 0) {
			return;
		}
		this.registerElements(this.tabbableChildren, this.level);
		if (this.observe === true) {
			this.observer.observe(this.element, this.config);
		}
	}
	detached() {
		if (this.tabbableChildren.length > 0) {
			this.unregisterElements(this.tabbableChildren, this.level);
		}
		if (this.observe) {
			this.observer.disconnect();
		}
	}
}
