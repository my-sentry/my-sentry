
exports.up = function(knex, Promise) {
  return knex.schema.table('group_user', function(table) {
    table.unique(['group_id', 'user_id']);
  });
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('events'),
    knex.schema.dropTable('group_user'),
    knex.schema.dropTable('groups'),
    knex.schema.dropTable('users')
  ]);
};
