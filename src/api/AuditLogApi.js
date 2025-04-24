import axios from "../../src/utils/customAxios";
const token = JSON.parse(localStorage.getItem("token"))?.accessToken;
export const getAllAuditLog = () => {
  return axios.get("/app/audit-logs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
