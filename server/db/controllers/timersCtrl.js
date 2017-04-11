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
      'events.group_id',
      'events.user_id',
      'users.token',
      'users.first_name',
      'users.last_name'
    ])
    .where('timers.id', id)
    .innerJoin('events', 'events.id', 'timers.event_id')
    .innerJoin('users', 'events.user_id', 'users.id')
    .then(results => {

      var timer = results[0];
      var timerId = timer.id;
      var userId = timer.user_id;
      var groupId = timer.group_id;

      return knex('users')
        .select('users.token')
        .innerJoin('group_user', 'group_user.user_id', 'users.id')
        .innerJoin('groups', 'groups.id', 'group_user.group_id')
        .innerJoin('events', function() {
          this
            .on('events.group_id', 'groups.id')
            .andOn('users.id', '!=', knex.raw(userId));
        })
        .innerJoin('timers', function() {
          this
            .on('timers.event_id', 'events.id')
            .andOn('timers.id', knex.raw(timerId));
        }).union(function() {
          this
            .select('users.token')
            .from('users')
            .innerJoin('groups', 'groups.admin_user', 'users.id')
            .innerJoin('events', function() {
              this
                .on('events.group_id', 'groups.id')
                .andOn('events.user_id', '!=', 'users.id');
            })
            .innerJoin('timers', function() {
              this
                .on('timers.event_id', 'events.id')
                .andOn('timers.id', knex.raw(timerId));
            });
        })
        .then(recipients => {

          // put array of tokens on recipients property
          timer.recipients = recipients.reduce((tokens, next) => {
            var validToken = true;
            // valid token exists, is unique, and not duplicated
            validToken = validToken && next.token.length !== 0;
            validToken = validToken && !tokens.includes(next.token);
            validToken = validToken && next.token !== timer.token;

            if (validToken) {
              tokens.push(next.token);
            }

            return tokens;
          }, []);

          // fully populated timer can be returned
          return timer;
        });
    });
};

exports.makeTimerInactive = function(id) {
  return knex('timers')
    .where('id', id)
    .update({ active: 0 });
};
