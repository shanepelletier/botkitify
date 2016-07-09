'use strict';

var parseString = require('xml2js').parseString;

module.exports.parse = function (stringToParse, callback) {

  if (arguments.length < 2) {
    throw new Error('Too few arguments: need exactly two arguments');
  } else if (arguments.length > 2) {
    throw new Error('Too many arguments: need exactly two arguments');
  }

  if (typeof stringToParse !== 'string') {
    throw new TypeError('First argument must be a string');
  }

  if (typeof callback !== 'function') {
    throw new TypeError('Second argument must be a function');
  }

  parseString(stringToParse, function (err, _result) {
    var result = {
      trigger: _result.aiml.pattern[0].toLowerCase(),
      response: _result.aiml.template[0]
    };

    callback(result);
  });
};
