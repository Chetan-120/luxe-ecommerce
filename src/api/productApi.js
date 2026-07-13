import API from "./authApi";

// =============================
// Get All Products
// =============================
export const getProducts = async () => {
  const response = await API.get("/products");
  return response.data;
};

// =============================
// Get Product By ID
// =============================
export const getProductById = async (id) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};