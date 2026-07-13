import { create } from "zustand";
import {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
} from "../api/authApi";

export const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: false,
  loading: false,

  register: async (userData) => {
    set({ loading: true });

    try {
      const data = await registerUser(userData);

      localStorage.setItem("token", data.token);

      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        loading: false,
      });

      return data;
    } catch (error) {
      set({ loading: false });
      throw error.response?.data || error;
    }
  },

  login: async (credentials) => {
    set({ loading: true });

    try {
      const data = await loginUser(credentials);

      localStorage.setItem("token", data.token);

      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        loading: false,
      });

      return data;
    } catch (error) {
      set({ loading: false });
      throw error.response?.data || error;
    }
  },

  loadUser: async () => {
    const token = get().token;

    if (!token) return;

    try {
      const data = await getProfile(token);

      set({
        user: data.user,
        isAuthenticated: true,
      });
    } catch (error) {
      localStorage.removeItem("token");

      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    }
  },

  logout: async () => {
    try {
      await logoutUser();
    } catch (error) {}

    localStorage.removeItem("token");

    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));