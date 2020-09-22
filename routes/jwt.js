const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/accessToken", (req, res, next) => {
	const refreshToken = req.body.refreshToken;
	jwt.verify(refreshToken, process.env.JWT_REFRESH, (err, decoded) => {
		if (err) return res.status(404).json({ message: err.message });
		const accessToken = jwt.sign({ decoded }, process.env.JWT_ACCESS, {
			expiresIn: "1day",
		});

		res.json({ accessToken });
	});
});

module.exports = router;
