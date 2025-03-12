import { _axios } from "../helper/httpService";

const getHomeData = () => {
  return _axios("get", `/home-settings`);
};

const getTipById = (id) => {
  return _axios("get", `/pet-tips/${id}`);
};

const getTips = () => {
  return _axios("get", `/pet-tips`);
};

export default {
  getHomeData,
  getTipById,
  getTips,
};
