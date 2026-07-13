import API from "./authApi";

// ==============================
// Get Wishlist
// ==============================
export const getWishlist = async (token) => {
  const response = await API.get("/wishlist", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ==============================
// Add To Wishlist
// ==============================
export const addToWishlist = async (productId, token) => {
  const response = await API.post(
    "/wishlist",
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ==============================
// Remove From Wishlist
// ==============================
export const removeFromWishlist = async (productId, token) => {
  const response = await API.delete(`/wishlist/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};