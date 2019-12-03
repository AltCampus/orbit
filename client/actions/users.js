import axios from "axios";

import { USER_LOGIN_SUCCESS, NO_TOKEN } from "./types";

const rootUrl = "http://localhost:3000/api/v1/users/";

const setTokenToAxios = token => {
  const newToken = token || localStorage.getItem("authToken") || "";
  axios.defaults.headers.Authorization = newToken;
};

export const getCurrentUser = () => {
  async dispatch => {
    try {
      const res = await axios.get(rootUrl);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        data: res.data
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const logOut = () => {
  localStorage.clear();
  return { type: NO_TOKEN };
};
