import { create } from "zustand";
import addressServices from "../services/addressService"

const useAddressStore = create((set) => ({
  address: [],
  singleAddress: {},
  loading: false,
  error: null,
  fetchAddress: async (userId) => {
    set({ loading: true });
    try {
      const response = await addressServices.getCurrentUserAddress(userId);  
      
      set({ address: response.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch addresses', loading: false });
    }
  },
  fetchCurrentAddress: async (userId, addressId) => {
    set({ loading: true });
    try {
      const response = await addressServices.getSignleUserAddress(userId, addressId);  
      
      set({ singleAddress: response.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch address', loading: false });
    }
  },
  clearSingleAddress: async() => {
    set({ singleAddress: {}, error: null, loading: false });
  },
  clearAddress: async() => {
    set({ address: [], error: null, loading: false });
  },
}));

export default useAddressStore;
