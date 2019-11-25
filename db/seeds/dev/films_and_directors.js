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

			directorPromises.push(
				createDirector(knex, {
					first_name: film.director.split(' ')[1],
					last_name: film.director.split(' ')[0].replace(',', ''),
					film_id: filmId[0]
				}),
				'id'
			);
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

			return Promise.all(filmPromises);
		})
		.catch(error => console.log(`Error seeding data: ${error}`));
};
