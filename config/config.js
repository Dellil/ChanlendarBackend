const dotenv = require("dotenv");
dotenv.config();

module.exports = {
	development: {
		username: process.env.DB_ID,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: "127.0.0.1",
		dialect: "mysql",
	},
	test: {
		username: process.env.DB_ID,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: "127.0.0.1",
		dialect: "mysql",
	},
	production: {
		username: process.env.DB_ID,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: "127.0.0.1",
		dialect: "mysql",
	},
};
