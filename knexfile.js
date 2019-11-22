module.exports = {
	development: {
		client: 'pg',
		connection: {
			filename: 'postgres://localhost/movies'
		},
		migrations: {
			directory: './db/migrations'
		},
		useNullAsDefault: true,
		seeds: {
			directory: './db/seeds/dev'
		}
	}
};
