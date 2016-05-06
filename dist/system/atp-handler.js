'use strict';

System.register(['aurelia-framework', 'aurelia-pal', './atp-configuration'], function (_export, _context) {
	var inject, DOM, ATPConfiguration, _dec, _class, ATPHandler;

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
			_export('ATPHandler', ATPHandler = (_dec = inject(DOM, ATPConfiguration), _dec(_class = function ATPHandler(dom, config) {
				_classCallCheck(this, ATPHandler);

				this.DOM = dom;
			}) || _class));

			_export('ATPHandler', ATPHandler);
		}
	};
});