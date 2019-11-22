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
	},
	production: {
		client: 'pg',
		connection: process.env.DATABASE_URL + `?ssl=true`,
		migrations: {
			directory: './db/migrations'
		},
		useNullAsDefault: true
	}
};
