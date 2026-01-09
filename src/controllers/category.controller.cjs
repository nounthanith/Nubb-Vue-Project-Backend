const Category = require("../models/category.model.cjs");

/**
 * Create a new category
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) return res.status(400).json({ success: false, message: "Name is required" });
        const category = await Category.create({ name, description });
        res.status(201).json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

/**
 * Get all categories
 * @param {Object} _req - The request object
 * @param {Object} res - The response object
 */
exports.getCategories = async (_req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: categories });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Get a category by id
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        return res.status(200).json({ success: true, data: category });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Update a category
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const update = {
            ...(name !== undefined ? { name } : {}),
            ...(description !== undefined ? { description } : {}),
        };

        const category = await Category.findByIdAndUpdate(id, update, {
            new: true,
            runValidators: true,
        });

        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        return res.status(200).json({ success: true, data: category });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Delete a category
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        return res.status(200).json({ success: true, message: "Deleted", data: category });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};