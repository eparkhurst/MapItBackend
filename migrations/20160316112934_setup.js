
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', function (table) {
      table.increments('id').primary();
      table.string('user_name',100);
    }),
    knex.schema.createTableIfNotExists('user_maps', function (table) {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.integer('map_id').references('id').inTable('maps').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('maps', function (table) {
      table.increments('id').primary();
      table.string('title',100);
      table.string('note',900);
      table.json('location');
    }),
  ])
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
  return knex.schema.dropTableIfExists('maps');
  return knex.schema.dropTableIfExists('user_maps');
};
