'use strict';

var estemplate = require('estemplate');
var escodegen = require('escodegen');

module.exports.generate = function (ast) {
  if (ast === undefined) {
    return '';
  }

  var generatedCode = '';

  for (var i = 0; i < ast.length; i++) {
    var template = estemplate('controller.hears(<%= trigger %>, function (bot, message) { bot.reply(message, <%= response %>) })', {
      trigger: {type: 'Literal', value: ast[i].trigger},
      response: {type: 'Literal', value: ast[i].responses[0]}
    });

    generatedCode += escodegen.generate(template);
  }

  return generatedCode;
};
