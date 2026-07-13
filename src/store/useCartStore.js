import { create } from "zustand";
import toast from "react-hot-toast";

import { getCart, addToCart, updateCart, removeCartItem } from "../api/cartApi";

export const useCartStore = create((set, get) => ({
  items: [],
  loading: false,

  loadCart: async () => {
    try {
      set({ loading: true });

      const cart = await getCart();

      const items = cart.items.map((item) => ({
        ...item.product,
        id: item.product._id,
        quantity: item.quantity,
      }));

      set({
        items,
        loading: false,
      });
    } catch (error) {
      console.error(error);

      set({
        loading: false,
      });
    }
  },

  addItem: async (product, quantity = 1) => {
    try {
      const cart = await addToCart(product._id || product.id, quantity);

      const items = cart.items.map((item) => ({
        ...item.product,
        id: item.product._id,
        quantity: item.quantity,
      }));

      console.log("Updated Cart:", items);
      set({ items });

      toast.success("Added to cart");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add item");
    }
  },

  updateQuantity: async (productId, quantity) => {
    try {
      const cart = await updateCart(productId, quantity);

      const items = cart.items.map((item) => ({
        ...item.product,
        id: item.product._id,
        quantity: item.quantity,
      }));

      set({ items });
    } catch (error) {
      console.error(error);
    }
  },

  removeItem: async (productId) => {
    try {
      const cart = await removeCartItem(productId);

      const items = cart.items.map((item) => ({
        ...item.product,
        id: item.product._id,
        quantity: item.quantity,
      }));

      set({ items });

      toast.success("Removed from cart");
    } catch (error) {
      console.error(error);
    }
  },

  clearCart: () => {
    set({
      items: [],
    });
  },

  totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

  subtotal: () =>
    get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));
