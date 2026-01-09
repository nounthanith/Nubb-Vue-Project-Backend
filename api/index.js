const app = require("../src/app");
const connectDB = require("../src/configs/db");

let isConnected = false;

module.exports = async (req, res) => {
	try {
		req.url = String(req.url || "").replace(/\/\/{2,}/g, "/");
		if (!isConnected) {
			const ok = await connectDB();
			if (!ok) {
				return res.status(500).json({ success: false, message: "Database connection failed" });
			}
			isConnected = true;
		}
		return app(req, res);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ success: false, message: "Server error" });
	}
};
