const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models");

const router = express.Router();

// POST /user (with data => data.name, data.email, data.password)
router.post("/", async (req, res, next) => {
	try {
		const existedUser = await User.findOne({
			where: {
				email: req.body.email,
			},
		});
		if (existedUser) {
			return res.status(403).send("이미 사용중인 아이디입니다.");
		}

		const hashedPassword = await bcrypt.hash(req.body.password, 12);

		await User.create({
			email: req.body.email,
			nickname: req.body.nickname,
			password: hashedPassword,
		});
		return res.status(201).json({ msg: "계정 생성 완료" });
	} catch (error) {
		console.log(error);
		next(error);
	}
});

module.exports = router;
