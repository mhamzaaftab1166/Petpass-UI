import { _axios } from "../helper/httpService";

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

const refreshToken = (payload) => {
  return _axios("post", "/auth/refresh-token", payload);
}; 

const validateToken = () => {
  return _axios("get", "/validate-token");
}; 



export default {
  login,
  register,
  emailVerify,
  resend,
  forgotPassword,
  resetPassword,
  refreshToken,
  validateToken
};

