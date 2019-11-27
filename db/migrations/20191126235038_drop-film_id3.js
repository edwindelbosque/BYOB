exports.up = function(knex) {
	return knex.schema.table('directors', table => {
		table.dropColumn('film_id');
	});
};

exports.down = function(knex) {};
