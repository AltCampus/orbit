import {
  USER_LOGIN_SUCCESS,
  GET_USER_SUCCESS,
  GET_USER_PENDING,
  LOG_OUT,
  NO_TOKEN,
  SET_ERROR,
  USER_STAGE_UPGRADE,
  USER_LOGIN_PENDING,
  USER_LOGIN_FAILED
} from "./../actions/types";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  tokenValidationInProgress: false,
  isLoginInProgress: false,
  isError: false
};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR: {
      return {
        ...state,
        isError: true
      };
    }
    case USER_LOGIN_PENDING: {
      return {
        ...state,
        isLoginInProgress: true
      };
    }
    case USER_LOGIN_FAILED: {
      return {
        ...state,
        isLoginInProgress: false
      };
    }
    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        token: action.data,
        isAuthenticated: true,
        tokenValidationInProgress: false,
        isLoginInProgress: false
      };
    }
    case GET_USER_PENDING: {
      return {
        ...state,
        tokenValidationInProgress: true
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.data,
        isAuthenticated: true,
        tokenValidationInProgress: false
      };
    }
    case USER_STAGE_UPGRADE: {
      return {
        ...state,
        user: {
          ...state.user,
          stage: state.user.stage + 1
        }
      };
    }
    case LOG_OUT:
    case NO_TOKEN:
      return {
        ...state,
        tokenValidationInProgress: false,
        isAuthenticated: false,
        token: null,
        user: null
      };
    default:
      return state;
  }
};

export default currentUser;
