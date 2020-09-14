const express = require("express");

const { jwtVerify } = require("../middlewares");
const { Topic } = require("../../models");

const router = express.Router();

// GET /topics
router.get("/", jwtVerify, async (req, res, next) => {
	try {
		const topics = await Topic.findAll({
			where: {
				UserId: req.user.id,
			},
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
			order: [["id", "ASC"]],
		});

		res.status(200).json({ data: topics });
	} catch (error) {
		next(error);
		res.status(500).json({ message: "can't return data" });
	}
});

module.exports = router;
