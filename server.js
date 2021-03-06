const express = require('express');
const app = express();

const cors = require('cors');
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(cors());

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.locals.title = 'Film & Movies';

app.get('/', (request, response) => {
	response.send(
		'Please visit https://github.com/edwindelbosque/BYOB for documentation'
	);
});

app.get('/api/v1/films', (request, response) => {
	database('films')
		.select()
		.then(films => {
			response.status(200).json(films);
		})
		.catch(error => {
			response.status(500).json({ error });
		});
});

app.get('/api/v1/directors', (request, response) => {
	database('directors')
		.select()
		.then(directors => {
			response.status(200).json(directors);
		})
		.catch(error => {
			response.status(500).json({ error });
		});
});

app.get('/api/v1/directors/:id', (request, response) => {
	const { id } = request.params;
	database('directors')
		.select()
		.where({ id: id })
		.then(director => {
			if (!director.length) {
				response.status(404).json(`There is no director with id ${id}`);
			}
			response.status(200).json(director);
		});
});

app.get('/api/v1/films/:id', (request, response) => {
	const { id } = request.params;
	database('films')
		.select()
		.where({ id: id })
		.then(film => {
			if (!film.length) {
				response.status(404).json(`There is no film with id ${id}`);
			}
			response.status(200).json(film);
		});
});

app.get('/api/v1/directors/:id/films', (request, response) => {
	const { id } = request.params;
	database('films')
		.select()
		.where({ director_id: id })
		.then(film => {
			if (!film.length) {
				response.status(404).json(`There are no films with director id ${id}`);
			}
			response.status(200).json(film);
		});
});

app.delete('/api/v1/films/:id', (request, response) => {
	const { id } = request.params;
	database('films')
		.where({ id: id })
		.del()
		.then(results => {
			if (results === 0) {
				response.status(404).json(`No film with id ${id} exists.`);
			}
			response.status(200).json(`Film ${id} sucessfully deleted.`);
		})
		.catch(error => {
			response.status(422).json({ error });
		});
});

app.post('/api/v1/films', (request, response) => {
	const film = request.body;
	for (let requiredParameter of ['title', 'production_year']) {
		if (!film[requiredParameter]) {
			return response.status(422).send({
				error: `Expected format: { title: <String>, production_year: <Integer> }. You're missing a "${requiredParameter}" property.`
			});
		}
	}

	database('films')
		.insert(film, 'id')
		.then(film => {
			response.status(201).json({ id: film[0] });
		})
		.catch(error => {
			response.status(500).json({ error });
		});
});

app.post('/api/v1/directors', (request, response) => {
	const director = request.body;
	for (let requiredParameter of ['first_name', 'last_name']) {
		if (!director[requiredParameter]) {
			return response.status(422).json({
				error: `Expected format: { first_name: <String>, last_name: <String> }. You're missing a "${requiredParameter}" property.`
			});
		}
	}

	database('directors')
		.insert(director, 'id')
		.then(director => {
			response.status(201).json({ id: director[0] });
		})
		.catch(error => {
			response.status(500).json({ error });
		});
});

app.listen(app.get('port'), () => {
	console.log(
		`${app.locals.title} is running on http://localhost:${app.get('port')}.`
	);
});
