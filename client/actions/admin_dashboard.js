import { GET_APPLICANTS_PENDING, GET_APPLICANTS_SUCCESS } from "./types";
import axios from "axios";


export const getApplicantsList = () => {
    return async dispatch => { 
      try {
        dispatch({ type: GET_APPLICANTS_PENDING });
        
        const res = await axios.get("http://localhost:3000/api/v1/users/", {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("authToken"))
            }
          });
        dispatch({
          type: GET_APPLICANTS_SUCCESS,
          data: res.data.users
        });
      } catch (error) {
        if (error.response) {
          dispatch({ type: GET_APPLICANTS_FAILED });
          message.error(error.response.data.message);
        } else console.error(error);
      }
    };
  };