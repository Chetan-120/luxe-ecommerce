import { create } from "zustand";
import toast from "react-hot-toast";

import {
  placeOrder,
  getMyOrders,
} from "../api/orderApi";

import { useCartStore } from "./useCartStore";

export const useOrderStore = create((set) => ({
  orders: [],
  loading: false,

  // ==========================
  // Place Order
  // ==========================
  placeNewOrder: async (orderData) => {
    try {
      set({ loading: true });

      const data = await placeOrder(orderData);

      // Clear local cart after successful order
      useCartStore.getState().clearCart();

      toast.success("Order placed successfully!");

      set({
        loading: false,
      });

      return data.order;
    } catch (error) {
      set({
        loading: false,
      });

      toast.error(
        error.response?.data?.message || "Failed to place order"
      );

      throw error;
    }
  },

  // ==========================
  // Load Orders
  // ==========================
  loadOrders: async () => {
    try {
      set({ loading: true });

      const data = await getMyOrders();

      set({
        orders: data.orders,
        loading: false,
      });
    } catch (error) {
      console.error(error);

      set({
        loading: false,
      });
    }
  },
}));