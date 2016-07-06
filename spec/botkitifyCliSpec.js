describe('botkitify-cli', function () {
  var binName = './index.js';

  describe('options', function () {
    var spawn = require('cross-spawn');

    function generateAllPossibleOptions (string) {
      var allPossibleOptions = [];
      for (var i = 1; i < string.length + 1; i++) {
        allPossibleOptions.push(string.substring(0, i));
      }
      return allPossibleOptions;
    }

    describe('produces help output when ran with', function () {
      var possibleOptions = generateAllPossibleOptions('help');
      var expectedHelpOutput = 'botkitify - Easily translate AIML, RiveScript, and more into botkit JS code.\n\nUsage:\n    botkitify <filename> [options | commands]\n    botkitify [options] <filename>\n    botkitify -h | --help\n\nOptions:\n    -h --help     Show this screen.\n    -v --version  Show version.\n\nNote: All options are also available as commands, e.g. botkitify help\n'

      // For command style e.g. 'help'
      for (var i = 0; i < possibleOptions.length; i++) {
        possibleOption = possibleOptions[i];
        it(possibleOption, function (done) {
          var botkitifyCli = spawn(binName, [possibleOption]);
          botkitifyCli.stdout.on('data', function (data) {
            expect(data.toString()).toEqual(expectedHelpOutput);
            done();
          });
        });
      }

      // For single dash style e.g. '-help'
      for (var i = 0; i < possibleOptions.length; i++) {
        possibleOption = '-' + possibleOptions[i];
        it(possibleOption, function (done) {
          var botkitifyCli = spawn(binName, [possibleOption]);
          botkitifyCli.stdout.on('data', function (data) {
            expect(data.toString()).toEqual(expectedHelpOutput);
            done();
          });
        });
      }

      // For double dash style e.g. '--help'
      for (var i = 0; i < possibleOptions.length; i++) {
        possibleOption = '--' + possibleOptions[i];
        it (possibleOption, function (done) {
          var botkitifyCli = spawn(binName, [possibleOption]);
          botkitifyCli.stdout.on('data', function (data) {
            expect(data.toString()).toEqual(expectedHelpOutput);
            done();
          });
        });
      }
    });
  });
});
