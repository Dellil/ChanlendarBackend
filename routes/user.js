const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const router = express.Router();

// POST /user (name, email, password)
// router.post("/", async (req, res, next) => {
// 	try {
// 		const existedUser = await User.findOne({
// 			where: {
// 				email: req.body.email,
// 			},
// 		});
// 		if (existedUser) {
// 			return res.status(403).json({ message: "이미 사용중인 아이디입니다." });
// 		}
//
// 		const hashedPassword = await bcrypt.hash(req.body.password, 12);
//
// 		await User.create({
// 			email: req.body.email,
// 			nickname: req.body.nickname,
// 			password: hashedPassword,
// 		});
// 		res.status(201).json({ message: "성공적으로 생성됐습니다." });
// 	} catch (error) {
// 		next(error);
// 	}
// });

// POST /user/login (email, password)
router.post("/login", async (req, res, next) => {
	const { email, password } = req.body;
	let user;
	try {
		user = await User.findOne({
			where: {
				email,
			},
		});
	} catch (error) {
		next(error);
		return res.status(500).json({ message: "can't return data" });
	}

	if (!user) return res.status(404).json({ message: "없는 계정입니다." });

	bcrypt.compare(password, user.password, async (err, same) => {
		if (err) {
			return next(err);
		}
		if (!same) {
			return res.status(404).json({ message: "비밀번호가 틀렸습니다." });
		}
		const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_ACCESS, {
			expiresIn: "1day",
		});
		const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_REFRESH, {
			expiresIn: "30days",
		});
		res.status(201).json({ accessToken, refreshToken });
	});
});

module.exports = router;
