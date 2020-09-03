const express = require("express");
const db = require("./models");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

db.sequelize
	.sync()
	.then(() => {
		console.log("CHANLENDAR DATABASE IS COMPLETED RUNNING");
	})
	.catch(console.log.error);

app.use(morgan("dev"));

app.get("/", (req, res) => {
	res.send("Backend server for Chanlendar");
});

app.listen(3065, () => {
	console.log("CHANLENDAR BACKEND IS COMPLETED RUNNING");
});
