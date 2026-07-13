import { create } from "zustand";
import { getProducts } from "../api/productApi";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,

  fetchProducts: async () => {
    set({ loading: true });

    try {
      const data = await getProducts();

      set({
        products: data.products,
        loading: false,
      });
    } catch (error) {
      console.error("Failed to fetch products:", error);

      set({
        loading: false,
      });
    }
  },
}));