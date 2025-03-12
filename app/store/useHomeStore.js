import { create } from "zustand";
import homeServices from "../services/homeService";

const useHomeStore = create((set) => ({
  homeData: null,
  loading: false,
  error: null,
  errorHomeVisible: false, 

  fetchHomeData: async () => {
    set({ loading: true, error: null, errorHomeVisible: false });
    try {
      const response = await homeServices.getHomeData();
      set({ homeData: response, loading: false, errorHomeVisible: false });
    } catch (error) {
      set({ error: error.message, loading: false, errorHomeVisible: true });
    }
  },

  clearHomeData: () => {
    set({
      homeData: null,
      error: null,
      errorHomeVisible: false,
      loading: false,
    });
  },
}));

export default useHomeStore;
