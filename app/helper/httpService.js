import axios from "axios";
import config from "../config.json";
import storage from "./localStorage";
import { localStorageConst } from "../constants/storageConstant";


const getStoredToken = async () => {
  const storedToken = await storage.getAppData(localStorageConst.JWTUSER);
  console.log(storedToken, 'storedToken11111');
  return storedToken;
};


export const _axios = async (method, url, body, contentType) => {  
  try {
    const token = await getStoredToken();    
    const response = await axios({
      headers: {
        "Content-Type": contentType || "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      method: method,
      url: config.baseUrl + url,
      data: body,
    });

    return response.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw err.response.data;
    }
  }
};
