import { _axios } from "../helper/httpService";

const createUserPet = (payload) => {
  return _axios("post", "/user-pets", payload, "multipart/form-data");
};

export default {
  createUserPet,
};
