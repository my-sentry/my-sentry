var knex = require('../db.js');

// create event
exports.createEvent = function (userId, event) {
  return knex('events')
    .insert({
      'user_id': userId,
      'group_id': event.groupId,
      'name': event.name,
      'begin': event.begin,
      'end': event.end,
      'lat': event.lat,
      'long': event.long,
      'description': event.description,
      'place_id': event.place_id,
      'place_name': event.location
    })
    .then(result => result[0]);
};

// get all events a user can see
exports.getEvents = function (username) {
  return knex('events')
    .select('events.*')
    .innerJoin('groups', 'groups.id', 'events.group_id')
    .innerJoin('users', function () {
      this
        .on('users.id', '=', 'groups.admin_user')
        .andOn('users.username', knex.raw(`'${username}'`));
    })
    .union(function() {
      this.select('events.*')
        .from('events')
        .innerJoin('groups', 'groups.id', 'events.group_id')
        .innerJoin('group_user', 'group_user.group_id', 'groups.id')
        .innerJoin('users', function() {
          this
            .on('users.id', '=', 'group_user.user_id')
            .andOn('users.username', knex.raw(`'${username}'`));
        });
    });
};

// get event by id
exports.getEventById = function (id) {
  return knex('events')
    .where('id', id)
    .then(result => result[0]);
};

// get events created by a specific user
exports.getUserEvents = function (username) {
  return knex('events')
    .select('events.*')
    .innerJoin('users', function() {
      this
        .on('users.id', 'events.user_id')
        .andOn('users.username', knex.raw(`'${username}'`));
    });
};

// update event
exports.updateEventById = function (id, event) {
  return knex('events')
    .where('id', id)
    .update({
      'name': event.name,
      'begin': event.begin,
      'end': event.end,
      'lat': event.lat,
      'long': event.long,
      'description': event.description,
      'place_id': event.place_id,
      'place_name': event.location,
      'safe': event.safe
    });
};

// deletes event and associated timers
exports.deleteEventById = function (id) {
  return knex('timers').where('event_id', id).del()
    .then(() => knex('events').where('id', id).del());
};

exports.getEventWithRecipients = function(id) {
  // get event
  return knex('events')
    .select('events.*', 'users.username')
    .where('events.id', id)
    .innerJoin('users', 'users.id', 'events.user_id')
    .then(results => {
      let event = results[0];
      // get appropriate recipients
      return knex('events')
        .select('users.*')
        .innerJoin('group_user', 'group_user.group_id', 'events.group_id')
        .innerJoin('users', function() {
          this
            .on('group_user.user_id', 'users.id')
            .andOn('users.id', '!=', 'events.user_id')
            .andOn('events.id', knex.raw(id));
        })
        .union(function() {
          this
            .select('users.*')
            .from('events')
            .innerJoin('groups', 'events.group_id', 'groups.id')
            .innerJoin('users', function() {
              this
                .on('groups.admin_user', 'users.id')
                .andOn('users.id', '!=', 'events.user_id')
                .andOn('events.id', knex.raw(id));
            });
        })
        // return event with recipinets property that contains tokens
        .then(res => {
          let recipientTokens = res
            .map(user => user.token)
            .filter(token => Boolean(token));
          event.recipients = recipientTokens;
          return event;
        });
    });
};

exports.markEventSafe = function(id) {
  return knex('events')
    .where('id', id)
    .update({ safe: 1 });
};
