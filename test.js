'use strict'

var fs = require('fs')
var path = require('path')
var osTmpdir = require('os-tmpdir')
var test = require('tape')
var pkg = require('./')

test('#read(cb)', function (t) {
  var dir = osTmpdir()
  var file = path.join(dir, 'package.json')
  process.chdir(dir)
  fs.writeFile(file, '{"name":"testing"}', function (err) {
    t.error(err)
    pkg.read(function (err, data) {
      t.error(err)
      t.equal(data.name, 'testing')
      t.end()
    })
  })
})

test('#read(file, cb)', function (t) {
  var dir = osTmpdir()
  var file = path.join(dir, 'custom.json')
  process.chdir(dir)
  fs.writeFile(file, '{"name":"testing"}', function (err) {
    t.error(err)
    pkg.read(file, function (err, data) {
      t.error(err)
      t.equal(data.name, 'testing')
      t.end()
    })
  })
})

test('#update(data, cb)', function (t) {
  var dir = osTmpdir()
  var file = path.join(dir, 'package.json')
  var now = Date.now()
  var data = { foo: now }
  process.chdir(dir)
  pkg.update(data, function (err) {
    t.error(err)
    fs.readFile(file, function (err, data) {
      t.error(err)
      data = JSON.parse(data)
      t.equal(data.foo, now)
      t.end()
    })
  })
})

test('#update(file, data, cb)', function (t) {
  var dir = osTmpdir()
  var file = path.join(dir, 'custom.json')
  var now = Date.now()
  var data = { foo: now }
  process.chdir(dir)
  pkg.update(file, data, function (err) {
    t.error(err)
    fs.readFile(file, function (err, data) {
      t.error(err)
      data = JSON.parse(data)
      t.equal(data.foo, now)
      t.end()
    })
  })
})
