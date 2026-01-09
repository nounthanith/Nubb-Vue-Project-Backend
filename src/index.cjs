const app = require("./app.cjs");
const dotenv = require("dotenv");
const connectDB = require("./configs/db.cjs");

dotenv.config();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

connectDB();
