var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2;

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
		this.isAttached = false;
		this.tabbableChildren = [];

		_initDefineProp(this, 'level', _descriptor, this);

		_initDefineProp(this, 'observe', _descriptor2, this);

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

		this.unregisterElements(this.tabbableChildren, oldvalue);

		this.registerElements(this.tabbableChildren, newval);
	}

	discoverElements(context) {
		let result = [];
		let children = context.querySelectorAll("[tabindex]");
		for (let index = 0; index < children.length; index++) {
			let element = children[index];
			result.push(element);
		}
		return result;
	}

	unregisterElements(elements, levelString) {
		var self = this;
		if (levelString.indexOf(",") !== -1) {
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

	registerElements(elements, levelString) {
		let self = this;
		if (levelString.indexOf(",") !== -1) {
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
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'level', [bindable], {
	enumerable: true,
	initializer: function () {
		return "0";
	}
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'observe', [bindable], {
	enumerable: true,
	initializer: function () {
		return true;
	}
})), _class2)) || _class) || _class);