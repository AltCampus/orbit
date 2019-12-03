import { USER_LOGIN_SUCCESS, NO_TOKEN } from "./../actions/types";

const initialState = {
  user: null,
  token: localStorage.authToken || "",
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
        token: "",
        isAuthenticated: false
      };
  }
};

export default currentUser;
