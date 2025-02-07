import { create } from "zustand";
import storeage from "../helper/localStorage";
import { localStorageConst } from "../constants/storageConstant";

const useUserStore = create((set) => ({
  user: null,
  token: null,
  setUser: (userData) => set({ user: userData }),
  setToken: (tokenData) => set({ token: tokenData }),
  clearUser: async() => {
    set({ user: null, token: null });
    await storeage.removeToken(localStorageConst.JWTUSER);
  },
}));

export default useUserStore;
