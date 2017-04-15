var {
  createTimer,
  getTimersByEvent,
  makeTimerInactive
} = require('../../server/db/controllers/timersCtrl');
var { cancelTimer } = require('../worker');
var { MS_PER_MINUTE, TIMER_TYPES, TIMER_OFFSETS } = require('./constants');

var offsetMinutes = function(offset, date) {
  return new Date(date - (offset * MS_PER_MINUTE));
};

exports.populateTimers = function(eventId, end) {
  var insertTimers = TIMER_TYPES
    // create each timer to insert into db
    .map(type => {
      return {
        'event_id': eventId,
        'type': type,
        'time': offsetMinutes(TIMER_OFFSETS[type], new Date(end))
      };
    })
    // wrap timers with db insert Promises
    .map(timer => {
      return createTimer(timer);
    });

  return Promise.all(insertTimers);
};

exports.endEvent = function(eventId) {
  return getTimersByEvent(eventId)
    .then(res => res.map(({ id }) => id))
    .then(ids => {
      ids.forEach(id => cancelTimer(id));
      return Promise.all(ids.map(id => makeTimerInactive(id)));
    })
    .catch(console.log);
};
