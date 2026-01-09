const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");
const { uploadProductImage } = require("../middlewares/upload");

const { protect } = require("../middlewares/auth");

router.post("/", protect, uploadProductImage, productController.createProduct);
router.get("/", productController.getProducts);
router.get("/group-by-category", productController.getProductsGroupedByCategory);
router.get("/by-category/:categoryName", productController.getProductsByCategoryName);
router.get("/:id", productController.getProductById);
router.put("/:id", protect, uploadProductImage, productController.updateProduct);
router.delete("/:id", protect, productController.deleteProduct);

module.exports = router;
