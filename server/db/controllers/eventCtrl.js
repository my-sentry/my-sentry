var knex = require('../db.js');

//Create event
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

//Get all events that a user can see
exports.getEvents = function (username) {
  return knex('events')
    .select('events.*')
    .innerJoin('groups', 'groups.id', 'events.group_id')
    .innerJoin('users', function () {
      this.on('users.id', '=', 'groups.admin_user')
        .andOn('users.username', knex.raw(`'${username}'`));
    }).union(function() {
      this.select('events.*')
        .from('events')
        .innerJoin('groups', 'groups.id', 'events.group_id')
        .innerJoin('group_user', 'group_user.group_id', 'groups.id')
        .innerJoin('users', function() {
          this.on('users.id', '=', 'group_user.user_id')
            .andOn('users.username', knex.raw(`'${username}'`));
        });
    });
};

//Get event by id
exports.getEventById = function (id) {
  return knex('events')
    .where('id', id)
    .then(result => result[0]);
};

//Get events for a specific user id
exports.getUserEvents = function (username) {
  return knex('events')
    .select('events.*')
    .innerJoin('users', function() {
      this.on('users.id', 'events.user_id')
        .andOn('users.username', knex.raw(`'${username}'`));
    });
};

//Update event
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

//Delete event
exports.deleteEventById = function (id) {
  return knex('events')
    .where('id', id)
    .del();
};
