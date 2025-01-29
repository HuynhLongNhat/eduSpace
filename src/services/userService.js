import axios from "axios";

export const getAllUsers = () => {
  return axios.get("http://localhost:3000/users");
};

export const getUserById = (userId) => {
  return axios.get(`http://localhost:3000/users/${userId}`);
};

export const createNewUser = (userData) => {
  return axios.post("http://localhost:3000/users", userData);
};

export const deleteUser = (userId) => {
  return axios.delete(`http://localhost:3000/users/${userId}`);
};

export const editUser = (userId, userData) => {
  return axios.put(`http://localhost:3000/users/${userId}`, userData);
};
