const express = require("express");
const router = express.Router();

const { jwtVerify } = require("../middlewares");
const { Task } = require("../../models");
const idRouter = require("./id");

router.use("/", idRouter);

// POST /task (topicId, title, taskDate)
router.post("/", jwtVerify, async (req, res, next) => {
	try {
		const task = await Task.create({
			TopicId: req.body.topicId,
			title: req.body.title,
			taskDate: req.body.taskDate,
			isFinished: false,
		});

		res.status(201).json({
			data: {
				topicId: task.TopicId,
				title: task.title,
				taskDate: task.taskDate,
				isFinished: false,
			},
		});
	} catch (error) {
		next(error);
		res.status(500).json({ message: "can't return data" });
	}
});

module.exports = router;
