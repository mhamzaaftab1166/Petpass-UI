import { create } from "zustand";
import storeage from "../helper/localStorage";
import { localStorageConst } from "../constants/storageConstant";
import userServices from "../services/userService"

const useUserStore = create((set) => ({
  user: null,
  token: null,
  refreshToken: null,
  rememberMe: false,
  loading: false,
  error: null,
  setToken: (tokenData) => set({ token: tokenData }),
  setRemember: (value) => set({ rememberMe: value }),
  setRefreshToken: (refreshTokenData) => set({ refreshToken: refreshTokenData }),
  fetchUser: async () => {
    set({ loading: true });
    try {
      const response = await userServices.getCurrentUser();  
      set({ user: response?.user, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch users', loading: false });
    }
  },
  clearUserData: async() => {
    set({ user: null, loading: false, error: null });
  },
  clearUser: async() => {
    set({ user: null, token: null,  refreshToken: null, rememberMe: false});
    await storeage.removeAppData(localStorageConst.JWTUSER);
    await storeage.removeAppData(localStorageConst.REFRESHTOKEN)
    await storeage.removeAppData(localStorageConst.REMEMBER)
  },
}));

export default useUserStore;
