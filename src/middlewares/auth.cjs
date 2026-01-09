const jwt = require("jsonwebtoken");
const User = require("../models/user.model.cjs");

const protect = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({ success: false, message: "Not authorized" });
		}

		if (!process.env.SECRET) {
			return res.status(500).json({ success: false, message: "SECRET is not defined" });
		}

		const token = authHeader.split(" ")[1];
		const decoded = jwt.verify(token, process.env.SECRET);

		const user = await User.findById(decoded.id).select("-password");
		if (!user) {
			return res.status(401).json({ success: false, message: "Not authorized" });
		}

		req.user = user;
		next();
	} catch (error) {
		return res.status(401).json({ success: false, message: "Not authorized" });
	}
};

const isAdmin = (req, res, next) => {
	if (req.user && req.user.role === "admin") return next();
	return res.status(403).json({ success: false, message: "Admin only" });
};

module.exports = {
	protect,
	isAdmin,
};
