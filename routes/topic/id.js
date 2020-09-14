const express = require("express");
const router = express.Router();

const { jwtVerify } = require("../middlewares");
const { Topic } = require("../../models");

// PATCH /topic/1 (id, title)
router.patch("/:id", jwtVerify, async (req, res) => {
	const id = Number.parseInt(req.params.id, 10);
	const title = req.body.title;

	try {
		await Topic.update(
			{
				title,
			},
			{
				where: {
					id,
					UserId: req.user.id,
				},
			},
		);

		res.status(200).json({
			data: {
				id,
				title,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "can't return data" });
	}
});

module.exports = router;
