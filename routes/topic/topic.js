const express = require("express");
const router = express.Router();

const { jwtVerify } = require("../middlewares");
const { Topic } = require("../../models");
const idRouter = require("./id");

router.use("/", idRouter);

// POST /topic (title)
router.post("/", jwtVerify, async (req, res) => {
	try {
		const topic = await Topic.create({
			title: req.body.title,
			UserId: req.user.id,
		});

		res.status(201).json({
			data: {
				id: topic.id,
				title: topic.title,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "can't return data" });
	}
});

module.exports = router;
