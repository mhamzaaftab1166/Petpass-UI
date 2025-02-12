import { create } from "zustand";
import addressServices from "../services/addressService"

const useAddressStore = create((set) => ({
  address: null,
  loading: false,
  error: null,
  fetchAddress: async (userId) => {
    set({ loading: true });
    try {
      const response = await addressServices.getCurrentUserAddress(userId);  
      
      set({ address: response.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch users', loading: false });
    }
  },
}));

export default useAddressStore;
