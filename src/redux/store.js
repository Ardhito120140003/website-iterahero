import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import userReducer from "./reducer";
import logger from "redux-logger";
import thunk from "redux-thunk";
const enhancer =
  (typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const rootReducer = combineReducers({ userReducer });

export const Store = createStore(
  rootReducer,
  enhancer(applyMiddleware(thunk, logger))
);
