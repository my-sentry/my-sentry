var timers = require('../server/db/controllers/timersCtrl');

var MS_PER_MINUTE = 60000;

var types = ['warning10', 'warning2', 'danger'];

var offsets = {
  warning10: 10,
  warning2: 2,
  danger: 0
};

var offsetMinutes = function(offset, date) {
  return new Date(date - (offset * MS_PER_MINUTE));
};

module.exports = function(event) {
  var insertTimers = types
    // create each timer to insert into db
    .map(type => {
      return {
        'event_id': event.id,
        'type': type,
        'time': offsetMinutes(offsets[type], new Date(event.end))
      };
    })
    // wrap timers with db insert Promises
    .map(timer => {
      return timers.createTimer(timer);
    });

  return Promise.all(insertTimers);
};
