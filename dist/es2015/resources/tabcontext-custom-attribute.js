var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

function _initDefineProp(target, property, descriptor, context) {
	if (!descriptor) return;
	Object.defineProperty(target, property, {
		enumerable: descriptor.enumerable,
		configurable: descriptor.configurable,
		writable: descriptor.writable,
		value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
	});
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	var desc = {};
	Object['ke' + 'ys'](descriptor).forEach(function (key) {
		desc[key] = descriptor[key];
	});
	desc.enumerable = !!desc.enumerable;
	desc.configurable = !!desc.configurable;

	if ('value' in desc || desc.initializer) {
		desc.writable = true;
	}

	desc = decorators.slice().reverse().reduce(function (desc, decorator) {
		return decorator(target, property, desc) || desc;
	}, desc);

	if (context && desc.initializer !== void 0) {
		desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
		desc.initializer = undefined;
	}

	if (desc.initializer === void 0) {
		Object['define' + 'Property'](target, property, desc);
		desc = null;
	}

	return desc;
}

function _initializerWarningHelper(descriptor, context) {
	throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

import { customAttribute, inject, bindable } from 'aurelia-framework';
import { ATPConfiguration } from '../atp-configuration';
import { ATPHandler } from '../atp-handler';

export let ATPTabContextAttribute = (_dec = customAttribute('tabcontext'), _dec2 = inject(Element, ATPHandler, ATPConfiguration), _dec(_class = _dec2(_class = (_class2 = class ATPTabContextAttribute {
	constructor(element, handler, config) {
		_initDefineProp(this, 'level', _descriptor, this);

		this.isAttached = false;
		this.tabbableChildren = [];

		this.element = element;
		this.handler = handler;
		this.config = config;
	}

	levelChanged(newval, oldvalue) {
		if (!this.isAttached) {
			return;
		}

		let self = this;
		if (oldvalue.indexOf(",") !== -1) {
			let levels = oldvalue.split(",");
			levels.forEach(function (level) {
				let parsedLevel = parseInt(level.trim(), 10);
				self.handler.unregisterElements(self.tabbableChildren, parsedLevel);
			});
		} else {
			let parsedLevel = parseInt(oldvalue.trim(), 10);
			this.handler.unregisterElements(this.tabbableChildren, parsedLevel);
		}

		if (newval.indexOf(",") !== -1) {
			let levels = newval.split(",");
			levels.forEach(function (level) {
				let parsedLevel = parseInt(level.trim(), 10);
				self.handler.registerElements(self.tabbableChildren, parsedLevel);
			});
		} else {
			let parsedLevel = parseInt(newval.trim(), 10);
			this.handler.registerElements(this.tabbableChildren, parsedLevel);
		}
	}

	attached() {
		console.log("ATP Attached!");
		this.isAttached = true;
		let children = this.element.querySelectorAll("[tabindex]");
		for (let index = 0; index < children.length; index++) {
			let element = children[index];
			this.tabbableChildren.push(element);
		}
		if (this.tabbableChildren.length === 0) {
			return;
		}
		console.log("I found " + this.tabbableChildren.length + " children with tabindexes");
		let self = this;
		if (this.level.indexOf(",") !== -1) {
			let levels = this.level.split(",");
			levels.forEach(function (level) {
				let parsedLevel = parseInt(level.trim(), 10);
				self.handler.registerElements(self.tabbableChildren, parsedLevel);
			});
		} else {
			let parsedLevel = parseInt(this.level.trim(), 10);
			this.handler.registerElements(this.tabbableChildren, parsedLevel);
		}
	}
	detached() {
		if (this.tabbableChildren.length > 0) {
			this.handler.unregisterElements(this.tabbableChildren);
		}
	}
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'level', [bindable], {
	enumerable: true,
	initializer: function () {
		return "0";
	}
})), _class2)) || _class) || _class);