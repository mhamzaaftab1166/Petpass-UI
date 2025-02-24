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

const addVaccinations = (payload) => {
  return _axios("post", "/user-pets-vaccination", payload);
};

const updateVaccinations = (payload) => {
  console.log("1234",payload);

  return _axios("put", "/user-pets-vaccination", payload);
};

export default {
  createUserPet,
  getPets,
  deletePets,
  getPetById,
  updatePetAbout,
  addVaccinations,
  updateVaccinations,
};
