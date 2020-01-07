import {
  FETCHING_INTERVIEW_STATUS_STARTED,
  FETCHING_INTERVIEW_STATUS_SUCCESS,
  FETCHING_INTERVIEW_STATUS_FAILED,
  FETCHING_AVAILABLE_SLOTS_STARTED,
  FETCHING_AVAILABLE_SLOTS_SUCCESS,
  FETCHING_AVAILABLE_SLOTS_FAILED,
  BOOKING_INTERVIEW_SLOT_STARTED,
  BOOKING_INTERVIEW_SLOT_SUCCESS,
  BOOKING_INTERVIEW_SLOT_FAILED
} from "../actions/types";
import { Message, message } from "antd";

const initialState = {
  isReviewInProgress: null,
  isFinalReviewInProgress: null,
  canScheduleInterview: null,
  hasScheduledInterview: null,
  interviewStartTime: null,
  interviewEndTime: null,
  hasFetchedInterviewStatus: false,
  isFetchingInterviewStatus: false,
  errorInFetchingInterviewStatus: null,
  hasFetchedAvailableSlots: false,
  isFetchingAvailableSlots: false,
  availableSlots: null,
  errorInFetchingAvailableSlots: null,
  isBookingInterviewSlot: false,
  errorInBookingInterviewSlot: null
};

const interview = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_INTERVIEW_STATUS_STARTED:
      return {
        ...state,
        isFetchingInterviewStatus: true,
        hasFetchedInterviewStatus: false,
        errorInFetchingInterviewStatus: null
      };
    case FETCHING_INTERVIEW_STATUS_FAILED:
      return {
        ...state,
        isFetchingInterviewStatus: false,
        errorInFetchingInterviewStatus: action.payload.error
      };
    case FETCHING_INTERVIEW_STATUS_SUCCESS:
      const {
        canScheduleInterview,
        hasScheduledInterview,
        isReviewInProgress,
        isFinalReviewInProgress
      } = action.payload;
      return {
        ...state,
        canScheduleInterview,
        hasScheduledInterview,
        isReviewInProgress,
        isFinalReviewInProgress,
        interviewStartTime: action.payload.startTime,
        interviewEndTime: action.payload.endTime,
        hasFetchedInterviewStatus: true,
        isFetchingInterviewStatus: false
      };
    case FETCHING_AVAILABLE_SLOTS_STARTED:
      return {
        ...state,
        isFetchingAvailableSlots: true,
        hasFetchedAvailableSlots: false,
        errorInFetchingAvailableSlots: null
      };
    case FETCHING_AVAILABLE_SLOTS_SUCCESS:
      return {
        ...state,
        isFetchingAvailableSlots: false,
        hasFetchedAvailableSlots: true,
        availableSlots: action.payload,
        errorInFetchingAvailableSlots: null
      };
    case FETCHING_AVAILABLE_SLOTS_FAILED:
      return {
        ...state,
        hasFetchedAvailableSlots: false,
        isFetchingAvailableSlots: false,
        errorInFetchingAvailableSlots: action.payload
      };
    case BOOKING_INTERVIEW_SLOT_STARTED:
      return {
        ...state,
        errorInBookingInterviewSlot: null,
        isBookingInterviewSlot: true
      };
    case BOOKING_INTERVIEW_SLOT_SUCCESS:
      return {
        ...state,
        isBookingInterviewSlot: false,
        errorInBookingInterviewSlot: null,
        canScheduleInterview: false,
        hasScheduledInterview: true,
        interviewStartTime: action.payload.startTime,
        interviewEndTime: action.payload.endTime
      };
    case BOOKING_INTERVIEW_SLOT_FAILED:
      message.error(action.payload);
      return {
        ...state,
        isBookingInterviewSlot: false,
        errorInBookingInterviewSlot: action.payload
      };

    default:
      return state;
  }
};

export default interview;
