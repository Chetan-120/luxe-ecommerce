const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  placeOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");

// ==========================
// Place Order
// ==========================
router.post("/", protect, placeOrder);

// ==========================
// Get Logged In User Orders
// ==========================
router.get("/myorders", protect, getMyOrders);

// ==========================
// Get Order By ID
// ==========================
router.get("/:id", protect, getOrderById);

// ==========================
// Update Order Status
// (Admin - we'll protect later)
// ==========================
router.put("/:id", protect, updateOrderStatus);

module.exports = router;