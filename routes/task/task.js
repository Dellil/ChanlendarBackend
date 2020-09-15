const express = require("express");

const { jwtVerify } = require("../middlewares");
const { Task } = require("../../models");

const router = express.Router();

router.post("/", jwtVerify, async (req, res, next) => {
	try {
		const task = await Task.create({
			TopicId: req.body.topicId,
			title: req.body.title,
			taskDate: req.body.taskDate,
			isFinished: false,
		});

		res.status(201).json({
			data: task
		});
	} catch (error) {
		next(error);
		res.status(500).json({ message: "can't return data" });
	}
});

module.exports = router;
