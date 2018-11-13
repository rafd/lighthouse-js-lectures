
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.table("tracks", function(table) {
      table.integer("number");
  	})
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.table("tracks", function(table) {
  		table.dropColumn("number");
  	})
	]);
};
