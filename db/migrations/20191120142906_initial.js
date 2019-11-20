exports.up = function(knex) {
	return Promise.all([
		knex.schema.createTable('films', table => {
			table.increments('id').primary();
			table.string('title');
			table.integer('production_year');
			table.timestamps(true, true);
		}),

		knex.schema.createTable('directors', table => {
			table.increments('id').primary();
			table.string('first_name');
			table.string('last_name');
			table.integer('film_id').unsigned();
			table.foreign('film_id').references('films.id');
			table.timestamps(true, true);
		})
	]);
};

exports.down = function(knex) {
	return Promise.all([
		knex.schema.dropTable('directors'),
		knex.schema.dropTable('films')
	]);
};
