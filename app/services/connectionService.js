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

const sendInvite = (senderId,payload) => {
  return _axios("post", `/user-connection/${senderId}`, payload);
};

const cancelInvite = (connectionId) => {
  return _axios("delete", `/connections/${connectionId}/withdraw`);
};


export default {
  getUsers,
  getConnectedUsers,
  getRequesedUsers,
  sendInvite,
  cancelInvite,
};
