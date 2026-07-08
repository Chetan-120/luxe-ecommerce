import { create } from "zustand";
import toast from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  items: [],
  addItem: (product, qty = 1) => {
    const items = get().items;
    const existing = items.find((i) => i.id === product.id);
    if (existing) {
      set({
        items: items.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        ),
      });
    } else {
      set({ items: [...items, { ...product, qty }] });
    }
    toast.success(`${product.name} added to cart`);
  },
  removeItem: (id) => {
    set({ items: get().items.filter((i) => i.id !== id) });
    toast("Item removed", { icon: "🗑️" });
  },
  updateQty: (id, qty) =>
    set({
      items: get().items.map((i) => (i.id === id ? { ...i, qty } : i)),
    }),
  clearCart: () => set({ items: [] }),
  total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
}));