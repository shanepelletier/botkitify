'use strict';

var parseString = require('xml2js').parseString;

module.exports.parse = function (stringToParse, callback) {

  if (arguments.length < 2) {
    throw new Error('Too few arguments: need at least two arguments');
  }

  if (typeof stringToParse !== 'string') {
    throw new TypeError('First argument must be a string');
  }

  if (typeof callback !== 'function') {
    throw new TypeError('Second argument must be a function');
  }

  parseString(stringToParse, function (err, _result) {
    var result = [];

    for (var i = 0; i < _result.aiml.pattern.length; i++) {
      var tempObj = {
        trigger: _result.aiml.pattern[i].toLowerCase(),
        responses: [_result.aiml.template[i]]
      };

      result.push(tempObj);
    }

    callback(result);
  });
};
