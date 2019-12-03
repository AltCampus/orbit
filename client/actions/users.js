import axios from "axios";

import { USER_LOGIN_SUCCESS } from "./types";

const rooturl = "http://localhost:3000/api/v1/users/";

const setTokenToAxios = token => {
  const newToken = token || localStorage.getItem("authToken") || "";
  axios.defaults.headers.Authorization = newToken;
};

export const getCurrentUser = () => {
  async dispatch => {
    try {
      const res = await axios.get(rooturl);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        data: res.data
      });
    }
  };
};
