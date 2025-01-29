import axios from "axios";

export const getAllExams = () => {
  return axios.get("http://localhost:3000/exams");
};

export const getExamsById = (examId) => {
  return axios.get(`http://localhost:3000/exams/${examId}`);
};

export const createNewExams = (examData) => {
  return axios.post("http://localhost:3000/exams", examData);
};

export const deleteExams = (examId) => {
  return axios.delete(`http://localhost:3000/exams/${examId}`);
};

export const editExams = (examId, examData) => {
  return axios.put(`http://localhost:3000/exams/${examId}`, examData);
};
