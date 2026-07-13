const Order = require("../models/Order");
const Cart = require("../models/Cart");

// =====================================
// Place Order
// =====================================
const placeOrder = async (req, res) => {
  try {
    const {
      shippingAddress,
      paymentMethod,
    } = req.body;

    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      image: item.product.image,
      price: item.product.price,
      quantity: item.quantity,
    }));

    const itemsPrice = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const shippingPrice = itemsPrice > 999 ? 0 : 199;

    const taxPrice = 0;

    const totalPrice =
      itemsPrice +
      shippingPrice +
      taxPrice;

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    // Clear Cart
    cart.items = [];
    await cart.save();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================
// Get My Orders
// =====================================
const getMyOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================
// Get Order By ID
// =====================================
const getOrderById = async (req, res) => {
  try {

    const order = await Order.findById(
      req.params.id
    )
      .populate("user", "name email")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================
// Update Order Status
// =====================================
const updateOrderStatus = async (req, res) => {
  try {

    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus =
      req.body.orderStatus ||
      order.orderStatus;

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order updated",
      order,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
};