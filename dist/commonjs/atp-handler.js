'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ATPHandler = undefined;

var _dec, _class;

var _aureliaFramework = require('aurelia-framework');

var _aureliaPal = require('aurelia-pal');

var _atpConfiguration = require('./atp-configuration');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ATPHandler = exports.ATPHandler = (_dec = (0, _aureliaFramework.inject)(_aureliaPal.DOM, _atpConfiguration.ATPConfiguration), _dec(_class = function ATPHandler(dom, config) {
	_classCallCheck(this, ATPHandler);

	this.DOM = dom;
}) || _class);