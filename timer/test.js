var client = require('./client');

client.initialize();

client.sendEvent({
  id: 2,
  'user_id': 3,
  'group_id': 2,
  name: 'Austonian Showing',
  begin: '2017-04-11 12:00:00 GMT-0500 (CDT)',
  end: '2017-04-11 16:50:00 GMT-0500 (CDT)',
  lat: 30.264562,
  long: -97.744294,
  description: 'Showing an apartment at the Austonian. The contact is 5129384898.'
});

// var { sendNotification } = require('./helpers/fcmClient');
// var token = 'fKPwrn9HTRU:APA91bFj6ofsBZWMnLkr_mPefwXCWBW33F6AcWt6KbbQQHRfkBkPekeu41xGPscOWMKpKM452-xOeAnXPJq9uw7-U0xkkwYbzrkh-H4pXSrcN2txTDOTBsSC_aPeX75xJluWH7XqA8zw';
//
// sendNotification(token, 'Howdy', 'This is a message');
