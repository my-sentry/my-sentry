var knex = require('../db.js');

// create event
exports.createEvent = function (userId, groupId, name, begin, end, lat, long, description) {
  return knex('events')
    .insert({
      'user_id': userId,
      'group_id': groupId,
      'name': name,
      'begin': begin,
      'end': end,
      'lat': lat,
      'long': long,
      'description': description
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
exports.updateEventById = function (id, name, begin, end, lat, long, description) {
  return knex('events')
    .where('id', id)
    .update({
      'name': name,
      'begin': begin,
      'end': end,
      'lat': lat,
      'long': long,
      'description': description
    });
};

// delete event
exports.deleteEventById = function (id) {
  return knex('events')
    .where('id', id)
    .del();
};
