import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import currentUser from "./reducers/currentUser";
import admin_applicants from "./reducers/admin_dashboard.js";

const rootReducer = combineReducers({ currentUser, admin_applicants });

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;
