// we need to import express in order to run our server
const express = require('express');
const app = express();

const cors = require('cors'); //CORS add a layer of the security to the API so some IP addresses can only use it.
app.set('port', process.env.PORT || 3000); // this is going to be our port so we can see use the server
app.use(express.json());
app.use(cors());

// configuration for development and connect Knex to the file
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.locals.title = 'Film & Movies'; // title of server when server is running

app.get('/', (request, response) => {
	// this text will appear when the user visits the url without any queries
	response.send(
		'Please visit https://github.com/edwindelbosque/BYOB for documentation'
	);
});

app.get('/api/v1/films', (request, response) => {
	// we use .get so we can use our method GET when making server requests
	database('films') // it will look into the films database
		.select() // will select all films
		.then(films => {
			response.status(200).json(films); // successful response 200 will show us the films
		})
		.catch(error => {
			// catch in case that it doesn't work
			response.status(500).json({ error }); // unsuccesful internal error
		});
});

app.get('/api/v1/directors', (request, response) => {
	// same as films but 'directors' now
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
	// we have dynamic routing with :id
	const { id } = request.params;
	database('directors') // access to directors database
		.select()
		.where({ id: id }) // find the director that matches the id from the params
		.then(director => {
			if (!director.length) {
				// if there is no director
				response.status(404).json(`There is no director with id ${id}`); // there is no director to show (error message)
			}
			response.status(200).json(director); // sucessful response, will show us the director that matches id
		});
});

app.get('/api/v1/films/:id', (request, response) => {
	// same as director, but now with 'films'
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
	// we will use dynamic router to delete specific director by :id
	const { id } = request.params;
	database('directors')
		.where({ id: id }) // will look for the id that matches id
		.del()
		.then(results => {
			if (results === 0) {
				response.status(404).json(`No director with id ${id} exists.`); // bad response, no id exists, will throw error.
			}
			response.status(200).json(`Director ${id} sucessfully deleted.`); // if the id matches, it will show an errro that director was deleted.
		})
		.catch(error => {
			response.status(422).json({ error }); // a catch error if the server request cannot be performed.
		});
});

app.post('/api/v1/films', (request, response) => {
	// for POST method here
	const film = request.body; // the body request will hold a object that we will call film in this instance
	for (let requiredParameter of ['title', 'production_year']) {
		// it will requre these parameters
		if (!film[requiredParameter]) {
			// if the film does not contain these parameters
			return response.status(422).send({
				// it will throw an error and display the message below with the missing paramter.
				error: `Expected format: { title: <String>, production_year: <Integer> }. You're missing a "${requiredParameter}" property.`
			});
		}
	}

	database('films') // if successful it will go to the films databse
		.insert(film, 'id') // an insert a film with an id
		.then(film => {
			response.status(201).json({ id: film[0] }); // the response given will be the id of the film
		})
		.catch(error => {
			response.status(500).json({ error }); // if it does not work, there is a catch to alert of an errror.
		});
});

app.post('/api/v1/directors', (request, response) => {
	//same as films but for directors
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
	// we will be listening to our port specified almost at the top.
	console.log(
		`${app.locals.title} is running on http://localhost:${app.get('port')}.` //this will appear on the console when we run nodemon or nodejs
	);
});
