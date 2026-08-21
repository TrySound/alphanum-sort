# alphanum-sort

[![CI](https://github.com/TrySound/alphanum-sort/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/TrySound/alphanum-sort/actions/workflows/ci.yml)

Fast, natural-order sorting for strings and numbers.

Unlike lexicographic sorting, `alphanum-sort` compares numeric parts by value, so
`item2` comes before `item10`. It supports mixed values, leading zeros, signs,
and case-insensitive comparisons without modifying the input array.

## Install

```sh
npm install alphanum-sort
```

## Usage

```js
var sort = require('alphanum-sort');

var items = ['item20', 'item19', 'item1', 'item10', 'item2'];
var result = sort(items);

console.log(result);
// ['item1', 'item2', 'item10', 'item19', 'item20']
```

### Case-insensitive sorting

```js
sort(['A', 'C', 'E', 'b', 'd', 'f'], { insensitive: true });
// ['A', 'b', 'C', 'd', 'E', 'f']
```

### Signed numbers

```js
sort(['10', '-1', '5', '-20'], { sign: true });
// ['-20', '-1', '5', '10']
```

## API

### `sort(array[, options])`

Returns a sorted copy of `array`. Values are compared as strings but retain
their original types in the returned array.

#### `options.insensitive`

- Type: `Boolean`
- Default: `false`

Compare values without regard to letter case.

#### `options.sign`

- Type: `Boolean`
- Default: `false`

Treat `+` and `-` immediately before digits as numeric signs.

## Development

```sh
npm install
npm test
```

The test suite supports Node.js 0.10 and newer.

## License

[MIT](LICENSE) © [Bogdan Chadkin](https://github.com/TrySound)
