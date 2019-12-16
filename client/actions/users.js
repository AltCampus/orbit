import axios from "axios";

import {
  USER_LOGIN_SUCCESS,
  NO_TOKEN,
  LOG_OUT,
  GET_USER_PENDING,
  GET_USER_SUCCESS,
  SET_ERROR
} from "./types";
import { message } from "antd";

const rootUrl = "http://localhost:3000/api/v1/users";

// const setTokenToAxios = token => {
//   const newToken = token || "";
//   axios.defaults.headers.Authorization = newToken;
// };

export const getCurrentUser = () => {
  if (!localStorage.authToken) {
    return;
  }
  return async dispatch => {
    try {
      await dispatch({
        type: GET_USER_PENDING
      });
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
      dispatch({ type: SET_ERROR });
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
      // setTokenToAxios(res.data.authToken);
      await dispatch({
        type: USER_LOGIN_SUCCESS,
        data: res.data.authToken
      });
    } catch (error) {
      if (error.response) {
        dispatch({ type: SET_ERROR, data: error.response.data.message });
        // message.error(error.response.data.message);
      }
      console.error(error);
    }
  };
};

export const userLogOut = callback => {
  // Clear the localStorage
  localStorage.clear();
  // Invoke the callback function
  callback();
  return {
    type: LOG_OUT
  };
};
