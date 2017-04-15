var { makeTimerInactive } = require('../../server/db/controllers/timersCtrl');
var { cancelTimer } = require('../worker');
var { sendNotification, endEvent } = require('./fcmClient');
var { WARNING_10, WARNING_2, DANGER } = require('./constants');

module.exports = function ({id, type, token, recipients}) {

  switch (type) {

  case WARNING_10:
    sendNotification(token, 'Ten Minute Warning', 'Mark yourself safe soon.');
    break;

  case WARNING_2:
    sendNotification(token, 'Two Minute Warning', 'Mark yourself safe soon.');
    break;

  case DANGER:
    recipients.forEach(token => {
      sendNotification(token, 'Danger', 'Someone in your group is in trouble');
    });
    break;
  }

  console.log(`The ${type} timer for the ${name} event has gone off.`);
  cancelTimer(id);
  makeTimerInactive(id).then(() => console.log(`Timer with id ${id} is now inactive`));
};
