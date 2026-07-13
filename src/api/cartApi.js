import API from "./authApi";

// Get Cart
export const getCart = async () => {
  const response = await API.get("/cart");
  return response.data;
};

// Add Item
export const addToCart = async (productId, quantity = 1) => {
  const response = await API.post("/cart", {
    productId,
    quantity,
  });

  return response.data;
};

// Update Quantity
export const updateCart = async (productId, quantity) => {
  const response = await API.put("/cart", {
    productId,
    quantity,
  });

  return response.data;
};

// Remove Item
export const removeCartItem = async (productId) => {
  const response = await API.delete(`/cart/${productId}`);
  return response.data;
};