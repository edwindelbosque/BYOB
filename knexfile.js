module.exports = {
	development: {
		// our developer settings
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
		// our production settings
		client: 'pg',
		connection: process.env.DATABASE_URL + `?ssl=true`,
		migrations: {
			directory: './db/migrations'
		},
		seeds: {
			directory: './db/seeds/dev'
		},
		useNullAsDefault: true
	}
};
