"use strict";

var saveAll = function saveAll(styles, keys) {
	keys.forEach(function (ob) {
		styles[ob.key] = ob.value;
	});
};

module.exports = saveAll;