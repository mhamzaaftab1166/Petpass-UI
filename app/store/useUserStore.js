import { create } from "zustand";
import authService from "../services/authService";

const useUserStore = create((set) => ({
  user: null,
  token: null,
  setUser: (userData) => set({ user: userData }),
  setToken: (tokenData) => set({ token: tokenData }),
  clearUser: () => {
    set({ user: null, token: null });
    authService.removeToken();
  },
}));

export default useUserStore;
