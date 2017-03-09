var tape = require('tape');
var alphanum = require('./lib');
var natcompare = require('javascript-natural-sort');

var tests = [{
	message: 'should sort numbers',
	fixture: ['5', '10', '5', '00', '01', '05', '0', '8', '1'],
	expected: ['00', '0', '01', '1', '05', '5', '5', '8', '10']
}, {
  message: 'should reverse-sort numbers',
	fixture: ['5', '10', '5', '00', '01', '05', '0', '8', '1'],
	expected: ['10', '8', '5', '5', '05', '1', '01', '0', '00'],
  options: { reverse: true }
}, {
	message: 'should sort negative numbers',
	fixture: ['10', '-1', '-000033', '0', '5', '-033', '-0', '32', '03', '-20', '3', '00', '-00', '003', '-33', '33'],
	expected: ['-33', '-033', '-000033', '-20', '-1', '-0', '-00', '00', '0', '003', '03', '3', '5', '10', '32', '33'],
	options: { sign: true }
}, {
	message: 'should sort letters',
	fixture: ['b', 'v', 'd', 'c', 'a'],
	expected: ['a', 'b', 'c', 'd', 'v']
}, {
  message: 'should reverse-sort letters',
  fixture: ['b', 'v', 'd', 'c', 'a'],
  expected: ['v', 'd', 'c', 'b', 'a'],
  options: { reverse: true }
}, {
	message: 'should sort mixed data',
	fixture: ['z', '5', '-5', 'k', '10', 'f', '00', 'z00', '10f', 'z10'],
	expected: ['00', '5', '10', '10f', '-5', 'f', 'k', 'z', 'z00', 'z10']
}, {
	message: 'should sort similar dates',
	fixture: ['2008/01/01', '2008/10/01', '1992/01/01', '1991/01/01'],
	expected: ['1991/01/01', '1992/01/01', '2008/01/01', '2008/10/01']
}, {
	message: 'should sort similar dates (2)',
	fixture: ['0000-3-34', '2000-1-10', '2000-1-2', '1999-12-25', '2000-3-23', '1999-3-3'],
	expected: ['0000-3-34', '1999-3-3', '1999-12-25', '2000-1-2', '2000-1-10', '2000-3-23']
}, {
	message: 'should sort ISO8601-ish YYYY-MM-DDThh:mm:ss',
	fixture: ['2010-06-15 13:45:30', '2009-06-15 13:45:30', '2009-01-15 01:45:30'],
	expected: ['2009-01-15 01:45:30', '2009-06-15 13:45:30', '2010-06-15 13:45:30']
}, {
	message: 'should sort unix epoch, Date.getTime()',
	fixture: ['1245098730000', '14330728000', '1245098728000'],
	expected: ['14330728000', '1245098728000', '1245098730000']
}, {
	message: 'should sort close release numbers',
	fixture: ['1.0.2', '1.0.1', '1.0.0', '1.0.9'],
	expected: ['1.0.0', '1.0.1', '1.0.2', '1.0.9']
}, {
	message: 'should sort close version numbers (2)',
	fixture: ['1.1beta', '1.1.2alpha3', '1.0.2alpha3', '1.0.2alpha1', '1.0.1alpha4', '2.1.2', '2.1.1'],
	expected: ['1.0.1alpha4', '1.0.2alpha1', '1.0.2alpha3', '1.1.2alpha3', '1.1beta', '2.1.1', '2.1.2']
}, {
	message: 'should sort fractional release numbers',
	fixture: ['1.011.02', '1.010.12', '1.009.02', '1.009.20', '1.009.10', '1.002.08', '1.002.03', '1.002.01'],
	expected: ['1.002.01', '1.002.03', '1.002.08', '1.009.02', '1.009.10', '1.009.20', '1.010.12', '1.011.02']
}, {
	message: 'should sort multi-digit branch releases',
	fixture: ['1.0.03', '1.0.003', '1.0.002', '1.0.0001'],
	expected: ['1.0.0001', '1.0.002', '1.0.003', '1.0.03']
}, {
	message: 'should sort string first releases',
	fixture: ['myrelease-1.1.3', 'myrelease-1.2.3', 'myrelease-1.1.4', 'myrelease-1.1.1', 'myrelease-1.0.5'],
	expected: ['myrelease-1.0.5', 'myrelease-1.1.1', 'myrelease-1.1.3', 'myrelease-1.1.4', 'myrelease-1.2.3']
}, {
	message: 'should sort strings/numbers',
	fixture: ['10', 9, 2, '1', '4'],
	expected: ['1', 2, '4', 9, '10']
}, {
	message: 'should sort padded numbers',
	fixture: ['0001', '002', '001'],
	expected: ['0001', '001', '002']
}, {
	message: 'should sort padded & regular numbers',
	fixture: [2, 1, '1', '0001', '002', '02', '001'],
	expected: ['0001', '001', 1, '1', '002', '02', 2]
}, {
	message: 'should sort decimal string vs decimal, same precision',
	fixture: ['10.04', 10.02, 10.03, '10.01'],
	expected: ['10.01', 10.02, 10.03, '10.04']
}, {
	message: 'should sort negative numbers cast to strings',
	fixture: ['-1', '-2', '4', '-3', '0', '-5'],
	expected: ['-5', '-3', '-2', '-1', '0', '4'],
	options: { sign: true }
}, {
	message: 'should sort negative numbers of mixed types',
	fixture: [-1, '-2', 4, -3, '0', '-5'],
	expected: ['-5', -3, '-2', -1, '0', 4],
	options: { sign: true }
}, {
	message: 'should sort IP addresses',
	fixture: ['192.168.0.100', '192.168.0.1', '192.168.1.1', '192.168.0.250', '192.168.1.123', '10.0.0.2', '10.0.0.1'],
	expected: ['10.0.0.1', '10.0.0.2', '192.168.0.1', '192.168.0.100', '192.168.0.250', '192.168.1.1', '192.168.1.123']
}, {
	message: 'should sort simple filenames',
	fixture: ['img12.png', 'img10.png', 'img2.png', 'img1.png'],
	expected: ['img1.png', 'img2.png', 'img10.png', 'img12.png']
}, {
	message: 'should sort complex filenames',
	fixture: ['car.mov', '01alpha.sgi', '001alpha.sgi', 'my.string_41299.tif', 'organic2.0001.sgi'],
	expected: ['001alpha.sgi', '01alpha.sgi', 'car.mov', 'my.string_41299.tif', 'organic2.0001.sgi']
}, {
	message: 'should sort unix filenames',
	fixture: [
		'./system/kernel/js/01_ui.core.js',
		'./system/kernel/js/00_jquery-1.3.2.js',
		'./system/kernel/js/02_my.desktop.js'
	],
	expected: [
		'./system/kernel/js/00_jquery-1.3.2.js',
		'./system/kernel/js/01_ui.core.js',
		'./system/kernel/js/02_my.desktop.js'
	]
}, {
	message: 'should sort skipping whitespace',
	fixture: ['alpha', ' 1', '  3', ' 2', '0'],
	expected: ['0', ' 1', ' 2', '  3', 'alpha']
}, {
	message: 'should sort empty strings',
	fixture: ['10023', '999', '', '2', '5'],
	expected: ['', '2', '5', '999', '10023']
}, {
	message: 'should sort a case sensitive unsorted array',
	fixture: ['A', 'b', 'C', 'd', 'E', 'f'],
	expected: ['A', 'C', 'E', 'b', 'd', 'f']
}, {
	message: 'should sort a case insensitive unsorted array',
	fixture: ['A', 'C', 'E', 'b', 'd', 'f'],
	expected: ['A', 'b', 'C', 'd', 'E', 'f'],
	options: { insensitive: true }
}, {
	message: 'invalid numeric string sorting',
	fixture: ['-1', '-00', '+0', '-2', '0', '4', '+00', '00', '-3', '-32', '-0', '-5', '+00'],
	expected: ['-32', '-5', '-3', '-2', '-1', '-0', '-00', '00', '+00', '+00', '0', '+0', '4'],
	options: { sign: true }
}, {
	message: 'alphanumeric - number first',
	fixture: ['5D', '1A', '2D', '33A', '5E', '33K', '33D', '5S', '2C', '5C', '5F', '1D', '2M'],
	expected: ['1A', '1D', '2C', '2D', '2M', '5C', '5D', '5E', '5F', '5S', '33A', '33D', '33K']
}, {
	message: 'should compare signs only before digits',
	fixture: ['+item', '-item', '+34', '-43'],
	expected: ['-43', '+34', '+item', '-item'],
	options: { sign: true }
}, {
  message: 'should sort a collection',
  fixture: [{ key: 'b' }, { key: 'c' }, { key: 'a' }],
  expected: [{ key: 'a' }, { key: 'b' }, { key: 'c' }],
  options: { sortBy: 'key' }
}, {
  message: 'should reverse-sort a collection',
  fixture: [{ key: 'b' }, { key: 'c' }, { key: 'a' }],
  expected: [{ key: 'c' }, { key: 'b' }, { key: 'a' }],
  options: { sortBy: 'key', reverse: true }
}, {
  message: 'should sort a collection with secondary sorting key',
  fixture: [{ key: 'b', value: 'boat' }, { key: 'b', value: 'banana' }, { key: 'c', value: 'cat' }, { key: 'c', value: 'cabbage' }, { key: 'a', value: 'apple' }],
  expected: [{ key: 'a', value: 'apple' }, { key: 'b', value: 'banana' }, { key: 'b', value: 'boat' }, { key: 'c', value: 'cabbage' }, { key: 'c', value: 'cat' }],
  options: { sortBy: 'key', sortBySecondary: 'value' }
}, {
  message: 'should reverse-sort a collection with secondary sorting key',
  fixture: [{ key: 'b', value: 'boat' }, { key: 'b', value: 'banana' }, { key: 'c', value: 'cat' }, { key: 'c', value: 'cabbage' }, { key: 'a', value: 'apple' }],
  expected: [{ key: 'c', value: 'cat' }, { key: 'c', value: 'cabbage' }, { key: 'b', value: 'boat' }, { key: 'b', value: 'banana' }, { key: 'a', value: 'apple' }],
  options: { sortBy: 'key', sortBySecondary: 'value', reverse: true }
}];

tape('alphanum-sort', function (t) {
	t.plan(tests.length);
	tests.forEach(function (test) {
		t.deepEqual(alphanum(test.fixture, test.options), test.expected, test.message);
	});

	var time, i;

	time = process.hrtime();
	for (i = 0; i < 1000; i += 1) {
		tests.forEach(function (test) {
			natcompare.insensitive = test.options && test.options.insensitive;
			test.fixture.sort(natcompare);
		});
	}
	var natCompleted = process.hrtime(time);

	time = process.hrtime();
	for (i = 0; i < 1000; i += 1) {
		tests.forEach(function (test) {
			alphanum(test.fixture, test.options);
		});
	}
	var anCompleted = process.hrtime(time);

	console.log.apply(null, [
		'benchmark\n- alphanum-sort: %dms\n- natural-sort: %dms',
		Math.round((1000 * anCompleted[0] + anCompleted[1] / 1000000) * 100) / 100,
		Math.round((1000 * natCompleted[0] + natCompleted[1] / 1000000) * 100) / 100
	]);
});
