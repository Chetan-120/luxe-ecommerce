import { create } from "zustand";

export const useThemeStore = create((set, get) => ({
  theme: localStorage.getItem("luxe-theme") || "light",
  toggleTheme: () => {
    const next = get().theme === "light" ? "dark" : "light";
    localStorage.setItem("luxe-theme", next);
    set({ theme: next });
  },
}));