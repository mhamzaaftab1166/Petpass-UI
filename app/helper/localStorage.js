import * as SecureStore from "expo-secure-store";

const storeToken = async (key, authToken) => {
    try {
      await SecureStore.setItemAsync(key, authToken);
    } catch (error) {
      console.log("error storing auth token", error);
    }
  };
  
  const getToken = async (key) => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.log("error getting auth token", error);
    }
  };
  
  
  const removeToken = async (key) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.log("error deleting auth token", error);
    }
  };
  
  
  export default {
    removeToken,
    storeToken,
    getToken,
  };