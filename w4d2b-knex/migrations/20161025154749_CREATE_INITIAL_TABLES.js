
exports.up = function(knex, Promise) {
  knex.schema.createTable("artists", function(table) {
    table.increments("id");
    table.string("name");
  });

  knex.schema.createTable("albums", function(table) {
    table.increments("id");
    table.string("title");
    table.integer("year");
    table.foreign("artist_id").references("id").inTable("artists");
  });

  knex.schema.createTable("tracks", function(table) {
    table.increments("id");
    table.string("title");
    table.integer("number");
    table.foreign("album_id").references("id").inTable("albums");
  });

};

exports.down = function(knex, Promise) {
  knex.schema.dropTable("tracks");
  knex.schema.dropTable("artists");
  knex.schema.dropTable("albums");
};

