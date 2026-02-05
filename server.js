const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
app.use(express.json());

connectDB();

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));

app.get("/", (req, res) => {
  res.send("MERN Backend API Running 🚀");
});

app.listen(process.env.PORT || 5000, () =>
  console.log("Server running")
);
