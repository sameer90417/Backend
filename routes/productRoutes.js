const express = require("express");
const auth = require("../middleware/auth");
const {
  createProduct,
  getProducts,
} = require("../controllers/productController");

const router = express.Router();

router.post("/", auth, createProduct);
router.get("/", getProducts);

module.exports = router;
