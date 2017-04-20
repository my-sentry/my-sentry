const { TIMER_TYPES, TIMER_OFFSETS } = require('./constants');
const { endTimer } = require('./timers');
const { sendSafe, sendDanger } = require('./notify');
const { getEventWithRecipients } = require('../../server/db/controllers/eventCtrl');
const moment = require('moment');
const {
  createTimer,
  getTimersByEvent,
  makeTimerInactive
} = require('../../server/db/controllers/timersCtrl');

const offsetMinutes = function(offset, end) {
  return moment(end).subtract(offset, 'minutes').format();
};

var cancelTimers = function(eventId) {
  return getTimersByEvent(eventId)
    // map to array of timer ids
    .then(timers => timers.map(({ id }) => id))
    .then(ids => {
      // cancel each timer in memory
      ids.forEach(id => endTimer(id));
      return ids;
    });
};

exports.populateTimers = function(eventId, end) {
  let insertTimers = TIMER_TYPES
    // create each timer to insert into db
    .map(type => {
      return {
        'event_id': eventId,
        'type': type,
        'time': offsetMinutes(TIMER_OFFSETS[type], end)
      };
    })
    // wrap timers with db insert Promises
    .map(timer => {
      return createTimer(timer);
    });

  return Promise.all(insertTimers);
};

exports.endEvent = function(eventId, safe) {
  return cancelTimers(eventId)
    .then(ids => {
      // mark timers inactive in database
      return Promise.all(ids.map(id => makeTimerInactive(id)));
    })
    // get event info
    .then(() => getEventWithRecipients(eventId))
    // send notifications
    .then(event => safe ? sendSafe(event) : sendDanger(event))
    .catch(console.log);
};

exports.cancelEvent = cancelTimers;
