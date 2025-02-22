import { create } from "zustand";
import petServices from "../services/petServices";

const usePetStore = create((set) => ({
  pets: [],
  loading: false,
  petError: null,
  petErrorVisible: false,

  fetchPets: async () => {
    set({ loading: true });
    try {
      const response = await petServices.getPets();
      set({ pets: response.pets, loading: false });
    } catch (error) {
      set({ petError: error.message, loading: false, petErrorVisible: true });
    }
  },

  clearPets: () => {
    set({ pets: [], error: null, loading: false });
  },
}));

export default usePetStore;
