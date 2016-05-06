define(['exports', 'aurelia-framework', 'aurelia-pal', './atp-configuration'], function (exports, _aureliaFramework, _aureliaPal, _atpConfiguration) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ATPHandler = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var ATPHandler = exports.ATPHandler = (_dec = (0, _aureliaFramework.inject)(_aureliaPal.DOM, _atpConfiguration.ATPConfiguration), _dec(_class = function ATPHandler(dom, config) {
		_classCallCheck(this, ATPHandler);

		this.DOM = dom;
	}) || _class);
});