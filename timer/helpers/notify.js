var timers = require('../../server/db/controllers/timersCtrl');

module.exports = function (timer) {
  // some logic to send out the correct notification
  console.log(`The ${timer.type} timer for the ${timer.name} event has gone off.`);
  delete activeTimers[timer.id];
  timers
    .makeTimerInactive(timer.id)
    .then(console.log.bind(null, 'Timer with id ${id} is now inactive'));
};
