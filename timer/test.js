var client = require('./client');

client.initialize();

client.sendEvent({
  id: 2,
  'user_id': 3,
  'group_id': 2,
  name: 'Austonian Showing',
  begin: 'Wed May 10 2017 17:00:00 GMT-0500 (CDT)',
  end: 'Wed May 10 2017 19:00:00 GMT-0500 (CDT)',
  lat: 30.264562,
  long: -97.744294,
  description: 'Showing an apartment at the Austonian. The contact is 5129384898.'
});
