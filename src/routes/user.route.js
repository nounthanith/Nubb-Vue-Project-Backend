const express = require("express");
const {
	register,
	login,
	logout,
	getProfile,
	getAllUsers,
} = require("../controllers/user.controller");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/profile", protect, getProfile);
router.get("/users", protect, getAllUsers);

module.exports = router;
