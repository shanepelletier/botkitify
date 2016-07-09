'use strict';

var should = require('should');
var AIMLParser = require('../AIMLParser.js');

context('AIMLParser', function () {
  describe('#parse', function () {
    it('should throw an error with message \'Too few arguments: need exactly two arguments\' if called with no arguments', function () {
      (function () { AIMLParser.parse() }).should.throw('Too few arguments: need exactly two arguments');
    });

    it('should throw an error with message \'Too few arguments: need exactly two arguments\' if called with only one argument', function () {
      (function () { AIMLParser.parse('') }).should.throw('Too few arguments: need exactly two arguments');
    });

    it('should throw an error with message \'Too many arguments: need exactly two arguments\' if called with three arguments', function () {
      (function () { AIMLParser.parse('', '', '') }).should.throw('Too many arguments: need exactly two arguments');
    });

    it('should throw an error with message \'First argument must be a string\' if passed a non-string first argument', function () {
      (function () { AIMLParser.parse([], function () {}) }).should.throw('First argument must be a string');
    });

    it('should throw an error with message \'Second argument must be a function\' if passed a non-function second argument', function () {
      (function () { AIMLParser.parse('', {}) }).should.throw('Second argument must be a function');
    });

    it('should call callback function with parameter \'result\' equal to {trigger: \'hi\', response: \'Hi! How are you?\'} for input \'<aiml><pattern>HI</pattern><template>Hi! How are you?</template></aiml>\'', function (done) {
      var expectedResult = {trigger: 'hi', response: 'Hi! How are you?'};
      AIMLParser.parse('<aiml><pattern>HI</pattern><template>Hi! How are you?</template></aiml>', function (result) {
        result.should.be.an.Object();
        result.should.deepEqual(expectedResult);
        done();
      });
    });
  });
});
