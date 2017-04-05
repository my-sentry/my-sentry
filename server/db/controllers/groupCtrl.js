var knex = require('../db.js');

// create a group
exports.createGroup = function(name, adminId) {
  return knex('groups')
    .insert({
      'name': name,
      'admin_user': adminId
    })
    .then(result => result[0]);
};

// get group by id and populate with its members
exports.getGroupById = function (id) {
  // get the group info
  return knex('groups')
    .where('id', id)
    .then(result => result[0])
    .then(group => {

      // get users associated with the group
      return knex('users')
        .select('users.*')
        .innerJoin('groups', function() {
          this
            .on('users.id', 'groups.admin_user')
            .andOn('groups.id', knex.raw(id));
        })
        .union(function() {
          this
            .select('users.*')
            .from('users')
            .innerJoin('group_user', 'group_user.user_id', 'users.id')
            .innerJoin('groups', function() {
              this
                .on('group_user.group_id', 'groups.id')
                .andOn('groups.id', knex.raw(id));
            });
        })

        // add the usersarray to the group object
        .then(users => {
          group.users = users.map(user => {
            return _.pick(user, ['id', 'username', 'first_name', 'last_name']);
          });
          return group;
        });

    });

};

// get a list of groups the user belongs to
exports.getGroups = function (username) {
  return knex('groups')
    .select('groups.*')
    .innerJoin('users', function() {
      this
        .on('users.id', 'groups.admin_user')
        .andOn('users.username', knex.raw(`'${username}'`));
    })
    .union(function() {
      this
        .select('groups.*')
        .from('groups')
        .innerJoin('group_user', 'groups.id', 'group_user.group_id')
        .innerJoin('users', function() {
          this
            .on('users.id', 'group_user.user_id')
            .andOn('users.username', knex.raw(`'${username}'`));
        });
    });
};

// add user to group
exports.addUserToGroup = function(groupId, userId) {
  return knex('group_user')
    .insert({
      'group_id': groupId,
      'user_id': userId
    })
    .then(results => results[0]);
};

// delete user from group
exports.deleteUserFromGroup = function(groupId, userId) {
  return knex('group_user')
    .where('group_id', groupId)
    .andWhere('user_id', userId)
    .del();
};

// delete group
exports.deleteGroupById = function (id) {
  return knex('groups')
    .where('id', id)
    .del();
};
