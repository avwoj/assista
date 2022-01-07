import { combineReducers } from "redux";
import users from "./user";
import events from "./calendar";

export default combineReducers({
  users,
  events,
});
