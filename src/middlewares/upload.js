const fs = require("fs");
const path = require("path");
const multer = require("multer");

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

function ensureDirSync(dirPath) {
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, { recursive: true });
	}
}

function sanitizeBaseName(name) {
	return String(name || "")
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^a-z0-9\-_]/g, "")
		.replace(/-+/g, "-")
		.replace(/^[-_]+|[-_]+$/g, "");
}

function createDiskStorage(subFolder) {
	return multer.diskStorage({
		destination: (_req, _file, cb) => {
			const uploadRoot = path.join(process.cwd(), "uploads", subFolder);
			ensureDirSync(uploadRoot);
			cb(null, uploadRoot);
		},
		filename: (_req, file, cb) => {
			const ext = path.extname(file.originalname || "").toLowerCase();
			const base = sanitizeBaseName(path.parse(file.originalname || "file").name);
			const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
			cb(null, `${base || "file"}-${unique}${ext}`);
		},
	});
}

const imageFileFilter = (_req, file, cb) => {
	const allowed = new Set([
		"image/jpeg",
		"image/jpg",
		"image/png",
		"image/webp",
	]);

	if (!allowed.has(file.mimetype)) {
		cb(new Error("Only image files are allowed (jpg, jpeg, png, webp)"));
		return;
	}

	cb(null, true);
};

function createUploader(subFolder) {
	return multer({
		storage: createDiskStorage(subFolder),
		limits: { fileSize: MAX_FILE_SIZE_BYTES },
		fileFilter: imageFileFilter,
	});
}

const uploadCategoryImage = createUploader("categories").single("image");
const uploadProductImage = createUploader("products").single("image");

module.exports = {
	uploadCategoryImage,
	uploadProductImage,
};
