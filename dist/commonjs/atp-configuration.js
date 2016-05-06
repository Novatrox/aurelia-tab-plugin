'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ATPConfiguration = undefined;

var _atpOptions = require('./atp-options');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ATPConfiguration = exports.ATPConfiguration = function () {
	function ATPConfiguration(aurelia) {
		_classCallCheck(this, ATPConfiguration);

		this.aurelia = aurelia;
		this.settings = _atpOptions.atpOptions;
	}

	ATPConfiguration.prototype.useDefaults = function useDefaults() {
		this.settings = Object.assign(this.settings, _atpOptions.atpOptions);
		return this;
	};

	return ATPConfiguration;
}();