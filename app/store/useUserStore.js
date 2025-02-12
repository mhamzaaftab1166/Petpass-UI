import { create } from "zustand";
import storeage from "../helper/localStorage";
import { localStorageConst } from "../constants/storageConstant";
import userServices from "../services/userService"

const useUserStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,
  setToken: (tokenData) => set({ token: tokenData }),
  fetchUser: async () => {
    set({ loading: true });
    try {
      const response = await userServices.getCurrentUser();  
      set({ user: response?.user, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch users', loading: false });
    }
  },
  clearUser: async() => {
    set({ user: null, token: null });
    await storeage.removeAppData(localStorageConst.JWTUSER);
  },
}));

export default useUserStore;
