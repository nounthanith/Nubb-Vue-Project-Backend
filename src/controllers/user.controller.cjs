const User = require("./../models/user.model.cjs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* =========================
   REGISTER
========================= */
exports.register = async (req, res) => {
	try {
		const {name, email, password, role} = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({
				success: false,
				message: "Missing required fields",
			});
		}

		const exists = await User.findOne({email});
		if (exists) {
			return res.status(400).json({
				success: false,
				message: "Email already exists",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			name,
			email,
			password: hashedPassword,
			role: role || "user",
		});

		res.status(201).json({
			success: true,
			message: "Register successful",
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error?.message || "Internal server error",
		});
	}
};

/* =========================
   LOGIN
========================= */
exports.login = async (req, res) => {
	try {
		const {email, password} = req.body;

		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "Missing required fields",
			});
		}

		const user = await User.findOne({email});
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		if (!process.env.SECRET) {
			return res.status(500).json({
				success: false,
				message: "JWT secret not configured",
			});
		}

		const token = jwt.sign(
			{id: user._id, role: user.role},
			process.env.SECRET,
			{expiresIn: process.env.EXPIRES || "7d"}
		);

		res.status(200).json({
			success: true,
			message: "Login successful",
			token,
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error?.message || "Internal server error",
		});
	}
};

/* =========================
   LOGOUT
========================= */
/**
 * JWT logout is handled client-side
 * (delete token from localStorage / cookies)
 */
exports.logout = async (req, res) => {
	try {
		res.status(200).json({
			success: true,
			message: "Logout successful",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

/* =========================
   GET PROFILE
========================= */
exports.getProfile = async (req, res) => {
	try {
		const userId = req.user.id; // from auth middleware

		const user = await User.findById(userId).select("-password");
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		res.status(200).json({
			success: true,
			user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error?.message || "Internal server error",
		});
	}
};

/* =========================
   GET ALL USERS (ADMIN)
========================= */
exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find().select("-password");

		res.status(200).json({
			success: true,
			count: users.length,
			users,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error?.message || "Internal server error",
		});
	}
};
