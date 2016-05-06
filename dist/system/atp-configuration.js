'use strict';

System.register(['./atp-options'], function (_export, _context) {
	var atpOptions, ATPConfiguration;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [function (_atpOptions) {
			atpOptions = _atpOptions.atpOptions;
		}],
		execute: function () {
			_export('ATPConfiguration', ATPConfiguration = function () {
				function ATPConfiguration(aurelia) {
					_classCallCheck(this, ATPConfiguration);

					this.aurelia = aurelia;
					this.settings = atpOptions;
				}

				ATPConfiguration.prototype.useDefaults = function useDefaults() {
					this.settings = Object.assign(this.settings, atpOptions);
					return this;
				};

				return ATPConfiguration;
			}());

			_export('ATPConfiguration', ATPConfiguration);
		}
	};
});