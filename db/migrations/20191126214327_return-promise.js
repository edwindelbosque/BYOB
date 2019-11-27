exports.up = function(knex) {
	return knex.schema.table('directors', function(table) {
		table
			.integer('film_id')
			.unsigned()
			.references('films.id')
			.onDelete('cascade');
	});
};

exports.down = function(knex) {
	return knex.schema.table('directors', function(table) {
		table.dropForeign('film_id');
		table.dropColumn('film_id');
	});
};
