import { create } from "zustand";
import toast from "react-hot-toast";

export const useWishlistStore = create((set, get) => ({
  items: [],
  toggleWishlist: (product) => {
    const exists = get().items.find((i) => i.id === product.id);
    if (exists) {
      set({ items: get().items.filter((i) => i.id !== product.id) });
      toast("Removed from wishlist", { icon: "💔" });
    } else {
      set({ items: [...get().items, product] });
      toast.success("Added to wishlist");
    }
  },
  isWishlisted: (id) => !!get().items.find((i) => i.id === id),
}));