'use strict';

System.register(['aurelia-framework', './atp-configuration'], function (_export, _context) {
	var inject, ATPConfiguration, _dec, _class, ATPHandler, context, tabbableElement;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [function (_aureliaFramework) {
			inject = _aureliaFramework.inject;
		}, function (_atpConfiguration) {
			ATPConfiguration = _atpConfiguration.ATPConfiguration;
		}],
		execute: function () {
			_export('ATPHandler', ATPHandler = (_dec = inject(ATPConfiguration), _dec(_class = function () {
				function ATPHandler(config) {
					var _this = this;

					_classCallCheck(this, ATPHandler);

					this.contexts = [];
					this.currentIndex = 0;
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
					var nextIndex = 0;
					var enabledCurrentElements = this.currentElements.filter(function (item) {
						if (item.disabled) {
							return false;
						}

						if (item.offsetParent === null) {
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

					var nextElement = enabledCurrentElements[nextIndex];

					this.currentIndex = nextIndex;
					nextElement.focus();
				};

				ATPHandler.prototype.calculateElementsInCurrentContext = function calculateElementsInCurrentContext() {
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
					this.currentIndex = null;
				};

				ATPHandler.prototype.registerElements = function registerElements(elements) {
					var level = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

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
						var object = new tabbableElement();
						object.element = element;
						var attrib = element.attributes.getNamedItem("tabindex");
						if (attrib && attrib.value) {
							object.index = parseInt(attrib.value, 10);
						}
						this.contexts[index].elements.push(object);
					}, this);

					this.calculateElementsInCurrentContext();
				};

				ATPHandler.prototype.unregisterElements = function unregisterElements(elements) {
					var level = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

					var self = this;
					var index = this.contexts.map(function (el) {
						return el.level;
					}).indexOf(level);
					var elementsInLevel = this.contexts[index].elements;

					elements.forEach(function (element) {
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
				};

				return ATPHandler;
			}()) || _class));

			_export('ATPHandler', ATPHandler);

			_export('context', context = function context() {
				_classCallCheck(this, context);
			});

			_export('context', context);

			_export('tabbableElement', tabbableElement = function tabbableElement() {
				_classCallCheck(this, tabbableElement);
			});

			_export('tabbableElement', tabbableElement);
		}
	};
});