const filmsData = require('../../../filmsData');

const createDirector = (knex, director) => {
	return knex('directors')
		.insert(
			{
				first_name: director.director.split(',')[1],
				last_name: director.director.split(',')[0]
			},
			'id'
		)
		.then(directorId => {
			let filmPromises = [];
			filmsData
				.filter(film => film.director === director.director)
				.forEach(film => {
					filmPromises.push(
						createFilm(knex, {
							title: film.title,
							production_year: film.production_year,
							director_id: directorId[0]
						})
					);
				});
			return Promise.all(filmPromises);
		});
};

const createFilm = (knex, film) => {
	return knex('films').insert(film);
};

exports.seed = knex => {
	return knex('films')
		.del()
		.then(() => knex('directors').del())
		.then(() => {
			let directorPromises = [];
			let directorKeys = filmsData.map(film => film.director);
			[...new Set(directorKeys)].forEach(director => {
				let directorInfo = filmsData.find(film => film.director === director);
				directorPromises.push(createDirector(knex, directorInfo));
			});

			return Promise.all(directorPromises);
		})
		.catch(error => console.log(`Error seeding data: ${error}`));
};
