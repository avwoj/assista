import { combineReducers } from "redux";
import auth from "./auth";
import events from "./calendar";

export default combineReducers({
  auth,
  events,
});
