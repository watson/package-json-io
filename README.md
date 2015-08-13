# package-json-io

Read and update `package.json` files.

[![Build status](https://travis-ci.org/watson/package-json-io.svg?branch=master)](https://travis-ci.org/watson/package-json-io)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Installation

```
npm install package-json-io
```

## Usage

```js
var pkg = require('package-json-io')

// read and parse the package.json file in current directory
pkg.read(function (err, data) {
  data.license = 'MIT'

  // update the package.json file in the current directory with a new license
  pkg.update(data, function (err) {
    if (err) throw err
  })
})
```

## API

#### `read([file], callback)` 

Will read the `package.json` file in the current working directory
unless the optinal `file` argument specifies another file.

Will call the `callback` with an optinal error argument and the data
from the parsed `package.json` file.

#### `update([file], data, callback)` 

Will replace the `package.json` file in the current working directory
(unless the optinal `file` argument specifies another file) with the
provided `data` object.

Will call the `callback` when done with an optional error argument.

## License

MIT
