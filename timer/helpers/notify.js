var timers = require('../../server/db/controllers/timersCtrl');
var { sendNotification } = require('./fcmClient');
var { WARNING_10, WARNING_2, DANGER } = require('./constants');

module.exports = function (timer) {

  switch (timer.type) {

  case WARNING_10:
    sendNotification(timer.token, 'Ten Minute Warning', 'Mark yourself safe soon.');
    break;

  case WARNING_2:
    sendNotification(timer.token, 'Two Minute Warning', 'Mark yourself safe soon.');
    break;

  case DANGER:
    timer.recipients.forEach(token => {
      sendNotification(token, 'Danger', 'Someone in your group is in trouble');
    });
    break;
  }

  // some logic to send out the correct notification
  console.log(`The ${timer.type} timer for the ${timer.name} event has gone off.`);
  delete activeTimers[timer.id];
  timers
    .makeTimerInactive(timer.id)
    .then(console.log.bind(null, 'Timer with id ${id} is now inactive'));
};
