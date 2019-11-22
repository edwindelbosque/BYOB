const filmsData = require('../../../filmsData');

const createFilm = (knex, film) => {
	return knex('films')
		.insert(
			{
				title: film.title,
				production_year: film.production_year
			},
			'id'
		)
		.then(filmId => {
			let directorPromises = [];

			film.directors.forEach(director => {
				directorPromises.push(
					createDirector(
						knex,
						{
							first_name: director.first_name,
							first_name: director.last_name,
							film_id: filmId[0]
						},
						'id'
					)
				);
			});

			return Promise.all(directorPromises);
		});
};

const createDirector = (knex, director) => {
	return knex('directors').insert(director);
};

exports.seed = knex => {
	return knex('directors')
		.del()
		.then(() => knex('films').del())
		.then(() => {
			let filmPromises = [];

			filmsData.forEach(film => {
				filmPromises.push(createFilm(knex, film));
			});

			return Promise.all(filmsPromises);
		})
		.catch(error => console.log(`Error seeding data: ${error}`));
};
