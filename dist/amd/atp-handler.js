define(['exports', 'aurelia-framework', 'aurelia-pal', './atp-configuration'], function (exports, _aureliaFramework, _aureliaPal, _atpConfiguration) {
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

	var ATPHandler = exports.ATPHandler = (_dec = (0, _aureliaFramework.inject)(_aureliaPal.DOM, _atpConfiguration.ATPConfiguration), _dec(_class = function () {
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
	}()) || _class);

	var context = exports.context = function context() {
		_classCallCheck(this, context);
	};

	var tabbableElement = exports.tabbableElement = function tabbableElement() {
		_classCallCheck(this, tabbableElement);
	};
});