const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
			default: "",
		},
		image: {
			type: String,
			default: "",
		},
		size: {
			type: String,
			enum: ["small", "medium", "large"],
			required: true,
		},
		price: {
			type: Number,
			required: true,
			min: 0,
		},
		discount: {
			type: Number,
			default: 0,
			min: 0,
		},
	},
	{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
