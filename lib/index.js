var compare = require('./compare');

module.exports = function (array, opts) {
	if (typeof opts !== 'object') {
		opts = {};
	}
	if (!Array.isArray(array)) {
		array = [];
	}
	var insensitive = opts.insensitive;
	var result = [];
	var i, max, value;

	for (i = 0, max = array.length; i < max; i += 1) {
		value = String(array[i]);
		result.push({
			value: array[i],
			converted: insensitive ? value.toLowerCase() : value
		});
	}

	result.sort(compare.bind(null, opts));

	for (i = result.length - 1; ~i; i -= 1) {
		result[i] = result[i].value;
	}

	return result;
};
