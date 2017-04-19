var { getActiveTimers, getTimerById, makeTimerInactive } = require('../../server/db/controllers/timersCtrl');
var { timerCallback } = require('./notify.js');
var { initializeTimer } = require('./timers');

var getMillisecondsToEnd = function(end) {
  var now = new Date();
  var then = new Date(end);
  return then.valueOf() - now.valueOf();
};

var startTimer = function(timer) {

  var { id, time } = timer;
  var ms = getMillisecondsToEnd(time);

  if (ms > 0) {
    var callback = timerCallback.bind(null, timer);
    initializeTimer(id, ms, callback);
  } else {
    makeTimerInactive(id).then(() => console.log(`Timer ${id} is inactive`));
  }
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

exports.start = function() {
  setUninitializedTimers();
  setInterval(setUninitializedTimers, 30000);
};
