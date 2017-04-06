
exports.up = function(knex, Promise) {
  return knex.schema.createTable('timers', function(table) {
    table.increments('id').primary();
    table.integer('event_id').unsigned().references('events.id');
    table.string('type', 25).notNullable();
    table.string('time', 50).notNullable();
    table.integer('active').defaultTo(1);
    table.unique(['event_id', 'type']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('timers');
};
