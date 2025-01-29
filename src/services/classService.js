import axios from "axios";

export const getAllClass = () =>{
     return axios.get("http://localhost:3000/classes");
}

export const getClassById = (classId) => {
  return axios.get(`http://localhost:3000/classes/${classId}`);
};

export const createNewClass = (classData) => {
  return axios.post("http://localhost:3000/classes",classData);
};

export const deleteClass = (classId) => {
  return axios.delete(`http://localhost:3000/classes/${classId}`);
};

export const editClass = (classId , classData) => {
  return axios.put(`http://localhost:3000/classes/${classId}`, classData);
};