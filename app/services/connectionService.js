import { _axios } from "../helper/httpService";

const getUsers = () => {
  return _axios("get", "/users");
};

const getConnectedUsers = () => {
  return _axios("get", "/user-connected");
};

const getRequesedUsers = () => {
  return _axios("get", "/user-pending");
};

export default {
  getUsers,
  getConnectedUsers,
  getRequesedUsers,
};
