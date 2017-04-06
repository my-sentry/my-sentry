var timers = require('../../server/db/controllers/timersCtrl');

var activeTimers = {};

var getMillisecondsToEnd = function(end) {
  var now = new Date();
  var then = new Date(end);

  return then.valueOf() - now.valueOf();
};

var startTimer = function(id, time, callback) {
  activeTimers[id] = setTimeout(callback, getMillisecondsToEnd(time));
};

var notifications = function(id, name, type) {
  // this is where push notifications would be sent out
  console.log(`The ${type} timer for the ${name} event has gone off.`);
  delete activeTimers[id];
  timers
    .makeTimerInactive(id)
    .then(console.log.bind(null, `Timer with id ${id} is now inactive`));
};

var setUninitializedTimers = function() {

  timers
    .getActiveTimers()
    .then(timers => timers.filter(timer => !activeTimers[timer.id]))
    .then(inactiveTimers => {
      inactiveTimers.forEach(timer => {
        startTimer(timer.id, timer.time, notifications.bind(null, timer.id, timer.name, timer.type));
      });
    });
};

setUninitializedTimers();
