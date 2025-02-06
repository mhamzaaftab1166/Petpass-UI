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

const forgotPassword = (payload) => {
  return _axios("post", "/auth/forgot-password", payload);
}; 

const resetPassword = (payload) => {
  return _axios("post", "/auth/reset-password", payload);
}; 


export default {
  register,
  emailVerify,
  resend,
  forgotPassword,
  resetPassword,
};