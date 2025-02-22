import { _axios } from "../helper/httpService";

const createUserPet = (payload) => {
  return _axios("post", "/user-pets", payload, "multipart/form-data");
};

const getPets = () => {
  return _axios("get", "/user-pets");
};

const deletePets = (id) => {
  return _axios("delete", `/user-pets/${id}`);
};

const getPetById = (id) => {
  return _axios("get", `/user-pets/${id}`);
};

const updatePetAbout = (payload, id) => {
  return _axios("put", `/user-pets/${id}`, payload, "multipart/form-data");
};

export default {
  createUserPet,
  getPets,
  deletePets,
  getPetById,
  updatePetAbout,
};
