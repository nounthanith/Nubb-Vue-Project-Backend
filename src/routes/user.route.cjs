const express = require("express");
const {
	register,
	login,
	logout,
	getProfile,
	getAllUsers,
} = require("../controllers/user.controller.cjs");
const { protect } = require("../middlewares/auth.cjs");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/profile", protect, getProfile);
router.get("/users", protect, getAllUsers);

module.exports = router;
