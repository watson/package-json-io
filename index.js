'use strict'

var fs = require('fs')
var os = require('os')
var path = require('path')

exports.read = function (file, cb) {
  if (typeof file === 'function') return exports.read(pkgFile(), file)

  fs.exists(file, function (exists) {
    if (!exists) return cb(new Error('No package.json found'))

    fs.readFile(file, function (err, data) {
      if (err) return cb(err)

      try {
        data = JSON.parse(data)
      } catch (e) {
        return cb(new Error('No valid package.json found'))
      }

      cb(null, data)
    })
  })
}

exports.update = function (file, data, cb) {
  if (typeof data === 'function') return exports.update(pkgFile(), file, data)

  data = JSON.stringify(data, null, 2)
  fs.writeFile(file, data + os.EOL, cb)
}

// evaluate every time in case cwd changes - mostly useful when testing
function pkgFile () {
  return path.join(process.cwd(), 'package.json')
}
