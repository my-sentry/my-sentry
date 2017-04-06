
exports.up = function(knex, Promise) {
  return knex.schema.table('group_user', function(table) {
    table.unique(['group_id', 'user_id']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('group_user', function(table) {
    table.dropUnique(['group_id', 'user_id']);
  });
};
