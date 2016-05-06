define(['exports', 'aurelia-framework', '../atp-configuration', '../atp-handler'], function (exports, _aureliaFramework, _atpConfiguration, _atpHandler) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ATPTabContextAttribute = undefined;

	function _initDefineProp(target, property, descriptor, context) {
		if (!descriptor) return;
		Object.defineProperty(target, property, {
			enumerable: descriptor.enumerable,
			configurable: descriptor.configurable,
			writable: descriptor.writable,
			value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
		});
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
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

	var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

	var ATPTabContextAttribute = exports.ATPTabContextAttribute = (_dec = (0, _aureliaFramework.customAttribute)('tabcontext'), _dec2 = (0, _aureliaFramework.inject)(Element, _atpHandler.ATPHandler, _atpConfiguration.ATPConfiguration), _dec(_class = _dec2(_class = (_class2 = function () {
		function ATPTabContextAttribute(element, handler, config) {
			_classCallCheck(this, ATPTabContextAttribute);

			_initDefineProp(this, 'level', _descriptor, this);

			this.isAttached = false;
			this.tabbableChildren = [];

			this.element = element;
			this.handler = handler;
			this.config = config;
		}

		ATPTabContextAttribute.prototype.levelChanged = function levelChanged(newval, oldvalue) {
			if (!this.isAttached) {
				return;
			}

			var self = this;
			if (oldvalue.indexOf(",") !== -1) {
				var levels = oldvalue.split(",");
				levels.forEach(function (level) {
					var parsedLevel = parseInt(level.trim(), 10);
					self.handler.unregisterElements(self.tabbableChildren, parsedLevel);
				});
			} else {
				var parsedLevel = parseInt(oldvalue.trim(), 10);
				this.handler.unregisterElements(this.tabbableChildren, parsedLevel);
			}

			if (newval.indexOf(",") !== -1) {
				var _levels = newval.split(",");
				_levels.forEach(function (level) {
					var parsedLevel = parseInt(level.trim(), 10);
					self.handler.registerElements(self.tabbableChildren, parsedLevel);
				});
			} else {
				var _parsedLevel = parseInt(newval.trim(), 10);
				this.handler.registerElements(this.tabbableChildren, _parsedLevel);
			}
		};

		ATPTabContextAttribute.prototype.attached = function attached() {
			console.log("ATP Attached!");
			this.isAttached = true;
			var children = this.element.querySelectorAll("[tabindex]");
			for (var index = 0; index < children.length; index++) {
				var element = children[index];
				this.tabbableChildren.push(element);
			}
			if (this.tabbableChildren.length === 0) {
				return;
			}
			console.log("I found " + this.tabbableChildren.length + " children with tabindexes");
			var self = this;
			if (this.level.indexOf(",") !== -1) {
				var levels = this.level.split(",");
				levels.forEach(function (level) {
					var parsedLevel = parseInt(level.trim(), 10);
					self.handler.registerElements(self.tabbableChildren, parsedLevel);
				});
			} else {
				var parsedLevel = parseInt(this.level.trim(), 10);
				this.handler.registerElements(this.tabbableChildren, parsedLevel);
			}
		};

		ATPTabContextAttribute.prototype.detached = function detached() {
			if (this.tabbableChildren.length > 0) {
				this.handler.unregisterElements(this.tabbableChildren);
			}
		};

		return ATPTabContextAttribute;
	}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'level', [_aureliaFramework.bindable], {
		enumerable: true,
		initializer: function initializer() {
			return "0";
		}
	})), _class2)) || _class) || _class);
});