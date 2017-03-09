var compare = require('./compare');

function mediator(a, b) {
  if (a.converted === b.converted && this.sortBySecondary) {
    return compare(this, a.convertedSecondary, b.convertedSecondary);
  }
	return compare(this, a.converted, b.converted);
}

function getValue(value, key) {
  if (!key) {
    return String(value);
  }
  return String(value[key]);
}

module.exports = function (array, opts) {
	if (!Array.isArray(array) || array.length < 2) {
		return array;
	}
	if (typeof opts !== 'object') {
		opts = {};
	}
	opts.sign = !!opts.sign;
  var sortBy = opts.sortBy || null;
  var sortBySecondary = opts.sortBySecondary || null;
  var reverse = !!opts.reverse;
	var insensitive = !!opts.insensitive;
	var result = Array(array.length);
	var i, max, value;

	for (i = 0, max = array.length; i < max; i += 1) {
		value = getValue(array[i], sortBy);
		valueSecondary = getValue(array[i], sortBySecondary);
		result[i] = {
			value: array[i],
			converted: insensitive ? value.toLowerCase() : value,
			convertedSecondary: insensitive ? valueSecondary.toLowerCase() : valueSecondary
		};
	}

	result.sort(mediator.bind(opts));

	for (i = result.length - 1; ~i; i -= 1) {
		result[i] = result[i].value;
	}

  if (reverse) {
    result.reverse();
  }

	return result;
};
