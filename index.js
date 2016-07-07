#!/usr/bin/env node
'use strict';

var helpText = 'botkitify - Easily translate AIML, RiveScript, and more into botkit JS code.\n\nUsage:\n    botkitify <filename> [options | commands]\n    botkitify [options] <filename>\n    botkitify -h | --help\n\nOptions:\n    -h --help     Show this screen.\n    -v --version  Show version.\n\nNote: All options are also available as commands, e.g. botkitify help';
var version = require('./package.json').version;

function generateAllPossibleOptions (string) {
  var allPossibleOptions = [];
  for (var i = 1; i < string.length + 1; i++) {
    allPossibleOptions.push(string.substring(0, i));
  }
  return allPossibleOptions;
}

var possibleHelpOptions = generateAllPossibleOptions('help');
possibleHelpOptions = possibleHelpOptions.concat(generateAllPossibleOptions('help'));
possibleHelpOptions = possibleHelpOptions.concat(generateAllPossibleOptions('help'));
for (var i = 4; i < possibleHelpOptions.length - 4; i++) {
  possibleHelpOptions[i] = '-' + possibleHelpOptions[i];
}
for (var i = 8; i < possibleHelpOptions.length; i++) {
  possibleHelpOptions[i] = '--' + possibleHelpOptions[i];
}

var possibleVersionOptions = generateAllPossibleOptions('version');
possibleVersionOptions = possibleVersionOptions.concat(generateAllPossibleOptions('version'));
possibleVersionOptions = possibleVersionOptions.concat(generateAllPossibleOptions('version'));
for (var i = 7; i < possibleVersionOptions.length - 7; i++) {
  possibleVersionOptions[i] = '-' + possibleVersionOptions[i];
}
for (var i = 14; i < possibleVersionOptions.length; i++) {
  possibleVersionOptions[i] = '--' + possibleVersionOptions[i];
}

var possibleOptions = possibleHelpOptions.concat(possibleVersionOptions);
for (var i = 0; i < possibleOptions.length; i++) {
  if (process.argv[2] == possibleOptions[i]) {
    if (i < possibleHelpOptions.length) {
      // Must be a help option
      console.log(helpText);
    } else {
      // Must be a version option
      console.log(version);
    }
  }
}
