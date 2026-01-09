const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller.cjs");

const { protect } = require("../middlewares/auth.cjs");

router.post("/", protect, categoryController.createCategory);

router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryById);
router.put("/:id", protect, categoryController.updateCategory);
router.delete("/:id", protect, categoryController.deleteCategory);

module.exports = router;