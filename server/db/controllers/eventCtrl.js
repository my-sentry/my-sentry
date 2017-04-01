var knex = require('../db.js');

//Create event
exports.createEvent = function (name, begin, end, lat, long, description) {
  return knex('events')
    .returning(['name', 'begin', 'end', 'lat', 'long', 'description'])
    .insert({
      'name': name,
      'begin': begin,
      'end': end,
      'lat': lat,
      'long': long,
      'description': description
    })
    .then(result => result[0]);
};

//Get events
exports.getEvents = function () {
  return knex.select()
  .from('events')
  .then(results => results);
};

//Get event by id
exports.getEventById = function (id) {
  return knex('events')
    .where('id', id)
    .then(result => result[0]);
};

//Get events for a specific user id
exports.getEventsByUserId = function (userId) {
  return knex('events')
    .where('user_id', userId)
    .then(results => results);
};

//Update event
exports.updateEventById = function (id, name = undefined, begin = undefined, end = undefined, lat = undefined, long = undefined, description) {
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
