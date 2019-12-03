import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import currentUser from "./reducers/currentUser";

const rootReducer = combineReducers({ currentUser });

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;
