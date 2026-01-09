const express = require('express');
const dotenv = require('dotenv');
const userRouter = require("./routes/user.route");
const categoryRouter = require("./routes/category.route");
const productRouter = require("./routes/product.route");
const cors = require("cors");
const path = require("path");

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: [process.env.FRONTEND_URL, process.env.FRONTEND_URL_2],
  credentials: true,
}));

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use((req, _res, next) => {
  req.url = req.url.replace(/\/\/{2,}/g, "/");
  next();
});

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/auth", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);

module.exports = app;