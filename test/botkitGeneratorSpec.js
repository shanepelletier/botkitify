'use strict';

var should = require('should');
var botkitGenerator = require('../botkitGenerator');

context('BotkitGenerator', function () {
  describe('#generate', function () {
    it('should return empty string when called with no parameters', function () {
      var generatedResult = botkitGenerator.generate();

      generatedResult.should.be.a.String();
      generatedResult.should.be.empty();
    });

    it('should return empty string when called with an empty array', function () {
      var generatedResult = botkitGenerator.generate([]);

      generatedResult.should.be.a.String();
      generatedResult.should.be.empty();
    });

    it('should return \'controller.hears(\'hi\', [\'direct_message\'] function (bot, message) { bot.reply(message, \'Hi! How are you?\'); });\' when called with [{trigger: \`hi\`, responses: [\'Hi! How are you?\']}]', function () {
      var expectedResult = 'controller.hears(\'hi\', [\'direct_message\'], function (bot, message) {\n    bot.reply(message, \'Hi! How are you?\');\n});';
      var generatedResult = botkitGenerator.generate([{trigger: 'hi', responses: ['Hi! How are you?']}]);

      generatedResult.should.be.a.String();
      generatedResult.should.equal(expectedResult);
    });

    it('should return  \'controller.hears(\'hi\', [\'direct_message\'] function (bot, message) { bot.reply(message, \'Hi! How are you?\'); });\ncontroller.hears(\'bye\', [\'direct_message\'],function (bot, message) { bot.reply(message, \'Good bye!\'); });\' when called with [{trigger: \'hi\', responses: [\'Hi! How are you?\']}, {trigger: \'bye\', responses: [\'Good bye!\']}]', function () {
      var expectedResult = 'controller.hears(\'hi\', [\'direct_message\'], function (bot, message) {\n    bot.reply(message, \'Hi! How are you?\');\n});controller.hears(\'bye\', [\'direct_message\'], function (bot, message) {\n    bot.reply(message, \'Good bye!\');\n});';
      var generatedResult = botkitGenerator.generate([{trigger: 'hi', responses: ['Hi! How are you?']}, {trigger: 'bye', responses: ['Good bye!']}]);

      generatedResult.should.be.a.String();
      generatedResult.should.equal(expectedResult);
    });
  });
});
