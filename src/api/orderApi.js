import API from "./authApi";

// ==========================
// Place Order
// ==========================
export const placeOrder = async (orderData) => {
  const response = await API.post("/orders", orderData);
  return response.data;
};

// ==========================
// Get My Orders
// ==========================
export const getMyOrders = async () => {
  const response = await API.get("/orders/myorders");
  return response.data;
};

// ==========================
// Get Order By ID
// ==========================
export const getOrderById = async (id) => {
  const response = await API.get(`/orders/${id}`);
  return response.data;
};