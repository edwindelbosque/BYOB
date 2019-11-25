const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.static('public'));

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.locals.title = 'Film Directors';

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

app.delete('/api/v1/directors/:id', (request, response) => {
	const { id } = request.params;
	database('directors')
		.where({ id: id })
		.del()
		.then(directors => {
			response.status(201).json({ directors });
		})
		.catch(error => {
			response.status(422).json({ error });
		});
});

app.post('/api/v1/films', (request, response) => {
	const film = request.body;
	console.log(film);
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

app.listen(app.get('port'), () => {
	console.log(
		`${app.locals.title} is running on http://localhost:${app.get('port')}.`
	);
});
