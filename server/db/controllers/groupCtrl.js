var knex = require('../db.js');

//Create a group
exports.createGroup = function(name, adminUser) {
  return knex('groups')
    .returning(['name', 'admin_user'])
    .insert({
      'name': name,
      'admin_user': adminUser
    })
    .then(result => result[0]);
};

//Get group
exports.getGroupById = function (id) {
  return knex('groups')
    .where('id', id)
    .then(result => result[0]);
};

//Get groups
exports.getGroups = function () {
  return knex.select()
    .from('groups')
    .then(results => results);
};

//Update group
exports.updateGroupById = function (id) {
  return knex('groups')
    .where('id', id)
    .then(result => result);
};

//Delete group
exports.deleteGroupById = function (id) {
  return knex('groups')
    .where('id', id)
    .del();
};
