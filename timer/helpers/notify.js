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


exports.timerCallback = function ({ id, type, token, recipients, name, username }) {

  switch (type) {

  case WARNING_10:
    sendNotification(token, name, '10 Minute Warning - Mark yourself safe soon.');
    break;

  case WARNING_2:
    sendNotification(token, name, '2 Minute Warning - Mark yourself safe soon.');
    break;

  case DANGER:
    recipients.forEach(token => {
      sendNotification(token, `${name} - DANGER`, `${username} is in a dangerous situation`);
    });
    break;
  }

  console.log(`The ${type} timer for the ${name} event has gone off.`);
  endTimer(id);
  makeTimerInactive(id).then(() => console.log(`Time ${id} is now inactive`));
};

exports.sendSafe = function({ recipients, username, name, id }) {
  recipients.forEach(token => {
    sendNotification(token, `${name}`, `${username} has marked themselves safe`);
  });
};

exports.sendDanger = function({ recipients, username, name }) {
  recipients.forEach(token => {
    sendNotification(token, `${name} - DANGER`, `${username} is in a dangerous situation`);
  });
};
