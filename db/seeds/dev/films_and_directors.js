const filmsData = require('../../../filmsData'); // we wll use this data for our seeding

const createDirector = (knex, director) => {
	// method
	return knex('directors')
		.insert(
			{
				first_name: director.director.split(',')[1], // I am splitting the name fo the director into two strings for first and last name
				last_name: director.director.split(',')[0]
			},
			'id' // the id will be given here
		)
		.then(directorId => {
			let filmPromises = [];
			filmsData
				.filter(film => film.director === director.director) // I will look for all the films of that oparticular director name
				.forEach(film => {
					filmPromises.push(
						createFilm(knex, {
							// we use method declared below
							title: film.title,
							production_year: film.production_year,
							director_id: directorId[0] // all the filtered films will have this same director id
						})
					);
				});
			return Promise.all(filmPromises); // we will return a promise with all of our movies
		});
};

const createFilm = (knex, film) => {
	//method for creating films
	return knex('films').insert(film);
};

exports.seed = knex => {
	return knex('films')
		.del() // we will delete the tables because we are repopulating them
		.then(() => knex('directors').del()) // same here
		.then(() => {
			let directorPromises = [];
			let directorKeys = filmsData.map(film => film.director); // I did this to be able to manage all my directors in my file and only leave me with unique director (remove duplicates)
			[...new Set(directorKeys)].forEach(director => {
				// this removes duplicates of directors' names
				let directorInfo = filmsData.find(film => film.director === director); // I will find the first director in my data that matches the name
				directorPromises.push(createDirector(knex, directorInfo)); // and I will submit this director info into my createDrector method
			});

			return Promise.all(directorPromises); // return promises of all the directors' info
		})
		.catch(error => console.log(`Error seeding data: ${error}`)); // error if something goes wrong, will appear in console.
};
