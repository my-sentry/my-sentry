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
    .then(result => result[0])
    .then(group => {

      return knex('users')
        .select('users.*')
        .innerJoin('groups', function() {
          this.on('users.id', 'groups.admin_user')
            .andOn('groups.id', knex.raw(id));
        }).union(function() {
          this.select('users.*')
            .from('users')
            .innerJoin('group_user', 'group_user.user_id', 'users.id')
            .innerJoin('groups', function() {
              this.on('group_user.group_id', 'groups.id')
                .andOn('groups.id', knex.raw(id));
            });
        })

        .then(users => {
          group.users = users;
          return group;
        });
      
    });

};

//Gets all groups a user is a part of
exports.getGroups = function (username) {
  return knex('groups')
    .select('groups.*')
    .innerJoin('users', function() {
      this.on('users.id', 'groups.admin_user')
        .andOn('users.username', knex.raw(`'${username}'`));
    }).union(function() {
      this.select('groups.*')
        .from('groups')
        .innerJoin('group_user', 'groups.id', 'group_user.group_id')
        .innerJoin('users', function() {
          this.on('users.id', 'group_user.user_id')
            .andOn('users.username', knex.raw(`'${username}'`));
        });
    });
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
