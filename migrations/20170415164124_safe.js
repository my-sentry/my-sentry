
exports.up = function(knex, Promise) {
  return knex.schema.table('events', function(table) {
    table.integer('safe').default(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('events', function(table) {
    table.dropColumn('safe');
  });
};
