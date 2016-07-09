#!/usr/bin/env node
'use strict';

var fs = require('fs');
var xml2js = require('xml2js');
var utils = require('./utils.js');

for (var i = 2; i < process.argv.length; i++) {
  var arg = process.argv[i];
  arg = utils.removeDashes(arg);

  console.log(utils.parseOptions(arg));
}
