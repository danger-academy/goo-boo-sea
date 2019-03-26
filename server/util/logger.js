require('colors');
const _ = require('lodash');

const config = require('../config/config');

// noop - no operation function for when loggin is disabled
const noop = () => {};

const consoleLog = config.logging ? console.log.bind(console) : noop;

let logger = {
  log: function() {
    var tag = '[ ✨ LOG ✨ ]'.green;

    var args = _.toArray(arguments)
      .map(function(arg) {
        if(typeof arg === 'object') {

          var string = JSON.stringify(arg, null, 2);
          return tag + '  ' + string.cyan;
        } else {
          return tag + '  ' + arg.cyan;
        }
      });

    consoleLog.apply(console, args);
  },

  error: function() {
    var args = _.toArray(arguments)
      .map(function(arg) {
        arg = arg.stack || arg;
        var name = arg.name || '[ ❌ ERROR ❌ ]';
        var log = name.yellow + '  ' + arg.red;
        return log;
      });

    consoleLog.apply(console, args);
  }
};

module.exports = logger;
