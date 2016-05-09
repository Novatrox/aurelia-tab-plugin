'use strict';

System.register(['aurelia-framework', '../atp-configuration', '../atp-handler'], function (_export, _context) {
	var customAttribute, inject, bindable, ATPConfiguration, ATPHandler, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, ATPTabContextAttribute;

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

	return {
		setters: [function (_aureliaFramework) {
			customAttribute = _aureliaFramework.customAttribute;
			inject = _aureliaFramework.inject;
			bindable = _aureliaFramework.bindable;
		}, function (_atpConfiguration) {
			ATPConfiguration = _atpConfiguration.ATPConfiguration;
		}, function (_atpHandler) {
			ATPHandler = _atpHandler.ATPHandler;
		}],
		execute: function () {
			_export('ATPTabContextAttribute', ATPTabContextAttribute = (_dec = customAttribute('tabcontext'), _dec2 = inject(Element, ATPHandler, ATPConfiguration), _dec(_class = _dec2(_class = (_class2 = function () {
				function ATPTabContextAttribute(element, handler, config) {
					_classCallCheck(this, ATPTabContextAttribute);

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

				ATPTabContextAttribute.prototype.levelChanged = function levelChanged(newval, oldvalue) {
					if (!this.isAttached) {
						return;
					}

					this.unregisterElements(this.tabbableChildren, oldvalue);

					this.registerElements(this.tabbableChildren, newval);
				};

				ATPTabContextAttribute.prototype.discoverElements = function discoverElements(context) {
					var result = [];
					var children = context.querySelectorAll("[tabindex]");
					for (var index = 0; index < children.length; index++) {
						var element = children[index];
						result.push(element);
					}
					return result;
				};

				ATPTabContextAttribute.prototype.unregisterElements = function unregisterElements(elements, levelString) {
					var self = this;
					if (levelString.indexOf(",") !== -1) {
						var levels = levelString.split(",");
						levels.forEach(function (level) {
							var parsedLevel = parseInt(level.trim(), 10);
							self.handler.unregisterElements(elements, parsedLevel);
						});
					} else {
						var parsedLevel = parseInt(levelString.trim(), 10);
						this.handler.unregisterElements(elements, parsedLevel);
					}
				};

				ATPTabContextAttribute.prototype.registerElements = function registerElements(elements, levelString) {
					var self = this;
					if (levelString.indexOf(",") !== -1) {
						var levels = levelString.split(",");
						levels.forEach(function (level) {
							var parsedLevel = parseInt(level.trim(), 10);
							self.handler.registerElements(elements, parsedLevel);
						});
					} else {
						var parsedLevel = parseInt(levelString.trim(), 10);
						this.handler.registerElements(elements, parsedLevel);
					}
				};

				ATPTabContextAttribute.prototype.onChange = function onChange() {
					this.unregisterElements(this.tabbableChildren, this.level);
					this.tabbableChildren = this.discoverElements(this.element);
					if (this.tabbableChildren.length > 0) {
						this.registerElements(this.tabbableChildren, this.level);
					}
				};

				ATPTabContextAttribute.prototype.attached = function attached() {
					this.isAttached = true;
					this.tabbableChildren = this.discoverElements(this.element);
					if (this.tabbableChildren.length === 0) {
						return;
					}
					this.registerElements(this.tabbableChildren, this.level);
					if (this.observe === true) {
						this.observer.observe(this.element, this.config);
					}
				};

				ATPTabContextAttribute.prototype.detached = function detached() {
					if (this.tabbableChildren.length > 0) {
						this.unregisterElements(this.tabbableChildren, this.level);
					}
					if (this.observe) {
						this.observer.disconnect();
					}
				};

				return ATPTabContextAttribute;
			}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'level', [bindable], {
				enumerable: true,
				initializer: function initializer() {
					return "0";
				}
			}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'observe', [bindable], {
				enumerable: true,
				initializer: function initializer() {
					return true;
				}
			})), _class2)) || _class) || _class));

			_export('ATPTabContextAttribute', ATPTabContextAttribute);
		}
	};
});