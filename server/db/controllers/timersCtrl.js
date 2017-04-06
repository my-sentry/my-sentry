var knex = require('../db');

exports.createTimer = function(timer) {
  return knex('timers').insert(timer).then(results => results[0]);
};

exports.getActiveTimers = function() {
  return knex('timers')
    .where('active', 1);
};

exports.getTimerById = function(id) {
  return knex('timers')
    .select([
      'timers.id',
      'timers.type',
      'timers.time',
      'timers.active',
      'events.name',
      'events.user_id',
      'events.group_id'
    ])
    .where('timers.id', id)
    .innerJoin('events', 'events.id', 'timers.event_id');
};

exports.makeTimerInactive = function(id) {
  return knex('timers')
    .where('id', id)
    .update({ active: 0 });
};
