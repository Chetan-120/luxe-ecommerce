import { create } from "zustand";

export const useRecentlyViewedStore = create((set, get) => ({
  items: JSON.parse(localStorage.getItem("luxe-recent") || "[]"),
  addView: (product) => {
    const filtered = get().items.filter((p) => p.id !== product.id);
    const updated = [product, ...filtered].slice(0, 8);
    localStorage.setItem("luxe-recent", JSON.stringify(updated));
    set({ items: updated });
  },
}));