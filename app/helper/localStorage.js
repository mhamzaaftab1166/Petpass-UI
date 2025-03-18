import * as SecureStore from "expo-secure-store";

const storeAppData = async (key, authToken) => {
  const tokenString =
    typeof authToken === "string" ? authToken : JSON.stringify(authToken);

  try {
    await SecureStore.setItemAsync(key, tokenString);
  } catch (error) {
    console.log("Error storing auth token", error);
  }
};
  
  const getAppData = async (key) => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.log("error getting auth token", error);
    }
  };
  
  
  const removeAppData = async (key) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.log("error deleting auth token", error);
    }
  };
  
  
  export default {
    removeAppData,
    storeAppData,
    getAppData,
  };