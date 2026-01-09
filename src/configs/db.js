const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		const mongoUri = process.env.MONGO_URI;
		if (!mongoUri) {
			throw new Error("MONGO_URI is not defined");
		}

		await mongoose.connect(mongoUri);
		console.log(`Database Connected Successfully`);
		return true;
	} catch (error) {
		console.error("Error connecting to Database:", error.message);
		return false;
	}
};

module.exports = connectDB;