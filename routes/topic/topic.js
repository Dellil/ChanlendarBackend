const express = require("express");
const router = express.Router();

const { jwtVerify } = require("../middlewares");
const { Topic, Task } = require("../../models");
const idRouter = require("./id");

router.use("/", idRouter);

// POST /topic (title)
router.post("/", jwtVerify, async (req, res, next) => {
	try {
		const topic = await Topic.create({
			title: req.body.title,
			UserId: req.user.id,
		});

		const fullTopic = await Topic.findOne({
			where: { id: topic.id },
			include: Task,
		});

		res.status(201).json(fullTopic);
	} catch (error) {
		next(error);
		res.status(500).json({ message: "can't return data" });
	}
});

module.exports = router;
