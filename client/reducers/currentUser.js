import { USER_LOGIN_SUCCESS, LOG_OUT, NO_TOKEN } from "./../actions/types";

const initialState = {
  user: null,
  token: localStorage.getItem("authToken"),
  isAuthenticated: false,
  isAuthInProgress: true
};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.data.user,
        isAuthenticated: true,
        isAuthInProgress: false
      };
    case LOG_OUT:
    case NO_TOKEN:
      return {
        ...state,
        isAuthInProgress: false,
        token: null,
        user: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default currentUser;
