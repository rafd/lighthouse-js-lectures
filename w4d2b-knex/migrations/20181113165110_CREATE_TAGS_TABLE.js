
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("tags", function(table) {
      table.increments("id");
      table.string("name");
    }),
    knex.schema.createTable("artists_tags", function(table) {
      table.integer("artist_id").references("id").inTable("artists");
      table.integer("tag_id").references("id").inTable("tags");
    })
  ]);
};

exports.down = function(knex, Promise) {
   return Promise.all([
    knex.schema.dropTable("tags"),
    knex.schema.dropTable("artists_tags")
   ]);
};