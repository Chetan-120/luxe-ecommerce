const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
} = require("../controllers/productController");

// Get All Products
router.get("/", getProducts);

// Get Product By ID
router.get("/:id", getProductById);

module.exports = router;