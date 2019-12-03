const initialState = {
  user: null,
  token: localStorage.authToken || "",
  isAuthenticated: false,
  isAuthInProgress: true
};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
  }
};

export default currentUser;
