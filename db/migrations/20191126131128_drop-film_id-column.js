exports.up = function(knex) {
	return knex.schema.table('films', function(table) {
		table.integer('director_id').unsigned();
		table.foreign('director_id').references('directors.id');
	});
};

exports.down = function(knex) {
	return knex.schema.table('directors', function(table) {
		table.dropColumn('director_id');
	});
};
