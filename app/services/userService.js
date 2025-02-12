import { _axios } from "../helper/httpService";

const getCurrentUser = () => {
  return _axios("get", "/user");
};

const resetEmail = (payload) => {
  return _axios("post", "/reset-email", payload);
};

const changePassword = (payload) => {
  return _axios("post", "/reset-password-token", payload);
};

export default {
  resetEmail,
  changePassword,
  getCurrentUser
};
