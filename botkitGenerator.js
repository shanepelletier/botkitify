'use strict';

var estemplate = require('estemplate');
var escodegen = require('escodegen');

module.exports.generate = function (ast) {
  if (ast === undefined) {
    return '';
  } else if (ast === '') {
    return '';
  }

  var template = estemplate('controller.hears(<%= trigger %>, function (bot, message) { bot.reply(message, <%= response %>) })', {
    trigger: {type: 'Literal', value: ast.trigger},
    response: {type: 'Literal', value: ast.response}
  });

  return escodegen.generate(template);
};
