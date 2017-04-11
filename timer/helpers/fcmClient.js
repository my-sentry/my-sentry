const { FCM_CLIENT_KEY } = require('../../config');
const API_URL = 'https://fcm.googleapis.com/fcm/send';

const axios = require('axios');

exports.sendNotification = function(token, title, message) {

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
    console.log('Send Notification Response: ', response);
  })

  .catch(err => {
    console.log('Error Sending Notification: ', err);
  });
};
