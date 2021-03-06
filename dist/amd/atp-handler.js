define(['exports', 'aurelia-framework', './atp-configuration'], function (exports, _aureliaFramework, _atpConfiguration) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.tabbableElement = exports.context = exports.ATPHandler = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var ATPHandler = exports.ATPHandler = (_dec = (0, _aureliaFramework.inject)(_atpConfiguration.ATPConfiguration), _dec(_class = function () {
		function ATPHandler(config) {
			var _this = this;

			_classCallCheck(this, ATPHandler);

			this.contexts = [];
			this.currentItem = null;
			this.currentElements = [];
			this.reverse = false;

			this.config = config;
			document.addEventListener("keydown", function (ev) {
				if (ev.keyCode === 16) {
					_this.reverse = true;
					return;
				}
				if (ev.keyCode === 9) {
					ev.preventDefault();
					_this.onTabPress();
				}
			}, false);

			document.addEventListener("keyup", function (ev) {
				if (ev.keyCode === 16) {
					_this.reverse = false;
					return;
				}
			}, false);
		}

		ATPHandler.prototype.onTabPress = function onTabPress() {
			console.log("tab fired, reverse is: " + this.reverse);
			if (this.currentElements == null || this.currentElements.length === 0) {
				return;
			}
			var nextIndex = 0;
			var enabledCurrentElements = this.currentElements.filter(function (item) {
				if (item.disabled) {
					return false;
				}
				var style = window.getComputedStyle(item);
				if (style.display === 'none' || style.visibility !== 'visible') {
					return false;
				}

				var lastElement = item;
				while (lastElement != null && lastElement.parentElement != null) {

					var parentStyle = window.getComputedStyle(lastElement.parentElement);
					if (parentStyle.display === 'none' || parentStyle.visibility !== 'visible') {
						return false;
					}
					lastElement = lastElement.parentElement;
				}

				return true;
			});

			if (enabledCurrentElements == null || enabledCurrentElements.length === 0) {
				return;
			}

			if (this.currentItem == null) {
				this.currentItem = enabledCurrentElements[0];
			}

			var indexOfCurrentItem = enabledCurrentElements.indexOf(this.currentItem);

			if (this.reverse) {
				if (indexOfCurrentItem === 0) {
					nextIndex = enabledCurrentElements.length - 1;
				} else {
					nextIndex = --indexOfCurrentItem;
				}
			} else {
				if (indexOfCurrentItem >= enabledCurrentElements.length - 1) {
					nextIndex = 0;
				} else {
					nextIndex = ++indexOfCurrentItem;
				}
			}

			var nextElement = enabledCurrentElements[nextIndex];
			this.currentItem = nextElement;

			if (nextElement) {
				if (this.config.settings.autoFocus) {
					nextElement.focus();
				}
				if (this.config.settings.autoScroll) {
					nextElement.scrollIntoView(true);
					window.scrollTo(0, window.scrollTop - this.config.settings.scrollOffset);
				}
			}
		};

		ATPHandler.prototype.calculateElementsInCurrentContext = function calculateElementsInCurrentContext() {
			if (this.contexts == null || this.contexts.length === 0) {
				this.currentElements = null;
				this.currentItem = null;
				return;
			}

			var contextLevels = this.contexts.map(function (context) {
				return context.level;
			});
			var highestContextLevel = Math.max.apply(null, contextLevels);
			var indexOfContextToUse = contextLevels.indexOf(highestContextLevel);
			if (indexOfContextToUse === -1) {
				throw "Could not locate context..";
			}

			var elementsToUse = this.contexts[indexOfContextToUse].elements;

			this.currentElements = elementsToUse.sort(function (a, b) {
				if (a.index > b.index) {
					return 1;
				} else {
					return -1;
				}
			}).map(function (el) {
				return el.element;
			});
			this.currentItem = null;
		};

		ATPHandler.prototype.registerElements = function registerElements(elements) {
			var level = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

			var self = this;
			var index = this.contexts.map(function (el) {
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
				var _this2 = this;

				var object = new tabbableElement();
				object.element = element;
				var attrib = element.attributes.getNamedItem("tabindex");
				if (attrib && attrib.value) {
					var indexParsed = parseInt(attrib.value, 10);
					if (indexParsed < 0) {
						return;
					}
					object.index = indexParsed;
				} else {
					throw "Failed to parse tabIndex";
				}

				object.element.addEventListener("focus", function (ev) {
					_this2.elementGotFocus(ev);
				});

				this.contexts[index].elements.push(object);
			}, this);

			this.calculateElementsInCurrentContext();
		};

		ATPHandler.prototype.elementGotFocus = function elementGotFocus(ev) {
			var target = ev.target;
			var index = this.currentElements.indexOf(target);
			if (index !== -1) {
				this.currentItem = target;
			}
		};

		ATPHandler.prototype.unregisterElements = function unregisterElements(elements) {
			var level = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

			var self = this;
			var index = this.contexts.map(function (el) {
				return el.level;
			}).indexOf(level);
			var elementsInLevel = this.contexts[index].elements;

			elements.forEach(function (element) {
				var _this3 = this;

				var attrib = element.attributes.getNamedItem("tabindex");
				if (attrib && attrib.value) {
					var indexParsed = parseInt(attrib.value, 10);
					if (indexParsed < 0) {
						return;
					}
				} else {
						throw "Failed to parse tabIndex";
					}

				element.removeEventListener("focus", function (ev) {
					_this3.elementGotFocus(ev);
				});

				var elementIndex = elementsInLevel.map(function (tabbableElement) {
					return tabbableElement.element;
				}).indexOf(element);
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
		};

		return ATPHandler;
	}()) || _class);

	var context = exports.context = function context() {
		_classCallCheck(this, context);
	};

	var tabbableElement = exports.tabbableElement = function tabbableElement() {
		_classCallCheck(this, tabbableElement);
	};
});