var timers = require('../server/db/controllers/timersCtrl');
var notify = require('./helpers/notify.js');

global.activeTimers = {};

var getMillisecondsToEnd = function(end) {
  var now = new Date();
  var then = new Date(end);
  return then.valueOf() - now.valueOf();
};

var startTimer = function(timer) {
  var callback = notify.bind(null, timer);
  var ms = getMillisecondsToEnd(timer.time);
  activeTimers[timer.id] = setTimeout(callback, ms);
};

var setUninitializedTimers = function() {
  return timers.getActiveTimers()
    // filter out timers that haven't been initialized
    .then(timers => timers.filter(timer => !activeTimers[timer.id]))
    // get all the relevent information about each timer to be added
    .then(results => Promise.all(results.map(item => timers.getTimerById(item.id))))
    // start each timer
    .then(inactiveTimers => inactiveTimers.forEach(timer => startTimer(timer)));
};

module.exports = function() {
  setUninitializedTimers();
  setInterval(setUninitializedTimers, 30000);
};
