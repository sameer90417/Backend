const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const Product = require("./models/Product");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const bcrypt = require("bcryptjs");

require("dotenv").config();

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Signup
app.post("/api/auth/register", async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({
    message: "Login successful",
    token,
  });
});

// Create Product
app.post("/api/products", auth, async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Products
app.get("/api/products", auth, async (req, res) => {
  const products = await Product.find().populate("createdBy", "name email");
  res.json(products);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
