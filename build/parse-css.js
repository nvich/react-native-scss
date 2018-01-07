'use strict';

var Handle = require('./handle');

var format = require('./properties');
var margingAndPadding = require('./properties/margin-and-padding');
var border = require('./properties/border');
var boxShadow = require('./properties/box-shadow');
var flex = require('./properties/flex');
var transform = require('./properties/transform');
var lineHeight = require('./properties/line-height');
var final = require('./save-all');

module.exports = function (css) {
	var handle = new Handle(css);

	handle.use(['margin', 'padding'], margingAndPadding);
	handle.use(['border', 'border-top', 'borderTop', 'border-bottom', 'borderBottom', 'border-left', 'borderLeft', 'border-right', 'borderRight', 'border-width', 'borderWidth', 'border-top-width', 'borderTopWidth', 'border-right-width', 'borderRightWidth', 'border-bottom-width', 'borderBottomWidth', 'border-left-width', 'borderLeftWidth', 'border-style', 'borderStyle', 'border-top-style', 'borderTopStyle', 'border-right-style', 'borderRightStyle', 'border-bottom-style', 'borderBottomStyle', 'border-left-style', 'borderLeftStyle', 'border-color', 'borderColor'], border);
	handle.use(['box-shadow', 'boxShadow'], boxShadow);
	handle.use(['flex'], flex);
	handle.use(['transform'], transform);
	handle.use(['line-height'], lineHeight);
	handle.use(format);

	handle.final(final);

	return handle.do();
};