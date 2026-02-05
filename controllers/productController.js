const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  const product = await Product.create({
    ...req.body,
    createdBy: req.user.id,
  });
  res.status(201).json(product);
};

exports.getProducts = async (req, res) => {
  const products = await Product.find().populate("createdBy", "name email");
  res.json(products);
};
