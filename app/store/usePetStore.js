import { create } from "zustand";
import petServices from "../services/petServices";

const usePetStore = create((set) => ({
  pets: [],
  loading: false,
  error: null,

  fetchPets: async () => {
    set({ loading: true });
    try {
      const response = await petServices.getPets();
      set({ pets: response.pets, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  clearPets: () => {
    set({ pets: [], error: null, loading: false });
  },
}));

export default usePetStore;
