const { FCM_CLIENT_KEY } = require('../../config/config');
const { WARNING_10, WARNING_2, DANGER, API_URL } = require('./constants');
const { makeTimerInactive } = require('../../server/db/controllers/timersCtrl');
const { endTimer } = require('./timers');
const axios = require('axios');

var sendNotification = function(token, title, message) {

  var notif = JSON.stringify({
    'to': token,
    'data': {
      'title': title,
      'body': message,
      'sound': 'default',
      'click_action': 'fcm.ACTION.HELLO',
      'remote': true
    },
    'priority': 'normal'
  });

  return axios({
    method: 'POST',
    url: API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': parseInt(notif.length),
      'Authorization': `key=${FCM_CLIENT_KEY}`
    },
    data: notif
  })

  .then(response => {
    console.log('Notification on its way');
  })

  .catch(err => {
    console.log('Error Sending Notification: ', err);
  });
};


exports.timerCallback = function ({id, type, token, recipients, name}) {

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
  endTimer(id);
  makeTimerInactive(id).then(() => console.log(`Timer with id ${id} is now inactive`));
};

exports.sendSafe = function({ recipients, username, name, id }) {
  recipients.forEach(token => {
    let message = `${username} has marked themselves safe`;
    sendNotification(token, `${name}`, message);
  });
};

exports.sendDanger = function({ recipients, username, name }) {
  recipients.forEach(token => {
    let message = `${username} is in a dangerous situation`;
    sendNotification(token, `${name} - DANGER`, message);
  });
};
