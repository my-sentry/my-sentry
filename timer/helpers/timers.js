global.activeTimers = global.activeTimers || {};

exports.initializeTimer = function(id, ms, callback) {
  activeTimers[id] = setTimeout(callback, ms);
  console.log(`Timer ${id} initialized.`);
};

exports.endTimer = function(id) {

  if (!activeTimers[id]) {
    return console.log('Timer does not exist in memory');
  }

  global.clearTimeout(activeTimers[id]);
  delete activeTimers[id];
  console.log(`Timer ${id} was taken out of memory.`);
};
