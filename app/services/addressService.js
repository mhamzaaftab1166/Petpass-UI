import { _axios } from "../helper/httpService";

const getCurrentUserAddress = (userId) => {
  return _axios("get", `/user-address/${userId}`);
};

const getSignleUserAddress = (userId, addressId) => {
  return _axios("get", `/user-address/${userId}/${addressId}`);
};

const createUserAddress = (payload) => {
  return _axios("post", "/user-address", payload);
};

const updateUserAddress = (payload) => {
  return _axios(
    "put",
    `/user-address/${payload.userId}/${payload.addressId}`,
    payload
  );
};

const deleteUserAddress = (userId, id) => {
  return _axios("delete", `/user-address/${userId}/${id}`);
};

export default {
  getCurrentUserAddress,
  getSignleUserAddress,
  createUserAddress,
  updateUserAddress,
  deleteUserAddress,
};
