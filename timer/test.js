var client = require('./client');

client.initialize();

client.sendEvent({
  id: 2,
  'user_id': 3,
  'group_id': 2,
  name: 'Austonian Showing',
  begin: '2017-04-06 17:27:00 GMT-0500 (CDT)',
  end: '2017-04-06 17:27:00 GMT-0500 (CDT)',
  lat: 30.264562,
  long: -97.744294,
  description: 'Showing an apartment at the Austonian. The contact is 5129384898.'
});
