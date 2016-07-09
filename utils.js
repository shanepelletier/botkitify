'use strict';

module.exports.generateAllPossibleOptions = function (string) {
  var allPossibleOptions = [];

  if (string === undefined) {
    return allPossibleOptions;
  }

  for (var i = 1; i < string.length + 1; i++) {
    allPossibleOptions.push(string.substring(0, i));
  }
  return allPossibleOptions;
};

module.exports.removeDashes = function (string) {
  if (string === undefined) {
    return '';
  }

  var numDashes = 0;
  if (string[0] == '-' && string[1] == '-') {
    numDashes = 2;
  } else if (string[0] == '-') {
    numDashes = 1;
  }
  string = string.substring(numDashes);

  return string;
};

module.exports.parseOptions = function (string) {

  var helpText = 'botkitify - Easily translate AIML, RiveScript, and more into botkit JS code.\n\nUsage:\n    botkitify <filename> [options | commands]\n    botkitify [options] <filename>\n    botkitify -h | --help\n\nOptions:\n    -h --help     Show this screen.\n    -v --version  Show version.\n\nNote: All options are also available as commands, e.g. botkitify help';
  var version = require('./package.json').version;

  if (string === undefined) {
    return helpText;
  }

  var firstLetter = string[0];
  if (firstLetter === 'h') {
    return helpText;
  } else if (firstLetter === 'v') {
    return version;
  }

  return helpText;
};
