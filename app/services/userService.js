import { _axios } from "../helper/httpService";

const resetEmail = (payload) => {
  return _axios("post", "/reset-email", payload);
};

export default {
  resetEmail,
};
