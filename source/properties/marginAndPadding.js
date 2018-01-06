const marginAndPadding = keys => {
	let values = keys[0].value.split(' ');
	let property = keys[0].key;

	let length = values.length;
	keys = [];

	if (length === 1) {
		['Top', 'Bottom', 'Right', 'Left'].forEach(prop => {
			keys.push({
				key: property + prop,
				value: values[0]
			});
		});
	}

	else if (length === 2) {
		['Top', 'Bottom'].forEach(prop => {
			keys.push({
				key: property + prop,
				value: values[0]
			});
		});
		['Right', 'Left'].forEach(prop => {
			keys.push({
				key: property + prop,
				value: values[1]
			});
		});
	}

	else if (length === 3) {
		['Left', 'Right'].forEach(prop => {
			keys.push({
				key: property + prop,
				value: values[1]
			});
		});
		keys.push({
			key: property + 'Top',
			value: values[0]
		});
		keys.push({
			key: property + 'Bottom',
			value: values[2]
		});
	}

	else if (length === 4) {
		['Top', 'Right', 'Bottom', 'Left'].forEach((prop, index) => {
			keys.push({
				key: property + prop,
				value: values[index]
			});
		});
	}

	return keys;
};

module.exports = marginAndPadding;
