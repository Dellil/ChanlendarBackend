const jwt = require("jsonwebtoken");

const jwtVerify = (req, res, next) => {
	const token = req.headers["authorization"];
	if (!token) {
		return res.status(401).json({ message: "There isn't have authorization in header" });
	}
	const accessToken = token.split(" ")[1];

	jwt.verify(accessToken, process.env.JWT_ACCESS, (err, decoded) => {
		if (err) {
			return res.status(404).json({ message: err.message });
		}
		req.user = {
			id: decoded.userId,
		};
		next();
	});
};

module.exports.jwtVerify = jwtVerify;
