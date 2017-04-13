
exports.up = function(knex, Promise) {
  return knex.schema.table('events', function(table) {
    table.string('place_id').default('');
    table.string('place_name').default('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('events', function(table) {
    table.dropColumn('place_id');
    table.dropColumn('place_name');
  });
};
