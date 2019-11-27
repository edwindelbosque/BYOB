exports.up = function(knex) {
	return Promise.all([
		knex.schema.createTable('films', table => {
			table.increments('id').primary(); // we make an incremental id
			table.string('title'); // add a title column that will accept strings
			table.integer('production_year'); // will accept integer
			table.timestamps(true, true); // comes with timestamp for CREATED and UPDATED
		}),

		knex.schema.createTable('directors', table => {
			table.increments('id').primary(); // primary incrementing id
			table.string('first_name'); // accepts a string
			table.string('last_name'); // accepts a string
			table.integer('film_id').unsigned(); // a film id that will only accept positive numbers
			table.foreign('film_id').references('films.id'); // it references the id of the 'films' table.
			table.timestamps(true, true); // comes with timestamp for CREATED and UPDATED
		})
	]);
};

exports.down = function(knex) {
	return Promise.all([
		knex.schema.dropTable('directors'), // we drop both tables
		knex.schema.dropTable('films')
	]);
};
