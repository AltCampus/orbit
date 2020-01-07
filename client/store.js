import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import currentUser from "./reducers/currentUser";
import interview from "./reducers/interview";

const rootReducer = combineReducers({ currentUser, interview });

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;
