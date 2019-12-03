import axios from "axios";
const rooturl = "http://localhost:3000/api/v1/users/";

const setTokenToAxios = token => {
  const newToken = token || localStorage.getItem("authToken") || "";
  axios.defaults.headers.Authorization = newToken;
};
