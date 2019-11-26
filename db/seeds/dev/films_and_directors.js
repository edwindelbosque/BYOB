const filmsData = require('../../../filmsData');

// const createFilm = (knex, film) => {
// 	return knex('films')
// 		.insert(
// 			{
// 				title: film.title,
// 				production_year: film.production_year
// 			},
// 			'id'
// 		)
// 		.then(filmId => {
// 			let directorPromises = [];

// 			directorPromises.push(
// 				createDirector(knex, {
// 					first_name: film.director.split(' ')[1],
// 					last_name: film.director.split(' ')[0].replace(',', ''),
// 					film_id: filmId[0]
// 				}),
// 				'id'
// 			);
// 			return Promise.all(directorPromises);
// 		});
// };

// const createDirector = (knex, director) => {
// 	return knex('directors').insert(director);
// };

// exports.seed = knex => {
// 	return knex('directors')
// 		.del()
// 		.then(() => knex('films').del())
// 		.then(() => {
// 			let filmPromises = [];

// 			filmsData.forEach(film => {
// 				filmPromises.push(createFilm(knex, film));
// 			});

// 			return Promise.all(filmPromises);
// 		})
// 		.catch(error => console.log(`Error seeding data: ${error}`));
// };

const createDirector = (knex, director) => {
	return knex('directors')
		.insert(
			{
				first_name: director.director.split(' ')[1],
				last_name: director.director.split(' ')[0].replace(',', '')
			},
			'id'
		)
		.then(directorId => {
			let filmPromises = [];

			filmPromises.push(
				createFilm(knex, {
					title: director.title,
					production_year: director.production_year,
					director_id: directorId[0]
				})
			);
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

			filmsData.forEach(director => {
				directorPromises.push(createDirector(knex, director));
			});

			return Promise.all(directorPromises);
		})
		.catch(error => console.log(`Error seeding data: ${error}`));
};
