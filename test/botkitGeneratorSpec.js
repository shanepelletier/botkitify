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

    it('should return empty string when called with an empty string', function () {
      var generatedResult = botkitGenerator.generate('');

      generatedResult.should.be.a.String();
      generatedResult.should.be.empty();
    });

    it('should return \'controller.hears(\'hi\', function (bot, message) { bot.reply(message, \'Hi! How are you?\'); });\' when called with {trigger: \`hi\`, response: \'Hi! How are you?\'}', function () {
      var expectedResult = 'controller.hears(\'hi\', function (bot, message) {\n    bot.reply(message, \'Hi! How are you?\');\n});';
      var generatedResult = botkitGenerator.generate({trigger: 'hi', response: 'Hi! How are you?'});

      generatedResult.should.be.a.String();
      generatedResult.should.equal(expectedResult);
    });
  });
});
