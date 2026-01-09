const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./configs/db");

dotenv.config();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

connectDB();
