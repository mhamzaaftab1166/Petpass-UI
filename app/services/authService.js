import { _axios } from "./httpService";
import * as SecureStore from "expo-secure-store";

const key= "authToken";
const login = (user) => {  
  return _axios("post", "/auth/login", user);
};

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log("error storing auth token", error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("error getting auth token", error);
  }
};


const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("error deleting auth token", error);
  }
};


export default {
  login,
  removeToken,
  storeToken,
  getToken,
};