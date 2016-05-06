'use strict';

System.register(['aurelia-framework', 'aurelia-pal', './atp-configuration'], function (_export, _context) {
	var inject, DOM, ATPConfiguration, _dec, _class, ATPHandler, context, tabbableElement;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [function (_aureliaFramework) {
			inject = _aureliaFramework.inject;
		}, function (_aureliaPal) {
			DOM = _aureliaPal.DOM;
		}, function (_atpConfiguration) {
			ATPConfiguration = _atpConfiguration.ATPConfiguration;
		}],
		execute: function () {
			_export('ATPHandler', ATPHandler = (_dec = inject(DOM, ATPConfiguration), _dec(_class = function () {
				function ATPHandler(dom, config) {
					_classCallCheck(this, ATPHandler);

					this.currentIndex = 0;
					this.currentContext = null;

					this.DOM = dom;
				}

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
						object.index = element.attributes.getNamedItem("tabindex");
						this.contexts[index].elements.push(object);
					}, this);
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