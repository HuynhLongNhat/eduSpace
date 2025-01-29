import axios from "axios";

export const getAllLectures = () => {
  return axios.get("http://localhost:3000/lectures");
};

export const getLectureById = (lectureId) => {
  return axios.get(`http://localhost:3000/lectures/${lectureId}`);
};

export const createNewLecture = (lectureData) => {
  return axios.post("http://localhost:3000/lectures", lectureData);
};

export const deleteLecture = (userId) => {
  return axios.delete(`http://localhost:3000/lectures/${userId}`);
};

export const editLecture = (lectureId, lectureData) => {
  return axios.put(`http://localhost:3000/lectures/${lectureId}`, lectureData);
};
