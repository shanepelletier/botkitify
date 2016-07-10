'use strict';

var should = require('should');
var sinon = require('sinon');
require('should-sinon');
var proxyquire = require('proxyquire');
var utils = require('../utils.js');

context('Utils', function () {
  describe('#generateAllPossibleOptions', function () {
    it('should return an empty array for no input', function () {
      var expectedPossibleOptions = [];
      var allPossibleOptions = utils.generateAllPossibleOptions();

      allPossibleOptions.should.be.an.Array();
      allPossibleOptions.should.be.empty();
    });

    it('should return an empty array for an empty string', function () {
      var expectedPossibleOptions = [];
      var allPossibleOptions = utils.generateAllPossibleOptions('');

      allPossibleOptions.should.be.an.Array();
      allPossibleOptions.should.be.empty();
    });

    it('should return [\'h\', \'he\', \'hel\', \'help\'] for the input \'help\'', function () {
      var expectedPossibleOptions = ['h', 'he', 'hel', 'help'];
      var allPossibleOptions = utils.generateAllPossibleOptions('help');

      allPossibleOptions.should.be.an.Array();
      allPossibleOptions.should.have.length(4);
      allPossibleOptions.should.deepEqual(expectedPossibleOptions);
    });
  });

  describe('#removeDashes', function () {
    it('should return empty string when called with no arguments', function () {
      var result = utils.removeDashes();
      var expectedResult = '';

      result.should.be.a.String();
      result.should.equal(expectedResult);
    });

    it('should return empty string when called with an empty string', function () {
      var result = utils.removeDashes('');
      var expectedResult = '';

      result.should.be.a.String();
      result.should.equal(expectedResult);
    });

    it('should return \'help\' when called with \'-help\'', function () {
      var result = utils.removeDashes('-help');
      var expectedResult = 'help';

      result.should.be.a.String();
      result.should.equal(expectedResult);
    });

    it('should return \'help\' when called with \'--help\'', function () {
      var result = utils.removeDashes('--help');
      var expectedResult = 'help';

      result.should.be.a.String();
      result.should.equal(expectedResult);
    });
  });

  describe('#parseOption', function () {
    var helpText = 'botkitify - Easily translate AIML, RiveScript, and more into botkit JS code.\n\nUsage:\n    botkitify <filename> [options | commands]\n    botkitify [options] <filename>\n    botkitify -h | --help\n\nOptions:\n    -h --help     Show this screen.\n    -v --version  Show version.\n\nNote: All options are also available as commands, e.g. botkitify help';
    var version = require('../package.json').version;

    it('should return help text when called with no arguments', function () {
      var parsedOption = utils.parseOption();
      var expectedResult = helpText;

      parsedOption.should.be.a.String();
      parsedOption.should.equal(expectedResult);
    });

    it('should return help text when called with an empty string', function () {
      var parsedOption = utils.parseOption('');
      var expectedResult = helpText;

      parsedOption.should.be.a.String();
      parsedOption.should.equal(expectedResult);
    });

    it('should return help text when called with \'help\'', function () {
      var parsedOption = utils.parseOption('help');
      var expectedResult = helpText;

      parsedOption.should.be.a.String();
      parsedOption.should.equal(expectedResult);
    });

    it('should return version number when called with \'version\'', function () {
      var parsedOption = utils.parseOption('version');
      var expectedResult = version;

      parsedOption.should.be.a.String();
      parsedOption.should.equal(expectedResult);
    });
  });

  describe('#handleArguments', function () {
    var helpText = 'botkitify - Easily translate AIML, RiveScript, and more into botkit JS code.\n\nUsage:\n    botkitify <filename> [options | commands]\n    botkitify [options] <filename>\n    botkitify -h | --help\n\nOptions:\n    -h --help     Show this screen.\n    -v --version  Show version.\n\nNote: All options are also available as commands, e.g. botkitify help';
    var version = require('../package.json').version;

    var l = {
      log: sinon.spy()
    };

    var utils = proxyquire('../utils.js', {
      './logger.js': l
    });

    it('should output help text when called with no arguments', function () {
      utils.handleArguments();

      l.log.should.be.calledWith(helpText);
    });

    it('should output help text when called with less than three arguments', function () {
      utils.handleArguments(['first', 'second']);

      l.log.should.be.calledWith(helpText);
    });
  });
});
