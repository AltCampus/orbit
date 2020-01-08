import axios from "axios";

import {
  SCHEDULE_INTERVIEW_SUCCESS,
  SCHEDULE_INTERVIEW_FAILED,
  FETCHING_INTERVIEW_STATUS_STARTED,
  FETCHING_INTERVIEW_STATUS_SUCCESS,
  FETCHING_INTERVIEW_STATUS_FAILED,
  FETCHING_AVAILABLE_SLOTS_SUCCESS,
  FETCHING_AVAILABLE_SLOTS_FAILED,
  FETCHING_AVAILABLE_SLOTS_STARTED,
  BOOKING_INTERVIEW_SLOT_STARTED,
  BOOKING_INTERVIEW_SLOT_SUCCESS,
  BOOKING_INTERVIEW_SLOT_FAILED
} from "./types";
import { message } from "antd";
import config from "../config";

export const fetchInterviewStatus = () => {
  return async dispatch => {
    try {
      await dispatch({
        type: FETCHING_INTERVIEW_STATUS_STARTED
      });
      const res = await axios.get("/api/v1/interviews/status", {
        headers: {
          authorization: JSON.parse(localStorage.getItem("authToken"))
        }
      });
      await dispatch({
        type: FETCHING_INTERVIEW_STATUS_SUCCESS,
        payload: res.data
      });
    } catch (error) {
      await dispatch({
        type: FETCHING_INTERVIEW_STATUS_FAILED
      });
    }
  };
};

export const fetchAvailableSlots = () => {
  return async dispatch => {
    try {
      await dispatch({
        type: FETCHING_AVAILABLE_SLOTS_STARTED
      });
      const res = await axios.get("/api/v1/interviews/", {
        headers: {
          authorization: JSON.parse(localStorage.getItem("authToken"))
        }
      });
      await dispatch({
        type: FETCHING_AVAILABLE_SLOTS_SUCCESS,
        payload: res.data.availableSlots
      });
    } catch (error) {
      await dispatch({
        type: FETCHING_AVAILABLE_SLOTS_FAILED,
        payload: error.response && error.response.data.error
      });
    }
  };
};

export const bookAvailableSlot = id => {
  return async dispatch => {
    try {
      await dispatch({
        type: BOOKING_INTERVIEW_SLOT_STARTED
      });
      const res = await axios.put(
        `/api/v1/interviews/book/${id}`,
        {},
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("authToken"))
          }
        }
      );
      await dispatch({
        type: BOOKING_INTERVIEW_SLOT_SUCCESS,
        payload: res.data.slotDetails
      });
    } catch (error) {
      console.log(error);
      await dispatch({
        type: BOOKING_INTERVIEW_SLOT_FAILED,
        payload: error.response && error.response.data.error
      });
    }
  };
};
