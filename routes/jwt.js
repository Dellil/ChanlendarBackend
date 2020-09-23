const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/accessToken", (req, res, next) => {
	const refreshToken = req.body.refreshToken;
	jwt.verify(refreshToken, process.env.JWT_REFRESH, (err, decoded) => {
		if (err) return res.status(404).json({ message: err.message });
		const accessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_ACCESS, {
			expiresIn: "1day",
		});

		res.json({ accessToken });
	});
});

router.post("/tokens", (req, res, next) => {
	const existedRefreshToken = req.body.refreshToken;
	jwt.verify(existedRefreshToken, process.env.JWT_REFRESH, (err, decoded) => {
		if (err) {
			console.log(err.message);
			return res.status(404).json({ message: err.message });
		}
		const accessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_ACCESS, {
			expiresIn: "1day",
		});
		const refreshToken = jwt.sign(
			{ userId: decoded.userId },
			process.env.JWT_REFRESH,
			{
				expiresIn: "30days",
			},
		);

		res.status(201).json({ accessToken, refreshToken });
	});
});

module.exports = router;
