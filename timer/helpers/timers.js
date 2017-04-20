const moment = require('moment');

global.activeTimers = global.activeTimers || {};

exports.initializeTimer = function(id, ms, callback) {
  activeTimers[id] = setTimeout(callback, ms);
  console.log(`Timer ${id} initialized for ${moment.duration(ms).humanize()} from now.`);
};

exports.endTimer = function(id) {

  if (!activeTimers[id]) {
    return console.log(`Timer ${id} does not exist in memory`);
  }

  global.clearTimeout(activeTimers[id]);
  delete activeTimers[id];
  console.log(`Timer ${id} taken out of memory.`);
};
