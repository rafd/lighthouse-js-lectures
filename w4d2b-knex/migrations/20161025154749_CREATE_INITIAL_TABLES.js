
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("artists", function(table) {
      table.increments("id");
      table.string("name");
    }),
    knex.schema.createTable("albums", function(table) {
      table.increments("id");
      table.string("title");
      table.integer("year");
      table.integer("artist_id").references("id").inTable("artists");
    }),
    knex.schema.createTable("tracks", function(table) {
      table.increments("id");
      table.string("title");
      table.integer("album_id").references("id").inTable("albums");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("tracks"),
    knex.schema.dropTable("artists"),
    knex.schema.dropTable("albums")
  ]);
};

