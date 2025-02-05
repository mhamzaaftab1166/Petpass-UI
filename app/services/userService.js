import { _axios } from "./httpService";

const register = (user) => {  
  return _axios('post',  "/auth/register", user);
};

const emailVerify = (payload) => {
  return _axios("post", "/auth/verify-otp", payload);
};

const resend = (payload) => {
  return _axios("post", "/auth/resend-otp", payload);
};

export default {
  register,
  emailVerify,
  resend,
};