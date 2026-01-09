const Product = require("../models/product.model.cjs");
const Category = require("../models/category.model.cjs");

exports.createProduct = async (req, res) => {
	try {
		const { name, description, size, price, discount, categoryId } = req.body;

		if (!categoryId || !name || !size || price === undefined) {
			return res.status(400).json({ success: false, message: "Missing required fields" });
		}

		const category = await Category.findById(categoryId);
		if (!category) {
			return res.status(400).json({ success: false, message: "Category not found" });
		}

		const image = req.file ? `/uploads/products/${req.file.filename}` : req.body.image;

		const product = await Product.create({
			category: categoryId,
			name,
			description,
			size,
			price,
			discount,
			image,
		});

		return res.status(201).json({ success: true, data: product });
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

exports.getProductsByCategoryName = async (req, res) => {
	try {
		const { categoryName } = req.params;
		const { name } = req.query;

		const category = await Category.findOne({
			name: { $regex: `^${categoryName}$`, $options: "i" },
		});
		if (!category) {
			return res.status(404).json({ success: false, message: "Category not found" });
		}

		const filter = { category: category._id };
		if (name) {
			filter.name = { $regex: String(name), $options: "i" };
		}

		const products = await Product.find(filter)
			.populate("category", "name")
			.sort({ createdAt: -1 });

		return res.status(200).json({ success: true, data: products });
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

exports.getProducts = async (_req, res) => {
	try {
		const products = await Product.find().populate("category", "name").sort({ createdAt: -1 });
		return res.status(200).json({ success: true, data: products });
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

exports.getProductsGroupedByCategory = async (req, res) => {
	try {
		const limitRaw = req.query.limit;
		const limit = limitRaw !== undefined ? Number(limitRaw) : undefined;
		const perCategoryLimit = Number.isFinite(limit) && limit > 0 ? limit : undefined;

		const categories = await Category.find().sort({ createdAt: -1 });
		const grouped = [];

		for (const category of categories) {
			const query = Product.find({ category: category._id }).sort({ createdAt: -1 });
			if (perCategoryLimit) query.limit(perCategoryLimit);

			const products = await query;
			grouped.push({
				category: {
					id: category._id,
					name: category.name,
				},
				products,
			});
		}

		return res.status(200).json({ success: true, data: grouped });
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

exports.getProductById = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id).populate("category", "name");

		if (!product) {
			return res.status(404).json({ success: false, message: "Product not found" });
		}

		return res.status(200).json({ success: true, data: product });
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

exports.updateProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, description, size, price, discount, categoryId } = req.body;

		const update = {
			...(name !== undefined ? { name } : {}),
			...(description !== undefined ? { description } : {}),
			...(size !== undefined ? { size } : {}),
			...(price !== undefined ? { price } : {}),
			...(discount !== undefined ? { discount } : {}),
		};

		if (categoryId !== undefined) {
			const category = await Category.findById(categoryId);
			if (!category) {
				return res.status(400).json({ success: false, message: "Category not found" });
			}
			update.category = categoryId;
		}

		if (req.file) {
			update.image = `/uploads/products/${req.file.filename}`;
		} else if (req.body.image !== undefined) {
			update.image = req.body.image;
		}

		const product = await Product.findByIdAndUpdate(id, update, {
			new: true,
			runValidators: true,
		});

		if (!product) {
			return res.status(404).json({ success: false, message: "Product not found" });
		}

		return res.status(200).json({ success: true, data: product });
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

exports.deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndDelete(id);

		if (!product) {
			return res.status(404).json({ success: false, message: "Product not found" });
		}

		return res.status(200).json({ success: true, message: "Deleted", data: product });
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};
