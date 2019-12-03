import axios from "axios";

import {
  USER_LOGIN_SUCCESS,
  NO_TOKEN,
  UPDATE_TOKEN,
  GET_USER_SUCCESS
} from "./types";

const rootUrl = "http://localhost:3000/api/v1/users/";

const setTokenToAxios = token => {
  const newToken = token || "";
  axios.defaults.headers.Authorization = newToken;
};

export const getCurrentUser = () => {
  return async dispatch => {
    try {
      const res = await axios.get(rootUrl, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("authToken"))
        }
      });
      await dispatch({
        type: GET_USER_SUCCESS,
        data: res.data.user
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const userLogin = data => {
  return async dispatch => {
    try {
      const res = await axios.post(`${rootUrl}/login`, data);
      localStorage.setItem("authToken", JSON.stringify(res.data.authToken));
      // Set token
      setTokenToAxios(res.data.authToken);
      await dispatch({
        type: UPDATE_TOKEN,
        data: res.data.authToken
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

// export const updateToken = () => {
//   // localStorage.setItem("authToken", token);
//   let token = JSON.parse(localStorage.getItem("authToken"));
//   setTokenToAxios(token);
//   return { type: UPDATE_TOKEN, data: { token } };
// };
