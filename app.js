const express = require("express");

const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const db = require("./models");
const dotenv = require("dotenv");

const userRouter = require("./routes/user");
const topicRouter = require("./routes/topic/topic");
const jwtRouter = require("./routes/jwt");

dotenv.config();
const app = express();

db.sequelize
	.sync()
	.then(() => {
		console.log("CHANLENDAR DATABASE IS COMPLETED RUNNING");
	})
	.catch(console.log.error);

// MIDDLEWARES
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	}),
);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
	res.send("Backend server for Chanlendar");
});

app.use("/user", userRouter);
app.use("/topic", topicRouter);
app.use("/jwt", jwtRouter);

app.listen(3065, () => {
	console.log("CHANLENDAR BACKEND IS COMPLETED RUNNING");
});
