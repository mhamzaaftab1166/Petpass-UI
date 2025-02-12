import { _axios } from "../helper/httpService";

const getCurrentUserAddress = (userId) => {  
  return _axios("get", `/user-address/${userId}`);
};

const createUserAddress = (payload) => {
  console.log(payload, 'payload');
  
  return _axios("post", "/user-address", payload);
};

const updateUserAddress = (userId, id) => {
    return _axios("put", `/user-address/${userId}/${id}`);
  };

const deleteUserAddress = (userId, id) => {
  return _axios("delete", `/user-address/${userId}/${id}`);
};

export default {
  getCurrentUserAddress,
  createUserAddress,
  updateUserAddress,
  deleteUserAddress
};
