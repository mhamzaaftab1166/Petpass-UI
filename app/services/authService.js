import { _axios } from "../helper/httpService";

const key= "authToken";
const login = (user) => {  
  return _axios("post", "/auth/login", user);
};

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

const validateToken = (payload) => {
  return _axios("get", "/auth/validate-token", payload);
}; 


export default {
  login,
  register,
  emailVerify,
  resend,
  forgotPassword,
  resetPassword,
  validateToken
};

