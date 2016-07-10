#!/usr/bin/env node
'use strict';

var fs = require('fs');
var xml2js = require('xml2js');
var utils = require('./utils.js');

utils.handleArguments(process.argv);
