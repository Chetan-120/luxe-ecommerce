import { create } from "zustand";
import toast from "react-hot-toast";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../api/wishlistApi";
import { useAuthStore } from "./useAuthStore";

export const useWishlistStore = create((set, get) => ({
  items: [],
  loading: false,

  // ==========================
  // Load Wishlist
  // ==========================
  loadWishlist: async () => {
    const token = useAuthStore.getState().token;

    if (!token) return;

    try {
      const data = await getWishlist(token);

      set({
        items: data.wishlist.map((item) => ({
          ...item.product,
          id: item.product._id,
        })),
      });
    } catch (error) {
      console.error(error);
    }
  },

  // ==========================
  // Toggle Wishlist
  // ==========================
  toggleWishlist: async (product) => {
    const token = useAuthStore.getState().token;

    if (!token) {
      toast.error("Please login first");
      return;
    }

    const exists = get().items.find((i) => i.id === product.id);

    try {
      if (exists) {
        await removeFromWishlist(product._id || product.id, token);

        set({
          items: get().items.filter((i) => i.id !== product.id),
        });

        toast("Removed from wishlist", {
          icon: "💔",
        });
      } else {
        await addToWishlist(product._id || product.id, token);

        set({
          items: [...get().items, product],
        });

        toast.success("Added to wishlist");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  // ==========================
  // Check Wishlist
  // ==========================
  isWishlisted: (id) => {
    return get().items.some((item) => item.id === id);
  },
}));
