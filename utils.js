'use strict';

var fs = require('fs');
var l = require('./logger.js');
var AIMLParser = require('./AIMLParser.js');
var botkitGenerator = require('./botkitGenerator.js');

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

module.exports.parseOption = function (string) {

  var helpText = 'botkitify - Easily translate AIML, RiveScript, and more into botkit JS code.\n\nUsage:\n    botkitify <filename> [options | commands]\n    botkitify [options] <filename>\n    botkitify -h | --help\n\nOptions:\n    -h --help     Show this screen.\n    -v --version  Show version.\n\nNote: All options are also available as commands, e.g. botkitify help';
  var version = require('./package.json').version;

  if (string === undefined) {
    return helpText;
  }

  if (string === '') {
    return helpText;
  }

  var firstLetter = string[0];
  if (firstLetter === 'h') {
    return helpText;
  } else if (firstLetter === 'v') {
    return version;
  }

  // return helpText;
  /* istanbul ignore next */
  fs.readFile(string, function (err, data) {
    if (data !== undefined) {
      AIMLParser.parse(data.toString(), function (result) {
        fs.writeFile('out.js', botkitGenerator.generate(result));
      });
    }
  });
};

module.exports.handleArguments = function (argv) {
  if (argv === undefined) {
    l.log(this.parseOption());
    return;
  }

  if (argv.length < 3) {
    l.log(this.parseOption());
    return;
  }

  for (var i = 2; i < argv.length; i++) {
    var arg = argv[i];
    arg = this.removeDashes(arg);

    l.log(this.parseOption(arg));
  }
}
