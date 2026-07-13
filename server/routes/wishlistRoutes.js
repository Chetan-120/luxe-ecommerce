const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

// Get User Wishlist
router.get("/", protect, getWishlist);

// Add Product to Wishlist
router.post("/", protect, addToWishlist);

// Remove Product from Wishlist
router.delete("/:productId", protect, removeFromWishlist);

module.exports = router;