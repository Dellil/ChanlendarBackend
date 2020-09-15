const express = require("express");
const router = express.Router();

const { jwtVerify } = require("../middlewares");
const { Task } = require("../../models");

router.patch("/:id", jwtVerify, async (req, res, next) => {
	try {
		const taskId = Number.parseInt(req.params.id, 10);
		console.log(taskId);
		await Task.update(
			{
				title: req.body.title,
				taskDate: req.body.taskDate,
				isFinished: req.body.isFinished,
			},
			{
				where: {
					id: taskId,
				},
			},
		);

		const updatedTask = await Task.findOne(
			{
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			},
			{
				where: {
					id: taskId,
				},
			},
		);

		res.status(200).json({ data: updatedTask });
	} catch (error) {
		next(error);
		res.status(500).send("can't return data");
	}
});

module.exports = router;
