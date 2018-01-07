const Handle = require('./handle');

const format = require('./properties');
const margingAndPadding = require('./properties/margin-and-padding');
const border = require('./properties/border');
const boxShadow = require('./properties/box-shadow');
const flex = require('./properties/flex');
const transform = require('./properties/transform');
const lineHeight = require('./properties/line-height');
const final = require('./save-all');

module.exports = function (css) {
	const handle = new Handle(css);

	handle.use(['margin', 'padding'], margingAndPadding);
	handle.use([
		'border',
		'border-top',
		'borderTop',
		'border-bottom',
		'borderBottom',
		'border-left',
		'borderLeft',
		'border-right',
		'borderRight',
		'border-width',
		'borderWidth',
		'border-top-width',
		'borderTopWidth',
		'border-right-width',
		'borderRightWidth',
		'border-bottom-width',
		'borderBottomWidth',
		'border-left-width',
		'borderLeftWidth',
		'border-style',
		'borderStyle',
		'border-top-style',
		'borderTopStyle',
		'border-right-style',
		'borderRightStyle',
		'border-bottom-style',
		'borderBottomStyle',
		'border-left-style',
		'borderLeftStyle',
		'border-color',
		'borderColor'
	], border);
	handle.use(['box-shadow', 'boxShadow'], boxShadow);
	handle.use(['flex'], flex);
	handle.use(['transform'], transform);
	handle.use(['line-height'], lineHeight);
	handle.use(format);

	handle.final(final);

	return handle.do();
};
