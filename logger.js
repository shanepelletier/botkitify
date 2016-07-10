'use strict';

module.exports.log = function () {
  console.log.apply(console, Array.prototype.slice.call(arguments));
};
