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

  // Fetch Pets with an optional config
  fetchPets: async (config = { showLoading: true }) => {
    if (config.showLoading) {
      set({ loading: true, petError: null, petErrorVisible: false });
    }
    try {
      const response = await petServices.getPets();
      set({
        pets: response.pets,
        ...(config.showLoading && { loading: false }),
      });
    } catch (error) {
      set({
        petError: error.message,
        ...(config.showLoading && { loading: false, petErrorVisible: true }),
      });
    }
  },

  // Fetch Public Pets with an optional config
  fetchPublicPets: async (config = { showLoading: true }) => {
    if (config.showLoading) {
      set({ loading: true, petError: null, petErrorVisible: false });
    }
    try {
      const response = await petServices.getPublicPets();
      set({
        publicPets: response.pets,
        ...(config.showLoading && { loading: false }),
      });
    } catch (error) {
      set({
        petError: error.message,
        ...(config.showLoading && { loading: false, petErrorVisible: true }),
      });
    }
  },

  // Fetch a single pet by ID (private pet) with an optional config
  fetchPetById: async (id, config = { showLoading: true }) => {
    if (config.showLoading) {
      set({
        loading: true,
        singlePetError: null,
        singlePetErrorVisible: false,
      });
    }
    try {
      const response = await petServices.getPetById(id);
      set({
        pet: response.pet,
        ...(config.showLoading && { loading: false }),
      });
    } catch (error) {
      console.log(error);
      set({
        singlePetError: error.message,
        ...(config.showLoading && {
          loading: false,
          singlePetErrorVisible: true,
        }),
      });
    }
  },

  // Fetch a public pet by ID with an optional config
  fetchPublicPetById: async (id, userId, config = { showLoading: true }) => {
    if (config.showLoading) {
      set({
        loading: true,
        singlePetError: null,
        singlePetErrorVisible: false,
      });
    }
    try {
      const response = await petServices.getPublicPetById(id, userId);
      set({
        pet: response.pet,
        ...(config.showLoading && { loading: false }),
      });
    } catch (error) {
      console.log(error);
      set({
        singlePetError: error.message,
        ...(config.showLoading && {
          loading: false,
          singlePetErrorVisible: true,
        }),
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
