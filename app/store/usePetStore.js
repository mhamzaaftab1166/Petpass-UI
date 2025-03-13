import { create } from "zustand";
import petServices from "../services/petServices";

const usePetStore = create((set) => ({
  pets: [],
  publicPets: [],
  pet: null,
  loading: false,
  petError: null,
  petErrorVisible: false,

  singlePetError: null,
  singlePetErrorVisible: false,

  fetchPets: async () => {
    set({ loading: true, petError: null, petErrorVisible: false });
    try {
      const response = await petServices.getPets();
      set({ pets: response.pets, loading: false });
    } catch (error) {
      set({
        petError: error.message,
        loading: false,
        petErrorVisible: true,
      });
    }
  },

  fetchPublicPets: async () => {
    set({ loading: true, petError: null, petErrorVisible: false });
    try {
      const response = await petServices.getPublicPets();
      set({ publicPets: response.pets, loading: false });
    } catch (error) {
      set({
        petError: error.message,
        loading: false,
        petErrorVisible: true,
      });
    }
  },

  fetchPetById: async (id) => {
    set({ loading: true, singlePetError: null, singlePetErrorVisible: false });
    try {
      const response = await petServices.getPetById(id);
      set({ pet: response.pet, loading: false });
    } catch (error) {
      console.log(error);
      
      set({
        singlePetError: error.message,
        loading: false,
        singlePetErrorVisible: true,
      });
    }
  },

  fetchPublicPetById: async (id, userId) => {
    set({ loading: true, singlePetError: null, singlePetErrorVisible: false });
    try {
      const response = await petServices.getPublicPetById(id, userId);
      set({ pet: response.pet, loading: false });
    } catch (error) {
      console.log(error);
      
      set({
        singlePetError: error.message,
        loading: false,
        singlePetErrorVisible: true,
      });
    }
  },

  clearPets: () => {
    set({
      pets: [],
      publicPets: [],
      pet: null,
      petError: null,
      petErrorVisible: false,
      singlePetError: null,
      singlePetErrorVisible: false,
      loading: false,
    });
  },
}));

export default usePetStore;
