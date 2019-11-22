const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.static('public'));

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.locals.title = 'Film Directors';
app.locals.films = [
	{
		production_year: 2009,
		id: 4105528,
		title: 'Planet 51',
		director: 'Abad, Javier',
		director_id: 1975,
		co_directors: 'Abad, Javier|Blanco, Jorge|Martínez, Marcos',
		co_directors_id: '1516774|1975|233690',
		genres: 'Adventure|Animation|Comedy|Family|Sci-Fi',
		cameras: '',
		negative_format: 'Digital',
		film_type: 'D'
	},
	{
		production_year: 2006,
		id: 3973646,
		title: 'Mission: Impossible III',
		director: 'Abrams, J.J.',
		director_id: 7718,
		co_directors: 'Abrams, J.J.',
		co_directors_id: 7718,
		genres: 'Action|Adventure|Thriller',
		cameras:
			'Arriflex 235, Panavision C-Series Lenses|Arriflex 435, Panavision Primo, C-Series and Angenieux Optimo Lenses|Panavision Panaflex Millennium XL, Panavision Primo, C-Series and Angenieux Optimo Lenses|Panavision Panaflex Platinum, Panavision Primo, C-Series and Angenieux Optimo Lenses|Sony CineAlta HDC-F950, Zeiss DigiZoom and Fujinon C-Series Lenses',
		negative_format: '35 mm|Video',
		film_type: 'D|F'
	}
];

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

app.listen(app.get('port'), () => {
	console.log(
		`${app.locals.title} is running on http://localhost:${app.get('port')}.`
	);
});
