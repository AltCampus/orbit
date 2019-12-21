import { 
    GET_APPLICANTS_PENDING, 
    GET_APPLICANTS_SUCCESS, 
    GET_APPLICANTS_FAILED,
  } from "../actions/types";


const initialState = {
  applicants: null,
  isApplicantsListFetched: false,
  isApplicantsListFetching: false,
  isFetchingFailed: false
};
      
const admin_dashboard = (state = initialState, action) => {
  switch (action.type) {
    case GET_APPLICANTS_PENDING: {
      return {
        ...state,
        isApplicantsListFetching: true
      };
    }
    case GET_APPLICANTS_FAILED: {
      return {
        ...state,
        isFetchingFailed: true,
        isApplicantsListFetching: false
      };
    }
    case GET_APPLICANTS_SUCCESS: {
      return {
        ...state,
        isApplicantsListFetched: true,
        applicants: action.data
      };
    }
    default:
      return state;
    }
  };
      
export default admin_dashboard;