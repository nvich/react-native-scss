const toCamelCase = require('to-camel-case');

const type = object => {
	return {}.toString.call(object).match(/\[object (.*?)\]/)[1].toLowerCase();
};

const propertiesThatMustBeStrings = ["font-weight", "fontWeight"];

const _isNumeric = num => {
	return !isNaN(num)
}

const allProperties = keys => {
	keys.forEach((key, index, arr) => {
		var value = key.value;
		if (type(key.value) == 'string') {
			if (value == "true" || value == "false") {
				arr[index].value = value == "true";
			} else {
				value = key.value.replace(/px|em/g, '');
				if (_isNumeric(value) && propertiesThatMustBeStrings.indexOf(arr[index].key) === -1) {
					arr[index].value = parseFloat(value);
				}
			}
		}
		else if (type(key.value) == 'object') {
			for (let prop in key.value) {
				if (type(key.value[prop]) == 'string') {
					value = key.value[prop].replace(/px|em/g, '');
					if (_isNumeric(value)) {
						arr[index].value[prop] = parseInt(value);
					}
				}
			}
		}
		arr[index].key = toCamelCase(arr[index].key);
	});
};

module.exports = allProperties;
