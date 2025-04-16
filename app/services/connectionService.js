import { _axios } from "../helper/httpService";

const getUsers = (payload) => {
  return _axios("post", "/users", payload);
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

const removeConnect = (connectionId) => {
  return _axios("delete", `/connections/${connectionId}/remove`);
};

const acceptInvite = (connection_id, sender_id, reciver_id) => {
  return _axios(
    "post",
    `/user-connection-accept/${connection_id}/${sender_id}/${reciver_id}`
  );
};

const rejectInvite = (connection_id, sender_id, reciver_id) => {
  return _axios(
    "post",
    `/user-connection-reject/${connection_id}/${sender_id}/${reciver_id}`
  );
};

export default {
  getUsers,
  getConnectedUsers,
  getRequesedUsers,
  sendInvite,
  cancelInvite,
  acceptInvite,
  rejectInvite,
  removeConnect,
};
