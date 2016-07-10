'use strict';

var should = require('should');
var utils = require('../utils.js')

context('botkitify-cli', function () {
  var binName = './index.js';
  var index = require('.' + binName);

  describe('options', function () {
    var spawn = require('cross-spawn');
    // Spawning a new process takes some time, so raise the default 'slow' time
    this.slow(300);

    describe('should produce help output when ran with', function () {
      var possibleOptions = utils.generateAllPossibleOptions('help');
      var expectedHelpOutput = 'botkitify - Easily translate AIML, RiveScript, and more into botkit JS code.\n\nUsage:\n    botkitify <filename> [options | commands]\n    botkitify [options] <filename>\n    botkitify -h | --help\n\nOptions:\n    -h --help     Show this screen.\n    -v --version  Show version.\n\nNote: All options are also available as commands, e.g. botkitify help\n'

      it('no arguments', function () {
        var botkitifyCli = spawn.sync('node', [binName]);
        botkitifyCli.stdout.toString().should.equal(expectedHelpOutput);
      });

      // For command style e.g. 'help'
      for (var i = 0; i < possibleOptions.length; i++) {
        var possibleOption = possibleOptions[i];
        it(possibleOption, function () {
          var botkitifyCli = spawn.sync('node', [binName, possibleOption]);
          botkitifyCli.stdout.toString().should.equal(expectedHelpOutput);
        });
      }

      // For single dash style e.g. '-help'
      for (var i = 0; i < possibleOptions.length; i++) {
        var possibleOption = '-' + possibleOptions[i];
        it(possibleOption, function () {
          var botkitifyCli = spawn.sync('node', [binName, possibleOption]);
          botkitifyCli.stdout.toString().should.equal(expectedHelpOutput);
        });
      }

      // For double dash style e.g. '--help'
      for (var i = 0; i < possibleOptions.length; i++) {
        var possibleOption = '--' + possibleOptions[i];
        it (possibleOption, function () {
          var botkitifyCli = spawn.sync('node', [binName, possibleOption]);
          botkitifyCli.stdout.toString().should.equal(expectedHelpOutput);
        });
      }
    });

    describe('should produce version when ran with', function () {
      var possibleOptions = utils.generateAllPossibleOptions('version');
      var expectedVersion = require('../package.json').version + '\n';

      // For command style e.g. 'version'
      for (var i = 0; i < possibleOptions.length; i++) {
        var possibleOption = possibleOptions[i];
        it(possibleOption, function () {
          var botkitifyCli = spawn.sync('node', [binName, possibleOption]);
          botkitifyCli.stdout.toString().should.equal(expectedVersion);
        });
      }

      // For single dash style e.g. '-version'
      for (var i = 0; i < possibleOptions.length; i++) {
        var possibleOption = '-' + possibleOptions[i];
        it(possibleOption, function () {
          var botkitifyCli = spawn.sync('node', [binName, possibleOption]);
          botkitifyCli.stdout.toString().should.equal(expectedVersion);
        });
      }

      // For double dash style e.g. '--version'
      for (var i = 0; i < possibleOptions.length; i++) {
        var possibleOption = '--' + possibleOptions[i];
        it (possibleOption, function () {
          var botkitifyCli = spawn.sync('node', [binName, possibleOption]);
          botkitifyCli.stdout.toString().should.equal(expectedVersion);
        });
      }
    });
  });
});
