const jwt = require("jsonwebtoken");

const jwtVerify = (req, res, next) => {
	const token = req.headers["authorization"];
	const accessToken = token.split(" ")[1];

	jwt.verify(accessToken, process.env.JWT_ACCESS, (err, decoded) => {
		if (err) {
			return res.status(404).json({ message: err.message });
        }
        req.userId = decoded.userId;
		next();
	});
};

module.exports.jwtVerify = jwtVerify;
