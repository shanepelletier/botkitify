#!/usr/bin/env node
'use strict';

var utils = require('./utils.js');

for (var i = 2; i < process.argv.length; i++) {
  var arg = process.argv[2];
  arg = utils.removeDashes(arg);

  console.log(utils.parseOptions(arg));
}
