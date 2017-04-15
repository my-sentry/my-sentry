var { getActiveTimers, getTimerById } = require('../server/db/controllers/timersCtrl');
var notify = require('./helpers/notify.js');

global.activeTimers = global.activeTimers || {};

var getMillisecondsToEnd = function(end) {
  var now = new Date();
  var then = new Date(end);
  return then.valueOf() - now.valueOf();
};

var startTimer = function(timer) {
  console.log('Timer: ', timer);
  var callback = notify.bind(null, timer);
  var ms = getMillisecondsToEnd(timer.time);
  activeTimers[timer.id] = setTimeout(callback, ms);
};

var setUninitializedTimers = function() {
  return getActiveTimers()
    // filter out timers that haven't been initialized
    .then(timers => timers.filter(({ id }) => !activeTimers[id]))
    // get all the relevent information about each timer to be added
    .then(results => Promise.all(results.map(({ id }) => getTimerById(id))))
    // start each timer
    .then(inactiveTimers => inactiveTimers.forEach(timer => startTimer(timer)));
};

exports.cancelTimer = function(id) {

  if (!activeTimers[id]) {
    return console.log('Timer does not exist in memory');
  }

  window.clearTimeout(activeTimers[id]);
  delete activeTimers[id];
  console.log(`Timer ${id} was taken out of memory.`);
};

exports.start = function() {
  setUninitializedTimers();
  setInterval(setUninitializedTimers, 30000);
};
