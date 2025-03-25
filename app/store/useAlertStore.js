import { create } from "zustand";

const useAlertStore = create((set) => ({
  showAlert: false,
  alertMessage: "",
  setShowAlert: (value, message = "Your session has expired. Please log in again.") => {
    set({ showAlert: value, alertMessage: message });
  },
  clearAlert: () => {
    set({ showAlert: false, alertMessage: "" });
  },
}));

export default useAlertStore;
