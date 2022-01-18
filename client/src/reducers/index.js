import { combineReducers } from "redux";
import auth from "./auth";
import events from "./calendar";
import journal from "./journal";
import todo from "./todo";

export default combineReducers({
  auth,
  events,
  journal,
  todo,
});
