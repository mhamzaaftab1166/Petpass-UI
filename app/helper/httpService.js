import axios from "axios";
import config from "../config.json";
import storage from "./localStorage";
import { localStorageConst } from "../constants/storageConstant";


const token =
"Bearer " + storage.getAppData(localStorageConst.JWTUSER);

export const _axios = async (method, url, body, contentType) => {
  try {
    const response = await axios({
      headers: {
        "Content-Type": contentType || "application/json",
        Authorization: token,
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
