var users = require('../data/usersData');
var groups = require('../data/groupsData');
var events = require('../data/eventsData');
var groupUser = require('../data/groupUserData');

exports.seed = function(knex, Promise) {
  return (
    knex('group_user').del()
      .then(() => knex('events').del())
      .then(() => knex('groups').del())
      .then(() => knex('users').del())

      .then(() => knex('users').insert(users))
      .then(() => knex('groups').insert(groups))
      .then(() => knex('group_user').insert(groupUser))
      .then(() => knex('events').insert(events))
  );
};
