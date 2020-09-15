const dotenv = require("dotenv");
dotenv.config();

module.exports = {
	development: {
		username: process.env.DB_ID,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: "127.0.0.1",
		dialect: "mysql",
		dialectOptions: { useUTC: false },
		timezone: "+09:00",
	},
	test: {
		username: process.env.DB_ID,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: "127.0.0.1",
		dialect: "mysql",
		timezone: "+09:00",
	},
	production: {
		username: process.env.DB_ID,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: "127.0.0.1",
		dialect: "mysql",
		timezone: "+09:00",
	},
};
