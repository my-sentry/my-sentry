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
      'place_name': event.location
    });
};

// delete event
exports.deleteEventById = function (id) {
  return knex('events')
    .where('id', id)
    .del();
};
